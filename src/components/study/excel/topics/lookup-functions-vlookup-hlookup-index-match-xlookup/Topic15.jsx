"use client";

import React, { useEffect, useRef, useState } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic15_files/topic15_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/lookup_functions.xlsx?url";

export default function Topic15() {
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

  // Static fallback examples for cross‑sheet references
  const StaticCrossSheetExamples = () => (
    <div className="space-y-4">
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
        <p className="font-mono text-sm">=VLOOKUP(A2, 'Sheet2'!$A$2:$B$100, 2, FALSE)</p>
        <p className="text-xs text-gray-400">Looks up value from A2 in Sheet2, columns A–B.</p>
      </div>
      <div className="bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
        <p className="font-mono text-sm">=VLOOKUP(A2, '[Data.xlsx]Sheet1'!$A$2:$B$100, 2, FALSE)</p>
        <p className="text-xs text-gray-400">Looks up value from A2 in another workbook (Data.xlsx).</p>
      </div>
      <div className="bg-yellow-950/40 p-3 rounded border-l-4 border-yellow-500">
        <p className="text-sm">⚠️ Cross‑workbook lookups break if the source file is moved, renamed, or closed. Use Power Query or consolidate data when possible.</p>
      </div>
    </div>
  );

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Cross‑Sheet and Cross‑Workbook Lookups
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Reference data from other worksheets or even external Excel files – powerful but fragile.
          </p>
        </header>

        {/* Cross‑Sheet Lookups */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-emerald-400">📄</span> Cross‑Sheet Lookups (Same Workbook)
          </h2>
          <p className="mt-2 text-gray-200">Referencing another sheet within the same workbook is straightforward: include the sheet name followed by an exclamation mark before the range.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=VLOOKUP(A2, 'Sheet2'!$A$2:$B$100, 2, FALSE)</p>
            <p className="font-mono text-sm mt-1">=INDEX('Product Data'!B:B, MATCH(E2, 'Product Data'!A:A, 0))</p>
            <p className="text-xs text-gray-400 mt-1">Single quotes are required if the sheet name contains spaces or special characters.</p>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            ✅ <strong>Best practice:</strong> Use named ranges or Excel Tables for cross‑sheet references to make formulas more readable.
          </div>
        </section>

        {/* Cross‑Workbook Lookups */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-emerald-400">🌐</span> Cross‑Workbook Lookups (External Files)
          </h2>
          <p className="mt-2 text-gray-200">You can reference data from another Excel file. The syntax includes the file name in square brackets, sheet name, and range.</p>
          <div className="mt-3 bg-gray-900 p-3 rounded">
            <p className="font-mono text-sm">=VLOOKUP(A2, '[SalesData.xlsx]Sheet1'!$A$2:$B$100, 2, FALSE)</p>
            <p className="text-xs text-gray-400 mt-1">If the source file is closed, Excel will still return the last saved value but will not update until the source is opened.</p>
          </div>
          <div className="mt-3 bg-red-900/30 p-3 rounded border-l-4 border-red-500">
            <p className="font-semibold text-red-300">⚠️ Major Risks:</p>
            <ul className="list-disc list-inside text-sm mt-1">
              <li>If the source file is moved, renamed, or deleted, links break → #REF!.</li>
              <li>Slow performance if many external links.</li>
              <li>Users see security warnings about external links.</li>
            </ul>
          </div>
        </section>

        {/* Real‑world Use Cases */}
        <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold">📊 Real‑World Use Cases</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-emerald-300">Case 1: Monthly Report from Master Data Sheet</p>
              <p className="text-sm">In Barrackpore, a school maintains a master student list on Sheet "Master". The grade report on another sheet pulls student names and marks using cross‑sheet VLOOKUP.</p>
              <code className="block text-sm text-green-300 mt-1">=VLOOKUP(A2, 'Master'!$A$2:$C$500, 3, FALSE)</code>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <p className="font-medium text-emerald-300">Case 2: Consolidating Data from Department Budgets</p>
              <p className="text-sm">A finance team in Shyamnagar uses cross‑workbook lookups to pull department budgets from separate files into a master summary.</p>
              <code className="block text-sm text-green-300 mt-1">=VLOOKUP(A2, '[HR_Budget.xlsx]Sheet1'!$A$2:$B$50, 2, FALSE)</code>
            </div>
          </div>
        </section>

        {/* Interactive Excel Demo */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive: Cross‑Sheet Lookup Practice</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-3">
            Sheet <strong>“cross_sheet_data”</strong> contains a master product list. In another sheet (e.g., "Orders"), you'll practice referencing the master sheet using cross‑sheet VLOOKUP.
          </p>
          {sampleDataUrl && !excelError ? (
            <ExcelFileLoader
              fileModule={sampleDataUrl}
              sheetName="cross_sheet_data"
              title="Cross‑Sheet Lookups – Master Data"
              rowsPerPage={20}
              showSheetSelector={true}
              onError={() => setExcelError(true)}
            />
          ) : (
            <>
              <div className="bg-yellow-950/40 border border-yellow-700 rounded-lg p-3 mb-3 text-sm">
                ⚠️ Excel file or sheet “cross_sheet_data” not available. Showing static examples.
              </div>
              <StaticCrossSheetExamples />
            </>
          )}
          <p className="text-xs text-gray-400 mt-3">
            💡 <strong>Try this:</strong> In a new sheet, write =VLOOKUP(A2, cross_sheet_data!$A$2:$B$10, 2, FALSE) to pull product names from the "cross_sheet_data" sheet.
          </p>
        </section>

        {/* How to Create a Cross‑Sheet Reference */}
        <section className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold">🖱️ How to Create a Cross‑Sheet Reference (No Typing!)</h3>
          <ol className="list-decimal list-inside mt-3 space-y-2 text-gray-200">
            <li>Type <span className="font-mono">=VLOOKUP(</span> and select the lookup value.</li>
            <li>Type a comma, then click on the sheet tab you want to reference.</li>
            <li>Select the range on that sheet – Excel automatically adds the sheet name and exclamation.</li>
            <li>Continue typing the rest of the formula (col_index, FALSE).</li>
            <li>Press Enter – Excel will keep the cross‑sheet reference.</li>
          </ol>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li><strong>Breaking links:</strong> Renaming or moving the source file breaks cross‑workbook references.</li>
            <li><strong>Security warnings:</strong> External links trigger prompts; users may disable them.</li>
            <li><strong>Performance:</strong> Many external links slow down opening and calculation.</li>
            <li><strong>Sheet name changes:</strong> If you rename a sheet, existing formulas that referenced the old name will break (#REF!).</li>
            <li><strong>Missing single quotes:</strong> Sheet names with spaces require quotes: <span className="font-mono">'My Sheet'!A1</span>.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Prefer cross‑sheet references within the same workbook over cross‑workbook.</li>
            <li>Use Excel Tables with structured references – they are easier to read and maintain.</li>
            <li>For cross‑workbook lookups, consider consolidating data into a single workbook using Power Query.</li>
            <li>Document all external links in a dedicated sheet or comment.</li>
            <li>Use named ranges for cross‑sheet ranges to make formulas clearer.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about…</h3>
          <p className="mt-2 text-gray-200">
            “You send a report to your manager that contains VLOOKUPs to a file on your local C: drive. When your manager opens it, all lookups show #REF! Why? 
            Observe carefully: The manager does not have the same file path. Always use relative paths or store linked files in shared locations.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use <strong>INDIRECT</strong> to create dynamic sheet references: =VLOOKUP(A2, INDIRECT("'"&B2&"'!A:B"), 2, FALSE) where B2 contains sheet name.</li>
            <li>For cross‑workbook, use Power Query (Get & Transform) to import data instead of formulas – it's more robust.</li>
            <li>Use <strong>Data > Edit Links</strong> to manage, update, or break external links.</li>
            <li>Store linked workbooks in the same folder and use relative paths (don't include drive letters).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Cross‑sheet: =VLOOKUP(A2, 'Sheet2'!A:B, 2, FALSE)</li>
            <li>✅ Cross‑workbook: =VLOOKUP(A2, '[File.xlsx]Sheet1'!A:B, 2, FALSE)</li>
            <li>✅ Use single quotes for sheet names with spaces.</li>
            <li>✅ Cross‑workbook links break if source file is moved.</li>
            <li>✅ Prefer Power Query over external links for critical data.</li>
            <li>✅ Use Data {`>`} Edit Links to manage connections.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Cross‑Sheet & Cross‑Workbook Lookups – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher
          note={
            "Demonstrate by creating two sheets in the same workbook: 'Master' with product IDs and names, and 'Orders' with just IDs. Show how to write =VLOOKUP(A2, Master!$A$2:$B$10, 2, FALSE). Then rename the 'Master' sheet – the formula breaks with #REF!. This teaches the fragility of sheet name changes. " +
            "For cross‑workbook, create a second workbook with a simple table, then reference it. Then close the source workbook – the formula still shows the last value but warns. Move the source file – it breaks. " +
            "Emphasise that while cross‑workbook lookups are possible, they are not recommended for critical, shared workbooks. Power Query is the professional solution for consolidating external data."
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