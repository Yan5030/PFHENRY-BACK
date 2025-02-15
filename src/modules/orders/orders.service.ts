import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { OrderStatus } from 'src/enum/order-status.enum';
import { PaymentStatus } from 'src/enum/payment-status.enum';
import dayjs from 'dayjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderRepository } from './orders.repository';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class OrdersService {
  constructor(
  private readonly orderRepository : OrderRepository,
  private readonly userService : UsersService,
  private readonly orderDetailsService: OrderDetailsService,
  private readonly nodeMailerService: NodemailerService,
){}

async create(createOrderDto: CreateOrderDto): Promise<Order> {
  const{idUser,MenuItems,paymentMethod,comment} = createOrderDto;

  const user = await this.userService.findOneById(idUser);
  if(!user){
    throw new BadRequestException("That user was not found");
  }
  if (!Array.isArray(MenuItems) || MenuItems.length === 0) {
    throw new BadRequestException("MenuItems must be a non-empty array");
  }

  const createOrder = this.orderRepository.create({
    user,
    paymentMethod,
    status: OrderStatus.EN_PREPARACION,
    payment_status:PaymentStatus.PENDIENTE,
    createdAt: dayjs().format("YYYY-MM-DD"),
    comment,
    totalPrice:0
  })
const order = await this.orderRepository.save(createOrder);

const detalleOrden = await Promise.all(MenuItems.map( async menu=>{ 
  
  const result = await this.orderDetailsService.create(menu,order)
  
  return result;
}))
console.log(detalleOrden);

if(detalleOrden.length === 0){
this.remove(order.id)
throw new BadRequestException("There is not enough stock");
}

const total = detalleOrden.reduce((sum, det) => sum + det.subtotal, 0);
order.totalPrice = total;
order.orderDetails = detalleOrden;

await this.nodeMailerService.sendEmailOrden(user.email);
return this.orderRepository.save(order);

  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findOrders();
  }

  async findAllActives(): Promise<Order[]> {
    return this.orderRepository.findAllActives();
    
  }

  async findOne(id: string, user: any): Promise<Order> {
    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new NotFoundException(`The order with ID ${id} does not exist.`);
    }
  

    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.orderRepository.findOne({where: {id: orderId}});
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    order.status = status;
    if (status === OrderStatus.DELIVERED) {
      order.isActive = false; 
    }
    return this.orderRepository.save(order);
  }

  async updatePaymentStatus(orderId: string, status: PaymentStatus) {
    const order = await this.orderRepository.findOne({where: {id: orderId}});
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.payment_status = status;
    await this.orderRepository.save(order);

    return { message: `Order ${orderId} updated to ${status}` };
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
  
}