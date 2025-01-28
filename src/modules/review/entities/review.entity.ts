import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { v4 as uuid} from "uuid";

@Entity()
export class Review {
    @PrimaryGeneratedColumn("uuid")
    id :string = uuid();

    @Column()
    description: string;

    @Column({ type: "float", default: 0 })
    rate: number;

    @ManyToOne(() => User, (user) => user.reviews, {onDelete: 'CASCADE'})
    user: User;
}
