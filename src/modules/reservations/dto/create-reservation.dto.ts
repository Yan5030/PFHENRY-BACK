import { IsDateString, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";

export class CreateReservationDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;
  
    @IsNotEmpty()
    @Matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)
    time: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(50)
    guest: number;
 
    constructor(partial: Partial<CreateReservationDto>) {
        Object.assign(this, partial);
      }
}
