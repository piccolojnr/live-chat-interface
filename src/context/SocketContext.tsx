import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";
import { base64ToAscii } from "../utils/functions";
import { IUser } from "../types";
import { users } from "../_moke/users";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { findUserById, updateOnlineUsers } from "../store/user-slice";
import { addMessage, setMessages } from "../store/chat-slice";
import { showNotification } from "../store/notification-slice";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  emitMessage: (to: string, from: string, message: string) => void;
  getMessages: (to: string, from: string) => void;
}

// Create the initial context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
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
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const activeUser = useSelector((state: RootState) => state.user.activeUser);
  const account = useSelector((state: RootState) => state.user.userInfo);

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
      const message = JSON.parse(base64ToAscii(msg));
      if (
        activeUser &&
        account &&
        (activeUser._id === message.sender || account._id === message.sender)
      ) {
        dispatch(addMessage(message));
      } else {
        dispatch(
          showNotification({
            type: "info",
            message: `New message from `,
          })
        );
      }
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
        onlineUsers,
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
