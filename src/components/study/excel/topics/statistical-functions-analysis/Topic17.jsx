import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic17_files/topic17_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic17() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            VAR.S Function (Sample Variance)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            VAR.S calculates the variance of a sample – a measure of how spread out numbers are, expressed in squared units. It is the square of the sample standard deviation.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-orange-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-orange-500">
            =VAR.S(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-orange-300">Return type:</strong> Numeric (sample variance)</li>
            <li><strong className="text-orange-300">Purpose:</strong> Estimates variance based on a sample, using n-1 denominator (Bessel's correction).</li>
            <li><strong className="text-orange-300">When to use:</strong> When you have a sample from a larger population and need an unbiased estimate of the population variance.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 Variance is the average of squared deviations from the mean. It is in squared units – to return to original units, take square root (STDEV.S).
          </div>
        </section>

        {/* How VAR.S Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How VAR.S Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              VAR.S computes the variance as: <strong>SUM((x - x̄)²) / (n-1)</strong>. It ignores text, blanks, and logical values.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="font-mono text-sm">✅ =VAR.S(10,12,14,16,18) → 10</p>
              <p className="font-mono text-sm mt-1">✅ =VAR.S(A1:A100) → sample variance of values in A1:A100</p>
              <p className="font-mono text-sm mt-1">⚠️ For the same data, VAR.S is larger than VAR.P (because denominator is n-1).</p>
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
              <strong>Scenario:</strong> A market researcher surveys 20 random customers (a sample) about their monthly spending. He wants to estimate the variance of spending for the entire customer base.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Sample ID</th><th className="border px-3 py-2">Spending (₹)</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">1</td><td className="border px-3 py-1">2500</td></tr>
                  <tr><td className="border px-3 py-1">2</td><td className="border px-3 py-1">3200</td></tr>
                  <tr><td className="border px-3 py-1">...</td><td className="border px-3 py-1">...</td></tr>
                  <tr><td className="border px-3 py-1">20</td><td className="border px-3 py-1">2800</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-orange-300">=VAR.S(B2:B21) → estimated variance of population spending.</p>
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
              <button onClick={handleDownload} className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-orange-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“var_s_data”</strong> from <code>statistical_functions.xlsx</code> contains sample datasets. See how variance compares to standard deviation.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="var_s_data" title="VAR.S Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic17_files/excel_files/</code> with sheet “var_s_data”.</p>
            </div>
          )}
        </section>

        {/* VAR.S vs VAR.P */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 VAR.S vs VAR.P</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>VAR.S</strong> uses n-1 denominator – unbiased estimator for sample data.</li>
            <li><strong>VAR.P</strong> uses n denominator – exact variance of a population.</li>
            <li>For the same numbers, VAR.S &gt; VAR.P.</li>
            <li>VAR.S corresponds to STDEV.S; VAR.P corresponds to STDEV.P.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using VAR.S when you have the entire population – results will be slightly inflated (but still technically correct if you treat population as sample).</li>
            <li>Forgetting that variance is in squared units – misinterpretation as original units leads to wrong conclusions.</li>
            <li>Applying VAR.S to a dataset with fewer than 2 numbers returns #DIV/0!.</li>
            <li>Confusing VAR.S with VAR.P – remember: S for sample, P for population.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always report standard deviation along with variance to keep units meaningful.</li>
            <li>Use VAR.S for inferential statistics (confidence intervals, hypothesis tests).</li>
            <li>Clean data first – remove errors and convert text numbers.</li>
            <li>Check sample size: small n can produce unstable variance estimates.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you calculate VAR.S for a set of exam scores (sample of students), the result is in squared points. What does ‘squared points’ mean? It’s hard to interpret, which is why we take the square root to get standard deviation (points).<br />
            Observe carefully: Variance is a stepping stone; use it to compute standard deviation or for advanced statistics like ANOVA.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use VAR.S in conjunction with CONFIDENCE.NORM to compute margin of error.</li>
            <li>For conditional variance, use array formula: =VAR.S(IF(range=criteria, value_range)).</li>
            <li>Use AGGREGATE(10,6,range) to compute sample variance ignoring errors.</li>
            <li>In Excel 365, use the LET function to store intermediate calculations.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =VAR.S(number1, [number2], …)</li>
            <li>✅ For samples (unbiased estimate)</li>
            <li>✅ Denominator n-1 (Bessel's correction)</li>
            <li>✅ Returns #DIV/0! if fewer than 2 numbers</li>
            <li>✅ Square of STDEV.S</li>
            <li>✅ Ignored: text, blanks, logicals</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="VAR.S Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start by showing that variance = (standard deviation)². Use a tiny dataset {1,2,3,4,5}: mean=3, squared deviations (4,1,0,1,4), sum=10, n=5, VAR.S =10/4=2.5, STDEV.S=√2.5≈1.581. Emphasise that variance is in squared units, so it is less intuitive. The sheet 'var_s_data' should have a sample column and a population column side by side for comparison."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}