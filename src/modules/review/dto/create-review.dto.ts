import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({ 
        description: "Añadir la descripcion sobre el restaurante", 
        example: "Maximiliano"
      })
    @IsString()
    description: string;
    @ApiProperty({ 
        description: "Ingresamos el valor de rate, valores validos de 1 a 5", 
        example: "4"
    })
    @IsNumber()     
    @Min(1)
    @Max(5)
    rate: number;
}