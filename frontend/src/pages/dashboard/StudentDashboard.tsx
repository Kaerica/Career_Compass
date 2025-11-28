import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import DataCard from '../../components/ui/DataCard';
import EmptyState from '../../components/ui/EmptyState';
import {
  fetchGoals,
  fetchRecommendations,
  fetchResources,
  fetchSessions,
} from '../../api';

const StudentDashboard = () => {
  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions', 'student', 'dashboard'],
    queryFn: fetchSessions,
  });
  const { data: recommendations = [], isLoading: recLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });
  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['resources', 'dashboard'],
    queryFn: () => fetchResources(),
  });

  const upcomingSessions = sessions
    .filter((session) => dayjs(session.scheduled_at).isAfter(dayjs()))
    .slice(0, 3);

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Student overview</h1>
          <p>Track your guidance journey, from sessions to goals.</p>
        </div>
      </header>

      <div className="grid grid--three">
        <DataCard title="Upcoming sessions" value={sessionsLoading ? '—' : upcomingSessions.length || 'None'}>
          {sessionsLoading && <p>Loading sessions...</p>}
          {!sessionsLoading && upcomingSessions.length === 0 && (
            <EmptyState title="No sessions scheduled" description="Book time with a counselor to get tailored guidance." />
          )}
          <ul className="list">
            {upcomingSessions.map((session) => (
              <li key={session.id}>
                <p className="list__title">
                  {session.first_name} {session.last_name}
                </p>
                <p className="list__meta">
                  {dayjs(session.scheduled_at).format('MMM D, YYYY h:mm A')}
                  {' • '}
                  {session.status}
                </p>
              </li>
            ))}
          </ul>
        </DataCard>

        <DataCard title="Career recommendations" value={recLoading ? '—' : recommendations.length || 'None'}>
          {recLoading && <p>Loading recommendations...</p>}
          {!recLoading && recommendations.length === 0 && (
            <EmptyState title="Complete an assessment" description="Submit a strengths assessment to unlock tailored career paths." />
          )}
          <ul className="list">
            {recommendations.slice(0, 3).map((item) => (
              <li key={item.id}>
                <p className="list__title">{item.career_path}</p>
                <p className="list__meta">
                  Match score:
                  {' '}
                  {item.match_score}%
                </p>
              </li>
            ))}
          </ul>
        </DataCard>

        <DataCard title="Active goals" value={goalsLoading ? '—' : goals.filter((goal) => goal.status !== 'completed').length}>
          {goalsLoading && <p>Loading goals...</p>}
          {!goalsLoading && goals.length === 0 && (
            <EmptyState title="Set your first milestone" description="Define a clear objective to stay accountable." />
          )}
          <ul className="list">
            {goals.slice(0, 3).map((goal) => (
              <li key={goal.id}>
                <p className="list__title">{goal.goal_title}</p>
                <p className="list__meta">
                  Status:
                  {' '}
                  {goal.status.replace('_', ' ')}
                </p>
              </li>
            ))}
          </ul>
        </DataCard>
      </div>

      <DataCard title="New learning resources" footer={<span>{resources.length} available resources</span>}>
        {resourcesLoading && <p>Loading curated content...</p>}
        {!resourcesLoading && resources.length === 0 && (
          <EmptyState
            title="No resources yet"
            description="Your counselors will soon share curated videos, articles, and courses."
          />
        )}
        <div className="resource-grid">
          {resources.slice(0, 4).map((resource) => (
            <article key={resource.id} className="resource-card">
              <p className="resource-card__type">{resource.resource_type}</p>
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
            </article>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default StudentDashboard;


