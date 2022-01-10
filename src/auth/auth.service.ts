import { PrismaService } from '@/prisma/prisma.service';
import { Get, Injectable, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(id: string, email: string) {
    return this.prisma.user.findFirst({ where: { id, email } });
  }
}

export interface IRequest {
  user: User;
}
