import { useEffect, useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Searchbar from "../../components/searchbar";
import ChatItem from "../../components/chat-item";
import { getChats } from "../../store/chat-slice";

export default function ChatSearchbar() {
  const [query, setQuery] = useState("");
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(getChats({ query }))
        .unwrap()
        .catch((error) => {
          console.error("Error fetching chats:", error);
        });
    };
    fetchUsers();
  }, [query]);

  const renderChatList = (
    <Stack
      spacing={0.5}
      sx={{
        px: 2,
      }}
    >
      {chats.map((chat, index) => (
        <ChatItem key={index} chat={chat} />
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
