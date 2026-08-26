"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic8_files/topic8_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic8() {
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

  // Static fallback examples for INDEX
  const StaticIndexExamples = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800">
            <tr><th className="px-3 py-2">A</th><th className="px-3 py-2">B</th><th className="px-3 py-2">C</th><th className="px-3 py-2">D</th></tr>
          </thead>
          <tbody>
            <tr><td className="px-3 py-1">Product ID</td><td className="px-3 py-1">Product Name</td><td className="px-3 py-1">Category</td><td className="px-3 py-1">Price</td></tr>
            <tr><td className="px-3 py-1">P101</td><td className="px-3 py-1">Laptop</td><td className="px-3 py-1">Electronics</td><td className="px-3 py-1">55000</td></tr>
            <tr><td className="px-3 py-1">P102</td><td className="px-3 py-1">Mouse</td><td className="px-3 py-1">Accessories</td><td className="px-3 py-1">1200</td></tr>
            <tr><td className="px-3 py-1">P103</td><td className="px-3 py-1">Keyboard</td><td className="px-3 py-1">Accessories</td><td className="px-3 py-1">800</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-rose-500">
        <p className="font-mono text-sm">=INDEX(B2:D4, 2, 3) → returns 1200 (row 2, column 3 of the range)</p>
        <p className="font-mono text-sm mt-1">=INDEX(C:C, 3) → returns "Accessories" (3rd row of column C)</p>
        <p className="font-mono text-sm mt-1">=INDEX(A2:A4, MATCH("Mouse", B2:B4, 0)) → returns "P102" (left lookup)</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
            INDEX Function Basics
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Return the value at a specific position in a range – the foundation of advanced lookups.
          </p>
        </header>

        {/* Function Prototype */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-rose-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-rose-500">
            =INDEX(array, row_num, [column_num])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-rose-300">Return type:</strong> Any data type (value at the intersection of row and column).</li>
            <li><strong className="text-rose-300">Purpose:</strong> Returns the value of a cell at a given row and column offset within a range.</li>
            <li><strong className="text-rose-300">When to use:</strong> Extracting specific cells, creating dynamic ranges, combining with MATCH for flexible lookups, building dependent dropdowns.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 INDEX can also return a whole row or column (if row_num=0 or column_num=0) – useful for array formulas.
          </div>
        </section>

        {/* Two Forms of INDEX */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📌 INDEX Has Two Forms</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-blue-500">
              <p className="font-mono font-bold">Array Form (most common)</p>
              <p className="text-sm">=INDEX(array, row_num, [column_num])</p>
              <p className="text-xs text-gray-400">Returns the value at the intersection of a specific row and column within a 2D range.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-green-500">
              <p className="font-mono font-bold">Reference Form</p>
              <p className="text-sm">=INDEX(reference, row_num, [column_num], [area_num])</p>
              <p className="text-xs text-gray-400">Returns a reference to a cell (used with non‑contiguous ranges). Rarely needed.</p>
            </div>
          </div>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-rose-300">Example 1: Extract a specific cell from a table</p>
              <p className="text-sm">From a product table (A2:D10), get the price of the 3rd product.</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(D2:D10, 3) → returns price from row 3 of column D.</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-rose-300">Example 2: Two‑dimensional lookup (row and column)</p>
              <p className="text-sm">Find the value at row 4, column 2 in a range.</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(A2:D10, 4, 2) → returns value at intersection of 4th row and 2nd column of A2:D10.</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-rose-300">Example 3: Return an entire column (array formula)</p>
              <p className="text-sm">Get all product names (dynamic spill in Excel 365).</p>
              <code className="block text-sm text-green-300 mt-1">=INDEX(B2:B10, 0, 1) or simply =B2:B10 – but INDEX can be used within other functions.</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: INDEX Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“index_data”</strong> contains product data, student marks, and a multiplication table. Practice using INDEX with hard‑coded row/column numbers.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="index_data"
              title="INDEX Function – Extract Values"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “index_data” not available. Showing static examples.
              </div>
              <StaticIndexExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> =INDEX(B2:D10, 5, 2) – what does it return? Then try =INDEX(D:D, 8) – returns the 8th value in column D.
          </p>
        </section>

        {/* INDEX with MATCH Preview */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">🔗 INDEX + MATCH = Powerful Lookup</h3>
          <p className="mt-2">Instead of hard‑coding row and column numbers, use MATCH to find them dynamically.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <code className="text-sm text-green-300">=INDEX(return_range, MATCH(lookup_value, lookup_range, 0), MATCH(column_header, header_row, 0))</code>
            <p className="text-xs text-gray-400 mt-1">This creates a flexible two‑way lookup that survives column insertions.</p>
          </div>
          <p className="mt-2 text-sm text-gray-300">(We'll cover INDEX-MATCH in detail in the next topic.)</p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting that row_num and column_num are relative to the array, not absolute sheet row numbers.</li>
            <li>Using row_num = 0 – returns the entire column (only works in array formulas).</li>
            <li>Supplying a row_num greater than the number of rows in the array → #REF! error.</li>
            <li>Confusing INDEX with MATCH – INDEX returns a value, MATCH returns a position.</li>
            <li>INDEX does not work like VLOOKUP; it needs a separate function to find the row.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use INDEX to return a value from a specific position when you know the row and column numbers.</li>
            <li>Combine INDEX with MATCH for flexible lookups that can replace VLOOKUP.</li>
            <li>Use named ranges in INDEX for clarity: =INDEX(ProductPrices, 5, 2).</li>
            <li>For dynamic ranges, use INDEX with COUNTA: =INDEX(A:A, COUNTA(A:A)).</li>
            <li>In Excel 365, INDEX can spill arrays when row_num or column_num is 0.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “If you have a range A2:C10 (9 rows, 3 columns) and you write =INDEX(A2:C10, 9, 3), which cell does it return? 
            Observe carefully: It's the intersection of the 9th row (A10) and 3rd column (C) – that's cell C10.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use INDEX to create a dynamic named range: =OFFSET(Sheet1!$A$2,0,0,COUNTA(Sheet1!$A:$A)-1,1) can be replaced by INDEX.</li>
            <li>INDEX with 0 row_num returns the entire column as a range: =INDEX(A:A, 0, 1) – useful in other functions.</li>
            <li>Use INDEX to extract the last value in a column: =INDEX(C:C, COUNTA(C:C)).</li>
            <li>INDEX is non‑volatile (unlike OFFSET) – better for large workbooks.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =INDEX(array, row_num, [column_num])</li>
            <li>✅ Returns value at (row, column) within array.</li>
            <li>✅ Row and column numbers are 1‑based (first row = 1).</li>
            <li>✅ Use with MATCH for dynamic lookups.</li>
            <li>✅ #REF! if row/column out of bounds.</li>
            <li>✅ Non‑volatile and faster than OFFSET.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="INDEX Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing a simple grid (e.g., 3×3 multiplication table). Ask students to use INDEX to retrieve the value at row 2, column 3. " +
            "Then show how INDEX alone is not a lookup – it needs MATCH to find the row. " +
            "Emphasise that INDEX is the key to flexible lookups (will be fully explored in Topic9). " +
            "For the Excel sheet 'index_data', include a product table (A:D), a student marks grid (rows: subjects, columns: students), and a multiplication table (1-10). " +
            "Ask students to practice extracting various cells using hard‑coded coordinates."
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