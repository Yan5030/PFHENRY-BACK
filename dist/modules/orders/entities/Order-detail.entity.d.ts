import { Order } from '../../orders/entities/order.entity';
export declare class OrderDetail {
    id: string;
    order: Order;
    quantity: number;
    customization?: string;
    subtotal: number;
}
