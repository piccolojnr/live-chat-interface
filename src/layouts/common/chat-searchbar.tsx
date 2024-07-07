import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Searchbar from "../../components/searchbar";
import ChatItem from "../../components/chat-item";

export default function ChatSearchbar() {
  const [query, setQuery] = useState("");
  const chats = useSelector((state: RootState) => state.chat.chats);

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((p) =>
      p.username.toLowerCase().includes(query.toLowerCase())
    )
  );

  const renderChatList = (
    <Stack
      spacing={0.5}
      sx={{
        px: 2,
      }}
    >
      {filteredChats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </Stack>
  );

  return (
    <Box sx={{ p: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
        }}
      >
        <Searchbar query={query} setQuery={setQuery} />
        <Typography
          variant="body2"
          noWrap
          sx={{
            ml: 2,
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          My chats
        </Typography>
      </Toolbar>
      {renderChatList}
    </Box>
  );
}
