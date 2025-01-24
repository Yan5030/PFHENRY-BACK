

import { IsString, IsNotEmpty, IsDecimal, IsArray, IsUUID } from 'class-validator';
import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';

export class CreateComboDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  price: number;

  items: string[];

}