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

export default function Sidebar({
  openSidebar,
  onCloseSidebar,
}: {
  openSidebar: boolean;
  onCloseSidebar: () => void;
}) {
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            fontSize: 10,
          }}
        >
          {account?.email}
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
