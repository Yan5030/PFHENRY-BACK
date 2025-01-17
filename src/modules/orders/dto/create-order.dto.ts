import { PaymentMethod } from "src/enum/payment-method.enum";
import { MenuItem } from "src/modules/menuItems/entities/menuItems.entities";
import { CreateOrderDetailDto } from "../../orders-details/dto/create-order-details.dto";

export class CreateOrderDto {
idUser : string; // order
paymentMethod : PaymentMethod; //order
MenuItems: CreateOrderDetailDto [] //orderDet
}
