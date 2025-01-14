import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { OrderDetail } from '../../orders/entities/order-detail.entity';
  import { Category } from '../../categories/entities/category.entity';
  
  @Entity('menu_items')
  export class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string; 
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number; 
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url?: string; 
  
    @ManyToOne(() => Category, (category) => category.menuItems, { onDelete: 'SET NULL' })
    category: Category; 
  
/*     @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuItem)
    orderDetails: OrderDetail[]; */

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

  }
  