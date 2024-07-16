import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { alpha, Box, Typography } from "@mui/material";
import { primary } from "../theme/palette";

const transformLargeNumber = (num: number) => {
  if (num < 1000) return num;
  if (num < 1000000) return `${Math.floor(num / 1000)}k`;
  return `${Math.floor(num / 1000000)}m`;
};

const OnlineUsersCount: React.FC = () => {
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState("0");

  useEffect(() => {
    if (!socket) return;

    socket.on("online-update", (updatedCount) => {
      setOnlineUsers(updatedCount);
    });

    return () => {
      socket.off("online-update");
    };
  }, [socket]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: alpha(primary.main, 0.3),
        color: "white",
        borderRadius: "50%",
        padding: "5px",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          // dynamic font size based on the number of online users
          fontSize: onlineUsers.length > 3 ? "0.7rem" : "0.8rem",
        }}
      >
        {transformLargeNumber(parseInt(onlineUsers))}
      </Typography>
    </Box>
  );
};

export default OnlineUsersCount;
