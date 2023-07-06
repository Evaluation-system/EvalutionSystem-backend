import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import {RegisterDto} from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService){};

    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

      public async  getCookieWithJwtToken(userId: number) {
      const payload: TokenPayload = { userId };
      const token = await this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
    }

    public async register(registrationData: RegisterDto) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      try {
        const createdUser = await this.usersService.create({
          ...registrationData,
          password: hashedPassword
        });
        createdUser.password = undefined;
        return createdUser;
      } catch (error) {
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
      try {
        const user = await this.usersService.getByEmail(email);
        await this.verifyPassword(plainTextPassword, user.password);
        user.password = undefined;
        return user;
      } catch (error) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }
     
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

} 


