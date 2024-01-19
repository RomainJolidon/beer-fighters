import { User } from './user.model';

export class Room {
  constructor(
    public id: string,
    public code: string,
    public users: User[] = [],
  ) {}
}
