import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from './config/cloudinary.config';
import { typeOrmConfig } from './config/typeOrm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: '.env.development',  
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig],
})
export class AppModule {}

