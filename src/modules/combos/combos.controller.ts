

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CreateComboDto } from './dto/create-combos.dto';
import { UpdateComboDto } from './dto/update-combos.dto';


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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComboDto: UpdateComboDto) {
    return this.combosService.update(id, updateComboDto);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.combosService.deactivate(id);
  }
}

