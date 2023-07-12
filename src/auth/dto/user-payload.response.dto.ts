import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserPayloadResponseDto {
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
  sub: number;

  @ApiProperty({
    example: '54d3150a-65dc-4d34-9f39-bb61eaff6e04',
  })
  @IsString()
  @IsNotEmpty()
  jti: string;

  @ApiProperty({
    example: 1689776534,
  })
  @IsNumber()
  @IsNotEmpty()
  ext: number;

  @ApiProperty({
    example: 1689171734,
  })
  @IsNumber()
  @IsNotEmpty()
  iat: number;
}
