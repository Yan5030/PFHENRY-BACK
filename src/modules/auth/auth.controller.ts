import { 
  Controller, 
  Get, 
  Post, 
  Body, 
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
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtService } from '@nestjs/jwt';
import { Auth0Guard } from 'src/guards/auth0.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
      const user = await this.authService.signup(createUserDto);
      return { message: 'Registro exitoso', data: user };
  }

  @Post('signupWithAuth0')
  @UseGuards(Auth0Guard)
  async signupWithAuth0(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.registerWithAuth0(createUserDto);
    return { message: 'Usuario registrado con Auth0', data: user };
  } 

  @Post('signin')
  async signin(@Body() signinDto: SigninAuthDto) {
    const responseLogin = await this.authService.signin(signinDto);
    //response trae un objeto, donde tiene el token, y los datos del usuario

    return {data:responseLogin}
  }


@Post('complete-profile') 
async completeProfile(@Body() updateProfileDto: UpdateProfileDto) { 
  const user = await this.authService.completeUserProfile(updateProfileDto); 
  return { message: 'Perfil completado', data: user }; }

}
