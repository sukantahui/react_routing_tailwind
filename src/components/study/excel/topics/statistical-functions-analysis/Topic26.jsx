import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic26_files/topic26_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic26() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
            PERCENTILE.EXC Function (Exclusive Percentiles)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            PERCENTILE.EXC returns the k‑th percentile of a dataset, where k is strictly between 0 and 1 (exclusive). It uses an exclusive interpolation method that never returns the minimum or maximum value. This matches definitions used by many advanced statistical packages.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-indigo-500">
            =PERCENTILE.EXC(array, k)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-indigo-300">Return type:</strong> Numeric (the k‑th percentile value)</li>
            <li><strong className="text-indigo-300">Purpose:</strong> Returns the value at a given percentile, using exclusive interpolation – k cannot be 0 or 1.</li>
            <li><strong className="text-indigo-300">When to use:</strong> When you need percentiles that never select the min or max, often required in advanced statistical analysis, survey weighting, or when mimicking results from SPSS/R's `type=6` percentile method.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 PERCENTILE.EXC requires k strictly between 0 and 1. For inclusive quartiles (including min/max), use PERCENTILE.INC.
          </div>
        </section>

        {/* How PERCENTILE.EXC Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How PERCENTILE.EXC Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              PERCENTILE.EXC first sorts data ascending. It then calculates an index using <strong>p = k*(n+1)</strong>, 
              where n is the count of numbers. Because the index can range from k*(n+1) which is &lt0 and &lt(n+1), it never points exactly to the first or last element. If the index is an integer, it returns that data point; otherwise, it interpolates between the two surrounding values.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="font-mono text-sm">✅ =PERCENTILE.EXC(A1:A100, 0.9) → 90th percentile (exclusive)</p>
              <p className="font-mono text-sm mt-1">✅ =PERCENTILE.EXC(data, 0.25) → first quartile (exclusive)</p>
              <p className="font-mono text-sm mt-1">⚠️ k=0 or k=1 → #NUM! error because exclusive method cannot return min or max.</p>
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
              <strong>Scenario:</strong> A Barrackpore market research firm analyses household incomes. They want the 90th percentile to exclude the absolute maximum (which might be an outlier). They use PERCENTILE.EXC to get a robust high benchmark.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Income (₹)</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">25000</td></tr><tr><td className="border px-3 py-1">28000</td></tr>
                  <tr><td className="border px-3 py-1">32000</td></tr><tr><td className="border px-3 py-1">35000</td></tr>
                  <tr><td className="border px-3 py-1">40000</td></tr><tr><td className="border px-3 py-1">42000</td></tr>
                  <tr><td className="border px-3 py-1">45000</td></tr><tr><td className="border px-3 py-1">50000</td></tr>
                  <tr><td className="border px-3 py-1">120000</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-indigo-300">=PERCENTILE.EXC(A2:A10, 0.9) → ≈ 85000 (interpolated, excludes the 120000 outlier)</p>
              <p className="mt-1 text-indigo-300">=PERCENTILE.INC(A2:A10, 0.9) → &gt 100000 (pulled by outlier)</p>
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
              <button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-indigo-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“percentile_exc_data”</strong> from <code>statistical_functions.xlsx</code> contains datasets for comparing PERCENTILE.EXC with PERCENTILE.INC.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="percentile_exc_data" title="PERCENTILE.EXC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic26_files/excel_files/</code> with sheet “percentile_exc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using k=0 or k=1 – PERCENTILE.EXC does not accept them; returns #NUM!.</li>
            <li>Applying to very small datasets – for n such that k*(n+1) &lt 1 or &gt n, the function returns #NUM!.</li>
            <li>Confusing PERCENTILE.EXC with PERCENTILE.INC – results differ, especially for small samples.</li>
            <li>Expecting the result to always be a value from the dataset – interpolation often occurs.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use PERCENTILE.EXC when you need to match statistical packages (R, SPSS) that use exclusive definitions.</li>
            <li>Check dataset size: for n &lt 3, some percentiles may be undefined (e.g., 25th percentile for n=2 returns #NUM!).</li>
            <li>Combine with IFERROR to handle #NUM! gracefully: =IFERROR(PERCENTILE.EXC(data, k), "N/A").</li>
            <li>Document which percentile method you use when publishing results.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “For a dataset of only 10 numbers, what is the maximum possible index for the 90th percentile using PERCENTILE.EXC? index = 0.9*(10+1)=9.9. That is between the 9th and 10th values – so the 90th percentile is never the maximum.<br />
            Observe carefully: PERCENTILE.EXC always gives a value between the min and max, never equal to them – that is its defining property.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>In Excel 365, you can compute multiple exclusive percentiles at once: =PERCENTILE.EXC(data, {0.1,0.2,0.3,0.4,0.5}).</li>
            <li>For large datasets (n &gt 1000), the difference between .INC and .EXC is negligible, but the choice still matters for documentation.</li>
            <li>Use PERCENTILE.EXC to define robust outlier thresholds that are not influenced by extreme values.</li>
            <li>Combine with QUARTILE.EXC if you only need quartiles (1st, 2nd, 3rd).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =PERCENTILE.EXC(array, k)</li>
            <li>✅ k must be strictly between 0 and 1 (exclusive)</li>
            <li>✅ Never returns the minimum or maximum value</li>
            <li>✅ Uses formula index = k*(n+1)</li>
            <li>✅ Returns #NUM! for k=0, k=1, or when n is insufficient</li>
            <li>✅ Interpolates between data points when needed</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="PERCENTILE.EXC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a small dataset, e.g., {1,2,3,4,5,6,7,8,9,10}. Compute PERCENTILE.EXC for k=0.1, 0.25, 0.5, 0.75, 0.9. Compare with PERCENTILE.INC. Show that k=0 and k=1 produce errors. Explain the index formula. Use the Excel sheet 'percentile_exc_data' with data that has outliers to demonstrate that the exclusive method is less influenced by extremes. Discuss real scenarios: why a statistician might prefer exclusive percentiles."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}