import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic2_files/topic2_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleMinDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic2() {
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
    if (!sampleMinDataUrl) return;
    const link = document.createElement("a");
    link.href = sampleMinDataUrl;
    link.download = "sample_min_data.xlsx";
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Revision: MIN Function
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The MIN function returns the smallest numeric value in a set of values — essential for finding minimums in data analysis.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-amber-500">
            =MIN(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-amber-300">Return type:</strong> Numeric (the smallest value)</li>
            <li><strong className="text-amber-300">Purpose:</strong> Returns the minimum value from the provided numbers.</li>
            <li><strong className="text-amber-300">When to use:</strong> Finding lowest marks, cheapest price, earliest date, smallest quantity, minimum temperature.</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How MIN Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              MIN evaluates all numeric values in the arguments and returns the smallest one.
              Like SUM and AVERAGE, it ignores text, empty cells, and logical values (TRUE/FALSE) when contained in cell references.
              However, if you directly type a text or logical value, it may cause an error or be coerced.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=MIN(10, 20, 5)</span> → returns 5</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=MIN(A1:A10)</span> → finds smallest number in that range</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">=MIN("apple", 5)</span> → returns #VALUE! (direct text error)</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">MIN(TRUE, 5)</span> with TRUE as direct argument → 0? Actually TRUE=1, so min = 1? Wait, MIN(TRUE,5) returns 1 because TRUE is coerced to 1. But in cell references, TRUE is ignored.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a tutoring centre tracks weekly attendance of students – Swadeep, Tuhina, Abhronila, Susmita, Debangshu.
              The coordinator wants to know the minimum attendance (least number of days present) to identify students needing attention.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border border-gray-700 px-3 py-2 text-left">Student</th>
                    <th className="border border-gray-700 px-3 py-2 text-left">Attendance (Days)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-700 px-3 py-1">Swadeep</td><td className="border border-gray-700 px-3 py-1">5</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Tuhina</td><td className="border border-gray-700 px-3 py-1">6</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Abhronila</td><td className="border border-gray-700 px-3 py-1">4</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Susmita</td><td className="border border-gray-700 px-3 py-1">7</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Debangshu</td><td className="border border-gray-700 px-3 py-1">3</td></tr>
                  <tr className="bg-amber-900/30 font-bold">
                    <td className="border border-gray-700 px-3 py-1">Minimum Attendance</td>
                    <td className="border border-gray-700 px-3 py-1 text-amber-300">=MIN(B2:B6) → 3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader with Download Button */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleMinDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-amber-500/20"
              >
                ⬇️ Download Sample Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet below is loaded from <code className="bg-gray-800 px-1 rounded">sample_min_data.xlsx</code>.
            {!sampleMinDataUrl && <span className="text-yellow-300"> (File not found – please create it)</span>}
          </p>
          {sampleMinDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleMinDataUrl}
              sheetName="min_data"
              title="Attendance & Marks – MIN Practice"
              rowsPerPage={15}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                To practice, create a file named <code className="bg-gray-800 px-1 rounded">sample_min_data.xlsx</code> in the folder:
                <br /><code className="bg-gray-800 px-1 rounded">src/pages/excel/statistical-functions/topic2_files/</code>
                <br /><br />
                <strong>Example content:</strong><br />
                Columns: Student, Attendance, Marks. Use =MIN(B2:B10) to find lowest.
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
            <li>MIN ignores text and blanks – if you have blank cells, they are not treated as zero. This can be misleading.</li>
            <li>Using MIN on a range that contains zeros – zeros are considered the minimum if present, which may be intended or not.</li>
            <li>MIN does NOT work with logicals in cell references (ignores them).</li>
            <li>If no numbers are found in the range, MIN returns 0 (not an error). That's different from AVERAGE which returns #DIV/0!.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use MIN with other functions like IF: =MIN(IF(range>0, range)) to ignore zeros.</li>
            <li>Use MINIFS for conditional minimums (e.g., minimum marks in a specific subject).</li>
            <li>Ensure your data is clean – text numbers should be converted to real numbers.</li>
            <li>For dates, MIN gives the earliest date (since dates are serial numbers).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If Susmita was absent for two days (recorded as blank cells), does MIN treat that as 0? No. So the minimum may be higher than expected.<br />
            Observe carefully: If you want to treat absent as zero, you must replace blanks with 0 before using MIN. Try =MIN(IF(ISBLANK(range),0,range)) as array formula.”
          </p>
        </section>

        {/* Professional Tips */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Quick min from status bar: select a range and see Min value at bottom.</li>
            <li>To find the minimum excluding zero: =MINIFS(range, range, "&lt;&gt;0").</li>
            <li>MIN can be used with array constants: =MIN({5,2,8,1}) → 1.</li>
            <li>Combine MIN with VLOOKUP to find the lowest value and then retrieve related info.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =MIN(number1, [number2], …)</li>
            <li>✅ MIN ignores text, blanks, logicals in cell references</li>
            <li>✅ Returns 0 if no numbers found (unlike AVERAGE)</li>
            <li>✅ Use MINIFS for conditional minimum</li>
            <li>✅ Be careful with zeros vs blanks</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="MIN Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "MIN is straightforward but students often confuse how it treats blanks/zeros. " +
            "Demonstrate with a column containing zeros, blanks, and text. " +
            "Show that MIN returns zero if any zero exists, even if blanks are ignored. " +
            "Also illustrate that MIN can be used with dates (earliest date). " +
            "For the Excel file, ask students to find the lowest attendance, lowest marks, and earliest exam date."
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