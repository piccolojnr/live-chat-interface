import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { getUserRequest } from "../lib/api/user";
import { setActiveUser } from "../store/user-slice";
import Loading from "../components/loading";
import UserProfile from "../sections/profile/user-profile";

export default function PrivateChatProfilePage() {
  const params = useParams();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.activeUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getUserRequest(params.id)
        .then((response) => {
          dispatch(setActiveUser(response));
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id, socket]);

  return (
    <>
      <Helmet>
        <title>
          {user ? `${user.username} | LIVECHAT` : `Private Chat | LIVECHAT`} |
        </title>
      </Helmet>
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
          <UserProfile user={user} />
        ) : (
          <h1> No user found </h1>
        )}
      </>
    </>
  );
}
