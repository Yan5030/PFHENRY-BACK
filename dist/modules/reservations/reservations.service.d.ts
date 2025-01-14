import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
export declare class ReservationsService {
    private readonly reservationRepository;
    private usersService;
    constructor(reservationRepository: Repository<Reservation>, usersService: UsersService);
    create(id: string, createReservationDto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOneById(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation & UpdateReservationDto>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
