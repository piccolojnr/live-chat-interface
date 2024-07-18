import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { SocketProvider } from "../context/SocketContext";
import { LayoutProvider } from "../layouts";
import PrivateChatPage from "../pages/private-chat";

export const MainPage = lazy(() => import("../pages/index"));
export const PivateChatPage = lazy(() => import("../pages/private-chat"));
export const ProfilePage = lazy(() => import("../pages/profile"));
export const PrivateChatProfilePage = lazy(
  () => import("../pages/private-chat-profile")
);
export const SettingsPage = lazy(() => import("../pages/settings"));
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
          <SocketProvider>
            <LayoutProvider>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </LayoutProvider>
          </SocketProvider>
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
          element: <PrivateChatPage />,
          path: "private-chat/:id",
        },
        {
          element: <PrivateChatProfilePage />,
          path: "private-chat/:id/profile",
        },
        {
          element: <ProfilePage />,
          path: "profile",
        },
        {
          element: <SettingsPage />,
          path: "settings",
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
