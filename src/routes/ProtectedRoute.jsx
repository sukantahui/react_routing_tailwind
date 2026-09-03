// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");
  const location = useLocation();

  // 1. Check if user is logged in (token exists)
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          error: "Access denied. Please log in first.",
        }}
      />
    );
  }

  // 2. Check role authorization if allowedRoles specified
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    try {
      const user = rawUser ? JSON.parse(rawUser) : null;
      const userRole = (user?.role || "").trim().toLowerCase();
      const isAllowed = allowedRoles.some((r) => r.trim().toLowerCase() === userRole);

      if (!isAllowed) {
        return (
          <Navigate
            to="/dashboard"
            replace
            state={{
              error: `Access restricted. This section requires ${allowedRoles.join(" or ")} privileges.`,
            }}
          />
        );
      }
    } catch {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 3. If authenticated and authorized, show the protected content
  return children;
}