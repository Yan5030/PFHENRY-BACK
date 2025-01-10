import{IsString,IsEmail, IsStrongPassword, IsNotEmpty, IsOptional, MinLength, MaxLength} from "class-validator"
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name:string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
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
    @MaxLength(80)
    address:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image_url:string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
      }

}
