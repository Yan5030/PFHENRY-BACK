import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { MenuItemService } from '../menuItems/menuItem.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from '../orders/entities/order.entity';
import { MenuItem } from '../menuItems/entities/menuItems.entities';
import { UpdateMenuItemDto } from '../menuItems/dto/update-product-dto';

@Injectable()
export class OrderDetailsService {
constructor(private readonly menuItemService : MenuItemService,
  @InjectRepository(OrderDetail) private readonly orderDetailRepository : Repository<OrderDetail>,
  @InjectRepository(MenuItem) private readonly menuItemRepository : Repository<MenuItem>
){}

  async create(createOrderDetailDto: CreateOrderDetailDto, order : Order) : Promise<OrderDetail> {
    const{quantity,idMenuItem} = createOrderDetailDto;
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


    const orderDetail = this.orderDetailRepository.create({
      order,
      menuItem: menu,
      quantity,
      subtotal,
    });

    return this.orderDetailRepository.save(orderDetail);
  }

  async findAll() : Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find();
  }

  async findOneById(id: string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id }, relations: ['menuItem', 'order', 'category'] });
    if (!orderDetail) {
      throw new BadRequestException("No se encontró el detalle de la orden.");
    }
    return orderDetail;
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail> {
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
}