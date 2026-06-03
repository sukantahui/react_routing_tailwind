// In your ShowPaper component or wherever you use QuestionPaperTemplate
import QuestionPaperTemplate from "../../../BooleanAlgebraQuestionPaperTemplate";
import questionData from "./topic0_files/questionpaper.json";
import { useState, useEffect } from "react";

export default function ShowPaper() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
    // Check login status on mount
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(token !== null);
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage events (when logout happens in another tab/window)
    window.addEventListener("storage", checkLoginStatus);

    // Optional: Custom event listener for same-tab updates
    const handleAuthChange = () => checkLoginStatus();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
  // You can customize organization details
  const organizationDetails = {
    name: 'Coder & AccoTax',
    address: '25(10/A) Shibtala Road, PO - N.C. Pukur, Barrackpore, Kol-122',
    phone: '+91 7003756860',
    email: 'contact@codernaccotax.co.in',
    website: 'www.codernaccotax.co.in'
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <QuestionPaperTemplate 
        data={questionData} 
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
}