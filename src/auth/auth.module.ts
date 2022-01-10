import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HashService } from './hash.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, HashService],
  exports: [HashService]
})
export class AuthModule {}
