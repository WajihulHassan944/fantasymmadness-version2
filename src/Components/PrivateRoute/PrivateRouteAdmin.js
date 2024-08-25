// src/Components/AdminPrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = ({ element, ...rest }) => {
  const { isAdminAuthenticated } = useSelector((state) => state.adminAuth);
  
  console.log("AdminPrivateRoute - isAdminAuthenticated condition:", isAdminAuthenticated); // Debug log

  return isAdminAuthenticated ? element : <Navigate to="/administration/login" />;
};

export default AdminPrivateRoute;
