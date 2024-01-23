// socketService.ts
import { io } from 'socket.io-client';

export default function useSocket() {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  return socket;
}