import React from 'react';
import { Navigate } from 'react-router-dom';
import { TOKEN } from '../utils/const';

interface PublicRouteProps {
  children: React.ReactNode;  
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem(TOKEN);

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
