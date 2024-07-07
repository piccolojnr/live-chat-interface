import { Box } from "@mui/material";
import Header from "./header";
import Main from "./main";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const onCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const onOpenSidebar = () => {
    setOpenSidebar(true);
  };
  return (
    <>
      <Header onOpenSidebar={onOpenSidebar} />
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
    </>
  );
}
