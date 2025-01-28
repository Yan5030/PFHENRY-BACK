import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity'; 
import { Category } from '../../categories/entities/category.entity';
import { Combo } from 'src/modules/combos/entities/combos.entities';

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

  @Column({nullable:true})
  stock: number;

  @ManyToOne(() => Category, (category) => category.menuItems, { eager: true })
  category: Category;

  @ManyToMany(() => Combo, (combo) => combo.menuItems)
  combos: Combo[];

   @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuItem)
  orderDetails: OrderDetail[]

@Column({ type: 'boolean', default: true })
isActive: boolean;


}