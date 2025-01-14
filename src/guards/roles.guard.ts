import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector :Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!roles){
            throw new Error('Roles no definidos');
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(`Este es el valor de user.role ${user.roles}`)
        if (!user || !user.roles){
            return false;
        }
        return roles.some(role => user.roles.includes(role));
    }
}