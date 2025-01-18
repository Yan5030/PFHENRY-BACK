import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    seedMenuItems(): Promise<string>;
    create(createMenuItemDto: CreateMenuItemDto): Promise<import("./entities/menuItems.entities").MenuItem>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<import("./entities/menuItems.entities").MenuItem>;
    deactivate(id: string): Promise<import("./entities/menuItems.entities").MenuItem>;
    findAll(): Promise<import("./entities/menuItems.entities").MenuItem[]>;
    findOne(id: string): Promise<import("./entities/menuItems.entities").MenuItem>;
}
