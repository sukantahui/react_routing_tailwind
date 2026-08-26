"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleMinDataUrl from "./excel_files/statistical_functions.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
  const sectionsRef = useRef([]);

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
    if (!sampleMinDataUrl) return;
    const link = document.createElement("a");
    link.href = sampleMinDataUrl;
    link.download = "lookup_functions.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lookupSteps = [
    "Identify the lookup value (unique ID or key)",
    "Define the reference table range (where data is stored)",
    "Specify the column number to return the matching data",
    "Choose match type (exact or approximate)",
    "Retrieve result based on matching key"
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section transition-all duration-700 ease-out"
        &gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Understanding Lookup Functions & Reference Tables
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Master how to retrieve data intelligently from structured tables — the backbone of data analysis.
          </p>
        </header>

        {/* Conceptual Explanation */}
        <div className="grid md:grid-cols-2 gap-6">
          <section
            ref={(el) => (sectionsRef.current[1] = el)}
            className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
          &gt;
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="text-blue-400">🔍</span> What are Lookup Functions?
            </h2>
            <p className="mt-3 text-gray-200 leading-relaxed">
              A <strong className="text-blue-400">lookup function</strong> searches for a specific value inside a reference table
              and returns a corresponding result from another column. Think of it like a smart dictionary:
              you give it a word (lookup value), and it finds the definition (result).
            </p>
            <div className="mt-4 bg-gray-900 rounded-lg p-3 border-l-4 border-blue-500">
              <span className="font-mono text-sm">📌 Prototype (generic):</span>
              <code className="block mt-1 font-mono text-sm">
                LOOKUP( lookup_value , table_array , return_column_index )
              </code>
              <p className="text-sm mt-2"><strong>Return type:</strong> Any data type (number, text, date, etc.)</p>
              <p className="text-sm"><strong>Purpose:</strong> Retrieve data without manual searching — automates cross-referencing.</p>
              <p className="text-sm"><strong>When & Why:</strong> Used in gradebooks, inventory systems, billing, employee records — anytime you need to match IDs to details.</p>
            </div>
          </section>

          <section
            ref={(el) => (sectionsRef.current[2] = el)}
            className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300"
          &gt;
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="text-green-400">📊</span> Reference Tables Explained
            </h2>
            <p className="mt-3 text-gray-200 leading-relaxed">
              A <strong className="text-green-400">reference table</strong> is a structured dataset where each row represents a unique record,
              and the first column (or key column) contains unique identifiers. Examples: student ID → name, product code → price, employee ID → department.
            </p>
            <div className="mt-4 bg-gray-900 rounded-lg p-3 border-l-4 border-green-500">
              <p className="font-semibold">✨ Key properties:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-gray-200">
                <li>First column = lookup column (must contain unique/searchable values)</li>
                <li>Other columns = related attributes</li>
                <li>Static or dynamic range (often named as Excel Table)</li>
              </ul>
            </div>
          </section>
        </div>

        {/* SVG Animated Lookup Flow */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        &gt;
          <h3 className="text-xl font-semibold text-center mb-6">🔄 How a Lookup Navigates a Reference Table</h3>
          <div className="flex justify-center">
            <svg width="500" height="200" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect x="20" y="60" width="120" height="70" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="80" y="90" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Lookup Value</text>
              <text x="80" y="110" textAnchor="middle" fill="#e5e7eb" fontSize="12">"STU-101"</text>
              
              <line x1="140" y1="95" x2="200" y2="95" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.8s" repeatCount="indefinite" />
              </line>
              <polygon points="200,90 215,95 200,100" fill="#f97316" />

              <rect x="220" y="40" width="240" height="110" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
              <text x="340" y="62" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">Reference Table</text>
              <line x1="235" y1="72" x2="445" y2="72" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2" />
              <text x="270" y="90" fill="#e5e7eb" fontSize="11">STU-101 → Swadeep</text>
              <text x="270" y="108" fill="#e5e7eb" fontSize="11">STU-102 → Tuhina</text>
              <text x="270" y="126" fill="#e5e7eb" fontSize="11">STU-103 → Abhronila</text>
              
              <line x1="460" y1="95" x2="480" y2="95" stroke="#f97316" strokeWidth="2">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x="485" y="90" fill="#f97316" fontSize="11" fontWeight="bold">Result</text>
              <rect x="462" y="110" width="30" height="20" rx="4" fill="#f97316" fillOpacity="0.2" stroke="#f97316" />
              <text x="477" y="124" textAnchor="middle" fill="#f97316" fontSize="10">Swadeep</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">The lookup value acts as a key to locate the matching row in the reference table</p>
        </section>

        {/* Steps with staggered hover cards */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section"
        &gt;
          <h2 className="text-2xl font-bold mb-6 text-center">🧠 The Lookup Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lookupSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div className="text-2xl font-bold text-blue-400 mb-2">0{idx + 1}</div>
                <p className="font-medium text-gray-200">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real-world usage & tips - two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          <section
            ref={(el) => (sectionsRef.current[5] = el)}
            className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
          &gt;
            <h3 className="text-xl font-semibold text-blue-300">🏫 Real‑world Scenarios</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>School gradebook:</strong> Lookup student name (Swadeep, Tuhina) using roll numbers from master table.</li>
              <li><strong>Barrackpore inventory:</strong> Product ID → Price & stock status.</li>
              <li><strong>Employee directory:</strong> Email → Department, manager name.</li>
              <li><strong>Sales report:</strong> Order ID → Customer city (Ichapur, Shyamnagar, Naihati).</li>
            </ul>
            <div className="mt-4 text-sm bg-blue-950/30 p-3 rounded border border-blue-800">
              💡 <span className="font-semibold">Pro tip:</span> Always convert your reference table into an Excel Table (Ctrl+T) — ranges auto-expand.
            </div>
          </section>

          <section
            ref={(el) => (sectionsRef.current[6] = el)}
            className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all"
          &gt;
            <h3 className="text-xl font-semibold text-green-300">🧰 Professional Tips & Tricks</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Name your table:</strong> Use descriptive names like “tblStudents” to avoid cell range chaos.</li>
              <li><strong>Absolute references:</strong> Lock table array with <code className="bg-gray-900 px-1 rounded">$A$2:$D$100</code> before dragging formulas.</li>
              <li><strong>Sorted data?</strong> For approximate match (grades, tax brackets) keep lookup column ascending.</li>
              <li><strong>Error handling:</strong> Wrap lookups in <code className="bg-gray-900 px-1 rounded">IFERROR</code> to show custom messages.</li>
            </ul>
          </section>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-6">
          <section
            ref={(el) => (sectionsRef.current[7] = el)}
            className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all"
          &gt;
            <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
              <li><strong>Moving target:</strong> Inserting/deleting columns breaks column index numbers.</li>
              <li><strong>Unsorted approximate match:</strong> Returns wrong or #N/A error.</li>
              <li><strong>Extra spaces:</strong> Lookup value “STU-101” vs “STU-101 ” — use TRIM().</li>
              <li><strong>Wrong data type:</strong> Numbers stored as text → mismatch → #N/A.</li>
              <li><strong>Forgetting $ signs:</strong> Dragging formula shifts table array → errors.</li>
            </ul>
          </section>

          <section
            ref={(el) => (sectionsRef.current[8] = el)}
            className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all"
          &gt;
            <h3 className="text-xl font-semibold text-green-300">✅ Best Practices Checklist</h3>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
              <li>✅ Use structured references (Excel Tables) instead of A1 ranges.</li>
              <li>✅ Always define match type explicitly (0/FALSE for exact match).</li>
              <li>✅ Store reference tables on a separate worksheet.</li>
              <li>✅ Document the lookup column and return column in comments.</li>
              <li>✅ For large datasets, prefer INDEX-MATCH or XLOOKUP (upcoming topics).</li>
            </ul>
          </section>
        </div>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5"
        &gt;
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “What happens if the lookup value appears twice in the reference table? (Hint: Most lookup functions return the first match only — data uniqueness matters!)<br />
            Observe carefully: Try changing the reference table order – does VLOOKUP still find the correct data?”
          </p>
        </section>

        {/* Interactive Excel Demo with Download Button */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        &gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example: Lookup in Action</h2>
            {sampleMinDataUrl && (
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-blue-500/20"
              >
                ⬇️ Download Sample Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The worksheet below is loaded from <code className="bg-gray-900 px-1 rounded">lookup_functions.xlsx</code> – sheet: <strong>lookup_reference_data</strong>.
            {!sampleMinDataUrl && <span className="text-yellow-300"> (File not found – please create it)</span>}
          </p>
          {sampleMinDataUrl ? (
            <ExcelFileLoader
              fileModule={sampleMinDataUrl}   // ✅ direct URL string
              sheetName="lookup_reference_data"
              title="Reference Table: Products & Prices"
              rowsPerPage={25}
              showSheetSelector={true}
            />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">
                To practice, create a file named <code className="bg-gray-800 px-1 rounded">lookup_functions.xlsx</code> in the folder:
                <br /><code className="bg-gray-800 px-1 rounded">src/components/topics/Topic0/excel_files/</code>
                <br /><br />
                <strong>Required sheet name:</strong> <code className="bg-gray-800 px-1 rounded">lookup_reference_data</code><br />
                <strong>Example content:</strong><br />
                Columns: Product ID, Product Name, Category, Price<br />
                Row1: P101, Laptop, Electronics, 85000<br />
                Row2: P102, Mouse, Electronics, 1200<br />
                Then try =VLOOKUP("P102", table, 4, FALSE) → should return 1200.
              </p>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-3">
            Tip: The first column (Product ID) acts as the <strong>lookup key</strong>. A lookup function searches this column for a value like "P103" and returns the corresponding Price.
          </p>
        </section>

        {/* FAQ Section */}
        <FAQTemplate title="Lookup Functions – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Lookup functions are the first step toward dynamic dashboards. Emphasize that the reference table is like a map: without a unique key (lookup column), retrieval becomes ambiguous. " +
            "Encourage students to practice with real lists (e.g., class attendance, library books). Remind them that learning lookup logic is 70% about understanding table structures, not just formulas. " +
            "For the Excel file, ask students to find the price of a product using VLOOKUP, then change the product ID and observe the result."
          }
        />

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section transition-all duration-700 ease-out">
          <h3 className="font-bold text-lg">📋 Quick Recap – Must Remember</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✓ Lookup value is the search key (unique identifier).</li>
            <li>✓ Reference table organizes data in rows and columns.</li>
            <li>✓ The lookup column should contain unique values for best results.</li>
            <li>✓ Always lock table array when copying formulas ($ signs).</li>
            <li>✓ Be consistent with data types (text vs number).</li>
          </ul>
        </div>
      </div>

      {/* Animation styles (same as working Topic2) */}
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