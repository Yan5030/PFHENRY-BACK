import { IsString, IsOptional, IsNumber, IsUUID, IsDecimal, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({
    description: 'Nombre del ítem del menú',
    example: 'Hamburguesa con queso',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  name: string; 

  @ApiProperty({
    description: 'Descripción opcional del ítem del menú',
    example: 'Una deliciosa hamburguesa con queso y cebolla',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string; 

  @ApiProperty({
    description: 'Precio del ítem del menú',
    example: 9.99,
    type: 'number',
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; 
  
  @ApiProperty({
    description: 'Cantidad disponible en stock del ítem',
    example: 50,
    type: 'number',
    minimum: 0,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'URL opcional de la imagen del ítem del menú',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @Length(0, 255)
  image_url?: string; 

  @ApiProperty({ 
    description: 'Nombre de la categoría asociada', 
    example: 'Comida Rápida' 
  })
  @IsOptional()
  @IsString()
  category: string; 
}
