import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../envConfig';
import { JoiSchema } from '../envConfigSchema';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
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
}
