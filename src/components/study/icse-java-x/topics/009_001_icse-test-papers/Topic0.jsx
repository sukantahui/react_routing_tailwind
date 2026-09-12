import React, { useState } from 'react';
import JavaQuestionPaperTemplate from '../../../JavaQuestionPaperTemplate';
import javaPaperData from './topic0_files/icse-2026-paper.json';

const Topic0 = () => {
  const [currentPaper] = useState(javaPaperData);
  
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "Barrackpore, Kolkata",
    logo: "/logo.png"
  };
  
  const isLoggedIn = true;
  
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
