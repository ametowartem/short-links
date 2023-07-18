import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../envConfig';
import { JoiSchema } from '../envConfigSchema';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
  }

  private validateInput(config: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = JoiSchema.validate(config, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get redisPort(): number {
    return Number(this.envConfig.REDIS_PORT);
  }
  get redisHost(): string {
    return String(this.envConfig.REDIS_HOST);
  }
  get databaseType(): string {
    return String(this.envConfig.DATABASE_TYPE);
  }
  get host(): string {
    return String(this.envConfig.HOST);
  }
  get port(): number {
    return Number(this.envConfig.PORT);
  }
  get databasePort(): number {
    return Number(this.envConfig.DATABASE_PORT);
  }
  get databaseUsername(): string {
    return String(this.envConfig.DATABASE_USERNAME);
  }
  get databasePassword(): string {
    return String(this.envConfig.DATABASE_PASSWORD);
  }
  get databaseName(): string {
    return String(this.envConfig.DATABASE_NAME);
  }
  get databaseHost(): string {
    return String(this.envConfig.DATABASE_HOST);
  }
  get jwtSecret(): string {
    return String(this.envConfig.SECRET);
  }
  get ext(): number {
    return Number(this.envConfig.EXT);
  }
  get saltRounds(): number {
    return Number(this.envConfig.SALT_ROUNDS);
  }
}
