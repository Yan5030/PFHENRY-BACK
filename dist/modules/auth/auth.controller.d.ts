import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getall(): UserAuthDto[];
    signup(userAuthDto: UserAuthDto): Promise<UserAuthDto>;
    signin(siginInDto: SigninAuthDto): Promise<{
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        message: string;
        user: UserAuthDto;
        token: string;
    }>;
}
