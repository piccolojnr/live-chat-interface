import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IChat } from "../types";
import {
  alpha,
  Avatar,
  Box,
  Button,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { setActiveChat } from "../store/chat-slice";

function ChatItem({ chat }: { chat: IChat }) {
  const account = useSelector((state: RootState) => state.user.userInfo);
  const activeChat = useSelector((state: RootState) => state.chat.activeChatId);
  const active = activeChat === chat.id;
  const user =
    chat.type === "group"
      ? undefined
      : chat.participants[0].username === account?.username
      ? chat.participants[1]
      : chat.participants[0];
  const avatar = chat.type === "group" ? chat.avatar : user?.profilePicture;
  const navigate = useNavigate();
  const path = `/chat/${chat.id}`;
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (location.pathname !== path) {
      dispatch(setActiveChat(chat.id));
      navigate(path);
    } else {
      dispatch(setActiveChat(null));
      navigate("/chat");
    }
  };

  return (
    <ListItemButton
      component={Button}
      onClick={handleClick}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active
          ? {
              color: "primary.main",
              fontWeight: "fontWeightSemiBold",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }
          : {}),
        width: "100%",
        bgcolor: (theme) =>
          active
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.grey[200], 0.12),
        "&:hover": {
          bgcolor: (theme) =>
            active
              ? alpha(theme.palette.primary.main, 0.16)
              : alpha(theme.palette.grey[500], 0.24),
        },
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <Avatar
          sx={{
            width: 20,
            height: 20,
            mr: 2,
          }}
          src={avatar}
          alt="photoUrl"
        />
      </Box>
      <Box component="span">
        <Typography
          variant="subtitle2"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {user ? user.username : chat.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: 12,
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          lineHeight={1.25}
        >
          {chat.lastMessage?.message}
        </Typography>
      </Box>
    </ListItemButton>
  );
}

export default ChatItem;
