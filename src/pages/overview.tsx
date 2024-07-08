import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Helmet } from "react-helmet-async";
import { getChatName } from "../utils/functions";
import ChatOverview from "../sections/user-profile/chat-overvew";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setActiveChat } from "../store/chat-slice";

export default function OverviewPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const activeChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat.id === state.chat.activeChatId)
  );

  useEffect(() => {
    if (params.id) {
      dispatch(setActiveChat(params.id));
    }
  }, [params.id, dispatch]);

  return (
    <>
      <Helmet>
        <title>Overview | {getChatName(activeChat, currentUser)}</title>
      </Helmet>
      {activeChat ? (
        <ChatOverview chat={activeChat} />
      ) : (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
    </>
  );
}
