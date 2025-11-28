import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  createSessionRequest,
  fetchCounselors,
  fetchSessions,
  updateSessionRequest,
} from '../api';
import { useAuth } from '../hooks/useAuth';
import EmptyState from '../components/ui/EmptyState';

const SessionsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });
  const { data: counselors = [] } = useQuery({
    queryKey: ['counselors'],
    queryFn: fetchCounselors,
    enabled: user?.role === 'student',
  });

  const [form, setForm] = useState({
    counselorId: '',
    scheduledAt: '',
    durationMinutes: 60,
  });

  const createSession = useMutation({
    mutationFn: createSessionRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setForm({
        counselorId: '',
        scheduledAt: '',
        durationMinutes: 60,
      });
    },
  });

  const updateSession = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateSessionRequest(id, { status: status as any }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.counselorId) return;
    await createSession.mutateAsync({
      counselorId: Number(form.counselorId),
      scheduledAt: form.scheduledAt,
      durationMinutes: form.durationMinutes,
    });
  };

  const canConfirm = user?.role === 'counselor' || user?.role === 'admin';

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Sessions</h1>
          <p>Coordinate time between students and counselors.</p>
        </div>
      </header>

      <section className="card">
        <div className="card__header">
          <h2>Session pipeline</h2>
          <p>{sessions.length} total sessions</p>
        </div>
        {isLoading && <p>Loading sessions...</p>}
        {!isLoading && sessions.length === 0 && (
          <EmptyState title="No sessions found" description="Once booked, sessions will appear here." />
        )}
        {!isLoading && sessions.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Counselor</th>
                  <th>Scheduled</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td>
                      {session.student_first_name
                        ? `${session.student_first_name} ${session.student_last_name}`
                        : 'You'}
                    </td>
                    <td>
                      {session.first_name
                        ? `${session.first_name} ${session.last_name}`
                        : `${session.counselor_first_name} ${session.counselor_last_name}`}
                    </td>
                    <td>{dayjs(session.scheduled_at).format('MMM D, YYYY h:mm A')}</td>
                    <td>
                      <span className={`badge badge--${session.status}`}>
                        {session.status}
                      </span>
                    </td>
                    <td>
                      {canConfirm && session.status === 'pending' && (
                        <button
                          type="button"
                          className="btn btn--small"
                          onClick={() => updateSession.mutate({ id: session.id, status: 'confirmed' })}
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {user?.role === 'student' && (
        <section className="card">
          <div className="card__header">
            <h2>Book a new session</h2>
            <p>Choose a verified counselor and lock in a time.</p>
          </div>
          <form className="form form--grid" onSubmit={handleSubmit}>
            <label className="form__label">
              Counselor
              <select
                value={form.counselorId}
                onChange={(event) => setForm((prev) => ({ ...prev, counselorId: event.target.value }))}
                required
              >
                <option value="">Select a counselor</option>
                {counselors.map((counselor) => (
                  <option key={counselor.id} value={counselor.id}>
                    {counselor.first_name} {counselor.last_name} • {counselor.specialization || 'Generalist'}
                  </option>
                ))}
              </select>
            </label>
            <label className="form__label">
              Date & time
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(event) => setForm((prev) => ({ ...prev, scheduledAt: event.target.value }))}
                required
              />
            </label>
            <label className="form__label">
              Duration (minutes)
              <input
                type="number"
                min={15}
                max={120}
                value={form.durationMinutes}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  durationMinutes: Number(event.target.value),
                }))}
              />
            </label>
            <button
              type="submit"
              className="btn btn--primary form__submit"
              disabled={createSession.isPending}
            >
              {createSession.isPending ? 'Booking...' : 'Schedule session'}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default SessionsPage;


