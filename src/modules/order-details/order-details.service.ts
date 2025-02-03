import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { MenuItemService } from '../menuItems/menuItem.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from '../orders/entities/order.entity';
import { UpdateMenuItemDto } from '../menuItems/dto/update-product-dto';

@Injectable()
export class OrderDetailsService {
constructor(private readonly menuItemService : MenuItemService,
  @InjectRepository(OrderDetail) private readonly orderDetailRepository : Repository<OrderDetail>
){}

  async create(createOrderDetailDto: CreateOrderDetailDto, order : Order) {
    const{quantity,idMenuItem} = createOrderDetailDto;
    const menu = await this.menuItemService.findOne(idMenuItem)

    let subtotal= 0;
    if(menu.stock > 0 && menu.stock > quantity ){
     menu.stock = menu.stock - quantity

     subtotal = menu.price * quantity;
    const updateData: UpdateMenuItemDto = { stock: menu.stock };
    await this.menuItemService.update(menu.id,updateData)
    }else{
      throw new BadRequestException("No hay suficiente stock para realizar la orden")
    }

    const orderDetail = this.orderDetailRepository.create({
      order,
      quantity,
      subtotal
    })
    console.log("create det ord",orderDetail);
    
    return this.orderDetailRepository.save(orderDetail);
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

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
  async findDetailsByOrderId(orderId: string): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find({
      where: { order: { id: orderId } },
      relations: ['menuItem', 'order'],
    });
  }
}