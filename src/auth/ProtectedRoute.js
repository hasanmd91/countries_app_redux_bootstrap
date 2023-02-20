import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
    // Navigate is a part of react router dom it can be used to navigate to the different pages in the application
    // the replace props is used to prevent the user to go to protected page using browser back button after they have been redirect the login page
  }

  return <Outlet />;
};

export default ProtectedRoute;
