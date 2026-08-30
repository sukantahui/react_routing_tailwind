"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📑 Column Projection Engine · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Project
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Extracting Specific Columns & Reordering Layouts with CHOOSECOLS
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern relational modeling and report design, raw tables frequently contain dozens of internal calculation fields, 
            deduction subtotals, or sensitive data columns. The <code className="text-indigo-300 font-mono font-bold">CHOOSECOLS</code> function 
            performs dynamic column projection and instantaneous field reordering entirely in RAM—allowing modelers to construct 
            clean, masked executive reports without modifying the underlying database architecture.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Dynamic Projection:</strong> Slices exact columns across all rows</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Instant Field Reordering:</strong> Swap column order in memory</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Negative Indexing:</strong> <code className="text-amber-300 font-mono">-1</code> references the rightmost column</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">⚡</span> Formula Anatomy: =CHOOSECOLS()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Subset 2D Matrix / Reordered Columns
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-indigo-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =CHOOSECOLS(<span className="text-amber-300">array</span>, <span className="text-emerald-300">col_num1</span>, <span className="text-slate-400">[col_num2]</span>, <span className="text-slate-400">...</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Select Emp_ID, Net_Pay, Name, Location):</span>{" "}
              <span className="text-emerald-400 font-bold">=CHOOSECOLS(A2:J100, 1, 10, 2, 5)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or in-memory array from which columns are extracted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">col_num1</td>
                  <td className="py-3 px-4 text-slate-300">Integer / Vector</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The 1-based index of the first column to return (positive for left-to-right, negative for right-to-left).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-300">[col_num2]...</td>
                  <td className="py-3 px-4 text-slate-300">Integer / Vector</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    Additional column indices. Can be listed individually or as an array vector like <code className="text-amber-300 font-mono">{"{"}1, 4, 2{"}"}</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Architectural & Data Masking Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              SIMD Column Projections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-indigo-400">1.</span> Decoupled Presentation Schema
              </h3>
              <p className="leading-relaxed">
                In enterprise database design, the database schema (how columns are stored on disk) should never dictate the presentation view (how reports are displayed). 
                CHOOSECOLS acts as an architectural projection layer: you query the master dataset and project only the columns your report requires in the exact layout needed.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Raw Storage: [ID, FName, LName, Dept, Basic, HRA, PF, Net] &rarr; Report: [ID, Full_Name, Net]
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Negative Indexing for Variable Width Tables
              </h3>
              <p className="leading-relaxed">
                When working with dynamic models where calculation columns might be appended over time, hardcoded column numbers break. 
                Using <code className="text-amber-300 font-mono">-1</code> guarantees that you always capture the final summary column (e.g. Net Payable) regardless of how many columns are added in between.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                =CHOOSECOLS(MasterPayroll, 1, 2, -1) &rarr; Always Captures [ID, Name, NetPayable]
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-purple-400">🛡️</span> Security & Data Masking Advantages
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Hiding worksheet columns in Excel is notoriously insecure—any junior user can right-click and choose "Unhide". 
              By using CHOOSECOLS on a protected reporting worksheet, you create a read-only projection that extracts only authorized fields (e.g. [Emp_ID, Department, Location]), leaving confidential base salaries and tax deductions safely isolated in the backend sheet.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">📐</span> Visual Column Extraction & Reordering Flow
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Interactive Architectural Projection
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how CHOOSECOLS extracts columns 1, 5, 2, and 10 from a 10-column master table and reorders them dynamically:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="160" cy="170" r="80" fill="#4F46E5" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#7C3AED" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Master 10-Column Table (Left) */}
              <rect x="20" y="30" width="280" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="20" y="30" width="280" height="34" rx="14" fill="#4338CA" fillOpacity="0.3" />
              <text x="160" y="52" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW PAYROLL MASTER (10 COLUMNS)</text>

              {/* Columns List */}
              <g transform="translate(35, 75)">
                <rect width="115" height="24" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="57" y="16" fill="#C7D2FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Col 1: Emp_ID ✓</text>

                <rect x="135" y="0" width="115" height="24" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="192" y="16" fill="#C7D2FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Col 2: FName ✓</text>

                <rect y="30" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="57" y="46" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 3: LName</text>

                <rect x="135" y="30" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="192" y="46" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 4: DeptCode</text>

                <rect y="60" width="115" height="24" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="57" y="76" fill="#C7D2FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Col 5: Branch ✓</text>

                <rect x="135" y="60" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="192" y="76" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 6: BasicPay</text>

                <rect y="90" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="57" y="106" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 7: HRA</text>

                <rect x="135" y="90" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="192" y="106" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 8: PF</text>

                <rect y="120" width="115" height="24" rx="4" fill="#0F172A" stroke="#334155" />
                <text x="57" y="136" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Col 9: Gross</text>

                <rect x="135" y="120" width="115" height="24" rx="4" fill="#1E1B4B" stroke="#10B981" />
                <text x="192" y="136" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Col 10: Net (-1) ✓</text>
              </g>

              <rect x="35" y="235" width="250" height="60" rx="8" fill="#4F46E5" fillOpacity="0.12" stroke="#4F46E5" strokeDasharray="3 3" />
              <text x="160" y="255" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Source: 10 Columns Total</text>
              <text x="160" y="275" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Sensitive salary columns masked</text>

              {/* Arrow */}
              <path d="M 310 170 L 375 170" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="380,170 370,165 370,175" fill="#818CF8" />

              {/* Center Engine */}
              <rect x="385" y="60" width="210" height="220" rx="14" fill="#0F172A" stroke="#6366F1" strokeWidth="2" />
              <rect x="385" y="60" width="210" height="34" rx="14" fill="#4338CA" fillOpacity="0.4" />
              <text x="490" y="82" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CHOOSECOLS LOGIC</text>

              <g transform="translate(395, 105)">
                <rect width="190" height="36" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="22" fill="#E0E7FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=CHOOSECOLS(T, 1, 5, 2, 10)</text>
              </g>

              <text x="490" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Reordered Projection:</text>
              <text x="490" y="185" fill="#C7D2FE" fontSize="10" textAnchor="middle" fontFamily="monospace">1 &rarr; Col 1 (Emp_ID)</text>
              <text x="490" y="203" fill="#C7D2FE" fontSize="10" textAnchor="middle" fontFamily="monospace">2 &rarr; Col 5 (Branch)</text>
              <text x="490" y="221" fill="#C7D2FE" fontSize="10" textAnchor="middle" fontFamily="monospace">3 &rarr; Col 2 (FName)</text>
              <text x="490" y="239" fill="#A7F3D0" fontSize="10" textAnchor="middle" fontFamily="monospace">4 &rarr; Col 10 (Net Payable)</text>

              {/* Arrow */}
              <path d="M 605 170 L 665 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="670,170 660,165 660,175" fill="#10B981" />

              {/* Output Spilled View (Right) */}
              <rect x="675" y="40" width="160" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="675" y="40" width="160" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="755" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MASKED REPORT (4 COLS)</text>

              <rect x="685" y="86" width="140" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="755" y="104" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Emp_ID | Branch</text>

              <rect x="685" y="122" width="140" height="28" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="755" y="140" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">FName | Net_Pay</text>

              <rect x="685" y="165" width="140" height="115" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="755" y="190" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="755" y="210" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Clean Executive View</text>
              <text x="755" y="230" fill="#6EE7B7" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Zero Base Salary Leaks</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the corporate payroll dataset below or download the workbook to practice <code className="text-indigo-300 font-mono">CHOOSECOLS</code> column projections in Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic4_CHOOSECOLS"
            title="Corporate Payroll Ledger (10 Fields to Project & Mask)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 1 · Payroll Data Masking</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Campus</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Masking Confidential Compensation Fields
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior HR Specialist <strong>Priya Chakraborty</strong> receives a 10-column payroll register containing Basic Pay, HRA, and PF deductions. 
                For general staff noticeboards, she writes <code className="text-amber-300 font-mono">=CHOOSECOLS(A2:J11, 1, 2, 5, 10)</code>, 
                extracting only [Emp_ID, First_Name, Branch_City, Net_Payable] without exposing sensitive deduction data.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =CHOOSECOLS(A2:J11, 1, 2, 5, 10) &rarr; Zero Exposure of Allowances
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Dynamic ERP Reordering</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Aligning Exported ERP Columns with Tax Formats
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Corporate Tax Advisor <strong>Abhronila Sengupta</strong> ingests raw SAP exports formatted as [City, Dept, ID, Gross]. 
                Her statutory GST template requires [ID, Dept, City, Gross]. 
                She applies <code className="text-amber-300 font-mono">=CHOOSECOLS(RawSAP, 3, 2, 1, 4)</code> to swap columns instantly in memory.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =CHOOSECOLS(RawSAP, 3, 2, 1, 4) &rarr; Aligned GST Template
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 3 · Relational 2D Filtering</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Development Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                2-Dimensional Query: Filter Rows & Project Columns
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Software Architect <strong>Debangshu Ghosh</strong> filters engineers located in Barrackpore and projects only their Name and Net Salary: 
                <code className="text-amber-300 font-mono">=CHOOSECOLS(FILTER(PayrollTable, City="Barrackpore"), 2, 10)</code>. 
                The entire multi-column query executes in a single cell.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =CHOOSECOLS(FILTER(T, City="BK"), 2, 10) &rarr; Pure 2D Query
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Case 4 · Automated Tail Capture</span>
                <span className="text-xs font-mono text-slate-400">Naihati Financial Services</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Indestructible First-and-Last Column Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Susmita Roy</strong> extracts the key identifier and final net balance across variable-width billing ledgers. 
                Using <code className="text-amber-300 font-mono">=CHOOSECOLS(BillingTable, 1, -1)</code>, 
                her formula never breaks when accounting staff insert new allowance columns between columns 2 and 9.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: =CHOOSECOLS(A2:J50, 1, -1) &rarr; Dynamic First & Last Column
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Map Source Column Numbers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Review the source table <code className="text-amber-300 font-mono">A2:J11</code>: Col 1 (Emp_ID), Col 2 (First_Name), Col 5 (Branch_City), Col 10 (Net_Payable). 
                  Determine the target column sequence for your presentation report.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the CHOOSECOLS Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">L2</code>, type: <code className="text-amber-300 font-mono">=CHOOSECOLS(A2:J11, 1, 2, 5, 10)</code>. 
                  Use <code className="text-sky-300 font-mono">-1</code> for the final column if column count varies over time.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify Column Layout & Format</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula spills across 4 columns (L2:O11). 
                  Apply currency formatting to the Net_Payable column (<code className="text-emerald-400 font-mono">₹#,##0.00</code>) to complete the report.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Reference the Dynamic Spilled Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To sort the report by Net Payable descending, nest with SORT: <code className="text-emerald-300 font-mono">=SORT(L2#, 4, -1)</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Issue</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Method</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Zero Index)</td>
                  <td className="py-3 px-4 text-slate-300">Passing 0 as a column index to CHOOSECOLS.</td>
                  <td className="py-3 px-4 text-slate-400">Check index argument values.</td>
                  <td className="py-3 px-4 text-emerald-400">Column index must start at 1 (left) or -1 (right).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Out of Bounds)</td>
                  <td className="py-3 px-4 text-slate-300">Requested column number exceeds total columns in array.</td>
                  <td className="py-3 px-4 text-slate-400">Check index against <code className="text-amber-300 font-mono">COLUMNS(array)</code>.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure all column indices are &le; total columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by text or merged formatting.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow multi-column spill.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Modeler Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-indigo-400 font-mono font-bold">-1</span>
                <span>The Indestructible Last Column</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always use <code className="text-amber-300 font-mono">-1</code> to capture the total/net column so reports remain dynamic as columns are inserted.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">HSTACK()</span>
                <span>Attach Calculated Columns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract base fields and append a new calculated tax column: <code className="text-emerald-300 font-mono">=HSTACK(CHOOSECOLS(T, 1, 2), CHOOSECOLS(T, 6)*0.18)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">FILTER + CHOOSECOLS</span>
                <span>Complete 2D Queries</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter rows and project columns in one formula: <code className="text-sky-300 font-mono">=CHOOSECOLS(FILTER(Table, Status="Active"), 1, 2, 5)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Preview Columns in RAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight CHOOSECOLS in the formula bar and press <strong>F9</strong> to verify the extracted fields before spilling.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Analytical Inquiries
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on data governance:</strong> Why is projecting columns via <code className="text-indigo-300 font-mono">CHOOSECOLS</code> on a read-only reporting sheet vastly more secure than simply hiding columns in the raw data sheet?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine dynamic index resilience:</strong> If an accounting clerk inserts an "Overtime Allowance" column between Basic Pay (Col 6) and Gross Pay (Col 9), why does <code className="text-emerald-300 font-mono">CHOOSECOLS(Table, 1, -1)</code> remain 100% accurate while hardcoded <code className="text-rose-400 font-mono">CHOOSECOLS(Table, 1, 10)</code> breaks?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider 2D composition:</strong> How does nesting <code className="text-purple-300 font-mono">CHOOSEROWS</code> inside <code className="text-indigo-300 font-mono">CHOOSECOLS</code> allow you to extract an exact sub-matrix without altering source data?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Extracting Columns with CHOOSECOLS — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "CHOOSECOLS is the gold standard for creating decoupled presentation layers in enterprise Excel models. Never allow raw database schemas to dictate client-facing dashboards. Use CHOOSECOLS to mask confidential fields and reorganize columns dynamically in RAM. Remember to pair index -1 with structured tables for bulletproof schema resilience!"
            }
          />
        </div>
      </div>
    </div>
  );
}
