import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { RootState } from "../store";
import { getUserRequest } from "../lib/api/user";
import Loading from "../components/loading";
import PrivateChat from "../sections/chat";
import { setActiveUser, setMessages } from "../store/user-slice";
import { requestGetMessages } from "../lib/api/message";

export default function PrivateChatPage() {
  const params = useParams();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.activeUser);
  const account = useSelector((state: RootState) => state.user.userInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getUserRequest(params.id)
        .then((response) => {
          dispatch(setActiveUser(response));
          if (params.id && socket && account) {
            requestGetMessages(params.id)
              .then((response) => {
                dispatch(setMessages(response));
              })
              .catch((error) => {
                console.error("Error fetching messages:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, socket]);

  return (
    <>
      <Helmet>
        <title>
          {user ? `${user.username} | LIVECHAT` : `Private Chat | LIVECHAT`} |
        </title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : user &&
        Object.keys(user).length > 0 &&
        user.constructor === Object ? (
        <PrivateChat user={user} />
      ) : (
        <h1>No user found </h1>
      )}
    </>
  );
}
