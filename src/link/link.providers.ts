import { Provider } from '@nestjs/common';
import IORedis from 'ioredis';

export const REDIS_PROVIDER = 'REDIS_PROVIDER';

export const appProviders = [
  {
    provide: REDIS_PROVIDER,
    useValue: new IORedis({
      host: 'localhost',
      port: 6379,
    }),
  },
] as Provider[];
