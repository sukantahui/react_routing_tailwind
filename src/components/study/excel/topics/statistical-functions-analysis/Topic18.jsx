import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic18_files/topic18_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic18() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            VAR.P Function (Population Variance)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            VAR.P calculates the variance of an entire population – the average of squared deviations from the mean, expressed in squared units. Use it when you have all possible data points.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-indigo-500">
            =VAR.P(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-indigo-300">Return type:</strong> Numeric (population variance)</li>
            <li><strong className="text-indigo-300">Purpose:</strong> Calculates the exact variance of a population using n denominator.</li>
            <li><strong className="text-indigo-300">When to use:</strong> When your data represents the entire population (e.g., all 50 employees in a small company, all students in a class, all sales days in a closed month).</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 Population variance is smaller than sample variance for the same data, because denominator n > n-1.
          </div>
        </section>

        {/* How VAR.P Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How VAR.P Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              VAR.P computes the variance as: <strong>SUM((x - μ)²) / n</strong>, where μ is the population mean.
              It ignores text, blanks, and logical values.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="font-mono text-sm">✅ =VAR.P(10,12,14,16,18) → 8</p>
              <p className="font-mono text-sm mt-1">✅ =VAR.P(A1:A100) → population variance of values in A1:A100</p>
              <p className="font-mono text-sm mt-1">⚠️ For the same data, VAR.P is smaller than VAR.S.</p>
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
              <strong>Scenario:</strong> A small school has exactly 30 students. The principal records all exam scores (the whole population) and wants to compute the exact variance of scores.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">1-30</td><td className="border px-3 py-1">all scores</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-indigo-300">=VAR.P(B2:B31) → exact variance of the population.</p>
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
            Sheet <strong>“var_p_data”</strong> from <code>statistical_functions.xlsx</code> contains population datasets. Compare VAR.P with VAR.S.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="var_p_data" title="VAR.P Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic18_files/excel_files/</code> with sheet “var_p_data”.</p>
            </div>
          )}
        </section>

        {/* VAR.S vs VAR.P Recap */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 VAR.P vs VAR.S</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>VAR.P</strong> = SUM((x-μ)²) / n – exact variance of the population.</li>
            <li><strong>VAR.S</strong> = SUM((x-x̄)²) / (n-1) – unbiased estimate for a sample.</li>
            <li>VAR.P is always ≤ VAR.S for the same dataset (except when n=1, where VAR.S is undefined).</li>
            <li>As n grows large, the difference becomes negligible.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using VAR.P on a sample – this underestimates the true population variance.</li>
            <li>Forgetting that variance is in squared units – misinterpretation as original units is a common mistake.</li>
            <li>Confusing VAR.P with VAR.S – remember: P for population, S for sample.</li>
            <li>Applying VAR.P to an empty or single‑value range – single value returns 0, but that disguises that variance is undefined for n=1.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Only use VAR.P when you are absolutely certain you have the entire population.</li>
            <li>If unsure, use VAR.S – it is the safer, more conservative choice.</li>
            <li>Label your calculations clearly (e.g., "Population Variance" vs "Sample Variance").</li>
            <li>Use VAR.P in descriptive statistics when you have full census data.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have the complete list of all employees’ salaries in a small company (100 people), VAR.P gives the exact variance. But if you only sampled 10 employees, using VAR.P would give a variance that is too small (biased).<br />
            Observe carefully: The same formula on the same numbers returns a different value depending on whether they represent a population or a sample. It’s about what the data means, not just the numbers.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use VAR.P with STDEV.P to keep units consistent: STDEV.P = SQRT(VAR.P).</li>
            <li>For conditional population variance, use array formula: =VAR.P(IF(criteria_range=criteria, value_range)).</li>
            <li>In quality control, use VAR.P for finite lots where every item is inspected.</li>
            <li>Use AGGREGATE(9,6,range) to compute population variance while ignoring errors (function number 9 = VAR.P).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =VAR.P(number1, [number2], …)</li>
            <li>✅ Use for entire population (not sample)</li>
            <li>✅ Denominator = n</li>
            <li>✅ For a single number, returns 0</li>
            <li>✅ Square of STDEV.P</li>
            <li>✅ Smaller than VAR.S for the same data (except infinite n)</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="VAR.P Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Show the same dataset (e.g., {1,2,3,4,5}) with both VAR.P (2) and VAR.S (2.5). Explain that the difference is the denominator (5 vs 4). Then discuss real scenarios: the entire class (population) vs a random sample of students. Use the sheet 'var_p_data' with a column of full population data and a sample column for comparison."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}