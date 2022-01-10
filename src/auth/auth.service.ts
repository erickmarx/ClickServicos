import { HashService } from './hash.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async login(body: { email: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!user) {
      throw new Error('user not found');
    }
    if (!(await this.hashService.decrypt(body.password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

export interface IRequest {
  user: User;
}
