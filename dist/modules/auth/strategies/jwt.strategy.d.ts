import { AuthService } from 'src/modules/auth/auth.service';
import { JwtPayload } from '../jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private jwksClient;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        email: string;
        roles: import("../../../enum/roles.enum").Role;
    }>;
}
export {};
