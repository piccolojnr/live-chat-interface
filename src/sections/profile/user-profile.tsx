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
import { IUser } from "../../types";
import ChatHeader from "../../components/chat-header";
import { useSelector } from "react-redux";
import { isOnline } from "../../store/user-slice";

interface ChatProfileProps {
  user: IUser;
}

const UserProfile: React.FC<ChatProfileProps> = ({ user }) => {
  const online = useSelector(isOnline(user._id));
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
              label={online ? "Online" : "Offline"}
              color={online ? "success" : "default"}
              size="medium"
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
