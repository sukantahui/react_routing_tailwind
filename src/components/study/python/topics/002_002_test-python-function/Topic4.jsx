import React from 'react';
import PythonQuestionPaperTemplate from '../../../../../common/PythonQuestionPaperTemplate';
import pythonPaperData from './topic0_files/paper_topic4_lambdas.json';

const organizationDetails = {
  name: "Coder & AccoTax",
  address: "Barrackpore, Kolkata",
  logo: "/logo.png"
};

export default function Topic4() {
  return (
    <div className="container mx-auto py-8">
      <PythonQuestionPaperTemplate
        data={pythonPaperData}
        isLoggedIn={true}
        organizationDetails={organizationDetails}
      />
    </div>
  );
}
