import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu-itemdto';


export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}
