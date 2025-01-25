import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Req,
  HttpException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { OrderStatus } from 'src/enum/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  //@UseGuards(AuthGuard, RolesGuard)
  //@RolesDecorator(Role.User)
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

  

  @Get()
  //@UseGuards(AuthGuard, RolesGuard)
  //@RolesDecorator(Role.Admin, Role.Worker)
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      message: 'Órdenes obtenidas exitosamente',
      orders,
    };
  }

  @Get(':id')
  //@UseGuards(AuthGuard, RolesGuard)
  async findOne(@Param('id') id: string, @Request() req:any) {
    const order = await this.ordersService.findOne(id, req.user);
    return {
      message: "Orden con ID ${id} obtenida exitosamente",
      order,
    };
  }

  
  @Patch(':id/status')
@RolesDecorator(Role.Admin, Role.Worker) // Solo admin y worker pueden usar este endpoint
async updateOrderStatus(
  @Param('id') id: string,
  @Body() updateStatusDto: UpdateOrderStatusDto, // Usamos el DTO aquí
) {
  try {
    const updatedOrder = await this.ordersService.updateOrderStatus(id, updateStatusDto.status);
    return {
      message: 'Order status updated successfully',
      updatedOrder,
    };
  } catch (error) {
    throw new HttpException(
      { message: 'Error updating order status', error: error.message },
      HttpStatus.BAD_REQUEST,
    );
  }
}


  @Delete(':id')
  @RolesDecorator (Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
    return {
      message: "Orden con ID ${id} eliminada exitosamente",
    };
  }
}