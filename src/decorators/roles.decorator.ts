import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enum/roles.enum'; 

export const Role = (...roles: string[]) => SetMetadata('roles', roles);