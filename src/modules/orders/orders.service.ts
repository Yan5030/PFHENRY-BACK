import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { OrderStatus } from 'src/enum/order-status.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import dayjs from 'dayjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
  private readonly orderRepository : OrderRepository,
  private readonly userService : UsersService,
  private readonly orderDetailsService: OrderDetailsService
){}
async create(createOrderDto: CreateOrderDto) {
  const{idUser,MenuItems,paymentMethod} = createOrderDto;
console.log(createOrderDto, "create order ");

  const user = await this.userService.findOneById(idUser);
  if(!user){
    throw new BadRequestException("No se encontro ese usuario");
  }
  if (!Array.isArray(MenuItems) || MenuItems.length === 0) {
    throw new BadRequestException("MenuItems debe ser un array no vacío");
  }

  const createOrder = this.orderRepository.create({
    user,
    paymentMethod,
    status: OrderStatus.EN_PREPARACION,
    payment_status:PaymentStatus.PENDIENTE,
    createdAt: dayjs().format("YYYY-MM-DD"),
    totalPrice:0
  })
const order = await this.orderRepository.save(createOrder);
console.log(order, "order");

const detalleOrden = await Promise.all(MenuItems.map( async menu=>{ 
  console.log("menu, map", menu);
  
  const result = await this.orderDetailsService.create(menu,order)
  console.log("result map",result);
  
  return result;
}))
console.log(detalleOrden,"det or");

const total = detalleOrden.reduce((sum, det) => sum + det.subtotal, 0);
  console.log(total, "total calculado");

order.totalPrice = total;
order.orderDetails = detalleOrden;

console.log("order final", order);

return this.orderRepository.save(order);

  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findOrders();
  }

  async findOne(id: string, user: any): Promise<Order> {
    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new NotFoundException("La orden con ID ${id} no existe.");
    }
    if (user.role !== 'admin' && order.user !== user.id) {
      throw new NotFoundException('No tienes permisos para ver esta orden.');
    }

    return order;
  }async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOrderById(id);
    await this.orderRepository.remove(order);
  }
}