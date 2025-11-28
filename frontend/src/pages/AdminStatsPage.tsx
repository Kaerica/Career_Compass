import { useQuery } from '@tanstack/react-query';
import { fetchPlatformStats } from '../api';

const AdminStatsPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: fetchPlatformStats,
  });

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Platform insights</h1>
          <p>Granular view of engagement across users, sessions, and content.</p>
        </div>
      </header>

      {isLoading && <p>Loading analytics...</p>}

      {!isLoading && stats && (
        <div className="grid grid--three">
          <section className="card">
            <div className="card__header">
              <h2>User mix</h2>
            </div>
            <ul className="list">
              {stats.users.map((entry) => (
                <li key={entry.role}>
                  <p className="list__title">{entry.role}</p>
                  <p className="list__meta">{entry.count} accounts</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <div className="card__header">
              <h2>Session flow</h2>
            </div>
            <ul className="list">
              {stats.sessions.map((entry) => (
                <li key={entry.status}>
                  <p className="list__title">{entry.status}</p>
                  <p className="list__meta">{entry.count} sessions</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <div className="card__header">
              <h2>Content availability</h2>
            </div>
            <ul className="list">
              {stats.resources.map((entry) => (
                <li key={entry.resource_type}>
                  <p className="list__title">{entry.resource_type}</p>
                  <p className="list__meta">{entry.count} items</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminStatsPage;


