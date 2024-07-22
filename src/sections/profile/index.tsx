import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { IUser } from "../../types";
import ProfileSetup from "./profile-setup";
import ChatHeader from "../../components/chat-header";

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ChatHeader />

      <ProfileSetup user={user} open={open} handleClose={handleClose} />
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
            {user.bio && (
              <Typography variant="body2" color="textSecondary" component="p">
                {user.bio}
              </Typography>
            )}
            {user.phone && (
              <Typography variant="body2" color="textSecondary" component="p">
                Phone: {user.phone}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleOpen}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
