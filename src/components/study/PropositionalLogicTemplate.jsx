// PropositionalLogicTemplate.jsx (final version with jump-to-question)
import React, { useState, useRef } from 'react';

const PropositionalLogicTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState(() => {
    const allIds = {};
    data.questions.forEach(q => { allIds[q.id] = true; });
    return allIds;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [jumpToId, setJumpToId] = useState('');
  const questionRefs = useRef({});

  const toggleAnswer = (qId) => {
    setOpenAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const showAllAnswers = () => {
    const allOpen = {};
    data.questions.forEach(q => { allOpen[q.id] = true; });
    setOpenAnswers(allOpen);
  };

  const hideAllAnswers = () => setOpenAnswers({});

  const toggleSelectQuestion = (qId) => {
    setSelectedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const selectAll = () => {
    const allSelected = {};
    data.questions.forEach(q => { allSelected[q.id] = true; });
    setSelectedQuestions(allSelected);
  };

  const deselectAll = () => setSelectedQuestions({});

  // Filter questions based on search term (ID, text, type, answer)
  const filteredQuestions = data.questions.filter(q => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.id.toString().includes(term) ||
      q.questionText.toLowerCase().includes(term) ||
      (q.type && q.type.toLowerCase().includes(term)) ||
      (q.correctAnswer && q.correctAnswer.toLowerCase().includes(term))
    );
  });

  // Jump to a specific question by original ID
  const handleJumpToQuestion = () => {
    const idNum = parseInt(jumpToId);
    if (isNaN(idNum)) {
      alert('Please enter a valid question ID (number)');
      return;
    }
    const targetRef = questionRefs.current[idNum];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add temporary highlight
      targetRef.style.transition = 'background-color 0.3s';
      targetRef.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
      setTimeout(() => {
        targetRef.style.backgroundColor = '';
      }, 1500);
    } else {
      alert(`Question with ID ${idNum} not found.`);
    }
    setJumpToId('');
  };

  // Helper: parse duration string to minutes
  const parseDurationToMinutes = (durationStr) => {
    const str = durationStr.toLowerCase();
    if (str.includes('hour')) {
      const hours = parseInt(str) || 1;
      return hours * 60;
    }
    const minutes = parseInt(str);
    return isNaN(minutes) ? 60 : minutes;
  };

  // Helper: format minutes to a readable string
  const formatMinutesToDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes` : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${minutes} minutes`;
  };

  // Professional print styles (compact, exam-paper look)
  const printStyles = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Times New Roman', Times, serif;
        background: white;
        color: black;
        padding: 0.6in;
        font-size: 11pt;
        line-height: 1.35;
      }
      .paper { max-width: 100%; }
      .exam-header {
        text-align: center;
        margin-bottom: 1.2rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #000;
      }
      .exam-title {
        font-size: 18pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .exam-subtitle {
        font-size: 12pt;
        margin-top: 0.25rem;
      }
      .exam-meta {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 10pt;
      }
      .organization-details {
        font-size: 9pt;
        margin-top: 0.3rem;
        color: #333;
        text-align: center;
      }
      .instructions {
        margin: 0.75rem 0;
        font-size: 10pt;
        border: 1px solid #aaa;
        padding: 0.5rem 0.75rem;
        background: #f9f9f9;
      }
      .question-item {
        margin-bottom: 1rem;
        page-break-inside: avoid;
      }
      .question-header {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }
      .q-no {
        font-weight: bold;
        font-size: 11pt;
      }
      .q-marks {
        font-size: 10pt;
        color: #444;
      }
      .q-type {
        font-size: 9pt;
        background: #eee;
        padding: 0 0.3rem;
        border-radius: 2px;
      }
      .question-text {
        font-weight: 500;
        margin: 0.25rem 0 0.5rem 1rem;
      }
      .options {
        margin-left: 1.5rem;
        margin-top: 0.3rem;
      }
      .option {
        margin-bottom: 0.2rem;
      }
      .option-letter {
        font-weight: bold;
        margin-right: 0.5rem;
      }
      .answer-line {
        margin-top: 0.5rem;
        margin-left: 1rem;
        border-top: 1px dashed #000;
        width: 70%;
      }
      .answer-label {
        font-size: 9pt;
        font-style: italic;
        margin-left: 1rem;
      }
      .page-footer {
        margin-top: 1rem;
        text-align: center;
        font-size: 9pt;
        border-top: 1px solid #ccc;
        padding-top: 0.3rem;
      }
      @media print {
        body { padding: 0.5in; }
        .no-print { display: none; }
        .question-item { break-inside: avoid; }
      }
    </style>
  `;

  // Render a single question for print (NO answers)
  // Render a single question for print (NO answers) - includes original ID
const renderQuestionForPrint = (q, idx) => {
  const questionNumber = idx + 1;
  return `
    <div class="question-item">
      <div class="question-header">
        <span class="q-no">${questionNumber}. (ID: ${q.id})</span>
        <span class="q-marks">[${q.marks}]</span>
        <span class="q-type">${q.type.toUpperCase()}</span>
      </div>
      <div class="question-text">${q.questionText}</div>
      ${q.options ? `
        <div class="options">
          ${q.options.map((opt, optIdx) => `
            <div class="option">
              <span class="option-letter">${String.fromCharCode(65+optIdx)}.</span> ${opt}
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${(q.type === 'direct' || q.type === 'fill') ? `
        <div class="answer-line"></div>
        <div class="answer-label">Answer: ____________________</div>
      ` : ''}
    </div>
  `;
};

  // Generate complete HTML for printing with dynamic marks, time, and organization details
  const getPrintHtml = (questionsHtml, totalMarks, durationStr, isSelected = false) => {
    const titleSuffix = isSelected ? ' (Selected Questions)' : '';
    const orgName = organizationDetails.name || 'Coder & AccoTax';
    const contact = organizationDetails.contact || '7003756860';
    const email = organizationDetails.email || 'info@codernaccotax.co.in';
    const website = organizationDetails.website || 'www.codernaccotax.co.in';
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Question Paper - ${data.title}${titleSuffix}</title>
          ${printStyles}
        </head>
        <body>
          <div class="paper">
            <div class="exam-header">
              <div class="exam-title">${data.title}${titleSuffix}</div>
              <div class="exam-subtitle">Propositional Logic</div>
              <div class="exam-meta">
                <span>Paper ID: ${data.paperId}</span>
                <span>Time: ${durationStr}</span>
                <span>Total Marks: ${totalMarks}</span>
              </div>
              <div class="organization-details">
                ${orgName} | Contact: ${contact} | Email: ${email} | ${website}
              </div>
            </div>
            <div class="instructions">
              <strong>Instructions:</strong> Answer all questions. For MCQs, choose the correct option. For direct/fill questions, write your answer in the space provided.
            </div>
            <div class="questions-list">
              ${questionsHtml}
            </div>
            <div class="page-footer">
              © ${new Date().getFullYear()} ${orgName} - All Rights Reserved
            </div>
          </div>
        </body>
      </html>
    `;
  };

  // Print full paper (all questions, original marks & time)
  const printFullPaper = () => {
    const allQuestionsHtml = data.questions.map((q, idx) => renderQuestionForPrint(q, idx)).join('');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(getPrintHtml(allQuestionsHtml, data.totalMarks, data.duration, false));
    printWindow.document.close();
    printWindow.print();
  };

  // Print selected questions with recalculated marks and proportional time
  const printSelected = () => {
    const selected = data.questions.filter(q => selectedQuestions[q.id]);
    if (selected.length === 0) {
      alert('Please select at least one question to print.');
      return;
    }
    const selectedMarks = selected.reduce((sum, q) => sum + q.marks, 0);
    const originalMinutes = parseDurationToMinutes(data.duration);
    const totalOriginalMarks = data.totalMarks;
    const proportionalMinutes = Math.round((selectedMarks / totalOriginalMarks) * originalMinutes);
    const selectedDuration = formatMinutesToDuration(proportionalMinutes);
    const selectedHtml = selected.map((q, idx) => renderQuestionForPrint(q, idx)).join('');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(getPrintHtml(selectedHtml, selectedMarks, selectedDuration, true));
    printWindow.document.close();
    printWindow.print();
  };

  // ---------- On‑screen rendering (interactive) ----------
  const renderTruthTable = (truthTable) => {
    if (!truthTable || !truthTable.headers || !truthTable.rows) return null;
    return (
      <div className="mt-4">
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📊 Truth Table</strong>
        <div className="overflow-x-auto mt-2 rounded-lg border border-gray-600">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700">
                {truthTable.headers.map((h, idx) => <th key={idx} className="border border-gray-600 px-4 py-2">{h}</th>)}
              </tr>
            </thead>
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
        <strong className="text-yellow-400 text-sm uppercase tracking-wide">📖 Key Definitions</strong>
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
    const isSelected = selectedQuestions[q.id] || false;

    return (
      <div
        key={q.id}
        ref={el => questionRefs.current[q.id] = el}
        className="bg-gray-800/40 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all mb-6"
      >
        <div className="p-4 md:p-5">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isLoggedIn && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectQuestion(q.id)}
                    className="w-4 h-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                )}
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
        <button onClick={printFullPaper} className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
          🖨️ Print Full Paper (No Answers)
        </button>
        {isLoggedIn && (
          <>
            <button onClick={printSelected} className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-500 text-white">
              🖨️ Print Selected (No Answers)
            </button>
            <button onClick={showAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-500 text-white">
              Show All Answers
            </button>
            <button onClick={hideAllAnswers} className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white">
              Hide All Answers
            </button>
            <button onClick={selectAll} className="px-3 py-2 text-sm rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
              Select All
            </button>
            <button onClick={deselectAll} className="px-3 py-2 text-sm rounded-lg bg-gray-600 hover:bg-gray-500 text-white">
              Deselect All
            </button>
          </>
        )}
      </div>

      {/* Search and Jump to Question */}
      {isLoggedIn && (
        <div className="mb-6 no-print space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search questions by ID, keyword, type, or answer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Jump to Question ID (e.g., 23)"
              value={jumpToId}
              onChange={(e) => setJumpToId(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleJumpToQuestion()}
            />
            <button
              onClick={handleJumpToQuestion}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Jump
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {searchTerm ? `Found ${filteredQuestions.length} of ${data.questions.length} questions` : `${data.questions.length} questions total`}
          </div>
        </div>
      )}

      {/* On‑screen interactive view (filtered when search is active) */}
      <div>
        <div className="text-center border-b border-gray-700 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{data.title}</h1>
          <p className="text-sm text-gray-400 mt-1">Paper ID: {data.paperId}</p>
          <div className="flex justify-center gap-6 mt-3 text-sm text-gray-400">
            <span>⏱️ {data.duration}</span>
            <span>📝 Total Marks: {data.totalMarks}</span>
          </div>
        </div>
        <div className="space-y-6">
          {(searchTerm ? filteredQuestions : data.questions).map(q => renderQuestion(q))}
        </div>
      </div>
    </div>
  );
};

export default PropositionalLogicTemplate;