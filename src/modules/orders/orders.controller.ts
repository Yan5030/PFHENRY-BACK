import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return {
      message: 'Orden creada exitosamente',
      order: {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        payment_status: order.payment_status,
        paymentMethod: order.paymentMethod,
        comment:order.comment,
        user: {
          id: order.user.id, // Solo el ID del usuario
        },
        orderDetails: order.orderDetails.map(detail => ({
          id: detail.id, // Solo el ID de los detalles de la orden
          quantity: detail.quantity,
          subtotal: detail.subtotal,
        })),
      },
    };
  }

  
  //@RolesDecorator(Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      message: 'Órdenes obtenidas exitosamente',
      orders,
    };
  }

  //@RolesDecorator(Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req:any) {
    const order = await this.ordersService.findOne(id, req.user);
    return {
      message: "Orden con ID ${id} obtenida exitosamente",
      order,
    };
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   const order = await this.ordersService.update(+id, updateOrderDto);
  //   return {
  //     message: Orden con ID ${id} actualizada exitosamente,
  //     order,
  //   };
  // }

  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ordersService.remove(id);
    return {
      message: "Orden con ID ${id} eliminada exitosamente",
    };
  }
}