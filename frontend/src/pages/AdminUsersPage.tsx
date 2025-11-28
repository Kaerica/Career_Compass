import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminUsers,
  fetchCounselors,
  updateUserStatusRequest,
  verifyCounselorRequest,
} from '../api';

const AdminUsersPage = () => {
  const queryClient = useQueryClient();
  const [roleFilter, setRoleFilter] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users', roleFilter],
    queryFn: () => fetchAdminUsers(roleFilter || undefined),
  });

  const { data: counselors = [] } = useQuery({
    queryKey: ['admin-counselors'],
    queryFn: fetchCounselors,
  });

  const counselorMap = new Map(counselors.map((counselor) => [counselor.user_id, counselor.id]));

  const updateStatus = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => updateUserStatusRequest(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const verifyCounselor = useMutation({
    mutationFn: verifyCounselorRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-counselors'] }),
  });

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>User management</h1>
          <p>Activate, pause, or verify accounts in seconds.</p>
        </div>
        <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="">All roles</option>
          <option value="student">Students</option>
          <option value="counselor">Counselors</option>
          <option value="admin">Admins</option>
        </select>
      </header>

      <section className="card">
        <div className="card__header">
          <h2>Directory</h2>
          <p>{users.length} accounts</p>
        </div>

        {isLoading && <p>Loading users...</p>}

        {!isLoading && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const counselorId = counselorMap.get(user.id);
                  const isActive = Boolean(user.is_active);

                  return (
                    <tr key={user.id}>
                      <td>
                        <p className="list__title">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="list__meta">{user.phone || '—'}</p>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`badge ${isActive ? 'badge--success' : 'badge--muted'}`}>
                          {isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="table__actions">
                        <button
                          type="button"
                          className="btn btn--small"
                          onClick={() => updateStatus.mutate({
                            id: user.id,
                            isActive: !isActive,
                          })}
                        >
                          {isActive ? 'Deactivate' : 'Reactivate'}
                        </button>
                        {user.role === 'counselor' && counselorId && (
                          <button
                            type="button"
                            className="btn btn--ghost btn--small"
                            onClick={() => verifyCounselor.mutate(counselorId)}
                          >
                            Verify counselor
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5}>No users match this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminUsersPage;


