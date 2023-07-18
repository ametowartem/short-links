import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SingInRequestDto } from './dto/sing-in.request.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SingInResponseDto } from './dto/sing-in.response.dto';
import { UserPayloadResponseDto } from './dto/user-payload.response.dto';

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
  @ApiBearerAuth()
  @Get('profile')
  @ApiResponse({
    type: UserPayloadResponseDto,
    status: HttpStatus.OK,
  })
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('logout')
  async logout(@Request() req) {
    const payload = req.user;
    await this.authService.logout(payload);
  }
}
