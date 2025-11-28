import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/api';

const roleOptions: Role[] = ['student', 'counselor', 'admin'];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'student' as Role,
    password: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      navigate('/');
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Unable to sign up. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Create your account</h1>
      <p>Join Career Compass and unlock tailored guidance.</p>

      <form className="form form--grid" onSubmit={handleSubmit}>
        <label className="form__label">
          First name
          <input
            type="text"
            value={form.firstName}
            onChange={(event) => handleChange('firstName', event.target.value)}
            required
          />
        </label>
        <label className="form__label">
          Last name
          <input
            type="text"
            value={form.lastName}
            onChange={(event) => handleChange('lastName', event.target.value)}
            required
          />
        </label>
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
          Phone (optional)
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
          />
        </label>
        <label className="form__label">
          Role
          <select
            value={form.role}
            onChange={(event) => handleChange('role', event.target.value)}
          >
            {roleOptions.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </option>
            ))}
          </select>
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
        {error && <p className="form__error form__error--full">{error}</p>}
        <button
          type="submit"
          className="btn btn--primary form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="auth-card__footer">
        Already have an account?
        {' '}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;


