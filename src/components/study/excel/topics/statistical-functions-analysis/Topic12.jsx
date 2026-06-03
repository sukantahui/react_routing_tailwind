import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic12_files/topic12_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic12() {
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
            MEDIAN Function (Central Value Analysis)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The MEDIAN function returns the middle value in a set of numbers – it is robust against outliers and
            often gives a better “typical” value than AVERAGE in skewed data.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-emerald-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-emerald-500">
            =MEDIAN(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-emerald-300">Return type:</strong> Numeric (the median value)</li>
            <li><strong className="text-emerald-300">Purpose:</strong> Returns the median (middle) of a group of numbers – the value where half the observations are below and half above.</li>
            <li><strong className="text-emerald-300">When to use:</strong> Analysing income, house prices, exam marks when outliers are present, or any distribution that is not symmetric.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 For an even number of values, MEDIAN averages the two middle numbers.
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How MEDIAN Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              MEDIAN sorts the numbers (ignoring text, blanks, logical values) and picks the middle value:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Odd count:</strong> the exact middle number (e.g., {1,3,5} → median = 3).</li>
              <li><strong>Even count:</strong> the average of the two middle numbers (e.g., {1,3,5,7} → (3+5)/2 = 4).</li>
            </ul>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="font-mono text-sm">✅ =MEDIAN(10, 20, 30) → 20</p>
              <p className="font-mono text-sm mt-1">✅ =MEDIAN(10, 20, 30, 40) → (20+30)/2 = 25</p>
              <p className="font-mono text-sm mt-1">⚠️ =MEDIAN(A1:A10) ignores text, blanks, and errors</p>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Barrackpore, five students scored marks: Swadeep = 85, Tuhina = 92, Abhronila = 78, Susmita = 95, Debangshu = 30 (due to illness). The average (76) is pulled down by the low score, but the median (85) better represents the typical performance.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Marks</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">78</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">30</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-emerald-300">=AVERAGE(B2:B6) → 76</p>
              <p className="mt-1 text-emerald-300">=MEDIAN(B2:B6) → 85 (sorted: 30,78,85,92,95)</p>
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
            Sheet <strong>“median_data”</strong> from <code>statistical_functions.xlsx</code> contains salary and exam data to compare mean vs median.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
         
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="median_data" title="MEDIAN Practice" rowsPerPage={15} showSheetSelector={true} />
            
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic12_files/excel_files/</code> with sheet “median_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Confusing median with average – median is not affected by outliers; average is.</li>
            <li>Forgetting that MEDIAN ignores blanks and text – but it treats zeros as numbers.</li>
            <li>Assuming MEDIAN works on even‑count sets the same way as odd – it averages the two middle numbers.</li>
            <li>Using MEDIAN on a range that contains no numbers – returns #NUM! error.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use median together with mean to detect skewness. If median &lt mean, the data is right‑skewed (larger outliers).</li>
            <li>For income, house prices, or any data with outliers, report median rather than mean.</li>
            <li>Combine MEDIAN with IF for conditional median (use array formula or AGGREGATE).</li>
            <li>Clean data before calling MEDIAN – convert text numbers to real numbers.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have an employee salary list: ₹30k, ₹35k, ₹40k, ₹45k, ₹10,00,000 (CEO). The average is very high, but the median is ₹40k. Which one truly represents the typical salary?<br />
            Observe carefully: Median is preferred for skewed distributions because it ignores extreme values.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To calculate median conditional on criteria, use array formula: =MEDIAN(IF(range=criteria, median_range)).</li>
            <li>Use AGGREGATE(12,6,range) to compute median while ignoring errors.</li>
            <li>MEDIAN works with dates (since dates are numbers).</li>
            <li>In Excel 365, you can use MEDIAN with FILTER: =MEDIAN(FILTER(values, conditions)).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =MEDIAN(number1, [number2], …)</li>
            <li>✅ Sorts numbers and picks middle value</li>
            <li>✅ For even count, averages the two middle numbers</li>
            <li>✅ Robust to outliers (unlike AVERAGE)</li>
            <li>✅ Ignores text, blanks, logicals</li>
            <li>✅ Returns #NUM! if no numbers</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="MEDIAN Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list: {1,2,3,100}. Mean is 26.5, median is 2.5 – show how the outlier skews the mean. Then use real data: student marks with one very low score. Explain that median is better for skewed data. The Excel sheet 'median_data' should contain columns: Name, Salary, City, including outliers."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}