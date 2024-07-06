import { Helmet } from "react-helmet-async";

export default function PageNotAuthorized() {
  return (
    <>
      <Helmet>
        <title>Not Authorized</title>
      </Helmet>
      <h1>Not Authorized</h1>
    </>
  );
}
