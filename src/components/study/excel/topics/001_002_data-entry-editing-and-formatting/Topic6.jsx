"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/data_entry_formatting.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    link.download = "data_entry_formatting_practice.xlsx";
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
              📝 Data Hygiene & Formatting · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Alignment, Text Wrapping, Center Across Selection vs Merge, and Executive Cell Styles
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master executive spreadsheet formatting: Text Wrapping (Alt+H+W), Vertical/Horizontal Alignment, Text Orientation, Indentation for financial hierarchy, why 'Center Across Selection' is 10x superior to dangerous 'Merge &amp; Center', and corporate Cell Styles.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Data Hygiene:</strong> Zero Text-Number Errors</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Custom Formatting:</strong> 4-Section Mask Engine</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Pattern Speed:</strong> AI Flash Fill (Ctrl + E)</span>
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
            Formatting Mask & Syntax Anatomy
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =CELL("alignment", A1)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Wrap Text</td>
                  <td className="py-3 px-4 text-teal-400">Multi-Line Display</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Layout</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Expands row height to display long text headers across multiple lines.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Center Across Selection</td>
                  <td className="py-3 px-4 text-teal-400">Non-Destructive Header</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Best Practice</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Centers title across columns A to F without merging or breaking column formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Cell Styles</td>
                  <td className="py-3 px-4 text-teal-400">Design System</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Consistency</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Pre-configured palette styles for Headers, Input cells, and Calculation totals.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Presentation Evaluation: </strong>
              Returns an optimized <span className="text-sky-300 font-semibold">Visual Layout &amp; Structural Alignment</span> while keeping underlying memory values 100% intact.
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
            Conceptual & Computational Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Merge &amp; Center physically fuses multiple cells into a single address (top-left cell), destroying all other cell addresses in that block.</p>
            <p>Merged cells break VBA automation, disable column sorting, break array formulas, and prevent single-column selection (Ctrl+Space).</p>
            <p>'Center Across Selection' (Format Cells &amp;rarr; Alignment &amp;rarr; Horizontal: Center Across Selection) visually achieves the exact same title centering while keeping every column 100% intact!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Memory vs Display Layer Separation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel completely decouples raw data values stored in floating-point memory from the cosmetic formatting mask applied to the screen.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Inductive Pattern Matching</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Flash Fill inspects token sequences, word boundaries, and punctuation delimiters to synthesize reproducible string transformation rules.
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
            Visual Formatting Flow: Merge &amp; Center (Destructive) vs Center Across Selection (Safe Architecture)
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m2_input" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m2_mask" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m2_render" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m2_input)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Raw Memory Value</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Number: 14500000</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Date Serial: 46261</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">IEEE 754 Float</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m2_mask)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Formatting Mask</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">₹ #,##,##0.00</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">₹ 0.00,, " Cr"</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">4-Section Engine</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m2_render)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Rendered Display</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">₹ 1.45 Cr</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">27-Aug-2026</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Zero Math Drift</text>
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
              title="Download full .xlsx master workbook for Module 1.2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0_Data_Types"
            title="Module 1.2 - Alignment, Text Wrapping, Center Across Selection vs Merge, and Executive Cell Styles"
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
                <h3 className="text-base font-bold text-white">Kolkata Corporate Financial Balance Sheet Title Centering</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Centering 'CODER &amp; ACCOTAX ANNUAL BALANCE SHEET' across columns A to G without breaking column sorting.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Method_Used</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Appearance</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column_Sorting_Viable?</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">VBA_Macro_Safe?</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Merge &amp; Center (A1:G1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Centered Title</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">NO (Sorting blocked with error)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">NO (Throws runtime error)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Center Across Selection</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Centered Title</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">YES (100% Sortable)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">YES (100% Macro Safe)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Format Cells (Ctrl+1) &amp;rarr; Alignment &amp;rarr; Horizontal: Center Across Selection</div>
                <div className="text-emerald-400 font-semibold">Result: Executive centered banner with zero structural grid damage.</div>
                <div className="text-slate-400 text-[11px]">Center Across Selection is the universal standard in elite financial modeling.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Student Ledger Hierarchical Indentation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Structuring chart of accounts with Parent Accounts and indented Sub-Ledgers.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Account_Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Account_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Indent_Level</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Hierarchy</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Current Assets</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0 Indent</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Bold Parent Category</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1010</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">   Cash in Hand</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1 Indent (Alt+H+6)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sub-Ledger</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1020</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">   State Bank of India</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1 Indent (Alt+H+6)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sub-Ledger</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Home Tab &amp;rarr; Increase Indent (Alt + H + 6)</div>
                <div className="text-emerald-400 font-semibold">Result: Clean audited financial statement hierarchy without messy leading spaces.</div>
                <div className="text-slate-400 text-[11px]">Cell indentation maintains clean numerical searchability while creating clear visual structure.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Multi-Column Header Text Wrapping</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Fitting long descriptive headers ('Quarterly Gross Revenue After Trade Discount') without making columns 500 pixels wide.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Header_Text</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Wrap_Text_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Row_Height</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column_Width</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Quarterly Gross Revenue After Trade Discount</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Alt + H + W (Wrap Text)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Auto-expanded to 3 lines (45px)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Compact 16 characters width</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Alt + H + W (Wrap Text)</div>
                <div className="text-emerald-400 font-semibold">Result: Compact, print-friendly multi-line column header layout.</div>
                <div className="text-slate-400 text-[11px]">Text wrapping enables dense information displays without excessive horizontal scrolling.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Engineering Quality Inspection Rotated Headers</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Angling test parameter column headers by 45 degrees to save horizontal printable width.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Test_Parameter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Orientation_Angle</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Width_Saved</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tensile Strength (MPa)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45° Diagonal Angle (Alt+H+F+Q)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">65% narrower columns</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Format Cells &amp;rarr; Alignment &amp;rarr; Orientation: 45 Degrees</div>
                <div className="text-emerald-400 font-semibold">Result: Compact engineering quality matrix fitting perfectly on A4 printable width.</div>
                <div className="text-slate-400 text-[11px]">Header orientation angles maximize printable table density.</div>
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
                <h3 className="text-sm font-bold text-white">Select Target Range</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight raw data cells. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + 1</kbd> to open the Format Cells dialog window.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Category & Enter Mask</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Navigate to <strong>Custom</strong> and input the 4-section format mask (e.g. <code className="text-amber-300 font-mono">₹ #,##,##0.00;[Red]-₹ #,##0.00;"-";@</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Apply & AutoFit Columns</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click OK, then press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + H + O + I</kbd> to eliminate any <code className="text-rose-300 font-mono">###</code> width overflow.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Verify Underlying Value in Formula Bar</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click formatted cells to confirm that the raw unrounded float value remains preserved in the Formula Bar.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Cannot Sort Table Due to Merged Cells</td>
                  <td className="py-3 px-4 text-slate-300">Applying Merge &amp; Center on header rows or data cells inside a table.</td>
                  <td className="py-3 px-4 text-amber-300">Excel displays error: 'This operation requires the merged cells to be identically sized'.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Unmerge all cells, and apply 'Center Across Selection' for headers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Selecting One Column Highlights Entire Sheet</td>
                  <td className="py-3 px-4 text-slate-300">Merged cells span across multiple columns; pressing Ctrl+Space selects all spanned columns.</td>
                  <td className="py-3 px-4 text-amber-300">Cannot highlight Column C alone.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Unmerge the merged header block.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Text Cut Off at Cell Boundary</td>
                  <td className="py-3 px-4 text-slate-300">Adjacent cell contains data, and active cell does not have Wrap Text enabled.</td>
                  <td className="py-3 px-4 text-amber-300">Long text label appears truncated.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Alt + H + W to enable Wrap Text or widen column.</td>
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
                Alt + H + W
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Wrap Text on active cell or highlighted range.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + H + 6
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Increase Indent for financial statement hierarchy.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + H + 5
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Decrease Indent.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + 1 &amp;rarr; Alignment &amp;rarr; Center Across Selection
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Safely center titles across columns without merging.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why do Wall Street investment banks and corporate auditing firms strictly forbid the use of Merge &amp; Center?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does 'Center Across Selection' achieve visual centering while preserving independent cell coordinates A1, B1, C1?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is indenting cells with Alt+H+6 preferred over manually typing 3 space characters before the text?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Alignment, Text Wrapping, Center Across Selection vs Merge, and Executive Cell Styles - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Never, ever use Merge & Center! It breaks sorting, breaks VBA macros, and breaks array formulas. Always press Ctrl+1, go to Alignment, and select 'Center Across Selection'. Your spreadsheets will look identical but remain 100% robust and sortable!"
          />
        </div>
      </div>
    </div>
  );
}
