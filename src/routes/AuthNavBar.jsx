// routes/AuthNavBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AuthNavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <NavLink to="/dashboard" className="hover:text-gray-200">
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="hover:text-gray-200">
          Profile
        </NavLink>
        <NavLink to="/settings" className="hover:text-gray-200">
          Settings
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default AuthNavBar;
