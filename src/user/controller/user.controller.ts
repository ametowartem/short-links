import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../decorator/user.decorator';
import { ChangeUserRequestDto } from '../dto/change-user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registry')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async registry(@Body() body: CreateUserRequestDto): Promise<void> {
    await this.userService.registry({
      username: body.username,
      password: body.password,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('change')
  async changeUser(@Body() dto: ChangeUserRequestDto, @User() userUuid) {
    const user = await this.userService.findOneByUuid(userUuid);
    await this.userService.changeUser(dto, user);
  }
}
