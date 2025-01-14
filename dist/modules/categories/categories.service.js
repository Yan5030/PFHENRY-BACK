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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_repository_1 = require("./categories.repository");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async findAllCategories() {
        return this.categoriesRepository.findAllCategories();
    }
    async findCategoryById(id) {
        const category = await this.categoriesRepository.findCategoryById(id);
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async createCategory(createCategoryDto) {
        return this.categoriesRepository.createCategory(createCategoryDto);
    }
    async updateCategory(id, updateCategoryDto) {
        const existingCategory = await this.categoriesRepository.findCategoryById(id);
        if (!existingCategory) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return this.categoriesRepository.updateCategory(id, updateCategoryDto);
    }
    async deleteCategory(id) {
        const existingCategory = await this.categoriesRepository.findCategoryById(id);
        if (!existingCategory) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        await this.categoriesRepository.deleteCategory(id);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_repository_1.CategoriesRepository)),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map