import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { appProviders } from '../link/link.providers';
import { CoreModule } from '../core/core.module';
import { ConfigService } from '../core/service/config.service';
@Module({
  imports: [
    UserModule,
    CoreModule,
    JwtModule.registerAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ...appProviders],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
