import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic16_files/topic16_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic16() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            STDEV.P Function (Population Standard Deviation)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            STDEV.P calculates the standard deviation for an entire population. It measures how much data points deviate from the mean, using the full dataset (not a sample).
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-cyan-500">
            =STDEV.P(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-cyan-300">Return type:</strong> Numeric (population standard deviation)</li>
            <li><strong className="text-cyan-300">Purpose:</strong> Calculates the standard deviation for an entire population – how spread out numbers are, using n denominator.</li>
            <li><strong className="text-cyan-300">When to use:</strong> When you have all possible values (the whole population), e.g., exam scores of all students in a small class, daily sales figures for a full year, all products from a finite batch.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 STDEV.P uses n denominator (no Bessel's correction). For samples, use STDEV.S.
          </div>
        </section>

        {/* How STDEV.P Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How STDEV.P Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              Population standard deviation uses <strong>n</strong> (the total count) in the denominator.
              It gives the exact standard deviation of the dataset without any correction.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-cyan-500">
              <p className="font-mono text-sm">✅ =STDEV.P(10,12,14,16,18) → 2.828</p>
              <p className="font-mono text-sm mt-1">✅ =STDEV.P(A1:A100) → population stdev of values in A1:A100</p>
              <p className="font-mono text-sm mt-1">⚠️ For the same data, STDEV.P is smaller than STDEV.S (because denominator is larger).</p>
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
              <strong>Scenario:</strong> A small school has exactly 30 students. The principal records all exam scores (the whole population) and wants to know the variability of scores.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">All 30 students</td><td className="border px-3 py-1">85, 90, 78, 92, 88, ...</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-cyan-300">=STDEV.P(B2:B31) → exact stdev of the population.</p>
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
            Sheet <strong>“stdev_p_data”</strong> from <code>statistical_functions.xlsx</code> contains population datasets (e.g., all employees, all daily sales). Compare STDEV.P and STDEV.S.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="stdev_p_data" title="STDEV.P Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic16_files/excel_files/</code> with sheet “stdev_p_data”.</p>
            </div>
          )}
        </section>

        {/* STDEV.P vs STDEV.S */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 STDEV.P vs STDEV.S</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>STDEV.P</strong> = SQRT(SUM((x - μ)²) / n) – exact for the whole population.</li>
            <li><strong>STDEV.S</strong> = SQRT(SUM((x - x̄)²) / (n-1)) – unbiased estimate for a sample.</li>
            <li>For large n, the difference becomes negligible, but for small datasets it matters.</li>
            <li>Never use STDEV.P on a sample – it will underestimate the true population variability.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using STDEV.P when your data is only a sample – leads to underestimation of true variability.</li>
            <li>Confusing STDEV.P with STDEV.S – remember: “P” for population, “S” for sample.</li>
            <li>Small population (n≥1) but n=1 returns 0 (not error), which disguises the fact that stdev is undefined for a single value.</li>
            <li>Misinterpreting a small population stdev as proof of consistency when the dataset might be too small.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Only use STDEV.P when you are certain you have the entire population.</li>
            <li>If unsure, use STDEV.S – it is safer and more conservative.</li>
            <li>Label your calculations clearly (e.g., “Population StDev” vs “Sample StDev”).</li>
            <li>Use STDEV.P in quality control when inspecting every unit of a finite batch.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have the complete set of all employees’ salaries in a small company (100 people), STDEV.P gives the exact standard deviation. If you only have a sample of 10 employees, you must use STDEV.S to avoid underestimating the true company-wide variation.<br />
            Observe carefully: The same data, but different formulas because of what the data represents.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use STDEV.P in Six Sigma for known finite populations (e.g., all units from a production run).</li>
            <li>For large n (n > 30), the difference between STDEV.P and STDEV.S is small; still, choose correctly.</li>
            <li>Combine with AVERAGE to compute the coefficient of variation: =STDEV.P(range)/AVERAGE(range).</li>
            <li>In dashboards, highlight the type of stdev used (population vs sample).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =STDEV.P(number1, [number2], …)</li>
            <li>✅ Use for entire population (not sample)</li>
            <li>✅ Uses n denominator (not n‑1)</li>
            <li>✅ For a single number, returns 0</li>
            <li>✅ Square root of VAR.P</li>
            <li>✅ Smaller than STDEV.S for the same data (except when n is huge)</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="STDEV.P Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Show the same dataset (e.g., {1,2,3,4,5}) with both STDEV.P (≈1.414) and STDEV.S (≈1.581). Explain why STDEV.P is smaller. Then ask students to decide – if these numbers represent all sales days in a month (population) or just a random week (sample). Use the sheet 'stdev_p_data' with a column of full population data and a smaller random sample from it."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}