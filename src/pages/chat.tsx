import { Helmet } from "react-helmet-async";
import ChatRoom from "../sections/chat-room";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveChat } from "../store/chat-slice";

export default function ChatPage() {
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (param && param.id) {
      dispatch(setActiveChat(param.id));
    }
  }, [param]);

  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <ChatRoom />
    </>
  );
}
