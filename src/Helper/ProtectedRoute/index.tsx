import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { checkToken } from "../../services/checkToken";


const ProtectedRoute = (props: RouteProps) => {
  const token = checkToken();

  if (token) {
    return <Route {...props} />;
  } else if (!token) {
    return <Redirect to="/" />;
  } else {
    return null;
  }
};

export default ProtectedRoute;
