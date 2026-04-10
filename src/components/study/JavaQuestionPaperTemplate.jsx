import React, { useState } from 'react';
import PrintButton from '../../common/PrintButton';
import JavaCodeBlock from '../../common/JavaCodeBlock';

const JavaQuestionPaperTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});

  const toggleAnswer = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatAnswer = (answer) => {
    if (!answer) return null;
    
    // Check if answer contains Java code blocks
    if (answer.includes("```java") || answer.includes("```")) {
      const parts = answer.split(/(```java[\s\S]*?```|```[\s\S]*?```)/g);
      return parts.map((part, i) => {
        // Handle Java code blocks
        if (part.startsWith("```java") && part.endsWith("```")) {
          const code = part.slice(7, -3).trim();
          return (
            <JavaCodeBlock 
              key={i} 
              code={code} 
              title="Java Code"
            />
          );
        }
        // Handle generic code blocks
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).trim();
          return (
            <JavaCodeBlock 
              key={i} 
              code={code} 
              title="Code"
            />
          );
        }
        // Handle regular text
        return <p key={i} className="whitespace-pre-wrap text-gray-300 print:text-black print:leading-tight">{part}</p>;
      });
    }
    
    return <p className="whitespace-pre-wrap text-gray-300 print:text-black print:leading-tight">{answer}</p>;
  };

  // Helper to detect if a question contains Java code in the answer
  const hasJavaCode = (answer) => {
    return answer && (answer.includes("```java") || answer.includes("public class") || answer.includes("public static void"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-xl text-gray-100 print:bg-white print:text-black print:p-4">
      {/* Print Button */}
      <div className="flex justify-end mb-4 no-print">
        <PrintButton 
          targetId="print-content" 
          title={data.title}
          organizationDetails={organizationDetails}
        />
      </div>

      {/* Content to be printed */}
      <div id="print-content" className="print:leading-tight">
        {/* Header */}
        <div className="text-center border-b border-gray-700 print:border-black pb-4 mb-6 print:pb-2 print:mb-3">
          <h1 className="text-2xl font-bold text-white print:text-black print:text-xl print:mb-1">{data.title}</h1>
          <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">Paper ID: {data.paperId}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-400 print:text-gray-600 print:text-xs print:mt-1">
            <span>Duration: {data.duration}</span>
            <span>Total Marks: {data.totalMarks}</span>
          </div>
          {data.prerequisites && (
            <div className="mt-3 text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-1">
              <span>Prerequisites: {data.prerequisites}</span>
            </div>
          )}
        </div>

        {/* Instructions - Fixed for printing */}
        {data.instructions && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 print:bg-white print:border-black print:shadow-none print:p-3 print:mb-3">
            <h3 className="text-md font-semibold text-yellow-400 print:text-black mb-2 print:text-sm print:mb-1">Instructions:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-300 print:text-black print:text-xs space-y-1 print:space-y-0.5">
              {data.instructions.map((instruction, idx) => (
                <li key={idx} className="print:text-black print:leading-tight">{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sections */}
        {data.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8 print:mb-4">
            <div className="mb-3 print:mb-2">
              <h2 className="text-lg font-semibold text-white print:text-black print:text-base">
                Section {section.section}: {section.type}
              </h2>
              <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">
                ({section.totalQuestions} Questions × {section.marksPerQuestion} Marks)
              </p>
              {section.description && (
                <p className="text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-0.5">{section.description}</p>
              )}
            </div>

            <ol className="list-decimal pl-5 space-y-6 print:space-y-2">
              {section.questions.map((q, qIdx) => {
                const key = `${sectionIdx}-${qIdx}`;
                const isOpen = openAnswers[key];
                const hasCode = q.answer && hasJavaCode(q.answer);
                
                return (
                  <li key={qIdx} className="space-y-2 print:space-y-1">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-gray-200 print:text-black flex-1 font-medium print:text-sm">{q.q}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400 print:text-gray-600 font-mono print:text-xs">[{q.marks} marks]</span>
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
                    
                    {/* Question hints if available */}
                    {q.hint && (
                      <div className="text-xs text-gray-500 print:text-gray-600 italic pl-4 print:text-xs print:leading-tight">
                        💡 Hint: {q.hint}
                      </div>
                    )}
                    
                    {isLoggedIn && isOpen && q.answer && (
                      <div className={`answer-content mt-3 p-4 rounded-lg border ${hasCode ? 'bg-gray-850' : 'bg-gray-800'} print:bg-white border-gray-700 print:border-black print:p-2 print:mt-1`}>
                        <div className="text-sm print:text-xs">
                          <div className="text-emerald-400 print:text-black text-xs font-semibold mb-2 flex items-center gap-2 print:mb-1">
                            <span>📝 Answer:</span>
                            {hasCode && <span className="text-blue-400 print:text-gray-600">(Includes Java Code)</span>}
                          </div>
                          {formatAnswer(q.answer)}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-700 print:border-gray-300 text-center text-xs text-gray-500 print:text-gray-600 print:mt-4 print:pt-2">
          <p>© {new Date().getFullYear()} Java Question Paper - All Rights Reserved</p>
          <p className="mt-1 print:mt-0.5">Good Luck!</p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          /* Force black text on white background for all elements */
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:text-black {
            color: black !important;
          }
          
          .print\\:text-gray-600 {
            color: #4b5563 !important;
          }
          
          .print\\:border-black {
            border-color: black !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          /* Reduce line spacing for all text in print */
          body, div, p, li, span, h1, h2, h3, h4 {
            line-height: 1.2 !important;
          }
          
          /* Specific tighter spacing for lists */
          li, .list-disc li {
            line-height: 1.15 !important;
            margin-bottom: 2px !important;
          }
          
          /* Reduce spacing between sections */
          .mb-8 {
            margin-bottom: 0.75rem !important;
          }
          
          /* Reduce spacing between questions */
          .space-y-6 > * + * {
            margin-top: 0.5rem !important;
          }
          
          /* Tighter paragraph spacing */
          p {
            margin-bottom: 0.25rem !important;
            line-height: 1.2 !important;
          }
          
          /* Ensure code blocks print properly with reduced spacing */
          pre, code {
            background-color: #f3f4f6 !important;
            color: black !important;
            border: 1px solid #d1d5db !important;
            line-height: 1.2 !important;
            margin: 0.25rem 0 !important;
          }
          
          /* Reduce header spacing */
          h1, h2, h3 {
            margin-bottom: 0.25rem !important;
            margin-top: 0.25rem !important;
          }
          
          /* Reduce padding */
          .p-4 {
            padding: 0.5rem !important;
          }
          
          .p-6 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JavaQuestionPaperTemplate;