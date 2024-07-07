import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ThemeToggleButton from "../components/theme-toggle-button";
import { useTheme } from "../theme";
import { bgBlur } from "../theme/css";
import { HEADER, SIDEBAR } from "./config-layout";
import { useResponsive } from "../hooks/use-responsive";
import { ChatTwoTone } from "@mui/icons-material";
import AcountPopover from "./common/account-popover";

function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { theme } = useTheme();
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),

          ...(bgBlur({
            color: theme.palette.background.neutral,
          }) as any),
          ...(mdUp
            ? {
                width: `calc(100% - ${SIDEBAR.WIDTH + 1}px)`,
              }
            : {}),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ display: { md: "none" } }}
            >
              <ChatTwoTone />
            </IconButton>

            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: theme.palette.text.primary }}
            >
              Live Chat
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <ThemeToggleButton />
            <AcountPopover />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
