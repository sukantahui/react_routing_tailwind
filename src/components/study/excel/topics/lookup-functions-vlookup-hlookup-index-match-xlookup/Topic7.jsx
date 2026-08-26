"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic7_files/topic7_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic7() {
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

  // Static fallback table for MATCH examples
  const StaticMatchExamples = () => (
    <div className="space-y-4">
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-indigo-500">
        <p className="font-mono text-sm">=MATCH("P103", A2:A6, 0) → returns 3 (position of "P103")</p>
        <p className="text-xs text-gray-400">Exact match finds the relative position.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-indigo-500">
        <p className="font-mono text-sm">=MATCH(85, B2:B6, 1) → returns 4 (largest ≤85, requires sorted ascending)</p>
        <p className="text-xs text-gray-400">Approximate match for grade brackets.</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-700 mt-2">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gray-800"><tr><th className="px-3 py-2">Product ID</th><th className="px-3 py-2">Score</th></tr></thead>
          <tbody>
            <tr><td className="px-3 py-1">P101</td><td className="px-3 py-1">45</td></tr>
            <tr><td className="px-3 py-1">P102</td><td className="px-3 py-1">62</td></tr>
            <tr><td className="px-3 py-1">P103</td><td className="px-3 py-1">78</td></tr>
            <tr><td className="px-3 py-1">P104</td><td className="px-3 py-1">89</td></tr>
            <tr><td className="px-3 py-1">P105</td><td className="px-3 py-1">95</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            MATCH Function Basics
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Find the position of a value in a range – the perfect partner for INDEX.
          </p>
        </header>

        {/* Function Prototype */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-indigo-500">
            =MATCH(lookup_value, lookup_array, [match_type])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-indigo-300">Return type:</strong> Numeric (position number) or #N/A if not found.</li>
            <li><strong className="text-indigo-300">Purpose:</strong> Returns the relative position of a lookup value within a range (row or column).</li>
            <li><strong className="text-indigo-300">When to use:</strong> Finding row numbers for INDEX, creating dynamic column indices, checking if a value exists, finding position of max/min values.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 MATCH does not return the value itself – it returns the position. Use with INDEX to retrieve the value.
          </div>
        </section>

        {/* Match Types Explanation */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">🎯 The Three Match Types</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-blue-500">
              <p className="font-mono font-bold">0 (Zero)</p>
              <p className="text-sm">Exact match – finds first occurrence. No sorting required.</p>
              <p className="text-xs text-gray-400 mt-1">Most common: IDs, names, codes.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-green-500">
              <p className="font-mono font-bold">1 (or omitted)</p>
              <p className="text-sm">Approximate match – largest value ≤ lookup_value. <span className="text-yellow-300">Requires ascending sort.</span></p>
              <p className="text-xs text-gray-400 mt-1">Grade boundaries, tax brackets.</p>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border-l-4 border-red-500">
              <p className="font-mono font-bold">-1</p>
              <p className="text-sm">Approximate match – smallest value ≥ lookup_value. <span className="text-yellow-300">Requires descending sort.</span></p>
              <p className="text-xs text-gray-400 mt-1">Rare, but useful for reverse‑sorted data.</p>
            </div>
          </div>
        </section>

        {/* Real‑world Examples */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Example 1: Find Position of a Product</p>
              <p className="text-sm">In a product list (A2:A100), find which row "P103" is in.</p>
              <code className="block text-sm text-green-300 mt-1">=MATCH("P103", A2:A100, 0) → returns 3 if P103 is the 3rd item in the range.</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Example 2: Grade Bracket – Approximate Match</p>
              <p className="text-sm">{`A grade table: {0,"F"; 60,"D"; 70,"C"; 80,"B"; 90,"A"}. Find the row for a score of 85.`}</p>
              <code className="block text-sm text-green-300 mt-1">=MATCH(85, {0,60,70,80,90}, 1) → returns 4 (position of 80)</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-indigo-300">Example 3: Check Existence Before VLOOKUP</p>
              <p className="text-sm">Avoid #N/A by testing if value exists.</p>
              <code className="block text-sm text-green-300 mt-1">=IF(ISNUMBER(MATCH(E2, A:A, 0)), "Found", "Missing")</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: MATCH Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“match_data”</strong> contains product IDs, scores, and grade tables. Practice using MATCH to find positions.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="match_data"
              title="MATCH Function – Find Positions"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “match_data” not available. Showing static examples.
              </div>
              <StaticMatchExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> =MATCH("P105", A2:A100, 0) – what position does it return? Then try =MATCH(85, B2:B100, 1) and see the difference.
          </p>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting that MATCH returns <strong>relative position</strong> within the array, not the row number on the sheet.</li>
            <li>Using match_type = 1 (approximate) without sorting the lookup_array ascending → wrong results.</li>
            <li>Using match_type = -1 without sorting descending.</li>
            <li>MATCH is case‑insensitive (like VLOOKUP). For case‑sensitive, use MATCH with EXACT in an array formula.</li>
            <li>lookup_array must be a single row or single column – cannot be a 2D range.</li>
            <li>If no match is found, MATCH returns #N/A – always handle with IFERROR or IFNA.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use match_type = 0 for exact matches most of the time.</li>
            <li>Always sort the lookup_array when using match_type = 1 or -1.</li>
            <li>Use MATCH with INDEX instead of VLOOKUP for more flexible lookups.</li>
            <li>Wrap MATCH in IFNA to handle missing values: =IFNA(MATCH(...), "Not found").</li>
            <li>For dynamic column indices in VLOOKUP, use MATCH: =VLOOKUP(A2, table, MATCH("Price", header_row, 0), FALSE).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “If MATCH returns 3 for a value in a range starting at A2, what is the actual row number on the sheet? 
            Observe carefully: The relative position is 3, but the actual row is A2 (row 2) + (3-1) = row 4. Remember: MATCH counts positions, not absolute rows.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use MATCH with INDEX for two‑way lookups (matrix).</li>
            <li>To find the last occurrence, use =MATCH(2, 1/(range=value), 1) – array formula.</li>
            <li>Combine MATCH with OFFSET for dynamic named ranges.</li>
            <li>Use MATCH with data validation to create dependent dropdowns.</li>
            <li>In Excel 365, XMATCH offers more options (reverse search, wildcards).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =MATCH(lookup_value, lookup_array, [match_type])</li>
            <li>✅ Returns position (number), not value.</li>
            <li>✅ match_type: 0 = exact, 1 = ascending approx, -1 = descending approx.</li>
            <li>✅ lookup_array must be 1D (single row or column).</li>
            <li>✅ #N/A means value not found.</li>
            <li>✅ Perfect partner for INDEX.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="MATCH Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by showing a simple MATCH on a list of student names: =MATCH('Swadeep', A2:A10, 0). Explain that it returns the position, not the name itself. " +
            "Then show how MATCH fails if the value is missing (#N/A). " +
            "Emphasise the importance of match_type: 0 is safest. " +
            "For the Excel sheet 'match_data', include a column of product IDs, a column of scores, and a separate grade band table (0,60,70,80,90). " +
            "Ask students to find the position of a given score in the grade table (approximate match)."
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