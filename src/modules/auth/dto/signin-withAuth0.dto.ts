import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SigninWithAuth0Dto {
    @ApiProperty({
        description: "El email debe contener entre 3 y 80 caracteres y ser formato email",
        example: "maximiliano@email.com",
    })
    @IsEmail()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    email: string;

    @ApiProperty({
        description: "Nombre del usuario",
        example: "Maximiliano",
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name?: string;

    @ApiProperty({
        description: "ID generado por Auth0",
        example: "auth0|1234567890",
      })
      @IsString()
      @IsNotEmpty({ message: 'El campo auth0Id es requerido' })
      auth0Id: string;
}
