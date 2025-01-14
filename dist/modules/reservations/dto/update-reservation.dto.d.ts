import { CreateReservationDto } from './create-reservation.dto';
import { ReservationStatus } from 'src/enum/reservationStatus.enum';
declare const UpdateReservationDto_base: import("@nestjs/common").Type<Partial<CreateReservationDto>>;
export declare class UpdateReservationDto extends UpdateReservationDto_base {
    status?: ReservationStatus;
}
export {};
