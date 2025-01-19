import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository : Repository<Order>,
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
