import { UserAuthDto } from "./dto/user-auth.dto";
export declare class AuthRepository {
    private users;
    findall(): UserAuthDto[];
    findAll(): UserAuthDto[];
    create(user: UserAuthDto): UserAuthDto;
    findByEmail(email: string): UserAuthDto | undefined;
}
