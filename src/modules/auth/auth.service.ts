import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

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
    // if (!user || user.password !== signinAuthDto.password) {
    //   return { message: 'Credenciales incorrectas' };
    // }
    const validPassword = await bcrypt.compare(signinAuthDto.password, user.password);
    if (!validPassword) {
      return { message: 'Credenciales incorrectas' };
    }
    return { message: 'Inicio de sesión exitoso', user };
  }
}
