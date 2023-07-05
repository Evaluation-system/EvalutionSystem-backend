import {
  Controller,
  Request,
  Get,
  Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, UploadedFile, UseInterceptors, BadRequestException, Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-auth.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { RegisterDto } from './dto/register.dto';
import { Express } from 'express';
import { request } from 'http';
import { ObjectUnsubscribedError } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { error } from 'console';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private ProjectsService: ProjectsService) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(

    @Request() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Object> {
    const { user } = request
    const cookie = this.authService.getCookieWithJwtToken(
      user.id,
    )
    request.res.set('Set-Cookie', await cookie)
    user.password = undefined
    return request.res.send(user)
    //request.res.header['Set-Cookie'] = cookie;

    console.log(request.res.header)
    user.password = undefined

    console.log(request.res)
    return request.res.send(user)
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
  async logOut(@Request() request: RequestWithUser, @Res() response: Response) {
    const cookie = this.authService.getCookieForLogOut()

    request.res.header['Set-Cookie'] = cookie;
    return { success: true }
  }

  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./image",
      filename: (req, file, cb) => {
        const name = file.originalname
        cb(null, name)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false)
      }
      cb(null, true)
    }
  }))
  async uploadImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    id = Number(id)
    if (!file) {
      throw new BadRequestException("Файл не является изображением");
    } else {
      const response = {
        filePath: `./pictures/${file.filename}`
      }
      let project = await this.ProjectsService.findOne(id)
      console.log(id)
      console.log(project)
      project.pathImage = response.filePath
      this.ProjectsService.update(
        +id, project
      )
      return response
    }
  }


  // @Get('images/:filename')
  // async getImage(@Param('filename') filename, @Res() res: Response){
  //   res.sendFile(filename, {root:'./images'});
  // }
}


