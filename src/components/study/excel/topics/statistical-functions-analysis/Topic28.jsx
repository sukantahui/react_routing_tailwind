import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic28_files/topic28_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic28() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            PERCENTRANK.EXC Function (Exclusive Percentage Ranking)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            PERCENTRANK.EXC returns the rank of a value in a dataset as a percentage between 0 and 1 (exclusive). 
            Unlike the inclusive version, it never returns 0 or 1 – the smallest value gets a rank &gt0 and the largest gets a rank &lt1. This matches the definition used in many statistical textbooks and packages.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-amber-500">
            =PERCENTRANK.EXC(array, x, [significance])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-amber-300">Return type:</strong> Numeric (a percentage between 0 and 1 exclusive)</li>
            <li><strong className="text-amber-300">Purpose:</strong> Returns the exclusive percentile rank (0 &lt rank &lt 1) of a value `x` within a dataset. The minimum value gets a rank &gt;0, maximum &lt;1.</li>
            <li><strong className="text-amber-300">When to use:</strong> When you need a rank that never takes the extremes (0% or 100%), which is preferred in many statistical analyses and when using percentiles in continuous distributions.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 For a dataset of size n, the exclusive rank is calculated as (count of values &lt x) / (n + 1), then smoothed by interpolation. The result is always between 0 and 1, never equal.
          </div>
        </section>

        {/* How PERCENTRANK.EXC Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How PERCENTRANK.EXC Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              PERCENTRANK.EXC first orders the data ascending. For a given `x`, it calculates the proportion of values strictly less than `x`, then uses interpolation for values between data points. The formula essentially computes rank = (R - 1) / (N - 1) for actual data points, but with adjustments so that the smallest value gets (1/(N+1)) and the largest gets (N/(N+1)).
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-mono text-sm">✅ =PERCENTRANK.EXC(A1:A100, 85) → exclusive rank of 85 (between 0 and 1)</p>
              <p className="font-mono text-sm mt-1">✅ =PERCENTRANK.EXC(A1:A100, 85, 4) → with 4 significant digits</p>
              <p className="font-mono text-sm mt-1">⚠️ If `x` is less than the minimum → #N/A; greater than the maximum → #N/A.</p>
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
              <strong>Scenario:</strong> A Barrackpore researcher is publishing a study on income distribution. Statistical journals often require exclusive percentiles (never 0% or 100%). She uses PERCENTRANK.EXC to report the relative standing of a specific income.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Income (₹)</th></tr></thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-1">25000</td>
                    <td className="border px-3 py-1">28000</td>
                    <td className="border px-3 py-1">32000</td>
                  </tr>  
                  <tr>
                    <td className="border px-3 py-1">35000</td>
                    <td className="border px-3 py-1">40000</td>
                    <td className="border px-3 py-1">45000</td>
                  </tr>  
                  <tr>
                    <td className="border px-3 py-1">50000</td>
                    <td className="border px-3 py-1">60000</td>
                    <td className="border px-3 py-1">75000</td>
                  </tr> 
                </tbody>
              </table>
              <p className="mt-3 text-amber-300">=PERCENTRANK.EXC(A2:A10, 40000) → ≈ 0.45 (45% of incomes are strictly below 40000)</p>
              <p className="mt-1 text-amber-300">For the minimum income 25000, .EXC returns ≈ 0.1 (not 0).</p>
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
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-amber-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“percentrank_exc_data”</strong> from <code>statistical_functions.xlsx</code> contains income and exam score data. Compare PERCENTRANK.EXC with .INC.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="percentrank_exc_data" title="PERCENTRANK.EXC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic28_files/excel_files/</code> with sheet “percentrank_exc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Expecting the function to return 0 for the minimum value – it returns #N/A instead (or a small positive number if interpolation extends).</li>
            <li>Using PERCENTRANK.EXC on very small datasets (n &lt 3) may produce #N/A for many values.</li>
            <li>Confusing with PERCENTRANK.INC – .EXC excludes extremes, .INC includes them.</li>
            <li>Not realising that the result is a proportion, not a percentage (multiply by 100 for percent).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use PERCENTRANK.EXC when replicating results from academic papers or standard statistical software (SPSS, R's `type=7`, etc.).</li>
            <li>For sample sizes smaller than 10, be cautious – the exclusive rank may be very coarse.</li>
            <li>Set the significance argument to avoid floating‑point noise when matching known values.</li>
            <li>Combine with IFERROR to handle #N/A gracefully: =IFERROR(PERCENTRANK.EXC(data, x), "N/A").</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have an exam score that is the absolute highest in the class, inclusive percentrank would give 100% (1). But exclusive percentrank would give, say, 0.95 (95%). Which one is more meaningful for the student? The exclusive version says the student is not the only one; with this method, no one ever gets 100% because the dataset is only a sample.<br />
            Observe carefully: PERCENTRANK.EXC is often used in inferential statistics where extreme ranks are biased.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use PERCENTRANK.EXC in combination with PERCENTILE.EXC – they are exact inverses.</li>
            <li>To convert from inclusive rank to exclusive rank for large n: exclusive ≈ inclusive * (n-1)/(n+1) + 1/(n+1).</li>
            <li>In Excel 365, you can apply PERCENTRANK.EXC to dynamic arrays and use the spill behaviour.</li>
            <li>For reporting, always mention whether you used inclusive (.INC) or exclusive (.EXC) rank.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =PERCENTRANK.EXC(array, x, [significance])</li>
            <li>✅ Returns value strictly between 0 and 1</li>
            <li>✅ x &lt min → #N/A; x &gt max → #N/A</li>
            <li>✅ Interpolates for values between data points</li>
            <li>✅ significance controls significant digits (default 3)</li>
            <li>✅ Use *100 for percentage display</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="PERCENTRANK.EXC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with the same dataset used for PERCENTRANK.INC. Show that the minimum value returns #N/A instead of 0, and the maximum returns #N/A instead of 1. Explain the formula: rank = (R-1)/(N+1) for data points. Use the Excel sheet to compare .INC and .EXC side by side. Discuss why exclusive ranks are sometimes preferred: they avoid the mathematical problem of mapping a finite sample to an infinite continuous distribution."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}