import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';  
import { Category } from './entities/category.entity';  
import { CreateCategoryDto } from './dto/create-category.dto';
import {  UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository,  
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.findAllCategories();
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);  
    }
    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findCategoryById(id);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);  
    }
    return this.categoriesRepository.updateCategory(id, updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<void> {
    const existingCategory = await this.categoriesRepository.findCategoryById(id);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`); 
    }
    await this.categoriesRepository.deleteCategory(id);
  }
}
