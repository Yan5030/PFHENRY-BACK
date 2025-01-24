import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Entidad User
import { Role } from 'src/enum/roles.enum'; // Enum de roles
import { CreateUserPartialDto } from './dto/create-user-partial.dto';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyectamos el repositorio de la entidad User
  ) {}

  // Método para encontrar un usuario por correo electrónico
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Método para crear un nuevo usuario
  async createUser(userData: CreateUserPartialDto): Promise<User> {
    const user = this.userRepository.create(userData);  // Usamos el DTO parcial
    return this.userRepository.save(user);  // Guardamos el usuario en la base de datos
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user); // Guarda los cambios realizados en el usuario
  }
  // Método para actualizar un usuario
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user); // Guarda los cambios realizados en el usuario
  }
}