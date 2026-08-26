// PropositionalLogicARTemplate.jsx (final with playground + reason discussion)
import React, { useState } from 'react';
import PrintButton from '../../common/PrintButton';
import clsx from 'clsx';

// ============================================================
// ⚡ INTERACTIVE LOGIC PLAYGROUND (for testing implications)
// ============================================================
const LogicPlayground = () => {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);

  const notP = !p;
  const and = p && q;
  const or = p || q;
  const implies = !p || q;      // p ⇒ q
  const iff = p === q;          // p ⇔ q

  const TruthBox = ({ label, value, description }) => (
    <div className={clsx(
      "p-3 rounded-lg text-center transition-all duration-200",
      "hover:scale-105 hover:shadow-md",
      value 
        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700" 
        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700"
    )}>
      <div className="font-bold text-lg">{label}</div>
      <div className="text-2xl font-mono mt-1">
        {value ? "TRUE ✔" : "FALSE ❌"}
      </div>
      <div className="text-xs mt-1 opacity-75">{description}</div>
    </div>
  );

  return (
    <div className="mb-8 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-blue-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-center mb-3 text-blue-700 dark:text-blue-300">
        ⚡ Logic Playground – Test Implication & Connectives
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
        Click buttons to change p and q – watch how implication (p ⇒ q) behaves.
      </p>

      <div className="flex justify-center gap-6 mb-5">
        <button
          onClick={() => setP(!p)}
          className={clsx(
            "px-5 py-2 rounded-lg font-bold text-white transition-all duration-200",
            "hover:scale-105 hover:shadow-md",
            p ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          )}
        >
          p = {p ? "TRUE" : "FALSE"}
        </button>
        <button
          onClick={() => setQ(!q)}
          className={clsx(
            "px-5 py-2 rounded-lg font-bold text-white transition-all duration-200",
            "hover:scale-105 hover:shadow-md",
            q ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          )}
        >
          q = {q ? "TRUE" : "FALSE"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <TruthBox label="¬p (NOT)" value={notP} description="Opposite of p" />
        <TruthBox label="p ∧ q (AND)" value={and} description="True only if both true" />
        <TruthBox label="p ∨ q (OR)" value={or} description="True if at least one true" />
        <TruthBox label="p ⇒ q (Implication)" value={implies} description="False only when p=T, q=F" />
        <TruthBox label="p ⇔ q (IFF)" value={iff} description="True when p and q same" />
      </div>

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
        💡 <strong>Remember:</strong> Implication (p ⇒ q) is <strong>false only when p is true and q is false</strong>. All other cases are true.
      </div>
    </div>
  );
};

// ============================================================
// MAIN TEMPLATE COMPONENT
// ============================================================
const PropositionalLogicARTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});

  const toggleAnswer = (qId) => {
    setOpenAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const showAllAnswers = () => {
    const allOpen = {};
    data.sections.forEach(section => {
      section.questions.forEach(q => {
        allOpen[q.id] = true;
      });
    });
    setOpenAnswers(allOpen);
  };

  const hideAllAnswers = () => {
    setOpenAnswers({});
  };

  const renderTruthTable = (truthTable) => {
    if (!truthTable || !truthTable.headers || !truthTable.rows) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📊 Truth Table</strong>
        <div className="overflow-x-auto mt-2 rounded-lg border border-gray-600">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700">
                {truthTable.headers.map((h, idx) => (
                  <th key={idx} className="border border-gray-600 px-4 py-2 font-semibold text-gray-200">{h}</th>
                ))}
               </tr>
            </thead>
            <tbody>
              {truthTable.rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800'}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-600 px-4 py-2 text-center font-mono">{cell}</td>
                  ))}
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
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📖 Key Definitions</strong>
        <div className="mt-2 space-y-2">
          {definitions.map((def, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-2 border-l-4 border-blue-500">
              <span className="font-mono font-bold text-blue-300">{def.term}</span>
              <span className="text-gray-300 ml-2">—</span>
              <span className="text-gray-300">{def.definition}</span>
              {def.example && (
                <div className="mt-1 text-xs text-gray-400 italic">Example: {def.example}</div>
              )}
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
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📝 Step-by-Step Reasoning</strong>
        <div className="mt-2 space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-gray-700/30 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-gray-200">{step.action}</div>
                  <div className="mt-1 font-mono text-sm text-gray-300">
                    {step.expression}
                    <span className="text-gray-500 ml-2">({step.law})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOptions = (question) => {
    const optionLabels = ['A', 'B', 'C', 'D', 'E'];
    return (
      <div className="mt-3">
        <strong className="text-blue-400 text-sm uppercase tracking-wide">📋 Options</strong>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {question.options.map((opt, idx) => (
            <div key={idx} className="p-2 rounded border border-gray-600 bg-gray-800/30">
              <span className="font-bold text-gray-300">{optionLabels[idx]}:</span>{' '}
              <span className="text-gray-300">{opt}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDetailedAnswer = (question) => {
    const exp = question.explanation;
    const optionLabels = ['A', 'B', 'C', 'D', 'E'];
    const correctOptionLetter = question.correctOption;
    const correctOptionText = question.options[optionLabels.indexOf(correctOptionLetter)];
    return (
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-900/50 rounded-full px-3 py-1">
          <span className="text-green-400 font-bold">✓ Correct Option:</span>
          <span className="font-mono text-green-300 font-bold text-lg">{correctOptionLetter}</span>
          <span className="text-gray-400 text-sm ml-1">– {correctOptionText}</span>
        </div>
        
        {/* Reason Discussion - New Section */}
        {question.reasonDiscussion && (
          <div className="bg-amber-900/30 border-l-4 border-amber-500 rounded p-3">
            <strong className="text-amber-400">🧠 Detailed Reason Discussion</strong>
            <p className="mt-2 text-gray-200 leading-relaxed">{question.reasonDiscussion}</p>
          </div>
        )}

        {typeof exp === 'object' && exp !== null ? (
          <>
            {exp.summary && (
              <div className="bg-purple-900/30 border-l-4 border-purple-500 rounded p-3">
                <strong className="text-purple-400">📌 Summary</strong>
                <p className="mt-1 text-gray-300">{exp.summary}</p>
              </div>
            )}
            {renderDefinitions(exp.definitions)}
            {renderSteps(exp.steps)}
            {renderTruthTable(exp.truthTable)}
            {exp.finalRemark && (
              <div className="bg-gray-700/50 rounded p-3 border border-gray-600">
                <strong className="text-purple-400">💡 Final Remark</strong>
                <p className="mt-1 text-gray-300">{exp.finalRemark}</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-700/50 rounded p-3 border border-gray-600">
            <strong className="text-purple-400">💡 Explanation</strong>
            <p className="mt-1 text-gray-300">{exp}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-900 shadow-2xl rounded-xl text-gray-100">
      <div className="flex flex-wrap justify-end gap-3 mb-6 no-print">
        <PrintButton targetId="print-content" title={data.title} organizationDetails={organizationDetails} />
        {isLoggedIn && (
          <>
            <button onClick={showAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-500 text-white transition-all duration-200 shadow-md hover:shadow-lg">Show All Answers</button>
            <button onClick={hideAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all duration-200 shadow-md hover:shadow-lg">Hide All Answers</button>
          </>
        )}
      </div>

      <div id="print-content">
        <div className="text-center border-b border-gray-700 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{data.title}</h1>
          <p className="text-sm text-gray-400 mt-1">Paper ID: {data.paperId}</p>
          <div className="flex justify-center gap-6 mt-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">⏱️ {data.duration}</span>
            <span className="flex items-center gap-1">📝 Total Marks: {data.totalMarks}</span>
          </div>
        </div>

        {/* Interactive Playground – helps with implication concepts */}
        <LogicPlayground />

        {data.sections.map((section, secIdx) => (
          <div key={secIdx} className="mb-10">
            <div className="mb-4 pb-2 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="bg-blue-600 w-7 h-7 rounded-full inline-flex items-center justify-center text-sm">{section.section}</span>
                {section.type}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{section.totalQuestions} Questions × {section.marksPerQuestion} Mark{section.marksPerQuestion !== 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-5">
              {section.questions.map((q) => {
                const isOpen = openAnswers[q.id];
                return (
                  <div key={q.id} className="bg-gray-800/40 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600">
                    <div className="p-4 md:p-5">
                      <div className="flex flex-col md:flex-row justify-between gap-3">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-cyan-400 text-lg bg-gray-800/50 px-2 py-0.5 rounded whitespace-nowrap">
                              Q{q.id}. Assertion:
                            </span>
                            <p className="text-gray-200 font-medium leading-relaxed">{q.assertion}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-cyan-400 text-lg bg-gray-800/50 px-2 py-0.5 rounded whitespace-nowrap">
                              Reason:
                            </span>
                            <p className="text-gray-200 font-medium leading-relaxed">{q.reason}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">[{q.marks} mark{q.marks !== 1 ? 's' : ''}]</span>
                          {isLoggedIn && (
                            <button onClick={() => toggleAnswer(q.id)} className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 shadow ${isOpen ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                              {isOpen ? 'Hide Answer' : 'Show Answer'}
                            </button>
                          )}
                        </div>
                      </div>

                      {renderOptions(q)}
                      {isLoggedIn && isOpen && (
                        <div className="answer-content mt-5 pt-4 border-t border-gray-700">
                          {renderDetailedAnswer(q)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden print:block text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-700">
        <p>© {new Date().getFullYear()} {organizationDetails.name || 'Coder & AccoTax'} - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default PropositionalLogicARTemplate;