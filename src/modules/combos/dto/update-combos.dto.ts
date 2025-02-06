
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
    description:"Array de los items que contiene el combo",
    example: [{"id":"b22f1249-6ae3-45cc-bd2d-fe3790bf58a3"},{"id": "83e2f9e4-fbc0-45b6-b337-61c8572d78e9"}, {"id": "4af58e29-a5dd-4253-9bcf-b7f25e1d0aee"}, {"id": "15b22e57-bd78-4960-8e80-935f2a30b111"}],
  })
  items?: string[];
}
