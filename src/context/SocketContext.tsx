import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string) => void;
}

// Create the initial context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(BASE_API_URL, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    const handleConnect = () => {
      setIsConnected(true);
    };
    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (error: any) => {
      console.log(error);
    };

    const handleRoomNotification = (data: any) => {
      setOnlineUsers(data.users);
    };
    const handleUserDisconnected = (data: any) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== data));
      console.log(`${data} disconnected`);
    };
    newSocket.on("userDisconnected", handleUserDisconnected);
    newSocket.on("roomNotification", handleRoomNotification);

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("error", handleError);

    setSocket(newSocket);

    return () => {
      newSocket.off("userDisconnected", handleUserDisconnected);
      newSocket.off("roomNotification", handleRoomNotification);
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("error", handleError);
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId);
  };

  const leaveRoom = (roomId: string) => {
    socket?.emit("leaveRoom", roomId);
  };

  const sendMessage = (roomId: string) => {
    socket?.emit("send-message", roomId);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        onlineUsers,
        joinRoom,
        leaveRoom,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
