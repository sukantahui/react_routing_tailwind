"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic11_files/topic11_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic11() {
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

  // Static fallback for two‑way lookup example
  const StaticTwoWayTable = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2"></th><th className="px-3 py-2">Maths</th><th className="px-3 py-2">Science</th><th className="px-3 py-2">English</th></tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700"><td className="px-3 py-1 font-medium">Swadeep</td><td className="px-3 py-1">85</td><td className="px-3 py-1">90</td><td className="px-3 py-1">78</td></tr>
            <tr className="border-b border-gray-700"><td className="px-3 py-1 font-medium">Tuhina</td><td className="px-3 py-1">92</td><td className="px-3 py-1">88</td><td className="px-3 py-1">95</td></tr>
            <tr><td className="px-3 py-1 font-medium">Abhronila</td><td className="px-3 py-1">78</td><td className="px-3 py-1">82</td><td className="px-3 py-1">80</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-sky-500">
        <p className="font-mono text-sm">=INDEX(B2:D4, MATCH("Tuhina", A2:A4, 0), MATCH("Science", B1:D1, 0))</p>
        <p className="text-xs text-gray-400">Returns 88 – Tuhina's Science mark.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Two‑Way Lookup using INDEX-MATCH
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Find a value at the intersection of a dynamic row and dynamic column – the ultimate matrix lookup.
          </p>
        </header>

        {/* Concept */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🎯 What is a Two‑Way Lookup?</h2>
          <p className="mt-2 text-gray-200">A two‑way lookup searches for a value in a matrix (2D table) where both the <strong>row</strong> and the <strong>column</strong> are determined dynamically. For example: find the marks of a specific student in a specific subject.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(data_range, row_num, col_num)</p>
            <p className="text-xs text-gray-400">If you know the exact row and column numbers, INDEX alone works. But to find them dynamically, you need MATCH for both dimensions.</p>
          </div>
        </section>

        {/* Formula Structure */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📐 The Two‑Way INDEX-MATCH Formula</h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-sky-500">
            =INDEX(data_range, MATCH(row_value, row_labels, 0), MATCH(col_value, col_labels, 0))
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-sky-300">data_range</strong> – the matrix of values (excluding row and column headers)</li>
            <li><strong className="text-sky-300">MATCH(row_value, row_labels, 0)</strong> – finds the row position of the row header</li>
            <li><strong className="text-sky-300">MATCH(col_value, col_labels, 0)</strong> – finds the column position of the column header</li>
          </ul>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-sky-300">Example 1: Student Marks Matrix</p>
              <p className="text-sm">Find Susmita's History marks.</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(B2:E10, MATCH("Susmita", A2:A10, 0), MATCH("History", B1:E1, 0))</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-sky-300">Example 2: Sales by Product and Month</p>
              <p className="text-sm">Get sales of "Laptop" in "March".</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(B2:M20, MATCH("Laptop", A2:A20, 0), MATCH("Mar", B1:M1, 0))</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-sky-300">Example 3: Price Matrix (Product × Region)</p>
              <p className="text-sm">Find price of "Mouse" in "North" region.</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(B2:D10, MATCH("Mouse", A2:A10, 0), MATCH("North", B1:D1, 0))</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Two‑Way Lookup Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“two_way_lookup_data”</strong> contains a student marks matrix, sales matrix, and price matrix. Use dropdowns or direct cell references to build dynamic two‑way lookups.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="two_way_lookup_data"
              title="Two‑Way Lookup – Matrix Practice"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “two_way_lookup_data” not available. Showing static example.
              </div>
              <StaticTwoWayTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> Create a two‑way lookup that returns the mark for student "Debangshu" in subject "Physics". Then change the student or subject using dropdowns and watch the result update.
          </p>
        </section>

        {/* Building a Dashboard with Two‑Way Lookup */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">📊 Creating an Interactive Dashboard</h3>
          <p className="mt-2 text-gray-200">Two‑way lookups are perfect for dashboards. Combine with Data Validation dropdowns to let users select row and column values.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=INDEX(data_range, MATCH(selected_row, row_labels, 0), MATCH(selected_col, col_labels, 0))</p>
            <p className="text-xs text-gray-400">When users change the dropdown selections, the formula automatically returns the correct value.</p>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Wrong order:</strong> row MATCH first, then column MATCH – mixing them causes #VALUE! or wrong results.</li>
            <li><strong>Mismatched ranges:</strong> data_range, row_labels, and col_labels must align perfectly (same number of rows/columns).</li>
            <li><strong>Including headers in data_range:</strong> data_range should contain only the values, not the row/column headers.</li>
            <li><strong>Missing exact match (0):</strong> Using match_type = 1 on unsorted labels causes wrong results.</li>
            <li><strong>Not locking ranges with $</strong> – when copying, the ranges shift.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use named ranges for data_range, row_labels, and col_labels for readability.</li>
            <li>Always use match_type = 0 (exact) for row and column labels.</li>
            <li>Lock all ranges with $ (e.g., $A$2:$A$10) before copying.</li>
            <li>Use Excel Tables for dynamic ranges that auto‑expand.</li>
            <li>Wrap the entire formula in IFERROR to handle missing combinations.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “What happens if you accidentally swap the two MATCH functions? 
            Observe carefully: =INDEX(data, MATCH(col_value, row_labels, 0), MATCH(row_value, col_labels, 0)) will try to find a column header in the row labels – it will almost certainly return #N/A.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use data validation lists for row and column selectors – creates a professional dashboard.</li>
            <li>For large matrices, consider using XLOOKUP (Excel 365): =XLOOKUP(row_value, row_labels, XLOOKUP(col_value, col_labels, data_range)).</li>
            <li>Combine two‑way lookup with conditional formatting to highlight the found cell.</li>
            <li>Use the same technique for 3D lookups by adding a third MATCH for sheet selection (requires INDIRECT).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Formula: =INDEX(data, MATCH(row_val, row_labels, 0), MATCH(col_val, col_labels, 0))</li>
            <li>✅ data_range excludes headers</li>
            <li>✅ row_labels and col_labels must be 1D ranges</li>
            <li>✅ Always use match_type = 0 for exact match</li>
            <li>✅ Lock all ranges with $</li>
            <li>✅ Wrap with IFERROR for missing combinations</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Two‑Way Lookup with INDEX-MATCH – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start with a simple grade matrix (students vs subjects). Walk through each part of the formula: first MATCH finds the student's row, second MATCH finds the subject's column, then INDEX retrieves the intersection. " +
            "Then introduce data validation dropdowns so students can select any student and subject. This builds an interactive dashboard in minutes. " +
            "For the Excel sheet 'two_way_lookup_data', include at least three matrices: (1) student marks, (2) sales by product/month, (3) price by product/region. " +
            "Ask students to build a two‑way lookup for each matrix, then add dropdowns."
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