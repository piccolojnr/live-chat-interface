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
import { AppDispatch, RootState } from "../store";
import { setActiveChat } from "../store/chat-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayout } from "../layouts";
import Iconify from "./iconify";
import { useTheme } from "../theme";
import { getAvatar, getUser } from "../utils/functions";
import RouterLink from "../routes/components/router-link";

const ChatHeader: React.FC<{
  onlineUser?: string[];
}> = ({ onlineUser = [] }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showSidebar: onOpenSidebar } = useLayout();
  const account = useSelector((state: RootState) => state.user.userInfo);
  const chat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat._id === state.chat.activeChatId)
  );
  const user = chat && getUser(chat, account);

  const avatar = chat && getAvatar(chat, user);
  const location = useLocation();

  const handleBackClick = () => {
    dispatch(setActiveChat(null));
    // if location ends with /profile, navigate to /chat/activeChatId
    if (location.pathname.endsWith("/profile")) {
      navigate(`/chat/${chat?._id}`);
      return;
    }
    navigate("/chat");
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
      <IconButton onClick={onOpenSidebar} sx={{ display: { md: "none" } }}>
        <Iconify
          icon="bi:justify-left"
          sx={{ color: theme.palette.text.primary }}
        />
      </IconButton>
      <IconButton
        onClick={handleBackClick}
        edge="start"
        color="inherit"
        sx={{ display: chat ? "flex" : "none" }}
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
          {user?.username || chat?.name}
        </Typography>
        <Chip
          label={onlineUser.includes(user?._id || "") ? "Online" : "Offline"}
          color={onlineUser.includes(user?._id || "") ? "success" : "default"}
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
        href={`/chat/${chat?._id}/profile`}
        sx={{
          width: 24,
          height: 24,
          mr: 2,
          display: chat ? "block" : "none",
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            mr: 2,
          }}
          src={avatar}
          alt="photoUrl"
        />
      </Box>
    </Box>
  );
};

export default ChatHeader;
