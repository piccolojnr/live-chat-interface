import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Iconify from "../../components/iconify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user-slice";

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    path: "#",
  },
];

export default function AcountPopover() {
  const [open, setOpen] = useState(null);
  const account = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleOpen = (e: any) => {
    setOpen(e.currentTarget);
  };

  const handleClose = (e: any, path: string) => {
    if (path !== "#" && MENU_OPTIONS.find((option) => option.path === path)) {
      navigate(path);
    }
    setOpen(null);
  };

  const handleLogout = async () => {
    dispatch(logout()).catch((err) => console.error(err));
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon="eva:person-fill" />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={(e) => handleClose(e, option.path)}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={async () => await handleLogout()}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
