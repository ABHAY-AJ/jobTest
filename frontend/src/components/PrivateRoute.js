// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { token } = useSelector((state) => state.user); // Access token
  const location = useLocation();

  // If the user is not authenticated, redirect to login and preserve the attempted URL in state
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the component if authenticated
  return <Component />;
};

export default PrivateRoute;
