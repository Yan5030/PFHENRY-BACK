import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly userRepository;
    constructor(authRepository: AuthRepository, jwtService: JwtService, userRepository: UserRepository);
    getAllUsers(): UserAuthDto[];
    signup(userAuthDto: UserAuthDto): Promise<UserAuthDto>;
    signin(signinAuthDto: SigninAuthDto): Promise<{
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        message: string;
        user: UserAuthDto;
        token: string;
    }>;
    validateUserWithAuth0(payload: JwtPayload): Promise<User>;
}
