import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
