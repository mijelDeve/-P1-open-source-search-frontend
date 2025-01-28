import React from 'react';
import { Navigate } from 'react-router-dom';
import { TOKEN } from '../utils/const';

interface PrivateRouteProps {
  children: React.ReactNode; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem(TOKEN); 

  if (!token) {
    return <Navigate to="/ingreso" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;