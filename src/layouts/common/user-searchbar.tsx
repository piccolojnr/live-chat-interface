import { useState } from "react";
import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setActiveChat, addChat } from "../../store/chat-slice";
import { faker } from "@faker-js/faker";
import Searchbar from "../../components/searchbar";
import UserItem from "../../components/user-item";
import { IUser } from "../../types";
import { useNavigate } from "react-router-dom";

export default function UserSearchbar() {
  const [query, setQuery] = useState("");
  const users = useSelector((state: RootState) => state.user.allUsers);
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleUserClick = (user: IUser) => {
    // Check if a chat with this user already exists
    let chat = chats.find((chat) =>
      chat.participants.some((p) => p.id === user.id)
    );
    if (!chat) {
      // If not, create a new chat
      chat = {
        id: faker.datatype.uuid(),
        participants: [user],
      };
      dispatch(addChat(chat));
    }
    dispatch(setActiveChat(chat.id));
    navigate(`/chat/${chat.id}`);
  };

  const renderUserList = (
    <Stack
      spacing={0.5}
      sx={{
        px: 2,
      }}
    >
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} onClick={handleUserClick} />
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
          Users
        </Typography>
      </Toolbar>
      {renderUserList}
    </Box>
  );
}
