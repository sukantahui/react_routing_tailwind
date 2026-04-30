import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic29_files/topic29_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic29() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent">
            CORREL Function (Correlation Coefficient Analysis)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            CORREL returns the Pearson correlation coefficient, a measure of the linear relationship between two sets of data. It tells you how strongly two variables move together – from -1 (perfect negative) to +1 (perfect positive), with 0 indicating no linear relationship.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-sky-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-sky-400">📈</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-sky-500">
            =CORREL(array1, array2)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-sky-300">Return type:</strong> Numeric (between -1 and 1)</li>
            <li><strong className="text-sky-300">Purpose:</strong> Measures the strength and direction of a linear relationship between two variables.</li>
            <li><strong className="text-sky-300">When to use:</strong> Analysing whether study hours correlate with exam scores, sales vs advertising spend, height vs weight, any bivariate numeric data.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 Interpretation: +1 = perfect positive (both increase together), -1 = perfect negative (one increases, the other decreases), near 0 = no linear relationship.
          </div>
        </section>

        {/* How CORREL Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How CORREL Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              The Pearson correlation coefficient is calculated as the covariance of the two variables divided by the product of their standard deviations. Excel's CORREL uses the same formula, ignoring text and blanks in either array (it pairs only numeric cells, ignoring missing values).
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-sky-500">
              <p className="font-mono text-sm">✅ =CORREL(A2:A100, B2:B100) → correlation between columns A and B</p>
              <p className="font-mono text-sm mt-1">✅ =CORREL(study_hours, exam_scores) → positive (e.g., 0.85)</p>
              <p className="font-mono text-sm mt-1">⚠️ If standard deviation of either array is zero, CORREL returns #DIV/0!.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a tuition centre wants to know if more study hours lead to higher exam scores. They collect data from 10 students.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Hours/Week</th><th className="border px-3 py-2">Exam Score</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">5</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">8</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">3</td><td className="border px-3 py-1">78</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">10</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">2</td><td className="border px-3 py-1">68</td></tr>
                  <tr><td className="border px-3 py-1">Rohan</td><td className="border px-3 py-1">6</td><td className="border px-3 py-1">88</td></tr>
                  <tr><td className="border px-3 py-1">Priya</td><td className="border px-3 py-1">7</td><td className="border px-3 py-1">91</td></tr>
                  <tr><td className="border px-3 py-1">Ankit</td><td className="border px-3 py-1">4</td><td className="border px-3 py-1">76</td></tr>
                  <tr><td className="border px-3 py-1">Meera</td><td className="border px-3 py-1">9</td><td className="border px-3 py-1">94</td></tr>
                  <tr><td className="border px-3 py-1">Kunal</td><td className="border px-3 py-1">5</td><td className="border px-3 py-1">86</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-sky-300">=CORREL(B2:B11, C2:C11) → ≈ 0.96 (strong positive correlation)</p>
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
              <button onClick={handleDownload} className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-sky-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“correl_data”</strong> from <code>statistical_functions.xlsx</code> contains multiple variables (Hours, Scores, Sales, Ads). Practice calculating correlations.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="correl_data" title="CORREL Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic29_files/excel_files/</code> with sheet “correl_data”.</p>
            </div>
          )}
        </section>

        {/* Interpretation Guide */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Interpreting Correlation</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>r = 1</strong> → Perfect positive linear relationship.</li>
            <li><strong>r = -1</strong> → Perfect negative linear relationship.</li>
            <li><strong>r &gt; 0.7</strong> → Strong positive correlation.</li>
            <li><strong>0.3 &lt; r &lt; 0.7</strong> → Moderate positive correlation.</li>
            <li><strong>-0.3 &lt; r &lt; 0.3</strong> → Weak or no linear correlation.</li>
            <li><strong>r &lt; -0.7</strong> → Strong negative correlation.</li>
          </ul>
          <p className="mt-3 text-gray-300 text-sm">⚠️ Correlation does <strong>not</strong> imply causation. A high correlation may be due to coincidence or a third confounding variable.</p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Assuming correlation implies causation – two variables may be correlated by chance.</li>
            <li>Using CORREL on data with outliers – a single outlier can distort the coefficient.</li>
            <li>Ignoring that CORREL only measures linear relationships – a U‑shaped curve can give near‑zero correlation even though variables are strongly related.</li>
            <li>Mixing different sized arrays – they must have the same number of data points (pairwise ignore blanks).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always visualise data with a scatter plot before interpreting correlation.</li>
            <li>Remove outliers or use robust correlation methods if needed.</li>
            <li>Check for non‑linear patterns (e.g., logarithmic or exponential) – correlation may not capture them.</li>
            <li>Use named ranges or Excel Tables to make formulas self‑documenting.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you calculate the correlation between ice cream sales and drowning incidents, you might find a strong positive correlation. Does that mean ice cream causes drowning? No – both are caused by hot weather (a confounding variable).<br />
            Observe carefully: Correlation reveals association, not causation. Always think about hidden factors.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use CORREL to build a correlation matrix for multiple variables (calculate pairwise correlations).</li>
            <li>Square the correlation (r²) to get the coefficient of determination – the proportion of variance explained.</li>
            <li>In Excel 365, use the Data Analysis Toolpak for advanced correlation and multiple regression.</li>
            <li>To compute correlation for a subset (e.g., only North region), use array formula: =CORREL(IF(region="North", values1), IF(region="North", values2)).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =CORREL(array1, array2)</li>
            <li>✅ Returns value between -1 and 1</li>
            <li>✅ Positive = variables increase together</li>
            <li>✅ Negative = one increases, other decreases</li>
            <li>✅ Near 0 = no linear relationship</li>
            <li>✅ Correlation does not imply causation</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="CORREL Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a scatter plot of study hours vs exam scores. Compute CORREL and show a strong positive. Then introduce a non‑linear example (e.g., stress vs performance) – the correlation might be near zero even though there is a strong U‑shaped relationship. Use the Excel sheet 'correl_data' with multiple variables and have students calculate pairwise correlations and interpret them. Discuss spurious correlations and confounding variables."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}