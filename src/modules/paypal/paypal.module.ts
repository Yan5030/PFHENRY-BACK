import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PayPalController } from "./paypal.controller";
import { OrdersService } from "../orders/orders.service";
import { OrderDetailsService } from "../order-details/order-details.service";
import { OrdersModule } from "../orders/orders.module";
import { Order } from "../orders/entities/order.entity";
import { UsersService } from "../users/users.service";
import { MenuItemService } from "../menuItems/menuItem.service";
import { OrderDetailsModule } from "../order-details/order-details.module";
import { CombosModule } from "../combos/combos.module";
import { Combo } from "../combos/entities/combos.entities";
import { OrderDetail } from "../order-details/entities/order-detail.entity";
import { MenuItem } from "../menuItems/entities/menuItems.entities";
import { User } from "../users/entities/user.entity";
import { Category } from "../categories/entities/category.entity";
import { PayPalService } from "./paypal.service";


@Module({
  imports: [ConfigModule, OrdersModule,TypeOrmModule.forFeature([Order,Combo,OrderDetail,MenuItem,User,Category])],
  providers: [OrdersService, OrderDetailsService,UsersService,MenuItemService,OrderDetailsService,PayPalService],
  controllers: [PayPalController],
})
export class PayPalModule {}
