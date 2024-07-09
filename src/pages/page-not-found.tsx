import { Helmet } from "react-helmet-async";
import PageNotFound from "../sections/auth/page-not-found";

export default function PageNotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <PageNotFound />
    </>
  );
}
