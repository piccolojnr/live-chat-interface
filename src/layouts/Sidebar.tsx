import {
  alpha,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useResponsive } from "../hooks/use-responsive";
import { SIDEBAR } from "./config-layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Scrollbar from "../components/scrolbar";
import SearchTabs from "./common/search-tabs";
import Iconify from "../components/iconify";
import AcountPopover from "./common/account-popover";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";
import OnlineUsersCount from "../components/online-users-count";

export default function Sidebar({
  openSidebar,
  onCloseSidebar,
}: {
  openSidebar: boolean;
  onCloseSidebar: () => void;
}) {
  const { isConnected } = useSocket();
  const mdUp = useResponsive("up", "md");
  const account = useSelector((state: RootState) => state.user.userInfo);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account?.profilePicture} alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account?.username}</Typography>
        {/* socket status */}
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            color: isConnected ? "success.main" : "error.main",
          }}
        >
          {isConnected ? "Online" : "Offline"}
          <Iconify
            icon={isConnected ? "bi:circle-fill" : "bi:circle-fill"}
            sx={{
              ml: 0.5,
              color: isConnected ? "success.main" : "error.main",
              width: "0.75rem",
              height: "0.75rem",
            }}
          />
        </Typography>
      </Box>
      <Box sx={{ ml: "auto" }} />
      <AcountPopover />
    </Box>
  );

  const drawerContent = (
    <Scrollbar
      sx={{
        bgcolor: "background.paper",
        height: "100%",
      }}
    >
      {renderAccount}
      <SearchTabs />
    </Scrollbar>
  );

  if (mdUp) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR.WIDTH,
          height: "100%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: SIDEBAR.WIDTH,
            height: "100%",

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
        height: "100%",
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR.WIDTH,
          height: "100%",
          boxSizing: "border-box",
          "& scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <IconButton
        onClick={onCloseSidebar}
        sx={{
          position: "absolute",
          top: 1,
          right: 1,
        }}
      >
        <Iconify icon="bi:arrow-left" />
      </IconButton>

      {drawerContent}
    </Drawer>
  );
}
