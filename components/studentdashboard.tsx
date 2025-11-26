import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { User as UserType } from '../apps.tsx';
import { ThemeToggle } from './ThemeToggle';

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/student', label: 'Dashboard', icon: Home },
    { path: '/student/explore', label: 'Explore Careers', icon: Compass },
    { path: '/student/resources', label: 'Resources', icon: BookOpen },
    { path: '/student/sessions', label: 'My Sessions', icon: Calendar },
    { path: '/student/progress', label: 'Progress', icon: TrendingUp },
    { path: '/student/profile', label: 'Profile', icon: User },
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    ? 'bg-blue-50 text-blue-600' 
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
                <Input placeholder="Search careers, resources..." className="pl-10" />
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
            <Route path="/explore" element={<ExploreCareers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ user }: { user: UserType }) {
  const upcomingSessions = [
    { id: 1, counselor: 'Dr. Sarah Miller', topic: 'Career Path Discussion', date: 'Today, 2:00 PM', type: 'Video Call' },
    { id: 2, counselor: 'Prof. John Davis', topic: 'Resume Review', date: 'Tomorrow, 10:00 AM', type: 'In-Person' },
  ];

  const recommendedCareers = [
    { id: 1, title: 'Software Engineer', match: 92, salary: '$85K - $150K', growth: 'High' },
    { id: 2, title: 'Data Scientist', match: 88, salary: '$90K - $160K', growth: 'Very High' },
    { id: 3, title: 'UX Designer', match: 85, salary: '$70K - $130K', growth: 'High' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your career journey today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed Sessions</span>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl">12</div>
            <p className="text-sm text-gray-500">+2 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Hours Learned</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl">48</div>
            <p className="text-sm text-gray-500">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Goals Progress</span>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl">75%</div>
            <p className="text-sm text-gray-500">3 of 4 complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Career Match</span>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl">92%</div>
            <p className="text-sm text-gray-500">Excellent fit</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled mentorship sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar>
                  <AvatarFallback>{session.counselor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1">{session.counselor}</div>
                  <p className="text-sm text-gray-600">{session.topic}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{session.type}</Badge>
                    <span className="text-sm text-gray-500">{session.date}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
            ))}
            <Button variant="link" className="w-full">
              View All Sessions <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Careers */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Careers</CardTitle>
            <CardDescription>Based on your profile and interests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedCareers.map((career) => (
              <div key={career.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="mb-1">{career.title}</div>
                    <p className="text-sm text-gray-600">{career.salary}</p>
                  </div>
                  <Badge variant="secondary">{career.match}% Match</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Growth: {career.growth}</span>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full">
              Explore More Careers <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Current Learning Path</CardTitle>
          <CardDescription>Software Development Track - 75% Complete</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={75} className="h-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
              <div className="mb-1">Fundamentals</div>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
              <Clock className="w-6 h-6 text-blue-500 mb-2" />
              <div className="mb-1">Advanced Concepts</div>
              <p className="text-sm text-gray-600">In Progress - 60%</p>
            </div>
            <div className="p-4 border rounded-lg opacity-50">
              <Target className="w-6 h-6 text-gray-400 mb-2" />
              <div className="mb-1">Specialization</div>
              <p className="text-sm text-gray-600">Locked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExploreCareers() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Technology', 'Healthcare', 'Business', 'Engineering', 'Creative'];
  
  const careers = [
    { id: 1, title: 'Software Engineer', category: 'Technology', match: 92, demand: 'Very High', salary: '$85K - $150K', education: "Bachelor's", description: 'Design, develop, and maintain software applications.' },
    { id: 2, title: 'Data Scientist', category: 'Technology', match: 88, demand: 'Very High', salary: '$90K - $160K', education: "Master's", description: 'Analyze complex data to help companies make decisions.' },
    { id: 3, title: 'UX Designer', category: 'Creative', match: 85, demand: 'High', salary: '$70K - $130K', education: "Bachelor's", description: 'Create user-friendly digital experiences and interfaces.' },
    { id: 4, title: 'Product Manager', category: 'Business', match: 82, demand: 'High', salary: '$95K - $170K', education: "Bachelor's", description: 'Lead product development from concept to launch.' },
    { id: 5, title: 'Registered Nurse', category: 'Healthcare', match: 78, demand: 'Very High', salary: '$60K - $95K', education: "Bachelor's", description: 'Provide and coordinate patient care in healthcare settings.' },
    { id: 6, title: 'Marketing Manager', category: 'Business', match: 75, demand: 'High', salary: '$75K - $140K', education: "Bachelor's", description: 'Develop and execute marketing strategies for products.' },
  ];

  const filteredCareers = selectedCategory === 'all' 
    ? careers 
    : careers.filter(c => c.category.toLowerCase() === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Explore Career Paths</h1>
        <p className="text-gray-600">Discover careers that match your interests and skills</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.toLowerCase())}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map((career) => (
          <Card key={career.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{career.title}</CardTitle>
                  <CardDescription>{career.category}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700">{career.match}% Match</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{career.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Salary Range</span>
                  <div>{career.salary}</div>
                </div>
                <div>
                  <span className="text-gray-600">Demand</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    {career.demand}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Education</span>
                  <div>{career.education}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Learn More</Button>
                <Button variant="outline" className="flex-1">Book Session</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Resources() {
  const resources = [
    { id: 1, title: 'Resume Building Guide', type: 'PDF', category: 'Career Prep', duration: '15 min read', downloads: 234 },
    { id: 2, title: 'Interview Skills Masterclass', type: 'Video', category: 'Career Prep', duration: '45 min', downloads: 512 },
    { id: 3, title: 'Networking Strategies', type: 'Article', category: 'Professional Development', duration: '10 min read', downloads: 189 },
    { id: 4, title: 'Portfolio Creation Workshop', type: 'Video', category: 'Skills', duration: '60 min', downloads: 341 },
    { id: 5, title: 'Salary Negotiation Tips', type: 'PDF', category: 'Career Prep', duration: '12 min read', downloads: 456 },
    { id: 6, title: 'Personal Branding Course', type: 'Course', category: 'Professional Development', duration: '3 hours', downloads: 678 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Learning Resources</h1>
        <p className="text-gray-600">Access curated materials to support your career development</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="career-prep">Career Prep</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
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
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{resource.duration}</span>
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <Button className="w-full">Access Resource</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Sessions() {
  const sessions = [
    { id: 1, counselor: 'Dr. Sarah Miller', topic: 'Career Path Discussion', date: '2024-11-25', time: '2:00 PM', status: 'upcoming', type: 'Video Call' },
    { id: 2, counselor: 'Prof. John Davis', topic: 'Resume Review', date: '2024-11-26', time: '10:00 AM', status: 'upcoming', type: 'In-Person' },
    { id: 3, counselor: 'Dr. Emily Chen', topic: 'Interview Preparation', date: '2024-11-20', time: '3:00 PM', status: 'completed', type: 'Video Call' },
    { id: 4, counselor: 'Prof. Michael Brown', topic: 'Skill Assessment', date: '2024-11-18', time: '11:00 AM', status: 'completed', type: 'Video Call' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">My Sessions</h1>
          <p className="text-gray-600">Manage your mentorship sessions</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Book New Session
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
                    <AvatarFallback>{session.counselor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg mb-1">{session.topic}</div>
                        <p className="text-sm text-gray-600">with {session.counselor}</p>
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
                      <Button size="sm">Join Session</Button>
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="ghost">Cancel</Button>
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
                    <AvatarFallback>{session.counselor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg mb-1">{session.topic}</div>
                        <p className="text-sm text-gray-600">with {session.counselor}</p>
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
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Notes
                      </Button>
                      <Button size="sm" variant="outline">Book Again</Button>
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

function Profile({ user }: { user: UserType }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Button size="sm">Change Photo</Button>
              <p className="text-sm text-gray-600 mt-2">JPG, GIF or PNG. Max size of 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="City, State" />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Career Interests</CardTitle>
          <CardDescription>Help us provide better recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['Software Development', 'Data Science', 'UX Design', 'Product Management', 'Marketing'].map((interest) => (
              <Badge key={interest} variant="secondary" className="px-3 py-1.5">
                {interest}
              </Badge>
            ))}
            <Button variant="outline" size="sm">+ Add Interest</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Your career development objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Complete 10 mentorship sessions</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Build professional portfolio</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-gray-400" />
              <span>Secure internship position</span>
            </div>
          </div>
          <Button variant="outline">Manage Goals</Button>
        </CardContent>
      </Card>
    </div>
  );
}