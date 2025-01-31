import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk' ;
import { OrderDetailsService } from '../order-details/order-details.service'; 


@Injectable()
export class PayPalService {
  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  private environment = new paypal.core.SandboxEnvironment(
    this.clientId,
    this.clientSecret,
  );
  private client = new paypal.core.PayPalHttpClient(this.environment);

  constructor(
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  
  private async getTotalPrice(orderId: string) {
    const orderDetails = await this.orderDetailsService.findAll(); 

    
    const orderItems = orderDetails.filter(item => item.order.id === orderId);

    const totalPrice = orderItems.reduce((total, item) => total + item.subtotal, 0);

    return totalPrice;
  }

  async createOrder(orderId: string) {
    const totalPrice = await this.getTotalPrice(orderId);

    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['Content-Type'] = 'application/json';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalPrice.toString(), 
          },
        },
      ],
    });

    try {
      const response = await this.client.execute(request);
      console.log('createOrder', response.result);
      return response.result;
    } catch (error) {
      throw new Error('Error al crear la orden, hablen con nahuel');
    }
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.headers['Content-Type'] = 'application/json';

    const response = await this.client.execute(request);

    console.log('captureOrder', response.result);

    return response.result;
  }
}
