"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const data_json_1 = __importDefault(require("../utils/data.json"));
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async findAllCategories() {
        return this.categoriesRepository.find({ relations: ['menuItems'] });
    }
    async seedCategories() {
        const categories = data_json_1.default
            .map(item => ({
            name: item.category,
            description: item.categoryDescription || `DModifica esta descripcion ${item.category}`,
        }))
            .filter((value, index, self) => self.findIndex(v => v.name === value.name) === index);
        for (const category of categories) {
            const categoryExists = await this.categoriesRepository.findOne({
                where: { name: category.name },
            });
            if (!categoryExists) {
                const newCategory = this.categoriesRepository.create({
                    name: category.name,
                    description: category.description,
                });
                await this.categoriesRepository.save(newCategory);
            }
        }
        return `Categorías añadidas: ${categories.map(cat => cat.name)}`;
    }
    async findCategoryById(id) {
        const category = await this.categoriesRepository.findOne({
            where: { id },
            relations: ['menuItems']
        });
        if (!category) {
            throw new common_1.NotFoundException(`La categoria con el ID: ${id} no fue encontrada`);
        }
        return category;
    }
    async createCategory(createCategoryDto) {
        const { name } = createCategoryDto;
        const existingCategory = await this.categoriesRepository.findOne({ where: { name } });
        if (existingCategory) {
            throw new common_1.BadRequestException(`La categoria con el nombre "${name}" ya existe`);
        }
        const newCategory = this.categoriesRepository.create(createCategoryDto);
        return this.categoriesRepository.save(newCategory);
    }
    async updateCategory(id, updateCategoryDto) {
        const category = await this.findCategoryById(id);
        if (!category) {
            throw new common_1.NotFoundException(`Categoria con el id: ${id} no fue encontrada`);
        }
        const updatedCategory = Object.assign(category, updateCategoryDto);
        return await this.categoriesRepository.save(updatedCategory);
    }
    async deleteCategory(id) {
        const category = await this.findCategoryById(id);
        await this.categoriesRepository.remove(category);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map