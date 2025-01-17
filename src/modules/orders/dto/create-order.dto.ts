import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsArray, IsNumber } from 'class-validator';
import { PaymentMethod } from 'src/enum/payment-method.enum';
import { CreateOrderDetailDto } from 'src/modules/order-details/dto/create-order-detail.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la orden',
    example: 'e2a1c56f-34a6-4e5d-8e2e-cdfe7d503945',
  })
  @IsUUID()
  idUser: string;

  @ApiProperty({
    description: 'Método de pago de la orden',
    enum: PaymentMethod,
    example: 'EFECTIVO',
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Detalles de los productos en la orden',
    type: [CreateOrderDetailDto],
    example: [
      {
        idMenuItem: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 2
      },
      {
        idMenuItem: '789e4567-e89b-12d3-a456-426614174000',
        quantity: 3
      }
    ]
  })
  @IsArray()
  MenuItems: CreateOrderDetailDto[];
}
