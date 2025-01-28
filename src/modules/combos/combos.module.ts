import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';
import { Combo } from './entities/combos.entities';
import { MenuItem } from '../menuItems/entities/menuItems.entities';


@Module({
  imports: [TypeOrmModule.forFeature([Combo, MenuItem])],
  controllers: [CombosController],
  providers: [CombosService],
})
export class CombosModule {}