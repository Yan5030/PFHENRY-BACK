import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; 
import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';
import { Combo } from 'src/modules/combos/entities/combos.entities';
 
  
  @Entity('orders_details')
  export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
    order: Order;
  
     @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderDetails, { onDelete: 'CASCADE' })
     menuItem: MenuItem; 

     @ManyToOne(() => Combo, (combo) => combo.orderDetails, { onDelete: 'CASCADE' })
     combo: Combo; 
  
    @Column({ type: 'int' })
    quantity: number; 
  
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
  }
  