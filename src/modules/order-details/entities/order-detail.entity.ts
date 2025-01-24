import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; 
import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';
 
  
  @Entity('orders_details')
  export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
    order: Order; // Relación con la orden principal
  
     @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderDetails, { onDelete: 'CASCADE' })
     menuItem: MenuItem; 
  
    @Column({ type: 'int' })
    quantity: number; // Cantidad del ítem
  
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number; // Subtotal del ítem
  }
  