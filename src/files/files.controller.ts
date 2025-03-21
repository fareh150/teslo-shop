import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: fileFilter,
      //limits: { fileSize: 1024 * 1024 * 5 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      })
    }
  ))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File
  )
  {
    if (!file)
    {
      throw new BadRequestException('Make sure that the file is an image');
    }

    return {
      fileName: file.originalname,
    };
  }
}
