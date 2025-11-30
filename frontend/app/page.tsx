import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Shield, BookOpen, Target, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-cyan-950/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-cyan-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
            Career Compass
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 max-w-2xl mx-auto font-medium">
            Your online career guidance platform that helps you discover career paths, 
            connect with qualified counselors, and access personalized resources.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Why Choose Career Compass?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center mb-4 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-blue-700 dark:text-blue-300">For Students</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Complete assessments, get career recommendations, book sessions with counselors, 
                and track your goals.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all hover:shadow-xl bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/30 dark:to-cyan-950/30">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-sky-700 dark:text-sky-300">For Counselors</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Manage sessions, view student profiles, offer guidance, and share resources 
                with your students.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all hover:shadow-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
            <CardHeader>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-cyan-700 dark:text-cyan-300">For Admins</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Oversee the platform, verify counselors, manage users, and maintain 
                platform quality.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-blue-100/50 via-sky-100/50 to-cyan-100/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-cyan-950/20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center mb-3 shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-blue-700 dark:text-blue-300">Career Assessments</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Complete personalized assessments to discover your ideal career path
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center mb-3 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-sky-700 dark:text-sky-300">Book Sessions</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Schedule one-on-one sessions with verified career counselors
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-cyan-700 dark:text-cyan-300">Learning Resources</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Access articles, videos, courses, and tools to advance your career
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
