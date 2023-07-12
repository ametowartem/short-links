import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from './constants';
import { REDIS_PROVIDER } from '../link/link.providers';
import IORedis from 'ioredis';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verifyAsync(token, {
        secret: jwtConstant.secret,
      });

      request['user'] = payload;
      payload.then((res) => {
        this.redis
          .sismember(`user-access-tokens-white-list:${res['sub']}`, res['jti'])
          .then((value) => {
            if (!value) throw new UnauthorizedException();
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as { authorization?: string };

    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
