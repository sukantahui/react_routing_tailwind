"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic16_files/topic16_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic16() {
  const sectionsRef = useRef([]);
  const [excelError, setExcelError] = useState(false);

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
    link.download = "lookup_functions.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Static fallback for multiple criteria examples
  const StaticMultiCriteria = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-2 py-1">Product</th><th className="px-2 py-1">Region</th><th className="px-2 py-1">Sales</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-2 py-1">Laptop</td><td className="px-2 py-1">North</td><td className="px-2 py-1">50000</td></tr>
            <tr><td className="px-2 py-1">Laptop</td><td className="px-2 py-1">South</td><td className="px-2 py-1">48000</td></tr>
            <tr><td className="px-2 py-1">Mouse</td><td className="px-2 py-1">North</td><td className="px-2 py-1">1200</td></tr>
            <tr><td className="px-2 py-1">Mouse</td><td className="px-2 py-1">South</td><td className="px-2 py-1">1150</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-cyan-500">
        <p className="font-mono text-sm">Helper column: =A2&"|"&B2</p>
        <p className="font-mono text-sm">=VLOOKUP(E2&"|"&F2, HelperRange, 3, FALSE)</p>
        <p className="text-xs text-gray-400">Concatenates Product and Region into a unique key.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-cyan-500">
        <p className="font-mono text-sm">=INDEX(Sales, MATCH(1, (Product=G2)*(Region=H2), 0))</p>
        <p className="text-xs text-gray-400">Array formula (Ctrl+Shift+Enter) – multiple criteria without helper column.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Lookup with Multiple Criteria (Introduction)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            When one condition isn't enough – combine criteria to find the exact match in complex data.
          </p>
        </header>

        {/* Why Multiple Criteria? */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🎯 Why Use Multiple Criteria?</h2>
          <p className="mt-2 text-gray-200">A single lookup value often isn't unique. For example, "Laptop" sales exist for many regions. You need to specify both <strong>Product</strong> and <strong>Region</strong> to get the correct sales figure.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">❌ VLOOKUP("Laptop", table, 3, FALSE) → returns first Laptop row (North).</p>
            <p className="font-mono text-sm mt-1">✅ To get South sales, you need Product + Region.</p>
          </div>
        </section>

        {/* Method 1: Helper Column (Concatenation) */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🔧 Method 1: Helper Column (Concatenation)</h2>
          <p className="mt-2 text-gray-200">Create a new column that combines the two (or more) criteria into a unique key. Then perform a standard VLOOKUP (or INDEX-MATCH) on that helper column.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-semibold text-cyan-300">Step 1: Add Helper Column</p>
            <code className="block text-sm">=A2 & "|" & B2   (e.g., "Laptop|North")</code>
            <p className="font-semibold text-cyan-300 mt-2">Step 2: VLOOKUP using concatenated lookup value</p>
            <code className="block text-sm">=VLOOKUP(E2 & "|" & F2, HelperRange, 3, FALSE)</code>
          </div>
          <p className="text-xs text-gray-400 mt-2">✅ Simple and works in all Excel versions. ✅ Easy to understand.</p>
          <p className="text-xs text-yellow-300 mt-1">⚠️ Requires an extra column (can be hidden).</p>
        </section>

        {/* Method 2: Array Formula (INDEX-MATCH with multiplication) */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">⚡ Method 2: Array Formula (INDEX-MATCH)</h2>
          <p className="mt-2 text-gray-200">Use Boolean logic inside MATCH to evaluate multiple conditions without a helper column. This is an <strong>array formula</strong> – in older Excel, press <span className="font-mono">Ctrl+Shift+Enter</span>.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <code className="block text-sm">=INDEX(return_range, MATCH(1, (criteria1=range1)*(criteria2=range2), 0))</code>
            <p className="text-xs text-gray-400 mt-1">The multiplication creates an array of 1s (both true) and 0s (otherwise). MATCH finds the first 1.</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">✅ No helper column needed. ✅ Works with any number of criteria.</p>
          <p className="text-xs text-yellow-300 mt-1">⚠️ Can be slower on very large data. ⚠️ Requires array entry in older Excel.</p>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-cyan-300">Example 1: Sales by Product & Region</p>
              <p className="text-sm">In Barrackpore, find sales of "Mouse" in "South" region.</p>
              <code className="block text-sm text-green-300 mt-1">Helper: =A2&"|"&B2 → =VLOOKUP("Mouse|South", $D$2:$E$100, 2, FALSE)</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-cyan-300">Example 2: Employee Salary by Name & Department</p>
              <p className="text-sm">Find salary of "Swadeep" in "IT" department.</p>
              <code className="block text-sm text-green-300 mt-1">Array: =INDEX(Salary, MATCH(1, (Name="Swadeep")*(Dept="IT"), 0))</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-cyan-300">Example 3: Student Marks by Name & Subject</p>
              <p className="text-sm">Get Tuhina's Physics score from a matrix.</p>
              <code className="block text-sm text-green-300 mt-1">Two‑way lookup already covers row+column criteria – that's a special case of multiple criteria.</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Multiple Criteria Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“multiple_criteria_data”</strong> contains a sales table with Product, Region, and Sales. Practice both methods: helper column and array formula.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="multiple_criteria_data"
              title="Multiple Criteria Lookup – Sales Data"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet not available. Showing static examples.
              </div>
              <StaticMultiCriteria />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> Create a helper column combining Product and Region, then use VLOOKUP. Then try the array formula =INDEX(Sales, MATCH(1, (Product=E2)*(Region=F2), 0)).
          </p>
        </section>

        {/* Comparison Table */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">⚖️ Helper Column vs Array Formula</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-800">
                <tr><th className="px-3 py-2">Aspect</th><th className="px-3 py-2">Helper Column</th><th className="px-3 py-2">Array Formula</th></tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">Extra column?</td><td className="px-3 py-1">Yes</td><td className="px-3 py-1">No</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">Excel version</td><td className="px-3 py-1">All</td><td className="px-3 py-1">All (CSE in older)</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">Speed (large data)</td><td className="px-3 py-1">Fast</td><td className="px-3 py-1">Slower</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">Readability</td><td className="px-3 py-1">Very clear</td><td className="px-3 py-1">Moderate</td></tr>
                <tr><td className="px-3 py-1">Dynamic criteria count</td><td className="px-3 py-1">Easy to extend</td><td className="px-3 py-1">Easy to extend</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Forgetting delimiters:</strong> Concatenating without a separator (e.g., "LaptopNorth" vs "Laptop|North") can cause false matches ("LaptopNorth" vs "Laptop|North" are different).</li>
            <li><strong>Array formula not entered with Ctrl+Shift+Enter</strong> – results in #VALUE! in older Excel.</li>
            <li><strong>Using * instead of AND correctly</strong> – (A=A1)*(B=B1) works, but (A=A1) AND (B=B1) doesn't work in array context.</li>
            <li><strong>Too many criteria</strong> – performance degrades; consider using Power Query or database.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>For small to medium data, use helper column – it's clearer and faster.</li>
            <li>Always use a unique delimiter (e.g., "|", "~") that won't appear in your data.</li>
            <li>For large datasets, consider Excel's Power Query to merge tables before lookup.</li>
            <li>In Excel 365, use XLOOKUP with concatenation: =XLOOKUP(E2&F2, helper_range, return_range).</li>
            <li>Test your array formula by evaluating parts: select (criteria1=range1) in formula bar and press F9 to see the array.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a table with thousands of rows and need to look up a value based on three criteria. Which method would you choose? 
            Observe carefully: Helper column adds an extra column but makes the formula simple and fast. Array formula avoids extra columns but recalculates every time. For large data, helper column is often better.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use the FILTER function (Excel 365) for multiple criteria: =FILTER(return_range, (criteria1=range1)*(criteria2=range2)).</li>
            <li>For a two‑way lookup, you already have row+column criteria – that's a special case.</li>
            <li>Combine SUMPRODUCT to return a value: =SUMPRODUCT(return_range, --(criteria1=range1), --(criteria2=range2)) – only works for numbers.</li>
            <li>Use Power Query to merge tables on multiple columns – more robust for reporting.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Helper column: =A2&"|"&B2 then VLOOKUP on that.</li>
            <li>✅ Array formula: =INDEX(return, MATCH(1, (crit1=range1)*(crit2=range2), 0)).</li>
            <li>✅ Use unique delimiter to avoid false matches.</li>
            <li>✅ Press Ctrl+Shift+Enter for array formulas (older Excel).</li>
            <li>✅ Helper column is simpler for most users.</li>
            <li>✅ In Excel 365, FILTER and XLOOKUP with concatenation are great options.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Multiple Criteria Lookup – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start with a simple sales table (Product, Region, Sales). Ask: 'How do we get sales of Laptop in South?' Show that VLOOKUP alone fails. Then introduce the helper column method – it's intuitive and students grasp it quickly. " +
            "Then show the array formula method as a 'no‑helper‑column' alternative. Explain the logic: (Product=E2) returns an array of TRUE/FALSE, multiplied by (Region=F2) gives 1 only where both are TRUE. " +
            "For the Excel sheet, include at least 20 rows of sales data with multiple products and regions. Also include a practice area where students can input product and region from dropdowns and see the result update. " +
            "Emphasise that multiple criteria lookups are essential for real‑world data analysis."
          }
        />
      </div>

      <style>{`
        .reveal-section {
          transform: translateY(24px) scale(0.98);
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal-section.revealed {
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section { transform: none; transition: none; }
        }
      `}</style>
    </div>
  );
}