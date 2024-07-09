import { Helmet } from "react-helmet-async";
import PageNotAuthorized from "../sections/auth/page-not-authorized";

export default function PageNotAuthorizedPage() {
  return (
    <>
      <Helmet>
        <title>Not Authorized</title>
      </Helmet>
      <PageNotAuthorized />
    </>
  );
}
