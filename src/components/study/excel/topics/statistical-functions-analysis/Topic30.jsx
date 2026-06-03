import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic30_files/topic30_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic30() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            FORECAST.LINEAR Function (Linear Forecasting)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            FORECAST.LINEAR (formerly FORECAST) predicts a future value by fitting a straight line to existing data. It is used for simple linear regression and time‑series forecasting when the relationship between variables is linear.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-emerald-400">📉</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-emerald-500">
            =FORECAST.LINEAR(x, known_y's, known_x's)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-emerald-300">Return type:</strong> Numeric (predicted y‑value)</li>
            <li><strong className="text-emerald-300">Purpose:</strong> Predicts a y-value for a given x using linear regression (least squares).</li>
            <li><strong className="text-emerald-300">When to use:</strong> Forecasting sales based on advertising spend, predicting exam score from study hours, estimating temperature from time, any scenario with a linear trend.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 The function fits the line y = a + bx, where b = SLOPE(known_y's, known_x's) and a = INTERCEPT. Then predicts = a + b*x.
          </div>
        </section>

        {/* How FORECAST.LINEAR Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How FORECAST.LINEAR Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              FORECAST.LINEAR uses the least squares method to find the best‑fitting straight line through the data points. It then computes the predicted y‑value for the new x. The function assumes a linear relationship and works with any numeric data (including dates as x).
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="font-mono text-sm">✅ =FORECAST.LINEAR(10, B2:B11, A2:A11) → predict y when x=10</p>
              <p className="font-mono text-sm mt-1">✅ =FORECAST.LINEAR(DATE(2025,12,31), sales, dates) → forecast sales on a future date</p>
              <p className="font-mono text-sm mt-1">⚠️ If data is clearly non‑linear, forecast may be poor.</p>
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
              <strong>Scenario:</strong> A Barrackpore retailer records weekly advertising spend (₹1000) and corresponding sales (₹1000). They want to forecast sales if they spend ₹12,000 next week.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Ad Spend (₹1000)</th><th className="border px-3 py-2">Sales (₹1000)</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">5</td><td className="border px-3 py-1">120</td></tr>
                  <tr><td className="border px-3 py-1">6</td><td className="border px-3 py-1">135</td></tr>
                  <tr><td className="border px-3 py-1">7</td><td className="border px-3 py-1">148</td></tr>
                  <tr><td className="border px-3 py-1">8</td><td className="border px-3 py-1">160</td></tr>
                  <tr><td className="border px-3 py-1">9</td><td className="border px-3 py-1">172</td></tr>
                  <tr><td className="border px-3 py-1">10</td><td className="border px-3 py-1">185</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-emerald-300">=FORECAST.LINEAR(12, B2:B7, A2:A7) → ≈ 207.6 (₹207,600 forecasted sales)</p>
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
              <button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-emerald-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“forecast_linear_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and advertising data. Practice forecasting.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="forecast_linear_data" title="FORECAST.LINEAR Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic30_files/excel_files/</code> with sheet “forecast_linear_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using FORECAST.LINEAR when the relationship is non‑linear – predictions will be misleading.</li>
            <li>Extrapolating too far beyond the range of known_x's – forecasts become highly uncertain.</li>
            <li>Assuming causation – the forecast is a mathematical projection, not a guarantee.</li>
            <li>Ignoring that the function pairs data by position; ensure known_y's and known_x's are aligned correctly.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always visualise data with a scatter plot and add a trendline to assess linearity.</li>
            <li>Use FORECAST.LINEAR for short‑term predictions within the range of x values (interpolation) rather than long‑term extrapolation.</li>
            <li>Combine with SLOPE and INTERCEPT to understand the line equation.</li>
            <li>For seasonal or cyclical data, use more advanced methods (e.g., FORECAST.ETS).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you forecast sales using advertising spend from the last six months, your prediction for next week assumes the trend continues. But what if a competitor launches a promotion next week? The forecast may break.<br />
            Observe carefully: FORECAST.LINEAR gives a statistical projection, not a business certainty. Always couple it with qualitative judgement.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use FORECAST.LINEAR with dates: Excel treats dates as serial numbers, so you can forecast a future date value.</li>
            <li>To forecast multiple values, use an array formula or combine with SEQUENCE in 365.</li>
            <li>Combine with LINEST to get confidence intervals or more statistics.</li>
            <li>In Excel 365, the newer FORECAST.ETS can handle seasonality and multiple periods.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =FORECAST.LINEAR(x, known_y's, known_x's)</li>
            <li>✅ x = the value for which to predict y</li>
            <li>✅ known_y's = dependent variable (what you want to predict)</li>
            <li>✅ known_x's = independent variable (predictor)</li>
            <li>✅ Assumes linear relationship</li>
            <li>✅ Use scatter plot to check linearity</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="FORECAST.LINEAR Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple dataset of study hours vs exam scores. Compute FORECAST.LINEAR for a new study hour value. Show that the result matches the line drawn on a scatter plot. Then discuss limitations – extrapolation beyond the data range is risky. Use the Excel sheet 'forecast_linear_data' with temperature vs sales, advertising vs sales, etc. Have students forecast one value, then add a new data point and see how the forecast changes."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}