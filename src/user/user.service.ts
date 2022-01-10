import { HashService } from './../auth/hash.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    data.password = await this.hashService.encrypt(data.password)
    if(await this.prisma.user.findFirst({where: {email: data.email}})){
      await this.prisma.user.delete({where: {email: data.email}})
    }
    return await this.prisma.user.create({ data });
  }
}
