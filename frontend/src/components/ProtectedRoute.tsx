import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '../types/api';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from './LoadingScreen';

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: Role[];
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;


