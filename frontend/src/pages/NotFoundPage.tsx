import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page page--center">
    <h1>404</h1>
    <p>The page you are looking for has moved or never existed.</p>
    <Link className="btn btn--primary" to="/">
      Back to dashboard
    </Link>
  </div>
);

export default NotFoundPage;


