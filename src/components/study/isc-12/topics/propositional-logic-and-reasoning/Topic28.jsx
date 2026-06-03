import React, { useState, useEffect } from 'react';
import PropositionalLogicARTemplate from '../../../PropositionalLogicARTemplate';
import { assertionReasonQuestions } from './topic28_files/assertionReasonQuestions';

export default function ShowPropositionalPaper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const paperData = {
    paperId: "PROP-AR-101",
    title: "Propositional Logic - Assertion & Reason",
    duration: "1 Hour",
    totalMarks: assertionReasonQuestions.length,
    sections: [
      {
        section: "A",
        type: "Assertion-Reason Questions",
        marksPerQuestion: 1,
        totalQuestions: assertionReasonQuestions.length,
        questions: assertionReasonQuestions
      }
    ]
  };

  const organizationDetails = {
    name: 'Coder & AccoTax',
    address: '25(10/A) Shibtala Road, PO - N.C. Pukur, Barrackpore, Kol-122',
    phone: '+91 7003756860',
    email: 'contact@codernaccotax.co.in',
    website: 'www.codernaccotax.co.in'
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <PropositionalLogicARTemplate
        data={paperData}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
}