import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic4_files/topic4_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic4() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Revision: COUNT Function
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The COUNT function counts how many cells in a range contain numbers. It is essential for understanding dataset size and numeric presence.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-indigo-500">
            =COUNT(value1, [value2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-indigo-300">Return type:</strong> Numeric (integer count of numeric cells)</li>
            <li><strong className="text-indigo-300">Purpose:</strong> Counts the number of cells that contain numbers, dates, or numeric expressions.</li>
            <li><strong className="text-indigo-300">When to use:</strong> Determining how many test scores, sales figures, or attendance days are recorded; checking data completeness.</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How COUNT Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              COUNT only counts cells that hold numbers. It ignores:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Empty cells</li>
                <li>Text (even if it looks like a number, e.g., "123")</li>
                <li>Logical values (TRUE / FALSE)</li>
                <li>Error values (#N/A, #VALUE!, etc.)</li>
              </ul>
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=COUNT(A1:A10)</span> → counts numeric cells in that range</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=COUNT(5, "apple", 10)</span> → returns 2 (only 5 and 10)</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">=COUNT(A1:A10)</span> with A1="123" (text) → ignores it</p>
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
              <strong>Scenario:</strong> At the Barrackpore tuition centre, teacher records students' marks. Some students were absent (blank cells) or submitted assignments as "Pending" (text). The principal wants to know how many students actually received marks (numeric).
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border border-gray-700 px-3 py-2">Student</th>
                    <th className="border border-gray-700 px-3 py-2">Marks (out of 100)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">"Absent"</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1"></td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">78</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-indigo-300">=COUNT(B2:B6) → 3 (only Swadeep, Tuhina, Debangshu)</p>
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
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-indigo-500/20"
              >
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet <strong>“count_data”</strong> from <code className="bg-gray-800 px-1 rounded">statistical_functions.xlsx</code> is shown below.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="count_data"
              title="Student Marks – COUNT Practice"
              rowsPerPage={15}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                Ensure <code className="bg-gray-800 px-1 rounded">statistical_functions.xlsx</code> exists in <code className="bg-gray-800 px-1 rounded">src/pages/excel/statistical-functions/topic4_files/excel_files/</code><br />
                and contains a sheet named <strong>“count_data”</strong> with numeric, text, and blank cells.
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
            <li>Confusing COUNT with COUNTA – COUNT counts only numbers; COUNTA counts everything non‑blank.</li>
            <li>Text that looks like a number (e.g., "100") is not counted unless converted to a real number.</li>
            <li>Dates are numbers, so they are counted – that is correct but sometimes surprising.</li>
            <li>Using COUNT on an entire column like A:A counts millions of rows and may be slow, but it works.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use COUNT to verify that all expected numeric data is present (e.g., =COUNT(marks) = number of students).</li>
            <li>Combine with IF to count numbers meeting criteria (COUNTIF is even better).</li>
            <li>Use COUNT with structured references in Tables for dynamic ranges.</li>
            <li>Remember COUNT includes zeros – if you need to exclude zeros, use COUNTIF(range, &quot;&lt;&gt;0&quot;).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have a column of exam scores and you use =COUNT(scores), you get the number of students who actually took the exam (because blanks are ignored).<br />
            Observe carefully: If a student scored 0, they are still counted. That's correct because 0 is a number. How would you count only students who scored above 0? (Hint: COUNTIF)”
          </p>
        </section>

        {/* Professional Tips */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Quick count from status bar: select a range and see “Count” (counts numeric cells).</li>
            <li>To count numbers in a filtered list, use SUBTOTAL(2, range) – it works on visible rows.</li>
            <li>COUNT respects number formatting – a cell formatted as text containing digits is not counted.</li>
            <li>Use COUNT with INDIRECT to count across dynamic ranges: =COUNT(INDIRECT("B"&amp;ROW1&amp;":B"&amp;ROW2)).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =COUNT(value1, [value2], …)</li>
            <li>✅ COUNT counts only numbers, dates, and numeric expressions</li>
            <li>✅ Ignores text, blanks, logicals, errors</li>
            <li>✅ Use COUNTA to count non‑blanks of any type</li>
            <li>✅ Use COUNTIF for conditional counting</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="COUNT Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Emphasise the difference between COUNT, COUNTA, and COUNTBLANK. " +
            "Use a simple class attendance sheet: COUNT counts only numbers (days present if stored as 1/0), COUNTA counts all filled cells (names or marks), COUNTBLANK counts missing entries. " +
            "Show that text '0' is not counted, but number 0 is. " +
            "The Excel sheet 'count_data' should contain a mix of numbers, text, blanks, and dates for hands‑on practice."
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