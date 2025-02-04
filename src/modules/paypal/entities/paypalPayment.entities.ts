import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class PaypalPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  paypalPaymentId: string; 

  @Column({ type: 'varchar' })
  orderId: string; 

  @Column({ type: 'varchar' })
  payerEmail: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; 

  @Column({ type: 'varchar', length: 3 })
  currency: string; 

  @Column({ type: 'varchar' })
  status: string; 

  @CreateDateColumn()
  createdAt: Date;
}
