import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import { CloudinaryConfig } from './config/cloudinary.config';

import { UsersModule } from './modules/users/users.module'; // Importar UsersModule
import { ReservationsModule } from './modules/reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MenuItemModule } from './modules/menuItems/menuItem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Configuración de TypeORM
    ConfigModule.forRoot({
      envFilePath: '.env.development',  
      isGlobal: true, // Hace las variables de entorno globales
    }),
    AuthModule, // Importa el AuthModule para usar la autenticación
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET || 'defaultsecret', // Usa una variable de entorno para el secret
    }),
    UsersModule, // Importa el UsersModule para utilizar el repositorio y lógica de usuarios
    ReservationsModule,
    CategoriesModule,
    OrdersModule,
    MenuItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig], // Proveedores del módulo
})
export class AppModule {}


