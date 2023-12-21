import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./authcontext"; // Your authentication context

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Use your authentication hook

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Redirect to="/login" />}
    />
  );
};

export default ProtectedRoute;
