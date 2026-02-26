import { Navigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { hasModuleAccess, isAdmin } from '@/utils/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  moduleId?: string;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  moduleId,
}: ProtectedRouteProps) {
  const { session, isAuthenticated } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated || !session) {
    return <Navigate to="/login" replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin(session.allowedModules)) {
    return <Navigate to="/403" replace />;
  }

  // Check module access if moduleId is provided
  if (moduleId) {
    const hasAccess = hasModuleAccess(session.allowedModules, moduleId);
    if (!hasAccess) {
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
}

// Wrapper for /module/:id routes
export function ModuleProtectedRoute({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const { session, isAuthenticated } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated || !session) {
    return <Navigate to="/login" replace />;
  }

  // Check module access
  if (id) {
    const hasAccess = hasModuleAccess(session.allowedModules, id);
    if (!hasAccess) {
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
}
