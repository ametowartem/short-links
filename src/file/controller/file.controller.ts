import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utility/file.utility';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileRequestDto } from '../dto/file.request.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { User } from '../../user/decorator/user.decorator';
import { UserService } from '../../user/service/user.service';

@Controller('file')
export class FileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('avatar')
  @Header('Content-Type', 'image/jpeg')
  async getFile(@User() userUuid): Promise<StreamableFile> {
    const user = await this.userService.findOneByUuid(userUuid);
    if (!user.avatarPath) throw new NotFoundException();
    const path = join(process.cwd(), user.avatarPath);
    const file = createReadStream(path);

    return new StreamableFile(file);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @User() userUuid) {
    const user = await this.userService.findOneByUuid(userUuid);
    await this.userService.addAvatar({ user: user, avatarPath: file.path });
  }
}
