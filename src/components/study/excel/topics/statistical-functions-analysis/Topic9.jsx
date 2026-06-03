import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic9_files/topic9_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic9() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            COUNTIFS Function (Multiple Condition Counting)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            COUNTIFS counts cells that meet multiple criteria. It is the advanced version of COUNTIF, essential for answering complex “how many” questions.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">🔢</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-amber-500">
            =COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-amber-300">Return type:</strong> Numeric (count of cells that satisfy all conditions)</li>
            <li><strong className="text-amber-300">Purpose:</strong> Counts cells that meet multiple conditions (AND logic).</li>
            <li><strong className="text-amber-300">When to use:</strong> Counting students who passed AND are from a specific city; counting sales above target AND in a given region; counting orders between two dates.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 All criteria ranges must have the same number of rows and columns as each other.
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔍 Parameters Explained</h2>
          <div className="mt-4 space-y-3 text-gray-200">
            <div><span className="text-amber-300 font-mono">criteria_range1</span> – The first range to evaluate.</div>
            <div><span className="text-amber-300 font-mono">criteria1</span> – The condition that cells in criteria_range1 must meet.</div>
            <div><span className="text-amber-300 font-mono">criteria_range2, criteria2</span> – Additional pairs (up to 127).</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-amber-500 mt-4">
            <p className="font-mono text-sm">✅ =COUNTIFS(A2:A100, "Rice", B2:B100, ">5") → count rows where Product=Rice and Quantity&gt;5</p>
            <p className="font-mono text-sm mt-1">✅ =COUNTIFS(CityRange, "Barrackpore", ScoreRange, "&gt;=80") → count top students from Barrackpore</p>
            <p className="font-mono text-sm mt-1">✅ =COUNTIFS(DateRange, "&gt;="&amp;E1, DateRange, "&lt;="&amp;E2) → count dates within a range</p>
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
              <strong>Scenario:</strong> In Barrackpore, a teacher wants to count how many students scored above 80 <strong>and</strong> are from the city "Barrackpore".
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Name</th><th className="border px-3 py-2">City</th><th className="border px-3 py-2">Score</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">Barrackpore</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">Shyamnagar</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">Barrackpore</td><td className="border px-3 py-1">78</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">Ichapur</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">Barrackpore</td><td className="border px-3 py-1">68</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-amber-300">=COUNTIFS(B2:B6, "Barrackpore", C2:C6, ">80") → 1 (only Swadeep)</p>
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
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-amber-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“countifs_data”</strong> from <code>statistical_functions.xlsx</code> contains multi‑attribute data. Practice COUNTIFS with 2–3 criteria.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="countifs_data" title="COUNTIFS Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic9_files/excel_files/</code> with sheet “countifs_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Mixing argument order – remember COUNTIFS starts with criteria_range1, not sum_range (unlike SUMIFS).</li>
            <li>Using different‑sized ranges – all criteria ranges must be the same size; otherwise #VALUE! error.</li>
            <li>Forgetting quotes around text or operators: =COUNTIFS(A:A, Apples,B:B,">5") → error; correct "Apples".</li>
            <li>COUNTIFS is case‑insensitive – “APPLE” = “apple”.</li>
            <li>If you intend OR logic, you must add multiple COUNTIFS.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>{`Use absolute references for ranges when copying formulas: =COUNTIFS($A$2:$A$100, D2, $B$2:$B$100, ">80").`}</li>
            <li>{`Use cell references for criteria to make formulas dynamic: =COUNTIFS(Region, E2, Sales, ">"&F2).`}</li>
            <li>Combine COUNTIFS with Data Validation to restrict duplicate entries.</li>
            <li>Test each criterion separately using COUNTIF to debug why COUNTIFS returns 0.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            {`“If you want to count products that are either Rice or Wheat with quantity &gt; 5, can COUNTIFS do it? No, because COUNTIFS uses AND logic. You would need =COUNTIFS(...)+COUNTIFS(...).<br />
            Observe carefully: COUNTIFS is for multiple conditions that must all be true simultaneously.”`}
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>{`Use wildcards inside criteria: =COUNTIFS(Product, "*Phone*", Qty, ">10").`}</li>
            <li>{`Count dates in a month: =COUNTIFS(Date, ">="&DATE(2025,1,1), Date, "<="&EOMONTH(DATE(2025,1,1),0)).`}</li>
            <li>{`For dynamic date ranges: =COUNTIFS(Date, ">="&E1, Date, "<="&E2).`}</li>
            <li>{`COUNTIFS can count based on another column's value: =COUNTIFS(Region, "North", Sales, ">1000").`}</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =COUNTIFS(criteria_range1, criteria1, ...)</li>
            <li>✅ All criteria ranges must be same size</li>
            <li>✅ Use quotes for text and operators</li>
            <li>{`✅ Use &amp; to reference cells in criteria: ">"&amp;E1`}</li>
            <li>✅ Up to 127 condition pairs</li>
            <li>✅ Returns 0 if no match</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="COUNTIFS Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with two criteria: city and minimum marks. Then add a third (e.g., grade = 'A'). Show that COUNTIFS is easier than nesting COUNTIFs. The Excel sheet 'countifs_data' should have columns: Name, City, Score, Grade, Quantity – at least 15 rows for rich practice."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}