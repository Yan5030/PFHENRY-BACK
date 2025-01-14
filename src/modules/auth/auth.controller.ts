import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Mantener el DTO de Jhon
import { SigninAuthDto } from './dto/sigin-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninAuthDto) {
    return this.authService.signin(signinDto);
  }
}

