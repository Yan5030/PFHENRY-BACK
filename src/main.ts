import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.use(auth(auth0Config));

  
  app.useGlobalPipes(new ValidationPipe());

  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hogwarts API')
    .setDescription('Documentación de la API para manejar datos de la app de Hogwarts')
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación con Bearer
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Inicio del servidor
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
