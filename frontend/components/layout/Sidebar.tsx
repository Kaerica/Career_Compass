'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Calendar,
  Users,
  Shield,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Overview',
    href: '/dashboard/student?tab=overview',
    icon: TrendingUp,
    roles: ['student'],
  },
  {
    title: 'Assessment',
    href: '/dashboard/student/assessment',
    icon: Target,
    roles: ['student'],
  },
  {
    title: 'Select Careers',
    href: '/dashboard/student/careers',
    icon: Target,
    roles: ['student'],
  },
  {
    title: 'Recommendations',
    href: '/dashboard/student?tab=recommendations',
    icon: Target,
    roles: ['student'],
  },
  {
    title: 'Goals',
    href: '/dashboard/student?tab=goals',
    icon: Target,
    roles: ['student'],
  },
  {
    title: 'Sessions',
    href: '/dashboard/student?tab=sessions',
    icon: Calendar,
    roles: ['student'],
  },
  {
    title: 'Resources',
    href: '/dashboard/student/resources',
    icon: BookOpen,
    roles: ['student'],
  },
  {
    title: 'Sessions',
    href: '/dashboard/counselor?tab=sessions',
    icon: Calendar,
    roles: ['counselor'],
  },
  {
    title: 'Students',
    href: '/dashboard/counselor?tab=students',
    icon: Users,
    roles: ['counselor'],
  },
  {
    title: 'Resources',
    href: '/dashboard/counselor/resources',
    icon: BookOpen,
    roles: ['counselor'],
  },
  {
    title: 'Users',
    href: '/dashboard/admin?tab=users',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Counselors',
    href: '/dashboard/admin?tab=counselors',
    icon: Shield,
    roles: ['admin'],
  },
  {
    title: 'Statistics',
    href: '/dashboard/admin?tab=stats',
    icon: TrendingUp,
    roles: ['admin'],
  },
  {
    title: 'Resources',
    href: '/dashboard/admin/resources',
    icon: FileText,
    roles: ['admin'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'student':
        return '/dashboard/student';
      case 'counselor':
        return '/dashboard/counselor';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard';
    }
  };

  const filteredItems = sidebarItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <div className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <Link href={getDashboardPath(user?.role || 'student')}>
          <h2 className="text-xl font-bold text-sidebar-foreground">Career Compass</h2>
        </Link>
        {user && (
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            {user.firstName} {user.lastName}
          </p>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href + item.title}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1',
                'active:scale-95',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

