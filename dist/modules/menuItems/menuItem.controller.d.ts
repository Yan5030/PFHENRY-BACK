import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menu-itemdto';
import { UpdateMenuItemDto } from './dto/update-product-dto';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    create(createMenuItemDto: CreateMenuItemDto): Promise<import("./entities/menuItems.entities").MenuItem>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<import("./entities/menuItems.entities").MenuItem>;
    deactivate(id: string): Promise<import("./entities/menuItems.entities").MenuItem>;
    updateStock(body: {
        updates: {
            menuItemId: string;
            stock: number;
        }[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(): Promise<import("./entities/menuItems.entities").MenuItem[]>;
    findOne(id: string): Promise<import("./entities/menuItems.entities").MenuItem>;
}
