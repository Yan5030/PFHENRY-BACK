import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NodemailerService } from '../nodemailer/nodemailer.service';


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
  try {
    const { email, password } = signinAuthDto;

    const user = await this.usersService.getOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.role], 
    };

    console.log(payload)
    const loggin = true;
    const token = this.jwtService.sign(payload);
    const responseUser = new ResponseUserDto(user)
    return { token:token, user:responseUser,loggin};
    
    } catch (error) {
      console.error('Error en signin:', error.message);
      throw new BadRequestException('Error al iniciar sesión');
    }
    }

    async validateUserAndBuildResponse(user: any): Promise<any> {
      try {
        // Aquí el 'user' contiene los datos del usuario que hemos extraído del token JWT
        // Por ejemplo, 'user.sub' es el ID del usuario en Auth0 o cualquier otro campo que usas para identificarlo
        const userId = user.sub;  // 'sub' es el campo estándar para el ID del usuario en Auth0
        console.log('User ID from token:', userId);
        // Busca al usuario en tu base de datos usando el ID proporcionado
        const foundUser = await this.usersService.getOneByAuth0Id(userId);
  
        if (!foundUser) {
          throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
  
        // Devuelve la respuesta personalizada del usuario, por ejemplo, puedes devolver la información relevante
        return {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          message: 'Usuario autenticado exitosamente',
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
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
