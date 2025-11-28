import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  createGoalRequest,
  fetchGoals,
  updateGoalRequest,
} from '../api';
import EmptyState from '../components/ui/EmptyState';

const statusOptions = ['not_started', 'in_progress', 'completed', 'cancelled'] as const;

const GoalsPage = () => {
  const queryClient = useQueryClient();
  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });

  const [form, setForm] = useState({
    goalTitle: '',
    goalDescription: '',
    targetDate: '',
  });

  const createGoal = useMutation({
    mutationFn: createGoalRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] });
      setForm({ goalTitle: '', goalDescription: '', targetDate: '' });
    },
  });

  const updateGoal = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateGoalRequest(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createGoal.mutateAsync({
      goalTitle: form.goalTitle,
      goalDescription: form.goalDescription || undefined,
      targetDate: form.targetDate || undefined,
    });
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Goals</h1>
          <p>Convert big ambitions into concrete, trackable milestones.</p>
        </div>
      </header>

      <section className="card">
        <div className="card__header">
          <h2>Your milestones</h2>
          <p>{goals.length} total goals</p>
        </div>
        {isLoading && <p>Loading goals...</p>}
        {!isLoading && goals.length === 0 && (
          <EmptyState title="No goals yet" description="Create your first milestone below." />
        )}
        {!isLoading && goals.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Goal</th>
                  <th>Target date</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td>
                      <p className="list__title">{goal.goal_title}</p>
                      <p className="list__meta">{goal.goal_description}</p>
                    </td>
                    <td>{goal.target_date ? dayjs(goal.target_date).format('MMM D, YYYY') : '—'}</td>
                    <td>
                      <span className={`badge badge--${goal.status}`}>{goal.status.replace('_', ' ')}</span>
                    </td>
                    <td>
                      <select
                        value={goal.status}
                        onChange={(event) => updateGoal.mutate({ id: goal.id, status: event.target.value })}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card">
        <div className="card__header">
          <h2>Define a new goal</h2>
          <p>Stay accountable by giving your ambitions a deadline.</p>
        </div>
        <form className="form form--grid" onSubmit={handleSubmit}>
          <label className="form__label form__label--full">
            Goal title
            <input
              type="text"
              value={form.goalTitle}
              onChange={(event) => setForm((prev) => ({ ...prev, goalTitle: event.target.value }))}
              required
            />
          </label>
          <label className="form__label form__label--full">
            Why this matters
            <textarea
              rows={3}
              value={form.goalDescription}
              onChange={(event) => setForm((prev) => ({ ...prev, goalDescription: event.target.value }))}
            />
          </label>
          <label className="form__label">
            Target date
            <input
              type="date"
              value={form.targetDate}
              onChange={(event) => setForm((prev) => ({ ...prev, targetDate: event.target.value }))}
            />
          </label>
          <button
            type="submit"
            className="btn btn--primary form__submit"
            disabled={createGoal.isPending}
          >
            {createGoal.isPending ? 'Saving...' : 'Save goal'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default GoalsPage;


