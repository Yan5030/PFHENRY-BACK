import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menuItems.entities';
import { MenuItemService } from './menuItem.service';
import { MenuItemController } from './menuItem.controller';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity'; 


@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Category, OrderDetail])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
  exports: [MenuItemService],
})
export class MenuItemModule {}