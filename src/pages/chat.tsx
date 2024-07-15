import { Helmet } from "react-helmet-async";
import ChatRoom from "../sections/chat-room";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getChatName } from "../utils/functions";
import { useParams } from "react-router-dom";
import { setActiveChat } from "../store/chat-slice";
import { useEffect } from "react";

export default function ChatPage() {
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
        <title>Chat - {getChatName(activeChat, currentUser)}</title>
      </Helmet>
      {activeChat ? (
        <ChatRoom activeChatId={activeChat._id} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
