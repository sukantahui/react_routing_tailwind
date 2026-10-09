import React, { useState } from 'react';
import PythonQuestionPaperTemplate from '../../../../../common/PythonQuestionPaperTemplate';
import csPaperData from './topic0_files/aps-barrackpore-2026-xi-cs083-halfyearly.json';

const Topic0 = () => {
  const [currentPaper] = useState(csPaperData);

  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "25(10/A) Shibtala Road, PO – N. C. Pukur, Barrackpore, Kolkata, West Bengal, India",
    logo: "/logo.png"
  };

  const isLoggedIn = true;

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <PythonQuestionPaperTemplate
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default Topic0;
