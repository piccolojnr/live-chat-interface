import { Box } from "@mui/material";
import { IUser } from "../../types";
import ChatMessageList from "./chat-message-list";
import ChatInput from "./chat-input";
import ChatHeader from "../../components/chat-header";

export default function PrivateChat({ user }: { user: IUser }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <ChatHeader user={user} />
      <ChatMessageList />
      <ChatInput user={user} />
    </Box>
  );
}
