// QuestionPaperTemplate.jsx
import React, { useState } from 'react';
import PrintButton from '../../common/PrintButton';

const QuestionPaperTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});

  const toggleAnswer = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatAnswer = (answer) => {
    if (!answer) return null;
    if (answer.includes("```")) {
      const parts = answer.split(/(```[\s\S]*?```)/g);
      return parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3);
          return (
            <pre key={i} className="bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm">
              <code>{code.trim()}</code>
            </pre>
          );
        }
        return <span key={i} className="whitespace-pre-wrap">{part}</span>;
      });
    }
    return <p className="whitespace-pre-wrap">{answer}</p>;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-xl text-gray-100">
      {/* Print Button */}
      <div className="flex justify-end mb-4 no-print">
        <PrintButton 
          targetId="print-content" 
          title={data.title}
          organizationDetails={organizationDetails}
        />
      </div>

      {/* Content to be printed */}
      <div id="print-content">
        {/* Header */}
        <div className="text-center border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-white">{data.title}</h1>
          <p className="text-sm text-gray-400">Paper ID: {data.paperId}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Duration: {data.duration}</span>
            <span>Total Marks: {data.totalMarks}</span>
          </div>
        </div>

        {/* Sections */}
        {data.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8">
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-white">
                Section {section.section}: {section.type}
              </h2>
              <p className="text-sm text-gray-400">
                ({section.totalQuestions} Questions × {section.marksPerQuestion} Marks)
              </p>
            </div>

            <ol className="list-decimal pl-5 space-y-4">
              {section.questions.map((q, qIdx) => {
                const key = `${sectionIdx}-${qIdx}`;
                const isOpen = openAnswers[key];
                return (
                  <li key={qIdx} className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-gray-200 flex-1">{q.q}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">[{q.marks}]</span>
                        {isLoggedIn && (
                          <button
                            onClick={() => toggleAnswer(sectionIdx, qIdx)}
                            className="px-2 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors no-print"
                          >
                            {isOpen ? "Hide Answer" : "Show Answer"}
                          </button>
                        )}
                      </div>
                    </div>
                    {isLoggedIn && isOpen && q.answer && (
                      <div className="answer-content mt-2 p-3 bg-gray-800 rounded-lg text-gray-300 text-sm border border-gray-700">
                        {formatAnswer(q.answer)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaperTemplate;