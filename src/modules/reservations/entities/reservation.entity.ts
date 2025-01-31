import { ReservationStatus } from "src/enum/reservationStatus.enum";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity()
export class Reservation {
@PrimaryGeneratedColumn("uuid")
id:string = uuid();
@Column({type:"date"})
date:string;
@Column({type:"time"})
time:string;
@Column()
guest:number;
@Column({default:ReservationStatus.Confirmed}) 
status:ReservationStatus;
@Column({type:"date"})
create_at:string;
@ManyToOne(()=>User,(user)=>user.reservations)
userId:User




}
