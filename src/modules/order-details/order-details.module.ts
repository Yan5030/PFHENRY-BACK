import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { MenuItemService } from '../menuItems/menuItem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { Category } from '../categories/entities/category.entity';
//import { OrderDetailsController } from './order-details.controller';

@Module({
  imports:[TypeOrmModule.forFeature([OrderDetail,MenuItem,Category])],
  controllers: [],
  providers: [OrderDetailsService,MenuItemService],
  exports:[OrderDetailsService]
})
export class OrderDetailsModule {}