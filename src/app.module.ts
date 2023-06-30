import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule }  from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


@Module({
  imports: [
    UserModule, 
    PrismaModule, 
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}
