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
  Req
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
  //@UseGuards(Auth0Guard)
   async signupWithAuth0(@Body() createUserDto: CreateUserDto) {
     try {
       const user = await this.authService.registerWithAuth0(createUserDto);
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
  async signinWithAuth0(
    @Headers('authorization') authHeader: string,  // Recibe el token de los headers
    @Req() req: RequestWithUser,  // Mantén el acceso al req.user si ya lo tienes en algún middleware
  )
  
  {  
    console.log (authHeader, req)
    
    try {
      const user = req.user;  // Ahora 'req.user' está correctamente tipado
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
      }

      const userData = await this.authService.validateUserAndBuildResponse(user);
      return {
        data: userData,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('complete-profile/:id')
async completeProfile(
  @Param('id') id: string,
  @Body() updateProfileDto: UpdateProfileDto,
) {
  const user = await this.authService.completeUserProfile(id, updateProfileDto);
  return { message: 'Perfil completado', data: user };
}

  
  

}
