"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
    link.download = "getting_started_practice.xlsx";
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
              📊 Excel Foundations · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            High-Speed Navigation: Keyboard Shortcuts, Range Selection, Name Box Teleportation &amp; Go To Special
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master lightning-fast keyboard spreadsheet navigation: Ctrl + Arrow edge traversal, Ctrl + Shift range selection, Name Box coordinate teleportation, and F5 / Ctrl+G Go To Special for selecting blanks, formulas, and constants.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Grid Precision:</strong> 1,048,576 Rows × 16,384 Columns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Calculation:</strong> Multi-Threaded Engine</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Industrial:</strong> Accounting & MIS Standard</span>
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
            Formula Anatomy & Structure
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =ADDRESS(ROW(), COLUMN())
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ctrl + Arrows</td>
                  <td className="py-3 px-4 text-teal-400">Edge Traversal</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Navigation</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Jumps instantly to the last contiguous non-empty cell in any direction.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ctrl + Shift + Arrows</td>
                  <td className="py-3 px-4 text-teal-400">Range Selection</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Selection</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Expands highlight selection to the boundary of the contiguous data block.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Go To Special (F5)</td>
                  <td className="py-3 px-4 text-teal-400">Filter Selector</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Auditing</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Selects specific cell types (Blanks, Formulas, Constants, Visible Cells Only).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Cell Coordinate Address / Navigation Target</span> directly to the active cell coordinates.
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
            Deep Theoretical Mechanics & Grid Architecture
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Ctrl + Arrow keys scan the underlying memory array and jump past contiguous populated cells until an empty cell boundary is reached.</p>
            <p>The Name Box (top-left of the formula bar) allows direct coordinate input (e.g. typing 'B5000' and pressing Enter teleports the cursor immediately).</p>
            <p>Go To Special (F5 → Alt+S) performs array filtering directly in the DOM, allowing batch operations such as filling all blank cells in a 10,000-row column simultaneously.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Memory Allocation Model</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel uses sparse array memory storage. Only cells with explicit data or formula entries consume RAM, keeping 1M-row sheets lightweight.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Calculation Dependency Chain</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Formulas are compiled into a Directed Acyclic Graph (DAG). When an input cell changes, only its downstream dependents recalculate.
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
            Visual Calculation Flow: Keyboard Vector Traversal &amp; Boundary Jump Mechanics
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="calcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="outGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Node 1: Grid Input */}
              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#gridGrad)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Grid Architecture</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Rows: 1 to 1,048,576</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Columns: A to XFD (16,384)</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Cell Address: A1, B2, C10</text>

              {/* Arrow 1 */}
              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              {/* Node 2: Calculation Engine */}
              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#calcGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Calculation Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Lexical Parser & Formula Tree</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Threaded Evaluation</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">DAG Dependency Chain</text>

              {/* Arrow 2 */}
              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              {/* Node 3: Result Rendering */}
              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#outGrad)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Screen Render</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Formatted Number / Currency</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Instant KPI Display</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Dynamic Sheet Updates</text>
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
              title="Download full .xlsx master workbook for Module 1.1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic5"
            title="Module 1.1 - High-Speed Navigation: Keyboard Shortcuts, Range Selection, Name Box Teleportation &amp; Go To Special"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Excel File Formats &amp; Security Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing .xlsx, .xlsm, .xlsb, .csv, .pdf exports, and Backstage security configurations.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              20 Real-World Examples
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-3 w-16">ID</th>
                  <th className="py-3 px-3">Business Application</th>
                  <th className="py-3 px-3">File Format / Security Feature</th>
                  <th className="py-3 px-3">Applied Configuration</th>
                  <th className="py-3 px-3">Target Extension / State</th>
                  <th className="py-3 px-3">Key Technical Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata CA General Audit Model</td>
                  <td className="py-2.5 px-3 text-sky-300">Standard OpenXML Workbook</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xlsx`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xlsx` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Standard XML container ensuring high macro-free security.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Payroll Macro Generator</td>
                  <td className="py-2.5 px-3 text-sky-300">Macro-Enabled Workbook</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xlsm`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xlsm` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Preserves VBA automation code without stripping modules.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Supermarket 80MB Model</td>
                  <td className="py-2.5 px-3 text-sky-300">Excel Binary Workbook</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xlsb`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xlsb` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Reduces file size by 50% and loads 4x faster.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Database Export</td>
                  <td className="py-2.5 px-3 text-sky-300">Comma-Separated Values</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.csv`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.csv` Text</td>
                  <td className="py-2.5 px-3 text-slate-300">Flat text file for SQL database ingestion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Boardroom Report</td>
                  <td className="py-2.5 px-3 text-sky-300">PDF Fixed Document Export</td>
                  <td className="py-2.5 px-3 text-amber-300">Export → Create PDF/XPS</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.pdf` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Un-editable visual report preserving exact print layout.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Mill Legacy Unix Ingestion</td>
                  <td className="py-2.5 px-3 text-sky-300">Tab Delimited Text</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.txt` (Tab delimited)</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.txt` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Interoperable with mainframe batch processing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Pharmacy Old PC Compatibility</td>
                  <td className="py-2.5 px-3 text-sky-300">Excel 97–2003 Format</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xls`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xls` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Backwards compatibility for legacy Office installation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Store Master Invoice Template</td>
                  <td className="py-2.5 px-3 text-sky-300">Excel Template File</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xltx`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xltx` Template</td>
                  <td className="py-2.5 px-3 text-slate-300">Opens a fresh un-saved copy preventing template overwrite.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Macro Invoice Template</td>
                  <td className="py-2.5 px-3 text-sky-300">Macro-Enabled Template</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.xltm`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.xltm` Template</td>
                  <td className="py-2.5 px-3 text-slate-300">Combines master template behavior with embedded VBA.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel OpenSource Exchange</td>
                  <td className="py-2.5 px-3 text-sky-300">OpenDocument Spreadsheet</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → `.ods`</td>
                  <td className="py-2.5 px-3 text-emerald-400">`.ods` File</td>
                  <td className="py-2.5 px-3 text-slate-300">Complies with open-source software standards.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Power Confidential Audit Lock</td>
                  <td className="py-2.5 px-3 text-sky-300">Backstage Encrypt with Password</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Protect Workbook</td>
                  <td className="py-2.5 px-3 text-emerald-400">AES-256 Encrypted</td>
                  <td className="py-2.5 px-3 text-slate-300">Locks workbook behind mandatory password prompt.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea AutoRecover Configuration</td>
                  <td className="py-2.5 px-3 text-sky-300">Backstage Save Interval</td>
                  <td className="py-2.5 px-3 text-amber-300">Options → Save → Every 3 Min</td>
                  <td className="py-2.5 px-3 text-emerald-400">3 Min Auto-Save</td>
                  <td className="py-2.5 px-3 text-slate-300">Minimizes unsaved data loss during sudden crashes.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Port Final Audit Distribution</td>
                  <td className="py-2.5 px-3 text-sky-300">Mark as Final Command</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Mark as Final</td>
                  <td className="py-2.5 px-3 text-emerald-400">Read-Only Banner</td>
                  <td className="py-2.5 px-3 text-slate-300">Disables editing controls signaling completed state.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Hidden Comment Scrub</td>
                  <td className="py-2.5 px-3 text-sky-300">Inspect Document Privacy Check</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Inspect Document</td>
                  <td className="py-2.5 px-3 text-emerald-400">Metadata Scrubbed</td>
                  <td className="py-2.5 px-3 text-slate-300">Removes author tags, hidden comments, and revision logs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Screen Reader Check</td>
                  <td className="py-2.5 px-3 text-sky-300">Check Accessibility Audit</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Check Accessibility</td>
                  <td className="py-2.5 px-3 text-emerald-400">Alt Text Verified</td>
                  <td className="py-2.5 px-3 text-slate-300">Ensures charts contain Alt Text for screen reader accessibility.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Library Feature Downgrade Check</td>
                  <td className="py-2.5 px-3 text-sky-300">Check Compatibility Wizard</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Check Compatibility</td>
                  <td className="py-2.5 px-3 text-emerald-400">Warnings Flagged</td>
                  <td className="py-2.5 px-3 text-slate-300">Flags features unsupported in older .xls Excel versions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Trust Center Folder</td>
                  <td className="py-2.5 px-3 text-sky-300">Trusted Locations Whitelist</td>
                  <td className="py-2.5 px-3 text-amber-300">Options → Trust Center → Locations</td>
                  <td className="py-2.5 px-3 text-emerald-400">Folder Trusted</td>
                  <td className="py-2.5 px-3 text-slate-300">Allows macros in specified directory to run automatically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Seed External Link Shield</td>
                  <td className="py-2.5 px-3 text-sky-300">External Content Security Bar</td>
                  <td className="py-2.5 px-3 text-amber-300">Trust Center → External Content</td>
                  <td className="py-2.5 px-3 text-emerald-400">Prompt Mode Active</td>
                  <td className="py-2.5 px-3 text-slate-300">Blocks unauthorized background workbook data links.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Author Tagging</td>
                  <td className="py-2.5 px-3 text-sky-300">Document Properties Metadata</td>
                  <td className="py-2.5 px-3 text-amber-300">File → Info → Properties → Author</td>
                  <td className="py-2.5 px-3 text-emerald-400">`Sukanta Hui` Tagged</td>
                  <td className="py-2.5 px-3 text-slate-300">Establishes copyright ownership metadata inside workbook.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">FF-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft Write Password Lock</td>
                  <td className="py-2.5 px-3 text-sky-300">Password-to-Modify Guard</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As → Tools → General Options</td>
                  <td className="py-2.5 px-3 text-emerald-400">Write Password Set</td>
                  <td className="py-2.5 px-3 text-slate-300">Allows public reading but restricts editing to key-holders.</td>
                </tr>
              </tbody>
            </table>
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
                <h3 className="text-sm font-bold text-white">Data Entry & Coordinate Setup</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter student/customer raw transaction values into clean column headers starting at cell A1. Ensure numbers contain no rogue text spaces.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Engage Calculation Engine</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Type <code className="text-sky-300 font-mono">=</code> followed by the target formula (e.g. <code className="text-amber-300 font-mono">=SUM(B2:D2)</code>). Observe syntax tooltips.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Autofill & Relative Drag</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Double-click the fill handle at the bottom-right corner of the active cell to copy the formula down the entire dataset column.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Audit & Reconcile Totals</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + `</kbd> to inspect all formula definitions and verify aggregate consistency.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Ctrl + Arrow Stops Prematurely</td>
                  <td className="py-3 px-4 text-slate-300">An accidental empty cell in the middle of a 10,000-row data column breaks contiguous edge detection.</td>
                  <td className="py-3 px-4 text-amber-300">Cursor stops at row 452 instead of row 10,000.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Inspect column for rogue blanks, or use Ctrl+End / Name Box to jump to the true bottom.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Accidentally Overwriting Data with Ctrl+Enter</td>
                  <td className="py-3 px-4 text-slate-300">Pressing Ctrl+Enter with multiple cells selected fills all of them with the active cell's text.</td>
                  <td className="py-3 px-4 text-amber-300">Entire highlighted block becomes identical.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Ctrl + Z immediately to undo.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Hidden Rows Pasted Accidental</td>
                  <td className="py-3 px-4 text-slate-300">Copying collapsed or filtered ranges without verifying visible cell selection.</td>
                  <td className="py-3 px-4 text-amber-300">Pasted table contains unexpected extra rows.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Alt + ; before pressing Ctrl + C to guarantee only visible cells are copied.</td>
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
                Ctrl + Arrow Keys
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Jump to the edge of the current data region in any of the 4 directions.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + Arrows
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select contiguous blocks of cells from active position to the edge boundary.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap"><kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">F5</kbd><span className="text-purple-300 font-mono text-xs font-semibold">→ Alt + S</span></div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Go To Special dialog for precision cell filtering (Blanks, Formulas, etc.).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + ;
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select Visible Cells Only (prevents copying hidden or filtered rows).</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does Ctrl+Enter behave differently from Enter when multiple disjoint cells are selected?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel's boundary detection algorithm distinguish between an empty cell and a cell containing an empty string ("" )?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the mathematical principle behind Go To Special → Differences (Row/Column differences) in formula auditing?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="High-Speed Navigation: Keyboard Shortcuts, Range Selection, Name Box Teleportation &amp; Go To Special - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Throw away the mouse for navigation! Master Ctrl+Arrows and Ctrl+Shift+Arrows. When cleaning messy client data, F5 → Special → Blanks combined with Ctrl+Enter is the single most powerful productivity technique in spreadsheet engineering."
          />
        </div>
      </div>
    </div>
  );
}
