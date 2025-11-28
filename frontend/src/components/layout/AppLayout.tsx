import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ReactNode, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/api';

type NavItem = {
  to: string;
  label: string;
  icon?: ReactNode;
  roles?: Role[];
};

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/resources', label: 'Resources' },
  { to: '/goals', label: 'Goals', roles: ['student'] },
  { to: '/students', label: 'My Students', roles: ['counselor'] },
  { to: '/admin/users', label: 'Manage Users', roles: ['admin'] },
  { to: '/admin/stats', label: 'Platform Insights', roles: ['admin'] },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const filteredNav = useMemo(
    () => navItems.filter((item) => !item.roles || (user && item.roles.includes(user.role))),
    [user],
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__logo">Career Compass</span>
          <p className="sidebar__tagline">Guiding every learner</p>
        </div>
        <nav className="sidebar__nav">
          {filteredNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="sidebar__footer">
            <p className="sidebar__user">
              {user.firstName} {user.lastName}
              <span>{user.role.toUpperCase()}</span>
            </p>
            <button type="button" className="btn btn--ghost" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;


