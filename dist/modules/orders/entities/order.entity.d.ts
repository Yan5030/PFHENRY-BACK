import { User } from '../../users/entities/user.entity';
import { OrderDetail } from './Order-detail.entity';
import { PaymentMethod } from 'src/enum/payment-method.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import { OrderStatus } from 'src/enum/order-status.enum';
export declare class Order {
    id: string;
    user: User;
    orderDetails: OrderDetail[];
    status: OrderStatus;
    totalPrice: number;
    createdAt: Date;
    paymentMethod: PaymentMethod;
    payment_status: PaymentStatus;
}
