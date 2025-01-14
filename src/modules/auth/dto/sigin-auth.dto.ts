// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
export class SigninAuthDto{
    @IsEmail({}, {message: 'El correo no es valido'})
    email: string;
    @IsNotEmpty({message: 'La contraseña es requerida'})
    @Length(6, 20)
    password: string;
}
