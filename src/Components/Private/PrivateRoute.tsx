// src/components/PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
