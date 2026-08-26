"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic17_files/topic17_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic17() {
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

  // Static fallback for Data Validation + Lookup examples
  const StaticDataValidationExamples = () => (
    <div className="space-y-4">
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-semibold text-amber-300">Dropdown + VLOOKUP</p>
        <p className="text-sm">Create a dropdown in cell B2 using Data Validation → List → $A$2:$A$6 (product IDs).</p>
        <code className="block text-sm mt-1">=VLOOKUP(B2, Products!A:D, 4, FALSE)</code>
        <p className="text-xs text-gray-400">Selecting a product ID automatically shows its price.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-amber-500">
        <p className="font-semibold text-amber-300">Dependent Dropdown (Two Levels)</p>
        <p className="text-sm">First dropdown: Region. Second dropdown: City (only cities from selected region).</p>
        <code className="block text-sm mt-1">=INDIRECT("Region_"&A2) — using named ranges for each region's cities.</code>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section"&gt;
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Data Validation with Lookup Tables
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Create interactive dropdowns that feed into lookup functions – build dynamic dashboards in minutes.
          </p>
        </header>

        {/* What is Data Validation? */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">📋 What is Data Validation?</h2>
          <p className="mt-2 text-gray-200">Data Validation restricts what users can enter into a cell. The most common type is a <strong>dropdown list</strong> – a list of allowed values. When combined with lookup functions, it creates an interactive report where selecting an item automatically displays related data.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">Data → Data Validation → Allow: List → Source: =$A$2:$A$10</p>
            <p className="text-xs text-gray-400">Now the cell only accepts values from the list.</p>
          </div>
        </section>

        {/* Simple Dropdown + VLOOKUP */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all"&gt;
          <h2 className="text-2xl font-semibold">🔽 Method 1: Dropdown + VLOOKUP</h2>
          <p className="mt-2 text-gray-200">Create a dropdown of product IDs, then use VLOOKUP to display the product's price, name, or other details.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Select a cell (e.g., B2) → Data → Data Validation → Allow: List.</li>
              <li>Source: Select the range containing unique product IDs (e.g., =$A$2:$A$100).</li>
              <li>In the adjacent cell (C2), write: <span className="font-mono">=VLOOKUP(B2, Products!A:D, 4, FALSE)</span>.</li>
            </ol>
            <p className="text-xs text-green-300 mt-2">Now when you choose a product from the dropdown, its price appears automatically.</p>
          </div>
        </section>

        {/* Dependent Dropdowns (Two Levels) */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🔗 Dependent Dropdowns (Two Levels)</h2>
          <p className="mt-2 text-gray-200">The second dropdown's options depend on what was selected in the first dropdown. For example: select a Region, then select a City only from that region.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-semibold text-amber-300">Step 1: Create named ranges for each region's cities.</p>
            <code className="block text-sm">North = {"A2:A5"} (Toronto, Montreal, etc.)</code>
            <code className="block text-sm">South = {"B2:B4"} (Miami, Atlanta, etc.)</code>
            <p className="font-semibold text-amber-300 mt-2">Step 2: First dropdown (Region) – source: North, South (as list).</p>
            <p className="font-semibold text-amber-300">Step 3: Second dropdown (City) – source: =INDIRECT(RegionCell).</p>
            <p className="text-xs text-gray-400 mt-1">INDIRECT converts the text in RegionCell into a range reference (the named range).</p>
          </div>
          <p className="mt-2 text-sm text-yellow-300">⚠️ INDIRECT is volatile (recalculates often); use XLOOKUP with FILTER for large data.</p>
        </section>

        {/* Interactive Example with XLOOKUP */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">📊 Dynamic Dashboard with XLOOKUP</h3>
          <p className="mt-1 text-sm">Combine a dropdown (product list) with XLOOKUP to return multiple fields at once.</p>
          <div className="mt-2 bg-gray-900 p-3 rounded">
            <code className="block text-sm">=XLOOKUP(B2, Products!A:A, Products!B:D)</code>
            <p className="text-xs text-gray-400">Spills product name, category, price into three adjacent cells – no need for three separate VLOOKUPs.</p>
          </div>
        </section>

        {/* Real‑world Use Cases */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <h2 className="text-2xl font-semibold">🏢 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-3">
            <div className="bg-gray-900 p-2 rounded">
              <p className="font-medium text-amber-300">School Dashboard</p>
              <p className="text-sm">Dropdown of student names → displays roll number, marks, grade, attendance using INDEX-MATCH.</p>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <p className="font-medium text-amber-300">Retail Product Search</p>
              <p className="text-sm">Select product ID → shows name, category, price, stock. Great for inventory management.</p>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <p className="font-medium text-amber-300">Employee Directory</p>
              <p className="text-sm">Dropdown of employee names → pulls department, manager, hire date, salary from a lookup table.</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"&gt;
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Build Your Own Dashboard</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“data_validation_lookup_data”</strong> contains a product table and a region‑city table. Practice creating dropdowns and linking them to lookup formulas.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="data_validation_lookup_data"
              title="Data Validation + Lookup – Interactive Dashboard"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            /&gt;
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet not available. Showing static examples.
              </div>
              <StaticDataValidationExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Task:</strong> Create a dropdown for Product ID. Then use VLOOKUP to show the Price. Next, create a dependent dropdown: first select Region, then see only Cities in that region appear in the second dropdown.
          </p>
        </section>

        {/* <!-- Common Pitfalls --> */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Dropdown source not updating:</strong> If you use a static range (e.g., $A$2:$A$10) and add new items, they won't appear. Use a dynamic range (Excel Table or OFFSET/COUNTA).</li>
            <li><strong>INDIRECT with volatile functions:</strong> Overuse of INDIRECT slows down large workbooks. Use FILTER or named tables for dependent dropdowns in Excel 365.</li>
            <li><strong>Blank cells in source list:</strong> Data Validation dropdowns include blanks if your range has gaps. Remove blanks or use a dynamic range that excludes them.</li>
            <li><strong>Case sensitivity:</strong> Data Validation lists are case‑insensitive; but lookups may still fail if data doesn't match exactly (spaces, etc.).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use Excel Tables as the source for dropdowns – they auto‑expand when you add rows.</li>
            <li>For dependent dropdowns, use FILTER + CHOOSECOLS in Excel 365 instead of INDIRECT.</li>
            <li>Lock the lookup formula's source range with $ (absolute references) before copying.</li>
            <li>Wrap VLOOKUP in IFERROR to handle missing values when the dropdown selection is invalid.</li>
            <li>Add an input message and error alert in Data Validation to guide users.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You have a dropdown of product IDs from a Table. You add a new product to the Table – does the dropdown automatically show it? 
            Observe carefully: If the dropdown source is the Table column, yes (Tables auto‑expand). If it's a static range like $A$2:$A$10, no.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use <strong>Data Validation with named ranges</strong> for cleaner source references.</li>
            <li>For multi‑language dashboards, keep dropdown lists on a hidden sheet.</li>
            <li>Combine dropdowns with XLOOKUP to create a product card (image, description, price) using Excel 365's image function.</li>
            <li>Use <strong>Form Controls</strong> (Combo Box) from Developer tab if you need more advanced interactivity.</li>
            <li>To prevent users from entering values not in the dropdown, set Data Validation → Error Alert → Stop.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Data Validation: Data → Data Validation → List</li>
            <li>✅ Use Excel Tables or dynamic ranges for auto‑updating dropdowns.</li>
            <li>✅ =VLOOKUP(dropdown_cell, table, col_index, FALSE) – dynamic retrieval.</li>
            <li>✅ Dependent dropdowns: first dropdown → named ranges → INDIRECT or FILTER.</li>
            <li>✅ INDIRECT is volatile; use XLOOKUP+FILTER in 365.</li>
            <li>✅ Always handle missing values with IFERROR.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Data Validation with Lookup Tables – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Start by creating a simple dropdown from a static range. Then convert that range to an Excel Table and show how new items appear automatically. " +
            "Then demonstrate VLOOKUP linked to the dropdown – select a product, price appears. This is a 'wow' moment for beginners. " +
            "For dependent dropdowns, create region and city tables. Use named ranges (North, South, etc.) and INDIRECT. Explain that INDIRECT is a function that converts text to a range reference. " +
            "For advanced students, show FILTER approach in Excel 365. " +
            "The Excel sheet 'data_validation_lookup_data' should include a product table and a separate region‑city table with at least three regions and three cities each."
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