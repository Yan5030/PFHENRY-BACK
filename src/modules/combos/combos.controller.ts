

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CreateComboDto } from './dto/create-combos.dto';
import { UpdateComboDto } from './dto/update-combos.dto';
import { ApiBody } from '@nestjs/swagger';


@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Post()
  create(@Body() createComboDto: CreateComboDto) {
    return this.combosService.create(createComboDto);
  }

  @Get()
  findAll() {
    return this.combosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combosService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateComboDto: UpdateComboDto) {
  //   return this.combosService.update(id, updateComboDto);
  // }

  //import { ApiBody } from '@nestjs/swagger';

@Patch(':id')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Gryffindor Combo NUEVO222' },
      description: { type: 'string', example: 'Un combo lleno de valor y coraje.' },
      items: {
        type: 'array',
        items: { type: 'string' },
        example: [
          "5187a1f2-6edd-41db-a7d5-2f2742870414",
          "47826e03-a13a-479b-9153-ff2bf54d1b29",
          "3f5d808f-a7fd-466a-ac4f-96d7229df323"
        ]
      }
    }
  }
})
async update(
  @Param('id') id: string,
  @Body() updateComboDto: Partial<UpdateComboDto> 
) {
  const allowedFields = ['items', 'name', 'description'];
  const filteredDto = Object.keys(updateComboDto)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = updateComboDto[key];
      return obj;
    }, {} as Partial<UpdateComboDto>);

  return this.combosService.update(id, filteredDto);
}


  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.combosService.deactivate(id);
  }
}


