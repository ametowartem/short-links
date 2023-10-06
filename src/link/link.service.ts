import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import IORedis from 'ioredis';
import { REDIS_PROVIDER } from './link.providers';
import { nanoid } from 'nanoid/non-secure';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import * as process from 'process';

@Injectable()
export class LinkService {
  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  constructor(private readonly userService: UserService) {}

  async linkToShort(longLink: string, reqUser: UserEntity) {
    if (!longLink.includes('http') || longLink.indexOf('http') !== 0) {
      longLink = `http://${longLink}`;
    }

    const shortLink = nanoid(6);
    const existOnRedis = await this.redis.get(shortLink);

    if (!existOnRedis) {
      this.redis.set(shortLink, longLink);
    }

    const user = await this.userService.findOneByUuid(reqUser.uuid);
    await this.userService.addShortLink({ user: user, shortLink: shortLink });

    return shortLink;
  }

  async linkFromShort(shortLink: string) {
    const existOnRedis = await this.redis.get(shortLink);

    if (!existOnRedis) {
      throw new NotFoundException();
    }

    return existOnRedis;
  }

  async getUserLinks(userUuid) {
    const user = await this.userService.findOneByUuid(userUuid);

    if (!user.shortLinks) {
      return;
    }

    const links = [];
    for (const el of user.shortLinks.split(',')) {
      links.push({
        shortLink: `http://${process.env.HOST}:${process.env.PORT}/${el}`,
        link: await this.redis.get(el),
      });
    }

    return links;
  }
}
