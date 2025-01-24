import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Combo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.combos, { cascade: true })
  @JoinTable()
  items: MenuItem[];
}
