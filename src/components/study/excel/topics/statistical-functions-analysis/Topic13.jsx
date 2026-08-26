import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic13_files/topic13_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic13() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
            MODE.SNGL Function (Single Mode Detection)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            MODE.SNGL returns the most frequently occurring number in a dataset – the mode. It is essential for identifying the most common value in surveys, production defects, exam scores, and more.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-rose-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-rose-500">
            =MODE.SNGL(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-rose-300">Return type:</strong> Numeric (the most frequent value) or #N/A if no mode exists.</li>
            <li><strong className="text-rose-300">Purpose:</strong> Returns the single mode (value that appears most often) in a dataset.</li>
            <li><strong className="text-rose-300">When to use:</strong> Finding the most common exam score, most frequent product defect, typical customer age group, etc.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 For multiple modes, use MODE.MULT. MODE.SNGL returns only the first mode (lowest value if ties).
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How MODE.SNGL Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              MODE.SNGL counts the frequency of each number in the argument list (ignoring text, blanks, logicals) and returns the number that occurs most often.
              If no number repeats, or if all numbers appear exactly once, it returns #N/A.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-rose-500">
              <p className="font-mono text-sm">✅ =MODE.SNGL(1,2,2,3,4) → 2 (appears twice)</p>
              <p className="font-mono text-sm mt-1">✅ =MODE.SNGL(A1:A10) → most frequent number in the range</p>
              <p className="font-mono text-sm mt-1">⚠️ =MODE.SNGL(1,2,3,4,5) → #N/A (no repetition)</p>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In a Barrackpore school, students were asked about their favourite subject (numeric code). The data: 1=Math, 2=Science, 3=English. Responses: 2,3,2,1,2,3,2,1,1. What is the mode?
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Code</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">2</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">3</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">2</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">1</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">2</td></tr>
                  <tr><td className="border px-3 py-1">Rohan</td><td className="border px-3 py-1">3</td></tr>
                  <tr><td className="border px-3 py-1">Priya</td><td className="border px-3 py-1">2</td></tr>
                  <tr><td className="border px-3 py-1">Ankit</td><td className="border px-3 py-1">1</td></tr>
                  <tr><td className="border px-3 py-1">Meera</td><td className="border px-3 py-1">1</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-rose-300">=MODE.SNGL(B2:B10) → 2 (the most frequent code, meaning Science is favourite).</p>
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
              <button onClick={handleDownload} className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-rose-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“mode_sngl_data”</strong> from <code>statistical_functions.xlsx</code> contains survey responses and sales data. Practice finding the most frequent value.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="mode_sngl_data" title="MODE.SNGL Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic13_files/excel_files/</code> with sheet “mode_sngl_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>MODE.SNGL returns #N/A when every number appears exactly once (no mode).</li>
            <li>If there are multiple modes, MODE.SNGL returns the smallest mode (e.g., 2 and 3 both appear 3 times → returns 2).</li>
            <li>Confusing with MODE.MULT – MODE.SNGL gives one value; MODE.MULT gives an array of all modes.</li>
            <li>Ignoring that MODE.SNGL ignores text and blanks – only numeric values count.</li>
            <li>Using it on continuous data where no repetition is likely – mode is rarely meaningful for continuous data (use histogram bins).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use MODE.SNGL on discrete or categorical data (e.g., survey answers, favourite colour codes).</li>
            <li>If you expect multiple modes, use MODE.MULT instead and wrap with TRANSPOSE for horizontal display.</li>
            <li>Combine MODE.SNGL with COUNTIF to verify frequency: =COUNTIF(range, MODE.SNGL(range)).</li>
            <li>Handle #N/A gracefully with IFERROR: =IFERROR(MODE.SNGL(range), "No mode").</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have test marks: 85, 90, 85, 92, 88, 85, 90 – the mode is 85. But what if a student scored 100 once, and 85 appears three times? Still 85.<br />
            Observe carefully: Mode only cares about frequency, not magnitude. It does not give the ‘best’ score, just the most common.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To find the most common text value, use an array formula with INDEX/MATCH and COUNTIF. Excel 365 has MODE.MULT for numbers only, not text.</li>
            <li>For dynamic mode based on criteria, combine MODE.SNGL with IF in an array formula: =MODE.SNGL(IF(range=criteria, mode_range)).</li>
            <li>Use MODE.SNGL with date data (dates are numbers) to find the most frequent date (e.g., most common order day).</li>
            <li>For large datasets, MODE.SNGL is fast because it uses hashing internally.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =MODE.SNGL(number1, [number2], …)</li>
            <li>✅ Returns the most frequent number; #N/A if no repetition</li>
            <li>✅ For multiple modes, gives the smallest value (lowest)</li>
            <li>✅ Ignores text, blanks, logicals</li>
            <li>✅ Use MODE.MULT for all modes</li>
            <li>✅ Wrap with IFERROR to avoid #N/A</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="MODE.SNGL Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Introduce mode with a class survey: shoe sizes, favourite numbers. Show that MODE.SNGL returns #N/A if all numbers are unique. Then show a tie situation (e.g., 2 appears three times, 5 appears three times) – MODE.SNGL returns the smaller mode. Use the Excel sheet 'mode_sngl_data' with survey codes, product IDs, and error check."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}