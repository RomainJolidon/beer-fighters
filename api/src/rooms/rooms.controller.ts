import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async join(@Body() body: RoomJoinReq, @Res() res: Response) {
    const newUser = this.userService.createUser(body.username);

    const success = this.roomsService.joinRoom(body.roomCode, newUser);

    if (!success) {
      res.status(HttpStatus.NOT_FOUND).send('Room not found');
      return;
    }

    res.status(HttpStatus.OK).send('Joined room');
  }
}
