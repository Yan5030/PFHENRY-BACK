

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsArray, IsUUID } from 'class-validator';
import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';

export class CreateComboDto {

  @ApiProperty({
    description:"Nombe del combo",
    example:"Gryffindor Combo"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  image: string;

  @ApiProperty({
    description:"Descripcion del combo",
    example:"Un combo lleno de lealtad y trabajo duro."
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del combo',
    example: 16.99,
    type: 'number',
    minimum: 0,
  })
  @IsDecimal()
  price: number;
  @ApiProperty({
    description:"Array de los items que contiene el combo",
    example: [{"id":"b22f1249-6ae3-45cc-bd2d-fe3790bf58a3"},{"id": "83e2f9e4-fbc0-45b6-b337-61c8572d78e9"}, {"id": "4af58e29-a5dd-4253-9bcf-b7f25e1d0aee"}, {"id": "15b22e57-bd78-4960-8e80-935f2a30b111"}],
  })
  items: string[];

}