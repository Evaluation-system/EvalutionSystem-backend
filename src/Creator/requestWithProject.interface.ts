
import { Request } from 'express';
import {UserProjects} from '@prisma/client';
 
interface RequestWithProject extends Request {
  userprojects: UserProjects;
}
 
export default RequestWithProject;