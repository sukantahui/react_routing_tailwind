import React, { useState } from 'react';
import PythonQuestionPaperTemplate from '../../../../../common/PythonQuestionPaperTemplate';
// import PythonQuestionPaperTemplate from './components/PythonQuestionPaperTemplate';
import pythonPaperData from './topic0_files/python_question.json'; // your Python‑specific JSON

const PythonTopic = () => {
  const [currentPaper] = useState(pythonPaperData);
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "Barrackpore, Kolkata",
    logo: "/logo.png"
  };
  const isLoggedIn = true; // or from your auth context

  return (
    <div className="container mx-auto py-8">
      <PythonQuestionPaperTemplate
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default PythonTopic;