import { alpha, Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import RouterLink from "../../routes/components/router-link";

export default function ChatAvatar() {
  const activeChat = useSelector((state: RootState) => state.chat.activeChatId);

  return (
    <>
      {activeChat && (
        <IconButton
          LinkComponent={RouterLink}
          href={`/chat/${activeChat}/overview`}
          sx={{
            width: 40,
            height: 40,
            background: (theme) => alpha(theme.palette.common.white, 0.1),
            ...(false
              ? {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }
              : {}),
          }}
        >
          <Avatar alt="User" src="/static/images/avatars/avatar_6.png" />
        </IconButton>
      )}
    </>
  );
}
