import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import IORedis from 'ioredis';
import { REDIS_PROVIDER } from '../link/link.providers';
import * as moment from 'moment';
import { ConfigService } from '../core/service/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const jti = uuidv4();

    const payload = {
      username: user.username,
      sub: user.uuid,
      jti: jti,
      ext: moment().add(this.configService.ext, 'seconds').unix(),
    };

    this.redis.sadd(this.getUserTokenWhiteList(user.uuid), jti);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.jwtSecret,
      }),
    };
  }

  async logout(payload) {
    await this.redis.srem(
      this.getUserTokenWhiteList(payload['sub']),
      payload['jti'],
    );
  }

  getUserTokenWhiteList(id): string {
    return `user-access-tokens-white-list:${id}`;
  }

  async checkRedisIsMember(payload): Promise<boolean> {
    return await this.redis
      .sismember(this.getUserTokenWhiteList(payload['sub']), payload['jti'])
      .then((value) => {
        return value !== 0;
      });
  }
}
