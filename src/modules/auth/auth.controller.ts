import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards,
  Headers,
  Request,
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

   @Post('validate-token')
  async validateToken(
    @Headers('authorization') authHeader: string,
    @Request() req,
  ) {
    let token = authHeader ? authHeader.split(' ')[1] : null;
 
    if (!token) {
      const cookies = req.headers.cookie;
      if (cookies) {
        const tokenCookie = cookies
          .split('; ')
          .find((cookie) => cookie.startsWith('token='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    }
 
    if (!token) {
      return { isValid: false, message: 'Token no proporcionado o inválido' };
    }
 
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'clavesecret',
      });
      return { isValid: true, payload };
    } catch (error) {
      return { isValid: false, message: 'Token inválido' };
    }
  }


  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const newUser= await this.authService.signup(createUserDto);
    return {message:"Registro exitoso",data:newUser}
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninAuthDto) {
    const responseLogin = await this.authService.signin(signinDto);
    //response trae un objeto, donde tiene el token, y los datos del usuario

    return {data:responseLogin}
  }
}

