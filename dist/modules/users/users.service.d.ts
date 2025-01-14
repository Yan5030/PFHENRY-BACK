import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<ResponseUserDto[]>;
    findOneById(id: string): Promise<ResponseUserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User & UpdateUserDto>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getOneByEmail(email: string): Promise<User>;
}
