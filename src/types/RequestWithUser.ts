import { Request as ExpressRequest } from 'express';
import { User } from 'src/modules/users/entities/user.entity';  // Ajusta la ruta según tu estructura

// Crea un tipo que extiende Request de Express y agrega la propiedad `user`
export interface RequestWithUser extends ExpressRequest {
  user?: User;
}
