import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AuthService, IRequest } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Body() body: {email: string, password: string}) {
    return await this.authService.login(body);
  }
}
