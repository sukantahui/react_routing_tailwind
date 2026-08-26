"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic2_files/topic2_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic2() {
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

  // Static fallback table for vlookup_data sheet
  const StaticVlookupTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P101</td><td>Laptop</td><td>Electronics</td><td>55000</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P102</td><td>Wireless Mouse</td><td>Accessories</td><td>1200</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P103</td><td>USB Keyboard</td><td>Accessories</td><td>800</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P104</td><td>Monitor 24"</td><td>Electronics</td><td>15000</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P105</td><td>SSD 512GB</td><td>Storage</td><td>4500</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-amber-300">
        💡 This is a sample reference table. In the real Excel sheet “vlookup_data”, you will have 50+ products to practice VLOOKUP.
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section transition-all duration-700 ease-out"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            VLOOKUP Syntax and Arguments
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Master the four arguments of VLOOKUP – the most essential lookup function in Excel.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-blue-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-blue-500">
            =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-blue-300">Return type:</strong> Any data type (number, text, date, etc.)</li>
            <li><strong className="text-blue-300">Purpose:</strong> Searches for a value in the first column of a table and returns a value in the same row from a column you specify.</li>
            <li><strong className="text-blue-300">When to use:</strong> Looking up prices, employee names, student grades, inventory details – whenever you need to match an ID to its associated data.</li>
          </ul>
        </section>

        {/* Detailed Explanation of Each Argument */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 Anatomy of VLOOKUP Arguments</h2>
          <div className="mt-4 space-y-5 text-gray-200">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-mono text-blue-300">1. lookup_value</p>
              <p className="text-sm mt-1">The value you want to search for (must be in the first column of the table_array). Can be a cell reference, number, text, or formula.</p>
              <p className="text-xs text-gray-400 mt-1">Example: <span className="font-mono">"P101"</span> or <span className="font-mono">A2</span></p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-mono text-blue-300">2. table_array</p>
              <p className="text-sm mt-1">The range of cells that contains the data. The lookup column must be the leftmost column of this range.</p>
              <p className="text-xs text-gray-400 mt-1">Example: <span className="font-mono">$A$2:$D$100</span> or named range <span className="font-mono">tblProducts</span></p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-mono text-blue-300">3. col_index_num</p>
              <p className="text-sm mt-1">The column number (starting from 1 as the first column of table_array) from which to return the value.</p>
              <p className="text-xs text-gray-400 mt-1">Example: <span className="font-mono">3</span> returns the third column of the table_array.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-mono text-blue-300">4. [range_lookup]</p>
              <p className="text-sm mt-1">Optional. <span className="font-mono">FALSE</span> (or 0) for exact match. <span className="font-mono">TRUE</span> (or 1 or omitted) for approximate match (requires sorted first column).</p>
              <p className="text-xs text-gray-400 mt-1">Example: <span className="font-mono">FALSE</span> or <span className="font-mono">0</span></p>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Barrackpore, a retail store has a product table (Product ID, Name, Category, Price). 
              The cashier enters a Product ID in cell <span className="font-mono">F2</span> and wants to automatically display the price.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-green-300">
                =VLOOKUP(F2, $A$2:$D$100, 4, FALSE)
              </pre>
              <p className="text-gray-300 text-sm mt-2">Explanation:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li><span className="font-mono">F2</span> = Product ID typed by cashier (lookup_value)</li>
                <li><span className="font-mono">$A$2:$D$100</span> = product table (table_array) – absolute references lock the range</li>
                <li><span className="font-mono">4</span> = column index for Price (fourth column of table)</li>
                <li><span className="font-mono">FALSE</span> = exact match – product ID must match exactly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-blue-500/20"
              >
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“vlookup_data”</strong> contains product data. Use the sheet selector to switch between multiple practice sheets.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="vlookup_data"
              title="VLOOKUP Practice – Product Database"
              rowsPerPage={25}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-4 text-sm">
                ⚠️ Excel file or sheet “vlookup_data” not available. Showing static preview below.
              </div>
              <StaticVlookupTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In the sheet, use =VLOOKUP("P103", A:D, 4, FALSE) → should return 800 (price of USB Keyboard).
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Lookup column is not the first column of table_array – VLOOKUP cannot look to the left.</li>
            <li>Forgetting to lock table_array with $ – when dragging formula, the range shifts.</li>
            <li>Using approximate match (TRUE/omitted) on unsorted data – returns wrong results silently.</li>
            <li>Column index number is greater than the number of columns in table_array – #REF! error.</li>
            <li>Mixing data types (number stored as text) – #N/A error.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always use absolute references for table_array (e.g., $A$2:$D$100) or convert to Excel Table.</li>
            <li>Always specify range_lookup = FALSE for exact matches unless you are certain about approximate.</li>
            <li>Use named ranges or Excel Tables for readability: =VLOOKUP(F2, tblProducts, 4, FALSE).</li>
            <li>Wrap VLOOKUP in IFERROR to handle missing values gracefully.</li>
            <li>For large datasets, consider INDEX-MATCH or XLOOKUP (faster and more flexible).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “What happens if you insert a new column between the lookup column and the return column? 
            Observe carefully: The col_index_num still points to the same column number, but the actual data shifts – you might get wrong data without error.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use MATCH to make col_index_num dynamic: =VLOOKUP(F2, A:D, MATCH("Price", A1:D1, 0), FALSE).</li>
            <li>Wildcards with exact match: =VLOOKUP("*"&F2&"*", table, 2, FALSE) for partial text search.</li>
            <li>For case‑sensitive lookups, use EXACT with INDEX-MATCH (VLOOKUP alone is not case‑sensitive).</li>
            <li>Use VLOOKUP with dropdown lists (Data Validation) to create interactive dashboards.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</li>
            <li>✅ lookup_value must be in the first column of table_array</li>
            <li>✅ Lock table_array with $</li>
            <li>✅ col_index_num counts from 1 (first column of table_array)</li>
            <li>✅ Use FALSE for exact match (most common)</li>
            <li>✅ Use IFERROR to handle #N/A</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="VLOOKUP Syntax & Arguments – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by writing a simple VLOOKUP on the board: =VLOOKUP(G2, A:C, 3, FALSE). Then break down each argument with examples. " +
            "Show the common error #N/A and explain why it happens (value not found, data type mismatch, or lookup column not first). " +
            "Also demonstrate the effect of forgetting $ when copying the formula down. " +
            "For the Excel sheet, ensure 'vlookup_data' contains at least 50 rows of product data (you already have that in 'lookup_reference_data' – just duplicate that sheet and rename it)."
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
          .reveal-section {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}