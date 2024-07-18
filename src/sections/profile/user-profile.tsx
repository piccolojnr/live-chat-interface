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
import { useSocket } from "../../context/SocketContext";
import { IUser } from "../../types";
import ChatHeader from "../chat/chat-header";

interface ChatProfileProps {
  user: IUser;
}

const UserProfile: React.FC<ChatProfileProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Container>
      <ChatHeader user={user} />
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
              label={true ? "Online" : "Offline"}
              color={true ? "success" : "default"}
              size="medium"
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
