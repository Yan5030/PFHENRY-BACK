import { BadRequestException, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { Role } from 'src/enum/roles.enum';
import { CreateUserPartialDto } from '../users/dto/create-user-partial.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';


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

    if(createUserDto.password !== createUserDto.ConfirmPassword ){
      throw new BadRequestException("password y confirm password deben ser iguales");
    }
   
   // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
   const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

   if(!hashedPassword){
    throw new BadRequestException('Error al encriptar la contraseña');
  }
   
  const isComplete = !createUserDto.auth0Id;

const userSave = await this.usersService.create({
  ...createUserDto,
  password: hashedPassword,
  isComplete,
});
  
  return userSave;
}


async registerWithAuth0(createUserDto: CreateUserDto) {
  const userExists = await this.usersService.getOneByAuth0Id(createUserDto.auth0Id);
  if (userExists) {
    throw new BadRequestException('El usuario ya está registrado');
  }

  const newUser = await this.usersService.create({
    ...createUserDto,
    password: '', // No se almacena contraseña para Auth0
    isComplete: false, // Perfil incompleto por defecto
  });

  return newUser;
}

//Aqui se envia al front esta informacion con iscomplete:false, sugiero que cuando reciba esta informacion asi redirija automaticamente a una pagina de completar registro
//  Después de hacer la llamada al endpoint de registro
// const handleRegister = async () => {
//   const response = await api.post('/auth/register', formData);

//   if (response.data.isComplete === false) {
//     // Redirige al usuario a la página de completar perfil
//     history.push('/complete-profile');  // Suponiendo que usas React Router
//   }
// };


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

async completeUserProfile(updateProfileDto: UpdateProfileDto) { 
  const user = await this.usersService.getOneByAuth0Id(updateProfileDto.auth0Id); 
  if (!user) { 
    throw new BadRequestException('Usuario no encontrado'); 
  } 
  const updatedUser = await this.usersService.update(user.id, 
    { 
      ...updateProfileDto, 
      isComplete: true,
     }); 
  return updatedUser; }
}
