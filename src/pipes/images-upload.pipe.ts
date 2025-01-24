import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagesUploadPipe implements PipeTransform {
  private readonly allowedMimeType =["image/png","image/jpeg","image/jpg","image/gif"]
  transform(file:Express.Multer.File) {
    if(!file){
      throw new BadRequestException("No existe file");
    }

    if(!this.allowedMimeType.includes(file.mimetype)){
      throw new BadRequestException("el archivo no tiene un formato permitido");
    }

    return file;
  }
}

