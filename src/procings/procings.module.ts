import { Module } from '@nestjs/common';
import { ProcingsService } from './procings.service';
import { ProcingsController } from './procings.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProcingsController],
  providers: [ProcingsService, PrismaService]
})
export class ProcingsModule {}
