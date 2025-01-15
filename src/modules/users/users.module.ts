import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary,service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService, FileUploadService],
  exports:[UsersService]
})
export class UsersModule {}
