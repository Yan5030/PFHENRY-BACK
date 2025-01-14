import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { Role } from 'src/enum/roles.enum';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    signin(signinDto: SigninAuthDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            address: string;
            image_url: string;
            role: Role;
            create_at: string;
            reservations: import("../reservations/entities/reservation.entity").Reservation[];
            orders: import("../orders/entities/order.entity").Order[];
        };
        token: string;
    }>;
}
