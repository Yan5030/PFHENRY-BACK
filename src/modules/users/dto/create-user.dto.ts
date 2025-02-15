import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import{IsString,IsEmail, IsStrongPassword, IsNotEmpty, IsOptional, MinLength, MaxLength, IsUrl} from "class-validator"
export class CreateUserDto{
 
@ApiProperty ({
description: "id generado por auth0",
default:null})
@IsOptional()
@IsString()
auth0Id: string | null = null;


  @ApiProperty({
    description:"El nombre debe tener entre 3 y 80 caracteres",
    example:"Maximiliano"
  })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @Transform(({ value }) => value.trim())
    name:string;


   
    @ApiProperty({
      description:"El email debe contener entre 3 y 80 caracteres y ser formato email",
      example:"maximiliano@email.com"
    })
    @IsEmail()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    email:string;
   
   
    @ApiProperty({
      description:"Debe contener una mayuscula, un numero y caracter especial",
      example:"Ejemplo91*"
    })
    @IsString()
    @IsStrongPassword()
    @IsOptional()
    @MinLength(8)
    password?:string;


    @ApiProperty({
      description:"Debe contener una mayuscula, un numero y caracter especial, Debe ser igual a password",
      example:"Ejemplo91*"
    })
    @IsString()
    @IsNotEmpty()
   @IsStrongPassword()
    @IsOptional()
    @MinLength(8)
    ConfirmPassword?:string;

  
    @ApiProperty({
      description:"Debe contener entre 3 y 80 caracteres",
      example:"CalleFalsa"
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    address:string;


    @ApiProperty({
      description:"Debe contener la url de la img almacenada en cloudinary",
      example:"http://example.com",
      default: "http://example.com" 
    }) 
    @IsString()
    //@IsNotEmpty()
    @IsOptional()
    @IsUrl()
    image_url:string;

    @ApiProperty({
      description: "Indica si el perfil está completo o no",
      example: false,
    })
    @IsOptional()
    isComplete?: boolean;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
      }


}
