import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from './common/guards/google-oauth.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createuser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {
    return { message: 'Redirecting to google login', url: req.url };
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInData: Record<string, any>) {
    return this.authService.login(signInData);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpData: CreateUserDto) {
    return this.authService.register(signUpData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
