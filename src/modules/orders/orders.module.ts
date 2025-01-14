import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/Order-detail.entity';
import { MenuItem } from '../menuItems/entities/menuItems.entities';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, MenuItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
