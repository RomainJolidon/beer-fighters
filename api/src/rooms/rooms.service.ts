import { Injectable, Scope } from '@nestjs/common';
import { Room } from 'src/models/room.model';
import { User } from 'src/models/user.model';

@Injectable({ scope: Scope.DEFAULT })
export class RoomsService {
  private roomID = 0;
  public rooms: Room[] = [];

  // return 4 letter capitalized string
  private getRandomRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public createRoom(): Room {
    this.roomID++;
    const room = new Room(this.roomID.toString(), this.getRandomRoomCode());
    this.rooms.push(room);
    return room;
  }

  public joinRoom(roomCode: string, user: User): boolean {
    const room = this.rooms.find((room) => room.code === roomCode);
    if (!room) {
      return false;
    }
    room.users.push(user);
    return true;
  }
}
