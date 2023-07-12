import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetShortLinkResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortLink: string;
}
