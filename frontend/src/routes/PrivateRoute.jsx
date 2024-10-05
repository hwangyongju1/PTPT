import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';
import LoginPage from '../pages/member/LoginPage';

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
