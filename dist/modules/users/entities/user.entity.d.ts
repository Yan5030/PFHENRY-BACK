import { Role } from "src/enum/roles.enum";
import { Order } from "src/modules/orders/entities/order.entity";
import { Reservation } from "src/modules/reservations/entities/reservation.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    image_url: string;
    role: Role;
    create_at: string;
    reservations: Reservation[];
    orders: Order[];
}
