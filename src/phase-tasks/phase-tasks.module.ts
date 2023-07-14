import { Module } from '@nestjs/common';
import { PhaseTasksService } from './phase-tasks.service';
import { PhaseTasksController } from './phase-tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PhaseTasksController],
  providers: [PhaseTasksService, PrismaService]
})
export class PhaseTasksModule {}
