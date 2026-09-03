// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ✅ Check if user is logged in (token exists)
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

  // ✅ If authenticated, show the protected content
  return children;
}
