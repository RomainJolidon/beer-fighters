import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { UserSession } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
import { RoomJoinReq } from './rooms.type';

@Controller('room')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private userService: UsersService,
  ) {}

  @Get('')
  list() {
    return this.roomsService.rooms;
  }

  @Post('create')
  create() {
    return this.roomsService.createRoom();
  }

  @Post('join')
  async join(
    @Body() body: RoomJoinReq,
    @Res() res: Response,
    @Session() session: UserSession,
  ) {
    console.log(session.user);
    //TODO: check if current room is the same as asking to join
    if (session.user) {
      const user = session.user;
      const roomId = user.currRoomId;

      if (roomId) {
        // check if room is the same as asking to join
        const isSameRoom = this.roomsService.MatchRoombyCodeAndId(
          body.roomCode,
          roomId,
        );
        if (isSameRoom) {
          res.status(HttpStatus.OK).send('Joined room');
          return;
        }

        // TODO leave previous room
        // this.roomsService.leaveRoomById(roomId, user);

        const joinedRoomId = this.roomsService.joinRoomById(roomId, user);

        if (!joinedRoomId) {
          res.status(HttpStatus.NOT_FOUND).send('Room not found');
          return;
        }

        user.currRoomId = joinedRoomId;
        session.user = user;

        res.status(HttpStatus.OK).send('Joined room');
        return;
      }

      session.regenerate(() => {});
    }

    const newUser = this.userService.createUser(body.username);

    const roomId = this.roomsService.joinRoomByCode(body.roomCode, newUser);

    if (!roomId) {
      res.status(HttpStatus.NOT_FOUND).send('Room not found');
      return;
    }

    newUser.currRoomId = roomId;
    session.user = newUser;
    res.status(HttpStatus.OK).send('Joined room');
  }
}
