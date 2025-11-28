import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RoleDashboard from './pages/dashboard/RoleDashboard';
import SessionsPage from './pages/SessionsPage';
import ResourcesPage from './pages/ResourcesPage';
import GoalsPage from './pages/GoalsPage';
import CounselorStudentsPage from './pages/CounselorStudentsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminStatsPage from './pages/AdminStatsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={(
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/register"
            element={(
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            )}
          >
            <Route index element={<RoleDashboard />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route
              path="goals"
              element={(
                <ProtectedRoute roles={['student']}>
                  <GoalsPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="students"
              element={(
                <ProtectedRoute roles={['counselor']}>
                  <CounselorStudentsPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="admin/users"
              element={(
                <ProtectedRoute roles={['admin']}>
                  <AdminUsersPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="admin/stats"
              element={(
                <ProtectedRoute roles={['admin']}>
                  <AdminStatsPage />
                </ProtectedRoute>
              )}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
