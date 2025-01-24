import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menuItems.entities';
import { MenuItemService } from './menuItem.service';
import { MenuItemController } from './menuItem.controller';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity'; 
import { Combo } from '../combos/entities/combos.entities';
import { CombosService } from '../combos/combos.service';
import { CategoriesService } from '../categories/categories.service';


@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Category, OrderDetail,Combo])],
  controllers: [MenuItemController],
  providers: [MenuItemService,CombosService,CategoriesService],
  exports: [MenuItemService],
})
export class MenuItemModule {}