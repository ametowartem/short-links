import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { appProviders } from './link.providers';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';
@Module({
  imports: [AuthModule, CoreModule],
  controllers: [LinkController],
  providers: [LinkService, ...appProviders],
  exports: [LinkService],
})
export class LinkModule {}
