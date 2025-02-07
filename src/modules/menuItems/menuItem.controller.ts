import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; 
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('menu-items') 
@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @RolesDecorator(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Post()
  @ApiResponse({ status: 201, description: 'Menu item successfully created' })
  @ApiBody({ type: CreateMenuItemDto })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @RolesDecorator(Role.Admin,Role.Worker)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Menu item successfully updated' })
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.updateMenuItem(id, updateMenuItemDto);
  }

  @RolesDecorator(Role.Admin,Role.Worker)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Patch(':id/deactivate')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Menu item successfully deactivated' })
  deactivate(@Param('id') id: string) {
    return this.menuItemService.deactivate(id);
  }
  
  @Patch('update-stock')
  async updateStock(
    @Body() body: { updates: { menuItemId: string; stock: number }[] },
  ) {
    return this.menuItemService.updateStock(body.updates);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all menu items' })
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Detail of the menu item found' })
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(id);
  }
}
