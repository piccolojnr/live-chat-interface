import {
  alpha,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useResponsive } from "../hooks/use-responsive";
import { SIDEBAR } from "./config-layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RouterLink from "../routes/components/router-link";
import { IChat } from "../types";

export default function Sidebar({
  openSidebar,
  onCloseSidebar,
}: {
  openSidebar: boolean;
  onCloseSidebar: () => void;
}) {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const mdUp = useResponsive("up", "md");
  const renderChatList = (
    <Stack
      spacing={0.5}
      sx={{
        px: 2,
      }}
    >
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </Stack>
  );
  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Chats
        </Typography>
      </Toolbar>
      {renderChatList}
    </div>
  );

  if (mdUp) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR.WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: SIDEBAR.WIDTH,
            boxSizing: "border-box",
            "& scrollbar": {
              display: "none",
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={openSidebar}
      onClose={onCloseSidebar}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "none" },
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR.WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

function ChatItem({ chat }: { chat: IChat }) {
  const activeChat = useSelector((state: RootState) => state.chat.activeChatId);
  const active = activeChat === chat.id;
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
          src={chat.participants[0].profilePicture}
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
          {chat.participants[0].username}
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
          {chat.lastMessage.message}
        </Typography>
      </Box>
    </ListItemButton>
  );
}
