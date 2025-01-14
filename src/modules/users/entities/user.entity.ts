import { Roles } from "src/enum/roles.enum";
import { Order } from "src/modules/orders/entities/order.entity";
import { Reservation } from "src/modules/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";
 
@Entity()
export class User {
@PrimaryGeneratedColumn("uuid")
id :string = uuid();
@Column()
name: string;
@Column()
email: string;
@Column()
password : string;
@Column()
address: string;
@Column({default:"http://example.com"})
image_url: string;
@Column({type:"enum",enum:Roles,default:Roles.User})
role: Roles;
@Column({type:"date", default: () => 'CURRENT_DATE' })
create_at : string
@OneToMany(()=>Reservation,(reservation)=>reservation.userId)
reservations:Reservation[]
@OneToMany(() => Order, (order) => order.user) // Relación con Order
orders: Order[]; // Un usuario puede tener varias órdenes    
}
