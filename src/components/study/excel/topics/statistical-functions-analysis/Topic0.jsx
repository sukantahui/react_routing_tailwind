import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic0_files/topic0_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic0() {
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
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = sampleDataUrl;
    link.download = "sample_sum_data.xlsx"; // suggested filename
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
            Revision: SUM Function
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The SUM function is Excel's most fundamental arithmetic tool. It adds numeric values across a range of cells.
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
            =SUM(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-emerald-300">Return type:</strong> Numeric (sum of all arguments)</li>
            <li><strong className="text-emerald-300">Purpose:</strong> Adds all numbers in a range of cells or individual values.</li>
            <li><strong className="text-emerald-300">When to use:</strong> Totaling sales, expenses, marks, inventory counts, any arithmetic aggregation.</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How SUM Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              SUM ignores text, logical values (TRUE/FALSE), and empty cells — it only adds numbers.
              It can accept up to 255 arguments, including cell references, ranges, and constants.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=SUM(A1:A5)</span> → adds values in cells A1 through A5</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=SUM(10, 20, 30)</span> → returns 60</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">=SUM("apple", 5)</span> → returns 5 (text ignored)</p>
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
              <strong>Scenario:</strong> Abhronila keeps track of her monthly expenses in Barrackpore.
              She wants to calculate total spent on groceries, travel, and tuition.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border border-gray-700 px-3 py-2 text-left">Item</th>
                    <th className="border border-gray-700 px-3 py-2 text-left">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-700 px-3 py-1">Groceries</td><td className="border border-gray-700 px-3 py-1">3500</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Travel</td><td className="border border-gray-700 px-3 py-1">1200</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1">Tuition</td><td className="border border-gray-700 px-3 py-1">2500</td></tr>
                  <tr><td className="border border-gray-700 px-3 py-1 font-bold">Total</td><td className="border border-gray-700 px-3 py-1 text-emerald-300">=SUM(B2:B4) → 7200</td></tr>
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
            {sampleDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-emerald-500/20"
              >
                ⬇️ Download Sample Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet below is loaded from <code className="bg-gray-800 px-1 rounded">sample_sum_data.xlsx</code>.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – please create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="sum_data"
              title="Student Marksheet – SUM Practice"
              rowsPerPage={15}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                To practice, create a file named <code className="bg-gray-800 px-1 rounded">sample_sum_data.xlsx</code> in the folder:
                <br /><code className="bg-gray-800 px-1 rounded">src/pages/excel/statistical-functions/topic0_files/</code>
                <br /><br />
                <strong>Example content:</strong><br />
                Column A: Subject names, Column B: Marks (numbers). Then save as .xlsx.
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
            <li>Using SUM on cells containing text or errors → text ignored, errors propagate (#VALUE!)</li>
            <li>Forgetting to include all columns (e.g., SUM(A1:B1) vs SUM(A1, B1))</li>
            <li>SUM of large ranges with hidden rows still includes them – use SUBTOTAL if needed.</li>
            <li>Misunderstanding that SUM treats TRUE as 1 and FALSE as 0 only when directly typed as arguments, not from cell references.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
        >
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use named ranges for readability: =SUM(Expenses) instead of =SUM(B2:B100).</li>
            <li>Always double-check that all numeric data is stored as numbers (not text).</li>
            <li>Use AutoSum (Σ) button to quickly insert SUM with guessed range.</li>
            <li>Combine SUM with IF for conditional sums (later topics).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If Swadeep wants to sum marks of only the top 3 subjects from a list of 10, can SUM alone do it? <br />
            Observe carefully: SUM just adds everything. You’ll later learn SUMIF or LARGE+SUM to filter.<br />
            Try changing the range from A1:A10 to A1,A3,A5 – what happens?”
          </p>
        </section>

        {/* Professional Tips */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold text-blue-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Shortcut: <kbd className="bg-gray-800 px-1 rounded">Alt</kbd> + <kbd className="bg-gray-800 px-1 rounded">=</kbd> instantly inserts SUM.</li>
            <li>SUM can handle 3D references: =SUM(Sheet1:Sheet3!A1) sums cell A1 across multiple sheets.</li>
            <li>To sum only visible rows after filtering, use SUBTOTAL(109, range) instead of SUM.</li>
            <li>Use SUM with array constants: =SUM({1,2,3}*{4,5,6}) – enter as array formula (Ctrl+Shift+Enter in older Excel).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =SUM(number1, [number2], …)</li>
            <li>✅ Understand what SUM ignores (text, blanks)</li>
            <li>✅ Use AutoSum shortcut Alt+=</li>
            <li>✅ Avoid common mistakes (text formatted as numbers)</li>
            <li>✅ Learn to combine ranges: SUM(A1:A10, C1:C10)</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="SUM Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Reinforce that SUM is the building block for all aggregation. " +
            "Ask students to bring any real dataset (marks, expenses) and manually sum three different ways: " +
            "1) typing cell references, 2) using the Σ button, 3) writing =A1+A2+... and compare with SUM. " +
            "Highlight that SUM is more efficient and less error-prone than manual addition. " +
            "For the Excel file: Create a simple .xlsx file with numbers, place it in the topic0_files folder, and the loader will display it. " +
            "The download button lets students save the file and open it in desktop Excel for full practice."
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