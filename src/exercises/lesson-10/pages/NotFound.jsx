import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        The path <code>{pathname}</code> does not exist.
      </p>
      <div style={{ marginTop: 12 }}>
        <Link
          to="/lessons/lesson-10/"
          style={{ color: '#0066cc', textDecoration: 'underline' }}
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
