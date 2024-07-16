import React, { useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import { primary } from "../../theme/palette";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { sendMessage } from "../../store/chat-slice";

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${primary.light};
  }

  &:focus {
    outline: 0;
    border-color: ${primary.main};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? primary.dark : primary.light
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const ChatInput: React.FC<{ activeChatId: string }> = ({ activeChatId }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    dispatch(sendMessage({ chatId: activeChatId, message }))
      .unwrap()
      .then(() => {
        setMessage("");
        inputRef.current?.focus();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event as unknown as React.FormEvent);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        position: "absolute",
        bottom: -20,
        "&:focus-within": { bottom: 0 },
        transition: "bottom 0.3s ease",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          alignItems: "center",
          p: 1,
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          transition: "bottom 0.3s ease",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Textarea
          style={{ resize: "none" }}
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          sx={{ mr: 1 }}
          autoComplete="off"
          ref={inputRef}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Stack>
  );
};

export default ChatInput;
