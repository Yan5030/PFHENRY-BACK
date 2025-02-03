import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { MenuItemService } from '../menuItems/menuItem.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from '../orders/entities/order.entity';
import { UpdateMenuItemDto } from '../menuItems/dto/update-product-dto';
import { CombosService } from '../combos/combos.service';
import { MenuItem } from '../menuItems/entities/menuItems.entities';
 
@Injectable()
export class OrderDetailsService {
constructor(private readonly menuItemService : MenuItemService,
  @InjectRepository(OrderDetail) private readonly orderDetailRepository : Repository<OrderDetail>,
  @InjectRepository(MenuItem) private readonly menuItemRepository : Repository<MenuItem>,
  private readonly comboService : CombosService
){}
 
  async create(createOrderDetailDto: CreateOrderDetailDto, order : Order) : Promise<OrderDetail> {
 
 
    const{quantity,idMenuItem,idCombo} = createOrderDetailDto;
 
 
if(!idCombo){
  const itemSubtotal = await this.buyMenuItem(idMenuItem,quantity);
  const {menu,subtotal}= itemSubtotal;
 
 
 
const orderDetail = this.orderDetailRepository.create({
    order,
    menuItem: menu,
    quantity,
    subtotal,
  });
 
  return this.orderDetailRepository.save(orderDetail);
 
}    
    const combo = await this.comboService.findOne(idCombo)
 
 
      //const itemsSubtotal = await Promise.all(combo.menuItems.map( async item=> { return  await this.buyMenuItem(item.id,1)} ) ) 
      //const items= itemsSubtotal.map(item => {return item.menu}) // guardo solo array items
      await Promise.all(combo.menuItems.map( async item=> { return  await this.buyMenuItem(item.id,quantity)} )) //x cada item descuenta en stock
      const orderDetail = this.orderDetailRepository.create({
      order,
      combo: combo,
      quantity,
      subtotal: (combo.price * quantity)
    });
 
    return this.orderDetailRepository.save(orderDetail);
 
 
 
    //const menu = await this.menuItemService.findOne(idMenuItem)
 
 
   // if(!menu)
    //{
     // throw new BadRequestException("No se encuentra el menu con ese id")
    //}
 
    //if (menu.stock < quantity) {
     // throw new BadRequestException("No hay suficiente stock para realizar la orden.");
    //}
    //menu.stock -= quantity;
    //const subtotal = menu.price * quantity;
    //await this.menuItemRepository.save(menu); // Usamos el repositorio para actualizar directamente
 
 
    //const orderDetail = this.orderDetailRepository.create({
     // order,
      //menuItem: menu,
      //quantity,
      //subtotal,
    //});
 
    //return this.orderDetailRepository.save(orderDetail);
 
  }
 
async buyMenuItem(idMenuItem : string, quantity: number){
  const menu = await this.menuItemService.findOne(idMenuItem)
  if(!menu)
  {
    throw new BadRequestException("No se encuentra el menu con ese id")
  }
 
  if (menu.stock < quantity) {
    throw new BadRequestException("No hay suficiente stock para realizar la orden.");
  }
  menu.stock -= quantity;
  const subtotal = menu.price * quantity;
  await this.menuItemRepository.save(menu); // Usamos el repositorio para actualizar directamente
  const itemSubtotal = {subtotal, menu}
  return itemSubtotal;
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