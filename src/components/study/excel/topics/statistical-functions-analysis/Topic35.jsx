import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic35_files/topic35_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic35() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Combining Statistical Functions with IF Logic
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Real‑world data analysis rarely involves static conditions. By combining IF() with statistical functions (SUMIF, AVERAGEIF, COUNTIF, etc.) or using IF inside array formulas, you can create dynamic, conditional summaries that adapt to your data.
          </p>
        </header>

        {/* Why Combine IF with Statistics */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-cyan-400">🧠</span> Why Combine IF?
          </h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              Standalone statistical functions like AVERAGE, SUM, or even COUNTIF work on fixed criteria. But when your condition depends on another calculation (e.g., “average of scores above the class average”), you need to nest IF inside an array formula or use the newer IFS functions. Combining IF with statistics gives you:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Dynamic thresholds (e.g., sum of values greater than the median)</li>
              <li>Conditional summaries based on multiple logical tests</li>
              <li>Array formulas that filter data before aggregation</li>
              <li>Advanced dashboard filters (e.g., top 10% by a dynamic cutoff)</li>
            </ul>
          </div>
        </section>

        {/* Three Common Patterns */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔧 Three Common Patterns</h2>
          <div className="mt-4 space-y-6 text-gray-200">
            <div>
              <p className="font-semibold text-cyan-300 text-lg">1. IF inside array formula (legacy)</p>
              <p className="font-mono text-sm">=AVERAGE(IF(range &gt MEDIAN(range), range))</p>
              <p className="mt-1 text-gray-300">Press <kbd>Ctrl+Shift+Enter</kbd> in older Excel. In 365, works normally.</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-300 text-lg">2. Using SUMIF / COUNTIF with dynamic criteria</p>
              <p className="font-mono text-sm">=SUMIF(sales, "&gt" & AVERAGE(sales))</p>
              <p className="mt-1 text-gray-300">No array entry needed – the concatenation (&amp;) builds the condition string.</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-300 text-lg">3. Nested IF in helper columns</p>
              <p className="font-mono text-sm">Helper column = IF(sales &gt threshold, 1, 0), then SUM(helper)</p>
              <p className="mt-1 text-gray-300">Simpler to debug and often faster for large data.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a teacher wants the average score of students who scored above the class median (to see how high achievers perform). The median is dynamic – it changes when a new student joins.
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
              <p className="mt-3 text-cyan-300">Median = 85. Array formula: =AVERAGE(IF(B2:B6 &gt MEDIAN(B2:B6), B2:B6)) → average of {92,95} = 93.5</p>
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
              <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-cyan-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“combine_if_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and exam data for practicing combined IF-statistical formulas.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="combine_if_data" title="Combine IF with Statistics" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic35_files/excel_files/</code> with sheet “combine_if_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting to enter array formulas with Ctrl+Shift+Enter in older Excel (results in #VALUE! or wrong values).</li>
            <li>Using IF inside statistical functions without proper absolute/relative references.</li>
            <li>Not handling blanks or errors – they break array formulas.</li>
            <li>Concatenating operators incorrectly: "&gt"&AVERAGE(range) not "&gt"AVERAGE(range).</li>
            <li>Using IF on very large ranges (10K+ rows) – array formulas can be slow; consider helper columns or Power Query.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>If you have Excel 365, use FILTER instead of array formulas: =AVERAGE(FILTER(scores, scores &gt MEDIAN(scores))).</li>
            <li>Pre‑compute dynamic thresholds in separate cells to improve readability and performance.</li>
            <li>Use named ranges to make complex formulas understandable.</li>
            <li>Test each part of the formula separately (e.g., first compute the condition array using a helper column).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want to sum only the values greater than the average, you could write =SUMIF(range, "&gt"&AVERAGE(range)). That works without array formulas. But if you want to sum only values greater than the average AND also greater than 100, you cannot use SUMIFS with two conditions on the same column? Actually you can: =SUMIFS(range, range, ">"&AVERAGE(range), range, ">100"). <br />
            Observe carefully: The newer IFS functions (SUMIFS, AVERAGEIFS, COUNTIFS) often eliminate the need for array formulas. Reserve IF+array for non‑standard criteria (e.g., even/odd positions, pattern matching).”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>In Excel 365, use LET to store intermediate arrays and avoid recalculation: =LET(data, A2:A100, med, MEDIAN(data), AVERAGE(FILTER(data, data &gt med))).</li>
            <li>To count values above the 90th percentile, use =COUNTIF(range, "&gt" & PERCENTILE.INC(range, 0.9)).</li>
            <li>Use SUMPRODUCT for multi‑conditional summaries without array formulas: =SUMPRODUCT((range &gt threshold)*(range&ltupper)*values).</li>
            <li>Combine IF with RANK.EQ to get dynamic ranks only for certain groups.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Use array formulas (Ctrl+Shift+Enter) for IF inside AVERAGE/STDEV in older Excel</li>
            <li>✅ Prefer SUMIFS/AVERAGEIFS for simple AND conditions</li>
            <li>✅ Use &amp; to concatenate dynamic thresholds: "&gt"&CELL</li>
            <li>✅ For complex OR logic, use multiple array criteria or helper columns</li>
            <li>✅ In Excel 365, FILTER or LET functions simplify everything</li>
            <li>✅ Always test with small data before scaling up</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Combining IF with Statistical Functions – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple array formula: =AVERAGE(IF(marks > MEDIAN(marks), marks)). Show that pressing Enter gives a #VALUE! error; you need Ctrl+Shift+Enter (or inline in 365). Then show the same using AVERAGEIF with dynamic criteria: =AVERAGEIF(marks, ">"&MEDIAN(marks)). Compare the two methods. Use the Excel sheet 'combine_if_data' with scores and sales, ask students to compute the average of values above the median, the sum of values above the mean, and the count of values above the 90th percentile. Emphasise helper columns for debugging."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}