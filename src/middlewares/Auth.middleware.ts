import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-openid-connect'; 
import { auth0Config } from '../config/auth0.config'; 

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    auth(auth0Config)(req, res, next);
  }
}
