import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrderRequest,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderDetailsService } from "../order-details/order-details.service";

@Injectable()
export class PayPalService {
  private client: Client;
  private ordersController: OrdersController;

  constructor(private configService: ConfigService, private orderDetailsService:OrderDetailsService) {
    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: this.configService.get<string>("PAYPAL_CLIENT_ID"),
        oAuthClientSecret: this.configService.get<string>("PAYPAL_CLIENT_SECRET"),
      },
      environment: Environment.Sandbox,
      logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
      },
    });

    this.ordersController = new OrdersController(this.client);
  }

  private async getTotalPrice(orderId: string): Promise<number> {
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

  async createOrder(orderId: string): Promise<any> {
    try {
      const totalPrice = await this.getTotalPrice(orderId);
      
      const requestBody: OrderRequest = {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: totalPrice.toString(),
            },
          },
        ],
        applicationContext: {
          returnUrl: "http://localhost:3000/success",
          cancelUrl: "http://localhost:3000/cancel",
        },
      };
      
      const response = await this.ordersController.ordersCreate({
        body: requestBody,
        prefer: "return=minimal",
      });

      return response.body;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async captureOrder(orderId: string): Promise<any> {
    try {
      const { body } = await this.ordersController.ordersCapture({
        id: orderId,
        prefer: "return=minimal",
      });

      return body;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
