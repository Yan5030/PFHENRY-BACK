import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { CanActivate } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> { 
        const request = context.switchToHttp().getRequest();
        const token = request.headers['autorizacion']?.split(' ')[1]?? null;
        if(!token){
            throw new UnauthorizedException('Token no auotorizado');
        }
        try{
            const secret = 'clavesecret';
            const payload = this.jwtService.verify(token,{secret});
            // payload.iat = new Date(payload.iat * 1000);
            // payload.exp = new Date(payload.exp * 1000);
            request.user = payload;
            return true;
        }catch(e){
            throw new UnauthorizedException('Token invalido');
        }
      }}
