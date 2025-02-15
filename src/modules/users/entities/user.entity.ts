import { Role } from "src/enum/roles.enum";
import { Order } from "src/modules/orders/entities/order.entity";
import { Reservation } from "src/modules/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";
import { Review } from "src/modules/review/entities/review.entity";
 
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

@Column({default:"https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"})
image_url: string;

@Column({ default: false }) 
isComplete: boolean; 

@Column({type:"enum",enum:Role ,default:Role.User})
role: Role;

@Column({type:"date", default: () => 'CURRENT_DATE' })
create_at : string

@OneToMany(()=>Reservation,(reservation)=>reservation.userId)
reservations:Reservation[]

@OneToMany(() => Order, (order) => order.user)  
orders: Order[]; 

@OneToMany(() => Review, (review) => review.user, { cascade: true }) 
reviews: Review[]; 

@Column({ type: 'boolean', default: true })
    isActive: boolean; 
}

