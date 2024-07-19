import React, { useEffect, useRef, useState } from "react";
import { Box, List } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HEADER } from "../../layouts/config-layout";
import Scrollbar from "../../components/scrolbar";
import ChatBubble from "./chat-bubble";
import { IMessage } from "../../types";

const ChatMessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.user.messages);
  const account = useSelector((state: RootState) => state.user.userInfo);
  const user = useSelector((state: RootState) => state.user.activeUser);
  const [parsedMessages, setParsedMessages] = useState<IMessage[]>([]);
  const scrollBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parseMessages = () => {
      const parsedMessages: any = messages.map((message) => {
        return {
          ...message,
          sender: message.sender === account?._id ? account : user,
        };
      });

      setParsedMessages(parsedMessages);
    };
    if (scrollBar.current) {
      scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
    }
    parseMessages();
  }, [messages, account, user]);

  return (
    <Scrollbar ref={scrollBar}>
      <Box sx={{ height: HEADER.H_DESKTOP_OFFSET }} />
      <List
        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {parsedMessages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </List>
      <Box sx={{ height: HEADER.H_DESKTOP_OFFSET }} />
    </Scrollbar>
  );
};

export default ChatMessageList;
