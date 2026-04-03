import { useState } from "react";

export default function GenericQuestionPaper({ 
  questionData, 
  organizationDetails,
  onAnswerToggle,
  customAnswerRenderer 
}) {
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = (sectionIdx, questionIdx) => {
    const newState = {
      ...showAnswers,
      [`${sectionIdx}-${questionIdx}`]: !showAnswers[`${sectionIdx}-${questionIdx}`]
    };
    setShowAnswers(newState);
    if (onAnswerToggle) onAnswerToggle(newState);
  };

  const defaultAnswerRenderer = (question, sectionIdx, questionIdx) => {
    const answerKey = `${sectionIdx}-${questionIdx}`;
    if (!showAnswers[answerKey]) return null;

    // Handle step-by-step answers
    if (question.steps) {
      return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">📝 Answer:</h4>
          {question.original && (
            <p className="text-gray-300 mb-2">
              <strong className="text-gray-200">Original:</strong> {question.original}
            </p>
          )}
          {question.simplified && (
            <p className="text-gray-300 mb-3">
              <strong className="text-gray-200">Simplified:</strong> {question.simplified}
            </p>
          )}
          {question.steps && (
            <div className="mb-3">
              <strong className="text-gray-200">Steps:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                {question.steps.map((step, idx) => (
                  <li key={idx} className="text-gray-300">
                    <strong className="text-gray-200">Step {step.step}:</strong> {step.action}<br />
                    <span className="ml-4">→ {step.expression}</span>
                    <span className="ml-2 text-sm text-gray-500">({step.law})</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {question.explanation && (
            <p className="text-gray-400 italic">
              <strong className="text-gray-200">Explanation:</strong> {question.explanation}
            </p>
          )}
        </div>
      );
    }

    // Handle truth tables
    if (question.truthTable) {
      const headers = Object.keys(question.truthTable[0]);
      return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">📝 Truth Table:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  {headers.map((header, idx) => (
                    <th key={idx} className="border border-gray-600 px-4 py-2 text-gray-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.truthTable.map((row, idx) => (
                  <tr key={idx} className="text-center hover:bg-gray-700 transition">
                    {headers.map((header, colIdx) => (
                      <td key={colIdx} className="border border-gray-600 px-4 py-1 text-gray-300">
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

    // Handle multiple choice
    if (question.options) {
      return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">📝 Answer:</h4>
          <p className="text-green-400 font-semibold">✓ {question.correctAnswer}</p>
          {question.explanation && (
            <p className="text-gray-300 mt-2">{question.explanation}</p>
          )}
        </div>
      );
    }

    // Handle code answers
    if (question.codeAnswer) {
      return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">📝 Answer:</h4>
          <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto">
            <code className="text-green-400">{question.codeAnswer}</code>
          </pre>
        </div>
      );
    }

    // Default simple answer
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-bold text-green-400 mb-2">📝 Answer:</h4>
        <p className="text-gray-300 whitespace-pre-wrap">{question.answer}</p>
      </div>
    );
  };

  const renderAnswer = customAnswerRenderer || defaultAnswerRenderer;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto bg-gray-900 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{organizationDetails?.name || "Question Paper"}</h1>
            {organizationDetails?.address && (
              <p className="text-sm mt-1 text-gray-300">{organizationDetails.address}</p>
            )}
            {organizationDetails?.phone && (
              <p className="text-sm text-gray-300">
                📞 {organizationDetails.phone} 
                {organizationDetails?.email && ` | ✉️ ${organizationDetails.email}`}
              </p>
            )}
            {organizationDetails?.website && (
              <p className="text-sm text-gray-300">🌐 {organizationDetails.website}</p>
            )}
          </div>
        </div>

        {/* Question Paper Title */}
        <div className="border-b border-gray-800 bg-gray-800/50 p-6">
          <h2 className="text-2xl font-bold text-gray-100 text-center">{questionData.title}</h2>
          <div className="flex justify-between mt-4 text-gray-400">
            {questionData.duration && <p>⏱️ Duration: {questionData.duration}</p>}
            {questionData.totalMarks && <p>📊 Total Marks: {questionData.totalMarks}</p>}
          </div>
        </div>

        {/* Sections */}
        <div className="p-6">
          {questionData.sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-8">
              <div className="bg-gray-800 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-400">
                  {section.section && `Section ${section.section}: `}{section.type}
                </h3>
                <p className="text-gray-400">
                  {section.marksPerQuestion && `Marks per question: ${section.marksPerQuestion}`}
                  {section.totalQuestions && ` | Total questions: ${section.totalQuestions}`}
                </p>
              </div>

              <div className="space-y-6">
                {section.questions.map((question, questionIdx) => (
                  <div key={questionIdx} className="border border-gray-800 rounded-lg p-4 hover:bg-gray-800/50 transition bg-gray-900">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-200">
                          {questionIdx + 1}. {question.q}
                        </p>
                        {question.marks && (
                          <p className="text-sm text-gray-500 mt-1">[Marks: {question.marks}]</p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleAnswer(sectionIdx, questionIdx)}
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium shadow-lg"
                      >
                        {showAnswers[`${sectionIdx}-${questionIdx}`] ? "Hide Answer" : "Show Answer"}
                      </button>
                    </div>
                    {renderAnswer(question, sectionIdx, questionIdx)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-4 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>© {new Date().getFullYear()} {organizationDetails?.name || "Organization"} | All Rights Reserved</p>
          <p className="text-xs mt-1 text-gray-500">This is a system-generated question paper. Please verify all questions before use.</p>
        </div>
      </div>
    </div>
  );
}