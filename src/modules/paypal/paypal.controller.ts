import { Controller, Post, Body, Param } from "@nestjs/common";
import { PayPalService } from "./paypal.service";


@Controller('paypal')
export class PayPalController {
  constructor(private readonly payPalService: PayPalService) {}

  @Post('create-order/:orderId')
  async createOrder(@Param("orderId") orderId: string) {
    return this.payPalService.createOrder(orderId);
  }

  @Post('orders/:orderId/capture')
  async captureOrder(@Param('orderId') orderId: string) {
    return this.payPalService.captureOrder(orderId);
  }
}