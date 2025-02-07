import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { MenuItem } from './entities/menuItems.entities';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { Combo } from '../combos/entities/combos.entities';
import { CategoryResponseDTO } from '../categories/dto/categoryResponse.dto';

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
      
      const existingCategory = await this.categoryRepository.findOne({ where: { name: categoryData.name } });
      if (existingCategory) {
        console.log(`The category "${categoryData.name}" already exists. It will not be created.`);
        continue;
      }
  
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);
    }
  
    console.log('Categories were preloaded correctly.');
  }
  
  private async seedMenuItems(): Promise<void> {
    const menuItemsData: CreateMenuItemDto[] = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
   
    for (const menuItemData of menuItemsData) {
      const { category, ...menuItemDto } = menuItemData;
  
     
      const existingMenuItem = await this.menuItemRepository.findOne({ where: { name: menuItemDto.name } });
      if (existingMenuItem) {
        console.log(`The menu item "${menuItemDto.name}" already exists. It will not be created.`);
        continue;
      }
  
      const categoryEntity = category
        ? await this.categoryRepository.findOne({ where: { name: category.trim() } })
        : null;
  
      if (!categoryEntity) {
        console.log(`Category "${category}" does not exist. The item will not be created.`);
        continue;
      }
  
      const menuItem = this.menuItemRepository.create({
        ...menuItemDto,
        category: categoryEntity,
      });
  
      await this.menuItemRepository.save(menuItem);
    }
  
    console.log('Menu items preloaded correctly.');
  }
  
  private async preloadCombos(): Promise<void> {
    const hogwartsHouseCombos = [
      { name: 'Gryffindor Combo', price: 27.36, description: 'Un combo lleno de valor y coraje.',image_url: "https://i.postimg.cc/Ls5qLFJ9/gryffindor.png" },
      { name: 'Hufflepuff Combo', price: 24.99, description: 'Un combo lleno de lealtad y trabajo duro.',image_url: "https://i.postimg.cc/Qd6jrB0m/hufflepuff.png" },
      { name: 'Ravenclaw Combo', price: 16.50, description: 'Un combo lleno de sabiduría e ingenio.',image_url: "https://i.postimg.cc/RC1GFwKM/ravenclaw.png" },
      { name: 'Slytherin Combo', price: 10.07, description: 'Un combo lleno de ambición y astucia.', image_url: "https://i.postimg.cc/3wpxh86c/slyterin.png" },
    ];
  
    for (const comboData of hogwartsHouseCombos) {
    
      const existingCombo = await this.combosRepository.findOne({ where: { name: comboData.name } });
      if (existingCombo) {
        console.log(`The combo "${comboData.name}" already exists. It will not be created.`);
        continue;
      }
  
      const combo = this.combosRepository.create(comboData);
      await this.combosRepository.save(combo);
      console.log(`Combo "${comboData.name}" created successfully, but without associated items.`);
    }
  
    console.log('Properly preloaded combos.');
  }
  
  private async associateMenuItemsToCombos(): Promise<void> {
    const combos = await this.combosRepository.find();
    const menuItems = await this.menuItemRepository.find(); 
  
    for (const combo of combos) {
      let items: MenuItem[] = [];
  
      switch (combo.name) {
        case 'Gryffindor Combo':
          items = menuItems.filter(
            (item) => item.name === 'The Butterbeer Beast' || item.name === 'The Sirius Black BBQ' || item.name === 'Felix Felicis Elixir' || item.name === 'Polyjuice Potion'
          );
          break;
        case 'Hufflepuff Combo':
          items = menuItems.filter(
            (item) => item.name === 'The Fiery Dragon Burger' || item.name === 'The Fiery Dragon Burger' || item.name === 'Felix Felicis Elixir' ||  item.name === 'Felix Felicis Elixir'
          );
          break;
        case 'Ravenclaw Combo':
          items = menuItems.filter(
            (item) => item.name === 'The Golden Snitch Cheese' || item.name === 'Pumpkin Juice' || item.name === 'Treacle Tart with Ice Cream'
          );
          break;
        case 'Slytherin Combo':
          items = menuItems.filter(
            (item) => item.name === 'Hogwarts Fries' || item.name === 'Dragon Wings' || item.name === 'Felix Felicis Elixir' || item.name === 'Felix Felicis Elixir'
          );
          break;
        default:
          break;
      }
  
      if (items.length > 0) {
        combo.menuItems = items;
        await this.combosRepository.save(combo);
        console.log(`Items associated with the combo "${combo.name}" correctly.`);
      } else {
        console.log(`No items were found to associate with the combo "${combo.name}".`);
      }
    }
  }
  
  
  private async getMenuItemsByIds(itemIds: string[]): Promise<MenuItem[]> {
    const items = await Promise.all(
      itemIds.map(async (itemId: string) => {
        const item = await this.menuItemRepository.findOne({ where: { id: itemId } });
        if (!item) {
          throw new NotFoundException(`MenuItem with id ${itemId} not found`);
        }
        return item;
      }),
    );
    return items;
  }
  
  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const { category, ...menuItemDto } = createMenuItemDto;

    const categoryEntity = category
      ? await this.categoryRepository.findOne({ where: { name: category.trim() } })
      : null;

    if (!categoryEntity) {
      throw new NotFoundException(`Category "${category}" not found.`);
    }

    const menuItem = this.menuItemRepository.create({
      ...menuItemDto,
      category: categoryEntity,
    });

    return await this.menuItemRepository.save(menuItem);
  }

  async updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const { category, ...menuItemData } = updateMenuItemDto;

  
    const menuItem = await this.menuItemRepository.findOne({
        where: { id },
        relations: ['category'], 
    });

    if (!menuItem) {
        throw new NotFoundException(`Menu with id ${id} does not exist`);
    }

    let categoryEntity: Category | null = null;

  
    if (category) {
        categoryEntity = await this.categoryRepository.findOne({ where: { name: category } });

        if (!categoryEntity) {
           
            categoryEntity = this.categoryRepository.create({ name: category, icon: 'default-icon' }); 
            await this.categoryRepository.save(categoryEntity);
        }
    }

    
    const updatedMenuItem = await this.menuItemRepository.save({
        ...menuItem,
        ...menuItemData,
        category: categoryEntity || menuItem.category, 
    });

    
    return {
        id: updatedMenuItem.id,
        name: updatedMenuItem.name,
        description: updatedMenuItem.description,
        price: updatedMenuItem.price,
        image_url: updatedMenuItem.image_url,
        stock: updatedMenuItem.stock,
        isActive: updatedMenuItem.isActive,
        category: updatedMenuItem.category
            ? new CategoryResponseDTO(updatedMenuItem.category)
            : null, 
    };
}

  async deactivate(id: string): Promise<MenuItem> {
    const menuItem = await this.findOne(id);
    menuItem.isActive = false;
    return await this.menuItemRepository.save(menuItem);
  }

  async updateStock(updates: { menuItemId: string; stock: number }[]): Promise<{ success: boolean; message: string }> {
    for (const update of updates) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: update.menuItemId },
      });

      if (!menuItem) {
        throw new NotFoundException(`MenuItem with id ${update.menuItemId} not found`);
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
      throw new NotFoundException(`MenuItem with id ${id} not found`);
    }

    return menuItem;
  }
}
