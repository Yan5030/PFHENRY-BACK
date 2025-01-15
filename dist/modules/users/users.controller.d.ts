import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileUploadService } from '../file-upload/file-upload.service';
export declare class UsersController {
    private readonly usersService;
    private readonly fileUploadService;
    constructor(usersService: UsersService, fileUploadService: FileUploadService);
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
    uploadFile(id: string, file: Express.Multer.File): Promise<{
        message: string;
        data: import("./entities/user.entity").User & UpdateUserDto;
    }>;
}
