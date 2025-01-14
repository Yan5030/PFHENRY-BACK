import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';  
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>, 
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['menuItems'],  // Incluye los MenuItems relacionados
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }


  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;


    const existingCategory = await this.categoriesRepository.findOne({ where: { name } });
    if (existingCategory) {
      throw new ConflictException(`Category with name "${name}" already exists`);
    }


    const newCategory = this.categoriesRepository.create(createCategoryDto);


    return this.categoriesRepository.save(newCategory);
  }


  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findCategoryById(id);

    Object.assign(category, updateCategoryDto);

    return this.categoriesRepository.save(category);
  }


  async deleteCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
  }
}

