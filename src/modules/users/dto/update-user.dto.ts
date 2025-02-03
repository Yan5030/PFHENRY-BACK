import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength, MaxLength, IsUrl } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: "El nombre debe tener entre 3 y 80 caracteres",
    example: "Maximiliano",
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  @ApiProperty({
    description: "Debe contener entre 3 y 80 caracteres",
    example: "CalleFalsa",
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  address?: string;


    @ApiProperty({
        description:"Debe contener la url de la img almacenada en cloudinary",
        example:"http://example.com",
        default: "http://example.com" 
      }) 
      @IsString()
      //@IsNotEmpty()
      @IsOptional()
      @IsUrl()
      image_url?:string;
}
