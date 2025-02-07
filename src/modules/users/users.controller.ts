import { Controller, Get, Post, Body, Param, Put, UseInterceptors, UploadedFile, UseGuards, Patch, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { ImagesUploadPipe } from 'src/pipes/images-upload.pipe';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileUploadService : FileUploadService,
  ) {}

  //@RolesDecorator(Role.Worker,Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get()
  async findAllActivate() {
    const users= await this.usersService.findAll();
      return  {data: users}
  }


  //@RolesDecorator(Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get("/findAllUsers")
  async findAllAdmin() {
    const users= await this.usersService.findAllAdmin();
      return  {data: users}
  }


 //@RolesDecorator(Role.User,Role.Worker,Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const updateUser = await this.usersService.findOneById(id)
      return {data: updateUser}
  
  }


   //@RolesDecorator(Role.User,Role.Worker,Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersService.update(id, updateUserDto);
    return { message: "Usuario modificado", data: updateUser };
  }


 //@RolesDecorator(Role.User,Role.Worker,Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Post(':email/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('email') email: string,
    @UploadedFile(new ImagesUploadPipe()) file: Express.Multer.File,
  ) {
    const uploadedImageUrl = await this.fileUploadService.uploadFile({
      buffer: file.buffer,
      fieldName: file.fieldname,
      mimeType: file.mimetype,
      originalName: file.originalname,
      size: file.size,
    });

    const user = await this.usersService.updateByEmail(email, { image_url: uploadedImageUrl });

   
      return {img:uploadedImageUrl};
    

  }

  @RolesDecorator(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Put("updateRole/:id")
  async updateRoleUser(@Param("id", ParseUUIDPipe) id: string, @Body() updateRole :UpdateRoleUserDto ){
    const updateUser = await this.usersService.updateRol(id,updateRole.role);
    return {message:"El rol del usuario fue cambiado con exito", data:updateUser}
      }


 //@RolesDecorator(Role.Admin)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
    @Patch("desactivate/:email")
async desactivateUser(@Param("email") email:string){
 return await this.usersService.desactivate(email);
}

/*@Get(":id/reservations")
async findReservationsByUserId(@Param("id") id:string){
const reservations = await this.usersService.findReservationsByUserService(id);
return {data:reservations}

}
*/

 //@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
@Get("reservations/:email")
async findReservationsByUserEmail(@Param("email") email:string){
const reservations = await this.usersService.findReservationsByUserService(email);
return {data:reservations}

}

//@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
@Get("orders/:email")
async findOrdersByUserEmail(@Param("email") email:string){
const orders = await this.usersService.findOrdersByUserService(email);
return {data:orders}

}


}




