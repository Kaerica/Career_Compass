import { useAuth } from '../../hooks/useAuth';
import StudentDashboard from './StudentDashboard';
import CounselorDashboard from './CounselorDashboard';
import AdminDashboard from './AdminDashboard';

const RoleDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return null;
  }
};

export default RoleDashboard;


