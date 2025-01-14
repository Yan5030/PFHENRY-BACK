import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { Role } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';
import { CreateUserPartialDto } from '../users/dto/create-user-partial.dto';
import dayjs from 'dayjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // Inyección del repositorio de usuarios
  ) {}

  

  async signup(createUserDto: CreateUserDto) {
    const useremail = await this.usersService.getOneByEmail(createUserDto.email)
    console.log('Correo de usuario:', useremail);
    if(useremail){
      throw new BadRequestException('El correo ya se encuentra registrado');
    }

    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    if(!hashedPassword){
      throw new BadRequestException('Error al encriptar la contraseña');
    }

    const userSave = {
      ...createUserDto,
      ...createUserDto,
      password: hashedPassword,
      
    };
    return await this.usersService.create(userSave);
    }


  async signin(signinAuthDto: SigninAuthDto) {
    try {
      const { email, password } = signinAuthDto;
  
      const user = await this.usersService.getOneByEmail(signinAuthDto.email);
      if (!user) {
        throw new BadRequestException('Usuario no existe');
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new BadRequestException('Credenciales incorrectas');
      }
  
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        roles: [user.role],
      });
  
      const { password: _, ...userWithoutPassword } = user;
  
      return { message: 'Inicio de sesión exitoso', user: userWithoutPassword, token };
    } catch (error) {
      console.error('Error en signin:', error.message);
      throw new BadRequestException('Error al iniciar sesión');
    }
  }

  async validateUserWithAuth0(payload: JwtPayload): Promise<User> {
    
    let user = await this.usersService.getOneByEmail(payload.email);

    // Si no existe, crea el usuario usando la información del payload de Auth0
    if (!user) {
      const createUserDto = new CreateUserPartialDto({
        name: payload.name,
        email: payload.email,
        password: '', // Como es autenticado por Auth0, no necesitamos la contraseña
        address: 'default address', // Puedes recibir este dato de Auth0 si es necesario
        image_url: payload.picture || 'http://example.com', // Imagen proporcionada por Auth0
        role: Role.User, // Puedes establecer el rol que desees o lo que venga desde Auth0
      });

      // Guarda el nuevo usuario en la base de datos
    await this.usersService.create(user);
      
    }

    return user;
  }
}



