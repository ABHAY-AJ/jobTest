// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { token, role } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === 'student' && window.location.pathname === '/dashboard') {
    return <Navigate to="/student-dashboard" />;
  }

  if (role === 'hr' && window.location.pathname === '/student-dashboard') {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default PrivateRoute;
