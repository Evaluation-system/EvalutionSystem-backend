import { Controller, Request, Response, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import {RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(
    @Request() request: RequestWithUser,
    @Response() response: Response,
  ): Promise<Object> {
    const { user } = request

    const  cookie  = this.authService.getCookieWithJwtToken(
      user.id,
    )

    request.res.header['Set-Cookie'] = cookie;
    user.password = undefined
    return request.res.send({ user})
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Request() request: RequestWithUser, @Response() response: Response) {
    const cookie  = this.authService.getCookieForLogOut()

     request.res.header['Set-Cookie'] = cookie;
    return {success: true}
  }

} 

 
