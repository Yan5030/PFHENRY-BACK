import { BadRequestException, Injectable } from '@nestjs/common';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly nodemailerService: NodemailerService 
  ) {}


  async signup(createUserDto: CreateUserDto): Promise<User> {
    const useremail = await this.usersService.getOneByEmail(createUserDto.email);
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
   
  const isComplete = !createUserDto.auth0Id;

const userSave = await this.usersService.create({
  ...createUserDto,
  password: hashedPassword,
  isComplete,
});

await this.nodemailerService.sendEmail(createUserDto.email);

  return userSave;
}


async registerWithAuth0(createUserDto: CreateUserDto): Promise<User> {
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
    }

async completeUserProfile(updateProfileDto: UpdateProfileDto): Promise<User> { 
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
