import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";       // your public navbar
import AuthNavBar from "./AuthNavBar";           // your dashboard navbar

const MainLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authChanged", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? <AuthNavBar /> : <NavBar />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default MainLayout;
