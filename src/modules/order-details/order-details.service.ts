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
    // Comprar item del menú
    const itemSubtotal = await this.buyMenuItem(idMenuItem, quantity, order.id);
    const { menu, subtotal } = itemSubtotal;

    orderDetail = this.orderDetailRepository.create({
      order,
      menuItem: menu,
      quantity,
      subtotal,
    });

  } else if (idCombo) {
    // Obtener combo y descontar stock
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

  // 🚨 Si no se creó un detalle de orden válido, eliminamos la orden
  if (!orderDetail) {
    await this.orderRepository.delete(order.id);
    throw new BadRequestException("No se puede crear una orden sin productos válidos.");
  }

  return this.orderDetailRepository.save(orderDetail);
}

 
async buyMenuItem(idMenuItem : string, quantity: number,orderId:string){
  const menu = await this.menuItemService.findOne(idMenuItem)
  if(!menu)
  {
    throw new BadRequestException("No se encuentra el menu con ese id")
  }
 
  if (menu.stock < quantity) {
    this.orderRepository.delete(orderId);
    throw new BadRequestException("No hay suficiente stock para realizar la orden.");
  }
  menu.stock -= quantity;
  const subtotal = menu.price * quantity;
  await this.menuItemRepository.save(menu); // Usamos el repositorio para actualizar directamente
  const itemSubtotal = {subtotal, menu}
  return itemSubtotal;
}




async stockCombo(idMenuItem : string, quantity: number,orderId:string){
  const menu = await this.menuItemService.findOne(idMenuItem)
  if(!menu)
  {
    throw new BadRequestException("No se encuentra el menu con ese id")
  }
 
  if (menu.stock < quantity) {
    this.orderRepository.delete(orderId);
    throw new BadRequestException("No hay suficiente stock para realizar la orden.");
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
      throw new BadRequestException("No se encuentra detalle con ese id");
    }
  const updateOrderDet = Object.assign(orderDet, updateOrderDetailDto); 
    return await this.orderDetailRepository.save(updateOrderDet);
  }
 
  async remove(id: string): Promise<void> {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id } });
    if (!orderDetail) {
      throw new BadRequestException("No se encontró el detalle de la orden.");
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