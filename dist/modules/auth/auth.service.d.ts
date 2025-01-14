import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { Role } from 'src/enum/roles.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(signinAuthDto: SigninAuthDto): Promise<{
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
    validateUserWithAuth0(payload: JwtPayload): Promise<User>;
}
