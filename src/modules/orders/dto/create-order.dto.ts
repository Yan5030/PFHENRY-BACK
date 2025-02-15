import { IsArray, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "src/enum/payment-method.enum";
import { CreateOrderDetailDto } from "src/modules/order-details/dto/create-order-detail.dto";

export class CreateOrderDto {
  @ApiProperty({
    description: "ID del usuario que realiza la orden",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  idUser: string; 



  @ApiProperty({
    description: "Método de pago utilizado para la orden",
    enum: PaymentMethod,
    example: [PaymentMethod.Cash, PaymentMethod.PayPal ]
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;



  @ApiProperty({
    description: "Lista de elementos del menú incluidos en la orden",
    type: [CreateOrderDetailDto],
  })
  @IsArray()
  MenuItems: CreateOrderDetailDto[]; 

  @ApiProperty({
    description:"Añade algun comentario para el pedido",
    example:"Quiero la hamburguesa sin lechuga"
  })
  @IsString()
  comment: string

}
