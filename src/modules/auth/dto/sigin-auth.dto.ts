// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAuthDto } from './create-auth.dto';
import { UserAuthDto } from './user-auth.dto';

// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
export class SigninAuthDto extends UserAuthDto {
    email: string;
    password: string;
}
