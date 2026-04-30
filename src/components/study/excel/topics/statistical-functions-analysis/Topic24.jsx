import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic24_files/topic24_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic24() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            QUARTILE.EXC Function (Exclusive Quartiles)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            QUARTILE.EXC returns the quartile of a dataset, exclusive of 0 and 4. It uses a method that matches PERCENTILE.EXC, often giving slightly different results from QUARTILE.INC, especially for small datasets.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-purple-500">
            =QUARTILE.EXC(array, quart)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-purple-300">Return type:</strong> Numeric (the quartile value)</li>
            <li><strong className="text-purple-300">Purpose:</strong> Returns the quartile of a data set, using exclusive (0-1) interpolation, where quart must be between 1 and 3 (inclusive).</li>
            <li><strong className="text-purple-300">When to use:</strong> When you need quartiles that exclude the minimum and maximum, matching certain statistical software (e.g., SPSS, R's `type=6`).</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 QUARTILE.EXC does not have quartiles 0 or 4 because those are the extremes; it only returns Q1, Q2, Q3. Use QUARTILE.INC if you need min and max included.
          </div>
        </section>

        {/* Quartile Values */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 Valid Quart Numbers</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              <span className="text-purple-300 font-mono">quart = 1</span> → First quartile – 25th percentile (exclusive interpolation)<br />
              <span className="text-purple-300 font-mono">quart = 2</span> → Second quartile – median (50th percentile)<br />
              <span className="text-purple-300 font-mono">quart = 3</span> → Third quartile – 75th percentile
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="font-mono text-sm">✅ =QUARTILE.EXC(A1:A100, 1) → exclusive Q1</p>
              <p className="font-mono text-sm mt-1">✅ =QUARTILE.EXC(A1:A100, 3) - QUARTILE.EXC(A1:A100, 1) → IQR using exclusive quartiles</p>
              <p className="font-mono text-sm mt-1">⚠️ For small n, QUARTILE.EXC may return #NUM! if the requested percentile cannot be computed exclusively.</p>
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
              <strong>Scenario:</strong> A Barrackpore statistician is analysing household incomes using a method that matches SPSS. She uses QUARTILE.EXC to compute Q1 and Q3 for a small sample, noting that it does not include the minimum or maximum in the quartile definition.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">n</th><th className="border px-3 py-2">QUARTILE.INC Q1</th><th className="border px-3 py-2">QUARTILE.EXC Q1</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">10</td><td className="border px-3 py-1">interpolated</td><td className="border px-3 py-1">sometimes #NUM! if n too small</td></tr>
                  <tr><td className="border px-3 py-1">20</td><td className="border px-3 py-1">value</td><td className="border px-3 py-1">different value</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-purple-300">QUARTILE.EXC requires n &gt; 3 to compute Q1; otherwise #NUM!.</p>
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
              <button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-purple-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“quartile_exc_data”</strong> from <code>statistical_functions.xlsx</code> contains datasets to compare QUARTILE.INC and QUARTILE.EXC.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="quartile_exc_data" title="QUARTILE.EXC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic24_files/excel_files/</code> with sheet “quartile_exc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using quart = 0 or 4 – QUARTILE.EXC does not support them and returns #NUM!.</li>
            <li>Applying QUARTILE.EXC to very small datasets (n &lt 4 for Q1) results in #NUM!.</li>
            <li>Confusing QUARTILE.EXC with QUARTILE.INC – results differ, especially for small n.</li>
            <li>Expecting the result to always be a value from the original dataset – it often interpolates.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use QUARTILE.EXC when replicating results from statistical packages like SPSS/R that use exclusive definitions.</li>
            <li>Check the dataset size – if n &lt 3, QUARTILE.EXC will fail; handle with IFERROR or conditional logic.</li>
            <li>Combine with QUARTILE.INC to show differences in sensitivity to extremes.</li>
            <li>Use named ranges for clarity.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have a dataset with only 4 numbers, why does QUARTILE.EXC return #NUM! for quart=1? Because the exclusive definition requires a gap at the extremes – there is no way to compute a 25th percentile that excludes both min and max in such a small set.<br />
            Observe carefully: QUARTILE.EXC is more strict; it uses a formula that requires more data points.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use =QUARTILE.EXC(data, 2) to get median – but MEDIAN is more straightforward.</li>
            <li>For consistency in published reports, choose either .INC or .EXC and state clearly which is used.</li>
            <li>You can convert from QUARTILE.EXC to PERCENTILE.EXC: =PERCENTILE.EXC(data, 0.25) equals QUARTILE.EXC(data,1).</li>
            <li>In Excel 365, you can combine QUARTILE.EXC with FILTER for conditional quartiles.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =QUARTILE.EXC(array, quart)</li>
            <li>✅ quart must be 1 (Q1), 2 (median), or 3 (Q3)</li>
            <li>✅ quart = 0 or 4 → #NUM!</li>
            <li>✅ Requires n ≥ 4 for Q1, n ≥ 2 for median?</li>
            <li>✅ Results differ from QUARTILE.INC, especially for small n</li>
            <li>✅ Use PERCENTILE.EXC for more generic percentiles</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="QUARTILE.EXC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start by comparing QUARTILE.INC and QUARTILE.EXC on the same small dataset (e.g., {1,2,3,4,5,6,7,8,9,10}). Show that Q1 and Q3 differ slightly. Explain that there is no universally 'correct' method; different fields use different conventions. Use the sheet 'quartile_exc_data' with a mix of small and large datasets to demonstrate when #NUM! occurs. Discuss real scenarios: which method would you choose for box plots in scientific reporting?"} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}