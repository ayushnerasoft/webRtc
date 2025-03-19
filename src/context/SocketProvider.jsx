import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext < Socket | null > (null);

// Custom hook to use the socket
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState< Socket | null > (null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      transports: ['websocket'], // Ensures WebSocket connection
      reconnection: true, // Allows reconnection attempts
    });

    setSocket(newSocket);

    // Cleanup function to disconnect socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
