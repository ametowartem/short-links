import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controller';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [UserModule, AuthModule, CoreModule],
  controllers: [UserController],
})
export class UserHttpModule {}
