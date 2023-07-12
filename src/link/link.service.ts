import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import IORedis from 'ioredis';
import { REDIS_PROVIDER } from './link.providers';
import { nanoid } from 'nanoid/non-secure';

@Injectable()
export class LinkService {
  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  async linkToShort(longLink: string) {
    if (!longLink.includes('http') || longLink.indexOf('http') !== 0) {
      longLink = `http://${longLink}`;
    }

    const shortLink = nanoid(6);
    const existOnRedis = await this.redis.get(shortLink);

    if (!existOnRedis) {
      this.redis.set(shortLink, longLink);
    }

    return shortLink;
  }

  async linkFromShort(shortLink: string) {
    const existOnRedis = await this.redis.get(shortLink);

    if (!existOnRedis) {
      throw new NotFoundException();
    }

    return existOnRedis;
  }
}
