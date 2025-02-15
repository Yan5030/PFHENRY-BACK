
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Combo } from './entities/combos.entities';

import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { CreateComboDto } from './dto/create-combos.dto';
import { UpdateComboDto } from './dto/update-combos.dto';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly combosRepository: Repository<Combo>,
    @InjectRepository(MenuItem)
    private readonly menuItemsRepository: Repository<MenuItem>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createComboDto: CreateComboDto): Promise<Combo> {
    return await this.dataSource.transaction(async (manager) => {
      
      const items = await this.getMenuItemsByIds(createComboDto.items);
      const combo = this.combosRepository.create({ ...createComboDto, menuItems:items });
      return manager.save(combo);
    });
  }

  async findAll(): Promise<Combo[]> {
  
    const combos = await this.combosRepository.find({ relations: ['menuItems', 'menuItems.category'] });

    return combos.map(combo => ({
      ...combo,
      stockCombos: Math.min(...combo.menuItems.map(item => item.stock)),
    }))
  }
  

  async findOne(id: string): Promise<Combo> {
    const combo = await this.combosRepository.findOne({
      where: { id },
      relations: {menuItems:true},
    });
    if (!combo) {
      throw new NotFoundException(`Combo with ID ${id} not found`);
    }
    return {
      ...combo,
      stockCombos: Math.min(...combo.menuItems.map(item => item.stock)),
    }
  }


async update(id: string, updateComboDto: Partial<UpdateComboDto>): Promise<Combo> {
  const combo = await this.findOne(id);
  if (!combo) {
    throw new NotFoundException(`Combo whit ID ${id} not found`);
  }

  
  if (updateComboDto.items) {
    const itemIds = updateComboDto.items;
    combo.menuItems = await this.getMenuItemsByIds(itemIds);
  }

  
  combo.name = updateComboDto.name ?? combo.name;
  combo.description = updateComboDto.description ?? combo.description;

  return this.combosRepository.save(combo);
}

  async deactivate(id: string): Promise<void> {
    const combo = await this.findOne(id);
    combo.isActive = false;
    await this.combosRepository.save(combo);
  }

  private async getMenuItemsByIds(itemIds: string[]): Promise<MenuItem[]> {
    const items = await Promise.all(
      itemIds.map(async (itemId) => {
        const item = await this.menuItemsRepository.findOne({ where: { id: itemId } });
        if (!item) {
          throw new NotFoundException(`MenuItem with ID ${itemId} not found`);
        }
        return item;
      }),
    );
    return items;
  }
}