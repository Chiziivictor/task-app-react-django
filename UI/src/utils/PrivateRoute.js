import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ ...children }) => {
  const location = useLocation();
  const { authTokens } = useContext(AuthContext);
  const authed = false;

  return authTokens ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
    // <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
