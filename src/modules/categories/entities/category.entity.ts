import { MenuItem } from 'src/modules/menuItems/entities/menuItems.entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
 

  
  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    icon: string;
  
    @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
    menuItems: MenuItem[];
  }
  