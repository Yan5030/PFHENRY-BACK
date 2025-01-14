import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserPartialDto } from './dto/create-user-partial.dto';
export declare class UserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail(email: string): Promise<User | undefined>;
    createUser(userData: CreateUserPartialDto): Promise<User>;
    saveUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
}
