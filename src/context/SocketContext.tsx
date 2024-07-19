import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";
import { base64ToAscii } from "../utils/functions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateOnlineUsers } from "../store/user-slice";
import { addMessage, setMessages } from "../store/user-slice";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  emitMessage: (to: string, from: string, message: string) => void;
  getMessages: (to: string, from: string) => void;
}

// Create the initial context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  leaveRoom: () => {},
  emitMessage: () => {},
  getMessages: () => {},
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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

    const handleMessage = (msg: string) => {
      const message: {
        key: string;
        sender: string;
        username: string;
        message: string;
        timestamp: string;
      } = JSON.parse(base64ToAscii(msg));

      dispatch(addMessage(message));
    };

    const handleGetMessages = (messages: string[]) => {
      const parsedMessages: any = [];
      messages.forEach((msg) => {
        parsedMessages.push(JSON.parse(base64ToAscii(msg)));
      });
      dispatch(setMessages(parsedMessages));
    };

    const handleUserList = (data: {
      users: string[];
      type: "update" | "delete";
      userId: string;
    }) => {
      dispatch(updateOnlineUsers(data.users));
    };

    newSocket.on("userList", handleUserList);
    newSocket.on("message", handleMessage);
    newSocket.on("messages", handleGetMessages);
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("error", handleError);

    setSocket(newSocket);

    return () => {
      newSocket.off("userList", handleUserList);
      newSocket.off("message", handleMessage);
      newSocket.off("messages", handleGetMessages);
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("error", handleError);
      newSocket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId);
  };

  const leaveRoom = (roomId: string) => {
    socket?.emit("leaveRoom", roomId);
  };

  const emitMessage = (to: string, from: string, message: string) => {
    socket?.emit("send-message", { to, from, message });
  };

  const getMessages = (to: string, from: string) => {
    socket?.emit("get-messages", { to, from });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinRoom,
        leaveRoom,
        emitMessage,
        getMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
