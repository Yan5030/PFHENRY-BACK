import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post("/create/:id")
  async create(@Param("id") id:string,@Body() createReservationDto:CreateReservationDto) {
    const reservation = await this.reservationsService.create(id,createReservationDto);
    return {message:"Reserva creada",data:reservation}
  }

  @Get()
 async findAll() {
    const reservations = await this.reservationsService.findAll();
    return {data : reservations};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
   const reservation = await this.reservationsService.findOneById(id);
   return {data:reservation}
  }

  @Put(':id')
 async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    const updateReservation = await this.reservationsService.update(id, updateReservationDto);
    return {message: "Reserva modificada",data:updateReservation}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.reservationsService.remove(id);
    return {message: "Reserva eliminada"}
  }
}
