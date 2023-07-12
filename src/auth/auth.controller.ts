import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SingInRequestDto } from './dto/sing-in.request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { SingInResponseDto } from './dto/sing-in.response.dto';
import { UserPayloadResponseDto } from './dto/user-payload.response.dto';
import { CheckAuthorizationParamsRequestDto } from './dto/check-authorization.params.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: SingInResponseDto,
    status: HttpStatus.OK,
  })
  @Post('/')
  signIn(@Body() body: SingInRequestDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiResponse({
    type: UserPayloadResponseDto,
    status: HttpStatus.OK,
  })
  getProfile(
    @Request() req,
    @Headers() headers: CheckAuthorizationParamsRequestDto,
  ) {
    return req.user;
  }
  @UseGuards(AuthGuard)
  @Put('logout')
  logout(
    @Request() req,
    @Headers() headers: CheckAuthorizationParamsRequestDto,
  ) {
    const payload = req.user;
    this.authService.logout(payload);
  }
}
