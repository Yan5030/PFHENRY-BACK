import { Controller, Post, Body, Patch, Param, Get, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; 
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';

@ApiTags('menu-items') 
@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get('seeder')
  async seedMenuItems() {
    try {
      return await this.menuItemService.seedMenuItems();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Los elementos del menú ya han sido cargados con anterioridad',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  @ApiResponse({ status: 201, description: 'Ítem del menú creado exitosamente' })
  @ApiBody({ type: CreateMenuItemDto })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Ítem del menú actualizado exitosamente' })
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Patch(':id/deactivate')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Ítem del menú desactivado exitosamente' })
  deactivate(@Param('id') id: string) {
    return this.menuItemService.deactivate(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los ítems del menú' })
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Detalle del ítem del menú encontrado' })
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(id);
  }
}
