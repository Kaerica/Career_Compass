'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookSessionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [counselors, setCounselors] = useState<any[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);
  const [scheduledAt, setScheduledAt] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'student')) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchCounselors();
    }
  }, [user, authLoading, router]);

  const fetchCounselors = async () => {
    try {
      const response = await api.get('/counselors');
      setCounselors(response.data.counselors || []);
    } catch (error) {
      console.error('Error fetching counselors:', error);
      setError('Failed to load counselors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = async () => {
    if (!selectedCounselor) {
      setError('Please select a counselor');
      return;
    }
    if (!scheduledAt) {
      setError('Please select a date and time');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.post('/sessions', {
        counselorId: selectedCounselor.id,
        scheduledAt: new Date(scheduledAt).toISOString(),
        durationMinutes,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/student');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to book session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-foreground">Book a Session</h1>
        <p className="text-muted-foreground">Schedule a one-on-one session with a career counselor</p>
      </div>

      {success ? (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                Session Booked Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Redirecting to your dashboard...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Select a Counselor</CardTitle>
              <CardDescription>Choose from our verified career counselors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {counselors.length > 0 ? (
                counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    onClick={() => setSelectedCounselor(counselor)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCounselor?.id === counselor.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {counselor.first_name} {counselor.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{counselor.email}</p>
                          {counselor.specialization && (
                            <Badge variant="secondary" className="mt-1">
                              {counselor.specialization}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No counselors available at the moment
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>Choose date, time, and duration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="datetime">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Date & Time
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="120"
                  step="15"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Available durations: 15, 30, 45, 60, 90, 120 minutes
                </p>
              </div>

              {selectedCounselor && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Session Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Counselor:</span>{' '}
                      {selectedCounselor.first_name} {selectedCounselor.last_name}
                    </p>
                    {scheduledAt && (
                      <p>
                        <span className="text-muted-foreground">Scheduled:</span>{' '}
                        {new Date(scheduledAt).toLocaleString()}
                      </p>
                    )}
                    <p>
                      <span className="text-muted-foreground">Duration:</span> {durationMinutes}{' '}
                      minutes
                    </p>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleBookSession}
                disabled={!selectedCounselor || !scheduledAt || submitting}
              >
                {submitting ? 'Booking...' : 'Book Session'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

