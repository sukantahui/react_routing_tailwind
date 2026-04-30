import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic27_files/topic27_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic27() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            PERCENTRANK.INC Function (Relative Ranking Percentage)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            PERCENTRANK.INC returns the rank of a value in a dataset as a percentage (0% to 100% inclusive). It tells you what percentage of data points are ≤ the given value, making it ideal for percentile ranking and comparing positions across different datasets.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-lime-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-lime-400">📊</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-lime-500">
            =PERCENTRANK.INC(array, x, [significance])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-lime-300">Return type:</strong> Numeric (a percentage between 0 and 1 inclusive)</li>
            <li><strong className="text-lime-300">Purpose:</strong> Returns the percentile rank (0 to 1) of a value `x` within an array; 0 = minimum, 1 = maximum, inclusive.</li>
            <li><strong className="text-lime-300">When to use:</strong> Comparing an individual score to a reference group, calculating relative standing, converting raw scores to percentiles, normalising data.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 `significance` (optional) controls the number of significant digits (default 3). For exclusive ranking (0% to 100% exclusive), use PERCENTRANK.EXC.
          </div>
        </section>

        {/* How PERCENTRANK.INC Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How PERCENTRANK.INC Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              PERCENTRANK.INC counts the number of values less than or equal to `x`, then computes (count ≤ x – 1) / (n – 1). This gives a percentage from 0 (minimum) to 1 (maximum). If `x` falls between two data points, the function interpolates.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-lime-500">
              <p className="font-mono text-sm">✅ =PERCENTRANK.INC(A1:A100, 85) → rank of 85 as a percentage within the range</p>
              <p className="font-mono text-sm mt-1">✅ =PERCENTRANK.INC(A1:A100, 85, 4) → rank with 4 significant digits</p>
              <p className="font-mono text-sm mt-1">⚠️ If `x` is less than the minimum → 0; greater than the maximum → 1.</p>
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
              <strong>Scenario:</strong> In Barrackpore, students took a competitive exam. Swadeep scored 85. The teacher wants to know what percentage of scores are ≤ 85 (inclusive) to understand his relative standing.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Score</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">68</td><td className="border px-3 py-1">85</td><td className="border px-3 py-1">92</td><td className="border px-3 py-1">95</td><td className="border px-3 py-1">78</td></tr>
                </tbody>
               </table>
              <p className="mt-3 text-lime-300">=PERCENTRANK.INC(B2:B6, 85) → 0.5 (50% of scores ≤ 85)</p>
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
              <button onClick={handleDownload} className="bg-lime-600 hover:bg-lime-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lime-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“percentrank_inc_data”</strong> from <code>statistical_functions.xlsx</code> contains exam scores and sales data. Practice converting scores to percentile ranks.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="percentrank_inc_data" title="PERCENTRANK.INC Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic27_files/excel_files/</code> with sheet “percentrank_inc_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Confusing PERCENTRANK.INC with PERCENTILE.INC – PERCENTRANK gives the rank percentage of a given value, PERCENTILE gives the value at a given rank.</li>
            <li>Forgetting that the result is a decimal (0 to 1) not a percentage (0 to 100). Multiply by 100 to display as percent.</li>
            <li>Using it on small datasets – the rank formula (count-1)/(n-1) may give coarse results.</li>
            <li>Assuming the function is exclusive (it's inclusive of min and max).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Multiply the result by 100 and format as percentage: =PERCENTRANK.INC(range, x) * 100 & "%".</li>
            <li>Use PERCENTRANK.INC to compare scores across different tests (standardise).</li>
            <li>Set the significance argument to control decimal places and avoid floating‑point quirks.</li>
            <li>Combine with IF to rank only visible rows using helper columns.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have exam scores and you want to see the percentile rank of a student, you can use PERCENTRANK.INC. But for a student who scores exactly the minimum, the function returns 0. For the maximum, it returns 1.<br />
            Observe carefully: This is an inclusive rank; the minimum gets 0%, the maximum 100%, and all others are spread between. If you need a rank that never gives 0% or 100%, use PERCENTRANK.EXC.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use PERCENTRANK.INC to create a “percentile” column that can be used for conditional formatting (e.g., top 10%).</li>
            <li>Combine with RANK.EQ to verify – RANK.EQ gives order, PERCENTRANK gives standardised position.</li>
            <li>For a dynamic rank that updates when data changes, use PERCENTRANK.INC inside a table – it will auto‑recalculate.</li>
            <li>In Excel 365, you can apply PERCENTRANK.INC directly to a dynamic array.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =PERCENTRANK.INC(array, x, [significance])</li>
            <li>✅ Returns value between 0 and 1 inclusive</li>
            <li>✅ x &lt min → 0; x &gt max → 1</li>
            <li>✅ Interpolates for values between data points</li>
            <li>✅ significance controls significant digits (default 3)</li>
            <li>✅ Use *100 for percentage display</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="PERCENTRANK.INC Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start by explaining the difference between rank (1st, 2nd) and percentile rank (percentage of scores below). Use a small dataset: {10,20,30,40,50}. Calculate PERCENTRANK.INC for 20 → 0.25 (25% of values ≤20). Show that min gives 0, max gives 1. Then use the Excel sheet 'percentrank_inc_data' with exam scores. Have students calculate percentile ranks for different scores and compare with RANK.EQ. Discuss the significance argument for rounding."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}