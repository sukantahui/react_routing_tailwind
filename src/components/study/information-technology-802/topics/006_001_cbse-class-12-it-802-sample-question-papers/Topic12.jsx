import React, { useState } from 'react';
import JavaQuestionPaperTemplate from '../../../JavaQuestionPaperTemplate';
import itPaperData from './topic12_files/cbse-2015-board-paper.json';

const Topic12 = () => {
  const [currentPaper] = useState(itPaperData);
  
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "25(10/A) Shibtala Road, Barrackpore, Kolkata",
    logo: "/logo.png"
  };
  
  const isLoggedIn = true;
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <JavaQuestionPaperTemplate 
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default Topic12;
