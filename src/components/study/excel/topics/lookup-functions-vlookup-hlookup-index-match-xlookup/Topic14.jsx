"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic14_files/topic14_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic14() {
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

  // Static fallback for IFERROR examples
  const StaticIferrorExamples = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">A (ID)</th><th className="px-3 py-2">B (Name)</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-3 py-1">101</td><td className="px-3 py-1">Swadeep</td></tr>
            <tr><td className="px-3 py-1">102</td><td className="px-3 py-1">Tuhina</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-indigo-500">
        <p className="font-mono text-sm">=IFERROR(VLOOKUP(103, A2:B10, 2, FALSE), "Not found")</p>
        <p className="text-xs text-gray-400">Returns "Not found" instead of #N/A.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-indigo-500">
        <p className="font-mono text-sm">=IFERROR(VLOOKUP(101, A2:B10, 3, FALSE), 0)</p>
        <p className="text-xs text-gray-400">Returns 0 instead of #REF! (col_index too high).</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Handling Missing Values with IFERROR
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Keep your spreadsheets clean – replace ugly errors with custom messages, blanks, or zeros.
          </p>
        </header>

        {/* Function Prototype */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-400">📐</span> IFERROR Function
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-indigo-500">
            =IFERROR(value, value_if_error)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-indigo-300">Return type:</strong> Any data type (same as value or the fallback).</li>
            <li><strong className="text-indigo-300">Purpose:</strong> Checks a formula for any error (#N/A, #REF!, #VALUE!, #DIV/0!, etc.) and returns a custom result if an error is found.</li>
            <li><strong className="text-indigo-300">When to use:</strong> Whenever you have a lookup (VLOOKUP, INDEX-MATCH, XLOOKUP) that might fail, or any formula that could produce an error.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 IFERROR catches <strong>all</strong> error types. For catching only #N/A, use IFNA (Excel 2013+).
          </div>
        </section>

        {/* Why Error Handling Matters */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🧹 Why Error Handling Matters</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Errors (#N/A, #REF!) make reports look unprofessional.</li>
            <li>Errors break dependent formulas (e.g., SUM of a column with #N/A returns #N/A).</li>
            <li>Users may not understand error codes – custom messages are clearer.</li>
            <li>IFERROR lets you substitute 0, blank, or "Not found" for a seamless experience.</li>
          </ul>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">❌ Without IFERROR: =VLOOKUP(E2, A:B, 2, FALSE)</p>
            <p className="font-mono text-sm mt-1">✅ With IFERROR: =IFERROR(VLOOKUP(E2, A:B, 2, FALSE), "Missing")</p>
          </div>
        </section>

        {/* Common Use Cases */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Case 1: Missing Product Lookup</p>
              <p className="text-sm">In a sales report, some product IDs are obsolete. Show "Not in catalog" instead of #N/A.</p>
              <code className="block text-sm text-green-300 mt-1">=IFERROR(VLOOKUP(F2, Products!A:C, 3, FALSE), "Not in catalog")</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Case 2: Division by Zero</p>
              <p className="text-sm">Calculating profit margin when revenue is zero results in #DIV/0!. Show 0% instead.</p>
              <code className="block text-sm text-green-300 mt-1">=IFERROR(Profit/Revenue, 0)</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Case 3: Nested Lookups (Multiple VLOOKUPs)</p>
              <p className="text-sm">Try one table, then another, then default.</p>
              <code className="block text-sm text-green-300 mt-1">=IFERROR(VLOOKUP(E2, Table1, 2, FALSE), IFERROR(VLOOKUP(E2, Table2, 2, FALSE), "Not found"))</code>
            </div>
          </div>
        </section>

        {/* IFERROR vs IFNA */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">⚖️ IFERROR vs IFNA</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-indigo-300">IFERROR</p>
              <p className="text-sm">Catches <strong>all errors</strong>: #N/A, #REF!, #VALUE!, #DIV/0!, #NUM!, #NULL!</p>
              <p className="text-xs text-gray-400">Use when you want to hide any error.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-indigo-300">IFNA</p>
              <p className="text-sm">Catches <strong>only #N/A</strong> (value not found).</p>
              <p className="text-xs text-gray-400">Use when you want to see other errors (e.g., #REF!) to debug.</p>
            </div>
          </div>
          <div className="mt-3 bg-gray-900 p-2 rounded text-sm">
            <span className="font-mono">=IFNA(VLOOKUP(...), "Not found")</span> – leaves other errors visible.
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Practice IFERROR</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“iferror_data”</strong> contains product lookups that return #N/A and #REF!. Practice wrapping them with IFERROR to show clean messages.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="iferror_data"
              title="IFERROR Practice – Clean Your Reports"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “iferror_data” not available. Showing static examples.
              </div>
              <StaticIferrorExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the sheet, write =VLOOKUP("P999", A:C, 3, FALSE) – it returns #N/A. Then wrap with IFERROR: =IFERROR(VLOOKUP(...), "Product not found").
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Over‑using IFERROR</strong> – hides legitimate errors that you should fix, not hide.</li>
            <li><strong>Using IFERROR on the entire formula when only the lookup might fail</strong> – better to wrap only the lookup part.</li>
            <li><strong>Not distinguishing between error types</strong> – IFERROR hides #REF! as easily as #N/A, which may mask broken references.</li>
            <li><strong>Returning text when number expected</strong> – IFERROR("Not found") breaks SUM calculations. Return 0 for numeric columns.</li>
            <li><strong>Using IFERROR in array formulas</strong> – can slow down performance; use IFNA where possible.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use IFNA for VLOOKUP/XLOOKUP to catch only missing values, leaving other errors visible.</li>
            <li>Return 0 or "" (blank) when the result will be used in calculations.</li>
            <li>Wrap only the specific function that might error, not the entire formula.</li>
            <li>Test your formula without IFERROR first to ensure there are no other errors.</li>
            <li>For XLOOKUP, use the built‑in if_not_found argument instead of IFERROR.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a column of VLOOKUPs that sometimes return #N/A. You wrap each with IFERROR(..., 0). Now your SUM works fine. 
            But what if one VLOOKUP had a #REF! error because a column was deleted? IFERROR would still show 0, hiding the real problem. 
            Observe carefully: Use IFNA instead to see #REF! errors and fix them.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use IFERROR with AGGREGATE to ignore errors in calculations: =AGGREGATE(9,6, range).</li>
            <li>Create a custom error message that includes the lookup value: =IFERROR(VLOOKUP(A2, B:C,2,0), A2 & " not found").</li>
            <li>Combine IFERROR with multiple VLOOKUPs for fallback tables: =IFERROR(VLOOKUP(...), IFERROR(VLOOKUP(...), "No match")).</li>
            <li>In Excel 365, use XLOOKUP's 4th argument instead of IFERROR for cleaner formulas.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =IFERROR(value, value_if_error)</li>
            <li>✅ Catches ALL errors: #N/A, #REF!, #VALUE!, #DIV/0!, etc.</li>
            <li>✅ Use IFNA to catch only #N/A (missing values).</li>
            <li>✅ Return 0 for numeric columns, "" for text, or custom messages.</li>
            <li>✅ XLOOKUP has built‑in error handling (4th argument).</li>
            <li>✅ Don't overuse – hide only expected errors.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="IFERROR – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing a VLOOKUP that returns #N/A. Ask students why that's bad (breaks SUM, looks unprofessional). Then wrap with IFERROR to show 'Not found'. " +
            "Then demonstrate a #REF! error (col_index too high) and show that IFERROR hides it too. Introduce IFNA as a more targeted alternative. " +
            "For the Excel sheet 'iferror_data', create several VLOOKUPs with different errors. Ask students to fix them using IFERROR or IFNA appropriately. " +
            "Emphasise that error handling is not just about hiding – it's about making spreadsheets robust and user‑friendly."
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