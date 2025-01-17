import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwksClient } from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { AuthService } from 'src/modules/auth/auth.service'; // Servicio que maneja el Auth
import { JwtPayload } from '../jwt-payload.interface'; // Interfaz para el payload
import { User } from 'src/modules/users/entities/user.entity'; // Entidad de usuario

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwksClient: JwksClient;

  constructor(
    private authService: AuthService, // Inyectas tu servicio AuthService aquí
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        const decodedToken: any = jwt.decode(rawJwtToken, { complete: true });
        const kid = decodedToken.header.kid;

        // Obtener la clave pública desde JWKS
        const key = await this.jwksClient.getSigningKey(kid);
        done(null, key.getPublicKey());
      },
    });

    // Extraer el dominio de AUTH0_ISSUER_BASE_URL
    const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '').replace('http://', '');
    //const AUTH0_DOMAIN = new URL(process.env.AUTH0_ISSUER_BASE_URL).hostname;
    
    // Configuración del cliente JWKS
    this.jwksClient = new JwksClient({
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
  }

  async validate(payload: JwtPayload) {
    // Verifica si el usuario existe en la base de datos o lo crea
    const user = await this.authService.validateUserWithAuth0(payload);

    // Retorna el usuario con la información que necesitas
    return { userId: user.id, email: user.email, roles: user.role };
  }
}


