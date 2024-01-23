import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Event } from './events.type';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): Event {
    console.log('message', data);

    return { event: 'message', data: 2 };
  }

  handleConnection() {
    console.log('Connected to WebSocket');
  }
}
