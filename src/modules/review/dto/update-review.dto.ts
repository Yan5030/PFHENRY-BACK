import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdateReviewDto{
    @ApiProperty({
        description: "Añadir la descripcion sobre el restaurante",
        example: "Excelente restaurante, decido cambiar mi reseña"
      })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: "Ingresamos el valor de rate, valores validos de 1 a 5",
        example: "5"
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rate: number
}