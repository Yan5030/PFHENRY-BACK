import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { MenuItem } from './entities/menuItems.entities';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { Combo } from '../combos/entities/combos.entities';


@Injectable()
export class MenuItemService implements OnModuleInit {
    constructor(
      @InjectRepository(Combo)
      private readonly combosRepository: Repository<Combo>,
      @InjectRepository(MenuItem)
      private readonly menuItemRepository: Repository<MenuItem>,
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
    ) {}
    async onModuleInit() {
      await this.seedCategories(); 
      await this.seedMenuItems();   
      await this.preloadCombos();
      await this.associateMenuItemsToCombos();  
    }
    
    private async seedCategories(): Promise<void> {
      const categoriesData: CreateCategoryDto[] = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
    
      for (const categoryData of categoriesData) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
    
      console.log('Categories se precargaron correctamente.');
    }
    
    private async seedMenuItems(): Promise<void> {
      const menuItemsData: CreateMenuItemDto[] = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
    
      for (const menuItemData of menuItemsData) {
        const { categoryId, ...menuItemDto } = menuItemData;
    
        let category: Category | null = null;
        if (categoryId) {
          category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    
          if (!category) {
            console.log(`Categoria con ID ${categoryId} no existe.`);
            continue;
          }
        }
    
        const menuItem = this.menuItemRepository.create({
          ...menuItemDto,
          category,
        });
    
        await this.menuItemRepository.save(menuItem);
      }
    
      console.log('Menu items precargado correctamente.');
    }
    
    private async preloadCombos(): Promise<void> {
      const hogwartsHouseCombos = [
        { name: 'Gryffindor Combo', price: 15.99, description: 'Un combo lleno de valor y coraje.' },
        { name: 'Hufflepuff Combo', price: 14.99, description: 'Un combo lleno de lealtad y trabajo duro.' },
        { name: 'Ravenclaw Combo', price: 16.49, description: 'Un combo lleno de sabiduría e ingenio.' },
        { name: 'Slytherin Combo', price: 17.99, description: 'Un combo lleno de ambición y astucia.' }
      ];
    
      for (const comboData of hogwartsHouseCombos) {
        const combo = this.combosRepository.create(comboData);
        await this.combosRepository.save(combo);
        console.log(`Combo "${comboData.name}" creado exitosamente, pero sin items asociados.`);
      }
    
      console.log('Combos precargados correctamente.');
    }
    
    private async associateMenuItemsToCombos(): Promise<void> {
      const combos = await this.combosRepository.find();
      const menuItems = await this.menuItemRepository.find();
    
      for (const combo of combos) {
        let items: MenuItem[] = [];
    
        switch (combo.name) {
          case 'Gryffindor Combo':
            items = menuItems.filter(item => item.name.includes('Gryffindor'));
            break;
          case 'Hufflepuff Combo':
            items = menuItems.filter(item => item.name.includes('Hufflepuff'));
            break;
          case 'Ravenclaw Combo':
            items = menuItems.filter(item => item.name.includes('Ravenclaw'));
            break;
          case 'Slytherin Combo':
            items = menuItems.filter(item => item.name.includes('Slytherin'));
            break;
          default:
            break;
        }
    
        if (items.length > 0) {
          combo.menuItems = items;
          await this.combosRepository.save(combo);
          console.log(`Items asociados al combo "${combo.name}" correctamente.`);
        }
      }
    }
    
    private async getMenuItemsByIds(itemIds: string[]): Promise<MenuItem[]> {
      const items = await Promise.all(
        itemIds.map(async (itemId: string) => {
          const item = await this.menuItemRepository.findOne({ where: { id: itemId } });
          if (!item) {
            throw new NotFoundException(`MenuItem with ID ${itemId} not found`);
          }
          return item;
        })
      );
      return items;
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