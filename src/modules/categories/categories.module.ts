import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

//import { MenuItemModule } from '../menuItem'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoriesRepository]),
    //MenuItemModule, 
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
