import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchUser } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUser())
        .then((response) => {
          if (fetchUser.rejected.match(response)) {
            localStorage.removeItem("token"); // Clear token from local storage
            navigate("/login"); // Redirect to login page if authentication fails
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Optionally add a loading state
  if (!isAuthenticated && !userInfo) {
    return <Loading />; // Or a spinner component
  }

  return <>{children}</>;
}
