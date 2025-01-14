import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(id: string, createReservationDto: CreateReservationDto): Promise<{
        message: string;
        data: import("./entities/reservation.entity").Reservation;
    }>;
    findAll(): Promise<{
        data: import("./entities/reservation.entity").Reservation[];
    }>;
    findOne(id: string): Promise<{
        data: import("./entities/reservation.entity").Reservation;
    }>;
    update(id: string, updateReservationDto: UpdateReservationDto): Promise<{
        message: string;
        data: import("./entities/reservation.entity").Reservation & UpdateReservationDto;
    }>;
    remove(id: string): {
        message: string;
    };
}
