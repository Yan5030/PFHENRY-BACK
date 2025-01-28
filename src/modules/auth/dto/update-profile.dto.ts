import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'ContraseñaSegura91*',
  })
  @IsString()
  password: string;
}
