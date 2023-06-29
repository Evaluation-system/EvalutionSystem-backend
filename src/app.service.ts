import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [{id: 1, email: 'user@mail.com', password: 12345}];
  }
}
