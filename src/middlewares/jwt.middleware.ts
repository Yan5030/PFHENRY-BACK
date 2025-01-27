import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { compactDecrypt } from 'jose';

@Injectable()
export class JweMiddleware implements NestMiddleware {
  // Clave secreta compartida para desencriptar tokens JWE (debes configurarla adecuadamente)
  private readonly sharedKey: Uint8Array = new TextEncoder().encode('your-shared-secret-key'); // Reemplaza con tu clave

  async use(req: Request, res: Response, next: NextFunction) {
    const jweToken = req.headers['authorization']?.split(' ')[1];

    if (!jweToken || jweToken.split('.').length < 5) {
      return res.status(400).send({ error: 'Token JWE no encontrado o formato no válido' });
    }

    try {
      // Desencriptar el token JWE usando la clave compartida
      const { plaintext } = await compactDecrypt(jweToken, this.sharedKey);

      let userData;
      try {
        userData = JSON.parse(new TextDecoder().decode(plaintext));
      } catch (error) {
        return res.status(400).send({ error: 'El payload desencriptado no es válido' });
      }

      req['user'] = userData;
      next();
    } catch (error) {
      console.error('Error al procesar el token JWE:', error.message);
      return res.status(401).send({ error: 'Token JWE inválido o clave incorrecta' });
    }
  }
}
