import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/enum/roles.enum";

export class UpdateRoleUserDto{
@IsNotEmpty()
@ApiProperty({description: " El rol debe ser: admin, user, worker",example:"worker"})
@IsEnum(Role,{message: 'El rol debe ser uno de los siguientes valores: admin, user, worker' })
role:string
}