import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic1_files/topic1_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleAverageDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic1() {
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
    if (!sampleAverageDataUrl) return;
    const link = document.createElement("a");
    link.href = sampleAverageDataUrl;
    link.download = "sample_average_data.xlsx";
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
            Revision: AVERAGE Function
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The AVERAGE function calculates the arithmetic mean of a set of numbers – one of the most essential tools for data summarization.
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
            =AVERAGE(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-sky-300">Return type:</strong> Numeric (the arithmetic mean)</li>
            <li><strong className="text-sky-300">Purpose:</strong> Returns the average (sum of arguments divided by count of numeric arguments).</li>
            <li><strong className="text-sky-300">When to use:</strong> Calculating average marks, sales per day, temperature, expenses, performance metrics.</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How AVERAGE Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              AVERAGE adds all numeric values in the arguments and divides by the count of those numbers. 
              Like SUM, it ignores text, empty cells, and logical values (TRUE/FALSE) when they are references, 
              but includes numbers directly typed.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-sky-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=AVERAGE(A1:A5)</span> → adds A1..A5 and divides by 5 (if all numeric)</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=AVERAGE(10, 20, 30)</span> → returns 20</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">=AVERAGE(A1:A5, "5")</span> → "5" as direct argument is treated as number 5; as cell reference it's ignored.</p>
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
              <strong>Scenario:</strong> Swadeep, Tuhina, and Abhronila from Barrackpore have marks in Maths, Science, and English.
              They want to calculate their average mark per subject and overall.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border border-gray-700 px-3 py-2 text-left">Student</th>
                    <th className="border border-gray-700 px-3 py-2 text-left">Maths</th>
                    <th className="border border-gray-700 px-3 py-2 text-left">Science</th>
                    <th className="border border-gray-700 px-3 py-2 text-left">English</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-700 px-3 py-1">Swadeep</td><td className="border border-gray-700 px-3 py-1">85</td><td className="border border-gray-700 px-3 py-1">90</td><td className="border border-gray-700 px-3 py-1">78</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Tuhina</td><td className="border border-gray-700 px-3 py-1">92</td><td className="border border-gray-700 px-3 py-1">88</td><td className="border border-gray-700 px-3 py-1">95</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Abhronila</td><td className="border border-gray-700 px-3 py-1">78</td><td className="border border-gray-700 px-3 py-1">84</td><td className="border border-gray-700 px-3 py-1">88</td></tr>
                  <tr className="bg-sky-900/30 font-bold">
                    <td className="border border-gray-700 px-3 py-1">Average</td>
                    <td className="border border-gray-700 px-3 py-1 text-sky-300">=AVERAGE(B2:B4) → 85</td>
                    <td className="border border-gray-700 px-3 py-1 text-sky-300">=AVERAGE(C2:C4) → 87.33</td>
                    <td className="border border-gray-700 px-3 py-1 text-sky-300">=AVERAGE(D2:D4) → 87</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader with Download Button */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleAverageDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-sky-500/20"
              >
                ⬇️ Download Sample Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet below is loaded from <code className="bg-gray-800 px-1 rounded">sample_average_data.xlsx</code>.
            {!sampleAverageDataUrl && <span className="text-yellow-300"> (File not found – please create it)</span>}
          </p>
          {sampleAverageDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleAverageDataUrl}
              sheetName="average_data"
              title="Student Marks – AVERAGE Practice"
              rowsPerPage={15}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                To practice, create a file named <code className="bg-gray-800 px-1 rounded">sample_average_data.xlsx</code> in the folder:
                <br /><code className="bg-gray-800 px-1 rounded">src/pages/excel/statistical-functions/topic1_files/</code>
                <br /><br />
                <strong>Example content:</strong><br />
                Column A: Student names, Columns B–D: Marks in subjects. Then use =AVERAGE(B2:B10).
              </p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>AVERAGE ignores blank cells and text, but includes zeros if present – a zero can pull down the average significantly.</li>
            <li>Confusing AVERAGE with MEDIAN – average is sensitive to outliers, median is not.</li>
            <li>Using AVERAGE on a range that contains errors (#DIV/0!, #N/A) returns an error.</li>
            <li>Forgetting that AVERAGE of an empty range returns #DIV/0!.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use =AVERAGEIF or =AVERAGEIFS for conditional averages (e.g., average only scores above 80).</li>
            <li>Clean your data before averaging – replace text numbers with actual numbers.</li>
            <li>Use =AVERAGEA if you want to count text as zero and TRUE/FALSE as 1/0.</li>
            <li>Check for outliers that may skew the average; consider using TRIMMEAN.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If Susmita scored 0 in a test, her average drops dramatically. But if she missed the test (blank cell), the average ignores that exam. Is that fair?<br />
            Observe carefully: In education, we often treat missing as 0; you'd need to replace blanks with 0 before averaging. Try changing a blank to 0 and see the difference.”
          </p>
        </section>

        {/* Professional Tips */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Quick average from status bar: select a range and look at bottom‑right (Average shown automatically).</li>
            <li>Use =AVERAGE(IF(range&lt;&gt;0, range)) as array formula to exclude zeros from average.</li>
            <li>For weighted average, use =SUMPRODUCT(values, weights)/SUM(weights).</li>
            <li>Keyboard shortcut: no direct insert, but you can type Alt+M, U, A (older versions) or use Quick Analysis tool.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =AVERAGE(number1, [number2], …)</li>
            <li>✅ Understand what AVERAGE ignores (text, blanks)</li>
            <li>✅ Differentiate between AVERAGE, MEDIAN, MODE</li>
            <li>✅ Avoid zeros that shouldn't be counted</li>
            <li>✅ Use conditional averaging (AVERAGEIF) for filtered results</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="AVERAGE Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Remind students that average is not always the best measure (e.g., income data with outliers). " +
            "Use classroom examples: average marks of the class vs median. " +
            "Show the difference between including zeros vs blanks. " +
            "The downloadable Excel file contains a marksheet; ask students to compute averages row‑wise and column‑wise."
          }
        />
      </div>

      {/* Animation styles */}
      <style>{`
        .reveal-section {
          transform: translateY(24px) scale(0.98);
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal-section.revealed {
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}