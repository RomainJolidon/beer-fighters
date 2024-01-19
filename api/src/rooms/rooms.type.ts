import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const roomJoinReqSchema = z.object({
  roomCode: z
    .string({
      required_error: 'Room code is required',
    })
    .length(4, 'Room code must be 4 characters long'),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .trim()
    .min(3, 'Username must be at least 3 characters long'),
});

export class RoomJoinReq extends createZodDto(roomJoinReqSchema) {}
