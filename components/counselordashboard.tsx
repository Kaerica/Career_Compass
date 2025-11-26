import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { User as UserType } from '../apps.tsx';
import { ThemeToggle } from './ThemeToggle';

interface CounselorDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function CounselorDashboard({ user, onLogout }: CounselorDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/counselor', label: 'Dashboard', icon: Home },
    { path: '/counselor/students', label: 'My Students', icon: Users },
    { path: '/counselor/sessions', label: 'Sessions', icon: Calendar },
    { path: '/counselor/resources', label: 'Resources', icon: BookOpen },
    { path: '/counselor/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/counselor/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && <span className="text-xl">Career Campus</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Search students, sessions..." className="pl-10" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/students" element={<Students />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ user }: { user: UserType }) {
  const todaySessions = [
    { id: 1, student: 'Alex Johnson', topic: 'Career Path Discussion', time: '2:00 PM', duration: '60 min', status: 'upcoming' },
    { id: 2, student: 'Emma Williams', topic: 'Resume Review', time: '4:00 PM', duration: '45 min', status: 'upcoming' },
  ];

  const recentActivity = [
    { id: 1, student: 'Michael Brown', action: 'Completed session', time: '2 hours ago' },
    { id: 2, student: 'Sarah Davis', action: 'Booked new session', time: '4 hours ago' },
    { id: 3, student: 'James Wilson', action: 'Submitted feedback', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600">Here's your mentorship overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Active Students</span>
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl">24</div>
            <p className="text-sm text-gray-500">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Sessions Today</span>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl">5</div>
            <p className="text-sm text-gray-500">2 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Hours</span>
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl">156</div>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Avg Rating</span>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl">4.9</div>
            <p className="text-sm text-gray-500">Based on 48 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
            <CardDescription>Your scheduled meetings for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySessions.map((session) => (
              <div key={session.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar>
                  <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1">{session.student}</div>
                  <p className="text-sm text-gray-600">{session.topic}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {session.time} • {session.duration}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full">
              View All Sessions
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{activity.student.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1">{activity.student}</div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              Schedule Session
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              Message Student
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <FileText className="w-6 h-6" />
              Share Resource
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Students() {
  const students = [
    { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', sessions: 8, lastSession: '2024-11-20', progress: 75, status: 'active' },
    { id: 2, name: 'Emma Williams', email: 'emma.w@example.com', sessions: 12, lastSession: '2024-11-22', progress: 85, status: 'active' },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', sessions: 5, lastSession: '2024-11-19', progress: 60, status: 'active' },
    { id: 4, name: 'Sarah Davis', email: 'sarah.d@example.com', sessions: 15, lastSession: '2024-11-23', progress: 90, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">My Students</h1>
          <p className="text-gray-600">Manage and track your mentees</p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-lg mb-1">{student.name}</div>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Total Sessions</span>
                      <div>{student.sessions}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Last Session</span>
                      <div>{student.lastSession}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Progress</span>
                      <div className="flex items-center gap-2">
                        <span>{student.progress}%</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">View Profile</Button>
                    <Button size="sm" variant="outline">Schedule Session</Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Sessions() {
  const sessions = [
    { id: 1, student: 'Alex Johnson', topic: 'Career Path Discussion', date: '2024-11-25', time: '2:00 PM', status: 'upcoming', type: 'Video Call' },
    { id: 2, student: 'Emma Williams', topic: 'Resume Review', date: '2024-11-26', time: '10:00 AM', status: 'upcoming', type: 'In-Person' },
    { id: 3, student: 'Michael Brown', topic: 'Interview Preparation', date: '2024-11-20', time: '3:00 PM', status: 'completed', type: 'Video Call' },
    { id: 4, student: 'Sarah Davis', topic: 'Skill Assessment', date: '2024-11-18', time: '11:00 AM', status: 'completed', type: 'Video Call' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Sessions</h1>
          <p className="text-gray-600">Manage your counseling sessions</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Set Availability
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {sessions.filter(s => s.status === 'upcoming').map((session) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg mb-1">{session.topic}</div>
                        <p className="text-sm text-gray-600">with {session.student}</p>
                      </div>
                      <Badge>{session.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Start Session
                      </Button>
                      <Button size="sm" variant="outline">View Student Profile</Button>
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {sessions.filter(s => s.status === 'completed').map((session) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{session.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg mb-1">{session.topic}</div>
                        <p className="text-sm text-gray-600">with {session.student}</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Notes
                      </Button>
                      <Button size="sm" variant="outline">Add Feedback</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Resources() {
  const resources = [
    { id: 1, title: 'Career Development Framework', type: 'Template', category: 'Templates', shares: 24 },
    { id: 2, title: 'Interview Question Bank', type: 'Document', category: 'Career Prep', shares: 45 },
    { id: 3, title: 'Resume Templates Collection', type: 'Template', category: 'Career Prep', shares: 67 },
    { id: 4, title: 'Goal Setting Worksheet', type: 'Worksheet', category: 'Development', shares: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Resources</h1>
          <p className="text-gray-600">Manage and share materials with students</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{resource.type}</Badge>
                <BookOpen className="w-5 h-5 text-gray-400" />
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <CardDescription>{resource.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                Shared with {resource.shares} students
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Share</Button>
                <Button size="sm" variant="outline" className="flex-1">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Analytics</h1>
        <p className="text-gray-600">Track your impact and engagement metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Total Students</div>
            <div className="text-3xl mb-2">24</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Sessions This Month</div>
            <div className="text-3xl mb-2">48</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +8% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Average Rating</div>
            <div className="text-3xl mb-2">4.9</div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              Based on 48 reviews
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
            <div className="text-3xl mb-2">96%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              Excellent
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Success Stories</CardTitle>
          <CardDescription>Recent achievements from your mentees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-3 mb-2">
              <Avatar>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <div className="mb-1">Alex Johnson</div>
                <p className="text-sm text-gray-600">Secured internship at top tech company</p>
                <p className="text-sm text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-3 mb-2">
              <Avatar>
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div>
                <div className="mb-1">Emma Williams</div>
                <p className="text-sm text-gray-600">Completed advanced certification program</p>
                <p className="text-sm text-gray-400 mt-1">5 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Profile({ user }: { user: UserType }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your counselor profile and settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Button size="sm">Change Photo</Button>
              <p className="text-sm text-gray-600 mt-2">Professional headshot recommended</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Full Name</label>
              <Input defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Email</label>
              <Input defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Specialization</label>
              <Input placeholder="e.g., Career Development, Tech Careers" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Years of Experience</label>
              <Input placeholder="e.g., 10" type="number" />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expertise Areas</CardTitle>
          <CardDescription>Highlight your areas of specialization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['Career Coaching', 'Resume Review', 'Interview Prep', 'Tech Careers', 'Leadership Development'].map((area) => (
              <Badge key={area} variant="secondary" className="px-3 py-1.5">
                {area}
              </Badge>
            ))}
            <Button variant="outline" size="sm">+ Add Expertise</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>Set your counseling hours</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Manage Schedule</Button>
        </CardContent>
      </Card>
    </div>
  );
}