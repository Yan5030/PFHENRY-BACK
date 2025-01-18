import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { MenuItem } from './entities/menuItems.entities';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { Category } from '../categories/entities/category.entity';
// import * as data from '../utils/data.json';
import data from '../utils/data.json';



@Injectable()
export class MenuItemService implements OnModuleInit {
    constructor(
      @InjectRepository(MenuItem)
      private readonly menuItemRepository: Repository<MenuItem>,
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
    ) {}
  
    async seedMenuItems() {
      const categories = await this.categoryRepository.find();
      const missingCategories = new Set<string>();
  
      for (const item of data) {
        const category = categories.find(cat => cat.name === item.category);
  
        if (!category) {
          missingCategories.add(item.category);
          continue;
        }

        const menuItemExists = await this.menuItemRepository.findOne({ where: { name: item.name } });
  
        if (!menuItemExists) {
          const newMenuItem = this.menuItemRepository.create({
            name: item.name,
            description: item.description,
            price: item.price,
            image_url: item.image_url,
            category: category,
          });
  
          await this.menuItemRepository.save(newMenuItem);
        }
      }
      if(missingCategories.size > 0) {
        return `Las siguientes categorías no existen: ${[...missingCategories].join(', ')}`;
      }
  
      return 'Menú cargado con éxito';
    }

    async onModuleInit() {
        await this.seedMenuItems();
      }
    
      // private async seedMenuItems(): Promise<void> {
      //   try {
      //     const menuItemsData: CreateMenuItemDto[] = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
    
      //     for (const menuItemData of menuItemsData) {
      //       const { categoryId, ...menuItemDto } = menuItemData;
    
            
      //       let category: Category;
      //       if (categoryId) {
      //         category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      //         if (!category) {
      //           console.log(`Category with ID ${categoryId} not found. Skipping menu item.`);
      //           continue;
      //         }
      //       }
    
        
      //       const menuItem = this.menuItemRepository.create({
      //         ...menuItemDto,
      //         category,
      //       });
    
      //       await this.menuItemRepository.save(menuItem);
      //     }
    
      //     console.log('Menu items seeded successfully.');
      //   } catch (error) {
      //     console.error('Error seeding menu items:', error);
      //   }
      // }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    //
    const category = await this.categoryRepository.findOne({ where: { id: createMenuItemDto.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    //
    const menuItem = this.menuItemRepository.create({...createMenuItemDto, category});
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
