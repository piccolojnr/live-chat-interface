import { Box } from "@mui/material";
import Main from "./main";
import Sidebar from "./Sidebar";
import { createContext, useContext, useState } from "react";

interface LayoutContextProps {
  showSidebar: () => void;
  hideSidebar: () => void;
  openSidebar: boolean;
}

const LayoutContext = createContext<LayoutContextProps>({
  showSidebar: () => {},
  hideSidebar: () => {},
  openSidebar: false,
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const hideSidebar = () => {
    setOpenSidebar(false);
  };
  const showSidebar = () => {
    setOpenSidebar(true);
  };
  return (
    <LayoutContext.Provider
      value={{
        hideSidebar,
        openSidebar,
        showSidebar,
      }}
    >
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "row", lg: "row" },
        }}
      >
        <Sidebar openSidebar={openSidebar} onCloseSidebar={hideSidebar} />
        <Main>{children}</Main>
      </Box>
    </LayoutContext.Provider>
  );
};
