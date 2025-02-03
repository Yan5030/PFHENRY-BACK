import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"
import { Order } from "src/modules/orders/entities/order.entity"

export class CreateOrderDetailDto {
@ApiProperty({
    description: "Debe recibir el id del menuItem",
    default: null
})
//@IsUUID()
idMenuItem?: string

@ApiProperty({
    description: "Debe recibir el id del combo",
    default: null
})
//@IsUUID()
idCombo?: string

@ApiProperty({
    description:"Debe contener la cantidad de unidades de ese menuitem",
    example: 2
})
@IsNumber()
quantity : number


}