import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadFile(file);
    return {
      imageUrl: uploadedImage,
    };
  }
  @Delete(':id')
  async deleteImage(@Param('id') id: any) {
    const deleteImage = await this.cloudinaryService.deleteImage(id);
    return {
      imageUrl: deleteImage,
    };
  }
}
