import { useQuery } from '@tanstack/react-query';
import { fetchCounselorStudents } from '../api';

const CounselorStudentsPage = () => {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['counselor-students'],
    queryFn: fetchCounselorStudents,
  });

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Student profiles</h1>
          <p>Review context before every conversation.</p>
        </div>
      </header>

      <section className="card">
        <div className="card__header">
          <h2>Active students</h2>
          <p>{students.length} learners</p>
        </div>

        {isLoading && <p>Loading students...</p>}

        {!isLoading && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Interests</th>
                  <th>Career goals</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <p className="list__title">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="list__meta">{student.email}</p>
                    </td>
                    <td>{student.grade_level || '—'}</td>
                    <td>{student.interests || '—'}</td>
                    <td>{student.career_goals || '—'}</td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={4}>No student profiles yet.</td>
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

export default CounselorStudentsPage;


