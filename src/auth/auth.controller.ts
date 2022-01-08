import { Controller, Get, Param, Req } from '@nestjs/common';
import { AuthService, IRequest } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user/:id/email/:email')
  async login(@Param('id') id: string, @Param('email') email: string) {
    return await this.authService.login(id, email);
  }
}
