import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import * as dayjs from "dayjs"
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationsService {
constructor(@InjectRepository(Reservation)private readonly reservationRepository : Repository<Reservation>,
private usersService:UsersService){}

 async create(id:string,createReservationDto:CreateReservationDto) {
 const {date, time} =createReservationDto

if(!dayjs(date,"YYYY-MM-DD",true).isValid()){
throw new BadRequestException("la fecha no esta en formato YYYY-MM-DD")
}

if(!dayjs().isBefore(dayjs(date)) && !dayjs().isSame(dayjs(date),"day") ){
  throw new BadRequestException("La fecha ingresada no es valida")
}
if(time.length !== 5){
  throw new BadRequestException("Error al ingresar la hora, debe tener hora y minutos");
  }

// guardo la hora actual, solo la hora y los minutos
const now = dayjs().startOf('minute');  

const horaClienteDayJs = dayjs().hour(parseInt(time.split(":")[0])).minute(parseInt(time.split(":")[1])).second(0);
//ejemplo 16:45, el primer elemento es 16 y el segundo 45


if(dayjs().isSame(dayjs(date),"day")){
  if (horaClienteDayJs.isBefore(now)) {
    throw new BadRequestException("La hora es anterior a la actual");
  } 
}
console.log("paso la hora");

const create_at = dayjs().format("YYYY-MM-DD");


const user = await this.usersService.findOneById(id); //supongo que el usuario se enviara por param, sacando el del token el id de usuario logueado
//ACA TENGO QUE BUSCAR EL USUARIO POR ID, Y DESPUES AGREGARLO EN EL CREATE

const newReservation = this.reservationRepository.create({...createReservationDto,create_at:create_at,userId:user});
return newReservation;
//return this.reservationRepository.save(newReservation); 
  }

  async findAll() {
    const reservations = await this.reservationRepository.find({relations:{userId:true}});
    return reservations;
  }

  async findOneById(id: string) {
    const reservation = await this.reservationRepository.findOne({where:{id}})
    if(!reservation){
      throw new BadRequestException("No hay reservas con la id ingresada");
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({where:{id}})
    if(!reservation){
throw new BadRequestException("El id ingresado no es correcto");
    }
    const updateReservation = Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(updateReservation);
  }

  async remove(id: string) {
    const reservation = await this.reservationRepository.findOne({where:{id}})
    return this.reservationRepository.delete(id);
  }
}
