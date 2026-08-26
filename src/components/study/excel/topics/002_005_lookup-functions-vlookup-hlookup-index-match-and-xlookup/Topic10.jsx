"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic10_files/topic10_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic10() {
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

  // Static fallback examples for advantages
  const StaticAdvantagesExamples = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">A (ID)</th><th className="px-3 py-2">B (Name)</th><th className="px-3 py-2">C (Dept)</th><th className="px-3 py-2">D (Salary)</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-3 py-1">E101</td><td className="px-3 py-1">Swadeep</td><td className="px-3 py-1">IT</td><td className="px-3 py-1">75000</td></tr>
            <tr><td className="px-3 py-1">E102</td><td className="px-3 py-1">Tuhina</td><td className="px-3 py-1">HR</td><td className="px-3 py-1">68000</td></tr>
            <tr><td className="px-3 py-1">E103</td><td className="px-3 py-1">Abhronila</td><td className="px-3 py-1">Finance</td><td className="px-3 py-1">72000</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
        <p className="font-mono text-sm">✅ <strong>Left lookup:</strong> =INDEX(A2:A10, MATCH("Tuhina", B2:B10, 0))</p>
        <p className="text-xs text-gray-400">Returns "E102" – VLOOKUP cannot do this (lookup column B, return column A is left).</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
        <p className="font-mono text-sm">✅ <strong>Column‑safe (no hard‑coded index):</strong> =INDEX(D2:D10, MATCH("E102", A2:A10, 0))</p>
        <p className="text-xs text-gray-400">If you insert a new column between A and D, this formula still works.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
        <p className="font-mono text-sm">✅ <strong>Two‑way lookup:</strong> =INDEX(B2:E10, MATCH("Abhronila", A2:A10, 0), MATCH("Salary", B1:E1, 0))</p>
        <p className="text-xs text-gray-400">Dynamic row and column – no need to count columns.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Advantages of INDEX-MATCH over VLOOKUP
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Why professionals choose INDEX-MATCH for robust, flexible, and maintainable lookups.
          </p>
        </header>

        {/* Introduction */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🏆 Why INDEX-MATCH is the Industry Standard</h2>
          <p className="mt-2 text-gray-200">While VLOOKUP is easier to learn, INDEX-MATCH is more powerful and resilient. Professional Excel developers almost always prefer INDEX-MATCH for these 5 key advantages:</p>
        </section>

        {/* Advantage 1: Left Lookup */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h3 className="text-xl font-semibold text-emerald-300">1️⃣ Lookup to the Left</h3>
          <p className="mt-2 text-gray-200">VLOOKUP can only return values from columns to the <strong>right</strong> of the lookup column. INDEX-MATCH has no such restriction.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(ID_column, MATCH(name, name_column, 0))</p>
            <p className="text-xs text-gray-400 mt-1">Finds employee ID based on name – ID is left of name.</p>
          </div>
        </section>

        {/* Advantage 2: No Column Index */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h3 className="text-xl font-semibold text-emerald-300">2️⃣ No Hard‑Coded Column Index</h3>
          <p className="mt-2 text-gray-200">VLOOKUP requires a column number (e.g., 4). Inserting or deleting columns breaks it. INDEX-MATCH uses a direct column reference – it always finds the right column.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(Price_column, MATCH(product_id, ID_column, 0))</p>
            <p className="text-xs text-gray-400">Even if you insert a column between ID and Price, the formula still works.</p>
          </div>
        </section>

        {/* Advantage 3: Faster on Large Data */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h3 className="text-xl font-semibold text-emerald-300">3️⃣ Better Performance on Large Datasets</h3>
          <p className="mt-2 text-gray-200">VLOOKUP with exact match scans the entire first column. INDEX-MATCH can be optimised by limiting lookup and return ranges to specific columns, often resulting in 10–20% speed improvement.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX($C$2:$C$100000, MATCH($E2, $A$2:$A$100000, 0))</p>
            <p className="text-xs text-gray-400">Only two columns are scanned, not the entire table.</p>
          </div>
        </section>

        {/* Advantage 4: Two-Way Lookups */}
        <section ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h3 className="text-xl font-semibold text-emerald-300">4️⃣ Native Two‑Way Lookups (Matrix)</h3>
          <p className="mt-2 text-gray-200">VLOOKUP cannot easily find a value in a matrix where both row and column are dynamic. INDEX-MATCH handles this naturally with two MATCH functions.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(data_range, MATCH(row_value, row_labels, 0), MATCH(col_value, col_labels, 0))</p>
            <p className="text-xs text-gray-400">Find marks of "Abhronila" in "Science".</p>
          </div>
        </section>

        {/* Advantage 5: Column Insertion/Deletion Safe */}
        <section ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h3 className="text-xl font-semibold text-emerald-300">5️⃣ Survives Structural Changes</h3>
          <p className="mt-2 text-gray-200">If you add or delete columns, VLOOKUP's column index becomes wrong, causing #REF! or wrong data. INDEX-MATCH references columns by header or absolute reference – it adapts.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(Table1[Price], MATCH(E2, Table1[ProductID], 0))</p>
            <p className="text-xs text-gray-400">Using Excel Tables, the column reference "Price" never changes.</p>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[7] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Compare VLOOKUP vs INDEX-MATCH</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“index_match_advantages_data”</strong> contains an employee table and a grade matrix. Try breaking VLOOKUP by inserting a column, and see how INDEX-MATCH survives.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="index_match_advantages_data"
              title="INDEX-MATCH Advantages Demo"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “index_match_advantages_data” not available. Showing static examples.
              </div>
              <StaticAdvantagesExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> 1. Use VLOOKUP to get salary from ID. 2. Insert a new column between ID and Name. 3. VLOOKUP breaks; INDEX-MATCH still works. 4. Then try a left lookup: find ID from Name.
          </p>
        </section>

        {/* Quick Comparison Table */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">📊 Feature Comparison</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-800">
                <tr><th className="px-4 py-2 text-left">Feature</th><th className="px-4 py-2">VLOOKUP</th><th className="px-4 py-2">INDEX-MATCH</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Can look left</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Survives column insertions</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Two‑way (matrix) lookups</td><td className="px-4 py-2 text-center">❌ (requires complex workarounds)</td><td className="px-4 py-2 text-center text-green-400">✅ (native)</td></tr>
                <tr><td className="px-4 py-2">Performance on large data</td><td className="px-4 py-2 text-center">Slower (scans entire column)</td><td className="px-4 py-2 text-center text-green-400">Faster (can limit ranges)</td></tr>
                <tr><td className="px-4 py-2">Ease of learning</td><td className="px-4 py-2 text-center text-yellow-400">Easier</td><td className="px-4 py-2 text-center">Moderate</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls (Even with INDEX-MATCH)</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting to lock ranges with $ when copying formulas.</li>
            <li>Using MATCH with match_type = 1 on unsorted data.</li>
            <li>Mixing up row and column in two‑way lookups (row MATCH first, then column MATCH).</li>
            <li>Not handling #N/A with IFERROR.</li>
            <li>Over‑using whole column references (e.g., A:A) – slows down calculation.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices for INDEX-MATCH</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always lock ranges with $ (e.g., $A$2:$A$100).</li>
            <li>Use match_type = 0 (exact) for most lookups.</li>
            <li>Use Excel Tables for automatic absolute references and readability.</li>
            <li>Wrap in IFERROR to handle missing values: =IFERROR(INDEX(...), "Not found").</li>
            <li>For two‑way lookups, use named ranges for row_labels and col_labels.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You inherit a workbook with VLOOKUPs that keep breaking when people insert columns. How would you future‑proof it? 
            Observe carefully: Replacing each VLOOKUP with INDEX-MATCH using direct column references (not column numbers) will make the workbook immune to structural changes.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use =INDEX(Table1[Price], MATCH([@ProductID], Table1[ProductID], 0)) inside a Table – automatically absolute.</li>
            <li>For multiple criteria, use =INDEX(return, MATCH(1, (criteria1=range1)*(criteria2=range2), 0)).</li>
            <li>Combine INDEX-MATCH with data validation dropdowns to create interactive dashboards.</li>
            <li>In Excel 365, XLOOKUP is even simpler, but INDEX-MATCH is still valuable for backward compatibility.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ INDEX-MATCH can look left (VLOOKUP cannot).</li>
            <li>✅ No hard‑coded column index – survives insertions.</li>
            <li>✅ Faster on large datasets.</li>
            <li>✅ Native two‑way lookups.</li>
            <li>✅ Use $ to lock ranges.</li>
            <li>✅ Wrap with IFERROR for missing values.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="INDEX-MATCH Advantages – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Demonstrate the fragility of VLOOKUP by inserting a column in a live table and watching the VLOOKUP break. Then show the same operation with INDEX-MATCH – it still works. " +
            "Also show a left lookup: 'Find the ID of Tuhina'. Many students are surprised that VLOOKUP cannot do this. " +
            "For the Excel sheet, create an employee table and a separate grade matrix. Ask students to convert all VLOOKUPs in the sheet to INDEX-MATCH. " +
            "Emphasise that INDEX-MATCH is the professional choice for scalable, maintainable workbooks."
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