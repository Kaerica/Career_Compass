'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// Using simple radio buttons without external dependency
import { ArrowLeft, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

const assessmentQuestions = [
  {
    id: 1,
    question: 'What type of work environment do you prefer?',
    options: [
      { value: 'office', label: 'Traditional office setting' },
      { value: 'remote', label: 'Remote work' },
      { value: 'hybrid', label: 'Hybrid (mix of office and remote)' },
      { value: 'field', label: 'Field work / On-site' },
    ],
  },
  {
    id: 2,
    question: 'What interests you most in a career?',
    options: [
      { value: 'technology', label: 'Technology and innovation' },
      { value: 'creative', label: 'Creative expression' },
      { value: 'helping', label: 'Helping others' },
      { value: 'business', label: 'Business and strategy' },
    ],
  },
  {
    id: 3,
    question: 'How do you prefer to work?',
    options: [
      { value: 'team', label: 'In a team' },
      { value: 'solo', label: 'Independently' },
      { value: 'both', label: 'Mix of both' },
    ],
  },
  {
    id: 4,
    question: 'What motivates you most?',
    options: [
      { value: 'money', label: 'Financial success' },
      { value: 'impact', label: 'Making a difference' },
      { value: 'growth', label: 'Personal growth' },
      { value: 'recognition', label: 'Recognition and achievement' },
    ],
  },
  {
    id: 5,
    question: 'What are your strongest skills?',
    options: [
      { value: 'analytical', label: 'Analytical thinking' },
      { value: 'communication', label: 'Communication' },
      { value: 'technical', label: 'Technical skills' },
      { value: 'leadership', label: 'Leadership' },
    ],
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async () => {
    if (Object.keys(responses).length !== assessmentQuestions.length) {
      setError('Please answer all questions');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.post('/students/assessment', {
        assessmentType: 'career_interest',
        responses,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/student?tab=recommendations');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (success) {
    return (
      <DashboardLayout>
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
                Assessment Submitted Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Your career recommendations are being generated...
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Redirecting to recommendations...
              </p>
            </div>
          </CardContent>
        </Card>
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
        <h1 className="text-3xl font-bold text-foreground">Career Assessment</h1>
        <p className="text-muted-foreground">
          Answer these questions to receive personalized career recommendations
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {assessmentQuestions.map((question) => (
          <Card key={question.id} className="border-2 border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-lg">
                {question.id}. {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer hover:bg-accent/50"
                    onClick={() => setResponses({ ...responses, [question.id]: option.value })}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={() => setResponses({ ...responses, [question.id]: option.value })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Label className="cursor-pointer flex-1 font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {error && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-950">
            <CardContent className="pt-6">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/student">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(responses).length !== assessmentQuestions.length}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {submitting ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

