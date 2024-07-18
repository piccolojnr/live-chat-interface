import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_API_URL } from "../lib/constants";
import { base64ToAscii } from "../utils/functions";
import { addMessage, joinRooms } from "../store/chat-slice";
import { showNotification } from "../store/notification-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useSelector((state: RootState) => state.chat);
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );

  useEffect(() => {
    const newSocket = io(BASE_API_URL, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    const handleConnect = () => {
      setIsConnected(true);
      if (chats) {
        dispatch(joinRooms(chats.map((x) => x._id)));
      }
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

    const handleMessage = (msg: string) => {
      const message = JSON.parse(base64ToAscii(msg));
      if (message.roomId !== activeChatId) {
        dispatch(showNotification(`New message in ${message.roomName}`));
      } else {
        dispatch(addMessage(message));
      }
    };

    newSocket.on("userDisconnected", handleUserDisconnected);
    newSocket.on("roomNotification", handleRoomNotification);
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("error", handleError);
    newSocket.on("message", handleMessage);

    setSocket(newSocket);

    return () => {
      newSocket.off("userDisconnected", handleUserDisconnected);
      newSocket.off("roomNotification", handleRoomNotification);
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("error", handleError);
      newSocket.off("message", handleMessage);
      newSocket.disconnect();
    };
  }, [chats, dispatch, activeChatId]);

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId);
  };

  const leaveRoom = (roomId: string) => {
    socket?.emit("leaveRoom", roomId);
  };

  const sendMessage = (roomId: string, message: string) => {
    socket?.emit("send-message", { roomId, message });
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
