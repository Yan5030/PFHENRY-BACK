import { PartialType } from '@nestjs/mapped-types';
import { CreateComboDto } from './create-combos.dto';


export class UpdateComboDto extends PartialType(CreateComboDto) {}