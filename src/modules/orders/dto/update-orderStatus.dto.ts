import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/enum/order-status.enum';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la orden',
    enum: OrderStatus, 
    example: OrderStatus.DELIVERED, 
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
