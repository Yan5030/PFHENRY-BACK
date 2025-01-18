import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menuItems.entities';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { Category } from '../categories/entities/category.entity';
export declare class MenuItemService implements OnModuleInit {
    private readonly menuItemRepository;
    private readonly categoryRepository;
    constructor(menuItemRepository: Repository<MenuItem>, categoryRepository: Repository<Category>);
    seedMenuItems(): Promise<string>;
    onModuleInit(): Promise<void>;
    create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem>;
    deactivate(id: string): Promise<MenuItem>;
    findAll(): Promise<MenuItem[]>;
    findOne(id: string): Promise<MenuItem>;
}
