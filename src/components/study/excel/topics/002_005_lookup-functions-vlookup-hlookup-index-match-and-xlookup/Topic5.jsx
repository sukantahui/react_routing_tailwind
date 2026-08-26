"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic5_files/topic5_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic5() {
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

  // Static fallback tables showing common errors
  const StaticErrorExamples = () => (
    <div className="space-y-4">
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-red-500">
        <p className="font-mono text-sm">=VLOOKUP("P101", A2:C5, 4, FALSE) → #REF!</p>
        <p className="text-xs text-gray-400">Because col_index_num (4) is greater than the number of columns (3).</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-red-500">
        <p className="font-mono text-sm">=VLOOKUP("P102", B2:C5, 2, FALSE) → #N/A</p>
        <p className="text-xs text-gray-400">Lookup column is B, but VLOOKUP expects the first column of table_array to be the lookup column – should be A:C.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-yellow-500">
        <p className="font-mono text-sm">=VLOOKUP(101, A2:C5, 2, FALSE) → #N/A when A2:A5 contains text "101"</p>
        <p className="text-xs text-gray-400">Data type mismatch: number vs text.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-yellow-500">
        <p className="font-mono text-sm">=VLOOKUP("P103 ", A2:C5, 2, FALSE) → #N/A (trailing space)</p>
        <p className="text-xs text-gray-400">Extra spaces cause mismatch. Use TRIM() to clean.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            Common VLOOKUP Errors and Troubleshooting
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Learn to identify, diagnose, and fix the most frequent VLOOKUP errors – #N/A, #REF!, #VALUE!, and wrong results.
          </p>
        </header>

        {/* Error Types Overview */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🚨 The Main VLOOKUP Error Codes</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-mono text-red-400">#N/A</p>
              <p className="text-sm">Value not found in first column.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-mono text-red-400">#REF!</p>
              <p className="text-sm">Column index exceeds table width, or range invalid.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-mono text-red-400">#VALUE!</p>
              <p className="text-sm">Lookup value type mismatch or incorrect arguments.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-mono text-yellow-400">Wrong result (no error)</p>
              <p className="text-sm">Unsorted data with approximate match, or missing absolute references.</p>
            </div>
          </div>
        </section>

        {/* Detailed Troubleshooting */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🔍 Step‑by‑Step Troubleshooting</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-red-300">#N/A – “Not Available”</h3>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-300">
                <li>Does the lookup value actually exist in the first column? Use COUNTIF to check.</li>
                <li>Are there extra spaces? Use TRIM() on both sides.</li>
                <li>Data type mismatch: number vs text. Use VALUE() or TEXT() to coerce.</li>
                <li>Lookup column is not the first column of table_array.</li>
                <li>Approximate match with lookup value smaller than smallest value.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-300">#REF! – “Reference Error”</h3>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-300">
                <li>col_index_num is greater than the number of columns in table_array.</li>
                <li>Table_array range was deleted or moved.</li>
                <li>Copying formula without absolute references caused range to shift off sheet.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-300">#VALUE! – “Value Error”</h3>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-300">
                <li>Lookup value is an array (rare).</li>
                <li>col_index_num is less than 1, or not a number.</li>
                <li>Incorrect argument type (e.g., text where number expected).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-300">Wrong results (no error)</h3>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-gray-300">
                <li>Forgot to specify FALSE – default is approximate match.</li>
                <li>Table_array not locked with $ – range shifted after copying.</li>
                <li>Duplicate lookup values – returns first match only.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real‑world examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Debugging Scenarios</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium">🔹 Barrackpore School Gradebook</p>
              <p className="text-sm">VLOOKUP returns #N/A for student "Swadeep" even though he exists. Cause: Extra space in the lookup table ("Swadeep " vs "Swadeep").</p>
              <p className="text-xs text-green-300 mt-1">Fix: =VLOOKUP(TRIM(A2), TRIM($B$2:$C$100), 2, FALSE) – array formula or clean source data.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium">🔹 Ichapur Inventory System</p>
              <p className="text-sm">VLOOKUP works in row 2 but returns #REF! when copied down. Cause: Forgot to lock table_array (no $).</p>
              <p className="text-xs text-green-300 mt-1">Fix: Change A2:C100 to $A$2:$C$100.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium">🔹 Naihati Sales Report</p>
              <p className="text-sm">VLOOKUP returns wrong commission rate. Cause: Used approximate match (TRUE) on unsorted rate table.</p>
              <p className="text-xs text-green-300 mt-1">Fix: Sort rate table ascending or use FALSE for exact match (but approximate needed for bands – must sort).</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Fix the Errors</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“vlookup_errors_data”</strong> contains broken VLOOKUP formulas. Your task: diagnose and fix each error.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="vlookup_errors_data"
              title="Error Practice – Find & Fix the VLOOKUP Errors"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “vlookup_errors_data” not available. Showing static examples.
              </div>
              <StaticErrorExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Challenge:</strong> In the sheet, you'll find #N/A, #REF!, and wrong results. Use the troubleshooting steps above to correct each formula.
          </p>
        </section>

        {/* Error‑handling with IFERROR */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">🛡️ Graceful Error Handling: IFERROR</h3>
          <p className="mt-2">Wrap your VLOOKUP with IFERROR to display custom messages or blanks instead of ugly errors.</p>
          <code className="block bg-gray-900 p-2 rounded mt-2 text-sm">=IFERROR(VLOOKUP(A2, B:C, 2, FALSE), "Not Found")</code>
          <code className="block bg-gray-900 p-2 rounded mt-1 text-sm">=IFERROR(VLOOKUP(A2, B:C, 2, FALSE), "")</code>
          <p className="text-sm text-gray-300 mt-2">Note: IFERROR catches all errors (#N/A, #REF!, #VALUE!). Use IFNA in newer Excel to catch only #N/A.</p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Most Common Mistakes (Even Pros Make)</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Omitting the fourth argument → default approximate match on unsorted data → wrong results.</li>
            <li>Forgetting to lock the table_array ($) when copying → #REF! or shifting ranges.</li>
            <li>Using VLOOKUP when the lookup column is not the first column in the range → #N/A.</li>
            <li>Copying a formula that contains a hard‑coded col_index_num after inserting/deleting columns → #REF!.</li>
            <li>Assuming VLOOKUP is case‑sensitive – it is not. For case‑sensitive, use INDEX‑MATCH with EXACT.</li>
            <li>Not using IFERROR – reports become ugly and harder to read.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Troubleshooting Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Test each argument separately: use COUNTIF to check existence, use ISNUMBER to check data type.</li>
            <li>Use Evaluate Formula (Formulas tab) to step through the calculation.</li>
            <li>Replace the table_array with a smaller range temporarily to test.</li>
            <li>Use IFERROR to hide errors while debugging, but remove once fixed.</li>
            <li>For large data, use INDEX‑MATCH or XLOOKUP to avoid VLOOKUP's limitations.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “If your VLOOKUP returns #N/A but you are sure the value exists, what is the most likely cause? 
            Observe carefully: Data type mismatch (number vs text) or extra spaces. Try =A2=B2 to test equality.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Debugging Toolkit</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Quick check:</strong> =COUNTIF(lookup_column, lookup_value) – returns 0 if not present, &gt;0 if present (but doesn't catch data type or spaces).</li>
            <li><strong>Exact equality test:</strong> =EXACT(lookup_value, cell) – case‑sensitive and catches spaces.</li>
            <li><strong>Find data type:</strong> =ISTEXT(cell) or ISNUMBER(cell).</li>
            <li><strong>Clean data:</strong> Use TRIM, CLEAN, and VALUE functions on source data or helper columns.</li>
            <li><strong>Trace Precedents:</strong> Formulas tab → Trace Precedents to see which cells affect the formula.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ #N/A → value not found, spaces, data type, or wrong column.</li>
            <li>✅ #REF! → col_index too high or range missing.</li>
            <li>✅ #VALUE! → col_index &lt;1 or wrong argument type.</li>
            <li>✅ Wrong results → forgot FALSE, no $, duplicates.</li>
            <li>✅ Use IFERROR to present clean output.</li>
            <li>✅ Use COUNTIF, EXACT, ISTEXT to diagnose.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="VLOOKUP Errors & Troubleshooting – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Create a worksheet 'vlookup_errors_data' with intentional mistakes: a missing value, a space, a text number, a wrong col_index, and an unsorted approximate match. " +
            "Walk through each error as a class exercise. Show how to use COUNTIF to test existence, and how IFERROR can make reports cleaner. " +
            "Emphasise that VLOOKUP never gives a warning when you use approximate match on unsorted data – that's the most dangerous error because results look plausible but are wrong."
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