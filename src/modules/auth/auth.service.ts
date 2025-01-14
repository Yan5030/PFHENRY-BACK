import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { Role } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';
import { CreateUserPartialDto } from '../users/dto/create-user-partial.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository, // Inyección del repositorio de usuarios
  ) {}

  getAllUsers() {
    return this.authRepository.findAll();
  }

  async signup(userAuthDto: UserAuthDto) {
    const useremail = this.authRepository.findByEmail(userAuthDto.email);

    if(useremail){
      throw new BadRequestException('El correo ya se encuentra registrado');
    }

    if(userAuthDto.password !== userAuthDto.confirmPassword){
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(userAuthDto.password, 10);
    if(!hashedPassword){
      throw new BadRequestException('Error al encriptar la contraseña');
    }

    const userSave = {
      ...userAuthDto,
      password: hashedPassword,
    };
    const { confirmPassword, ...userSaveWithoutPassword } = userSave;

    const newUser = await this.authRepository.create(userSave as UserAuthDto);

    return newUser
  
  }

  async signin(signinAuthDto: SigninAuthDto) {
    const user = this.authRepository.findByEmail(signinAuthDto.email);
    if(!user){
      throw new BadRequestException('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(signinAuthDto.password, user.password);
    if (!validPassword) {
      return { message: 'Credenciales incorrectas' };
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.role]
    }
    console.log(userPayload)
    const token = this.jwtService.sign(userPayload);
    
    
    return { message: 'Inicio de sesión exitoso', user , token};
  }

  async validateUserWithAuth0(payload: JwtPayload): Promise<User> {
    // Buscar si el usuario ya existe en la base de datos
    let user = await this.userRepository.findOneByEmail(payload.email);

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
      await this.userRepository.saveUser(user);
    }

    return user;
  }


}
