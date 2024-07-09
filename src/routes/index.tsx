import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import ProtectedRoute from "./protected-route";

export const MainPage = lazy(() => import("../pages/index"));
export const ChatPage = lazy(() => import("../pages/chat"));
export const ProfilePage = lazy(() => import("../pages/profile"));
export const OverviewPage = lazy(() => import("../pages/overview"));
export const LoginPage = lazy(() => import("../pages/login"));
export const SignupPage = lazy(() => import("../pages/signup"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const PageNotAuthorized = lazy(
  () => import("../pages/page-not-authorized")
);

export default function Routes() {
  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <Layout>
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </Layout>
        </Suspense>
      ),
      children: [
        {
          element: <MainPage />,
          index: true,
        },
        {
          element: <MainPage />,
          path: "chat",
        },
        {
          element: <ChatPage />,
          path: "chat/:id",
        },
        {
          element: <OverviewPage />,
          path: "chat/:id/overview",
        },
        {
          element: <ProfilePage />,
          path: "profile",
        },
      ],
    },
    {
      element: <LoginPage />,
      path: "login",
    },
    {
      element: <SignupPage />,
      path: "signup",
    },
    {
      element: <Page404 />,
      path: "*",
    },
    {
      element: <PageNotAuthorized />,
      path: "not-authorized",
    },
  ]);
  return routes;
}
