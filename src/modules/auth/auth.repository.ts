import { Injectable } from "@nestjs/common";
import { UserAuthDto } from "./dto/user-auth.dto";

@Injectable()
export class AuthRepository {
    private users: UserAuthDto[] = [];

    findall(): UserAuthDto[]{
        return this.users;
    }

    findAll(): UserAuthDto[] {
        return this.users;
      }

    create(user: UserAuthDto): UserAuthDto{
        this.users.push(user);
        return user;
    }

    findByEmail(email: string): UserAuthDto | undefined {
        return this.users.find((user) => user.email === email);
    }
}