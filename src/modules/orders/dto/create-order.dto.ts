import { IsArray } from "class-validator";
import { PaymentMethod } from "src/enum/payment-method.enum";
import { MenuItem } from "src/modules/menuItems/entities/menuItems.entities";
import { CreateOrderDetailDto } from "src/modules/order-details/dto/create-order-detail.dto";

export class CreateOrderDto {
idUser : string; // order
paymentMethod : PaymentMethod; //order

@IsArray()
MenuItems: CreateOrderDetailDto[] //orderDet
}

