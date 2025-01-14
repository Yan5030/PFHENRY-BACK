import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  signin(@Body() siginInDto: SigninAuthDto) {
     return this.authService.signin(siginInDto);
   }
}
