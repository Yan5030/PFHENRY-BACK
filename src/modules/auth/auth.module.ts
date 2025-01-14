import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), UsersModule, JwtModule.register({
        global: true,
        signOptions: { expiresIn: '1h' },
        secret: 'clavesecret'
      })]
})
export class AuthModule {}
