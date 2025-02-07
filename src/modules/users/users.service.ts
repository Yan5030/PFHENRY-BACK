import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
     
      const usersData: CreateUserDto[] = JSON.parse(
        fs.readFileSync('users.json', 'utf8'),
      );

      for (const userData of usersData) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: userData.email },
        });

        if (existingUser) {
          console.log(
            `The user with the email ${userData.email} already exists. It is omitted.`,
          );
          continue;
        }

       
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }

        const newUser = this.usersRepository.create({
          ...userData,
          create_at: new Date().toISOString(),
        });

        await this.usersRepository.save(newUser);
        console.log(`User ${userData.name} successfully added.`);
      }
    } catch (error) {
      console.error('Error loading users:', error.message);
      throw new BadRequestException(
        'Error loading users from JSON file.',
      );
    }
  }

  async create(createUserDto: CreateUserDto) : Promise<User>{ 
    const userDb = await this.usersRepository.findOne({where:{email:createUserDto.email}})
    console.log("User value", userDb)

    if(userDb){
      throw new BadRequestException("The email is already registered");
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
      create_at: dayjs().format("YYYY-MM-DD")})
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
    throw new BadRequestException("No users with the entered id are found.");
  }
const userNoPassword = new ResponseUserDto(userDb);
return userNoPassword;
  }

  async findAllAdmin() : Promise<User[]>{
    const users = await this.usersRepository.find();
     return users;
   };

   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userDb = await this.usersRepository.findOne({ where: { id } });
  
    if (!userDb) {
      throw new BadRequestException("No users found with the entered ID");
    }
  
   
    if (updateUserDto.name !== undefined) {
      userDb.name = updateUserDto.name;
    }
    if (updateUserDto.address !== undefined) {
      userDb.address = updateUserDto.address;
    }
  
   
    return await this.usersRepository.save(userDb);
  }
  

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const userDb = await this.usersRepository.findOne({where:{email}});
  if(!userDb){
    throw new BadRequestException("No users were found with the entered id");
  }
const updateUser = Object.assign(userDb, updateUserDto); 

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
  throw new BadRequestException("No users were found with the entered id");
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
  throw new BadRequestException("The role entered is incorrect, please enter another role");
}

const updateRoleUser = {
  ...userDb,
role:rol
}
return await this.usersRepository.save(updateRoleUser);;

}

 async desactivate(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({where:{email}});

    user.isActive = false; 
    return await this.usersRepository.save(user);
  }


  async findReservationsByUserService( email:string): Promise<Reservation[]>{
      const user = await this.usersRepository.findOne({where:{email},relations:{reservations:true}});   
if(!user){
throw new BadRequestException("You must enter the email of an active user");
}

    const reservations = user?.reservations;
    if(!reservations){
      throw new BadRequestException("The user has no reservations");
    } else if(reservations.length === 0){
      throw new BadRequestException("The user has no reservations");
    }
  return reservations;
  }

  async getOneByAuth0Id(auth0Id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { auth0Id } });
  }

  async updateById(id: string, updateData: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    
    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }
  

  async findOrdersByUserService(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { orders: { orderDetails: { combo: true, menuItem: true } } },
    });
  
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    const orders = user?.orders;
  
    if (!orders || orders.length === 0) {
      return [];
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
      orderDetails: order.orderDetails.map(detail => 
        Object.fromEntries(
          Object.entries({
            id: detail.id,
            quantity: detail.quantity,
            subtotal: detail.subtotal,
            combo: detail.combo || undefined,
            menuItem: detail.menuItem || undefined,
          }).filter(([_, value]) => value !== null && value !== undefined) 
        )
      )
    }));
  
    return responseOrders;
  }

  async createWorker(createUserDto: CreateUserDto) : Promise<User>{ 
    const userDb = await this.usersRepository.findOne({where:{email:createUserDto.email}})
    console.log("User value", userDb)

    if(userDb){
      throw new BadRequestException("The email is already registered");
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
      role:Role.Worker,
      create_at: dayjs().format("YYYY-MM-DD")})
    return this.usersRepository.save(newUser);
    }


}