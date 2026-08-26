"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic6_files/topic6_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic6() {
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

  // Static fallback tables for HLOOKUP examples
  const StaticHorizontalTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700 mb-4">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr><th className="px-4 py-2">Month</th><th className="px-4 py-2">Jan</th><th className="px-4 py-2">Feb</th><th className="px-4 py-2">Mar</th><th className="px-4 py-2">Apr</th></tr>
        </thead>
        <tbody>
          <tr><td className="px-4 py-2 font-medium">Sales (₹)</td><td className="px-4 py-2">50000</td><td className="px-4 py-2">62000</td><td className="px-4 py-2">48000</td><td className="px-4 py-2">71000</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-teal-300">HLOOKUP example: =HLOOKUP("Mar", A1:D2, 2, FALSE) → 48000</div>
    </div>
  );

  const StaticGradeHorizontalTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr><th className="px-4 py-2">Student</th><th className="px-4 py-2">Swadeep</th><th className="px-4 py-2">Tuhina</th><th className="px-4 py-2">Abhronila</th></tr>
        </thead>
        <tbody>
          <tr><td className="px-4 py-2 font-medium">Marks</td><td className="px-4 py-2">85</td><td className="px-4 py-2">92</td><td className="px-4 py-2">78</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-teal-300">=HLOOKUP("Tuhina", A1:C2, 2, FALSE) → 92</div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-green-500 bg-clip-text text-transparent">
            HLOOKUP for Horizontal Data
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            When your data is arranged in rows instead of columns – HLOOKUP searches horizontally across the first row.
          </p>
        </header>

        {/* Function Prototype */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-teal-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-teal-500">
            =HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-teal-300">Return type:</strong> Any data type (number, text, date, etc.)</li>
            <li><strong className="text-teal-300">Purpose:</strong> Searches for a value in the first row of a table and returns a value in the same column from a row you specify.</li>
            <li><strong className="text-teal-300">When to use:</strong> When your lookup column is actually a row – e.g., monthly sales data (months across columns), student names across columns, product specifications across rows.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            ⚠️ Note: HLOOKUP works exactly like VLOOKUP but transposed – it searches the <strong>first row</strong> and returns from a specified <strong>row number</strong>.
          </div>
        </section>

        {/* Detailed Explanation */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🧠 How HLOOKUP Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              HLOOKUP (Horizontal Lookup) searches for a value in the <strong>top row</strong> of a table (horizontally) and returns a value from the same column, a specified number of rows down.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-teal-500">
              <p className="font-semibold text-teal-300">Arguments (same as VLOOKUP, but row instead of column):</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><span className="font-mono">lookup_value</span> – value to find in the first row.</li>
                <li><span className="font-mono">table_array</span> – range containing the data (first row is the lookup row).</li>
                <li><span className="font-mono">row_index_num</span> – which row number (starting at 1 for the first row) to return the value from.</li>
                <li><span className="font-mono">[range_lookup]</span> – FALSE for exact match, TRUE (or omitted) for approximate match (requires sorted first row).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real‑world Example */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario 1:</strong> In Shyamnagar, a retail store tracks monthly sales across the top row. The manager wants to see sales for a specific month (e.g., "March") without scanning the whole sheet.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse mb-2">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-1"></th><th className="border px-3 py-1">Jan</th><th className="border px-3 py-1">Feb</th><th className="border px-3 py-1">Mar</th><th className="border px-3 py-1">Apr</th></tr></thead>
                <tbody><tr><td className="border px-3 py-1 font-medium">Sales</td><td className="border px-3 py-1">50,000</td><td className="border px-3 py-1">62,000</td><td className="border px-3 py-1">48,000</td><td className="border px-3 py-1">71,000</td></tr></tbody>
              </table>
              <code className="block text-sm text-teal-300">=HLOOKUP("Mar", A1:D2, 2, FALSE) → 48,000</code>
            </div>
            <p className="text-gray-200 mt-4">
              <strong>Scenario 2:</strong> In Barrackpore School, student marks are arranged horizontally. Find marks for "Tuhina".
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <table className="w-full text-sm border-collapse mb-2">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-1"></th><th className="border px-3 py-1">Swadeep</th><th className="border px-3 py-1">Tuhina</th><th className="border px-3 py-1">Abhronila</th></tr></thead>
                <tbody><tr><td className="border px-3 py-1 font-medium">Marks</td><td className="border px-3 py-1">85</td><td className="border px-3 py-1">92</td><td className="border px-3 py-1">78</td></tr></tbody>
              </table>
              <code className="block text-sm text-teal-300">=HLOOKUP("Tuhina", A1:C2, 2, FALSE) → 92</code>
            </div>
          </div>
        </section>

        {/* VLOOKUP vs HLOOKUP Comparison (SVG/Diagram) */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-center mb-4">🔄 VLOOKUP vs HLOOKUP – Visual Comparison</h3>
          <div className="flex justify-center">
            <svg width="550" height="200" viewBox="0 0 550 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              {/* VLOOKUP side */}
              <rect x="20" y="20" width="230" height="150" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="135" y="45" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">VLOOKUP (Vertical)</text>
              <line x1="30" y1="55" x2="240" y2="55" stroke="#3b82f6" strokeWidth="0.8" />
              <text x="40" y="75" fill="#e5e7eb" fontSize="11">↓ Searches first column</text>
              <text x="40" y="95" fill="#e5e7eb" fontSize="11">↓ Returns from same row</text>
              <text x="40" y="115" fill="#e5e7eb" fontSize="11">Data arranged vertically</text>
              <rect x="60" y="130" width="50" height="25" rx="3" fill="#3b82f6" fillOpacity="0.3" />
              <text x="85" y="147" textAnchor="middle" fill="#e5e7eb" fontSize="10">ID→Name</text>

              {/* Arrow */}
              <line x1="260" y1="95" x2="300" y2="95" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,4">
                <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.6s" repeatCount="indefinite" />
              </line>
              <polygon points="300,90 315,95 300,100" fill="#fbbf24" />

              {/* HLOOKUP side */}
              <rect x="320" y="20" width="210" height="150" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
              <text x="425" y="45" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">HLOOKUP (Horizontal)</text>
              <line x1="330" y1="55" x2="520" y2="55" stroke="#10b981" strokeWidth="0.8" />
              <text x="340" y="75" fill="#e5e7eb" fontSize="11">→ Searches first row</text>
              <text x="340" y="95" fill="#e5e7eb" fontSize="11">→ Returns from same column</text>
              <text x="340" y="115" fill="#e5e7eb" fontSize="11">Data arranged horizontally</text>
              <rect x="380" y="130" width="80" height="25" rx="3" fill="#10b981" fillOpacity="0.3" />
              <text x="420" y="147" textAnchor="middle" fill="#e5e7eb" fontSize="10">Jan→Sales</text>
            </svg>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example: HLOOKUP Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“hlookup_data”</strong> contains horizontally structured data (monthly sales, student marks, product prices across rows). Practice HLOOKUP formulas.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="hlookup_data"
              title="Horizontal Data – Practice HLOOKUP"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “hlookup_data” not available. Showing static examples.
              </div>
              <StaticHorizontalTable />
              <StaticGradeHorizontalTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the sheet, write =HLOOKUP("Feb", A1:M2, 2, FALSE) to get February sales. Then change to approximate match and see the difference.
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls with HLOOKUP</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using HLOOKUP when data is vertical (use VLOOKUP instead).</li>
            <li>Forgetting that row_index_num starts at 1 (the lookup row itself).</li>
            <li>row_index_num greater than number of rows in table_array → #REF!.</li>
            <li>Approximate match (TRUE/omitted) with unsorted first row → wrong results.</li>
            <li>Not locking table_array with $ when copying horizontally.</li>
            <li>HLOOKUP cannot look above the first row – like VLOOKUP cannot look left.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use HLOOKUP only when your data is naturally horizontal (months, quarters, years across columns).</li>
            <li>Lock the table_array with $ (e.g., $A$1:$M$3) before copying across rows.</li>
            <li>Always specify FALSE for exact match unless you need approximate bands.</li>
            <li>Consider transposing vertical data with TRANSPOSE or Power Query if you prefer VLOOKUP.</li>
            <li>Use XLOOKUP for newer Excel – it works both vertically and horizontally without separate functions.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a table with student names across the top row (columns B–Z) and subjects down the first column (rows 2–10). 
            Which function would you use to find Abhronila's Physics marks? 
            Observe carefully: The lookup value (Abhronila) is in the first row, so you need HLOOKUP, not VLOOKUP.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use HLOOKUP with dynamic row index: =HLOOKUP(A2, table, MATCH("Price", row_range, 0), FALSE).</li>
            <li>Combine HLOOKUP with VLOOKUP for two‑way lookups (matrix lookup).</li>
            <li>In financial models, months across columns are ideal for HLOOKUP.</li>
            <li>Use XLOOKUP instead: =XLOOKUP("Mar", month_row, sales_row) – works for horizontal data without row_index.</li>
            <li>For large horizontal datasets, consider unpivoting with Power Query to use VLOOKUP.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])</li>
            <li>✅ Searches first row horizontally.</li>
            <li>✅ row_index_num = 1 returns from first row (the lookup row itself).</li>
            <li>✅ Use FALSE for exact match (most common).</li>
            <li>✅ Lock table_array with $ when copying.</li>
            <li>✅ HLOOKUP is for horizontal data, VLOOKUP for vertical.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="HLOOKUP – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Show a real horizontal dataset: monthly sales across columns, student names across columns, etc. " +
            "Write =HLOOKUP('Mar', A1:M2, 2, FALSE) and demonstrate. Compare with VLOOKUP – many students try to use VLOOKUP on horizontal data and get #N/A. " +
            "Also show that if the data is vertical, VLOOKUP is appropriate; if horizontal, HLOOKUP. " +
            "For the Excel sheet 'hlookup_data', include at least two horizontal tables: (1) months with sales/profit, (2) student names with marks for 2-3 subjects (one subject per row)."
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