import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTheme } from "../../theme";
import { fDateTime } from "../../utils/format-time";

const ChatBubble: React.FC<IMessage> = ({ message, sender, timestamp }) => {
  const { mode } = useTheme();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      setIsOverflow(
        messageRef.current.scrollHeight > messageRef.current.clientHeight
      );
    }
  }, [messageRef, message]);

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 1,
        mb: 2,
        p: 2,
        borderRadius: 2,
        maxWidth: "75%",
        width: "fit-content",
        bgcolor: "background.paper",
        ...(sender._id === user?._id && {
          bgcolor: mode === "dark" ? "primary.dark" : "primary.light",
          alignSelf: "flex-end",
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          wordBreak: "break-word",
        }}
      >
        {sender._id !== user?._id && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ mb: 2 }}
          >
            <Avatar
              src={sender.profilePicture}
              sx={{
                width: 24,
                height: 24,
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                alignSelf: "flex-start",
                color: "text.primary",
              }}
            >
              {sender.username}
            </Typography>
          </Stack>
        )}
        <Typography
          variant="body2"
          ref={messageRef}
          sx={{
            wordWrap: "break-word",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            lineHeight: 1.5,
            ...(showMore && {
              WebkitLineClamp: "unset",
              overflow: "unset",
            }),
          }}
        >
          {message}
        </Typography>
        {isOverflow && (
          <Typography
            variant="caption"
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontSize: "0.75rem",
              mt: 0.5,
            }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </Typography>
        )}
        <Typography
          variant="caption"
          sx={{ alignSelf: "flex-end", color: "text.secondary", mt: 1 }}
        >
          {fDateTime(timestamp, "hh:mm a")}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default ChatBubble;
