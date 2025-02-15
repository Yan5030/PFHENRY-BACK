import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; 
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity'; 
import { PaymentMethod } from 'src/enum/payment-method.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import { OrderStatus } from 'src/enum/order-status.enum';

@Entity('orders') 
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { eager: true }) 
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true }) 
  orderDetails: OrderDetail[]; 

  @Column({
      type: "enum",
      enum: OrderStatus,
      default: OrderStatus.EN_PREPARACION, // Valor predeterminado
    })
    status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @CreateDateColumn({type:"date", default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({
      type: "enum",
      enum: PaymentMethod,
      default: PaymentMethod.Cash, 
    })
    paymentMethod: PaymentMethod; 

    @Column({
      type: "enum",
      enum: PaymentStatus,
      default: PaymentStatus.PENDIENTE, // Valor predeterminado
    })
    payment_status: PaymentStatus; // Estado de pago como enum

    
    @Column({ type: 'varchar', length: 255, nullable: true })
    comment?: string; // Personalización opcional

    @Column({ type: 'boolean', default: true })
    isActive: boolean; // Para borrado lógico
}

