import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import DataCard from '../../components/ui/DataCard';
import EmptyState from '../../components/ui/EmptyState';
import {
  fetchCounselorStudents,
  fetchResources,
  fetchSessions,
} from '../../api';

const CounselorDashboard = () => {
  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions', 'counselor', 'dashboard'],
    queryFn: fetchSessions,
  });
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['counselor-students'],
    queryFn: fetchCounselorStudents,
  });
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['resources', 'counselor', 'dashboard'],
    queryFn: () => fetchResources(),
  });

  const pendingSessions = sessions.filter((session) => session.status === 'pending');

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Counselor mission control</h1>
          <p>Stay aligned with your students and keep sessions on track.</p>
        </div>
      </header>

      <div className="grid grid--three">
        <DataCard title="Pending confirmations" value={sessionsLoading ? '—' : pendingSessions.length}>
          {sessionsLoading && <p>Checking calendar...</p>}
          {!sessionsLoading && pendingSessions.length === 0 && (
            <EmptyState title="All sessions are confirmed" description="New session requests will appear here." />
          )}
          <ul className="list">
            {pendingSessions.slice(0, 3).map((session) => (
              <li key={session.id}>
                <p className="list__title">
                  {session.student_first_name} {session.student_last_name}
                </p>
                <p className="list__meta">
                  {dayjs(session.scheduled_at).format('MMM D, YYYY h:mm A')}
                </p>
              </li>
            ))}
          </ul>
        </DataCard>

        <DataCard title="Active students" value={studentsLoading ? '—' : students.length}>
          {studentsLoading && <p>Loading student roster...</p>}
          {!studentsLoading && students.length === 0 && (
            <EmptyState title="No assigned students" description="Once a student books you, their profile appears here." />
          )}
          <ul className="list">
            {students.slice(0, 3).map((student) => (
              <li key={student.id}>
                <p className="list__title">
                  {student.first_name} {student.last_name}
                </p>
                <p className="list__meta">{student.career_goals || 'Goals pending'}</p>
              </li>
            ))}
          </ul>
        </DataCard>

        <DataCard title="Shared resources" value={resourcesLoading ? '—' : resources.length}>
          {resourcesLoading && <p>Gathering resources...</p>}
          {!resourcesLoading && resources.length === 0 && (
            <EmptyState title="No shared content" description="Create your first article, video, or worksheet." />
          )}
          <ul className="list">
            {resources.slice(0, 3).map((resource) => (
              <li key={resource.id}>
                <p className="list__title">{resource.title}</p>
                <p className="list__meta">{resource.resource_type}</p>
              </li>
            ))}
          </ul>
        </DataCard>
      </div>
    </div>
  );
};

export default CounselorDashboard;


