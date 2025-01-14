import { ReservationStatus } from "src/enum/reservationStatus.enum";
import { User } from "src/modules/users/entities/user.entity";
export declare class Reservation {
    id: string;
    date: string;
    time: string;
    guest: number;
    status: ReservationStatus;
    create_at: string;
    userId: User;
}
