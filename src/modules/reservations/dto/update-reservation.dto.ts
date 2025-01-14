import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { ReservationStatus } from 'src/enum/reservationStatus.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @IsOptional()
  @IsEnum(ReservationStatus)
    status?:ReservationStatus;
}
