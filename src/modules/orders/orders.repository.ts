//orders.repository.ts

import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findOrders(): Promise<Order[]> {
    return this.find({ relations:{ orderDetails:{menuItem:true,combo:true}, user:true } });
  }

  async findAllActives(): Promise<Order[]> {
    return this.find({
      where: { isActive: true },  // Filtra solo las órdenes activas
      relations: {
        orderDetails: { menuItem: true, combo: true },
        user: true,
      },
    });
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: { orderDetails:{menuItem:true,combo:true}, user:true },
    });
  }
}