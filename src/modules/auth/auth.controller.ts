import { 
  Controller, 
  Get, 
  Body, 
  Headers,
  UseGuards,
  Request,
  Post,
  BadRequestException,
  Param,
  HttpException,
  HttpStatus,
  Req,
  UnauthorizedException
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
import { RequestWithUser } from 'src/types/RequestWithUser';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SigninWithAuth0Dto } from './dto/signin-withAuth0.dto';



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
   async signupWithAuth0(@Body() createUserDto: CreateUserDto) {
     try {
       const user = await this.authService.registerWithAuth0(createUserDto);
       console.log(user);
       
       return { message: 'Usuario registrado con Auth0', data: user };
     } catch (error) {
       throw new BadRequestException('Error al registrar el usuario', error);
     }
   }
  
  @Post('signin')
  async signin(@Body() signinDto: SigninAuthDto) {
    const responseLogin = await this.authService.signin(signinDto);
    //response trae un objeto, donde tiene el token, y los datos del usuario

    return {data:responseLogin}
  }
 
  @Post('signinWithAuth0')
  async signinWithAuth0(@Body() signinWithAuth0Dto: SigninWithAuth0Dto) {
    return this.authService.signinWithAuth0(signinWithAuth0Dto);
  }


  @Post('signup/worker')
  async signupWorker(@Body() createUserDto: CreateUserDto) { 
      const user = await this.authService.signupWorker(createUserDto);
      return { message: 'Registro exitoso', data: user };
  }


}
