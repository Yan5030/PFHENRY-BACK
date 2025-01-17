import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { MenuItemService } from '../menuItems/menuItem.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class OrderDetailsService {
constructor(private readonly menuItemService : MenuItemService,
  @InjectRepository(OrderDetail) private readonly orderDetailRepository : Repository<OrderDetail>
){}

  async create(createOrderDetailDto: CreateOrderDetailDto, order : Order) {
    const{quantity,idMenuItem} = createOrderDetailDto;
    const menu = await this.menuItemService.findOne(idMenuItem)

    let subtotal= 0;
    // stock , remplazar price por stock
    if(menu.price > 0 && menu.price > quantity ){
     menu.price = menu.price - quantity

     subtotal = menu.price * quantity;//este no se reemplaza es para el precio
     //this.menuItemService.update(menu.id, stock: menu.price)
    }else{
      throw new BadRequestException("No hay suficiente stock para realizar la orden")
    }

    const orderDetail = this.orderDetailRepository.create({
      order,
      quantity,
      subtotal
    })
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
}
