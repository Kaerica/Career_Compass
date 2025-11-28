import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(form);
      navigate('/');
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Unable to log in. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p>Access your personalized Career Compass dashboard.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => handleChange('email', event.target.value)}
            required
          />
        </label>
        <label className="form__label">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => handleChange('password', event.target.value)}
            required
          />
        </label>
        {error && <p className="form__error">{error}</p>}
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="auth-card__footer">
        New to Career Compass?
        {' '}
        <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;


