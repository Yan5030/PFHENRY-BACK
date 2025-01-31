import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";

export class CreateReservationDto {
  
  @ApiProperty({
    description:"Almacena la fecha de la reserva, debe estar en formato YYYY-MM-DD",
    example:"2025-01-13"
  })
    @IsNotEmpty()
    @IsDateString()
    date: string;
  
    
    @ApiProperty({
      description:"Almacena el horario de la reserva, debe estar en formato HH:mm",
      example:"19:30"
    })
    @IsNotEmpty()
    @Matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)
    time: string;
  
    
    @ApiProperty({
      description:"Almacena la cantidad de personas que iran a la reserva",
      example:20
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(50)
    guest: number;
 
    constructor(partial: Partial<CreateReservationDto>) {
        Object.assign(this, partial);
      }
}
