// ShowPropositionalLogic.jsx
import React, { useState, useEffect } from 'react';
import PropositionalLogicTemplate from '../../../PropositionalLogicTemplate'; // adjust path as needed
import { propositionalQuestions } from './topic29_files/propositional_logic_questions';

export default function ShowPropositionalLogic() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const paperData = {
    paperId: "PL-MIX-101",
    title: "Propositional Logic - Mixed Question Bank",
    duration: "1.5 Hours",
    totalMarks: propositionalQuestions.reduce((sum, q) => sum + (q.marks || 1), 0),
    questions: propositionalQuestions   // This is the key – must match template's prop
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
      <PropositionalLogicTemplate
        data={paperData}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
}