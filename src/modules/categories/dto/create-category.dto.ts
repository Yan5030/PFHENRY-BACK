import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'El nombre debe tener entre 1 y 100 caracteres',
    example: 'Bebidas',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;
  @ApiProperty({
    description: 'La descripción debe tener entre 1 y 255 caracteres',
    example: 'Pociones y brebajes inspirados en Harry Potter',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  description: string;
}
  