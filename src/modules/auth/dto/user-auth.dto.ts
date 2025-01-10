import { IsEmail, Matches, IsDate, isNotEmpty, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsUUID, IsStrongPassword } from 'class-validator';

export class UserAuthDto {
    @IsString()
    //@IsUUID()
    id: string;
    @IsNotEmpty()
    @IsString()
    name: string
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        { message: 'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial de entre !@#$%^&*.' }
    )
    @MinLength(5)
    password: string;
    @IsNotEmpty()
    @MinLength(5)
    confirmPassword: string;
    @IsString()
    address: string;
    @IsOptional()
    image: string;
    @IsEnum(['admin', 'user'])
    role: string;
    @IsDate()
    createad: string
}