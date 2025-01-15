export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    ConfirmPassword?: string;
    address: string;
    image_url: string;
    constructor(partial: Partial<CreateUserDto>);
}
