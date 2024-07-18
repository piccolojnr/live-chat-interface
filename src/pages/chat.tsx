import { Helmet } from "react-helmet-async";
import ChatRoom from "../sections/chat-room";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { base64ToAscii, getChatName } from "../utils/functions";
import { useParams } from "react-router-dom";
import { addMessage, setActiveChat } from "../store/chat-slice";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export default function ChatPage() {
  const params = useParams();
  const { joinRoom, leaveRoom, socket } = useSocket(); // Assuming socket is accessible from useSocket
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const activeChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat._id === state.chat.activeChatId)
  );

  useEffect(() => {
    if (params.id) {
      dispatch(setActiveChat(params.id));
      //   joinRoom(params.id);

      //   // Attach message listener only once
      //   const handleMessage = (msg: string) => {
      //     const message = JSON.parse(base64ToAscii(msg));
      //     dispatch(addMessage(message));
      //   };

      //   if (socket) {
      //     socket.on("message", handleMessage);
      //   }
      // }
      // return () => {
      //   if (params.id) {
      //     leaveRoom(params.id);
      //     if (socket) {
      //       socket.off("message");
      //     }
      //   }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, dispatch, socket]);

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
