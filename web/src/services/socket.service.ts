// socketService.ts
import { io } from 'socket.io-client';

const socket = io(); // You may need to adjust the connection URL

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

export default socket;
