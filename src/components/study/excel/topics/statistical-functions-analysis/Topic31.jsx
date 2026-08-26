import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic31_files/topic31_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic31() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            TREND Function (Trend Analysis with Multiple Values)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            TREND returns values along a linear trend line. It can predict multiple y‑values for multiple new x‑values in one go, making it ideal for forecasting multiple periods or fitting a line to historical data.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400">📈</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-purple-500">
            =TREND(known_y's, [known_x's], [new_x's], [const])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-purple-300">Return type:</strong> Array of predicted y‑values (spills in 365, array formula in older).</li>
            <li><strong className="text-purple-300">Purpose:</strong> Fits a straight line (y = a + bx) and returns predicted y for given new x's.</li>
            <li><strong className="text-purple-300">When to use:</strong> Forecasting multiple future periods, adding a trendline to historical data, calculating fitted values for a scatter plot.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 If `const` = TRUE (default), the intercept is calculated normally; if FALSE, the line is forced through the origin (a=0).
          </div>
        </section>

        {/* How TREND Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How TREND Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              TREND uses the least squares method to compute the best‑fitting line. Unlike FORECAST.LINEAR (which only predicts one y at a time), TREND can accept a range of new_x's and return an array of predicted values. In Excel 365, the result automatically spills; in older versions, you must select a range and press Ctrl+Shift+Enter.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="font-mono text-sm">✅ =TREND(B2:B11, A2:A11) → fitted values for each original x</p>
              <p className="font-mono text-sm mt-1">✅ =TREND(B2:B11, A2:A11, C2:C4) → forecast for new x's in C2:C4</p>
              <p className="font-mono text-sm mt-1">⚠️ For non‑linear data, the trendline may not capture the pattern.</p>
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
              <strong>Scenario:</strong> A Barrackpore store records monthly sales for 6 months (months 1‑6). They want to forecast sales for months 7, 8, 9 in a single formula and simultaneously calculate the fitted values for historical months.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Month</th><th className="border px-3 py-2">Sales (₹1000)</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">1</td><td className="border px-3 py-1">100</td></tr>
                  <tr><td className="border px-3 py-1">2</td><td className="border px-3 py-1">120</td></tr>
                  <tr><td className="border px-3 py-1">3</td><td className="border px-3 py-1">135</td></tr>
                  <tr><td className="border px-3 py-1">4</td><td className="border px-3 py-1">150</td></tr>
                  <tr><td className="border px-3 py-1">5</td><td className="border px-3 py-1">170</td></tr>
                  <tr><td className="border px-3 py-1">6</td><td className="border px-3 py-1">190</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-purple-300">=TREND(B2:B7, A2:A7, {7,8,9}) → {208, 226, 244} (forecast)</p>
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
            Sheet <strong>“trend_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and advertising data. Practice forecasting multiple periods at once.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="trend_data" title="TREND Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic31_files/excel_files/</code> with sheet “trend_data”.</p>
            </div>
          )}
        </section>

        {/* Array Behaviour Explanation */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Array Behaviour</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Excel 365 (Dynamic Arrays):</strong> TREND spills results automatically into adjacent cells.</li>
            <li><strong>Excel 2019 and earlier:</strong> You must select a range large enough to hold the results, enter the formula, and press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd>.</li>
            <li>If new_x's is omitted, TREND returns fitted values for the original known_x's.</li>
            <li>The result array always has the same shape as new_x's (same number of rows and columns).</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Not selecting enough cells before entering the array formula in older Excel – results are truncated.</li>
            <li>Forgetting that TREND assumes linear relationship – using it on exponential data yields poor forecasts.</li>
            <li>Passing a column array for known_x's but a row array for new_x's – shapes must be consistent (TREND returns one row for each row of new_x's).</li>
            <li>Ignoring the const argument – if you force through origin (const=FALSE), the line may not fit well.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use dynamic arrays if available (Excel 365) – they handle spills automatically.</li>
            <li>Combine TREND with LINEST to get slope, intercept, and R² for diagnostics.</li>
            <li>Use scatter plots to visually confirm linearity before trusting trends.</li>
            <li>For seasonal data, consider FORECAST.ETS instead.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have sales data for months 1-6 and you want to forecast months 7-12, TREND can output all six predictions at once. How would you do that with FORECAST.LINEAR? You would need six separate formulas.<br />
            Observe carefully: TREND is a vectorised function, perfect for batch predictions. But be careful with extrapolation far beyond the range.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To get fitted values (and not forecasts), just omit new_x's: =TREND(known_y's, known_x's).</li>
            <li>You can combine TREND with SEQUENCE to generate forecasts for the next N periods: =TREND(y, x, SEQUENCE(12,1,MAX(x)+1,1)).</li>
            <li>Use TREND in combination with LINEST to compute confidence intervals.</li>
            <li>In Excel 365, you can enclose TREND in a LET function to avoid recalculation.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =TREND(known_y's, [known_x's], [new_x's], [const])</li>
            <li>✅ Returns an array of predicted y‑values</li>
            <li>✅ In 365: spills automatically; older: array formula (Ctrl+Shift+Enter)</li>
            <li>✅ const = TRUE (default) normal intercept; FALSE forces through origin</li>
            <li>✅ Omit new_x's to get fitted values for original x's</li>
            <li>✅ Assumes linear relationship – always check scatter plot</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="TREND Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start by comparing FORECAST.LINEAR (single prediction) with TREND (multiple predictions). Use the same sales data and show that =TREND(y,x,{7,8,9}) returns three forecasts in one go. Then show how to get fitted values for historical data: =TREND(y,x). Explain array formulas for older Excel. Use the sheet 'trend_data' with monthly sales and ask students to forecast the next 3 months using TREND, then compare with separately using FORECAST.LINEAR."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}