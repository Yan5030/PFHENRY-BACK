import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User;
    }>;
    signin(signinDto: SigninAuthDto): Promise<{
        data: {
            token: string;
            user: import("../users/dto/response-user.dto").ResponseUserDto;
            loggin: boolean;
        };
    }>;
}
