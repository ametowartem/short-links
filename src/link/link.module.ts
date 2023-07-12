import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { appProviders } from './link.providers';
@Module({
  controllers: [LinkController],
  providers: [LinkService, ...appProviders],
  exports: [LinkService],
})
export class LinkModule {}
