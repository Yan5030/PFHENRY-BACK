import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Auth0Guard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    // Middleware configurado
    const middleware = jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }) as jwksRsa.GetVerificationKey, // Conversión explícita de tipo
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });

    // Retornar la promesa para verificar la autenticación
    return new Promise((resolve, reject) => {
      middleware(req, res, (err) => {
        if (err) {
          reject(new UnauthorizedException('Token inválido o ausente'));
        } else {
          resolve(true);
        }
      });
    });
  }
}
