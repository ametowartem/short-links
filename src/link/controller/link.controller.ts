import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from '../service/link.service';
import { GetLongLinkParamsRequestDto } from '../dto/get-long-link.params.request.dto';
import { GetShortLinkRequestDto } from '../dto/get-short-link.request.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetShortLinkResponseDto } from '../dto/get-short-link.response.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../user/decorator/user.decorator';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/userLinks')
  getUserLinks(@User() userUuid) {
    return this.linkService.getUserLinks(userUuid);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('/link')
  @ApiResponse({
    type: GetShortLinkResponseDto,
    status: 200,
  })
  async getShortLink(
    @Body() body: GetShortLinkRequestDto,
    @Req() request,
    @User() userUuid,
  ) {
    return {
      shortLink: `http://${
        request.headers.host
      }/${await this.linkService.linkToShort(
        body.link,
        userUuid,
        body.userLink || undefined,
      )}`,
    };
  }

  @Get(':shortLink')
  @ApiBearerAuth()
  async redirectFromShortLink(
    @Param() dto: GetLongLinkParamsRequestDto,
    @Res() response,
  ) {
    const longLink = await this.linkService.linkFromShort(dto.shortLink);
    response.redirect(longLink);
  }
}
