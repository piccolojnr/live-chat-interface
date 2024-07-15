import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { IChat } from "../../types";

export default function ChatOverview({ chat }: { chat: IChat }) {
  return (
    <Container>
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
          gap: 2,
        }}
      >
        <Avatar
          src={chat.avatar}
          sx={{
            width: 100,
            height: 100,
            mb: 3,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {chat.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
          {chat.type}
        </Typography>

        {/* Participants */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Participants
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            {chat.participants.map((participant) => (
              <Avatar key={participant._id} src={participant?.profilePicture} />
            ))}
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} justifyContent="center">
              {chat.participants.map((participant) => (
                <Typography key={participant._id} variant="body2">
                  {participant.username}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
