"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic4_files/topic4_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic4() {
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

  // Static fallback table for absolute references demo
  const StaticProductTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr><th className="px-4 py-2">Product ID</th><th className="px-4 py-2">Product Name</th><th className="px-4 py-2">Price (₹)</th></tr>
        </thead>
        <tbody>
          <tr><td className="px-4 py-2">P101</td><td>Laptop</td><td>55000</td></tr>
          <tr><td className="px-4 py-2">P102</td><td>Mouse</td><td>1200</td></tr>
          <tr><td className="px-4 py-2">P103</td><td>Keyboard</td><td>800</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-cyan-300">
        💡 Try dragging formulas: =VLOOKUP(G2, <span className="bg-gray-900 px-1 rounded">$A$2:$C$10</span>, 3, FALSE) stays locked.
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Using Absolute References ($) in Lookups
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Lock your table array so VLOOKUP works correctly when copied – avoid shifting ranges and #REF! errors.
          </p>
        </header>

        {/* Concept: Absolute vs Relative */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🔒 What Are Absolute References?</h2>
          <div className="mt-4 space-y-4">
            <p>In Excel, <strong className="text-cyan-300">absolute references</strong> (e.g., <span className="font-mono">$A$2:$D$100</span>) do not change when you copy or drag a formula. <strong className="text-cyan-300">Relative references</strong> (e.g., <span className="font-mono">A2:D100</span>) adjust based on the new position.</p>
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-cyan-500">
              <p className="font-mono text-sm">💰 Without $ : =VLOOKUP(G2, A2:D100, 4, FALSE)</p>
              <p className="font-mono text-sm mt-1">🔒 With $ : =VLOOKUP(G2, $A$2:$D$100, 4, FALSE)</p>
            </div>
            <p>When you drag the formula down, the first version shifts to <span className="font-mono">A3:D101</span>, <span className="font-mono">A4:D102</span>… eventually losing data. The second version always points to the exact same table.</p>
          </div>
        </section>

        {/* Why it matters – example */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🧠 Why This is Critical for VLOOKUP</h2>
          <div className="mt-4 space-y-4">
            <p>Imagine you have a product table from A2 to D100. You write a VLOOKUP in cell E2:</p>
            <code className="block bg-gray-900 p-2 rounded text-sm">=VLOOKUP(A2, A2:D100, 4, FALSE)</code>
            <p>Now you drag this formula down to E3. Excel changes the table array to <span className="font-mono">A3:D101</span>. The first row of the table (A2) is no longer included – some lookups will fail or return wrong data.</p>
            <div className="bg-red-900/30 p-3 rounded border-l-4 border-red-500">
              ⚠️ <strong>Common mistake:</strong> Forgetting to lock the table array is the #1 error when copying VLOOKUP across hundreds of rows.
            </div>
            <p><strong>Solution:</strong> Use absolute references: <span className="font-mono">$A$2:$D$100</span>. Now the range stays fixed, and each lookup searches the correct table.</p>
          </div>
        </section>

        {/* Real‑world scenario */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Barrackpore, a school has a student master sheet (columns A–D). The teacher wants to fetch marks for each student listed in column G using a single formula copied down.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg">
              <p className="font-mono text-green-300">=VLOOKUP(G2, $A$2:$D$500, 4, FALSE)</p>
              <p className="text-sm text-gray-300 mt-2">Dragging this formula down from H2 to H500 – the lookup table <span className="font-mono">$A$2:$D$500</span> never moves, so each row correctly finds the marks based on the roll number in column G.</p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“absolute_ref_data”</strong> contains a product list. Column A has product IDs, column B names, column C prices. Practice dragging a VLOOKUP with and without $.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="absolute_ref_data"
              title="Absolute References Demo – Product Table"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “absolute_ref_data” not available. Showing static example below.
              </div>
              <StaticProductTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the Excel sheet, write =VLOOKUP(E2, A:C, 3, FALSE) (without $) and drag down. Then change to =VLOOKUP(E2, $A$2:$C$100, 3, FALSE) and drag again – observe the difference in the formula bar.
          </p>
        </section>

        {/* How to type $ quickly */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">⌨️ Keyboard Shortcut for Absolute References</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Select the cell reference inside the formula (e.g., A2).</li>
            <li>Press <span className="bg-gray-900 px-2 py-1 rounded font-mono">F4</span> (Windows) or <span className="bg-gray-900 px-2 py-1 rounded font-mono">Cmd + T</span> (Mac).</li>
            <li>Cycles through: <span className="font-mono">A2</span> → <span className="font-mono">$A$2</span> → <span className="font-mono">A$2</span> → <span className="font-mono">$A2</span> → back to <span className="font-mono">A2</span>.</li>
          </ul>
          <p className="text-sm text-gray-300 mt-2">For VLOOKUP, you almost always want <span className="font-mono">$A$2:$D$100</span> (both row and column locked).</p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting to lock the table array – results in #REF! or wrong values after dragging.</li>
            <li>Locking only the row (<span className="font-mono">A$2</span>) or only the column (<span className="font-mono">$A2</span>) – usually not enough; both need to be absolute.</li>
            <li>Using absolute references on the lookup_value – that would always point to the same cell, which is rarely intended.</li>
            <li>Not using absolute references for named ranges – named ranges are automatically absolute, but if you use a hard‑coded range, you need $.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always lock the entire table_array with <span className="font-mono">$A$2:$Z$1000</span> when writing a VLOOKUP that will be copied.</li>
            <li>Consider using Excel Tables – then you can write <span className="font-mono">Table1[#All]</span>, which is automatically absolute.</li>
            <li>Use named ranges for clarity: <span className="font-mono">=VLOOKUP(A2, Products, 4, FALSE)</span> – Products is absolute by default.</li>
            <li>Before dragging a formula, test it on one row, then examine the formula bar after dragging to ensure the range hasn’t shifted.</li>
            <li>Use <span className="font-mono">F4</span> to toggle references quickly while editing.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “If you have a VLOOKUP that works perfectly in row 2 but returns #N/A in row 100, what is the most likely cause? 
            Observe carefully: The table_array probably shifted down because you forgot to lock it with $.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Before copying a formula, convert your range to an Excel Table (Ctrl+T). Then the formula automatically uses structured references that don’t shift.</li>
            <li>Use the <span className="font-mono">F4</span> key while the cursor is inside a range reference to quickly add/remove $.</li>
            <li>Combine <span className="font-mono">$</span> with named ranges for maximum readability: <span className="font-mono">=VLOOKUP(A2, $B$2:$D$100, 3, FALSE)</span> vs <span className="font-mono">=VLOOKUP(A2, Products, 3, FALSE)</span>.</li>
            <li>If you often forget $, develop the habit of pressing F4 immediately after typing the range.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ $A$1 locks both column and row.</li>
            <li>✅ Always lock the table_array when copying VLOOKUP.</li>
            <li>✅ Use F4 to toggle absolute references.</li>
            <li>✅ Excel Tables (Ctrl+T) avoid the problem entirely.</li>
            <li>✅ Test a few rows before mass copying.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Absolute References in Lookups – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing a VLOOKUP without $ and drag it down – watch the table_array shift in the formula bar. Then add $ and drag again – the range stays fixed. " +
            "This simple demonstration is unforgettable. Also show the F4 shortcut. " +
            "For the Excel sheet 'absolute_ref_data', create a small product table (A:C) and in column E list some product IDs. " +
            "Ask students to write a VLOOKUP that pulls the price, then copy it down. " +
            "Emphasise that even experienced professionals occasionally forget $ – it's the #1 source of VLOOKUP bugs."
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