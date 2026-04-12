// PropositionalLogicTemplate.jsx
import React, { useState } from 'react';
import PrintButton from '../../common/PrintButton';

const PropositionalLogicTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});

  const toggleAnswer = (qId) => {
    setOpenAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const showAllAnswers = () => {
    const allOpen = {};
    data.questions.forEach(q => { allOpen[q.id] = true; });
    setOpenAnswers(allOpen);
  };

  const hideAllAnswers = () => setOpenAnswers({});

  const renderTruthTable = (truthTable) => {
    if (!truthTable || !truthTable.headers || !truthTable.rows) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📊 Truth Table</strong>
        <div className="overflow-x-auto mt-2 rounded-lg border border-gray-600">
          <table className="min-w-full border-collapse text-sm">
            <thead><tr className="bg-gray-700">
              {truthTable.headers.map((h, idx) => <th key={idx} className="border border-gray-600 px-4 py-2">{h}</th>)}
            </tr></thead>
            <tbody>
              {truthTable.rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800'}>
                  {row.map((cell, j) => <td key={j} className="border border-gray-600 px-4 py-2 text-center font-mono">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDefinitions = (definitions) => {
    if (!definitions || definitions.length === 0) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📖 Key Definitions & Pronunciation</strong>
        <div className="mt-2 space-y-2">
          {definitions.map((def, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-2 border-l-4 border-blue-500">
              <span className="font-mono font-bold text-blue-300">{def.term}</span>
              {def.pronunciation && <span className="text-green-400 text-xs ml-2">/{def.pronunciation}/</span>}
              <span className="text-gray-300 ml-2">—</span>
              <span className="text-gray-300">{def.definition}</span>
              {def.example && <div className="text-gray-400 text-sm mt-1">📘 Example: {def.example}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSteps = (steps) => {
    if (!steps || steps.length === 0) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📝 Step-by-Step Solution</strong>
        <div className="mt-2 space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-gray-700/30 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{idx+1}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-200">{step.action}</div>
                  <div className="mt-1 font-mono text-sm text-gray-300">{step.expression}<span className="text-gray-500 ml-2">({step.law})</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHints = (hints) => {
    if (!hints || hints.length === 0) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">💡 Hints</strong>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          {hints.map((hint, idx) => <li key={idx}>{hint}</li>)}
        </ul>
      </div>
    );
  };

  const renderQuestion = (q) => {
    const isOpen = openAnswers[q.id];
    return (
      <div key={q.id} className="bg-gray-800/40 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all mb-6">
        <div className="p-4 md:p-5">
          {/* Question header */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Q{q.id}</span>
                <span className="text-gray-400 text-sm">[{q.marks} mark{q.marks !== 1 ? 's' : ''}]</span>
                {q.type && <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded capitalize">{q.type}</span>}
              </div>
              <p className="text-gray-200 text-lg font-medium">{q.questionText}</p>
              {q.options && q.type === 'mcq' && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => (
                    <div key={idx} className="p-2 border border-gray-600 rounded bg-gray-800/30">
                      <span className="font-bold text-gray-300">{String.fromCharCode(65+idx)}.</span> {opt}
                    </div>
                  ))}
                </div>
              )}
              {q.type === 'fill' && (
                <div className="mt-3 p-2 border border-dashed border-gray-500 rounded bg-gray-800/20">
                  <span className="text-gray-400">Answer: ________</span>
                </div>
              )}
              {q.type === 'direct' && (
                <div className="mt-3 text-gray-400 italic">Provide your answer below.</div>
              )}
            </div>
            {isLoggedIn && (
              <button onClick={() => toggleAnswer(q.id)} className={`px-4 py-1.5 text-sm rounded-lg font-medium shadow ${isOpen ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}>
                {isOpen ? 'Hide Answer' : 'Show Answer'}
              </button>
            )}
          </div>

          {/* Answer section (only when logged in and toggled) */}
          {isLoggedIn && isOpen && (
            <div className="answer-content mt-5 pt-4 border-t border-gray-700">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-green-900/50 rounded-full px-3 py-1">
                  <span className="text-green-400 font-bold">✓ Correct Answer:</span>
                  <span className="font-mono text-green-300 font-bold">{q.correctAnswer}</span>
                </div>
                {q.steps && renderSteps(q.steps)}
                {q.definitions && renderDefinitions(q.definitions)}
                {q.truthTable && renderTruthTable(q.truthTable)}
                {q.hints && renderHints(q.hints)}
                {q.explanation && (
                  <div className="bg-gray-700/50 rounded p-3 border border-gray-600">
                    <strong className="text-purple-400">📘 Explanation</strong>
                    <p className="mt-1 text-gray-300">{q.explanation}</p>
                  </div>
                )}
                {q.finalRemark && (
                  <div className="bg-gray-700/30 rounded p-2 text-sm text-gray-400 italic">
                    💭 {q.finalRemark}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-900 shadow-2xl rounded-xl text-gray-100">
      <div className="flex flex-wrap justify-end gap-3 mb-6 no-print">
        <PrintButton targetId="print-content" title={data.title} organizationDetails={organizationDetails} />
        {isLoggedIn && (
          <>
            <button onClick={showAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-500 text-white">Show All Answers</button>
            <button onClick={hideAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white">Hide All Answers</button>
          </>
        )}
      </div>

      <div id="print-content">
        <div className="text-center border-b border-gray-700 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{data.title}</h1>
          <p className="text-sm text-gray-400 mt-1">Paper ID: {data.paperId}</p>
          <div className="flex justify-center gap-6 mt-3 text-sm text-gray-400">
            <span>⏱️ {data.duration}</span>
            <span>📝 Total Marks: {data.totalMarks}</span>
          </div>
        </div>

        <div className="space-y-6">
          {data.questions.map(q => renderQuestion(q))}
        </div>
      </div>

      <div className="hidden print:block text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-700">
        <p>© {new Date().getFullYear()} {organizationDetails.name || 'Coder & AccoTax'} - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default PropositionalLogicTemplate;