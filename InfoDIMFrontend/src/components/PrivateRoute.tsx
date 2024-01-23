import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  return !isAuthenticated ? 
    <Navigate to='/connexion' replace state={{ from: location }} /> :
    <Outlet />;
};

export default PrivateRoute;