import { Role } from "src/enum/roles.enum";
import { Order } from "src/modules/orders/entities/order.entity";
import { Reservation } from "src/modules/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";
 
@Entity()
export class User {
@PrimaryGeneratedColumn("uuid")
id :string = uuid();
@Column({ unique: true, nullable: true }) 
auth0Id?: string;
@Column()
name: string;
@Column()
email: string;
@Column({ default: '', nullable: true })
password: string;
@Column({ default: '', nullable: true })
address: string;
@Column({default:"http://example.com"})
image_url: string;
@Column({ default: false }) 
isComplete: boolean; 
@Column({type:"enum",enum:Role ,default:Role.User})
role: Role;
@Column({type:"date", default: () => 'CURRENT_DATE' })
create_at : string
@OneToMany(()=>Reservation,(reservation)=>reservation.userId)
reservations:Reservation[]
@OneToMany(() => Order, (order) => order.user) // Relación con Order
orders: Order[]; // Un usuario puede tener varias órdenes  
@Column({ type: 'boolean', default: true })
    isActive: boolean; //borrado logico  
}


