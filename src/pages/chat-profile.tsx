import { Helmet } from "react-helmet-async";
import ChatProfile from "../sections/chat-room/chat-profile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setActiveChat } from "../store/chat-slice";
import { getChatName } from "../utils/functions";

export default function ChatProfilePage() {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const activeChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat._id === state.chat.activeChatId)
  );

  useEffect(() => {
    if (params.id) {
      dispatch(setActiveChat(params.id));
    }
  }, [params.id, dispatch]);

  return (
    <>
      <Helmet>
        <title>{getChatName(activeChat, currentUser)} - Profile</title>
      </Helmet>
      {activeChat && <ChatProfile activeChatId={activeChat._id} />}
    </>
  );
}
