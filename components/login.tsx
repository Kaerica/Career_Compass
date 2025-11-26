import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { GraduationCap, User, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { User as UserType } from '../apps.tsx';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roleConfig = {
    student: { title: 'Student', path: '/student', icon: GraduationCap, color: 'from-blue-600 to-blue-700' },
    counselor: { title: 'Counselor', path: '/counselor', icon: User, color: 'from-green-600 to-green-700' },
    admin: { title: 'Admin', path: '/admin', icon: Lock, color: 'from-purple-600 to-purple-700' },
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.student;
  const Icon = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in production, this would call an API
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'student' ? 'Alex Johnson' : role === 'counselor' ? 'Dr. Sarah Miller' : 'Admin User',
      email,
      role: role as 'student' | 'counselor' | 'admin',
    };

    onLogin(mockUser);
    navigate(config.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your {config.title} account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to={`/register/${role}`} className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:underline">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
