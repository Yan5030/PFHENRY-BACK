import { Role } from '../../../enum/roles.enum';
export declare class UserAuthDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    address: string;
    image?: string;
    role: Role;
    created?: string;
}
