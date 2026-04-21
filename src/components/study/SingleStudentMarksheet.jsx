// SingleStudentMarksheet.jsx
import React, { useState, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import cnatLogo from '/og-banner.png'; // place your logo in public/ folder

const extractQuestions = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((q, idx) => ({
      id: idx,
      text: q.text || q.questionText || q.q || '',
      maxMarks: q.maxMarks || q.marks || 0,
    }));
  }
  if (input && input.sections) {
    const questions = [];
    input.sections.forEach((section) => {
      if (section.questions && Array.isArray(section.questions)) {
        section.questions.forEach((q) => {
          questions.push({
            text: q.q || '',
            maxMarks: q.marks || 0,
            section: section.section,
          });
        });
      }
    });
    return questions;
  }
  return [];
};

const SingleStudentMarksheet = ({
  questions: questionsProp,
  examData,
  paperTitle = "Marksheet",
  organizationName = "Coder & AccoTax",
}) => {
  const source = questionsProp || examData;
  const questions = extractQuestions(source);
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const totalMaxMarks = safeQuestions.reduce((sum, q) => sum + (q.maxMarks || 0), 0);

  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState(safeQuestions.map(() => 0));
  const [showMarksheet, setShowMarksheet] = useState(false);
  const marksheetRef = useRef(null);

  const institutionDetails = {
    website: "https://codernaccotax.co.in",
    phone: "7003756860",
    address: "25(10/A) Shibtala Road, PO - N C Pukur, Barrackpore, PI - 700122"
  };

  const updateMark = (index, value) => {
    let numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    const maxMark = safeQuestions[index]?.maxMarks || 0;
    const clamped = Math.min(Math.max(0, numValue), maxMark);
    const newMarks = [...marks];
    newMarks[index] = clamped;
    setMarks(newMarks);
    setShowMarksheet(false);
  };

  // ✅ Full Marks button handler
  const setFullMarks = () => {
    const fullMarks = safeQuestions.map(q => q.maxMarks);
    setMarks(fullMarks);
    setShowMarksheet(false);
  };

  const handleGenerate = () => {
    if (!studentName.trim()) {
      alert('Please enter the student name.');
      return;
    }
    if (safeQuestions.length === 0) {
      alert('No questions loaded. Please check your data source.');
      return;
    }
    setShowMarksheet(true);
  };

  const handleReset = () => {
    setStudentName('');
    setMarks(safeQuestions.map(() => 0));
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
        elementsWithBg.push({
          el: element,
          bg: element.style.backgroundColor,
        });
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
      const safeName = studentName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeName}-marksheet.jpg`;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full overflow-hidden">
        <div className="grid lg:grid-cols-1 gap-0">
          {/* Dark Mode Form Panel */}
          <div className="p-8 lg:p-10 bg-gray-900 text-white border-r border-gray-700">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Student Marksheet
            </h2>
            <p className="text-gray-400 mb-8">Enter details & marks (decimal values allowed, e.g., 1.5)</p>

            <div className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => { setStudentName(e.target.value); setShowMarksheet(false); }}
                  placeholder="e.g., Priya Verma"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              {/* Marks per Question */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Marks per Question
                </label>
                <div className="space-y-3  overflow-y-auto pr-2 custom-scroll">
                  {safeQuestions.map((q, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-purple-500 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1">
                          <span className="text-purple-400 font-mono text-sm font-semibold">Q{idx + 1}</span>
                          <p className="text-gray-300 text-sm mt-1">{q.text}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-400">Marks:</label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max={q.maxMarks}
                            value={marks[idx]}
                            onChange={(e) => updateMark(idx, e.target.value)}
                            className="w-24 p-1.5 text-center bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => updateMark(idx, q.maxMarks)}
                            className="px-2 py-1 text-xs bg-green-600 hover:bg-green-500 rounded text-white"
                            title="Full marks for this question"
                          >
                            Full
                          </button>
                          <span className="text-sm text-gray-400">/ {q.maxMarks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons - including Full Marks */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={handleGenerate}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition shadow-lg"
                >
                  📄 Generate Marksheet
                </button>
                <button
                  onClick={setFullMarks}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 focus:ring-4 focus:ring-green-300 transition shadow-lg"
                >
                  ⭐ Full Marks
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 hover:border-gray-500 focus:ring-4 focus:ring-gray-600 transition"
                >
                  🔄 Clear Form
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel - Shows full marksheet */}
          <div className="bg-gray-100 p-8 lg:p-10 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 self-start">Live Preview</h3>
            <div className="w-full flex justify-center">
              {!showMarksheet ? (
                <div className="w-full border shadow-lg rounded-lg bg-white p-8 text-center">
                  <p className="text-gray-500">Fill the form and click "Generate Marksheet"</p>
                </div>
              ) : (
                <div className="print-marksheet w-full max-w-2xl border shadow-xl rounded-lg bg-white overflow-hidden">
                  <div ref={marksheetRef} className="p-6 text-black" style={{ background: 'white' }}>
                    {/* Header with Logo - added pt-4 for space */}
                    <div className="text-center border-b-2 border-gray-300 pb-4 mb-6 pt-4">
                      <img src={cnatLogo} alt="Logo" className="mx-auto mb-3 max-w-[60px]" />
                      <div className="text-2xl font-bold uppercase text-gray-800">{organizationName}</div>
                      <div className="text-sm text-gray-700">{institutionDetails.website} | 📞 {institutionDetails.phone}</div>
                      <div className="text-xs text-gray-700 mt-1">{institutionDetails.address}</div>
                      <div className="text-xl font-semibold mt-3 text-gray-800">{paperTitle}</div>
                      <div className="text-sm text-gray-700">(Academic Year 2025-2026)</div>
                    </div>

                    {/* Student Details */}
                    <div className="border border-gray-300 p-4 mb-6 rounded">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><strong>Student's Name:</strong> {studentName}</div>
                        <div><strong>Roll No:</strong> ___________</div>
                        <div><strong>Date of Issue:</strong> {new Date().toLocaleDateString()}</div>
                        <div><strong>Total Marks:</strong> {totalMaxMarks}</div>
                      </div>
                    </div>

                    {/* Full Question Table */}
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Q.No.</th>
                          <th className="border border-gray-300 p-2 text-left">Question</th>
                          <th className="border border-gray-300 p-2 text-center">Max Marks</th>
                          <th className="border border-gray-300 p-2 text-center">Obtained</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safeQuestions.map((q, idx) => (
                          <tr key={idx}>
                            <td className="border border-gray-300 p-2">{idx + 1}</td>
                            <td className="border border-gray-300 p-2">{q.text}</td>
                            <td className="border border-gray-300 p-2 text-center">{q.maxMarks}</td>
                            <td className="border border-gray-300 p-2 text-center">{marks[idx]}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-gray-50">
                          <td colSpan="2" className="border border-gray-300 p-2 text-right">TOTAL</td>
                          <td className="border border-gray-300 p-2 text-center">{totalMaxMarks}</td>
                          <td className="border border-gray-300 p-2 text-center">{totalObtained}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Percentage & Grade */}
                    <div className="flex justify-between mt-4 p-3 border border-gray-300 bg-gray-50 rounded">
                      <span><strong>Percentage:</strong> {percentage}%</span>
                      <span><strong>Grade:</strong> {
                        percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : percentage >= 40 ? 'D' : 'F'
                      }</span>
                      <span><strong>Result:</strong> {percentage >= 40 ? 'PASS' : 'FAIL'}</span>
                    </div>

                    {/* Signatures with images */}
                    <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-300">
                      {/* Teacher Signature */}
                      <div className="text-center w-1/2">
                        <img
                          src="/assets/instructor-sign.png"
                          alt="Teacher Signature"
                          className="h-8 object-contain mx-auto mb-2"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="text-sm text-gray-700">Teacher's Signature</div>
                        <div className="text-xs text-gray-600">(Instructor)</div>
                      </div>
                      {/* Principal Signature */}
                      <div className="text-center w-1/2">
                        <img
                          src="/assets/director-sign.png"
                          alt="Principal Signature"
                          className="h-8 object-contain mx-auto mb-2"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="text-sm text-gray-700">Principal's Signature</div>
                        <div className="text-xs text-gray-600">(Director)</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-700 mt-8 border-t pt-2">
                      {organizationName} • {institutionDetails.website} • {institutionDetails.phone}<br />
                      {institutionDetails.address}
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-3 text-right text-xs no-print">
                    <button onClick={() => window.print()} className="text-blue-600 hover:text-blue-800 mr-4 font-medium">🖨️ Print Marksheet</button>
                    <button onClick={saveAsJpg} className="text-green-600 hover:text-green-800 mr-4 font-medium">📸 Save as JPG</button>
                    <button onClick={() => setShowMarksheet(false)} className="text-gray-500 hover:text-gray-700">✖ Close</button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Full marksheet shows all questions. Click "Generate" to update.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, .min-h-screen, .bg-gradient-to-br { background: white !important; padding: 0 !important; margin: 0 !important; }
          .print-marksheet { display: block !important; background: white !important; color: black !important; box-shadow: none !important; }
          .print-marksheet * { color: black !important; background: transparent !important; }
          .print-marksheet table, .print-marksheet th, .print-marksheet td { border: 1px solid #000 !important; background: transparent !important; }
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SingleStudentMarksheet;