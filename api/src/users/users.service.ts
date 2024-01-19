import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  public createUser(username: string): User {
    const user = new User(username);
    this.users.push(user);

    return user;
  }
}
