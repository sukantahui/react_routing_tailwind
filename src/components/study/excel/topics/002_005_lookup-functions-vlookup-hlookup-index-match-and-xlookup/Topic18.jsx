"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic18_files/topic18_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic18() {
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

  // Static fallback for performance tips
  const StaticPerformanceTips = () => (
    <div className="space-y-3">
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-blue-500">
        <p className="font-semibold text-blue-300">✓ Use Exact Match (FALSE) whenever possible</p>
        <p className="text-sm">Exact match with unsorted data scans linearly; but if you need approximate, ensure data is sorted.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-blue-500">
        <p className="font-semibold text-blue-300">✓ Avoid whole‑column references (A:A)</p>
        <p className="text-sm">Use specific ranges: $A$2:$A$100000 instead of A:A – Excel scans only the rows you need.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-blue-500">
        <p className="font-semibold text-blue-300">✓ Use Excel Tables for automatic range expansion</p>
        <p className="text-sm">Tables also improve readability and maintainability.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-blue-500">
        <p className="font-semibold text-blue-300">✓ Prefer INDEX-MATCH or XLOOKUP over VLOOKUP for large data</p>
        <p className="text-sm">They can be faster because they only process the lookup and return columns.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Lookup Performance Best Practices
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Speed up your workbooks – techniques to make lookups faster, even on millions of rows.
          </p>
        </header>

        {/* Why Performance Matters */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">⚡ Why Worry About Performance?</h2>
          <p className="mt-2 text-gray-200">A poorly written lookup on 500,000 rows can take minutes to calculate. Users get frustrated, reports become unusable. With the right techniques, the same lookup finishes in seconds.</p>
        </section>

        {/* Best Practice 1: Limit Ranges */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
          <h3 className="text-xl font-semibold text-blue-300">1️⃣ Avoid Whole‑Column References</h3>
          <p className="mt-2 text-gray-200">Using <span className="font-mono">A:A</span> forces Excel to scan over 1 million rows. Instead, use a specific range that covers your actual data (e.g., <span className="font-mono">$A$2:$A$100000</span>).</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">❌ Slow: =VLOOKUP(E2, A:C, 3, FALSE)</code>
            <code className="text-sm block mt-1">✅ Fast: =VLOOKUP(E2, $A$2:$C$100000, 3, FALSE)</code>
          </div>
          <p className="text-xs text-gray-400 mt-1">If your data grows, use an Excel Table – it auto‑adjusts and is almost as fast as a fixed range.</p>
        </section>

        {/* Best Practice 2: Exact Match Default */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300">2️⃣ Use Exact Match (FALSE) Unless You Need Approximate</h3>
          <p className="mt-2 text-gray-200">Exact match (VLOOKUP with FALSE) does a linear search. Approximate match (TRUE) does a binary search but requires sorted data. If your data is unsorted, approximate match is wrong and also slow.</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">✅ Always include FALSE: =VLOOKUP(E2, table, 3, FALSE)</code>
          </div>
        </section>

        {/* Best Practice 3: INDEX-MATCH over VLOOKUP */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300">3️⃣ Prefer INDEX-MATCH or XLOOKUP for Large Data</h3>
          <p className="mt-2 text-gray-200">VLOOKUP reads the entire table_array (all columns). INDEX-MATCH only reads the lookup column and the return column. On wide tables, this is significantly faster.</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">=INDEX(return_col, MATCH(lookup_value, lookup_col, 0))</code>
          </div>
        </section>

        {/* Best Practice 4: Sort for Approximate Match */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300">4️⃣ Approximate Match (Binary Search) – Sort First!</h3>
          <p className="mt-2 text-gray-200">If you need approximate match (e.g., tax brackets), sort the lookup column ascending. Then VLOOKUP with TRUE or MATCH with 1 will use ultra‑fast binary search (log n instead of n).</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">=VLOOKUP(income, sorted_brackets, 2, TRUE)</code>
            <p className="text-xs text-gray-400">Binary search on sorted data is thousands of times faster than linear search on unsorted.</p>
          </div>
        </section>

        {/* Best Practice 5: Use Excel Tables */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300">5️⃣ Use Excel Tables for Dynamic Ranges</h3>
          <p className="mt-2 text-gray-200">Tables automatically expand when you add data, and structured references (e.g., Table1[Price]) are self‑documenting and not slower than absolute ranges.</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">=VLOOKUP(E2, Table1, 4, FALSE)</code>
            <p className="text-xs text-gray-400">The table reference is absolute; no need for $.</p>
          </div>
        </section>

        {/* Best Practice 6: Avoid Volatile Functions in Lookups */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300">6️⃣ Avoid Volatile Functions (INDIRECT, OFFSET, TODAY, NOW)</h3>
          <p className="mt-2 text-gray-200">Volatile functions recalculate every time any cell changes. Using them inside lookups (e.g., INDIRECT in a MATCH) can cripple performance. Use INDEX instead of OFFSET, and store date/time values in cells rather than using TODAY/NOW directly.</p>
          <div className="mt-2 bg-gray-900 p-2 rounded">
            <code className="text-sm">❌ Slow: =VLOOKUP(E2, INDIRECT("A2:C100000"), 3, FALSE)</code>
            <code className="text-sm block mt-1">✅ Fast: =VLOOKUP(E2, A2:C100000, 3, FALSE)</code>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Performance Testing</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“lookup_performance_data”</strong> contains 50,000 rows of product data. Test different lookup methods and measure calculation time.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="lookup_performance_data"
              title="Performance Test – 50k Rows"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <StaticPerformanceTips />
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> Create a VLOOKUP with whole‑column reference (A:A) and another with a fixed range (A2:A50000). Use a stopwatch or the formula calculation timer to see the difference.
          </p>
        </section>

        {/* Performance Comparison Table */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">📊 Performance Comparison (500,000 rows)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-800">
                <tr><th className="px-3 py-2">Method</th><th className="px-3 py-2">Relative Speed</th><th className="px-3 py-2">Pros</th></tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">VLOOKUP exact, whole column</td><td className="px-3 py-1">Slowest</td><td className="px-3 py-1">Simple</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">VLOOKUP exact, limited range</td><td className="px-3 py-1">Fast</td><td className="px-3 py-1">Good for small/medium data</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">INDEX-MATCH, limited columns</td><td className="px-3 py-1">Faster</td><td className="px-3 py-1">Wide tables benefit</td></tr>
                <tr className="border-b border-gray-700"><td className="px-3 py-1">XLOOKUP, limited ranges</td><td className="px-3 py-1">Fastest (Excel 365)</td><td className="px-3 py-1">Modern, simple</td></tr>
                <tr><td className="px-3 py-1">Approximate match, sorted data</td><td className="px-3 py-1">Lightning</td><td className="px-3 py-1">Best for numeric bands</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Performance Killers to Avoid</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Whole‑column references (A:A) on large datasets</li>
            <li>Volatile functions (INDIRECT, OFFSET) inside lookups</li>
            <li>Array formulas that process entire columns</li>
            <li>Excessive conditional formatting on lookup columns</li>
            <li>Lookups across multiple workbooks (external links)</li>
            <li>Using VLOOKUP on unsorted data with TRUE (wrong results + slow)</li>
          </ul>
        </section>

        {/* Best Practices Summary */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Summary of Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use specific ranges, not whole columns.</li>
            <li>Prefer INDEX-MATCH or XLOOKUP over VLOOKUP for wide tables.</li>
            <li>Sort data and use approximate match (TRUE/1) when appropriate.</li>
            <li>Use Excel Tables for dynamic, self‑adjusting ranges.</li>
            <li>Avoid volatile functions inside lookups.</li>
            <li>Limit the number of lookups; consider using Power Query to merge data.</li>
            <li>Turn off automatic calculation during heavy data entry (Formulas → Calculation Options → Manual).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a workbook with 500,000 rows and 20 columns. You need to look up prices from a product table. Which method would be fastest? 
            Observe carefully: INDEX-MATCH on the specific columns, using limited ranges (e.g., $A$2:$A$500000, $D$2:$D$500000) and a helper column if needed. Avoid whole‑column references.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Advanced Performance Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use Power Query to import and merge data – it does the lookup before loading into Excel.</li>
            <li>For binary search (approximate match), ensure your lookup column is truly unique and sorted.</li>
            <li>Split large workbooks into multiple files and use Power Pivot (Data Model) for relationships.</li>
            <li>Use the <strong>Performance Toolkit</strong> or <strong>Formula Auditing</strong> to identify slow formulas.</li>
            <li>In Excel 365, the new <strong>LAMBDA</strong> function can be optimised for recursive lookups.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Avoid whole‑column references</li>
            <li>✅ Use exact match (FALSE) unless you need approximate</li>
            <li>✅ Prefer INDEX-MATCH over VLOOKUP for wide tables</li>
            <li>✅ Sort data for approximate match (binary search)</li>
            <li>✅ Use Excel Tables for dynamic ranges</li>
            <li>✅ Avoid volatile functions (INDIRECT, OFFSET)</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Lookup Performance – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by creating a VLOOKUP with whole‑column references on a large dataset (e.g., 100k rows). Demonstrate how slow it is. Then change to a specific range and show the speed improvement. " +
            "Next, show INDEX-MATCH on the same data – often slightly faster, especially if the table has many columns. " +
            "Explain the concept of binary search vs linear search, and why sorting is required for approximate match. " +
            "Emphasise that these best practices are what separate amateur from professional Excel users. " +
            "For the Excel sheet, generate at least 50,000 rows of product data (can be dummy data) so students can experience real performance differences. " +
            "If time permits, use the 'Calculate Now' and a stopwatch to measure execution time."
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