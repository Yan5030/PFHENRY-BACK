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
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const menuItems_entities_1 = require("./entities/menuItems.entities");
const category_entity_1 = require("../categories/entities/category.entity");
let MenuItemService = class MenuItemService {
    constructor(menuItemRepository, categoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.categoryRepository = categoryRepository;
    }
    async onModuleInit() {
        await this.seedMenuItems();
    }
    async seedMenuItems() {
        try {
            const menuItemsData = JSON.parse(fs.readFileSync('menuItem.json', 'utf8'));
            for (const menuItemData of menuItemsData) {
                const { categoryId, ...menuItemDto } = menuItemData;
                let category;
                if (categoryId) {
                    category = await this.categoryRepository.findOne({ where: { id: categoryId } });
                    if (!category) {
                        console.log(`Category with ID ${categoryId} not found. Skipping menu item.`);
                        continue;
                    }
                }
                const menuItem = this.menuItemRepository.create({
                    ...menuItemDto,
                    category,
                });
                await this.menuItemRepository.save(menuItem);
            }
            console.log('Menu items seeded successfully.');
        }
        catch (error) {
            console.error('Error seeding menu items:', error);
        }
    }
    async create(createMenuItemDto) {
        const menuItem = this.menuItemRepository.create(createMenuItemDto);
        return await this.menuItemRepository.save(menuItem);
    }
    async update(id, updateMenuItemDto) {
        const menuItem = await this.menuItemRepository.preload({
            id,
            ...updateMenuItemDto,
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`MenuItem with ID ${id} not found`);
        }
        return await this.menuItemRepository.save(menuItem);
    }
    async deactivate(id) {
        const menuItem = await this.findOne(id);
        menuItem.isActive = false;
        return await this.menuItemRepository.save(menuItem);
    }
    async findAll() {
        return await this.menuItemRepository.find({
            where: { isActive: true },
            relations: ['category'],
        });
    }
    async findOne(id) {
        const menuItem = await this.menuItemRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`MenuItem with ID ${id} not found`);
        }
        return menuItem;
    }
};
exports.MenuItemService = MenuItemService;
exports.MenuItemService = MenuItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menuItems_entities_1.MenuItem)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuItemService);
//# sourceMappingURL=menuItem.service.js.map