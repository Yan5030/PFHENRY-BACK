import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put, UseInterceptors, UploadedFile, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileUploadService : FileUploadService,
    private readonly jwtService: JwtService
  ) {}

 // @Post()
 // async create(@Body() createUserDto: CreateUserDto) {
 //     const newUser= await this.usersService.create(createUserDto);
  //    return {message:"Usuario creado con exito",data:newUser}

  // @RolesDecorator(Role.Admin)
  // @UseGuards(RolesGuard)
 // }

  @RolesDecorator(Role.User)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Get()
  async findAllActivate() {
    const users= await this.usersService.findAll();
      return  {data: users}
  }


  @RolesDecorator(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Get("/findAllUsers")
  async findAllAdmin() {
    const users= await this.usersService.findAllAdmin();
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



 // @Delete(':id')
  //async remove(@Param('id') id: string) {
   //   const user= await this.usersService.remove(id);
    //  return {message: `Usuario eliminado`}
 // }
      



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

  @RolesDecorator(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Put("updateRole/:id")
  async updateRoleUser(@Param("id") id: string, @Body() updateRole :UpdateRoleUserDto ){
    const updateUser = await this.usersService.updateRol(id,updateRole.role);
    return {message:"El rol del usuario fue cambiado con exito", data:updateUser}
      }



    @Patch("desactivate/:id")
async desactivateUser(@Param("id") id:string){
 return await this.usersService.desactivate(id);
}

@Get(":id/reservations")
async findReservationsByUser(@Param("id") id:string){
const reservations = await this.usersService.findReservationsByUserService(id);
return {data:reservations}

}


}




