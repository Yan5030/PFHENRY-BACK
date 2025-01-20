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
    return this.find({ relations: ['orderDetails', 'user'] });
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: ['orderDetails', 'user'],
    });
  }
}