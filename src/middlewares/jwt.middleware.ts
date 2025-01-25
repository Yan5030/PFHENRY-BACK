import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
    const audience = process.env.AUTH0_AUDIENCE;
    const issuer = `https://${process.env.AUTH0_DOMAIN}`;

    if (!jwksUri || !audience || !issuer) {
      console.error('JWT configuration variables are missing.');
      return res.status(500).send({ error: 'Server configuration error' });
    }

    try {
      jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksUri,
        }) as jwksRsa.GetVerificationKey,
        audience,
        issuer,
        algorithms: ['RS256'],
      })(req, res, (err) => {
        if (err) {
          console.error('JWT Middleware error:', err.message);
          return res.status(401).send({ error: 'Unauthorized' });
        }
        next(); // Continúa al siguiente middleware/controlador si no hay errores
      });
    } catch (error) {
      console.error('Unexpected error in JWT Middleware:', error.message);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
