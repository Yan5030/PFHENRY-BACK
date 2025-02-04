import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from '../order-details/entities/order-detail.entity'; 
import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { User } from '../users/entities/user.entity';
import { MenuItemService } from '../menuItems/menuItem.service';
import { Category } from '../categories/entities/category.entity';
import { OrderRepository } from './orders.repository';
import { Combo } from '../combos/entities/combos.entities';
import { CombosService } from '../combos/combos.service';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, MenuItem,Order,User,Category,Combo])],
controllers: [OrdersController],
  providers: [OrdersService,UsersService,OrderDetailsService,MenuItemService,OrderRepository,CombosService,NodemailerService],
})
export class OrdersModule {}