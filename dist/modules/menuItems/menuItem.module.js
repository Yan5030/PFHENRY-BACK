"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menuItems_entities_1 = require("./entities/menuItems.entities");
const menuItem_service_1 = require("./menuItem.service");
const menuItem_controller_1 = require("./menuItem.controller");
const category_entity_1 = require("../categories/entities/category.entity");
const Order_detail_entity_1 = require("../orders/entities/Order-detail.entity");
let MenuItemModule = class MenuItemModule {
};
exports.MenuItemModule = MenuItemModule;
exports.MenuItemModule = MenuItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([menuItems_entities_1.MenuItem, category_entity_1.Category, Order_detail_entity_1.OrderDetail])],
        controllers: [menuItem_controller_1.MenuItemController],
        providers: [menuItem_service_1.MenuItemService],
        exports: [menuItem_service_1.MenuItemService],
    })
], MenuItemModule);
//# sourceMappingURL=menuItem.module.js.map