"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic9_files/topic9_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic9() {
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

  // Static fallback examples for INDEX-MATCH
  const StaticIndexMatchExamples = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">A (ID)</th><th className="px-3 py-2">B (Name)</th><th className="px-3 py-2">C (Marks)</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-3 py-1">101</td><td className="px-3 py-1">Swadeep</td><td className="px-3 py-1">85</td></tr>
            <tr><td className="px-3 py-1">102</td><td className="px-3 py-1">Tuhina</td><td className="px-3 py-1">92</td></tr>
            <tr><td className="px-3 py-1">103</td><td className="px-3 py-1">Abhronila</td><td className="px-3 py-1">78</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-mono text-sm">=INDEX(C2:C10, MATCH("Tuhina", B2:B10, 0))</p>
        <p className="text-xs text-gray-400">Returns 92 – finds row of "Tuhina" then returns marks from column C.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-mono text-sm">=INDEX(A2:A10, MATCH(92, C2:C10, 0))</p>
        <p className="text-xs text-gray-400">Left lookup: returns ID (102) from column A based on marks 92.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-mono text-sm">Two‑way (row & column):</p>
        <p className="font-mono text-sm">=INDEX(B2:E10, MATCH("Abhronila", A2:A10, 0), MATCH("Science", B1:E1, 0))</p>
        <p className="text-xs text-gray-400">Finds marks of Abhronila in Science – dynamic row and column.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Combining INDEX and MATCH
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The ultimate lookup combination – more powerful and flexible than VLOOKUP.
          </p>
        </header>

        {/* Why INDEX-MATCH */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all"&gt;
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">🔗</span> Why Combine INDEX and MATCH?
          </h2>
          <div className="mt-4 space-y-3">
            <p>INDEX returns a value at a specific row and column. MATCH finds the row (or column) number of a lookup value. Together, they create a lookup that:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li>✅ Can look up values to the <strong>left</strong> (VLOOKUP cannot)</li>
              <li>✅ Survives column insertions/deletions (no hard‑coded column index)</li>
              <li>✅ Faster on large datasets (if used with exact match)</li>
              <li>✅ Can perform two‑way lookups (row + column)</li>
              <li>✅ No need to count columns – MATCH finds the column dynamically</li>
            </ul>
          </div>
        </section>

        {/* Syntax and Breakdown */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🧠 Syntax Explained</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded-lg">
              <p className="font-mono text-lg text-amber-300">=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li><span className="font-mono">return_range</span> – the column/row from which to get the result</li>
                <li><span className="font-mono">lookup_value</span> – what you are searching for</li>
                <li><span className="font-mono">lookup_range</span> – where to search (single column/row)</li>
                <li><span className="font-mono">0</span> – exact match (most common)</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg">
              <p className="font-mono text-lg text-amber-300">=INDEX(return_range, MATCH(row_value, row_lookup_range, 0), MATCH(col_value, col_lookup_range, 0))</p>
              <p className="text-sm mt-1">Two‑way lookup: finds both the row and column dynamically.</p>
            </div>
          </div>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Example 1: Left Lookup (VLOOKUP can't do this)</p>
              <p className="text-sm">Find employee ID based on employee name (ID is left of name).</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(A2:A100, MATCH("Swadeep", B2:B100, 0))</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Example 2: Dynamic Column – Survive Insertions</p>
              <p className="text-sm">Return price for a product ID, even if new columns are inserted.</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(C2:C100, MATCH("P103", A2:A100, 0))</code>
              <p className="text-xs text-gray-400">No col_index_num to break – always returns from column C.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Example 3: Two‑Way Lookup (Matrix)</p>
              <p className="text-sm">Find marks for student "Abhronila" in subject "Science".</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(B2:E10, MATCH("Abhronila", A2:A10, 0), MATCH("Science", B1:E1, 0))</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: INDEX-MATCH Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“index_match_data”</strong> contains product data, student records, and a grade matrix. Practice LEFT lookups and two‑way lookups.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="index_match_data"
              title="INDEX-MATCH – Flexible Lookups"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “index_match_data” not available. Showing static examples.
              </div>
              <StaticIndexMatchExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> =INDEX(C2:C10, MATCH("P105", A2:A10, 0)) – returns price of product P105. Then try a left lookup: find product ID from product name.
          </p>
        </section>

        {/* INDEX-MATCH vs VLOOKUP Comparison */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">⚔️ INDEX-MATCH vs VLOOKUP</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-blue-300">VLOOKUP</p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                <li>❌ Cannot look left</li>
                <li>❌ Breaks if columns inserted/deleted</li>
                <li>❌ Hard‑coded column index</li>
                <li>❌ Slower on large data (linear search)</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-amber-300">INDEX-MATCH</p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                <li>✅ Can look left or right</li>
                <li>✅ Survives column changes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>MATCH range and INDEX return range must be the same size (if using row-wise).</li>
            <li>Forgetting that MATCH returns a position, not a value – correct usage: INDEX(..., MATCH(...)).</li>
            <li>Using MATCH with match_type = 1 (approximate) on unsorted data.</li>
            <li>In two‑way lookups, mixing up row MATCH and column MATCH.</li>
            <li>Not locking ranges with $ when copying the formula.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always use match_type = 0 (exact) unless you need approximate.</li>
            <li>Lock ranges with $ before copying (e.g., $A$2:$A$100).</li>
            <li>Use named ranges for clarity: =INDEX(PriceCol, MATCH(ProductID, IDCol, 0)).</li>
            <li>For two‑way lookups, use separate MATCH for rows and columns.</li>
            <li>Wrap with IFERROR to handle missing values: =IFERROR(INDEX(...), "Not found").</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “Why is INDEX-MATCH better than VLOOKUP when you add or delete columns? 
            Observe carefully: VLOOKUP uses a fixed column number (e.g., 4) that changes when columns shift. INDEX-MATCH uses MATCH to find the column by header – it always finds the right column.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use INDEX-MATCH for <strong>all</strong> lookups in professional workbooks – it's more robust.</li>
            <li>Create a dynamic named range for the lookup column using OFFSET or INDEX+COUNTA.</li>
            <li>For multiple criteria, use =INDEX(return, MATCH(1, (criteria1=range1)*(criteria2=range2), 0)) – array formula.</li>
            <li>In Excel 365, XLOOKUP replaces INDEX-MATCH, but INDEX-MATCH is still valuable for backwards compatibility.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))</li>
            <li>✅ Can look left or right – no restrictions.</li>
            <li>✅ Survives column insertions/deletions.</li>
            <li>✅ Two‑way lookup: two MATCHes (row + column).</li>
            <li>✅ Faster than VLOOKUP for large datasets.</li>
            <li>✅ Use IFERROR for missing values.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="INDEX-MATCH – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing a VLOOKUP that breaks after inserting a column. Then demonstrate INDEX-MATCH that still works. " +
            "Teach the mental model: MATCH finds the row number, then INDEX goes to that row in the return column. " +
            "Use the Excel sheet 'index_match_data' with a left‑lookup exercise (find ID from name). " +
            "Then move to two‑way lookups: a grade matrix where students select a name and subject, and INDEX-MATCH returns the mark. " +
            "Emphasise that INDEX-MATCH is the industry standard for robust Excel modelling."
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