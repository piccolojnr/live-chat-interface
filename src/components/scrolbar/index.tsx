import { Box } from "@mui/material";
import React, { forwardRef } from "react";
import { useTheme } from "../../theme";

interface ScrollbarProps {
  children: React.ReactNode;
  sx?: object;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ children, sx }, ref) => {
    const { mode } = useTheme();
    return (
      <Box
        ref={ref}
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "background.paper",
          },
          ...sx,
        }}
      >
        {children}
        <Box sx={{ height: 50 }} />
      </Box>
    );
  }
);

export default Scrollbar;
