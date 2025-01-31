import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Reservations")
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

   //@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Post("create/:id")
  async create(@Param("id", ParseUUIDPipe) id:string,@Body() createReservationDto:CreateReservationDto) {
    const reservation = await this.reservationsService.create(id,createReservationDto);
    return {message:"Reserva creada",data:reservation}
  }

  //@RolesDecorator(Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get()
 async findAll() {
    const reservations = await this.reservationsService.findAll();
    return {data : reservations};
  }

//@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
   const reservation = await this.reservationsService.findOneById(id);
   return {data:reservation}
  }

  //@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Put(':id')
 async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateReservationDto: UpdateReservationDto) {
    const updateReservation = await this.reservationsService.update(id, updateReservationDto);
    return {message: "Reserva modificada",data:updateReservation}
  }

  //@RolesDecorator(Role.User,Role.Admin,Role.Worker)
  //@UseGuards(AuthGuard,RolesGuard)
  //@ApiBearerAuth()
  @Put('cancelled/:id')
 async cancelledReservation(@Param("id", ParseUUIDPipe) id: string) {
   const updateReservation = await this.reservationsService.cancelled(id);
    return {message: "Reserva cancelada",data:updateReservation}
  }
}