import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Stack,
  Container,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUser } from "../../utils/functions";
import ChatHeader from "../../components/chat-header";
import { useSocket } from "../../context/SocketContext";

interface ChatProfileProps {
  activeChatId: string;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ activeChatId }) => {
  const { onlineUsers } = useSocket();
  const account = useSelector((state: RootState) => state.user.userInfo);
  const chat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat._id === activeChatId)
  );

  if (!chat) {
    return null;
  }

  const user = getUser(chat, account);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <ChatHeader onlineUser={onlineUsers} />
      <Paper elevation={3} sx={{ padding: 3, mt: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 250,
          }}
        >
          <Avatar
            src={user.profilePicture}
            alt={user.username}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {user.username}
            </Typography>
            <Chip
              label={onlineUsers.includes(user._id) ? "Online" : "Offline"}
              color={onlineUsers.includes(user._id) ? "success" : "default"}
              size="medium"
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatProfile;
