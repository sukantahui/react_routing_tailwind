import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic5_files/topic5_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic5() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleDataUrl) return;
    const link = document.createElement("a");
    link.href = sampleDataUrl;
    link.download = "statistical_functions.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section transition-all duration-700 ease-out"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Revision: COUNTA Function
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The COUNTA function counts all non‑empty cells in a range, regardless of data type. It is essential for determining dataset completeness.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-cyan-500">
            =COUNTA(value1, [value2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-cyan-300">Return type:</strong> Numeric (integer count of non‑empty cells)</li>
            <li><strong className="text-cyan-300">Purpose:</strong> Counts cells that contain any data: numbers, text, logical values, errors, or formulas that return anything (even empty string).</li>
            <li><strong className="text-cyan-300">When to use:</strong> Checking how many records are filled, counting survey responses, finding total entries in a list.</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How COUNTA Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <div>
              COUNTA counts any cell that is not completely empty. This includes:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Numbers (including 0)</li>
                <li>Text (including " " and "Absent")</li>
                <li>Logical values (TRUE / FALSE)</li>
                <li>Error values (#N/A, #VALUE!)</li>
                <li>Formulas that return a blank string ("") – these are counted</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-cyan-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=COUNTA(A1:A10)</span> → counts all non‑blank cells in that range</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=COUNTA(5, "hello", TRUE)</span> → returns 3</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">=COUNTA(A1:A10)</span> with A1 containing `=""` (empty string) → counts it as non‑empty</p>
            </div>
          </div>
        </section>

        {/* Real‑world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In a Shyamnagar school, a teacher maintains a survey: student name, parent's phone number, and fee payment status. Some fields are missing. The principal wants to know how many responses have at least some data (non‑empty in the first column). COUNTA counts all students who have a name entered.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border border-gray-700 px-3 py-2">Student</th>
                    <th className="border border-gray-700 px-3 py-2">Parent Phone</th>
                    <th className="border border-gray-700 px-3 py-2">Fee Paid?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">9876543210</td><td className="border px-3 py-1">Yes</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1"> </td><td className="border px-3 py-1">No</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">1234567890</td><td className="border px-3 py-1"> </td></tr>
                  <tr><td className="border px-3 py-1"> </td><td className="border px-3 py-1"> </td><td className="border px-3 py-1"> </td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">9998887776</td><td className="border px-3 py-1">Yes</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-cyan-300">=COUNTA(A2:A6) → 4 (blank row excluded)</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-cyan-500/20"
              >
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet <strong>“counta_data”</strong> from <code className="bg-gray-800 px-1 rounded">statistical_functions.xlsx</code> is shown below.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="counta_data"
              title="Survey Data – COUNTA Practice"
              rowsPerPage={15}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                Ensure <code className="bg-gray-800 px-1 rounded">statistical_functions.xlsx</code> exists in <code className="bg-gray-800 px-1 rounded">src/pages/excel/statistical-functions/topic5_files/excel_files/</code><br />
                and contains a sheet named <strong>“counta_data”</strong> with a mix of filled and blank cells.
              </p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Confusing COUNTA with COUNT – COUNTA counts everything non‑blank, not just numbers.</li>
            <li>Cells containing a formula that returns `=""` (empty string) are counted by COUNTA, even though they appear blank.</li>
            <li>Spaces or non‑printing characters cause a cell to be non‑blank – COUNTA will count it.</li>
            <li>A zero (0) is a number and is counted by COUNTA (and COUNT also counts it).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use COUNTA to count records in a dataset before analysis – ensures you know the sample size.</li>
            <li>Combine with COUNTBLANK to find missing entries: =COUNTBLANK(range) + COUNTA(range) = total cells.</li>
            <li>Avoid using COUNTA on entire columns (e.g., A:A) if your data has many empty rows – it will count them if they contain formulas.</li>
            <li>For counting only numbers, use COUNT; for text entries, COUNTA is appropriate.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If a column has many cells that look empty but contain `=IF(A1="","",A1)`, COUNTA will count them as non‑empty.<br />
            Observe carefully: COUNTA sees the formula result, not the visual appearance. To count truly blank cells, use COUNTBLANK.”
          </p>
        </section>

        {/* Professional Tips */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Quick count from status bar: select a range and see “Count” – this is actually COUNTA, not COUNT.</li>
            <li>Use COUNTA with dynamic ranges: =OFFSET(A1,0,0,COUNTA(A:A),1) creates a range that adjusts as data grows.</li>
            <li>In Excel Tables, structured references automatically adjust; =COUNTA(Table1[Column1]) counts non‑blanks in that column.</li>
            <li>To count cells that contain specific text, use COUNTIF instead of COUNTA.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =COUNTA(value1, [value2], …)</li>
            <li>✅ COUNTA counts any non‑blank cell (numbers, text, errors, logicals, formulas)</li>
            <li>✅ Ignores only truly empty cells</li>
            <li>✅ Different from COUNT (which counts only numbers)</li>
            <li>✅ Use COUNTBLANK to count empty cells</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="COUNTA Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "COUNTA is a workhorse for data validation. Show students a contact list with missing phone numbers. " +
            "COUNTA on the phone column tells how many complete records exist. " +
            "Also demonstrate that COUNTA counts cells with space character – use TRIM first to clean. " +
            "For the Excel sheet 'counta_data', include columns: Name, Email, Phone, with intentional blanks and spaces."
          }
        />
      </div>

      {/* Animation styles */}
      <style>{`
        .reveal-section {
          transform: translateY(24px) scale(0.98);
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal-section.revealed {
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}