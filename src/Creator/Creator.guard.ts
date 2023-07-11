import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ProjectsService } from "src/projects/projects.service";
import { Role } from "@prisma/client";

@Injectable()
export default class CreatorGuard implements CanActivate {
  constructor(
    private readonly UserService: UserService,
    private readonly ProjectService: ProjectsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {user, params} = context.switchToHttp().getRequest();
    console.log(user)
    console.log(params)
    if (!user || !params) return false
    if (user?.role.includes(Role.admin)) return true

    const userId = user.id
    const projectId = Number(params.id)
    const userChecked = await this.UserService.findOne( userId )
    const projectChecked = await this.ProjectService.findOne( projectId )

    return (userChecked.id === projectChecked.UserId)
  }
}