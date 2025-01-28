import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UsersService } from '../users/users.service';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { DateValidationMiddleware } from 'src/middlewares/date-validation/date-validation.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation,User])],
  controllers: [ReservationsController],
  providers: [ReservationsService,UsersService],
  exports:[ReservationsService]
})
export class ReservationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DateValidationMiddleware)
      .forRoutes({ path: 'reservations/create/:id', method: RequestMethod.POST });
  }
}