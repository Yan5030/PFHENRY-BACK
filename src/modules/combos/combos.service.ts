/* import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Combo } from './entities/combos.entities';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { MenuItem } from '../menuitems/entities/menuitems.entities';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly combosRepository: Repository<Combo>,
    @InjectRepository(MenuItem)
    private readonly menuItemsRepository: Repository<MenuItem>,
  ) {}

  async onModuleInit() {
    await this.preloadCombos();
  }

  async create(createComboDto: CreateComboDto): Promise<Combo> {
    const items = await Promise.all(
      createComboDto.items.map(async (itemId) => {
        const item = await this.menuItemsRepository.findOne(itemId);
        if (!item) {
          throw new NotFoundException(`MenuItem with ID ${itemId} not found`);
        }
        return item;
      })
    );
    const combo = this.combosRepository.create({ ...createComboDto, items });
    return this.combosRepository.save(combo);
  }

  async findAll(): Promise<Combo[]> {
    return this.combosRepository.find({ relations: ['items'] });
  }

  async findOne(id: string): Promise<Combo> {
    const combo = await this.combosRepository.findOne({ where: { id }, relations: ['items'] });
    if (!combo) {
      throw new NotFoundException(`Combo with ID ${id} not found`);
    }
    return combo;
  }

  async update(id: string, updateComboDto: UpdateComboDto): Promise<Combo> {
    const combo = await this.findOne(id);
    const items = await Promise.all(
      updateComboDto.items.map(async (itemId) => {
        const item = await this.menuItemsRepository.findOne(itemId);
        if (!item) {
          throw new NotFoundException(`MenuItem with ID ${itemId} not found`);
        }
        return item;
      })
    );
    Object.assign(combo, updateComboDto, { items });
    return this.combosRepository.save(combo);
  }

  async deactivate(id: string): Promise<void> {
    const combo = await this.findOne(id);
    combo.isActive = false;
    await this.combosRepository.save(combo);
  }

  async preloadCombos(): Promise<void> {
    const filePath = path.join(__dirname, 'data', 'combos.json');
    const combosData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const comboData of combosData) {
      const items = await Promise.all(
        comboData.items.map(async (itemId) => {
          const item = await this.menuItemsRepository.findOne(itemId);
          if (!item) {
            throw new NotFoundException(`MenuItem with ID ${itemId} not found`);
          }
          return item;
        })
      );
      const combo = this.combosRepository.create({ ...comboData, items });
      await this.combosRepository.save(combo);
    }
  }
} */