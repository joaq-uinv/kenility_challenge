import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { AddImageHandler } from '../../application/commands/add-image.handler';
import { AddImageCommand } from '../../application/commands/add-image.command';

@Controller({ path: '/users', version: '1' })
export class AddImageAction {
  constructor(private handler: AddImageHandler) {}

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  public async execute(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    const command = new AddImageCommand(id, image);

    await this.handler.handle(command);
  }
}
