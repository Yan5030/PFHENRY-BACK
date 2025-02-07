import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { MenuItemService } from '../menuItems/menuItem.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from '../orders/entities/order.entity';
import { CombosService } from '../combos/combos.service';
import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { OrderRepository } from '../orders/orders.repository';
 
@Injectable()
export class OrderDetailsService {
constructor(private readonly menuItemService : MenuItemService,
  @InjectRepository(OrderDetail) private readonly orderDetailRepository : Repository<OrderDetail>,
  @InjectRepository(MenuItem) private readonly menuItemRepository : Repository<MenuItem>,
  private readonly comboService : CombosService,
  private readonly orderRepository : OrderRepository,
){}
 
async create(createOrderDetailDto: CreateOrderDetailDto, order: Order): Promise<OrderDetail> { 
  const { quantity, idMenuItem, idCombo } = createOrderDetailDto;
  let orderDetail: OrderDetail | null = null;

  if (!idCombo && idMenuItem) {
   
    const itemSubtotal = await this.buyMenuItem(idMenuItem, quantity, order.id);
    const { menu, subtotal } = itemSubtotal;

    orderDetail = this.orderDetailRepository.create({
      order,
      menuItem: menu,
      quantity,
      subtotal,
    });

  } else if (idCombo) {
    
    const combo = await this.comboService.findOne(idCombo);
    
    await Promise.all(
      combo.menuItems.map(async item => await this.stockCombo(item.id, quantity, order.id))
    );
    await Promise.all(
      combo.menuItems.map(async item => await this.buyMenuItem(item.id, quantity, order.id))
    );

    orderDetail = this.orderDetailRepository.create({
      order,
      combo,
      quantity,
      subtotal: combo.price * quantity
    });
  }

  
  if (!orderDetail) {
    await this.orderRepository.delete(order.id);
    throw new BadRequestException("An order cannot be created without valid products.");
  }

  return this.orderDetailRepository.save(orderDetail);
}

 
async buyMenuItem(idMenuItem : string, quantity: number,orderId:string){
  const menu = await this.menuItemService.findOne(idMenuItem)
  if(!menu)
  {
    throw new BadRequestException("Not found menu with that id")
  }
 
  if (menu.stock < quantity) {
    this.orderRepository.delete(orderId);
    throw new BadRequestException("Not enough stock to make the order.");
  }
  menu.stock -= quantity;
  const subtotal = menu.price * quantity;
  await this.menuItemRepository.save(menu); 
  const itemSubtotal = {subtotal, menu}
  return itemSubtotal;
}




async stockCombo(idMenuItem : string, quantity: number,orderId:string){
  const menu = await this.menuItemService.findOne(idMenuItem)
  if(!menu)
  {
    throw new BadRequestException("Not found menu with that id")
  }
 
  if (menu.stock < quantity) {
    this.orderRepository.delete(orderId);
    throw new BadRequestException("Not enough stock to make the order.");
  }
  return;
}

 



  async findAll() {
    return await this.orderDetailRepository.find();
  }
 
  async findOneById(id: string) {
    const orderDet= await this.orderDetailRepository.findOne({where:{id}})
    return orderDet;
  }
 
  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDet = await this.orderDetailRepository.findOne({where:{id}});
    if(!orderDet){
      throw new BadRequestException("Not found order detail with that id");
    }
  const updateOrderDet = Object.assign(orderDet, updateOrderDetailDto); 
    return await this.orderDetailRepository.save(updateOrderDet);
  }
 
  async remove(id: string): Promise<void> {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id } });
    if (!orderDetail) {
      throw new BadRequestException("The order details were not found.");
    }
    await this.orderDetailRepository.remove(orderDetail);
  }
  async findDetailsByOrderId(orderId: string): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find({
      where: { order: { id: orderId } },
      relations: ['menuItem', 'order'],
    });
  }
 
 
 
}