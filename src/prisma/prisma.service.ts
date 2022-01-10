import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';


import { PRISMA_CLIENT_OPTIONS } from './prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();

    //this.$use(prismaHidePassword);
    //prevent removing any record from database
    //update "deletedAt" instead
    // this.$use(prismaSoftDeleteMiddleware);

    //automatically filter records that was not soft deleted
    //findMany and updateMany calls still accepting explicitly defined "deletedAt" filters
    // this.$use(prismaSoftDeleteFilterMiddleware);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
