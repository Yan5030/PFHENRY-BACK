"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fs = __importStar(require("fs"));
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
    async updateStock(updates) {
        for (const update of updates) {
            const menuItem = await this.menuItemRepository.findOne({
                where: { id: update.menuItemId },
            });
            if (!menuItem) {
                throw new common_1.NotFoundException(`Menu item with ID ${update.menuItemId} not found`);
            }
            menuItem.stock = update.stock;
            await this.menuItemRepository.save(menuItem);
        }
        return { success: true, message: 'Stock updated successfully' };
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