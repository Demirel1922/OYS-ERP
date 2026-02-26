import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Admin } from '@/pages/Admin';
import { ModulePlaceholder } from '@/pages/ModulePlaceholder';
import { NotAuthorized403 } from '@/pages/NotAuthorized403';
import { NotFound404 } from '@/pages/NotFound404';
import { ProtectedRoute, ModuleProtectedRoute } from '@/components/common/ProtectedRoute';

// Auth check wrapper
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth, location.pathname]);

  return <>{children}</>;
}

// Public route - redirect to dashboard if authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Module Routes */}
      <Route
        path="/module/:id"
        element={
          <ModuleProtectedRoute>
            <ModulePlaceholder />
          </ModuleProtectedRoute>
        }
      />

      {/* Error Pages */}
      <Route
        path="/403"
        element={
          <ProtectedRoute>
            <NotAuthorized403 />
          </ProtectedRoute>
        }
      />

      <Route path="/404" element={<NotFound404 />} />

      {/* Redirect root to login or dashboard */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Catch all - 404 */}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <AppRoutes />
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
