import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class GetShortLinkRequestDto {
  @ApiProperty({
    example: 'https://google.com',
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: 'linay-rush',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  userLink?: string;
}
