import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Shield, ArrowRight, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ThemeToggle } from './ThemeToggle';

export default function LandingPage() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Students',
      description: 'Discover career opportunities, connect with experienced mentors, and accelerate your professional growth.',
      icon: GraduationCap,
      features: ['Career Path Discovery', 'Expert Mentorship', 'Progress Analytics', 'Curated Resources'],
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'counselor',
      title: 'Counselors',
      description: 'Shape careers through strategic guidance, share industry insights, and drive meaningful professional impact.',
      icon: Users,
      features: ['Session Management', 'Client Insights', 'Resource Sharing', 'Performance Metrics'],
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'admin',
      title: 'Administrators',
      description: 'Orchestrate platform excellence, manage stakeholders, and optimize the mentorship ecosystem.',
      icon: Shield,
      features: ['User Administration', 'Counselor Verification', 'Platform Analytics', 'Content Management'],
      gradient: 'from-purple-600 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 dark:from-background dark:via-background dark:to-background">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">Career Campus</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate('/login/student')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl mb-6">
            Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Professional Excellence</span> Starts Here
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with industry-leading counselors, navigate career transitions, and access strategic guidance to unlock your full professional potential.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/register/student')} className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login/counselor')}>
              I'm a Counselor
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">10K+</div>
            <div className="text-muted-foreground">Professionals Guided</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">500+</div>
            <div className="text-muted-foreground">Expert Counselors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">95%</div>
            <div className="text-muted-foreground">Career Success Rate</div>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-xl transition-all hover:-translate-y-1 border-purple-100 dark:border-purple-900/30">
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-br ${role.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => navigate(`/login/${role.id}`)}
                >
                  Enter as {role.title.slice(0, -1)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl mb-2">Comprehensive Resources</h3>
            <p className="text-muted-foreground">Access industry-leading content, frameworks, and tools to accelerate professional development.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl mb-2">Strategic Guidance</h3>
            <p className="text-muted-foreground">Receive personalized mentorship aligned with your career objectives and growth trajectory.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl mb-2">Data-Driven Progress</h3>
            <p className="text-muted-foreground">Track development milestones with advanced analytics and actionable insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Career Campus. Empowering professional excellence through expert guidance.</p>
        </div>
      </footer>
    </div>
  );
}