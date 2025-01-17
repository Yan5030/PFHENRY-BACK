import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { OrderStatus } from 'src/enum/order-status.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import * as dayjs from 'dayjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) 
  private readonly orderRepository: OrderRepository,
  private readonly userService : UsersService,
  private readonly orderDetailsService: OrderDetailsService
){}
async create(createOrderDto: CreateOrderDto) {
  const{idUser,MenuItems,paymentMethod} = createOrderDto;

  const user = await this.userService.findOneById(idUser);
  if(!user){
    throw new BadRequestException("No se encontro ese usuario");
  }

  const order = this.orderRepository.create({
    user,
    paymentMethod,
    status: OrderStatus.EN_PREPARACION,
    payment_status:PaymentStatus.PENDIENTE,
    createdAt: dayjs().format("YYYY-MM-DD")
  })
this.orderRepository.save(order);

const detalleOrden = await Promise.all(MenuItems.map( async menu=>{ return await this.orderDetailsService.create(menu,order)}))

let total = 0;
detalleOrden.forEach(det=> {return total = total + det.subtotal} )

order.totalPrice = total;
order.orderDetails = detalleOrden;

return this.orderRepository.save(order);

  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findOrders();
  }

  async findOne(id: string, user: any): Promise<Order> {
    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new NotFoundException(`La orden con ID ${id} no existe.`);
    }
    if (user.role !== 'admin' && order.user !== user.id) {
      throw new NotFoundException('No tienes permisos para ver esta orden.');
    }

    return order;
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
  //   const order = await this.findOne(id);

  //   if (updateOrderDto.MenuItems) {
  //     const updatedDetails =
  //       await this.orderDetailsService.validateAndUpdateOrderDetails(
  //         id,
  //         updateOrderDto.MenuItems,
  //       );
  //     order.orderDetails = updatedDetails;
  //     order.totalPrice = updatedDetails.reduce(
  //       (total, detail) => total + detail.totalPrice,
  //       0,
  //     );
  //   }

  //   Object.assign(order, updateOrderDto);
  //   return this.orderRepository.save(order);
  // }

  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOrderById(id);
    await this.orderRepository.remove(order);
  }
}
