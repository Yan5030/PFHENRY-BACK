import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { PayPalController } from "./paypal.controller";
import { OrdersService } from "../orders/orders.service";
import { OrderDetailsService } from "../order-details/order-details.service";

@Module({
  imports: [ConfigModule],
  providers: [OrdersService,OrderDetailsService],
  controllers: [PayPalController],
})
export class PayPalModule {}