import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class GetShortLinkRequestDto {
  @ApiProperty({
    example: 'https://google.com',
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
