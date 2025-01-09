import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DishModule } from './dish/dish.module';

@Module({
  imports: [UserModule, DishModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
