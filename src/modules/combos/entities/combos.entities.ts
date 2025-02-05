import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';


@Entity()
export class Combo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  //@Column('decimal', { precision: 10, scale: 2 })
  //price: number;
  @Column('decimal', { precision: 10, scale: 2, transformer: {
    to: (value: number) => value, // Guarda el número sin modificaciones
    from: (value: string) => parseFloat(value) // Convierte de string a number al recuperar
  }})
  price: number;
  
  @Column()
  image_url: string;


  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  stockCombos: number;

  @ManyToMany(() => MenuItem, menuItem => menuItem.combos, { cascade: true })
  @JoinTable()
  menuItems: MenuItem[];

@OneToMany(() => OrderDetail, (orderDetail) => orderDetail.combo)
  orderDetails: OrderDetail[]

}
