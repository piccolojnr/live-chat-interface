import { alpha, Avatar, IconButton } from "@mui/material";
import { useState } from "react";

export default function AcountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.common.white, 0.1),
          ...(false
            ? {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              }
            : {}),
        }}
      >
        <Avatar alt="User" src="/static/images/avatars/avatar_6.png" />
      </IconButton>
    </>
  );
}
