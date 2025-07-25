import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // simulate unauthenticated state
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location.pathname, error: 'Access denied. Please log in first.' }}
    />
  );
}
