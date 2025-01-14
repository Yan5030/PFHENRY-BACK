import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesRepository {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: string): Promise<Category | null>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}
