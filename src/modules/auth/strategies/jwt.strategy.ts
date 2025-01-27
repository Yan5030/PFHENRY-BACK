import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'lFbSLO8L0CcSFx8p7wizSxHlQa0fUQDN' ,
      audience: process.env.AUTH0_API_IDENTIFIER,  // Verifica el audience
      issuer: process.env.AUTH0_ISSUER_BASE_URL,  // Verifica el issuer// Utilizamos la misma clave secreta de Auth0
    });
  }
 
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.name };
  }
}