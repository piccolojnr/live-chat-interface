import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { userRequest } from "../lib/api/user";
import { login } from "../store/user-slice";

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
    userRequest()
      .then((response) => {
        dispatch(login(response));
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        navigate("/login");
      });
  }, [isAuthenticated, dispatch, navigate]);

  // Optionally add a loading state
  if (!isAuthenticated && !userInfo) {
    return <Loading />;
  }

  return <>{children}</>;
}
