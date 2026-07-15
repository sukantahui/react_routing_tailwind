import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./routes/NavBar";
import AuthNavBar from "./routes/AuthNavBar";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 w-full z-50
               bg-white/80 backdrop-blur-md
               border-b shadow-sm"
      >
        {isLoggedIn ? (
          <AuthNavBar setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <NavBar />
        )}
      </div>

      {/* Main Content */}
      <main className="pt-14">
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </main>
    </div>
  );
}