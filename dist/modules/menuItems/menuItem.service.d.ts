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
    onModuleInit(): Promise<void>;
    private seedMenuItems;
    create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem>;
    deactivate(id: string): Promise<MenuItem>;
    updateStock(updates: {
        menuItemId: string;
        stock: number;
    }[]): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(): Promise<MenuItem[]>;
    findOne(id: string): Promise<MenuItem>;
}
