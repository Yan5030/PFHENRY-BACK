import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { Role } from 'src/enum/roles.enum';
import dayjs from 'dayjs';
import * as fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

  async seedUsers(): Promise<void> {
    try {
      // Leer el archivo JSON
      const usersData: CreateUserDto[] = JSON.parse(
        fs.readFileSync('users.json', 'utf8'),
      );

      for (const userData of usersData) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: userData.email },
        });

        if (existingUser) {
          console.log(
            `El usuario con el email ${userData.email} ya existe. Se omite.`,
          );
          continue;
        }

        // Hash de la contraseña si está presente
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }

        const newUser = this.usersRepository.create({
          ...userData,
          create_at: new Date().toISOString(),
        });

        await this.usersRepository.save(newUser);
        console.log(`Usuario ${userData.name} agregado exitosamente.`);
      }
    } catch (error) {
      console.error('Error al cargar los usuarios:', error.message);
      throw new BadRequestException(
        'Error al cargar los usuarios desde el archivo JSON.',
      );
    }
  }

  async create(createUserDto: CreateUserDto) : Promise<User>{ 
    const userDb = await this.usersRepository.findOne({where:{email:createUserDto.email}})
    console.log("Valor de user", userDb)

    if(userDb){
      throw new BadRequestException("El correo ya esta registrado");
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
      create_at: dayjs().format("YYYY-MM-DD")});
    return this.usersRepository.save(newUser);
    }

  async findAll() : Promise<ResponseUserDto[]>{
   const users = await this.usersRepository.find({where:{isActive:true}});
  
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

  async findAllAdmin() : Promise<User[]>{
    const users = await this.usersRepository.find();
     return users;
   };

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const userDb = await this.usersRepository.findOne({where:{id}});
  if(!userDb){
    throw new BadRequestException("No se encontraron usuarios con la id ingresada");
  }
const updateUser = Object.assign(userDb, updateUserDto); // esto me modifica el usuario que traje de bd, y pone las propiedades modificadas
//hago esto para poder guardar los cambios de este usuario y poder retornar el usuario, sin hacer otra peticion 
return await this.usersRepository.save(updateUser);;
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const userDb = await this.usersRepository.findOne({where:{email}});
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
return userDb;
}

async updateRol(id: string, newRole: string): Promise<User>  {
  const userDb = await this.usersRepository.findOne({where:{id}});
if(!userDb){
  throw new BadRequestException("No se encontraron usuarios con la id ingresada");
}

let rol:Role;
if(newRole === "admin"){
rol = Role.Admin
} else if(newRole=== "worker"){
rol = Role.Worker
} else if (newRole === "user"){
  rol = Role.User
}
else{
  throw new BadRequestException("El rol ingresado es incorrecto, ingrese otro rol");
}

const updateRoleUser = {
  ...userDb,
role:rol
}
return await this.usersRepository.save(updateRoleUser);;

}

 async desactivate(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({where:{id}});

    user.isActive = false; 
    return await this.usersRepository.save(user);
  }


  async findReservationsByUserService( email:string): Promise<Reservation[]>{
      const user = await this.usersRepository.findOne({where:{email},relations:{reservations:true}});   
if(!user){
throw new BadRequestException("Debe ingresar el email de un usuario activo");
}

    const reservations = user?.reservations;
    if(!reservations){
      throw new BadRequestException("El usuario no tiene reservas");
    } else if(reservations.length === 0){
      throw new BadRequestException("El usuario no tiene reservas");
    }
  return reservations;
  }

  async getOneByAuth0Id(auth0Id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { auth0Id } });
  }

  async updateById(id: string, updateData: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
  
    // Actualizar los datos
    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }
  

  async findOrdersByUserService( email:string){
    const user = await this.usersRepository.findOne({where:{email},relations:{orders:{orderDetails:true}}});   
if(!user){
throw new BadRequestException("Debe ingresar el email de un usuario activo");
}

  const orders = user?.orders;

  if(!orders){
    throw new BadRequestException("El usuario no tiene ordenes");
  } else if(orders.length === 0){
    throw new BadRequestException("El usuario no tiene reservas");
  }


  const responseOrders = orders.map(order => ({
    id: order.id,
    status: order.status,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,
    payment_status: order.payment_status,
    paymentMethod: order.paymentMethod,
    comment: order.comment,
    isActive: order.isActive,
    orderDetails: order.orderDetails.map(detail => ({
      id: detail.id,
      quantity: detail.quantity,
      subtotal: detail.subtotal,
    }))
  }));
  

  
return responseOrders;
}
  

}