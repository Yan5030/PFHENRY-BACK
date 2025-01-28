// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';


// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
export class SigninAuthDto{
    @ApiProperty({
          description:"El email debe contener entre 3 y 80 caracteres y ser formato email",
          example:"maximiliano@email.com"
        })
        @IsEmail()
        @IsNotEmpty()
        @MinLength(3)
        @MaxLength(80)
    email: string;




    @ApiProperty({
          description:"Debe contener una mayuscula, un numero y caracter especial",
          example:"Ejemplo91"
        })
     @IsString()
        @IsNotEmpty()
        //@IsStrongPassword()
        @MinLength(8)
    password: string;

}
