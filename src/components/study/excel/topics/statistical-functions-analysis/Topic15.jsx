import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic15_files/topic15_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic15() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            STDEV.S Function (Sample Standard Deviation)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            STDEV.S estimates the standard deviation based on a sample of a population. It measures how much individual data points deviate from the mean – a key measure of spread or variability.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-sky-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-sky-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-sky-500">
            =STDEV.S(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-sky-300">Return type:</strong> Numeric (sample standard deviation)</li>
            <li><strong className="text-sky-300">Purpose:</strong> Calculates the standard deviation of a sample – how spread out numbers are from the average.</li>
            <li><strong className="text-sky-300">When to use:</strong> When you have a sample of data (not the entire population), e.g., test scores of a class (sample of all students), quality control samples, survey responses.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 STDEV.S uses n-1 denominator (Bessel's correction). For population, use STDEV.P.
          </div>
        </section>

        {/* How STDEV.S Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How STDEV.S Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              Standard deviation measures the average distance of data points from the mean. <br />
              <strong className="text-sky-300">Sample standard deviation (STDEV.S)</strong> uses <strong>n-1</strong> in the denominator to provide an unbiased estimate of the population variance.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-sky-500">
              <p className="font-mono text-sm">✅ =STDEV.S(10,12,14,16,18) → 3.162</p>
              <p className="font-mono text-sm mt-1">✅ =STDEV.S(A1:A100) → sample standard deviation of values in A1:A100</p>
              <p className="font-mono text-sm mt-1">⚠️ Small sample (n&lt;2) → #DIV/0! error</p>
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
              <strong>Scenario:</strong> At a Barrackpore factory, quality control measures the diameter (mm) of 10 random bolts (sample). The engineer wants to know the variability: small deviation means consistent production.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Bolt</th><th className="border px-3 py-2">Diameter (mm)</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">1</td><td className="border px-3 py-1">10.1</td></tr>
                  <tr><td className="border px-3 py-1">2</td><td className="border px-3 py-1">10.2</td></tr>
                  <tr><td className="border px-3 py-1">3</td><td className="border px-3 py-1">9.9</td></tr>
                  <tr><td className="border px-3 py-1">4</td><td className="border px-3 py-1">10.0</td></tr>
                  <tr><td className="border px-3 py-1">5</td><td className="border px-3 py-1">10.1</td></tr>
                  <tr><td className="border px-3 py-1">6</td><td className="border px-3 py-1">9.8</td></tr>
                  <tr><td className="border px-3 py-1">7</td><td className="border px-3 py-1">10.2</td></tr>
                  <tr><td className="border px-3 py-1">8</td><td className="border px-3 py-1">10.0</td></tr>
                  <tr><td className="border px-3 py-1">9</td><td className="border px-3 py-1">9.9</td></tr>
                  <tr><td className="border px-3 py-1">10</td><td className="border px-3 py-1">10.1</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-sky-300">=STDEV.S(B2:B11) ≈ 0.13 mm (low variability → process is stable).</p>
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
            Sheet <strong>“stdev_s_data”</strong> from <code>statistical_functions.xlsx</code> contains sample data (exam scores, product measurements). Practice STDEV.S.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="stdev_s_data" title="STDEV.S Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic15_files/excel_files/</code> with sheet “stdev_s_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using STDEV.S when you have the entire population (should use STDEV.P).</li>
            <li>Small sample sizes (n&lt;2) return #DIV/0! – need at least 2 numbers.</li>
            <li>Confusing STDEV.S with VAR.S (variance) – standard deviation is the square root of variance.</li>
            <li>Applying to data with outliers – high standard deviation may be misleading; consider trimming.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always decide if your data is a sample or population before choosing STDEV.S vs STDEV.P.</li>
            <li>Combine with AVERAGE: typical data range = mean ± 2*stdev (for normal distribution).</li>
            <li>Use conditional formatting to highlight deviations beyond 2 standard deviations.</li>
            <li>Clean data before calculating – remove errors and non‑numeric values.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you calculate STDEV.S for exam scores of a class (30 students) and for the whole district (all students), which standard deviation would be larger? Usually the whole district has more variability.<br />
            Observe carefully: STDEV.S – sample standard deviation – tends to be larger than STDEV.P because it divides by n‑1, not n. It corrects for the fact that samples underestimate variability.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use STDEV.S in Six Sigma and quality control to assess process variation.</li>
            <li>Quick z‑score calculation: = (value - AVERAGE(range)) / STDEV.S(range).</li>
            <li>Use AGGREGATE(7,6,range) to compute sample standard deviation ignoring errors.</li>
            <li>For grouped data, use array formulas to compute standard deviation for subsets.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =STDEV.S(number1, [number2], …)</li>
            <li>✅ For samples (not entire population)</li>
            <li>✅ Uses n‑1 denominator (unbiased estimate)</li>
            <li>✅ Returns #DIV/0! if fewer than 2 numbers</li>
            <li>✅ Square root of VAR.S</li>
            <li>✅ Ignores text, blanks, logicals</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="STDEV.S Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple set: {1,2,3,4,5} – calculate mean (3), deviations, variance, then STDEV.S ≈ 1.581. Compare with STDEV.P (≈1.414). Emphasise the n‑1 correction. Use the sheet 'stdev_s_data' with two columns: small sample vs entire population, and let students compare STDEV.S and STDEV.P."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}