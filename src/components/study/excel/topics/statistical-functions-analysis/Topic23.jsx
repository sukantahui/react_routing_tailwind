import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic23_files/topic23_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic23() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            QUARTILE.INC Function (Inclusive Quartiles)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            QUARTILE.INC returns the quartile of a dataset, where 0 = minimum, 1 = first quartile (25th percentile), 2 = median, 3 = third quartile (75th percentile), and 4 = maximum. It uses an inclusive method that matches the PERCENTILE.INC function.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-blue-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-blue-500">
            =QUARTILE.INC(array, quart)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-blue-300">Return type:</strong> Numeric (the quartile value)</li>
            <li><strong className="text-blue-300">Purpose:</strong> Returns the quartile of a data set, using inclusive (0-1) interpolation.</li>
            <li><strong className="text-blue-300">When to use:</strong> Analysing spread of data, identifying outliers via interquartile range (IQR), box plots, comparing distributions.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 QUARTILE.INC includes the minimum and maximum as quartiles 0 and 4. For exclusive percentiles (excluding min/max), use QUARTILE.EXC.
          </div>
        </section>

        {/* Quartile Values */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 Quartile Numbers</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              <span className="text-blue-300 font-mono">quart = 0</span> → Minimum value (0th percentile)<br />
              <span className="text-blue-300 font-mono">quart = 1</span> → First quartile – 25% of data below this value<br />
              <span className="text-blue-300 font-mono">quart = 2</span> → Second quartile – median (50th percentile)<br />
              <span className="text-blue-300 font-mono">quart = 3</span> → Third quartile – 75% of data below this value<br />
              <span className="text-blue-300 font-mono">quart = 4</span> → Maximum value (100th percentile)
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-mono text-sm">✅ =QUARTILE.INC(A1:A100, 1) → first quartile (Q1)</p>
              <p className="font-mono text-sm mt-1">✅ =QUARTILE.INC(A1:A100, 3) - QUARTILE.INC(A1:A100, 1) → Interquartile Range (IQR)</p>
              <p className="font-mono text-sm mt-1">⚠️ QUARTILE.INC matches PERCENTILE.INC with quart*0.25.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a teacher has exam scores for 30 students. She wants to identify the middle 50% of scores (between Q1 and Q3) and detect outliers using the 1.5*IQR rule.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Statistic</th><th className="border px-3 py-2">Score</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Minimum</td><td className="border px-3 py-1">=QUARTILE.INC(range,0)</td></tr>
                  <tr><td className="border px-3 py-1">Q1 (25th)</td><td className="border px-3 py-1">=QUARTILE.INC(range,1)</td></tr>
                  <tr><td className="border px-3 py-1">Median</td><td className="border px-3 py-1">=QUARTILE.INC(range,2)</td></tr>
                  <tr><td className="border px-3 py-1">Q3 (75th)</td><td className="border px-3 py-1">=QUARTILE.INC(range,3)</td></tr>
                  <tr><td className="border px-3 py-1">Maximum</td><td className="border px-3 py-1">=QUARTILE.INC(range,4)</td></tr>
                </tbody>
               </table>
              <p className="mt-3 text-blue-300">IQR = Q3 - Q1; outliers are values &lt; Q1 - 1.5*IQR or &gt; Q3 + 1.5*IQR.</p>
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
              <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-blue-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“quartile_inc_data”</strong> from <code>statistical_functions.xlsx</code> contains exam scores and sales figures. Practice quartile calculations.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="quartile_inc_data" title="QUARTILE.INC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic23_files/excel_files/</code> with sheet “quartile_inc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using quart values outside 0–4 – returns #NUM! error.</li>
            <li>Confusing QUARTILE.INC with QUARTILE.EXC – .INC includes min and max, .EXC excludes them (uses different interpolation).</li>
            <li>Forgetting that the result can be a value not present in the original dataset (interpolated).</li>
            <li>Misinterpreting Q1: it is the 25th percentile, so 25% of data is below it, not necessarily that a data point equals the computed value.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use IQR = QUARTILE.INC(data,3) - QUARTILE.INC(data,1) to detect outliers.</li>
            <li>Combine with box plots (chart) to visualise quartiles.</li>
            <li>For exclusive quartiles (sometimes required in certain fields), use QUARTILE.EXC.</li>
            <li>Use named ranges to make formulas clear.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If your data has an even number of points, where does the median lie? QUARTILE.INC(...,2) gives the same as MEDIAN. But Q1 and Q3 are interpolated. How would you find the exact position of the first quartile?<br />
            Observe carefully: QUARTILE.INC uses the same method as PERCENTILE.INC – it may return a value between two data points.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use QUARTILE.INC for describing the spread of data, especially for box plots.</li>
            <li>Combine with IF to find quartiles for subgroups: =QUARTILE.INC(IF(region="North", sales), 1) as array formula.</li>
            <li>QUARTILE.INC is also available as PERCENTILE.INC(data, 0.25) – the two are equivalent.</li>
            <li>In Excel 365, use the new QUARTILE.INC function inside LET for cleaner IQR calculations.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =QUARTILE.INC(array, quart)</li>
            <li>✅ quart = 0 (min), 1 (Q1), 2 (median), 3 (Q3), 4 (max)</li>
            <li>✅ Inclusive method (matches PERCENTILE.INC)</li>
            <li>✅ Returns #NUM! if quart out of range</li>
            <li>✅ Returns error if array contains no numbers</li>
            <li>✅ Use IQR = Q3 - Q1 to identify outliers</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="QUARTILE.INC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple dataset (e.g., {1,2,3,4,5,6,7,8,9,10}) and compute QUARTILE.INC for quart=0 to 4. Explain that the median (quart=2) is 5.5 (interpolated). Compare with manual calculation. Then move to real data: exam scores. Use the sheet 'quartile_inc_data' with exam scores and have students compute Q1, Q3, IQR, then flag outliers. Discuss the difference between QUARTILE.INC and QUARTILE.EXC."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}