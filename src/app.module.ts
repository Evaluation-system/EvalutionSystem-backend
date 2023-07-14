import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule }  from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { PhaseTasksModule } from './phase-tasks/phase-tasks.module';
import * as Joi from 'joi';
import { PhaseModule } from './phase/phase.module';


@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    ProjectsModule,
    PhaseModule,
    PhaseTasksModule],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}
