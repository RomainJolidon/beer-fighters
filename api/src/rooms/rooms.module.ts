import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [UsersModule],
})
export class RoomsModule {}
