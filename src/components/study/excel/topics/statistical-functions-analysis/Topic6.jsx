import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic6_files/topic6_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic6() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            SUMIF Function (Single Condition Summation)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            SUMIF adds numbers that meet a single condition. It is the first step into conditional aggregation – a must‑have for real‑world reporting.
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
            =SUMIF(range, criteria, [sum_range])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-orange-300">Return type:</strong> Numeric (sum of cells that satisfy the condition)</li>
            <li><strong className="text-orange-300">Purpose:</strong> Adds values in a range only when a corresponding condition is true.</li>
            <li><strong className="text-orange-300">When to use:</strong> Summing sales of a specific product, expenses of a category, marks above a passing score, etc.</li>
          </ul>
        </section>

        {/* Parameters explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔍 Parameters Explained</h2>
          <div className="mt-4 space-y-3 text-gray-200">
            <div><span className="text-orange-300 font-mono">range</span> – The range of cells to evaluate with the criteria.</div>
            <div><span className="text-orange-300 font-mono">criteria</span> – The condition that determines which cells to add. Can be a number, text, expression, or cell reference.</div>
            <div><span className="text-orange-300 font-mono">sum_range</span> – (Optional) The actual cells to sum. If omitted, Excel sums the range itself.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500 mt-4">
            <p className="font-mono text-sm">✅ =SUMIF(A1:A10, ">50") → sums numbers greater than 50 in A1:A10</p>
            <p className="font-mono text-sm mt-1">✅ =SUMIF(B2:B100, "Apples", C2:C100) → sums C2:C100 where B2:B100 = "Apples"</p>
            <p className="font-mono text-sm mt-1">✅ =SUMIF(D:D, ">"&amp;E1, F:F) → dynamic criteria using cell reference</p>
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
              <strong>Scenario:</strong> In Barrackpore, a small shop records sales. Abhronila wants to know total sales of "Rice" and total sales above ₹500.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Product</th><th className="border px-3 py-2">Sales (₹)</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">600</td></tr>
                  <tr><td className="border px-3 py-1">Wheat</td><td className="border px-3 py-1">450</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">750</td></tr>
                  <tr><td className="border px-3 py-1">Sugar</td><td className="border px-3 py-1">300</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">500</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-orange-300">=SUMIF(A2:A6, "Rice", B2:B6) → 600+750+500 = 1850</p>
              <p className="mt-1 text-orange-300">=SUMIF(B2:B6, ">500") → 600+750 = 1350</p>
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
            Sheet <strong>“sumif_data”</strong> from <code>statistical_functions.xlsx</code> contains sales data. Practice SUMIF with categories and thresholds.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="sumif_data" title="SUMIF Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic6_files/excel_files/</code> with sheet “sumif_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting the sum_range – if omitted, SUMIF uses the range itself, which may not be what you want.</li>
            <li>Using text criteria without double quotes: =SUMIF(A:A, Apples, B:B) → error. Correct: "Apples".</li>
            <li>Mixing sum_range and range sizes – they must be the same size, otherwise SUMIF uses the top‑left cell of sum_range and aligns.</li>
            <li>SUMIF ignores errors in sum_range but errors in range cause the whole function to error.</li>
            <li>{`Criteria like ">5" must be in quotes; to reference a cell: ">"&amp;E1.`}</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always use absolute references for ranges when copying formulas: =SUMIF($A$2:$A$100, "Rice", $B$2:$B$100).</li>
            <li>Use cell references for criteria to make formulas dynamic: =SUMIF(range, E2, sum_range).</li>
            <li>For wildcard criteria: "Apples" matches any text starting with Apples; "???Apples" matches 3 chars followed by Apples.</li>
            <li>Prefer SUMIFS when you might later add multiple conditions – easier to extend.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have a list of exam marks and you want to sum only those that are above the class average, can you use a cell reference in the criteria? Yes: =SUMIF(marks, ">"&amp;AVERAGE(marks)).<br />
            Observe carefully: The criteria is a text string built with &amp; – Excel evaluates the average inside the string.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use SUMIF with dynamic ranges: =SUMIF(Table1[Product], "Rice", Table1[Sales]) – structured references auto‑adjust.</li>
            <li>To sum values where criteria range contains text that starts with “A”, use "A*".</li>
            <li>SUMIF is not case‑sensitive. For case‑sensitive, use SUMPRODUCT with EXACT.</li>
            <li>Quick totals by category: copy unique categories, then use SUMIF next to each.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =SUMIF(range, criteria, [sum_range])</li>
            <li>✅ Remember to quote text and operators in criteria</li>
            <li>✅ Use &amp; to concatenate cell references in criteria</li>
            <li>✅ Ensure range and sum_range are same size</li>
            <li>✅ Wildcards * and ? work in text criteria</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="SUMIF Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list: product names and sales. Ask students to sum sales of a specific product. Then introduce a numeric condition (sales > 500). Emphasise the importance of the sum_range – many forget it. Use the Excel sheet 'sumif_data' with at least 3 categories and 10 rows."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}