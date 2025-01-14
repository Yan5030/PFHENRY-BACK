import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.Admin)
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
