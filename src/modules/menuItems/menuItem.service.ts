import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { MenuItem } from './entities/menuItems.entities';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { Category } from '../categories/entities/category.entity';


@Injectable()
export class MenuItemService implements OnModuleInit {
    constructor(
      @InjectRepository(MenuItem)
      private readonly menuItemRepository: Repository<MenuItem>,
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
    ) {}
  

    async onModuleInit() {
        await this.seedMenuItems();
      }
    
      private async seedMenuItems(): Promise<void> {
        try {
          const menuItemsData: CreateMenuItemDto[] = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
    
          for (const menuItemData of menuItemsData) {
            const { categoryId, ...menuItemDto } = menuItemData;
    
            
            let category: Category;
            if (categoryId) {
              category = await this.categoryRepository.findOne({ where: { id: categoryId } });
              if (!category) {
                console.log(`Category with ID ${categoryId} not found. Skipping menu item.`);
                continue;
              }
            }
    
        
            const menuItem = this.menuItemRepository.create({
              ...menuItemDto,
              category,
            });
    
            await this.menuItemRepository.save(menuItem);
          }
    
          console.log('Menu items seeded successfully.');
        } catch (error) {
          console.error('Error seeding menu items:', error);
        }
      }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = this.menuItemRepository.create(createMenuItemDto);
    return await this.menuItemRepository.save(menuItem);
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.preload({
      id,
      ...updateMenuItemDto,
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }

    return await this.menuItemRepository.save(menuItem);
  }

  async deactivate(id: string): Promise<MenuItem> {
    const menuItem = await this.findOne(id);

    menuItem.isActive = false; 
    return await this.menuItemRepository.save(menuItem);
  }
  
  async updateStock(
    updates: { menuItemId: string; stock: number }[],
  ): Promise<{ success: boolean; message: string }> {
    for (const update of updates) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: update.menuItemId },
      });

      if (!menuItem) {
        throw new NotFoundException(
          `Menu item with ID ${update.menuItemId} not found`,
        );
      }

      menuItem.stock = update.stock;
      await this.menuItemRepository.save(menuItem);
    }

    return { success: true, message: 'Stock updated successfully' };
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemRepository.find({
      where: { isActive: true }, 
      relations: ['category'], 
    });
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['category'], 
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }

    return menuItem;
  }



  
}