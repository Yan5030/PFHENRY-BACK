import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { CreateUserPartialDto } from './dto/create-user-partial.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}

  
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

 
  async createUser(userData: CreateUserPartialDto): Promise<User> {
    const user = this.userRepository.create(userData);  
    return this.userRepository.save(user);  
  }

 
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

}
