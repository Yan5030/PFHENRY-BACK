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
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menuItems_entities_1 = require("./entities/menuItems.entities");
const category_entity_1 = require("../categories/entities/category.entity");
const data_json_1 = __importDefault(require("../utils/data.json"));
let MenuItemService = class MenuItemService {
    constructor(menuItemRepository, categoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.categoryRepository = categoryRepository;
    }
    async seedMenuItems() {
        const categories = await this.categoryRepository.find();
        const missingCategories = new Set();
        for (const item of data_json_1.default) {
            const category = categories.find(cat => cat.name === item.category);
            if (!category) {
                missingCategories.add(item.category);
                continue;
            }
            const menuItemExists = await this.menuItemRepository.findOne({ where: { name: item.name } });
            if (!menuItemExists) {
                const newMenuItem = this.menuItemRepository.create({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image_url: item.image_url,
                    category: category,
                });
                await this.menuItemRepository.save(newMenuItem);
            }
        }
        if (missingCategories.size > 0) {
            return `Las siguientes categorías no existen: ${[...missingCategories].join(', ')}`;
        }
        return 'Menú cargado con éxito';
    }
    async onModuleInit() {
        await this.seedMenuItems();
    }
    async create(createMenuItemDto) {
        const category = await this.categoryRepository.findOne({ where: { id: createMenuItemDto.categoryId } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const menuItem = this.menuItemRepository.create({ ...createMenuItemDto, category });
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