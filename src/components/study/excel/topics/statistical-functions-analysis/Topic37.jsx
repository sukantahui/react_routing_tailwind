import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic37_files/topic37_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic37() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Practice: Real Dataset Interpretation
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            This final practice topic brings together everything you've learned. You will analyse a realistic dataset (sales, student marks, or survey responses) using SUMIFS, COUNTIFS, AVERAGEIFS, STDEV.S, CORREL, and other statistical functions. Interpret the results and answer business questions.
          </p>
        </header>

        {/* What to Expect */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-teal-400">📊</span> The Dataset
          </h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              The Excel file contains a worksheet named <strong className="text-teal-300">“real_dataset”</strong> with the following columns:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Date</strong> – Transaction date (Jan–Mar 2025)</li>
              <li><strong>Product</strong> – Product category (Rice, Wheat, Laptop, Mouse, etc.)</li>
              <li><strong>Region</strong> – Sales region (North, South, East, West)</li>
              <li><strong>Sales</strong> – Amount in ₹</li>
              <li><strong>Quantity</strong> – Number of units sold</li>
              <li><strong>Customer_Score</strong> – Customer satisfaction rating (1–10)</li>
              <li><strong>Return_Flag</strong> – Whether the product was returned (Yes/No)</li>
            </ul>
            <p>
              You will use this data to answer the questions below. Then we will discuss the answers.
            </p>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Load the Real Dataset</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-teal-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“real_dataset”</strong> from <code>statistical_functions.xlsx</code> contains the practice dataset.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="real_dataset" title="Real Dataset – Practice Analysis" rowsPerPage={20} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic37_files/excel_files/</code> with sheet “real_dataset”.</p>
            </div>
          )}
        </section>

        {/* Practice Questions */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🎯 Analysis Tasks</h2>
          <div className="mt-4 space-y-6 text-gray-200">
            <div>
              <p className="font-semibold text-teal-300">Task 1 – Basic Aggregates</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-300">
                <li>What is the total sales volume? (SUM)</li>
                <li>What is the average sales per transaction? (AVERAGE)</li>
                <li>How many transactions had sales above ₹10,000? (COUNTIF)</li>
                <li>What is the median Customer_Score? (MEDIAN)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-teal-300">Task 2 – Conditional Summaries</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-300">
                <li>Total sales for product “Rice” in region “North” (SUMIFS)</li>
                <li>Average sales of products with quantity &gt; 5 (AVERAGEIF)</li>
                <li>Count of returned items in region “South” (COUNTIFS)</li>
                <li>Total sales for each product category (use a pivot table or multiple SUMIFS)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-teal-300">Task 3 – Correlation & Variation</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-300">
                <li>Correlation between Quantity and Sales (CORREL)</li>
                <li>Standard deviation of Sales for “Laptop” vs “Rice” (STDEV.S)</li>
                <li>Outliers in Sales using IQR method (flag as TRUE/FALSE)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-teal-300">Task 4 – Forecasting & Trend</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-300">
                <li>If you treat Date as independent variable, forecast sales for April 1, 2025 using FORECAST.LINEAR</li>
                <li>Which product has the strongest positive trend over time? (Use slope with a subset)</li>
              </ul>
            </div>
          </div>
        </section>

  
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Deliverables</h3>
          <p className="text-gray-300 mt-2">After performing the analyses, prepare a short report (in a separate sheet or comments) that answers:</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Which region has the highest average sales per transaction?</li>
            <li>Is there a strong linear relationship between quantity and sales? Explain.</li>
            <li>Which product has the lowest variability (consistency) in sales? Which has the highest?</li>
            <li>Are there any extreme outliers? Should they be removed? Why or why not?</li>
            <li>Based on the correlation and scatter plot, would you use a linear model to forecast sales from quantity? Why?</li>
          </ul>
        </section>

        {/* Common Pitfalls in Interpretation */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Confusing correlation with causation – just because sales and quantity correlate does not mean quantity causes sales.</li>
            <li>Ignoring outliers when computing averages or standard deviations – they can mislead.</li>
            <li>Using AVERAGE on data with many zeros without considering if zeros are valid.</li>
            <li>Over‑extrapolating forecasts beyond the range of the data.</li>
            <li>Not documenting data cleaning steps (e.g., handling blanks, removing duplicates).</li>
          </ul>
        </section>

        {/* Best Practices for Reporting */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices for Reporting</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always include a summary statistics table: mean, median, stdev, min, max, count.</li>
            <li>Visualise key relationships with scatter plots and box plots.</li>
            <li>Explain any data manipulations (e.g., removal of outliers).</li>
            <li>Use dynamic dashboards (slicers, pivot charts) to allow stakeholder interaction.</li>
            <li>State the limitations of your analysis (sample size, time period, missing data).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “When you compute the correlation between Sales and Quantity, you might get a high value (e.g., 0.95). Does that mean increasing quantity always increases sales? Not necessarily – there might be a third factor (like discount %) that influences both.<br />
            Observe carefully: Correlation measures association, not causation. Always question whether other variables could explain the relationship.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use the Data Analysis Toolpak (Add‑in) for quick summary statistics, histograms, and regression.</li>
            <li>Create a separate “analysis” sheet that pulls key metrics from the raw data using formulas; this makes it reusable.</li>
            <li>Use named ranges or Excel Tables so that formulas automatically include new data rows.</li>
            <li>Document your formula logic with comments using the N() function: =SUMIFS(...) + N("Sum of sales in North region").</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Final Practice Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Load the real dataset and explore its structure.</li>
            <li>✅ Compute basic aggregates (SUM, AVERAGE, COUNT, MEDIAN).</li>
            <li>✅ Use conditional functions (SUMIFS, COUNTIFS, AVERAGEIFS).</li>
            <li>✅ Measure spread and correlation (STDEV.S, CORREL).</li>
            <li>✅ Perform a simple linear forecast (FORECAST.LINEAR).</li>
            <li>✅ Write a short interpretation of your findings.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Real Dataset Interpretation – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"This is a capstone practice. Ensure the Excel sheet 'real_dataset' has enough rows (~100) and realistic noise. Ask students to complete the tasks individually, then discuss answers in a group. Emphasise that real data is messy – they should encounter blanks, zeros, and occasional errors. Encourage them to use IFERROR and data cleaning techniques. After the session, review the interpretation questions and highlight that there is rarely a single 'correct' answer; justification matters."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}