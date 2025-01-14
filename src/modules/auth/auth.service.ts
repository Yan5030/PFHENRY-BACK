import { BadRequestException, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const useremail = await this.userRepository.findOne({where:{email: createUserDto.email}});
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
      password: hashedPassword,
      create_at: dayjs().format('YYYY-MM-DD'),
    };
    const newUser = this.userRepository.create(userSave);
      return this.userRepository.save(newUser);
    }
  

    async signin(signinAuthDto: SigninAuthDto) {
      try {
        const { email, password } = signinAuthDto;
    
        const user = await this.userRepository.findOne({ where: { email } });
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
}