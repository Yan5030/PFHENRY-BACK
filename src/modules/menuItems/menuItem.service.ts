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
        console.log(`La categoría "${categoryData.name}" ya existe. No se creará.`);
        continue;
      }
  
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);
    }
  
    console.log('Categories se precargaron correctamente.');
  }
  
  private async seedMenuItems(): Promise<void> {
    const menuItemsData: CreateMenuItemDto[] = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
  
    for (const menuItemData of menuItemsData) {
      const { category, ...menuItemDto } = menuItemData;
  
     
      const existingMenuItem = await this.menuItemRepository.findOne({ where: { name: menuItemDto.name } });
      if (existingMenuItem) {
        console.log(`El menú item "${menuItemDto.name}" ya existe. No se creará.`);
        continue;
      }
  
      const categoryEntity = category
        ? await this.categoryRepository.findOne({ where: { name: category } })
        : null;
  
      if (!categoryEntity) {
        console.log(`La categoría "${category}" no existe. El item no se creará.`);
        continue;
      }
  
      const menuItem = this.menuItemRepository.create({
        ...menuItemDto,
        category: categoryEntity,
      });
  
      await this.menuItemRepository.save(menuItem);
    }
  
    console.log('Menu items precargados correctamente.');
  }
  
  private async preloadCombos(): Promise<void> {
    const hogwartsHouseCombos = [
      { name: 'Gryffindor Combo', price: 27.36, description: 'Un combo lleno de valor y coraje.',image: "https://i.postimg.cc/Ls5qLFJ9/gryffindor.png" },
      { name: 'Hufflepuff Combo', price: 24.99, description: 'Un combo lleno de lealtad y trabajo duro.',image: "https://i.postimg.cc/Qd6jrB0m/hufflepuff.png" },
      { name: 'Ravenclaw Combo', price: 16.50, description: 'Un combo lleno de sabiduría e ingenio.',image: "https://i.postimg.cc/RC1GFwKM/ravenclaw.png" },
      { name: 'Slytherin Combo', price: 10.07, description: 'Un combo lleno de ambición y astucia.', image: "https://i.postimg.cc/3wpxh86c/slyterin.png" },
    ];
  
    for (const comboData of hogwartsHouseCombos) {
    
      const existingCombo = await this.combosRepository.findOne({ where: { name: comboData.name } });
      if (existingCombo) {
        console.log(`El combo "${comboData.name}" ya existe. No se creará.`);
        continue;
      }
  
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
        console.log(`Items asociados al combo "${combo.name}" correctamente.`);
      } else {
        console.log(`No se encontraron items para asociar al combo "${combo.name}".`);
      }
    }
  }
  
  
  private async getMenuItemsByIds(itemIds: string[]): Promise<MenuItem[]> {
    const items = await Promise.all(
      itemIds.map(async (itemId: string) => {
        const item = await this.menuItemRepository.findOne({ where: { id: itemId } });
        if (!item) {
          throw new NotFoundException(`MenuItem con id ${itemId} no encontrado`);
        }
        return item;
      }),
    );
    return items;
  }
  
  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const { category, ...menuItemDto } = createMenuItemDto;

    const categoryEntity = category
      ? await this.categoryRepository.findOne({ where: { name: category } })
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

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem> {
    const { category, ...menuItemDto } = updateMenuItemDto;
console.log(updateMenuItemDto);
console.log(id);


    const categoryEntity = category
      ? await this.categoryRepository.findOne({ where: { name: category } })
      : null;

    const menuItem = await this.menuItemRepository.preload({
      id,
      ...menuItemDto,
    //  category: categoryEntity,
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem con id ${id} no econtrado`);
    }
console.log(menuItem);

    return await this.menuItemRepository.save(menuItem);
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
        throw new NotFoundException(`MenuItem con id ${update.menuItemId} no encontrado`);
      }

      menuItem.stock = update.stock;
      await this.menuItemRepository.save(menuItem);
    }

    return { success: true, message: 'Stock actualizado correctamente' };
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
      throw new NotFoundException(`MenuItem con id ${id} no encontrado`);
    }

    return menuItem;
  }
}
