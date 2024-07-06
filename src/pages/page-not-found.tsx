import { Helmet } from "react-helmet-async";

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <h1>Page not found</h1>
    </>
  );
}
