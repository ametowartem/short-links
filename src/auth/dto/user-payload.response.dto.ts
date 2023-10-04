import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserPayloadResponseDto {
  constructor(data: Required<UserPayloadResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'ametowartem@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  mail: string;
}
