import ChatHeader from "../../components/chat-header";
import Logo from "../../components/logo";
import { Box, Container, Typography } from "@mui/material";

export default function EmptyChat() {
  return (
    <Container>
      <ChatHeader />

      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Logo
          sx={{
            width: 80,
            height: 80,
            mb: 3,
          }}
        />
        <Typography variant="h3" sx={{ mb: 3 }}>
          No chats picked yet!
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Start a new chat or select an existing one to start messaging.
        </Typography>
      </Box>
    </Container>
  );
}
