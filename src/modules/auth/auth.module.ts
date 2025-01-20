import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthMiddleware } from 'src/middlewares/Auth.middleware';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
   JwtModule.register({
     global: true,
     signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET || 'clavesecret', 
   }),
    TypeOrmModule.forFeature([User]), 
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule implements NestModule {
  configure (consumer:MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('auth/signin', 'auth/signup')
  }
}


