import React, { useContext, useState } from "react";
import { Route, Redirect, Routes, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import Todo from "../pages/Todo";

const PrivateRoute = ({ ...children }) => {
  const { authTokens } = useContext(AuthContext);
  const authed = false;

  return authTokens ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
