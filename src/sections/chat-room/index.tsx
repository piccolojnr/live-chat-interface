import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getChatMessages } from "../../store/chat-slice";
import ChatMessageList from "./chat-message-list";
import ChatInput from "./chat-input";
import ChatHeader from "../../components/chat-header";
import { useSocket } from "../../context/SocketContext";

const ChatRoom: React.FC<{ activeChatId: string }> = ({ activeChatId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      dispatch(getChatMessages({ chatId: activeChatId }))
        .unwrap()
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    };
    fetchMessages();
  }, [activeChatId, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <ChatHeader onlineUser={onlineUsers} />
      <ChatMessageList />
      <ChatInput activeChatId={activeChatId} />
    </Box>
  );
};

export default ChatRoom;
