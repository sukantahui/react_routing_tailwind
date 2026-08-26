"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic1_files/topic1_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic1() {
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

  // Static fallback table for unique_ids_data
  const StaticUniqueDataTable = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-xs uppercase font-medium">
          <tr>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P101</td><td className="px-4 py-2">Laptop</td><td className="px-4 py-2">55000</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P102</td><td className="px-4 py-2">Wireless Mouse</td><td className="px-4 py-2">1200</td></tr>
          <tr className="border-b border-gray-700 bg-red-900/30"><td className="px-4 py-2 font-bold text-red-300">P101</td><td className="px-4 py-2">Gaming Laptop</td><td className="px-4 py-2">85000</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P103</td><td className="px-4 py-2">USB Keyboard</td><td className="px-4 py-2">800</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P104</td><td className="px-4 py-2">Monitor 24"</td><td className="px-4 py-2">15000</td></tr>
          <tr className="border-b border-gray-700 bg-red-900/30"><td className="px-4 py-2 font-bold text-red-300">P102</td><td className="px-4 py-2">Bluetooth Mouse</td><td className="px-4 py-2">1800</td></tr>
          <tr className="border-b border-gray-700"><td className="px-4 py-2">P105</td><td className="px-4 py-2">SSD 512GB</td><td className="px-4 py-2">4500</td></tr>
        </tbody>
      </table>
      <div className="bg-gray-800/50 p-2 text-xs text-yellow-300">
        ⚠️ Duplicate Product IDs: P101 and P102 appear twice. VLOOKUP returns the FIRST match only (₹55,000 and ₹1,200).
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
        &gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Importance of Unique IDs and Keys
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Why every row in a reference table needs a unique identifier – and how to avoid the chaos of duplicates.
          </p>
        </header>

        {/* Concept Prototype */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
        &gt;
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-emerald-400">🔑</span> What is a Unique Key?
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-emerald-500">
            UNIQUE KEY : a column (or combination of columns) that has a different value for every row.
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-emerald-300">Purpose:</strong> Allows a lookup function to find exactly one matching row – no ambiguity.</li>
            <li><strong className="text-emerald-300">Return type:</strong> Not a function, but a property of well‑structured data.</li>
            <li><strong className="text-emerald-300">When & Why:</strong> Used in every database, table, or list that must be queried reliably. Without it, lookups return the first match (often wrong).</li>
          </ul>
        </section>

        {/* Detailed Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        &gt;
          <h2 className="text-2xl font-semibold">🧠 Why Uniqueness Matters</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              When you perform a lookup (e.g., VLOOKUP), Excel scans the first column from top to bottom and stops at the <strong>first match</strong>.
              If two rows share the same lookup value, the second row is never seen. This leads to incorrect data being returned without any error message.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="font-mono text-sm">✅ <span className="text-green-300">Unique ID: PROD-101 → Laptop, PROD-102 → Mouse</span> → lookup works correctly.</p>
              <p className="font-mono text-sm mt-1">⚠️ <span className="text-yellow-300">Duplicate ID: P101 → Laptop, P101 → Gaming Laptop</span> → VLOOKUP("P101", ...) returns only Laptop.</p>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        &gt;
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Barrackpore, a school database uses roll numbers to look up student names. Two students accidentally get the same roll number `101`.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Roll No</th><th className="border px-3 py-2">Student Name</th><th className="border px-3 py-2">Marks</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">101</td><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr className="bg-red-900/30"><td className="border px-3 py-1 font-bold text-red-300">101</td><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">102</td><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">78</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-emerald-300">=VLOOKUP(101, A:C, 3, FALSE) → returns 85 (Swadeep's marks), never sees Tuhina.</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        &gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Spot the Duplicates</h2>
            {sampleDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-emerald-500/20"
              >
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“unique_ids_data”</strong> from <code>lookup_functions.xlsx</code> contains duplicate product IDs. Try using VLOOKUP and see the problem.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>


          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="unique_ids_data"
              title="Product Master – Duplicate IDs Example"
              rowsPerPage={15} showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-4 text-sm">
                ⚠️ Excel file or sheet “unique_ids_data” not available. Showing static preview below.
              </div>
              <StaticUniqueDataTable />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In your mind, look up “P101” – the first product is Laptop (₹55,000). The duplicate “Gaming Laptop” (₹85,000) is ignored. This is why unique keys are critical.
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Using names or cities as keys – they are rarely unique.</li>
            <li>Mixing data types: “101” (text) and 101 (number) are not equal, causing hidden duplicates.</li>
            <li>Leading/trailing spaces: “P101” vs “P101 ” – use TRIM().</li>
            <li>Assuming Excel prevents duplicates – it does not.</li>
            <li>Forgetting to remove duplicates before performing lookups.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Always add a dedicated ID column (e.g., StudentID, ProductCode).</li>
            <li>Use Data Validation with formula =COUNTIF($A$2:$A$100, A2)=1 to block new duplicates.</li>
            <li>Create composite keys when no single column is unique: =A2&"-"&B2.</li>
            <li>Use Excel's “Remove Duplicates” tool (Data tab) to clean existing data.</li>
            <li>Before a critical lookup, test for duplicates with =COUNTIF(range, lookup_value)&gt;1.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If your school has two students named ‘Rahul’, how would you tell them apart in a gradebook?<br />
            Observe carefully: Adding a roll number or a middle initial creates a unique key. In the table above, what would happen if we used Product Name as the lookup key? (Two different products could have the same name – unlikely, but possible.)”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use Conditional Formatting → Highlight Duplicates to visually identify problem rows.</li>
            <li>For large datasets, use Power Query to remove duplicates and enforce uniqueness.</li>
            <li>In Excel Tables, you can add a calculated column =COUNTIF([ID], [@ID]) to flag duplicates.</li>
            <li>When importing data, always check for duplicate keys before building reports.</li>
            <li>Use =UNIQUE(range) to extract unique values and see which ones repeat.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Unique key = one row per value.</li>
            <li>✅ Duplicate keys cause VLOOKUP to return first match only – silently wrong.</li>
            <li>✅ Use numeric IDs, not names or cities.</li>
            <li>✅ Data Validation blocks new duplicates.</li>
            <li>✅ Composite keys combine columns.</li>
            <li>✅ Remove Duplicates tool cleans existing data.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Unique IDs & Keys – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing the static table (or Excel sheet) and ask: 'If I VLOOKUP P101, which price will I get?' Most students will answer ₹85,000 – then reveal the correct answer is ₹55,000. This creates a strong 'aha' moment about duplicates. Then demonstrate how to create a composite key using =A2&'-'&B2 when no single column is unique. Remind them that data integrity begins with unique identifiers."
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