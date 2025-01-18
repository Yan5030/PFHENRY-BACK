import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    findAllCategories(): Promise<Category[]>;
    seedCategories(): Promise<string>;
    findCategoryById(id: string): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}
