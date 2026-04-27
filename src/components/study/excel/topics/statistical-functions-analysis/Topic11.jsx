import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic11_files/topic11_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic11() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            AVERAGEIFS Function (Multiple Condition Average)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            AVERAGEIFS calculates the average of cells that meet multiple criteria. It is the advanced version of AVERAGEIF – essential for nuanced subgroup analysis.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-violet-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-violet-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-violet-500">
            =AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-violet-300">Return type:</strong> Numeric (average of values that satisfy all conditions)</li>
            <li><strong className="text-violet-300">Purpose:</strong> Returns the arithmetic mean of cells that meet multiple conditions (AND logic).</li>
            <li><strong className="text-violet-300">When to use:</strong> Average sales of a product in a specific region, average marks of students from a city who scored above a threshold, average price of items in a date range.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            ⚠️ Note: <strong className="text-violet-300">average_range comes first</strong> – different from AVERAGEIF!
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔍 Parameters Explained</h2>
          <div className="mt-4 space-y-3 text-gray-200">
            <div><span className="text-violet-300 font-mono">average_range</span> – The cells to average (numeric).</div>
            <div><span className="text-violet-300 font-mono">criteria_range1, criteria1</span> – First condition pair.</div>
            <div><span className="text-violet-300 font-mono">criteria_range2, criteria2</span> – Additional pairs (up to 127).</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-violet-500 mt-4">
            <p className="font-mono text-sm">✅ =AVERAGEIFS(C2:C100, A2:A100, "Rice", B2:B100, "North") → average sales of Rice in North region</p>
            <p className="font-mono text-sm mt-1">✅ =AVERAGEIFS(Scores, Cities, "Barrackpore", Scores, "&gt;80") → average score &gt;80 from Barrackpore</p>
            <p className="font-mono text-sm mt-1">{`✅ =AVERAGEIFS(Sales, Dates, "&="&;E1, Dates, "&="&;E2) → average sales between two dates`}</p>
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
              <strong>Scenario:</strong> In Barrackpore, a company wants the average sales of <strong>Product = "Rice"</strong> in the <strong>Region = "North"</strong> with <strong>Quantity &gt; 4</strong>.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Product</th><th className="border px-3 py-2">Region</th><th className="border px-3 py-2">Sales</th><th className="border px-3 py-2">Qty</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">North</td><td className="border px-3 py-1">600</td><td className="border px-3 py-1">5</td></tr>
                  <tr><td className="border px-3 py-1">Wheat</td><td className="border px-3 py-1">North</td><td className="border px-3 py-1">450</td><td className="border px-3 py-1">3</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">South</td><td className="border px-3 py-1">750</td><td className="border px-3 py-1">6</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">North</td><td className="border px-3 py-1">500</td><td className="border px-3 py-1">4</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">North</td><td className="border px-3 py-1">620</td><td className="border px-3 py-1">5</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-violet-300">{`=AVERAGEIFS(C2:C6, A2:A6, "Rice", B2:B6, "North", D2:D6, ">4") → (600+620)/2 = 610`}</p>
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
              <button onClick={handleDownload} className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-violet-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“averageifs_data”</strong> from <code>statistical_functions.xlsx</code> contains multi‑dimensional data. Practice AVERAGEIFS with up to 3 criteria.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="averageifs_data" title="AVERAGEIFS Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic11_files/excel_files/</code> with sheet “averageifs_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Argument order:</strong> AVERAGEIFS puts average_range first, while AVERAGEIF puts it last – easy to confuse.</li>
            <li>Using different sized ranges – all criteria ranges and average_range must be the same size; otherwise #VALUE! error.</li>
            <li>Forgetting quotes around text or operators: =AVERAGEIFS(B:B, A:A, Rice) → error; correct "Rice".</li>
            <li>{`Not using &amp; to concatenate cell references: ">"&;E1 not ">E1".`}</li>
            <li>If no cells meet all criteria, AVERAGEIFS returns #DIV/0!.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use absolute references for ranges to avoid misalignment when copying: =AVERAGEIFS($C$2:$C$100, $A$2:$A$100, "Rice", $B$2:$B$100, "North").</li>
            <li>Use named ranges or Excel Tables for clarity: =AVERAGEIFS(Table1[Sales], Table1[Product], "Rice", Table1[Region], "North").</li>
            <li>Test each criterion separately with AVERAGEIF or COUNTIFS to debug why result is #DIV/0!.</li>
            <li>Use IFERROR to handle #DIV/0! gracefully: =IFERROR(AVERAGEIFS(...), 0).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want the average sales of products that are either Rice or Wheat in the North region, can AVERAGEIFS do it? No – it uses AND logic. You would need =AVERAGEIFS(...)+AVERAGEIFS(...) divided by something, or use an OR condition with arrays.<br />
            Observe carefully: AVERAGEIFS is for all criteria must be true; for OR, add two AVERAGEIFS results and manually adjust the denominator.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use wildcards for partial matches: =AVERAGEIFS(Sales, Product, "*Phone*", Region, "East").</li>
            <li>{`Average within a date range: =AVERAGEIFS(Amount, Date, ">="&;Start, Date, "<="&;End).`}</li>
            <li>To average based on another column's text length, use a helper column with LEN, then AVERAGEIFS on that.</li>
            <li>AVERAGEIFS is optimised for speed – use it instead of array formulas for large data.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =AVERAGEIFS(average_range, criteria_range1, criteria1, ...)</li>
            <li>✅ average_range comes first</li>
            <li>✅ All ranges must be same size</li>
            <li>✅ Use quotes for text and operators</li>
            <li>{`✅ Use &; for cell references: ">"&;E1`}</li>
            <li>✅ Returns #DIV/0! if no match</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="AVERAGEIFS Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with two conditions: product and region. Then add a third (e.g., quantity > 5). Show how AVERAGEIFS is more intuitive than nested AVERAGEIFs. Use the Excel sheet 'averageifs_data' with columns: Product, Region, Sales, Quantity, Date – at least 20 rows for rich practice. Emphasise the argument order difference from AVERAGEIF."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}