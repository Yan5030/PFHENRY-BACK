import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(): Promise<{
        data: import("./dto/response-user.dto").ResponseUserDto[];
    }>;
    findOne(id: string): Promise<{
        data: import("./dto/response-user.dto").ResponseUserDto;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: import("./entities/user.entity").User & UpdateUserDto;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
