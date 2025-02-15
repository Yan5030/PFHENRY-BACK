import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import dayjs from "dayjs";
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ReservationStatus } from 'src/enum/reservationStatus.enum';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class ReservationsService {
constructor(@InjectRepository(Reservation)
private readonly reservationRepository : Repository<Reservation>,
private usersService:UsersService,
private readonly nodemailerService:NodemailerService,

){}

 async create(id:string,createReservationDto:CreateReservationDto) {


const create_at = dayjs().format("YYYY-MM-DD");

const user = await this.usersService.findOneById(id); 
const newReservation = this.reservationRepository.create({...createReservationDto,create_at:create_at,userId:user});


await this.nodemailerService.sendEmail(user.email);

return this.reservationRepository.save(newReservation); 
  }

  async findAll() {
    const reservations = await this.reservationRepository.find({relations:{userId:true}});
    return reservations;
  }

  async findOneById(id: string) {
    const reservation = await this.reservationRepository.findOne({where:{id}})
    if(!reservation){
      throw new BadRequestException("There are no reservations with the id entered");
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({where:{id}})
    if(!reservation){
throw new BadRequestException("The id entered is not correct");
    }
    const updateReservation = Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(updateReservation);
  }

  async cancelled(id: string) {
    const reservation = await this.findOneById(id);
    const updateRes = {...reservation,status:ReservationStatus.Cancelled};
    return this.reservationRepository.save(updateRes);
  }
}