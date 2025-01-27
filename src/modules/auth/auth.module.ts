import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { JwtModule } from '@nestjs/jwt';
//import { JwtMiddleware } from 'src/middlewares/jwt.middleware';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: 'lFbSLO8L0CcSFx8p7wizSxHlQa0fUQDN'  //process.env.JWT_SECRET || '', // Llave secreta por defecto
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, NodemailerService, UsersService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {} 
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware) // Aplica el middleware para validar tokens
//       .forRoutes('auth/signinWithAuth0'); // Rutas protegidas
//   }

