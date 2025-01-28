import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/enum/order-status.enum';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la orden',
    enum: OrderStatus, // Esto le dice a Swagger que este campo es un enum
    example: OrderStatus.ENTREGADO, // Puedes poner un ejemplo aquí
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
