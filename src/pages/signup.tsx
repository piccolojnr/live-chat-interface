import { Helmet } from "react-helmet-async";
import SignUp from "../sections/auth/signup";

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <SignUp />
    </>
  );
}
