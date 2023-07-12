import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from './constants';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import IORedis from 'ioredis';
import { REDIS_PROVIDER } from '../link/link.providers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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
      ext: Math.round(new Date().valueOf() * 0.001) + jwtConstant.ext,
    };

    this.redis.sadd(`user-access-tokens-white-list:${user.uuid}`, jti);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: jwtConstant.secret,
      }),
    };
  }

  async logout(payload) {
    payload.then(async (result) => {
      await this.redis.srem(
        `user-access-tokens-white-list:${result['sub']}`,
        result['jti'],
      );
    });
  }
}
