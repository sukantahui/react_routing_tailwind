// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles, disallowStudents = false }) {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");
  const location = useLocation();

  const isValidToken = (t) => {
    if (!t) return false;
    const s = String(t).trim();
    return s !== "" && s !== "null" && s !== "undefined" && s !== "false";
  };

  const isValidUser = (u) => {
    if (!u) return false;
    try {
      const parsed = typeof u === "string" ? JSON.parse(u) : u;
      return !!parsed && typeof parsed === "object";
    } catch {
      return false;
    }
  };

  // 1. Check if user is logged in (both valid token and user record exist)
  const isAuthenticated = isValidToken(token) && isValidUser(rawUser);

  if (!isAuthenticated) {
    // Clean up any stale or corrupted localStorage tokens
    if (token && !isValidUser(rawUser)) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {}
    }

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

  let user = null;
  try {
    user = rawUser ? (typeof rawUser === "string" ? JSON.parse(rawUser) : rawUser) : null;
  } catch {
    user = null;
  }

  const userRole = (
    user?.role ||
    user?.userType?.userTypeName ||
    user?.user_type_name ||
    user?.user_type ||
    user?.roleName ||
    ""
  ).trim().toLowerCase();

  const isStudent = userRole.includes("student") || Boolean(user?.student_id || user?.studentId || user?.student);

  // 2. Explicitly prevent student login if disallowStudents is set
  if (disallowStudents && isStudent) {
    return (
      <Navigate
        to="/profile"
        replace
        state={{
          error: "Access restricted. Students cannot access Dashboard or Master management operations.",
        }}
      />
    );
  }

  // 3. Check role authorization if allowedRoles specified
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some((r) => r.trim().toLowerCase() === userRole);

    if (!isAllowed) {
      return (
        <Navigate
          to={isStudent ? "/profile" : "/dashboard"}
          replace
          state={{
            error: `Access restricted. This section requires ${allowedRoles.join(" or ")} privileges.`,
          }}
        />
      );
    }
  }

  // 4. If authenticated and authorized, show the protected content
  return children;
}