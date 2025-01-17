import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from '../orders-details/entities/order-detail.entity'; 
import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { OrderDetailsService } from '../orders-details/order-details.service';
import { User } from '../users/entities/user.entity';
import { MenuItemService } from '../menuItems/menuItem.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, MenuItem,Order,User,Category])],
controllers: [OrdersController],
  providers: [OrdersService,UsersService,OrderDetailsService,MenuItemService],
})
export class OrdersModule {}