"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic3_files/topic3_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic3() {
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

  // Static fallback tables
  const StaticExactMatchTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700 mb-4">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr><th className="px-4 py-2">Product ID</th><th className="px-4 py-2">Product Name</th><th className="px-4 py-2">Price</th></tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P101</td><td className="px-4 py-2">Laptop</td><td className="px-4 py-2">55000</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P102</td><td className="px-4 py-2">Mouse</td><td className="px-4 py-2">1200</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P103</td><td className="px-4 py-2">Keyboard</td><td className="px-4 py-2">800</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-blue-300">Exact match: =VLOOKUP("P102", A:C, 3, FALSE) → 1200</div>
    </div>
  );

  const StaticApproxMatchTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr><th className="px-4 py-2">Score (Lower Bound)</th><th className="px-4 py-2">Grade</th></tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">0</td><td className="px-4 py-2">F</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">60</td><td className="px-4 py-2">D</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">70</td><td className="px-4 py-2">C</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">80</td><td className="px-4 py-2">B</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">90</td><td className="px-4 py-2">A</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-green-300">Approximate match: =VLOOKUP(85, A:B, 2, TRUE) → B</div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Exact Match vs Approximate Match in VLOOKUP
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Understand when to use FALSE/0 (exact) and when to use TRUE/1 (approximate) – critical for accurate lookups.
          </p>
        </header>

        {/* Prototype & Comparison */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">⚖️ The Fourth Argument</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="font-mono text-lg">=VLOOKUP(..., FALSE)</p>
              <p className="text-sm mt-2">Exact match – requires the lookup value to be identical to a value in the first column.</p>
              <p className="text-xs text-gray-400 mt-1">Use for: IDs, codes, names, unique identifiers.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-amber-500">
              <p className="font-mono text-lg">=VLOOKUP(..., TRUE)</p>
              <p className="text-sm mt-2">Approximate match – finds the largest value ≤ lookup value (first column must be sorted ascending).</p>
              <p className="text-xs text-gray-400 mt-1">Use for: grades, tax brackets, commission tiers, discount bands.</p>
            </div>
          </div>
        </section>

        {/* Detailed Explanation */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🧠 How Each Mode Works</h2>
          <div className="mt-4 space-y-4">
            <p><strong className="text-blue-300">Exact Match (FALSE/0):</strong> Excel scans the first column from top to bottom until it finds an exact match. If found, it returns the value from the specified column. If not found → #N/A.</p>
            <p><strong className="text-amber-300">Approximate Match (TRUE/1 or omitted):</strong> Excel assumes the first column is sorted ascending. It finds the largest value that is less than or equal to the lookup value. If the lookup value is smaller than all values → #N/A.</p>
            <div className="bg-gray-900 p-3 rounded text-sm">
              ⚠️ <strong>Critical:</strong> For approximate match, the lookup column must be sorted ascending – otherwise results are unpredictable and wrong!
            </div>
          </div>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Scenarios</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-blue-300">Exact Match: Product Price Lookup</h3>
              <p className="text-sm text-gray-300">In Barrackpore, a cashier scans a product barcode (P103) to retrieve the price from a product table.</p>
              <code className="block bg-gray-900 p-2 rounded mt-1 text-sm">=VLOOKUP("P103", Products!A:C, 3, FALSE) → 800</code>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300">Approximate Match: Grade Calculation</h3>
              <p className="text-sm text-gray-300">A teacher in Shyamnagar enters a student's score (85) and wants to assign a letter grade based on a grade table (0=F, 60=D, 70=C, 80=B, 90=A).</p>
              <code className="block bg-gray-900 p-2 rounded mt-1 text-sm">=VLOOKUP(85, GradeTable!A:B, 2, TRUE) → B</code>
              <p className="text-xs text-gray-400 mt-1">Because 85 is between 80 and 90, the largest ≤85 is 80 → returns B.</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Examples</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">Sheets <strong>“vlookup_data”</strong> (exact match) and <strong>“approx_match_data”</strong> (approximate match) are available.</p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="approx_match_data"
              title="Exact Match (Product Prices) – switch to 'approx_match_data' for grades"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file not available. Showing static examples.
              </div>
              <StaticExactMatchTable />
              <StaticApproxMatchTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the “approx_match_data” sheet, enter different scores (e.g., 72, 88, 95) and see which grade VLOOKUP returns. Then sort the grade table descending – what happens?
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Unsorted data with approximate match</strong> → returns wrong results without any error.</li>
            <li><strong>Omitting the fourth argument</strong> → defaults to TRUE (approximate), often unintentional.</li>
            <li><strong>Using FALSE (exact) for banded lookups</strong> → will return #N/A unless exact match exists.</li>
            <li><strong>Forgetting that approximate match uses ≤, not rounding.</strong> 89.9 with 90 threshold returns the lower band.</li>
            <li><strong>Lookup value smaller than all values</strong> → #N/A.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always include the fourth argument – never omit it.</li>
            <li>For exact match: use <span className="font-mono">FALSE</span> (or 0).</li>
            <li>For approximate match: sort the lookup column ascending and use <span className="font-mono">TRUE</span> (or 1).</li>
            <li>When using approximate match, ensure your lookup column contains the lower bounds of each band.</li>
            <li>Use IFERROR to handle missing values in exact match.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “What would happen if you use approximate match on a product ID column that is not sorted? Try it: VLOOKUP("P105", unsorted range, 2, TRUE). 
            Observe carefully: The result might be completely unexpected, and Excel gives no warning.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To force exact match behaviour by default, use <span className="font-mono">=VLOOKUP(..., FALSE)</span> – never rely on default (TRUE).</li>
            <li>For approximate match, always include a very low value (e.g., 0) as the first row to catch all inputs below the first threshold.</li>
            <li>You can combine approximate match with exact match by using a helper column that forces binary search: <span className="font-mono">=VLOOKUP(value, sorted_range, col, TRUE)</span> is much faster for huge data.</li>
            <li>In Excel 365, XLOOKUP makes the distinction clearer: <span className="font-mono">XLOOKUP(..., , , 0)</span> for exact, <span className="font-mono">XLOOKUP(..., , , -1)</span> for next smaller.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Exact match: FALSE/0 – finds identical value.</li>
            <li>✅ Approximate match: TRUE/1 – finds largest ≤ value (sorted!).</li>
            <li>✅ Omitting = approximate match (risky).</li>
            <li>✅ Sorted ascending mandatory for approximate.</li>
            <li>✅ Use exact for IDs, codes; approximate for bands/ranges.</li>
            <li>✅ Test approximate with VLOOKUP(lookup, range, 1, TRUE) to see the matched lower bound.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Exact Match vs Approximate Match – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Demonstrate the danger of unsorted approximate match by taking a grade table, sorting it descending, then using VLOOKUP with TRUE – it will give wrong grades. " +
            "Then sort ascending and show it works. For exact match, show how 'P101' vs 'P101 ' (space) causes #N/A. " +
            "Use the Excel sheet 'approx_match_data' with a grade table (0–100). Ask students to predict the grade for 74, 89, 95. " +
            "Emphasise that the first column of the table must contain the lower bounds (0,60,70,80,90)."
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