import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import CounselorDashboard from './components/CounselorDashboard';
import AdminDashboard from './components/AdminDashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  avatar?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<Login onLogin={handleLogin} />} />
        <Route path="/register/:role" element={<Register onRegister={handleLogin} />} />
        
        <Route
          path="/student/*"
          element={
            user && user.role === 'student' ? (
              <StudentDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />
        
        <Route
          path="/counselor/*"
          element={
            user && user.role === 'counselor' ? (
              <CounselorDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/counselor" replace />
            )
          }
        />
        
        <Route
          path="/admin/*"
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/admin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
