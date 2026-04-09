import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetCookie } from 'src/common/decorators/get-cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.create(createUserDto);
    const {user_password, ...result} = user;
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res) {
    const {access_token, refresh_token} = await this.authService.login(loginDto);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return { access_token };
  }

  @Post('refresh')
  async refresh(@GetCookie('refresh_token') refreshToken: string, @Res({ passthrough: true }) res){
    const {access_token, refresh_token} = await this.authService.refresh(refreshToken);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return { access_token };
  }
  
}
