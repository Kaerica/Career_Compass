import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import type { User as UserType } from '../apps.tsx';
import { ThemeToggle } from './ThemeToggle';

interface AdminDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/counselors', label: 'Counselor Approval', icon: UserCheck },
    { path: '/admin/resources', label: 'Resources', icon: BookOpen },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && <span className="text-xl">Admin Panel</span>}
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
                    ? 'bg-purple-50 text-purple-600' 
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
                <Input placeholder="Search users, activities..." className="pl-10" />
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
            <Route path="/" element={<DashboardHome />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/counselors" element={<CounselorApproval />} />
            <Route path="/resources" element={<ResourceManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardHome() {
  const recentActivity = [
    { id: 1, type: 'user', message: 'New student registration', user: 'Alex Johnson', time: '5 min ago' },
    { id: 2, type: 'counselor', message: 'Counselor application submitted', user: 'Dr. Sarah Miller', time: '15 min ago' },
    { id: 3, type: 'session', message: 'Session completed', user: 'Emma Williams', time: '1 hour ago' },
    { id: 4, type: 'alert', message: 'System maintenance scheduled', user: 'System', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">Platform Overview</h1>
        <p className="text-gray-600">Monitor and manage Career Campus operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Users</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl">10,248</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4" />
              +12% this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Active Counselors</span>
              <UserCheck className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl">524</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4" />
              +8% this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Sessions Today</span>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl">342</div>
            <p className="text-sm text-gray-500">285 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pending Approvals</span>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl">8</div>
            <p className="text-sm text-gray-500">Requires action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === 'user' && <Users className="w-4 h-4" />}
                  {activity.type === 'counselor' && <UserCheck className="w-4 h-4" />}
                  {activity.type === 'session' && <Calendar className="w-4 h-4" />}
                  {activity.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="mb-1">{activity.message}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform status and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <div>API Services</div>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <div>Database</div>
                  <p className="text-sm text-gray-600">Performance optimal</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <div>Backup Services</div>
                  <p className="text-sm text-gray-600">Last backup 2 hours ago</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">Normal</Badge>
            </div>
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
              <UserCheck className="w-6 h-6" />
              Review Counselors
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              Upload Resource
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              Generate Report
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <Settings className="w-6 h-6" />
              System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserManagement() {
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Student', status: 'active', joinDate: '2024-01-15', sessions: 12 },
    { id: 2, name: 'Dr. Sarah Miller', email: 'sarah.m@example.com', role: 'Counselor', status: 'active', joinDate: '2024-02-20', sessions: 48 },
    { id: 3, name: 'Emma Williams', email: 'emma.w@example.com', role: 'Student', status: 'active', joinDate: '2024-03-10', sessions: 8 },
    { id: 4, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Student', status: 'inactive', joinDate: '2024-04-05', sessions: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">User Management</h1>
          <p className="text-gray-600">Manage all platform users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Add User</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.sessions}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CounselorApproval() {
  const [pendingCounselors, setPendingCounselors] = useState([
    { id: 1, name: 'Dr. Jessica Lee', email: 'jessica.l@example.com', specialization: 'Career Counseling', experience: 8, appliedDate: '2024-11-20' },
    { id: 2, name: 'Prof. Robert Chen', email: 'robert.c@example.com', specialization: 'Tech Careers', experience: 12, appliedDate: '2024-11-22' },
    { id: 3, name: 'Dr. Maria Garcia', email: 'maria.g@example.com', specialization: 'Healthcare Careers', experience: 10, appliedDate: '2024-11-23' },
  ]);

  const handleApprove = (id: number) => {
    setPendingCounselors(prev => prev.filter(c => c.id !== id));
  };

  const handleReject = (id: number) => {
    setPendingCounselors(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Counselor Approval</h1>
        <p className="text-gray-600">Review and approve counselor applications</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingCounselors.map((counselor) => (
          <Card key={counselor.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-lg mb-1">{counselor.name}</div>
                      <p className="text-sm text-gray-600">{counselor.email}</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 my-4">
                    <div>
                      <span className="text-sm text-gray-600">Specialization</span>
                      <div>{counselor.specialization}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Experience</span>
                      <div>{counselor.experience} years</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Applied Date</span>
                      <div>{counselor.appliedDate}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(counselor.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(counselor.id)}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingCounselors.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending counselor applications at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function ResourceManagement() {
  const resources = [
    { id: 1, title: 'Career Development Guide', type: 'PDF', category: 'Career Prep', uploadDate: '2024-11-15', downloads: 456, status: 'active' },
    { id: 2, title: 'Interview Skills Workshop', type: 'Video', category: 'Career Prep', uploadDate: '2024-11-10', downloads: 789, status: 'active' },
    { id: 3, title: 'Resume Templates', type: 'Template', category: 'Resources', uploadDate: '2024-11-05', downloads: 1234, status: 'active' },
    { id: 4, title: 'Networking Strategies', type: 'Article', category: 'Professional Development', uploadDate: '2024-10-28', downloads: 345, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Resource Management</h1>
          <p className="text-gray-600">Manage platform learning resources</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>{resource.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>{resource.uploadDate}</TableCell>
                  <TableCell>{resource.downloads}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Platform Analytics</h1>
        <p className="text-gray-600">Comprehensive insights and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Total Sessions</div>
            <div className="text-3xl mb-2">8,542</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Active Students</div>
            <div className="text-3xl mb-2">9,876</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
            <div className="text-3xl mb-2">94%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              +2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2">Satisfaction Score</div>
            <div className="text-3xl mb-2">4.8/5</div>
            <div className="flex items-center gap-1 text-sm">
              Based on 2,345 reviews
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Career Paths</CardTitle>
            <CardDescription>Most explored careers this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Software Engineering</span>
              <Badge>1,234 views</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Science</span>
              <Badge>987 views</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>UX Design</span>
              <Badge>856 views</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Product Management</span>
              <Badge>743 views</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Counselors</CardTitle>
            <CardDescription>Based on ratings and sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>Dr. Sarah Miller</div>
                <p className="text-sm text-gray-600">4.9 rating • 48 sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>Prof. John Davis</div>
                <p className="text-sm text-gray-600">4.8 rating • 42 sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>Dr. Emily Chen</div>
                <p className="text-sm text-gray-600">4.8 rating • 39 sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl mb-2">System Settings</h1>
        <p className="text-gray-600">Configure platform settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Platform Name</label>
            <Input defaultValue="Career Campus" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Support Email</label>
            <Input defaultValue="support@careercampus.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Session Duration (minutes)</label>
            <Input defaultValue="60" type="number" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure automated email settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div>New User Registration</div>
              <p className="text-sm text-gray-600">Send welcome email to new users</p>
            </div>
            <Badge className="bg-green-100 text-green-700">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Session Reminders</div>
              <p className="text-sm text-gray-600">Send reminders 24 hours before sessions</p>
            </div>
            <Badge className="bg-green-100 text-green-700">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Weekly Reports</div>
              <p className="text-sm text-gray-600">Send weekly activity reports to admins</p>
            </div>
            <Badge className="bg-green-100 text-green-700">Enabled</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage platform security options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Session Timeout (minutes)</label>
            <Input defaultValue="30" type="number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password Minimum Length</label>
            <Input defaultValue="8" type="number" />
          </div>
          <Button>Update Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}