import React, { useState } from 'react';
import cnatLogo from '/og-banner.png';

// ================= QUESTION EXTRACTION =================
const extractQuestions = (input) => {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.map((q, idx) => ({
      id: idx,
      text: q.text || q.questionText || q.q || 'Question not available',
      maxMarks: q.maxMarks || q.marks || 0,
    }));
  }

  if (input.sections) {
    let arr = [];
    input.sections.forEach((sec) => {
      sec.questions?.forEach((q) => {
        arr.push({
          text: q.q || 'Question not available',
          maxMarks: q.marks || 0,
        });
      });
    });
    return arr;
  }

  return [];
};

const SingleStudentMarksheet = ({
  questions,
  examData,
  paperTitle = "Java Arrays – Practice Paper",
  organizationName = "Coder & AccoTax",
}) => {

  const safeQuestions = extractQuestions(questions || examData);

  const totalMaxMarks = safeQuestions.reduce((s, q) => s + q.maxMarks, 0);

  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState(safeQuestions.map(() => 0));
  const [show, setShow] = useState(false);

  const updateMark = (i, val) => {
    let v = parseFloat(val);
    if (isNaN(v)) v = 0;
    v = Math.min(Math.max(v, 0), safeQuestions[i].maxMarks);

    const arr = [...marks];
    arr[i] = v;
    setMarks(arr);
  };

  const setFull = (i) => {
    const arr = [...marks];
    arr[i] = safeQuestions[i].maxMarks;
    setMarks(arr);
  };

  const totalObtained = marks.reduce((a, b) => a + b, 0);
  const percentage = totalMaxMarks
    ? ((totalObtained / totalMaxMarks) * 100).toFixed(1)
    : 0;

  const grade =
    percentage >= 90 ? 'A+' :
    percentage >= 80 ? 'A' :
    percentage >= 70 ? 'B+' :
    percentage >= 60 ? 'B' :
    percentage >= 50 ? 'C' :
    percentage >= 40 ? 'D' : 'F';

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center items-start">

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">

        {/* ================= FORM ================= */}
        {!show && (
          <div className="p-6 bg-gray-900 text-white">
            <h2 className="text-2xl mb-4 font-bold">Student Mark Entry</h2>

            <input
              type="text"
              placeholder="Enter Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 mb-6 bg-gray-800 rounded-lg"
            />

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {safeQuestions.map((q, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg">

                  <div className="flex justify-between items-start gap-4">

                    <div>
                      <p className="text-purple-400 font-semibold">Q{i + 1}</p>
                      <p className="text-sm mt-1">{q.text}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={marks[i]}
                        max={q.maxMarks}
                        onChange={(e) => updateMark(i, e.target.value)}
                        className="w-20 p-1 text-center bg-gray-700 rounded"
                      />

                      <button
                        onClick={() => setFull(i)}
                        className="bg-green-600 px-2 py-1 text-xs rounded"
                      >
                        Full
                      </button>

                      <span>/ {q.maxMarks}</span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShow(true)}
              className="mt-6 px-6 py-2 bg-purple-600 rounded-lg"
            >
              Generate Marksheet
            </button>
          </div>
        )}

        {/* ================= MARKSHEET ================= */}
        {show && (
          <div className="print-marksheet">

            <div className="a4-page text-black">

              {/* HEADER */}
              <div className="text-center border-b pb-2 mb-2">
                <img src={cnatLogo} className="mx-auto h-10 mb-1" />
                <h2 className="text-lg font-bold">{organizationName}</h2>
                <p className="text-xs">{paperTitle}</p>
              </div>

              {/* INFO */}
              <div className="border p-2 mb-3 text-xs">
                <p><b>Name:</b> {studentName}</p>
                <p><b>Total Marks:</b> {totalMaxMarks}</p>
              </div>

              {/* TABLE */}
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border p-1">Q.No</th>
                    <th className="border p-1">Question</th>
                    <th className="border p-1">Max</th>
                    <th className="border p-1">Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {safeQuestions.map((q, i) => (
                    <tr key={i}>
                      <td className="border p-1">{i + 1}</td>
                      <td className="border p-1">{q.text}</td>
                      <td className="border p-1">{q.maxMarks}</td>
                      <td className="border p-1">{marks[i]}</td>
                    </tr>
                  ))}

                  <tr className="font-bold">
                    <td colSpan="2" className="border p-1 text-right">TOTAL</td>
                    <td className="border p-1">{totalMaxMarks}</td>
                    <td className="border p-1">{totalObtained}</td>
                  </tr>
                </tbody>
              </table>

              {/* RESULT */}
              <div className="mt-3 border p-2 text-xs flex justify-between">
                <span>Percentage: {percentage}%</span>
                <span>Grade: {grade}</span>
                <span>Result: {percentage >= 40 ? 'PASS' : 'FAIL'}</span>
              </div>

              {/* BUTTONS */}
              <div className="mt-3 no-print">
                <button onClick={() => window.print()} className="mr-4 text-blue-600">
                  Print
                </button>
                <button onClick={() => setShow(false)} className="text-red-600">
                  Back
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ================= FINAL PRINT CSS ================= */}
      <style>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          margin: auto;
          padding: 10mm;
          background: white;
          box-sizing: border-box;
        }

        @media print {

          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            height: auto !important;
          }

          body * {
            visibility: hidden;
          }

          .print-marksheet,
          .print-marksheet * {
            visibility: visible;
          }

          .print-marksheet {
            position: absolute;
            top: 0 !important;
            left: 0;
            width: 210mm;
          }

          .a4-page {
            width: 210mm;
            height: 297mm;
            margin: 0 !important;
            padding: 10mm 10mm 5mm 10mm;
          }

          .no-print {
            display: none !important;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid black;
            padding: 4px;
          }

          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

    </div>
  );
};

export default SingleStudentMarksheet;