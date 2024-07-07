import { Helmet } from "react-helmet-async";
import UserProfile from "../sections/user-profile";

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <UserProfile />
    </>
  );
}
