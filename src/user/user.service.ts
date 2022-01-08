import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    return await this.prisma.user.create({ data });
  }
  async deleteUsers(): Promise<void> {
    await this.prisma.user.delete({where: {email: 'email@email.com'}});
  }
}
