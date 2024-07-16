import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the initial context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

// SocketProvider component to wrap your app with the socket context
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create a new socket connection when component mounts
    const newSocket = io(BASE_API_URL, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    // Event listeners for connection status
    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Set the socket state
    setSocket(newSocket);

    // Clean up function to disconnect socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // Provide the socket and isConnected state to the context provider
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
