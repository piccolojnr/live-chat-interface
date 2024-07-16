import { Box } from "@mui/material";
import Main from "./main";
import Sidebar from "./Sidebar";
import { createContext, useContext, useState } from "react";

interface LayoutContextProps {
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
  openSidebar: boolean;
}

const LayoutContext = createContext<LayoutContextProps>({
  onOpenSidebar: () => {},
  onCloseSidebar: () => {},
  openSidebar: false,
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const onCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const onOpenSidebar = () => {
    setOpenSidebar(true);
  };
  return (
    <LayoutContext.Provider
      value={{ onCloseSidebar, openSidebar, onOpenSidebar }}
    >
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "row", lg: "row" },
        }}
      >
        <Sidebar openSidebar={openSidebar} onCloseSidebar={onCloseSidebar} />
        <Main>{children}</Main>
      </Box>
    </LayoutContext.Provider>
  );
};
