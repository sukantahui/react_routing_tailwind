import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div>
      <h2>Home Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
