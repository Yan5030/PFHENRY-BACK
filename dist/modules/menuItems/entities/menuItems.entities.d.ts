import { Category } from '../../categories/entities/category.entity';
export declare class MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    stock: number;
    category: Category;
    isActive: boolean;
}
