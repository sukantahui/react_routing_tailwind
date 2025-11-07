// src/components/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-3">Welcome, {user?.employee?.employeeName}</h1>
      <p className="text-gray-700 mb-6">
        You are logged in as <strong>{user?.userType?.userTypeName}</strong>
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
