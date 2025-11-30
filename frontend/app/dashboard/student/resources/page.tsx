'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, GraduationCap, Wrench, Youtube, Play } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

const resourceIcons: Record<string, any> = {
  article: FileText,
  video: Video,
  document: FileText,
  course: GraduationCap,
  tool: Wrench,
};


export default function ResourcesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [resources, setResources] = useState<any[]>([]);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'student')) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchResources();
    }
  }, [user, authLoading, router]);

  const fetchResources = async () => {
    try {
      const [resourcesRes, profileRes] = await Promise.all([
        api.get('/resources'),
        api.get('/auth/profile'),
      ]);
      
      setResources(resourcesRes.data.resources || []);
      
      // Get selected careers from profile
      const careerGoals = profileRes.data.user?.career_goals;
      if (careerGoals) {
        try {
          const parsed = JSON.parse(careerGoals);
          setSelectedCareers(Array.isArray(parsed) ? parsed : []);
        } catch {
          const careers = careerGoals.split(',').map((c: string) => c.trim()).filter(Boolean);
          setSelectedCareers(careers);
        }
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeSearchUrl = (career: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(career + ' career guide tutorial')}`;
  };


  const handleResourceAccess = async (resourceId: number, externalUrl?: string) => {
    try {
      await api.post(`/resources/${resourceId}/access`);
      if (externalUrl) {
        window.open(externalUrl, '_blank');
      }
    } catch (error) {
      console.error('Error tracking resource access:', error);
      if (externalUrl) {
        window.open(externalUrl, '_blank');
      }
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Resources</h1>
            <p className="text-muted-foreground">Explore articles, videos, courses, and tools</p>
          </div>
          {selectedCareers.length === 0 && (
            <Link href="/dashboard/student/careers">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Select Careers First
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Tabs defaultValue="youtube" className="space-y-4">
        <TabsList>
          <TabsTrigger value="youtube">
            <Youtube className="h-4 w-4 mr-2" />
            YouTube Videos
          </TabsTrigger>
          <TabsTrigger value="resources">
            <BookOpen className="h-4 w-4 mr-2" />
            Platform Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="youtube" className="space-y-4">
          {selectedCareers.length === 0 ? (
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="text-center py-12">
                <Youtube className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Careers Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select your careers of interest to see personalized YouTube videos and resources.
                </p>
                <Link href="/dashboard/student/careers">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Select Careers Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {selectedCareers.map((career) => (
                <Card key={career} className="border-2 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Youtube className="h-6 w-6 text-red-600" />
                      {career} - Video Resources
                    </CardTitle>
                    <CardDescription>
                      Educational videos and tutorials for {career}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Primary search button - always show */}
                        <div className="col-span-full md:col-span-2 lg:col-span-3">
                          <Button
                            size="lg"
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => window.open(getYouTubeSearchUrl(career), '_blank')}
                          >
                            <Youtube className="h-5 w-5 mr-2" />
                            Search YouTube for "{career}" Videos
                          </Button>
                        </div>
                        
                        {/* Additional search options */}
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(getYouTubeSearchUrl(career + ' career guide'), '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Career Guide Videos
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(getYouTubeSearchUrl(career + ' tutorial'), '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Tutorial Videos
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(getYouTubeSearchUrl(career + ' day in the life'), '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Day in the Life
                        </Button>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-2">
                          💡 Tip: Click any button above to explore YouTube videos about {career}. 
                          You'll find tutorials, career guides, interviews, and more!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {resources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource: any) => {
                const Icon = resourceIcons[resource.resource_type] || BookOpen;
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-primary" />
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                        <Badge variant="secondary">{resource.resource_type}</Badge>
                      </div>
                      {resource.description && (
                        <CardDescription>{resource.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {resource.category && (
                        <Badge variant="outline" className="mb-3">
                          {resource.category}
                        </Badge>
                      )}
                      <Button
                        className="w-full"
                        onClick={() => handleResourceAccess(resource.id, resource.external_url)}
                      >
                        {resource.external_url ? (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Resource
                          </>
                        ) : (
                          'View Resource'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No platform resources available at the moment</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

