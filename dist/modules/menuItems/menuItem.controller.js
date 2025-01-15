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
exports.MenuItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menuItem_service_1 = require("./menuItem.service");
const create_menu_itemdto_1 = require("./dto/create-menu-itemdto");
const update_product_dto_1 = require("./dto/update-product-dto");
let MenuItemController = class MenuItemController {
    constructor(menuItemService) {
        this.menuItemService = menuItemService;
    }
    create(createMenuItemDto) {
        return this.menuItemService.create(createMenuItemDto);
    }
    update(id, updateMenuItemDto) {
        return this.menuItemService.update(id, updateMenuItemDto);
    }
    deactivate(id) {
        return this.menuItemService.deactivate(id);
    }
    async updateStock(body) {
        return this.menuItemService.updateStock(body.updates);
    }
    findAll() {
        return this.menuItemService.findAll();
    }
    findOne(id) {
        return this.menuItemService.findOne(id);
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ítem del menú creado exitosamente' }),
    (0, swagger_1.ApiBody)({ type: create_menu_itemdto_1.CreateMenuItemDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_itemdto_1.CreateMenuItemDto]),
    __metadata("design:returntype", void 0)
], MenuItemController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ítem del menú actualizado exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateMenuItemDto]),
    __metadata("design:returntype", void 0)
], MenuItemController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ítem del menú desactivado exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuItemController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)('update-stock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todos los ítems del menú' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalle del ítem del menú encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuItemController.prototype, "findOne", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, swagger_1.ApiTags)('menu-items'),
    (0, common_1.Controller)('menu-items'),
    __metadata("design:paramtypes", [menuItem_service_1.MenuItemService])
], MenuItemController);
//# sourceMappingURL=menuItem.controller.js.map