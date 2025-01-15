import { SigninAuthDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(signinAuthDto: SigninAuthDto): Promise<{
        token: string;
        user: ResponseUserDto;
        loggin: boolean;
    }>;
    validateUserWithAuth0(payload: JwtPayload): Promise<User>;
}
