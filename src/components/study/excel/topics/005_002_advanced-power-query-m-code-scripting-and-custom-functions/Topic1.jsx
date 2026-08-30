"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Data Structures · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Lists, Records &amp; Tables
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Structure
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Understanding M Data Types: Primitive Types, Lists, Records &amp; In-Memory Tables
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In Power Query M, everything is an expression that evaluates to a specific data type. 
            Beyond atomic <strong>Primitive Scalars</strong> (numbers, text, dates, durations, logicals), M's true superpower 
            lies in its three core structured containers: <strong>Lists</strong> (<code className="text-teal-300 font-mono">{'{...}'}</code> for 1D sequences), 
            <strong>Records</strong> (<code className="text-emerald-300 font-mono">{'[...]'}</code> for associative key-value rows), and 
            <strong>Tables</strong> (<code className="text-sky-300 font-mono">{'#table(...) '}</code> for typed 2D relational matrices)!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Lists {'{...}'}:</strong> 1D zero-indexed ordered sequences with range generators <code className="text-teal-300">{'{1..100}'}</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Records {'[...]'}:</strong> Key-value single-row tuples with direct field lookups <code className="text-emerald-300">Record[Field]</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Tables #table:</strong> 2D typed relational matrices with coordinate lookups <code className="text-sky-300">Table{'{0}'}[Col]</code></span>
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
              <span className="text-teal-400">⚡</span> M Structured Data Type Anatomy &amp; Accessors
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Type Constructors
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. List Literal Syntax &amp; Accessor</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'MyList = {10, 20, 30, "Barrackpore"}, FirstItem = MyList{0} // Evaluates to 10'}
            </div>
            <span className="text-slate-500">// 2. Record Literal Syntax &amp; Field Accessor</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'MyRecord = [ID = 101, Name = "Swadeep", Amount = 45000], ClientName = MyRecord[Name]'}
            </div>
            <span className="text-slate-500">// 3. Typed In-Memory Table Literal Syntax</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'MyTable = #table(type table [ID = Int64.Type, Amount = number], {{1, 45000.00}, {2, 12500.50}})'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Container Type</th>
                  <th className="py-3 px-4">Literal Constructor</th>
                  <th className="py-3 px-4">Lookup Accessor</th>
                  <th className="py-3 px-4">Combination Operator (&amp;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">List {'{...}'}</td>
                  <td className="py-3 px-4 text-teal-300">{'{1, 2, 3, "BKP"}'}</td>
                  <td className="py-3 px-4 text-slate-300">MyList{'{0}'} (Zero-based index)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">{'{1, 2} & {3, 4}'} &rarr; Concatenates lists.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Record {'[...]'}</td>
                  <td className="py-3 px-4 text-emerald-300">{'[ID = 101, City = "BKP"]'}</td>
                  <td className="py-3 px-4 text-slate-300">MyRecord[City] (Field lookup)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">{'[A=1] & [B=2]'} &rarr; Merges fields (Right overrides Left).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Table #table</td>
                  <td className="py-3 px-4 text-sky-300">{'#table({"A", "B"}, {{1, 2}})'}</td>
                  <td className="py-3 px-4 text-slate-300">MyTable{'{0}'}[B] (Cell coordinate)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Table1 &amp; Table2 &rarr; Table.Combine vertical union.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Function</td>
                  <td className="py-3 px-4 text-amber-300">{'(x, y) as number => x + y'}</td>
                  <td className="py-3 px-4 text-slate-300">MyFunc(10, 20) (Invocation)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">N/A (Higher-order functional composition).</td>
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
              <span className="text-emerald-400">🔬</span> Single Bracket vs Double Bracket &amp; Null Propagation
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Type Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Table[Col] vs Table[[Col]]
              </h3>
              <p className="leading-relaxed">
                Single bracket notation <code className="text-teal-300 font-mono">FactSales[Amount]</code> extracts the column as a <strong>1D List</strong>. 
                Double bracket notation <code className="text-teal-300 font-mono">FactSales[[Amount]]</code> projects a <strong>1-Column Table</strong>! 
                Passing a List to a function expecting a Table is the #1 cause of beginner type errors.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Single [Col] = List | Double [[Col]] = Table
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Three-Valued Logic &amp; Null Coalescing (`??`)
              </h3>
              <p className="leading-relaxed">
                In M, <code className="text-emerald-300 font-mono">null</code> represents missing data. 
                Any arithmetic with null evaluates strictly to null: <code className="text-emerald-300 font-mono">100 + null == null</code>. 
                Always safeguard calculations using the null-coalescing operator: <code className="text-emerald-300 font-mono">[Amount] ?? 0</code>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Safeguard: [Amount] ?? 0 (Prevents Null Propagation)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Sequential Range Generation Syntax
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              M natively generates sequences using double dots: <code className="text-teal-300 font-mono">{'{1..100}'}</code> generates integer lists 1 to 100, 
              and <code className="text-teal-300 font-mono">{'{"a".."z"}'}</code> generates character arrays. 
              This is indispensable for generating calendar years or test dummy datasets on the fly!
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
              <span className="text-teal-400">📐</span> Visual M Data Container Hierarchy
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Container Typology
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Understand how Scalar Primitives, 1D Lists, Key-Value Records, and 2D Tables relate to each other:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Primitive Scalar */}
              <rect x="25" y="25" width="180" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="180" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="115" y="47" fill="#CCFBF1" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. PRIMITIVE SCALAR</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="160" height="26" rx="4" fill="#1E293B" />
                <text x="8" y="17">45000.50 (number)</text>

                <rect y="32" width="160" height="26" rx="4" fill="#1E293B" />
                <text x="8" y="49">"Barrackpore" (text)</text>

                <rect y="64" width="160" height="26" rx="4" fill="#1E293B" />
                <text x="8" y="81">#date(2026,8,27)</text>

                <rect y="96" width="160" height="26" rx="4" fill="#1E293B" />
                <text x="8" y="113">true / false (logical)</text>

                <rect y="128" width="160" height="26" rx="4" fill="#1E293B" />
                <text x="8" y="145" fill="#FDA4AF">null (absence of val)</text>
              </g>

              <text x="115" y="270" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Atomic Data Points</text>

              {/* 2. List (1D) */}
              <rect x="225" y="25" width="190" height="270" rx="12" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="225" y="25" width="190" height="34" rx="12" fill="#115E59" fillOpacity="0.4" />
              <text x="320" y="47" fill="#F0FDFA" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. LIST {'{...}'} (1D ARRAY)</text>

              <g transform="translate(235, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="170" height="28" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="18" fill="#5EEAD4">{'{0}: 101 (Index 0)'}</text>

                <rect y="34" width="170" height="28" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="52" fill="#5EEAD4">{'{1}: "Swadeep"'}</text>

                <rect y="68" width="170" height="28" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="86" fill="#5EEAD4">{'{2}: "Barrackpore"'}</text>

                <rect y="102" width="170" height="28" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="8" y="120" fill="#5EEAD4">{'{3}: 45000'}</text>
              </g>

              <rect x="235" y="225" width="170" height="55" rx="6" fill="#134E4A" fillOpacity="0.3" stroke="#14B8A6" />
              <text x="320" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Table[ColumnName]</text>
              <text x="320" y="262" fill="#CCFBF1" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">Extracts Column as 1D List</text>

              {/* 3. Record (Tuple) */}
              <rect x="435" y="25" width="190" height="270" rx="12" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="435" y="25" width="190" height="34" rx="12" fill="#065F46" fillOpacity="0.4" />
              <text x="530" y="47" fill="#F0FDF4" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. RECORD {'[...]'}</text>

              <g transform="translate(445, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="170" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="18" fill="#34D399">[ID] = 101</text>

                <rect y="34" width="170" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="52" fill="#34D399">[Name] = "Swadeep"</text>

                <rect y="68" width="170" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="86" fill="#34D399">[City] = "BKP"</text>

                <rect y="102" width="170" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="120" fill="#34D399">[Amount] = 45000</text>
              </g>

              <rect x="445" y="225" width="170" height="55" rx="6" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
              <text x="530" y="245" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Table{'{0}'}</text>
              <text x="530" y="262" fill="#A7F3D0" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">Extracts 1st Row as Record</text>

              {/* 4. Table #table */}
              <rect x="645" y="25" width="180" height="270" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="645" y="25" width="180" height="34" rx="12" fill="#0369A1" fillOpacity="0.3" />
              <text x="735" y="47" fill="#BAE6FD" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4. TABLE #table (2D)</text>

              <g transform="translate(655, 75)" fontSize="7.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="160" height="22" fill="#1E293B" stroke="#38BDF8" />
                <text x="6" y="15" fill="#38BDF8" fontWeight="bold">ID | Name | Amount</text>

                <rect y="25" width="160" height="20" fill="#0F172A" />
                <text x="6" y="39">101 | Swadeep | ₹45k</text>

                <rect y="48" width="160" height="20" fill="#0F172A" />
                <text x="6" y="62">102 | Tuhina  | ₹12.5k</text>

                <rect y="71" width="160" height="20" fill="#0F172A" />
                <text x="6" y="85">103 | Susmita | ₹98k</text>
              </g>

              <rect x="655" y="225" width="160" height="55" rx="6" fill="#0284C7" fillOpacity="0.15" stroke="#38BDF8" />
              <text x="735" y="245" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Table{'{0}'}[Amount]</text>
              <text x="735" y="262" fill="#BAE6FD" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">Cell Coordinate Lookup</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the M data types catalog dataset below or download the practice workbook to test Lists, Records, and Tables in Microsoft Excel.
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
            sheetName="Topic1_M_Data_Types"
            title="M Data Types & Container Catalog (Data Structure, M Type Category, Literal Syntax Example, Zero-Based Accessor, Enterprise Use Case)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · In-Memory Mock Tables</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Creating Typed Test Grids with #table
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> prototypes an ERP tax reconciliation module using <code className="text-teal-300 font-mono">#table(type table [ID=Int64.Type, Tax=number], ...)</code> directly in M, testing edge cases without requiring mock Excel files.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                #table Literal &rarr; 100% In-Memory Test Prototyping
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Configuration Records</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Parameter Bundling via Record Merging
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> bundles corporate tax rates in an M record <code className="text-emerald-300 font-mono">[GST=0.18, TDS=0.02, Cess=0.01]</code>, accessing specific rates via <code className="text-emerald-300 font-mono">Config[GST]</code> dynamically across queries.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Record[Key] &rarr; Clean Global Config Management
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Distinct Key List Extraction</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Column Lists for Fast Matching
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> projects the Vendor ID column as a list <code className="text-indigo-300 font-mono">ApprovedVendors[ID]</code>, using <code className="text-indigo-300 font-mono">List.Contains</code> to filter 250,000 invoices in under 0.8 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                List.Contains(Table[Col], Val) &rarr; Sub-Second Membership Audit
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Cell Coordinate Scalar Lookup</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Fetching Header Metadata via Table{'{0}'}[Field]
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> extracts the invoice generation date stored in cell B2 of a messy receipt using <code className="text-fuchsia-300 font-mono">RawSource{'{1}'}[Column2]</code>, storing it as a scalar variable for all child rows.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Table{'{1}'}[Col2] &rarr; Exact Coordinate Value Extraction
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
              <span className="text-teal-400">🪜</span> Step-by-Step Container Manipulation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Choose Appropriate Container Type</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <strong>Lists</strong> for 1D arrays/keys, <strong>Records</strong> for 1-row associative tuples, and <strong>Tables</strong> for multi-row tabular grids.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Apply Zero-Based Coordinate Accessors</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Extract rows using <code className="text-indigo-300 font-mono">Table{'{0}'}</code>, columns via <code className="text-indigo-300 font-mono">Table[Col]</code>, and cell values via <code className="text-indigo-300 font-mono">Table{'{0}'}[Col]</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Safeguard Null Arithmetic</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ensure calculations do not corrupt to null by applying the coalesce operator: <code className="text-cyan-300 font-mono">[Amount] ?? 0</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Enforce Explicit Type Assertions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Define types on `#table` columns (<code className="text-emerald-300 font-mono">type table [...]</code>) to guarantee downstream join compatibility!
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
              Data Type Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Field Wasn't Found</td>
                  <td className="py-3 px-4 text-slate-300">Attempted to access a non-existent or misspelled field in an M Record.</td>
                  <td className="py-3 px-4 text-slate-400">Error popup: <em>"The field 'Total' of the record wasn't found"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">Record.FieldOrDefault(Rec, "Total", 0)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">List vs Table Confusion</td>
                  <td className="py-3 px-4 text-slate-300">Passed <code className="text-amber-300">Table[Col]</code> (List) to a function requiring a Table.</td>
                  <td className="py-3 px-4 text-slate-400">Error: <em>"We cannot convert a value of type List to type Table"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Use double brackets: <code className="text-emerald-400 font-mono">Table[[Col]]</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Silent Null Arithmetic Collapse</td>
                  <td className="py-3 px-4 text-slate-300">Added a numeric column to a column containing nulls (<code className="text-rose-400">[A] + [B]</code>).</td>
                  <td className="py-3 px-4 text-slate-400">Result column displays null for all rows where either value was missing.</td>
                  <td className="py-3 px-4 text-emerald-400">Coalesce missing values: <code className="text-emerald-400 font-mono">([A] ?? 0) + ([B] ?? 0)</code>.</td>
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
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Container Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">{'[Amount] ?? 0'}</span>
                <span>Null Coalescing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Safely replace nulls with zero without writing lengthy if-then-else expressions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">{'{1..100}'}</span>
                <span>Range Generator</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly create sequential integer lists or character sequences with double dots.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">#table Literal</span>
                <span>In-Memory Grids</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Define typed mock tables inline for testing custom transformations without files.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Table[[Col]]</span>
                <span>1-Column Table</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use double brackets to extract a single-column table instead of a 1D list.
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
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on container distinctions:</strong> Why is understanding the difference between a 1D List <code className="text-teal-300 font-mono">{'{...}'}</code> and a 1-row Record <code className="text-emerald-400 font-mono">{'[...]'}</code> vital when writing custom functions in M?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine coordinate accessors:</strong> How does <code className="text-sky-300 font-mono">Table{'{0}'}[Col]</code> enable dynamic metadata extraction from unpivoted header rows in legacy spreadsheets?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider null propagation:</strong> Why does M treat <code className="text-rose-400 font-mono">100 + null</code> as <code className="text-rose-400 font-mono">null</code> rather than defaulting to <code className="text-emerald-400 font-mono">100</code>?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="M Data Types & Container Structures — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Master the 3 core containers: Lists {...} for 1D arrays, Records [...] for 1-row associative tuples, and Tables #table(...) for 2D grids! Understand zero-based accessors ({0} for rows, [Col] for fields, {0}[Col] for cells), and always enforce explicit data types to prevent silent type-mismatch join failures and calculation corruptions!"
            }
          />
        </div>
      </div>
    </div>
  );
}
