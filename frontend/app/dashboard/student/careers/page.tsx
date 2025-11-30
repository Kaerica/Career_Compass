'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Search } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

const availableCareers = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
  'Content Writing',
  'Project Management',
  'Business Analysis',
  'Financial Analysis',
  'Accounting',
  'Human Resources',
  'Sales',
  'Marketing',
  'Healthcare',
  'Nursing',
  'Medicine',
  'Law',
  'Education',
  'Teaching',
  'Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Architecture',
  'Interior Design',
  'Fashion Design',
  'Photography',
  'Video Production',
  'Music Production',
  'Journalism',
  'Public Relations',
  'Event Planning',
  'Culinary Arts',
  'Hospitality Management',
  'Real Estate',
  'Entrepreneurship',
  'Consulting',
];

export default function CareerSelectionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'student')) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchSelectedCareers();
    }
  }, [user, authLoading, router]);

  const fetchSelectedCareers = async () => {
    try {
      const response = await api.get('/auth/profile');
      const careerGoals = response.data.user?.career_goals;
      if (careerGoals) {
        try {
          const parsed = JSON.parse(careerGoals);
          setSelectedCareers(Array.isArray(parsed) ? parsed : []);
        } catch {
          setSelectedCareers(careerGoals.split(',').map((c: string) => c.trim()).filter(Boolean));
        }
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCareer = (career: string) => {
    setSelectedCareers((prev) =>
      prev.includes(career)
        ? prev.filter((c) => c !== career)
        : [...prev, career]
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.patch('/students/profile', {
        careerGoals: JSON.stringify(selectedCareers),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/student?tab=resources');
      }, 1500);
    } catch (error) {
      console.error('Error saving careers:', error);
      alert('Failed to save careers. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filteredCareers = availableCareers.filter((career) =>
    career.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link href="/dashboard/student">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Select Your Careers</h1>
        <p className="text-muted-foreground">
          Choose the careers you're interested in exploring. We'll provide personalized resources based on your selections.
        </p>
      </div>

      {success && (
        <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <p className="text-green-800 dark:text-green-200 text-center">
              Careers saved successfully! Redirecting to resources...
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <Card className="mb-6 border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>
            Selected Careers ({selectedCareers.length})
          </CardTitle>
          <CardDescription>
            Click on careers below to add or remove them from your selection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedCareers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedCareers.map((career) => (
                <Badge
                  key={career}
                  variant="default"
                  className="bg-blue-600 text-white px-3 py-1 text-sm cursor-pointer hover:bg-blue-700"
                  onClick={() => toggleCareer(career)}
                >
                  {career} ×
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No careers selected yet. Click on careers below to add them.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Careers</CardTitle>
          <CardDescription>
            Select multiple careers that interest you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredCareers.map((career) => {
              const isSelected = selectedCareers.includes(career);
              return (
                <div
                  key={career}
                  onClick={() => toggleCareer(career)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-foreground'}`}>
                      {career}
                    </span>
                    {isSelected && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/student">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button
          onClick={handleSave}
          disabled={selectedCareers.length === 0 || saving}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {saving ? 'Saving...' : `Save ${selectedCareers.length} Career${selectedCareers.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </DashboardLayout>
  );
}

