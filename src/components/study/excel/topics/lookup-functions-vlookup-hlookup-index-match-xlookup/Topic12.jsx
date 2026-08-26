"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic12_files/topic12_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic12() {
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

  // Static fallback examples for XLOOKUP
  const StaticXlookupExamples = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">A (ID)</th><th className="px-3 py-2">B (Name)</th><th className="px-3 py-2">C (Salary)</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-3 py-1">E101</td><td className="px-3 py-1">Swadeep</td><td className="px-3 py-1">75000</td></tr>
            <tr><td className="px-3 py-1">E102</td><td className="px-3 py-1">Tuhina</td><td className="px-3 py-1">68000</td></tr>
            <tr><td className="px-3 py-1">E103</td><td className="px-3 py-1">Abhronila</td><td className="px-3 py-1">72000</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-fuchsia-500">
        <p className="font-mono text-sm">=XLOOKUP("E102", A2:A10, C2:C10)</p>
        <p className="text-xs text-gray-400">Returns 68000 – basic lookup.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-fuchsia-500">
        <p className="font-mono text-sm">=XLOOKUP("Swadeep", B2:B10, A2:A10)</p>
        <p className="text-xs text-gray-400">Left lookup – returns E101. No need for INDEX-MATCH.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-fuchsia-500">
        <p className="font-mono text-sm">=XLOOKUP("P999", A2:A10, C2:C10, "Not found")</p>
        <p className="text-xs text-gray-400">Built‑in custom message for missing values.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
            Introduction to XLOOKUP (Excel 365)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The modern replacement for VLOOKUP, HLOOKUP, and INDEX-MATCH – simpler, more powerful, and more flexible.
          </p>
        </header>

        {/* Function Prototype */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-fuchsia-500/50 transition-all"&gt;
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-fuchsia-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-fuchsia-500">
            =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-fuchsia-300">Return type:</strong> Any data type (number, text, array, etc.)</li>
            <li><strong className="text-fuchsia-300">Purpose:</strong> Searches for a value in an array and returns a corresponding value from another array – can look left, right, up, down.</li>
            <li><strong className="text-fuchsia-300">When to use:</strong> Any lookup scenario. Best of all – <strong>no column index number, no sorting requirements for default exact match, built‑in error handling, and can return arrays.</strong></li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 XLOOKUP is available only in Excel 2021 and Microsoft 365. For older versions, use INDEX-MATCH.
          </div>
        </section>

        {/* Key Advantages */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">✨ Why XLOOKUP is Revolutionary</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Default Exact Match</p>
              <p className="text-sm">No more forgetting to add FALSE – exact match is the default.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Look Left or Right</p>
              <p className="text-sm">No restrictions – lookup and return arrays are independent.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Built‑in Not Found Message</p>
              <p className="text-sm">No need for IFERROR – add a custom message directly.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Vertical or Horizontal</p>
              <p className="text-sm">Replaces both VLOOKUP and HLOOKUP.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Return Arrays</p>
              <p className="text-sm">Can return multiple columns/rows in one formula (spill).</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-fuchsia-300">✅ Flexible Match Modes</p>
              <p className="text-sm">Exact, next smaller, next larger, wildcard.</p>
            </div>
          </div>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-fuchsia-300">Example 1: Basic Lookup (replaces VLOOKUP)</p>
              <code className="block text-sm text-green-300 mt-1">=XLOOKUP("P103", A2:A100, D2:D100)</code>
              <p className="text-xs text-gray-400">Finds price of product P103 – no column index, no $ needed.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-fuchsia-300">Example 2: Left Lookup (replaces INDEX-MATCH)</p>
              <code className="block text-sm text-green-300 mt-1">=XLOOKUP("Swadeep", B2:B100, A2:A100)</code>
              <p className="text-xs text-gray-400">Returns employee ID from column A based on name in column B – much simpler.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-fuchsia-300">Example 3: Custom Not Found Message</p>
              <code className="block text-sm text-green-300 mt-1">=XLOOKUP("P999", A2:A100, D2:D100, "Product not found")</code>
              <p className="text-xs text-gray-400">No IFERROR wrapper needed.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-fuchsia-300">Example 4: Return Multiple Columns</p>
              <code className="block text-sm text-green-300 mt-1">=XLOOKUP("P103", A2:A100, B2:D100)</code>
              <p className="text-xs text-gray-400">Returns Name, Category, and Price in three adjacent cells (spills).</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: XLOOKUP Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“xlookup_data”</strong> contains employee and product data. Practice XLOOKUP with different match modes and return arrays.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="xlookup_data"
              title="XLOOKUP – Modern Lookups"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “xlookup_data” not available. Showing static examples.
              </div>
              <StaticXlookupExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> =XLOOKUP("E103", A2:A10, B2:D10) – it returns Name, Department, Salary for employee E103 (spills across columns).
          </p>
        </section>

        {/* Match Modes and Search Modes */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">⚙️ Advanced Arguments</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-mono font-semibold">match_mode (5th argument)</p>
              <ul className="list-disc list-inside text-sm ml-2">
                <li><span className="font-mono">0</span> (default) – Exact match</li>
                <li><span className="font-mono">-1</span> – Exact match or next smaller (approximate, no sorting needed)</li>
                <li><span className="font-mono">1</span> – Exact match or next larger</li>
                <li><span className="font-mono">2</span> – Wildcard match (*, ?)</li>
              </ul>
            </div>
            <div>
              <p className="font-mono font-semibold">search_mode (6th argument)</p>
              <ul className="list-disc list-inside text-sm ml-2">
                <li><span className="font-mono">1</span> (default) – Search from first</li>
                <li><span className="font-mono">-1</span> – Search from last (find the last occurrence)</li>
                <li><span className="font-mono">2</span> – Binary search ascending (requires sorted data)</li>
                <li><span className="font-mono">-2</span> – Binary search descending</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>XLOOKUP is not available in older Excel versions – use INDEX-MATCH for compatibility.</li>
            <li>Forgetting that XLOOKUP returns a value, not a reference (unlike INDEX which can return a reference).</li>
            <li>Using wildcard match mode (2) without wildcards can lead to unexpected results.</li>
            <li>Not using absolute references when copying – lookup_array and return_array should be locked with $.</li>
            <li>Assuming default search is from last – it's from first, same as VLOOKUP.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use XLOOKUP for all new workbooks if your audience has Excel 365.</li>
            <li>Provide a custom not‑found message to avoid #N/A.</li>
            <li>Use absolute references ($) when copying formulas.</li>
            <li>Prefer XLOOKUP over VLOOKUP for simpler, more readable formulas.</li>
            <li>Use wildcard match mode carefully – it's powerful but can be slow on large data.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “How would you use XLOOKUP to find the last sale of a product instead of the first? 
            Observe carefully: Use search_mode = -1 (search from last to first).”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use XLOOKUP to return an entire row: =XLOOKUP(A2, A:A, B:Z).</li>
            <li>Combine XLOOKUP with SUM, AVERAGE: =SUM(XLOOKUP(A2, A:A, B:Z)).</li>
            <li>For two‑way lookups: =XLOOKUP(row_val, row_labels, XLOOKUP(col_val, col_labels, data_range)).</li>
            <li>Use XLOOKUP with wildcards and match_mode = 2 to search for partial text.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =XLOOKUP(lookup, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])</li>
            <li>✅ Default exact match, no sorting required</li>
            <li>✅ Can look left or right – no restrictions</li>
            <li>✅ Built‑in error handling (4th argument)</li>
            <li>✅ Can return arrays (multiple columns/rows)</li>
            <li>✅ Available in Excel 365 and 2021 only</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="XLOOKUP – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "If your students have access to Excel 365, teach XLOOKUP as the primary lookup function. Show how it simplifies everything: no more column counting, no left/right restrictions, no IFERROR wrappers. " +
            "Compare a VLOOKUP formula side‑by‑side with XLOOKUP – the difference in clarity is striking. " +
            "For the Excel sheet 'xlookup_data', include an employee table, a product table, and a grade table. Ask students to write XLOOKUPs for left lookups, returning multiple columns, and adding custom 'Not found' messages. " +
            "Also demonstrate search_mode = -1 to find the last occurrence of a value."
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