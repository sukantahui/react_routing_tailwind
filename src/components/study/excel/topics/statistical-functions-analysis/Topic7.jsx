import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic7_files/topic7_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic7() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
            SUMIFS Function (Multiple Condition Summation)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            SUMIFS sums numbers that meet multiple criteria. It is the advanced version of SUMIF, essential for business reports, dashboards, and data analysis.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-teal-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-teal-500">
            =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-teal-300">Return type:</strong> Numeric (sum of cells that satisfy all criteria)</li>
            <li><strong className="text-teal-300">Purpose:</strong> Adds values in a range based on one or more conditions (AND logic).</li>
            <li><strong className="text-teal-300">When to use:</strong> Summing sales by product AND region, expenses by category AND month, marks above passing AND attendance ≥ 75%.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            ⚠️ Note argument order: <strong className="text-teal-300">sum_range first</strong> – different from SUMIF!
          </div>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How SUMIFS Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              SUMIFS evaluates all criteria ranges and only includes the sum_range cells where <strong>all</strong> conditions are TRUE (AND logic).
              You can add up to 127 condition pairs.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-teal-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">=SUMIFS(C2:C100, A2:A100, "Rice", B2:B100, ">50")</span> → sum of Rice sales where Quantity &gt; 50</p>
              <p className="font-mono text-sm mt-1">✅ <span className="text-green-300">=SUMIFS(Sales, Region, "North", Product, "Laptop")</span> → sum Laptop sales in North region</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">{`=SUMIFS(A1:A10, B1:B10, ">5", C1:C10, "<>0")</span> → sum A where B>5 and C not zero`}</span></p>
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
              <strong>Scenario:</strong> In Shyamnagar, a supermarket wants total sales of <strong>Rice</strong> from <strong>Grocery</strong> category with <strong>quantity &gt; 4</strong>.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Product</th><th className="border px-3 py-2">Category</th><th className="border px-3 py-2">Sales</th><th className="border px-3 py-2">Qty</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">Grocery</td><td className="border px-3 py-1">600</td><td className="border px-3 py-1">5</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">Grocery</td><td className="border px-3 py-1">750</td><td className="border px-3 py-1">6</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">Grocery</td><td className="border px-3 py-1">500</td><td className="border px-3 py-1">4</td></tr>
                  <tr><td className="border px-3 py-1">Wheat</td><td className="border px-3 py-1">Grocery</td><td className="border px-3 py-1">450</td><td className="border px-3 py-1">3</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-teal-300">=SUMIFS(C2:C5, A2:A5, "Rice", D2:D5, ">4") → 600 + 750 = 1350</p>
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
              <button onClick={handleDownload} className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-teal-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“sumifs_data”</strong> from <code>statistical_functions.xlsx</code> contains multi‑category data. Practice SUMIFS with up to 3 criteria.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="sumifs_data" title="SUMIFS Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic7_files/excel_files/</code> with sheet “sumifs_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Confusing argument order: SUMIFS puts <strong>sum_range first</strong>, whereas SUMIF puts sum_range last.</li>
            <li>Using different sized ranges – all criteria ranges and sum_range must have same number of rows and columns.</li>
            <li>Forgetting quotes around criteria when using operators: ">5" not >5.</li>
            <li>Missing &amp; when concatenating cell references: ">"&amp;E1.</li>
            <li>SUMIFS returns 0 if no cells meet all criteria – not an error.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use absolute references for ranges when copying formulas: =SUMIFS($C$2:$C$100, $A$2:$A$100, "Rice", $B$2:$B$100, ">4").</li>
            <li>Prefer SUMIFS even for single condition – it's easier to add more later.</li>
            <li>Use named ranges or Excel Tables for cleaner formulas: =SUMIFS(Table1[Sales], Table1[Product], E2, Table1[Qty], ">4").</li>
            <li>Test each criterion separately using COUNTIFS to debug.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want to sum sales of Rice OR Wheat, can SUMIFS do it? No – SUMIFS uses AND logic. You would need =SUMIFS(...)+SUMIFS(...) or use SUM with SUMIF array.<br />
            Observe carefully: SUMIFS is for multiple conditions that must all be true.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use wildcards in criteria: =SUMIFS(Sales, Product, "*Phone*") – any product containing "Phone".</li>
            <li>Dynamic date ranges: =SUMIFS(Sales, Date, ">="&amp;E1, Date, "&lt;="&amp;E2).</li>
            <li>SUMIFS can sum based on another column's value: =SUMIFS(Amount, Region, "North", Salesperson, "Swadeep").</li>
            <li>For large datasets, SUMIFS is well optimised – faster than array formulas.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, ...)</li>
            <li>✅ sum_range comes first (unlike SUMIF)</li>
            <li>✅ Ranges must be same size</li>
            <li>✅ Use quotes for operators: ">10"</li>
            <li>✅ Use &amp; to reference cells: ">"&amp;A1</li>
            <li>✅ Up to 127 condition pairs</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="SUMIFS Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Emphasise the argument order difference from SUMIF. Start with two criteria: product and region. Then add a third (e.g., quantity > 5). Show how SUMIFS is more readable than nested SUMIFs. The Excel sheet 'sumifs_data' should contain at least 4 columns: Product, Region, Sales, Quantity."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}