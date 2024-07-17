import { Helmet } from "react-helmet-async";
import Profile from "../sections/profile";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.userInfo);
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      {user ? <Profile user={user} /> : <div>loading...</div>}
    </>
  );
}
