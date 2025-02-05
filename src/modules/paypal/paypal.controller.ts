import { Controller, Post, Param, BadRequestException, Body } from "@nestjs/common";
import { PayPalService } from "./paypal.service";
import { SavePaypalDto } from "./dtos/savePaypal.dto";

@Controller("paypal")
export class PayPalController {
  constructor(private readonly payPalService: PayPalService) {}

  @Post("savePayment")
  async savePayment(@Body() paypalData: SavePaypalDto) {
    return this.payPalService.savePayment(paypalData);
  }

}
