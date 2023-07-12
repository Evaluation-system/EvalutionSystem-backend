import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, UploadedFile, UseInterceptors, Request, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import RoleGuard from 'src/role/role.guard';
import { Role } from '@prisma/client';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import  CreatorGuard  from 'src/Creator/Creator.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  //@UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  //@UseGuards(RoleGuard(Role.admin))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @UseGuards(JwtAuthenticationGuard, CreatorGuard)
  @Delete(':id')
  remove(@Request() request: RequestWithUser, @Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
  
  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage( {
      destination: "./image",
      filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const fileExtension = file.originalname.split(".")[1];
        const Newname = name + "_" + Date.now() + "." + fileExtension;
        cb(null, Newname);        
      }
    }),
    fileFilter:(req, file, cb ) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb (null, false)
      }
      cb(null,true)
    }
  }))
  async uploadImage(@Param ('id') id:number, @UploadedFile() file: Express.Multer.File){
    id = Number(id)
    if(!file){
      throw new BadRequestException("Файл не является изображением");
    } else {
      const response = {
        filePath: `${file.filename}`
      }
      let project = await this.projectsService.findOne(id)
      project.pathImage = response.filePath
      this.projectsService.update(
        +id, project
      )
      return response
    }
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response){
    const project = this.projectsService.findOne(+id);
    return {data:res.sendFile((await project).pathImage, {root:'./image'})}
  }


  @Get('user/:id')
  finduserid(@Param('id') id: string) {
    return this.projectsService.finduserid(+id);
  }

  /*@Get(':id/patch')
  async getPatch( @Param('id') id: string){
    const project = this.projectsService.findOne(+id);
    return  (await project).pathImage;
  }*/
}
