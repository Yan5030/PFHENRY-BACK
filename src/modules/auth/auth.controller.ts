import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getall() {
    return this.authService.getAllUsers();
  }

  @Post('signup')
  signup(@Body() userAuthDto: UserAuthDto) {
    return this.authService.signup(userAuthDto);
  }

  @Post('signin')
  signin(@Body() siginInDto: SigninAuthDto) {
    return this.authService.signin(siginInDto);
  }
}
