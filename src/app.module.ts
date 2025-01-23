import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


//import { CloudinaryConfig } from './config/cloudinary.config';

import { UsersModule } from './modules/users/users.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MenuItemModule } from './modules/menuItems/menuItem.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { CloudinaryService } from './service/cloudinary/cloudinary,service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ConfigModule.forRoot({
      envFilePath: '.env.development',  
      isGlobal: true, 
    }),
    AuthModule, 
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: 'clavesecret'
    }),
    
    UsersModule,
    ReservationsModule,
    CategoriesModule,
    OrdersModule,
    MenuItemModule,
    FileUploadModule
  ],

  controllers: [AppController],
  providers: [AppService, /*CloudinaryConfig*/ CloudinaryService],
})
export class AppModule {}


