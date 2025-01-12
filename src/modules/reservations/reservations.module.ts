import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UsersService } from '../users/users.service';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation,User])],
  controllers: [ReservationsController],
  providers: [ReservationsService,UsersService],
  exports:[ReservationsService]
})
export class ReservationsModule {}
