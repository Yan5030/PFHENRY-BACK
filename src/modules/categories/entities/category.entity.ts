import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
  //import { MenuItem } from '../../menuItem/entities/MenuItem';

  
  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;
  
    @Column({ type: 'varchar', length: 255 })
    description: string;
  
    //@OneToMany(() => MenuItem, (menuItem) => menuItem.category)
    //menuItems: MenuItem[];
  }
  