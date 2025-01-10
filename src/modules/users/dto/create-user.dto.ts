import { Transform } from "class-transformer";
import{IsString,IsEmail, IsStrongPassword, IsNotEmpty, IsOptional, MinLength, MaxLength, IsUrl} from "class-validator"
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @Transform(({ value }) => value.trim()) // Elimina espacios del principio y del final
    name:string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    email:string;
    
    @IsString()
    @IsNotEmpty()
    //@IsStrongPassword()
    @MinLength(8)
    password:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    address:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    image_url:string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
      }

}
