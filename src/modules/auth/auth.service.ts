import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { User } from '../users/entities/user.entity';
import { SigninWithAuth0Dto } from './dto/signin-withAuth0.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService,
    private readonly nodemailerService: NodemailerService 
  ) {}


  async signup(createUserDto: CreateUserDto) {
    const useremail = await this.usersService.getOneByEmail(createUserDto.email);
    console.log('Correo de usuario:', useremail);

    if (useremail) {
      throw new BadRequestException('El correo ya se encuentra registrado');
    }
    if (createUserDto.password !== createUserDto.ConfirmPassword) {
      throw new BadRequestException("password y confirm password deben ser iguales");
    }
   

   const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

   if(!hashedPassword){
    throw new BadRequestException('Error al encriptar la contraseña');
  }
   
  const isComplete = 
  createUserDto.email.trim() !== '' &&
    createUserDto.password.trim() !== '' &&
    createUserDto.name.trim() !== '' &&
    (createUserDto.address?.trim() || '') !== '' &&  // Si el campo address es obligatorio, verifica que no esté vacío
    createUserDto.ConfirmPassword.trim() !== '';

const userSave = await this.usersService.create({
  ...createUserDto,
  password: hashedPassword,
  address: createUserDto.address?.trim() || '',
  isComplete: isComplete
});

await this.nodemailerService.sendEmail(createUserDto.email);
  
  return userSave;
}


async registerWithAuth0(createUserDto: CreateUserDto) {
  const userExists = await this.usersService.getOneByAuth0Id(createUserDto.auth0Id);
  if (userExists) {
    throw new BadRequestException('El usuario ya está registrado');
  }

  const newUser = await this.usersService.create({
    auth0Id: createUserDto.auth0Id,
    name: createUserDto.name,
    email: createUserDto.email,
    password: '', 
    isComplete: createUserDto.isComplete ?? false, 
    address: createUserDto.address ?? '', 
    image_url: createUserDto.image_url ?? 'http://example.com', 
  });

  await this.nodemailerService.sendEmail(createUserDto.email);
  

  return newUser;
}
async signin(signinAuthDto: SigninAuthDto) {
  
    const { email, password } = signinAuthDto;

    const user = await this.usersService.getOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    if(user.isActive === false){
      throw new BadRequestException('Su cuenta fue dada de baja.');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.role], 
    };

    const loggin = true;
    const token = this.jwtService.sign(payload);
    const responseUser = new ResponseUserDto(user)
    return { token:token, user:responseUser,loggin};
    
    } catch (error) {
      console.error('Error en signin:', error.message);
      throw new BadRequestException('Error al iniciar sesión');
      }
    }


    async signinWithAuth0(signinWithAuth0Dto: SigninWithAuth0Dto) {
      try {
        const { auth0Id } = signinWithAuth0Dto;
    
        if (!auth0Id) {
          throw new BadRequestException('El campo auth0Id es requerido');
        }
    
        // Buscar usuario por auth0Id
        const user = await this.usersService.getOneByAuth0Id(auth0Id);
        if (!user) {
          throw new UnauthorizedException('Credenciales incorrectas');
        }
    
        // Crear el payload del token
        const payload = {
          sub: user.id,
          id: user.id,
          email: user.email,
          roles: [user.role], // Asegúrate de que `role` esté definido en la entidad User
        };
    
        // Generar el token JWT
        const token = this.jwtService.sign(payload);
    
        // Construir el ResponseUserDto con los datos del usuario
        const responseUser = new ResponseUserDto(user);
    
        // Respuesta final
        return {
          token,
          user: responseUser,
          loggin: true,
        };
      } catch (error) {
        console.error('Error en signinWithAuth0:', error.message);
        throw new BadRequestException('Error al iniciar sesión');
      }
    }
    

    async completeUserProfile(id: string, updateProfileDto: UpdateProfileDto) {
      const user = await this.usersService.findOneById(id);
    
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
    
      if (user.isComplete) {
        throw new BadRequestException('El perfil ya está completo');
      }

      const { address, password } = updateProfileDto;
      if (!address?.trim() || !password?.trim()) {
        throw new BadRequestException(
          'Es necesario completar los campos address y password'
        );
      }
    
      const updateData = {
        address: address.trim(),
        password: bcrypt.hashSync(password, 10), 
        isComplete: true,
      };
    
      return await this.usersService.updateById(id, updateData);
    }
    
}
