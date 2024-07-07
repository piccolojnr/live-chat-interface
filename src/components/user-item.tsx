import {
  alpha,
  Avatar,
  Box,
  Button,
  ListItemButton,
  Typography,
} from "@mui/material";
import { IUser } from "../types";

function UserItem({
  user,
  onClick,
}: {
  user: IUser;
  onClick?: (user: IUser) => void;
}) {
  return (
    <ListItemButton
      component={Button}
      onClick={() => onClick && onClick(user)}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        width: "100%",
        bgcolor: (theme) => alpha(theme.palette.grey[200], 0.12),
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.24),
        },
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <Avatar
          sx={{
            width: 20,
            height: 20,
            mr: 2,
          }}
          src={user.profilePicture}
          alt="photoUrl"
        />
      </Box>
      <Box component="span">
        <Typography
          variant="subtitle2"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {user.username}
        </Typography>
      </Box>
    </ListItemButton>
  );
}

export default UserItem;
