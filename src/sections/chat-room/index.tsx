import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { IMessage } from "../../types";

const ChatRoom: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: "1",
      sender: {
        id: "1",
        username: "User1",
      },
      message: "Hello!",
      timestamp: new Date().toLocaleDateString(),
    },
    {
      id: "2",
      sender: {
        id: "2",
        username: "User2",
      },
      message: "Hi there!",
      timestamp: new Date().toLocaleDateString(),
    },
  ]);

  const handleSendMessage = () => {
    const newMessage: IMessage = {
      id: String(messages.length + 1),
      sender: {
        id: "1",
        username: "User1",
      },
      message,
      timestamp: new Date().toLocaleDateString(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          Chat Room
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.sender.username}
                secondary={message.message}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 3, display: "flex" }}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
            fullWidth
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatRoom;
