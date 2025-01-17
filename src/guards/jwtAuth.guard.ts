import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


//se emplea como @Useguards ('jwt') sirve para validacion de token tanto de nuestra app como de terceros