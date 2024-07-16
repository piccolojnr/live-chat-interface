import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { base64ToAscii } from "../utils/functions";
import { addMessage } from "../store/chat-slice";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
}

// Create the initial context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  joinRoom: () => {},
  leaveRoom: () => {},
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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
  }, [dispatch]);
  const handleMessage = (msg: string) => {
    const message = JSON.parse(base64ToAscii(msg));
    dispatch(addMessage(message));
  };

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId, (error: string) => {
      if (error) {
        console.log("Join room error:", error);
      } else {
        console.log("Joined room:", roomId);
        socket?.on("message", handleMessage);
      }
    });
  };

  const leaveRoom = (roomId: string) => {
    socket?.emit("leaveRoom", roomId, (error: string) => {
      if (error) {
        console.log("Leave room error:", error);
      } else {
        console.log("Left room:", roomId);
        socket?.off("message", handleMessage);
      }
    });
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, onlineUsers, joinRoom, leaveRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};
