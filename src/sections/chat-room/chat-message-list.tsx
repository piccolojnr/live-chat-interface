import React, { useEffect, useRef } from "react";
import { Box, List } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HEADER } from "../../layouts/config-layout";
import Scrollbar from "../../components/scrolbar";
import ChatBubble from "./chat-bubble";

const ChatMessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const scrollBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollBar.current) {
      scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Scrollbar ref={scrollBar}>
      <Box sx={{ height: HEADER.H_DESKTOP_OFFSET }} />
      <List
        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {messages.map((message, index) => (
          <ChatBubble key={index} {...message} />
        ))}
      </List>
      <Box sx={{ height: HEADER.H_DESKTOP_OFFSET }} />
    </Scrollbar>
  );
};

export default ChatMessageList;
