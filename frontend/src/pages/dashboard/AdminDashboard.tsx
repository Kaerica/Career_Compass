import { useQuery } from '@tanstack/react-query';
import DataCard from '../../components/ui/DataCard';
import { fetchPlatformStats } from '../../api';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['platform-stats', 'dashboard'],
    queryFn: fetchPlatformStats,
  });

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Platform health</h1>
          <p>Snapshot of user growth, session throughput, and content inventory.</p>
        </div>
      </header>

      <div className="grid grid--three">
        <DataCard title="User distribution">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <ul className="list">
              {stats?.users.map((entry) => (
                <li key={entry.role}>
                  <p className="list__title">{entry.role}</p>
                  <p className="list__meta">{entry.count} accounts</p>
                </li>
              ))}
            </ul>
          )}
        </DataCard>

        <DataCard title="Session pipeline">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <ul className="list">
              {stats?.sessions.map((entry) => (
                <li key={entry.status}>
                  <p className="list__title">{entry.status}</p>
                  <p className="list__meta">{entry.count} sessions</p>
                </li>
              ))}
            </ul>
          )}
        </DataCard>

        <DataCard title="Resource mix">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <ul className="list">
              {stats?.resources.map((entry) => (
                <li key={entry.resource_type}>
                  <p className="list__title">{entry.resource_type}</p>
                  <p className="list__meta">{entry.count} items</p>
                </li>
              ))}
            </ul>
          )}
        </DataCard>
      </div>
    </div>
  );
};

export default AdminDashboard;


