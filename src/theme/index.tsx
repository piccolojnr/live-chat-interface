import {
  FC,
  useMemo,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import getDesignTokens from "./palette";
import { typography } from "./typography";
import components from "./components";

interface ThemeContextProps {
  toggleColorMode: () => void;
  mode: "light" | "dark";
  theme: any;
}

const ThemeContext = createContext<ThemeContextProps>({
  toggleColorMode: () => {},
  mode: "light",
  theme: createTheme({}),
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<{ children: any }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const preferredMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setMode(preferredMode);
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: getDesignTokens(mode).palette,
        typography,
        components,
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode, theme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
