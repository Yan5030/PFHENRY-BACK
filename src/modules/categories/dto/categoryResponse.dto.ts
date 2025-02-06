import { Category } from "../entities/category.entity";

export class CategoryResponseDTO {
    id: string;
    name: string;
    icon: string;
    
    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
        this.icon = category.icon;
      }
    }