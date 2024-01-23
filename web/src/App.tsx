import { useEffect, useState } from 'react';
import './App.scss';
import reactLogo from './assets/react.svg';
import useSocket from './services/socket.service';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();

  const onFight = () => {
    socket?.emit('message', 'Fight!');
  }

  useEffect(() => {
    console.log('App mounted');
    

    function onMessage(message: string) {
      console.log('message', message);
      
      setMessages((messages) => [...messages, message]);
    }

    socket?.on('message', onMessage);

    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket]);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Beer Fighters</h1>
      <div className="card">
        <button className="button" onClick={onFight}>Fight</button>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </>
  )
}

export default App
