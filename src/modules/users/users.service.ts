import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userDb = await this.usersRepository.findOne({where:{email:createUserDto.email}})

    if(userDb){
      throw new BadRequestException("El correo ya esta registrado");
    }
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  //const newUser = new CreateUserDto(createUserDto);
//return newUser;
  }

  async findAll() : Promise<ResponseUserDto[]>{
   const users = await this.usersRepository.find();
   /*const users = [
    {
      id:1,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      address: "123 Elm Street, Springfield, IL",
    },
    {
      id:2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "securePass456",
      address: "456 Oak Avenue, Metropolis, NY",
    },
    {
      id:3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      password: "alice789",
      address: "789 Pine Lane, Riverdale, CA",
    },
    {
      id:4,
      name: "Bob Brown",
      email: "bobbrown@example.com",
      password: "bob1234",
      address: "321 Maple Drive, Gotham, NJ",
    },
    {
      id:5,
      name: "Charlie White",
      email: "charliewhite@example.com",
      password: "charlie987",
      address: "654 Cedar Road, Star City, TX",
    },
  ];
  */
    const usersNoPassword = users.map(user => new ResponseUserDto(user))
    return usersNoPassword;
  }

  async findOneById(id: string) : Promise<ResponseUserDto> {
  const userDb = await this.usersRepository.findOne({where:{id}})
  if(!userDb){
    throw new BadRequestException("No se encuentran usuarios con la id ingresada.");
  }
const userNoPassword = new ResponseUserDto(userDb);
return userNoPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto)  {
    const userDb = await this.usersRepository.findOne({where:{id}});
  if(!userDb){
    throw new BadRequestException("No se encontraron usuarios con la id ingresada");
  }

const updateUser = Object.assign(userDb, updateUserDto); // esto me modifica el usuario que traje de bd, y pone las propiedades modificadas
//hago esto para poder guardar los cambios de este usuario y poder retornar el usuario, sin hacer otra peticion 

return await this.usersRepository.save(updateUser);;

  }

  async remove(id: string) {
    const userDb = await this.usersRepository.findOne({where:{id}})
    return await this.usersRepository.delete(id)
    
  }

async getOneByEmail(email:string) : Promise<User>{
const userDb = await this.usersRepository.findOne({where:{email}})
if(!userDb){
  throw new BadRequestException("No se encontraron usuarios con ese email");
}
return userDb;
}

}
