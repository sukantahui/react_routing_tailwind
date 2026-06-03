import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic19_files/topic19_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic19() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            LARGE Function (Top N Value Extraction)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The LARGE function returns the k‑th largest value in a dataset. It is perfect for finding top scores, highest sales, or ranking items without sorting.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-red-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-red-500">
            =LARGE(array, k)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-red-300">Return type:</strong> Numeric (the k‑th largest value)</li>
            <li><strong className="text-red-300">Purpose:</strong> Returns the k‑th largest number in a range or array.</li>
            <li><strong className="text-red-300">When to use:</strong> Finding highest sales, top 3 exam scores, best performing product, largest expense, etc.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 k = 1 gives the maximum; k = 2 gives the second largest, and so on.
          </div>
        </section>

        {/* How LARGE Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How LARGE Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              LARGE sorts the numbers in descending order and picks the k‑th element. It ignores text, blanks, and logical values, and works with arrays or cell ranges.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
              <p className="font-mono text-sm">✅ =LARGE(A1:A10, 1) → maximum value in the range</p>
              <p className="font-mono text-sm mt-1">✅ =LARGE(A1:A10, 3) → third largest value</p>
              <p className="font-mono text-sm mt-1">⚠️ If k &gt; count of numbers, returns #NUM! error.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a school’s principal wants to know the top 3 exam scores and the 2nd highest sales figure for a fundraiser.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">78</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">68</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-red-300">=LARGE(B2:B6, 1) → 95 (top score)</p>
              <p className="mt-1 text-red-300">=LARGE(B2:B6, 2) → 92 (second highest)</p>
              <p className="mt-1 text-red-300">=LARGE(B2:B6, 3) → 85 (third highest)</p>
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
              <button onClick={handleDownload} className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-red-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“large_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and exam data. Practice extracting top values.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="large_data" title="LARGE Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic19_files/excel_files/</code> with sheet “large_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>k value larger than the number of numeric entries → #NUM! error.</li>
            <li>Forgetting that LARGE ignores text and blanks – if your range has fewer numbers than expected, the error occurs.</li>
            <li>Misunderstanding that k=1 returns the maximum (same as MAX), but LARGE is more flexible.</li>
            <li>Using LARGE on unsorted data is fine; it automatically sorts internally.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use LARGE with ROW() to get a dynamic list of top values: =LARGE(range, ROW(A1)).</li>
            <li>Combine LARGE with SUM to sum top N values: =SUM(LARGE(range, {1,2,3})).</li>
            <li>Use named ranges to make formulas readable: =LARGE(Scores, 2).</li>
            <li>For conditional top values (e.g., top 3 scores in a specific city), use array formula with IF.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want the top 3 scores and their corresponding student names, LARGE gives only the scores. How would you get the names of those top scorers? (Hint: combine with INDEX-MATCH or XLOOKUP, but careful with ties.)<br />
            Observe carefully: LARGE is for values; to retrieve associated data, you need a lookup function.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To sum the top 3 values without ties issues: =SUM(LARGE(range, {1,2,3})).</li>
            <li>Use LARGE with FREQUENCY to find thresholds: e.g., find the value that separates top 10%.</li>
            <li>For a dynamic k, make k a cell reference: =LARGE(range, E2).</li>
            <li>In Excel 365, you can use SORT and INDEX: =INDEX(SORT(range,,-1), k).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =LARGE(array, k)</li>
            <li>✅ k = 1 → largest value (same as MAX)</li>
            <li>✅ k must be ≤ number of numeric values</li>
            <li>✅ Returns #NUM! if k is too large</li>
            <li>✅ Ignores text, blanks, logicals</li>
            <li>✅ Use array constant {1,2,3} for multiple extractions</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="LARGE Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list: {5,2,8,3,9}. Ask for 1st, 2nd, 3rd largest. Then show that MAX is a special case (k=1). Use the Excel sheet 'large_data' with sales data and exam marks. Have students extract top 5 values and then sum them. Discuss ties: if two numbers are equal, both occupy consecutive ranks (e.g., both 1st and 2nd if they are the same?). Actually LARGE returns the same value for both positions if duplicates exist – that's fine."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}