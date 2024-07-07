import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IChat, IUser } from "../types";
import { alpha, Avatar, Box, ListItemButton, Typography } from "@mui/material";
import RouterLink from "../routes/components/router-link";

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

  return (
    <ListItemButton
      component={RouterLink}
      href={`/chat/${chat.id}`}
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
