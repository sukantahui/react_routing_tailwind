import React, { useState } from 'react';  // Added useState import
import JavaQuestionPaperTemplate from '../../../JavaQuestionPaperTemplate';
import javaPaperData from './topic0_files/question.json'; // Your JSON file

const Topic0 = () => {
  // Example with sample data
  const [currentPaper, setCurrentPaper] = useState(javaPaperData);
  
  // Organization details (optional, for print functionality)
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "Barrackpore, Kolkata",
    logo: "/logo.png" // optional
  };
  
  // User authentication status (controls answer visibility)
  const isLoggedIn = true; // Or get from your auth context/state
  
  return (
    <div className="container mx-auto py-8">
      <JavaQuestionPaperTemplate 
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default Topic0;