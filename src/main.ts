import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import{config as dotenvConfig} from "dotenv"
import { auth0Config } from './config/auth0.config';
import { auth } from 'express-openid-connect';
dotenvConfig({path:'.env'})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  
  // app.use(auth(auth0Config));
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    skipMissingProperties: false,
    exceptionFactory: (errors)=>{
      const errores = errors.map((error)=>{
         return {property : error.property, constraints: error.constraints};
    });
   return new BadRequestException({alert: "Se han detectado los siguientes errores",errors: errores})
    }
  }));


  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hogwarts API')
    .setDescription('Documentación de la API para manejar datos de la app de Hogwarts')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-type, Authorization',
    credentials: true, 
  });  

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
