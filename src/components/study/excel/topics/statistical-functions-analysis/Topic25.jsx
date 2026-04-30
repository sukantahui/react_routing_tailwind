import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic25_files/topic25_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic25() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            PERCENTILE.INC Function (Inclusive Percentiles)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            PERCENTILE.INC returns the k‑th percentile of a dataset, where k is between 0 and 1 inclusive. It uses inclusive interpolation, meaning the minimum and maximum are possible results (0th and 100th percentiles). This is the standard for many statistical applications.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-teal-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-teal-500">
            =PERCENTILE.INC(array, k)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-teal-300">Return type:</strong> Numeric (the k‑th percentile value)</li>
            <li><strong className="text-teal-300">Purpose:</strong> Returns the value at a given percentile (0 to 1 inclusive), using interpolation when necessary.</li>
            <li><strong className="text-teal-300">When to use:</strong> Finding cut‑off points for test scores, analysing income distribution, calculating percentiles in reporting, creating box plots (together with QUARTILE.INC).</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 k = 0 → minimum; k = 1 → maximum. For quartiles, use k = 0.25, 0.5, 0.75. This function is the basis of QUARTILE.INC.
          </div>
        </section>

        {/* How PERCENTILE.INC Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How PERCENTILE.INC Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              PERCENTILE.INC first orders the data ascending. It then calculates an index position using <strong>p = k*(n-1) + 1</strong>, where n is the number of data points. If the index is an integer, it returns that data point. Otherwise, it interpolates between the two surrounding values.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-teal-500">
              <p className="font-mono text-sm">✅ =PERCENTILE.INC(A1:A100, 0.9) → 90th percentile</p>
              <p className="font-mono text-sm mt-1">✅ =PERCENTILE.INC(A1:A100, 0.25) → first quartile (same as QUARTILE.INC(...,1))</p>
              <p className="font-mono text-sm mt-1">⚠️ k outside [0,1] → #NUM! error.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a university wants to award scholarships to students whose exam scores are in the top 10%. They need to find the 90th percentile score.
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
                  <tr><td className="border px-3 py-1">Rohan</td><td className="border px-3 py-1">88</td></tr>
                  <tr><td className="border px-3 py-1">Priya</td><td className="border px-3 py-1">91</td></tr>
                  <tr><td className="border px-3 py-1">Ankit</td><td className="border px-3 py-1">76</td></tr>
                  <tr><td className="border px-3 py-1">Meera</td><td className="border px-3 py-1">94</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-teal-300">=PERCENTILE.INC(B2:B10, 0.9) → about 94.2 (interpolated between 94 and 95)</p>
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
              <button onClick={handleDownload} className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-teal-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“percentile_inc_data”</strong> from <code>statistical_functions.xlsx</code> contains exam scores and sales figures. Practice calculating various percentiles (0.1, 0.25, 0.5, 0.75, 0.9).
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="percentile_inc_data" title="PERCENTILE.INC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic25_files/excel_files/</code> with sheet “percentile_inc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using k outside the range 0–1 – returns #NUM!.</li>
            <li>Confusing PERCENTILE.INC with PERCENTILE.EXC – .INC includes the extremes (0 and 1), .EXC does not.</li>
            <li>Expecting the result to always be a value from the original dataset – interpolation often occurs.</li>
            <li>Applying PERCENTILE.INC to a dataset with fewer than 2 numbers – returns #NUM!.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use PERCENTILE.INC when you want a standard, inclusive definition (e.g., for quartiles).</li>
            <li>Combine with IF to compute conditional percentiles: =PERCENTILE.INC(IF(region="North", sales), 0.9) as array formula.</li>
            <li>Use named ranges to make formulas self‑documenting.</li>
            <li>For common percentiles (0.25, 0.5, 0.75), you can use QUARTILE.INC for brevity.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If the 90th percentile of exam scores is 92, that means 90% of scores are ≤ 92, and 10% are > 92. Does that mean exactly 10% of students scored above 92? Not necessarily – if interpolation is used, it's an estimate.<br />
            Observe carefully: PERCENTILE.INC gives a value, not a percentage count. Use it as a threshold.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To highlight values above the 90th percentile in conditional formatting: =A1 > PERCENTILE.INC($A$1:$A$100, 0.9).</li>
            <li>Use PERCENTILE.INC with dynamic arrays in Excel 365 to get multiple percentiles at once: =PERCENTILE.INC(data, {0.1,0.2,0.3,0.4,0.5})</li>
            <li>For exclusive percentiles (k between 0 and 1 exclusive, no min/max), use PERCENTILE.EXC.</li>
            <li>When reporting percentiles, always state whether inclusive or exclusive method was used.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =PERCENTILE.INC(array, k)</li>
            <li>✅ k must be between 0 and 1 inclusive</li>
            <li>✅ k=0 → minimum; k=1 → maximum</li>
            <li>✅ Interpolates between data points if needed</li>
            <li>✅ Returns #NUM! if k out of range or array empty</li>
            <li>✅ Ignored text, blanks, logicals</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="PERCENTILE.INC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with simple data: {1,2,3,4,5} and compute PERCENTILE.INC for k=0, 0.25, 0.5, 0.75, 1. Show that k=0.5 gives median (3). Then move to real data: exam scores. Emphasise that percentiles are not the same as percentages; they are positions. Use the sheet 'percentile_inc_data' and have students find the 90th percentile for sales, then identify which products exceed it."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}