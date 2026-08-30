"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic14() {
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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "lookup_functions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🔍 Lookup & Relational Retrieval · Topic 14
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Advanced
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4 & 5: Analyze & Evaluate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed: In-depth theoretical mechanics, formula syntax, corporate execution best practices, and enterprise troubleshooting workflows.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Coordinate Precision:</strong> Exact Key Resolution</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Resilient Architecture:</strong> Immune to Insertions</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Modern Standards:</strong> XLOOKUP & INDEX-MATCH</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Formula Syntax & Argument Anatomy
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Lookup Expression</td>
                  <td className="py-3 px-4 text-teal-400">Core Function Call</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Evaluates Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed against target reference ranges.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Return Parameter</td>
                  <td className="py-3 px-4 text-teal-400">Vector / Scalar</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Extraction</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Delivers corresponding attribute with exact coordinate precision.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Error Handler</td>
                  <td className="py-3 px-4 text-teal-400">Resilience Wrapper</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Robustness</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Handles missing keys or out-of-bounds index requests gracefully.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Relational Scalar / Array Vector</span> dynamically extracted from the matching table record.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Computational Mechanics & Search Algorithms
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>In Microsoft Excel, Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed provides industrial-grade relational data extraction capabilities across enterprise workbooks.</p>
            <p>Understanding memory pointer traversal, binary search vs linear search, and dynamic array returns is vital for elite financial modeling.</p>
            <p>Always design lookup tables with clean, normalized data types to eliminate #N/A type mismatch exceptions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Memory Pointer Traversal</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel scans indices in memory to locate exact key matching coordinates, returning values from connected data vectors.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Column Insertion Immunity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Modern INDEX-MATCH and XLOOKUP bind directly to return column vectors, rendering formulas immune to inserted or deleted columns.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Engine: Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed Architecture &amp; Evaluation Mechanics
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m6_key" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m6_scan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m6_val" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m6_key)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Lookup Value</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Search Key: "EMP-1005"</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Unique Surrogate ID</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Search Query</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m6_scan)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Vector Matching</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Exact Match (0)</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Row Coordinate: 6</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">MATCH Index Found</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m6_val)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Attribute Return</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">₹ 85,000.00 (Salary)</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Zero Column Drift</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Target Extracted</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 2.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic10_Advantages_of_INDE"
            title="Module 2.5 - Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Kolkata Corporate Advantages of INDEX-MATCH over Implementation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Enterprise deployment of Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed across 500 corporate branch records.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Operation</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audited_Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Relational Retrieval</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% Exact verified match</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</div>
                <div className="text-emerald-400 font-semibold">Result: Flawless automated data retrieval.</div>
                <div className="text-slate-400 text-[11px]">Industrial lookup formulas streamline enterprise operations.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Academy Academic Records Matching</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Cross-referencing student exam results with fee payment status.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student_Key</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Lookup_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Payment_Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1002</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">PAID / CLEARED</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</div>
                <div className="text-emerald-400 font-semibold">Result: Instant administrative verification.</div>
                <div className="text-slate-400 text-[11px]">Lookups eliminate duplicate student records.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Wholesale Inventory SKU Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Matching warehouse physical counts against ERP system records.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU_Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Variance</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU-902</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0 Variance (Reconciled)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</div>
                <div className="text-emerald-400 font-semibold">Result: 100% stock reconciliation.</div>
                <div className="text-slate-400 text-[11px]">Automated lookups audit inventory variance rapidly.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Machine Quality Compliance Verification</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extracting ISO calibration expiry dates by Machine serial number.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Machine_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Lookup_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">ISO_Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-50</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">VALID (Calibrated)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</div>
                <div className="text-emerald-400 font-semibold">Result: Audit compliance certified.</div>
                <div className="text-slate-400 text-[11px]">Quality records extracted with coordinate precision.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Identify Search Key & Master Range</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Ensure the lookup value coordinate is specified and the master table is locked (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F4</kbd>) or formatted as an Excel Table.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Construct Resilient Lookup Formula</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter formula syntax (e.g. <code className="text-amber-300 font-mono">=INDEX(tblEmployees[Name], MATCH(A2, tblEmployees[Salary], 0))</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Embed Error Handling Wrapper</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Wrap in <code className="text-sky-300 font-mono">=IFERROR(formula, "Not Found")</code> to prevent unsightly <code className="text-rose-300 font-mono">#N/A</code> errors.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Audit Formula Evaluation (F9)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight the MATCH segment inside formula bar and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F9</kbd> to inspect the evaluated row index number.
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#N/A Error (Value Not Available)</td>
                  <td className="py-3 px-4 text-slate-300">Search key does not exist in the reference table.</td>
                  <td className="py-3 px-4 text-amber-300">Lookup key missing or misspelled.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Verify key spelling or wrap formula in =IFERROR(..., "Not Found").</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#REF! Error on Column Deletion</td>
                  <td className="py-3 px-4 text-slate-300">Deleting a column within a hardcoded VLOOKUP index range.</td>
                  <td className="py-3 px-4 text-amber-300">Column index exceeds table width.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Switch to resilient INDEX-MATCH or XLOOKUP.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#VALUE! Data Type Mismatch</td>
                  <td className="py-3 px-4 text-slate-300">Formula exceeds character limits or corrupt array dimensions.</td>
                  <td className="py-3 px-4 text-amber-300">Calculation engine throws syntax error.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Check argument count and syntax.</td>
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F4
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Lock coordinate range ($A$2:$F$100).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + M + V
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Step-by-Step Evaluate Formula dialog.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + `
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Formula Auditing view.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + Enter
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Legacy CSE array entry (if applicable in pre-365 Excel).</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed preferred in modern financial modeling over legacy hardcoded cell references?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel's calculation engine manage memory pointers during massive multi-row lookups?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the mathematical difference between linear O(n) table scanning and O(log n) binary search?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity &amp; Speed - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Master Advantages of INDEX-MATCH over VLOOKUP: Left Lookup, Column Insertion Immunity & Speed! Pay meticulous attention to coordinate anchoring with F4, verify key uniqueness, and leverage INDEX-MATCH or XLOOKUP for immune, boardroom-ready spreadsheet models!"
          />
        </div>
      </div>
    </div>
  );
}
