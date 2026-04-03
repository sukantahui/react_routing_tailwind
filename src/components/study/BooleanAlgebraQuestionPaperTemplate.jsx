// QuestionPaperTemplate.jsx
import React, { useState } from 'react';
import PrintButton from '../../common/PrintButton';

const BooleanalgebraQuestionPaperTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});

  const toggleAnswer = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatAnswer = (question) => {
    // For questions with steps (Boolean algebra simplifications)
    if (question.steps) {
      return (
        <div className="space-y-3">
          {question.original && (
            <div>
              <strong className="text-blue-400">Original Expression:</strong>
              <p className="mt-1 font-mono">{question.original}</p>
            </div>
          )}
          
          {question.simplified && (
            <div>
              <strong className="text-green-400">Simplified Expression:</strong>
              <p className="mt-1 font-mono text-green-400">{question.simplified}</p>
            </div>
          )}
          
          <div>
            <strong className="text-yellow-400">Step-by-Step Solution:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              {question.steps.map((step, idx) => (
                <li key={idx} className="text-gray-300">
                  <span className="font-medium">{step.action}</span>
                  <div className="ml-6 mt-1 font-mono text-sm">
                    {step.expression}
                    <span className="text-gray-500 ml-2">({step.law})</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {question.explanation && (
            <div className="mt-2 p-2 bg-gray-700 rounded">
              <strong className="text-purple-400">💡 Explanation:</strong>
              <p className="mt-1 text-gray-300">{question.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    // For truth table questions
    if (question.truthTable) {
      const headers = Object.keys(question.truthTable[0]);
      return (
        <div>
          <strong className="text-yellow-400">Truth Table:</strong>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-700">
                  {headers.map((header, idx) => (
                    <th key={idx} className="border border-gray-600 px-4 py-2 text-sm">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.truthTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-700 transition">
                    {headers.map((header, colIdx) => (
                      <td key={colIdx} className="border border-gray-600 px-4 py-2 text-center text-sm">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // For text answers with pipe format (like XOR truth table)
    if (question.answer && question.answer.includes('|')) {
      const lines = question.answer.trim().split('\n');
      const hasHeader = lines[0].includes('|');
      
      if (hasHeader) {
        return (
          <div>
            <strong className="text-yellow-400">Answer:</strong>
            <pre className="mt-2 p-3 bg-gray-800 rounded-lg font-mono text-sm overflow-x-auto">
              {question.answer}
            </pre>
          </div>
        );
      }
    }

    // For regular text answers with code blocks
    if (question.answer && question.answer.includes("```")) {
      const parts = question.answer.split(/(```[\s\S]*?```)/g);
      return (
        <div>
          <strong className="text-yellow-400">Answer:</strong>
          <div className="mt-2">
            {parts.map((part, i) => {
              if (part.startsWith("```") && part.endsWith("```")) {
                const code = part.slice(3, -3);
                return (
                  <pre key={i} className="bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm">
                    <code>{code.trim()}</code>
                  </pre>
                );
              }
              return <p key={i} className="whitespace-pre-wrap text-gray-300">{part}</p>;
            })}
          </div>
        </div>
      );
    }

    // For simple text answers
    if (question.answer) {
      return (
        <div>
          <strong className="text-yellow-400">Answer:</strong>
          <p className="mt-2 text-gray-300 whitespace-pre-wrap">{question.answer}</p>
        </div>
      );
    }

    return null;
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
                      <span className="text-gray-200 flex-1 font-medium">{q.q}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">[{q.marks}]</span>
                        {isLoggedIn && (
                          <button
                            onClick={() => toggleAnswer(sectionIdx, qIdx)}
                            className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors no-print"
                          >
                            {isOpen ? "Hide Answer" : "Show Answer"}
                          </button>
                        )}
                      </div>
                    </div>
                    {isLoggedIn && isOpen && (
                      <div className="answer-content mt-3 p-4 bg-gray-800 rounded-lg text-gray-300 text-sm border border-gray-700">
                        {formatAnswer(q)}
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

export default BooleanalgebraQuestionPaperTemplate;