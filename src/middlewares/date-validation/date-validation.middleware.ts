import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DateValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { date, time } = req.body;
    if(date && time){
    // Validar formato de fecha
    if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('La fecha no está en formato YYYY-MM-DD');
    }

    // Validar que la fecha sea válida (no pasada)
    if (!dayjs().isBefore(dayjs(date)) && !dayjs().isSame(dayjs(date), 'day')) {
      throw new BadRequestException('La fecha ingresada no es válida');
    }

    // Validar formato de hora
    if (time.length !== 5) {
      throw new BadRequestException('Error al ingresar la hora, debe tener hora y minutos');
    }

    // Guardar la hora actual, solo hora y minutos
    const now = dayjs().startOf('minute');
    const horaClienteDayJs = dayjs()
      .hour(parseInt(time.split(':')[0]))
      .minute(parseInt(time.split(':')[1]))
      .second(0);

    // Si la fecha es hoy, verificar que la hora no sea anterior a la actual
    if (dayjs().isSame(dayjs(date), 'day') && horaClienteDayJs.isBefore(now)) {
      throw new BadRequestException('La hora es anterior a la actual');
    }

    // Continuar con la solicitud si todo es válido
    next();
  }else{
    next();
  }
  }
  

  
}
