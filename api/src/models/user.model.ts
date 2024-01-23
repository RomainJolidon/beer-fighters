import { Session } from 'express-session';

export class User {
  constructor(
    public username: string,
    public currRoomId?: string,
  ) {}
}

export type UserSession = Session & { user: User };
