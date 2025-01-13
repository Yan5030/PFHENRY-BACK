import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Order } from '../../orders/entities/order.entity'; 
 // import { MenuItem } from '../../menu-items/entities/menu-item.entity'; 
  
  @Entity('orders_details')
  export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
    order: Order; // Relación con la orden principal
  
   // @ManyToOne(() => MenuItem, { eager: true, onDelete: 'SET NULL' }) // Menú relacionado
   // menuItem: MenuItem; // Relación con el ítem del menú
  
    @Column({ type: 'int' })
    quantity: number; // Cantidad del ítem
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    customization?: string; // Personalización opcional
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number; // Subtotal del ítem
  }
  