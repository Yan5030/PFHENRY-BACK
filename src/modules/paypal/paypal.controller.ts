import { Controller, Post, Param, BadRequestException } from "@nestjs/common";
import { PayPalService } from "./paypal.service";

@Controller("paypal")
export class PayPalController {
  constructor(private readonly payPalService: PayPalService) {}

  @Post("create-order/:orderId")
  async createOrder(@Param("orderId") orderId: string) {
    try {
      return await this.payPalService.createOrder(orderId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("capture-order/:orderId")
  async captureOrder(@Param("orderId") orderId: string) {
    try {
      return await this.payPalService.captureOrder(orderId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
