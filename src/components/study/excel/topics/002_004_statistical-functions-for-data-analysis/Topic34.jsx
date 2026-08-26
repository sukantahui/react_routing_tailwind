import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic34_files/topic34_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic34() {
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
            Outlier Detection using Statistical Functions
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Outliers are extreme values that deviate significantly from other observations. Detecting them is crucial for data cleaning, quality control, and robust statistical analysis. Excel provides powerful functions like STDEV, QUARTILE, and IQR to automatically flag outliers.
          </p>
        </header>

        {/* Why Outlier Detection Matters */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400">🔍</span> Why Detect Outliers?
          </h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              Outliers can be caused by measurement errors, data entry mistakes, or genuine rare events. They can skew statistical summaries (mean, standard deviation) and mislead regression models. Detecting them allows you to decide whether to remove, correct, or keep them based on domain knowledge.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="font-mono text-sm">✅ In a salary dataset, a CEO’s salary is an outlier compared to regular employees.</p>
              <p className="font-mono text-sm mt-1">✅ In exam scores, a 0 due to absence may be an outlier if you are analysing performance.</p>
            </div>
          </div>
        </section>

        {/* Two Common Methods */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 Two Main Approaches</h2>
          <div className="mt-4 space-y-6 text-gray-200">
            <div>
              <p className="font-semibold text-purple-300 text-lg">1. Z‑Score / Standard Deviation Method</p>
              <p class="mt-1">Assumes data is roughly normal. Flag values outside mean ± k * stdev (often k=2 or 3).</p>
              <p className="font-mono text-sm mt-1">Upper bound = AVERAGE(range) + 2*STDEV.S(range)</p>
              <p className="font-mono text-sm">Lower bound = AVERAGE(range) − 2*STDEV.S(range)</p>
            </div>
            <div>
              <p className="font-semibold text-purple-300 text-lg">2. Interquartile Range (IQR) Method</p>
              <p class="mt-1">Robust to skewness. Flag values below Q1 − 1.5*IQR or above Q3 + 1.5*IQR.</p>
              <p className="font-mono text-sm mt-1">IQR = QUARTILE.INC(range, 3) − QUARTILE.INC(range, 1)</p>
              <p className="font-mono text-sm">Lower fence = Q1 − 1.5*IQR, Upper fence = Q3 + 1.5*IQR</p>
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
              <strong>Scenario:</strong> A Barrackpore factory measures the diameter of 20 bolts. Most are around 10 mm, but one is 15 mm and another is 7 mm (due to a machine glitch). Quality control uses IQR to automatically flag these outliers.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Bolt</th><th className="border px-3 py-2">Diameter (mm)</th></tr></thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-1">1-18</td>
                    <td className="border px-3 py-1">9.8 – 10.2</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">19</td>
                    <td className="border px-3 py-1">7.0</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">20</td>
                    <td className="border px-3 py-1">15.0</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-purple-300">IQR method: Q1≈9.9, Q3≈10.1, IQR=0.2, fences: 9.6 and 10.4 → 7.0 and 15.0 are outliers.</p>
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
            Sheet <strong>“outlier_data”</strong> from <code>statistical_functions.xlsx</code> contains datasets with potential outliers. Practice using STDEV and IQR formulas.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="outlier_data" title="Outlier Detection Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic34_files/excel_files/</code> with sheet “outlier_data”.</p>
            </div>
          )}
        </section>

        {/* Formulas to Flag Outliers */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Flagging Outliers with Excel Formulas</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Z‑score method</strong> (assuming normality): =ABS((A1 - AVERAGE(A:A))/STDEV.P(A:A)) &gt; 2</li>
            <li><strong>IQR method</strong> (non‑parametric): =OR(A1 &lt; (QUARTILE.INC(A:A,1)-1.5*(QUARTILE.INC(A:A,3)-QUARTILE.INC(A:A,1))), A1 &gt; (QUARTILE.INC(A:A,3)+1.5*(QUARTILE.INC(A:A,3)-QUARTILE.INC(A:A,1))))</li>
            <li>For large datasets, reference fixed cells for Q1, Q3, IQR to speed up calculation.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using Z‑score method on skewed data – many points may be flagged as outliers incorrectly.</li>
            <li>Applying the 1.5*IQR rule blindly – for small datasets, use 3*IQR or higher multiplier.</li>
            <li>Not handling blanks or errors – they break formulas; use IFERROR and ISBLANK.</li>
            <li>Removing outliers without understanding the cause – genuine rare events should be kept.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always visualise data with a box plot (Excel can create one) before removing outliers.</li>
            <li>Use both IQR and Z‑score methods and compare results.</li>
            <li>Document the outlier detection rule and any removed points.</li>
            <li>Create helper columns for Q1, Q3, IQR, then use simple comparisons to flag outliers.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you remove outliers from a dataset before calculating the average, the new average can be very different. Is that always desirable? For a salary survey, the CEO’s salary is an outlier but removing it hides the true distribution. <br />
            Observe carefully: Outlier detection should be followed by a decision based on domain knowledge, not automatic deletion.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use conditional formatting to highlight outliers directly: =A1 &gt; $D$1 (where D1 holds upper fence).</li>
            <li>For large datasets, use dynamic arrays with FILTER to extract only non‑outliers.</li>
            <li>In Excel 365, create a LAMBDA function to reuse outlier detection logic.</li>
            <li>Combine outlier detection with TRIMMEAN to compute a trimmed mean that excludes a percentage of extreme values.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Z‑score method: |x − μ| / σ &gt; threshold (2 or 3)</li>
            <li>✅ IQR method: fences at Q1 − 1.5*IQR and Q3 + 1.5*IQR</li>
            <li>✅ Use QUARTILE.INC for Q1, Q3 and IQR</li>
            <li>✅ Flag outliers with IF formula =IF(OR(cond1, cond2), "Outlier", "")</li>
            <li>✅ Always investigate before deleting outliers</li>
            <li>✅ Document any data cleaning steps</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Outlier Detection – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple dataset containing one obvious outlier. Compute Q1, Q3, IQR manually and show the fences. Then introduce the Z‑score method. Use the Excel sheet 'outlier_data' with a mix of clean data and outliers. Ask students to flag outliers using both methods. Discuss the difference in results for skewed distributions. Finally, discuss real‑life examples (income, exam scores)."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}