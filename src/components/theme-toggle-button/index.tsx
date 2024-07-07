import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../../theme";

const ThemeToggleButton: React.FC = () => {
  const { toggleColorMode, mode } = useTheme();

  return (
    <IconButton onClick={toggleColorMode} color="primary">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
