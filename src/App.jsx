import React, { useEffect, useState } from "react";
// import AppRoutes from "./routes/AppRoutes";
import AppRoutes from "./routes/AppRoutes-master-roadmap";
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
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-sky-500/30 selection:text-sky-300 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
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