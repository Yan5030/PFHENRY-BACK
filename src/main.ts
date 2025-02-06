import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import{config as dotenvConfig} from "dotenv"

dotenvConfig({path:'.env'})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  
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
    origin: 'https://pf-henry-front-k4frm1731-nahudavila12s-projects.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    allowedHeaders: 'Content-type, Authorization',
    credentials: true, 
  });  

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();