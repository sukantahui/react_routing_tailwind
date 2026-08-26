import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic21_files/topic21_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic21() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            RANK.EQ Function (Standard Ranking)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            RANK.EQ returns the rank (position) of a number within a list, with equal numbers receiving the same rank (dense ranking). It is essential for comparing performance, competition standings, and percentile analysis.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-yellow-400">🏆</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-yellow-500">
            =RANK.EQ(number, ref, [order])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-yellow-300">Return type:</strong> Numeric (rank position)</li>
            <li><strong className="text-yellow-300">Purpose:</strong> Returns the rank of a number in a list – the highest number gets rank 1 (if order=0).</li>
            <li><strong className="text-yellow-300">When to use:</strong> Ranking exam scores, sales performance, sports standings, customer ratings.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 Ties get the same rank, and the next rank is skipped (e.g., 1,2,2,4). Use RANK.AVG for average ranking.
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 RANK.EQ Parameters</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              <span className="text-yellow-300 font-mono">number</span> – The value whose rank you want to find.<br />
              <span className="text-yellow-300 font-mono">ref</span> – The array or range of numbers to rank against.<br />
              <span className="text-yellow-300 font-mono">order</span> – Optional. 0 or omitted = descending (largest is rank 1); any non‑zero = ascending (smallest is rank 1).
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="font-mono text-sm">✅ =RANK.EQ(92, B2:B10) → rank of 92 in descending order</p>
              <p className="font-mono text-sm mt-1">✅ =RANK.EQ(78, B2:B10, 1) → rank of 78 in ascending order</p>
              <p className="font-mono text-sm mt-1">⚠️ If the number is not in ref, returns #N/A.</p>
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
              <strong>Scenario:</strong> In Barrackpore, students took a competitive exam. The teacher wants to assign ranks (highest score = rank 1). Two students scored 95, so they both get rank 1, and the next student gets rank 3 (skipping rank 2).
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th><th className="border px-3 py-2">Rank</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td><td className="border px-3 py-1">=RANK.EQ(B2, $B$2:$B$7)</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td><td className="border px-3 py-1">=RANK.EQ(B3, $B$2:$B$7)</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">95</td><td className="border px-3 py-1">1</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td><td className="border px-3 py-1">1</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">68</td><td className="border px-3 py-1">5</td></tr>
                  <tr><td className="border px-3 py-1">Rohan</td><td className="border px-3 py-1">78</td><td className="border px-3 py-1">4</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-yellow-300">Note: Scores 95 both rank 1, next score 92 ranks 3 (skipping rank 2).</p>
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
              <button onClick={handleDownload} className="bg-yellow-600 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-yellow-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“rank_eq_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and exam data. Practice ranking.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="rank_eq_data" title="RANK.EQ Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic21_files/excel_files/</code> with sheet “rank_eq_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting to lock the ref range with absolute references ($A$2:$A$100) when copying the formula down – ranks will shift incorrectly.</li>
            <li>Confusing order argument: 0 = descending (largest is rank 1), 1 = ascending (smallest is rank 1).</li>
            <li>Not understanding tie behaviour – with RANK.EQ, ties skip the next rank(s).</li>
            <li>Using RANK.EQ when you want average ranking for ties (need RANK.AVG).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always use absolute references for the ref range if you plan to copy the formula.</li>
            <li>For descending ranking (highest = rank 1), omit order or set it to 0.</li>
            <li>Combine RANK.EQ with COUNTIF to break ties: =RANK.EQ(A1, range) + COUNTIF($A$1:A1, A1) - 1, but that gives unique ranking.</li>
            <li>Use RANK.EQ in dashboards to highlight top performers dynamically.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If two students get the same score, they both get rank 1, and the next gets rank 3. Is that fair when awarding scholarships? Some competitions use a different tie‑breaking rule (e.g., average rank).<br />
            Observe carefully: RANK.EQ’s skipping ranks is standard for many sports and exams, but for small groups you may prefer RANK.AVG.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To get a “dense” rank (1,2,2,3 instead of 1,2,2,4), use SUMPRODUCT formula: =SUMPRODUCT((range&gt;cell)/COUNTIF(range,range))+1.</li>
            <li>Use RANK.EQ with COUNTIF to create unique ranks: =RANK.EQ(cell, range) + COUNTIF($A$1:cell, cell) - 1.</li>
            <li>For conditional ranking (e.g., rank within each region), use array formula: =SUMPRODUCT((region=this_region)*(value&gt;this_value))+1.</li>
            <li>In Excel 365, you can also use the SORT and XMATCH combo for dynamic ranking.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =RANK.EQ(number, ref, [order])</li>
            <li>✅ order = 0 (default) → descending (largest = rank 1)</li>
            <li>✅ order = 1 → ascending (smallest = rank 1)</li>
            <li>✅ Ties get same rank, next rank(s) skipped</li>
            <li>✅ Returns #N/A if number not in ref</li>
            <li>✅ Always absolute reference ref ($A$2:$A$100) when copying</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="RANK.EQ Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list of exam scores. Show that RANK.EQ gives standard competition ranking (1,2,2,4). Demonstrate both descending and ascending orders. Use the sheet 'rank_eq_data' with sales data and exam scores. Have students assign ranks and then compare with RANK.AVG (next topic). Highlight the importance of absolute references."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}