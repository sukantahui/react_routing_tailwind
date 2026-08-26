// SingleStudentMarksheet.jsx
import React, { useState, useRef } from 'react';
import { toJpeg } from 'html-to-image';

// Import signature images – adjust paths to match your project structure
import teacherSignature from '../../../public/assets/instructor-sign.png';
import principalSignature from '../../../public/assets/director-sign.png';

const extractQuestions = (input) => {
  if (Array.isArray(input)) {
    return input.map((q, idx) => ({
      id: idx,
      text: q.text || q.questionText || q.q,
      maxMarks: q.maxMarks || q.marks || 0,
    }));
  }
  if (input && input.sections) {
    const questions = [];
    input.sections.forEach((section) => {
      section.questions.forEach((q) => {
        questions.push({
          text: q.q,
          maxMarks: q.marks,
          section: section.section,
        });
      });
    });
    return questions;
  }
  return [];
};

const SingleStudentMarksheet = ({ questions: questionsProp, examData, paperTitle = "Marksheet" }) => {
  const source = questionsProp || examData;
  const questions = extractQuestions(source);
  const totalMaxMarks = questions.reduce((sum, q) => sum + q.maxMarks, 0);

  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState(questions.map(() => 0));
  const [showMarksheet, setShowMarksheet] = useState(false);
  const marksheetRef = useRef(null);

  const updateMark = (index, value) => {
    let numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    const maxMark = questions[index].maxMarks;
    const clamped = Math.min(Math.max(0, numValue), maxMark);
    const newMarks = [...marks];
    newMarks[index] = clamped;
    setMarks(newMarks);
    setShowMarksheet(false);
  };

  const handleGenerate = () => {
    if (!studentName.trim()) {
      alert('Please enter the student name.');
      return;
    }
    setShowMarksheet(true);
  };

  const handleReset = () => {
    setStudentName('');
    setMarks(questions.map(() => 0));
    setShowMarksheet(false);
  };

  const totalObtained = marks.reduce((sum, m) => sum + (typeof m === 'number' ? m : 0), 0);
  const percentage = totalMaxMarks > 0 ? ((totalObtained / totalMaxMarks) * 100).toFixed(1) : 0;

  const saveAsJpg = async () => {
    if (!marksheetRef.current) return;
    const originalBg = marksheetRef.current.style.background;
    const elementsWithBg = [];

    const clearBackgrounds = (element) => {
      if (!element) return;
      const computed = window.getComputedStyle(element);
      if (computed.backgroundColor !== 'rgba(0, 0, 0, 0)' && computed.backgroundColor !== 'transparent') {
        elementsWithBg.push({ el: element, bg: element.style.backgroundColor });
        element.style.backgroundColor = 'transparent';
      }
      for (let i = 0; i < element.children.length; i++) {
        clearBackgrounds(element.children[i]);
      }
    };

    marksheetRef.current.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    clearBackgrounds(marksheetRef.current);

    try {
      const dataUrl = await toJpeg(marksheetRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `marksheet_${studentName.replace(/\s+/g, '_')}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating JPG:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      marksheetRef.current.style.background = originalBg;
      for (let item of elementsWithBg) {
        item.el.style.backgroundColor = item.bg;
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 text-gray-800 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-blue-600">
        <h1 className="text-3xl font-bold text-gray-800">{paperTitle}</h1>
        <div className="text-gray-600 text-sm mt-2">
          Total Questions: {questions.length} | Total Marks: {totalMaxMarks}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
              setShowMarksheet(false);
            }}
            placeholder="e.g., Priya Verma"
            className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Marks per Question</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <span className="text-blue-600 font-mono text-sm font-medium">Q{idx + 1}</span>
                  <p className="text-gray-700 text-sm mt-1">{q.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Marks:</label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max={q.maxMarks}
                    value={marks[idx]}
                    onChange={(e) => updateMark(idx, e.target.value)}
                    className="w-24 p-2 text-center border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">/ {q.maxMarks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow transition"
          >
            📄 Generate Marksheet
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-xl text-sm font-medium transition"
          >
            🔄 Clear Form
          </button>
        </div>
      </div>

      {/* Marksheet Display */}
      {showMarksheet && (
        <div className="mt-6 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with student info */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6">
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white">{studentName}</h2>
                  <p className="text-blue-200 text-sm mt-1">{paperTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {totalObtained} / {totalMaxMarks}
                  </div>
                  <div className="text-sm text-blue-200">Percentage: {percentage}%</div>
                </div>
              </div>
            </div>

            {/* Marksheet content (for print & JPG) */}
            <div ref={marksheetRef} className="p-6 bg-white text-gray-800">
              {/* Question table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {questions.map((q, idx) => (
                      <tr key={idx} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 w-12 align-top text-gray-600 font-medium">Q{idx + 1}:</td>
                        <td className="py-3 text-gray-800">{q.text}</td>
                        <td className="py-3 text-center font-mono w-28 text-gray-700">
                          {marks[idx]} / {q.maxMarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signatures - placed side by side */}
              <div className="flex justify-between items-end mt-10 pt-4 border-t border-gray-200">
                {/* Teacher signature */}
                <div className="text-center w-1/2">
                  {teacherSignature ? (
                    <img 
                      src={teacherSignature} 
                      alt="Teacher Signature" 
                      className="h-20 object-contain mx-auto mb-2"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                  ) : null}
                  <div className="text-sm text-gray-500">Teacher's Signature</div>
                  <div className="text-xs text-gray-400 mt-1">(Instructor)</div>
                </div>

                {/* Principal signature */}
                <div className="text-center w-1/2">
                  {principalSignature ? (
                    <img 
                      src={principalSignature} 
                      alt="Principal Signature" 
                      className="h-20 object-contain mx-auto mb-2"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                  ) : null}
                  <div className="text-sm text-gray-500">Principal's Signature</div>
                  <div className="text-xs text-gray-400 mt-1">(Director)</div>
                </div>
              </div>

              {/* Date and result */}
              <div className="flex justify-between items-center pt-4 text-sm text-gray-500 mt-6">
                <span>📅 {new Date().toLocaleDateString()}</span>
                <span className="font-medium">
                  {percentage >= 40 ? '✅ Pass' : '❌ Needs Improvement'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="bg-gray-50 px-6 py-3 text-right text-xs text-gray-500">
              <button onClick={() => window.print()} className="text-blue-600 hover:text-blue-800 mr-4">
                🖨️ Print Marksheet
              </button>
              <button onClick={saveAsJpg} className="text-green-600 hover:text-green-800 mr-4">
                📸 Save as JPG
              </button>
              <button onClick={() => setShowMarksheet(false)} className="text-gray-500 hover:text-gray-700">
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .print-marksheet, .print-marksheet * {
            visibility: visible;
          }
          .print-marksheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SingleStudentMarksheet;