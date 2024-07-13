import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProfileSetup from "../sections/auth/profile-setup";

export default function CompleteProfilePage() {
  const user = useSelector((state: RootState) => state.user.userInfo);
  return (
    <>
      <Helmet>
        <title>Complete Profile | LIVECHAT</title>
      </Helmet>
      <ProfileSetup user={user} />
    </>
  );
}
