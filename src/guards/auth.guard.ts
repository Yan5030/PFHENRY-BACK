import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { CanActivate } from "@nestjs/common";
import { Role } from "src/enum/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> { 
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]?? null;
        if(!token){
            throw new UnauthorizedException('Token no auotorizado');
        }
        try{
            const secret = process.env.JWT_SECRET || 'clavesecret';
            const payload = this.jwtService.verify(token,{secret});
            console.log(`Payload guard ${JSON.stringify(payload, null, 2)}`);
            request.user = payload;
            return true;
        }catch(e){
            throw new UnauthorizedException('Token invalido');
        }
      }}