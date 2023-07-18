import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstant } from './constants';
import { appProviders } from '../link/link.providers';
import { CoreModule } from '../core/core.module';
@Module({
  imports: [
    UserModule,
    CoreModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ...appProviders],
  exports: [AuthService],
})
export class AuthModule {}
