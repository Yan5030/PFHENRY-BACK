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
    try {
      console.log(`Buscando detalles de la orden con ID: ${orderId}`);
  
      
      const orderDetails = await this.orderDetailsService.findDetailsByOrderId(orderId);
  
      if (!orderDetails || orderDetails.length === 0) {
        console.error(`No se encontraron detalles para la orden con ID: ${orderId}`);
        throw new Error(`No se encontraron detalles para la orden con ID: ${orderId}`);
      }
  
      console.log("Detalles de la orden encontrados:", orderDetails);
  
     
      const totalPrice = orderDetails.reduce((total, item) => {
      
        const validSubtotal = typeof item.subtotal === 'number' ? item.subtotal : parseFloat(String(item.subtotal));
        return total + validSubtotal;
      }, 0);
  
 
      const totalPriceRounded = parseFloat(totalPrice.toFixed(2));
  
      console.log(`Total calculado para la orden ${orderId}: $${totalPriceRounded}`);
  
      return totalPriceRounded;
    } catch (error) {
      console.error(`Error en getTotalPrice para orderId ${orderId}:`, error.message);
      throw new Error("Hubo un problema al calcular el total de la orden.");
    }
  }
  

  
  
  async createOrder(orderId: string) {
    try {
      console.log(`Iniciando creación de orden en PayPal para orderId: ${orderId}`);
  
      const totalPrice = await this.getTotalPrice(orderId);
  
      if (totalPrice <= 0) {
        console.warn(`El total de la orden es 0 o negativo (${totalPrice}), no se puede crear la orden.`);
        throw new Error("El total de la orden no puede ser 0 o negativo.");
      }
  
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
  
      console.log("Enviando solicitud a PayPal...");
  
      const response = await this.client.execute(request);
      console.log("Orden creada en PayPal:", response.result);
  
      return response.result;
    } catch (error) {
      console.error("Error al crear la orden en PayPal:", error.message);
      throw new Error("Hubo un problema al procesar el pago con PayPal.");
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
