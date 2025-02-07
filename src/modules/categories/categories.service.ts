import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';  
import { CreateCategoryDto } from './dto/create-category.dto';
import {  UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';



@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,  
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({relations: ['menuItems']});
  }


  async findCategoryById(id: string): Promise<Category> {
     const category = await this.categoriesRepository.findOne({
      where: {id},
      relations: ['menuItems']
     });
     if (!category) {
       throw new NotFoundException(`The category with the ID: ${id} was not found`);  
     }
     return category;
   }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
     const { name } = createCategoryDto;

     const existingCategory = await this.categoriesRepository.findOne({ where: { name } });
     if(existingCategory){
       throw new BadRequestException(`The category with the name "${name}" already exists`);
     }

     const newCategory = this.categoriesRepository.create(createCategoryDto)

     return this.categoriesRepository.save(newCategory)
   }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findCategoryById(id);
     if (!category) {
       throw new NotFoundException(`Category with id: ${id} was not found`);  
     }
     const updatedCategory = Object.assign(category, updateCategoryDto);

     return await this.categoriesRepository.save(updatedCategory);
   }

   async deleteCategory(id: string): Promise<void>{
     const category = await this.findCategoryById(id);
     await this.categoriesRepository.remove(category);
   }
}