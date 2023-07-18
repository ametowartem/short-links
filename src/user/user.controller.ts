import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { ApiResponse } from '@nestjs/swagger';

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
}
