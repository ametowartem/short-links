import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from '../auth/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registry')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async registry(@Body() body: CreateUserRequestDto): Promise<void> {
    const hash = await bcrypt.hash(body.password, bcryptConstant.saltRounds);
    const user = new UserEntity(body.username, hash);
    await this.userService.add(user);
  }
}
