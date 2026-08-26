"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic13_files/topic13_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic13() {
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

  // Static fallback comparison tables
  const StaticComparison = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">Feature</th><th className="px-3 py-2">VLOOKUP</th><th className="px-3 py-2">XLOOKUP</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <tr><td className="px-3 py-1">Lookup direction</td><td className="px-3 py-1">Only right</td><td className="px-3 py-1 text-green-300">Left or right</td></tr>
            <tr><td className="px-3 py-1">Column reference</td><td className="px-3 py-1">Hard-coded index number</td><td className="px-3 py-1 text-green-300">Direct column reference</td></tr>
            <tr><td className="px-3 py-1">Default match type</td><td className="px-3 py-1">Approximate (TRUE)</td><td className="px-3 py-1 text-green-300">Exact (0)</td></tr>
            <tr><td className="px-3 py-1">Error handling</td><td className="px-3 py-1">Needs IFERROR</td><td className="px-3 py-1 text-green-300">Built‑in 4th argument</td></tr>
            <tr><td className="px-3 py-1">Return multiple columns</td><td className="px-3 py-1">No</td><td className="px-3 py-1 text-green-300">Yes (spill)</td></tr>
            <tr><td className="px-3 py-1">Find last occurrence</td><td className="px-3 py-1">No</td><td className="px-3 py-1 text-green-300">Yes (search_mode = -1)</td></tr>
            <tr><td className="px-3 py-1">Availability</td><td className="px-3 py-1">All versions</td><td className="px-3 py-1">Excel 365, 2021+</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-mono text-sm">VLOOKUP: =VLOOKUP(E2, A2:D10, 4, FALSE)</p>
        <p className="font-mono text-sm">XLOOKUP: =XLOOKUP(E2, A2:A10, D2:D10, "Not found")</p>
        <p className="text-xs text-gray-400">XLOOKUP is shorter, more readable, and more robust.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            XLOOKUP vs VLOOKUP: The Ultimate Comparison
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            See why XLOOKUP is the modern replacement – side‑by‑side feature comparison and practical examples.
          </p>
        </header>

        {/* Side‑by‑Side Feature Table */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">⚖️ Feature Comparison</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-800">
                <tr><th className="px-4 py-2 text-left">Feature</th><th className="px-4 py-2">VLOOKUP</th><th className="px-4 py-2">XLOOKUP</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Look left</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Default exact match</td><td className="px-4 py-2 text-center">❌ (needs FALSE)</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Column index required</td><td className="px-4 py-2 text-center">❌ (hard to maintain)</td><td className="px-4 py-2 text-center text-green-400">✅ (direct column ref)</td></tr>
                <tr><td className="px-4 py-2">Built‑in error handling</td><td className="px-4 py-2 text-center">❌ (needs IFERROR)</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Return multiple columns</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Find last occurrence</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅</td></tr>
                <tr><td className="px-4 py-2">Wildcard match</td><td className="px-4 py-2 text-center">✅ (with FALSE)</td><td className="px-4 py-2 text-center">✅ (match_mode=2)</td></tr>
                <tr><td className="px-4 py-2">Binary search option</td><td className="px-4 py-2 text-center">❌</td><td className="px-4 py-2 text-center text-green-400">✅ (search_mode 2/‑2)</td></tr>
                <tr><td className="px-4 py-2">Horizontal data</td><td className="px-4 py-2 text-center">Requires HLOOKUP</td><td className="px-4 py-2 text-center text-green-400">✅ (works directly)</td></tr>
                <tr><td className="px-4 py-2">Excel version</td><td className="px-4 py-2">All versions</td><td className="px-4 py-2">Excel 365, 2021+</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Examples: Same Task – Different Code */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📝 Same Task, Different Code</h2>
          <div className="mt-4 space-y-6">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Task 1: Basic right lookup (find price from product ID)</p>
              <p className="font-mono text-sm text-red-300">VLOOKUP: =VLOOKUP(G2, A2:D100, 4, FALSE)</p>
              <p className="font-mono text-sm text-green-300">XLOOKUP: =XLOOKUP(G2, A2:A100, D2:D100)</p>
              <p className="text-xs text-gray-400">XLOOKUP is shorter and doesn't need a column index number.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Task 2: Left lookup (find ID from name)</p>
              <p className="font-mono text-sm text-red-300">VLOOKUP: =VLOOKUP(G2, CHOOSE({1,2}, B2:B100, A2:A100), 2, FALSE) (complex)</p>
              <p className="font-mono text-sm text-green-300">XLOOKUP: =XLOOKUP(G2, B2:B100, A2:A100)</p>
              <p className="text-xs text-gray-400">XLOOKUP handles left lookups naturally.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Task 3: Handle missing values</p>
              <p className="font-mono text-sm text-red-300">VLOOKUP: =IFERROR(VLOOKUP(G2, A2:D100, 4, FALSE), "Not found")</p>
              <p className="font-mono text-sm text-green-300">XLOOKUP: =XLOOKUP(G2, A2:A100, D2:D100, "Not found")</p>
              <p className="text-xs text-gray-400">XLOOKUP has built‑in error handling as the 4th argument.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-amber-300">Task 4: Return multiple columns</p>
              <p className="font-mono text-sm text-red-300">VLOOKUP: Need separate formulas for each column</p>
              <p className="font-mono text-sm text-green-300">XLOOKUP: =XLOOKUP(G2, A2:A100, B2:D100) spills all three columns</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Compare Live</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“xlookup_vlookup_comparison_data”</strong> contains identical tables for VLOOKUP and XLOOKUP practice. Try both and see the difference.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="xlookup_vlookup_comparison_data"
              title="VLOOKUP vs XLOOKUP – Side by Side"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet not available. Showing static comparison.
              </div>
              <StaticComparison />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the sheet, insert a new column between ID and Name. The VLOOKUP using col_index=4 will now return the wrong column; the XLOOKUP referencing column D directly still works.
          </p>
        </section>

        {/* When to Use Each */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">📌 When Should You Use Which?</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-red-300">Use VLOOKUP when:</p>
              <ul className="list-disc list-inside text-sm mt-1">
                <li>Your audience uses older Excel versions (pre‑2021).</li>
                <li>You need maximum backward compatibility.</li>
                <li>You are maintaining legacy workbooks.</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-semibold text-green-300">Use XLOOKUP when:</p>
              <ul className="list-disc list-inside text-sm mt-1">
                <li>Everyone has Excel 365 or 2021+.</li>
                <li>You are building new workbooks.</li>
                <li>You need left lookups, multiple columns, or built‑in error handling.</li>
                <li>You want simpler, more readable formulas.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls in the Transition</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Assuming XLOOKUP works in Excel 2019 – it doesn't. Check version compatibility.</li>
            <li>Using VLOOKUP out of habit when XLOOKUP would be simpler.</li>
            <li>Forgetting that XLOOKUP's default match is exact – no need for FALSE, but also no automatic approximate.</li>
            <li>Not using spill behavior correctly – ensure empty cells for returned arrays.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices for Choosing</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>For new workbooks in Office 365, use XLOOKUP exclusively.</li>
            <li>For shared workbooks, check the minimum Excel version of all users.</li>
            <li>Document which lookup function you use and why.</li>
            <li>When maintaining old workbooks, consider upgrading VLOOKUPs to XLOOKUPs gradually.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a workbook with 50 VLOOKUPs that break when columns are inserted. What would be the effort to convert them to XLOOKUP? 
            Observe carefully: With find‑and‑replace or a simple script, you can update them in minutes – and they will never break again.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Migration Strategy</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use =IFERROR(VLOOKUP(...), XLOOKUP(...)) to support both versions during transition.</li>
            <li>Create a VBA macro to convert all VLOOKUPs to XLOOKUPs in a workbook.</li>
            <li>Test XLOOKUP formulas in a copy of the workbook before deploying.</li>
            <li>Train your team on XLOOKUP to avoid reverting to old habits.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ XLOOKUP is only for Excel 365/2021+.</li>
            <li>✅ XLOOKUP can look left; VLOOKUP cannot.</li>
            <li>✅ XLOOKUP uses direct column references, no column index.</li>
            <li>✅ XLOOKUP has built‑in error handling (4th argument).</li>
            <li>✅ XLOOKUP can return multiple columns via spill.</li>
            <li>✅ Use XLOOKUP for new workbooks; VLOOKUP for compatibility.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="XLOOKUP vs VLOOKUP – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start with a live demonstration: write a VLOOKUP to get a price, then insert a column and watch it break. Then write an XLOOKUP to do the same task – it survives. " +
            "Then show a left lookup that VLOOKUP cannot do without CHOOSE, while XLOOKUP handles it naturally. " +
            "For the Excel sheet, include a column insertion challenge and a left lookup exercise. " +
            "Discuss version compatibility: if students work in companies with older Excel, they may still need VLOOKUP. But for their personal work, XLOOKUP is the future."
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