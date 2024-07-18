import { useEffect, useState } from "react";
import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setActiveChat, addChat } from "../../store/chat-slice";
import Searchbar from "../../components/searchbar";
import UserItem from "../../components/user-item";
import { IUser } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayout } from "..";
import { getUsersRequest } from "../../lib/api/user";
import { setUsers } from "../../store/user-slice";
import { requestCreateChat } from "../../lib/api/chat";

export default function UserSearchbar() {
  const [query, setQuery] = useState("");
  const users = useSelector((state: RootState) => state.user.allUsers);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { hideSidebar: onCloseSidebar } = useLayout();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      getUsersRequest(query)
        .then((response) => {
          dispatch(setUsers(response));
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, location.pathname, user]);

  const handleUserClick = (user: IUser) => {
    requestCreateChat([user.username])
      .then((data) => {
        console.log("Chat created:", data);
        dispatch(setActiveChat(data.id));
        dispatch(addChat(data));
        onCloseSidebar();
        navigate(`/chat/${data._id}`);
      })
      .catch((error) => {
        console.error("Error creating chat:", error);
      });
  };

  const renderUserList = (
    <Stack
      spacing={0.5}
      sx={{
        px: 2,
      }}
    >
      {users.map((user, index) => (
        <UserItem key={index} user={user} onClick={handleUserClick} />
      ))}
    </Stack>
  );

  return (
    <Box sx={{ p: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
        }}
      >
        <Searchbar query={query} setQuery={setQuery} />
        <Typography
          variant="body2"
          noWrap
          sx={{
            ml: 2,
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          Users
        </Typography>
      </Toolbar>
      {renderUserList}
    </Box>
  );
}
