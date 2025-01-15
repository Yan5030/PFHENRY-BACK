import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileUploadService : FileUploadService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
      const newUser= await this.usersService.create(createUserDto);
      return {message:"Usuario creado con exito",data:newUser}

  }

  @Get()
  async findAll() {
    const users= await this.usersService.findAll();
      return  {data: users}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const updateUser = await this.usersService.findOneById(id)
      return {data: updateUser}
  
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    
      const updateUser = await this.usersService.update(id, updateUserDto);
      return {message:"Usuario modificado", data:updateUser};
   
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      const user= await this.usersService.remove(id);
      return {message: `Usuario eliminado`}
  }
      



  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(/*new ImagesUploadPipe()*/) file: Express.Multer.File,
  ) {
    const uploadedImageUrl = await this.fileUploadService.uploadFile({
      buffer: file.buffer,
      fieldName: file.fieldname,
      mimeType: file.mimetype,
      originalName: file.originalname,
      size: file.size,
    });

    const user = await this.usersService.update(id, { image_url: uploadedImageUrl });

    return {
      message: 'Imagen cargada con éxito',
      data: user,
    };
  }
}




