import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { appProviders } from './link.providers';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [CoreModule, AuthModule, UserModule],
  controllers: [LinkController],
  providers: [LinkService, ...appProviders],
  exports: [LinkService],
})
export class LinkModule {}
