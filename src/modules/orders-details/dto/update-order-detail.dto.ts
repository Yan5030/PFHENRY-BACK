import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-details.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}