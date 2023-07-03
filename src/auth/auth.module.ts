import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport'; 
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './localstrategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [UserModule, PassportModule,
    JwtModule.registerAsync({
      
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        }
      }),
    }),],
      
  controllers: [AuthController],
  providers: [AuthService,UserService, LocalStrategy, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
