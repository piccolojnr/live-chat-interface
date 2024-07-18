import { Box } from "@mui/material";
import { useResponsive } from "../hooks/use-responsive";
import { SIDEBAR } from "./config-layout";

export default function Main({ children }: { children: React.ReactNode }) {
  const mdUp = useResponsive("up", "md");
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        // py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(mdUp && {
          px: 2,
          // py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${SIDEBAR.WIDTH}px)`,
        }),
      }}
    >
      {children}
    </Box>
  );
}
