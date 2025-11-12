import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth.context';
import { UserRole } from '../auth.types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(user.role as UserRole);
    
    if (!hasRequiredRole) {
      // Redirect to appropriate page based on user's role
      switch (user.role) {
        case 'ADMIN':
          return <Navigate to="/admin" replace />;
        case 'STORE':
        case 'FACTORY_STAFF':
          return <Navigate to="/menu" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
