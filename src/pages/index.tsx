import { Helmet } from "react-helmet-async";
import EmptyChat from "../sections/chat/empty-chat";

export default function MainPage() {
  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <EmptyChat />
    </>
  );
}
