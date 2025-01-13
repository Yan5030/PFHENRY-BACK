import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CloudinaryConfig } from './config/cloudinary.config';

import { UsersModule } from './modules/users/users.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: '.env.development',  
      isGlobal: true,
    }),
    
    UsersModule, ReservationsModule, CategoriesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig],
})
export class AppModule {}

