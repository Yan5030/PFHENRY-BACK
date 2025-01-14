import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, 
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: 'clavesecret'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
