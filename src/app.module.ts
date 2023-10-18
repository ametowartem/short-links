import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';
import { ConfigService } from './core/service/config.service';
import { CoreModule } from './core/core.module';
import { FileModule } from './file/file.module';
import { UserHttpModule } from './user/user-http.module';
@Module({
  imports: [
    AuthModule,
    HttpModule,
    UserHttpModule,
    LinkModule,
    CoreModule,
    FileModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUsername,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [UserEntity],
        migrations: ['src/migrations'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
