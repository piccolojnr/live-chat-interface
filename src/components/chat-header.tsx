import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayout } from "../layouts";
import Iconify from "../components/iconify";
import { useTheme } from "../theme";
import RouterLink from "../routes/components/router-link";
import { IUser } from "../types";
import { setActiveUser } from "../store/user-slice";
import { isOnline } from "../store/user-slice";

const ChatHeader: React.FC<{
  user?: IUser;
}> = ({ user }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showSidebar } = useLayout();
  const location = useLocation();
  const online = useSelector(isOnline(user?._id));

  const handleBackClick = () => {
    if (location.pathname.endsWith("/profile")) {
      navigate(`/private-chat/${user?._id}`);
      return;
    }
    dispatch(setActiveUser(null));
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <IconButton onClick={showSidebar} sx={{ display: { md: "none" } }}>
        <Iconify
          icon="bi:justify-left"
          sx={{ color: theme.palette.text.primary }}
        />
      </IconButton>
      <IconButton
        onClick={handleBackClick}
        edge="start"
        color="inherit"
        sx={{ display: user ? "flex" : "none" }}
      >
        <ArrowBack />
      </IconButton>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          {user?.username}
        </Typography>
        <Chip
          label={online ? "Online" : "Offline"}
          color={online ? "success" : "default"}
          size="small"
          sx={{
            display: user ? "flex" : "none",
            marginLeft: 1,
            alignSelf: "center",
            justifyContent: "center",
          }}
        />
      </Stack>
      <Box sx={{ width: "40px" }} />
      <Box
        component={RouterLink}
        href={`/private-chat/${user?._id}/profile`}
        sx={{
          width: 24,
          height: 24,
          mr: 2,
          display: user ? "block" : "none",
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            mr: 2,
          }}
          src={user?.profilePicture}
          alt="photoUrl"
        />
      </Box>
    </Box>
  );
};

export default ChatHeader;
