// App.jsx
import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./routes/NavBar";
import AuthNavBar from "./routes/AuthNavBar"; // 🆕 Logged-in navbar

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 🔹 Optional: re-check on storage change (e.g., logout from other tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="h-screen ">
      <div className="h-10">
        {isLoggedIn ? <AuthNavBar setIsLoggedIn={setIsLoggedIn} /> : <NavBar />}
      </div>

      <div className="h-90">
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}
