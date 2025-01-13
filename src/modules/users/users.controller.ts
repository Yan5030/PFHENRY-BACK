import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
      
}
