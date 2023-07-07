import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule }  from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ProcingsModule } from './procings/procings.module';
import { TasksModule } from './tasks/tasks.module';
import { EmployeePaymentsModule } from './employee-payments/employee-payments.module';
import * as Joi from 'joi';


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
    ProcingsModule,
    TasksModule,
    EmployeePaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}
