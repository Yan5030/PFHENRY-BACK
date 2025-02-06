
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateComboDto } from './create-combos.dto';

// export class UpdateComboDto extends PartialType(CreateComboDto) {}
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComboDto } from './create-combos.dto';

export class UpdateComboDto extends PartialType(CreateComboDto) {
  @ApiProperty({ example: "Gryffindor Combo", description: "Nombre del combo" })
  name?: string;

  @ApiProperty({ example: "Un combo lleno de valor y coraje.", description: "Descripción del combo" })
  description?: string;

  @ApiProperty({
    example: [
      { id: "e459fb02-dd7d-418b-81b1-6e2eb3c75349" },
      { id: "d954f876-1962-4d67-926d-334b5582d067" },
      { id: "b59f9af4-24ce-4c29-b572-53345fb6a61c" }
    ],
    description: "Lista de IDs de los elementos del menú"
  })
  menuItems?: { id: string }[];
}
