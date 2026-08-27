"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/data_entry_formatting.xlsx?url";
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
              📝 Data Hygiene & Formatting · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Efficient Data Entry Techniques, AutoComplete, Pick from Drop-Down and Keyboard Shortcuts
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master lightning-fast data entry workflows: AutoComplete matching, Alt + Down Arrow Pick from List drop-downs, Ctrl + D Fill Down, Ctrl + R Fill Right, Ctrl + ; current date stamping, and Enter vs Tab directional movement.
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
            =IF(entry="Keyboard", "5x Faster", "Mouse Drag")
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ctrl + D</td>
                  <td className="py-3 px-4 text-teal-400">Fill Down</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Productivity</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Copies formula, value, and formatting from the cell directly above.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ctrl + R</td>
                  <td className="py-3 px-4 text-teal-400">Fill Right</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Productivity</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Copies formula, value, and formatting from the cell directly to the left.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Alt + Down</td>
                  <td className="py-3 px-4 text-teal-400">Pick from List</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Data Entry</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Displays a clean drop-down list of all unique text entries already present in the column.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Presentation Evaluation: </strong>
              Returns an optimized <span className="text-sky-300 font-semibold">High-Speed Data Entry Workflow</span> while keeping underlying memory values 100% intact.
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
            <p>AutoComplete scans the contiguous text values directly above the active cell and suggests matches as soon as a unique character prefix is typed.</p>
            <p>Alt + Down Arrow generates an in-memory unique list of all text values in the current column block, allowing mouse-free selection and eliminating spelling typos.</p>
            <p>Pressing Enter moves cursor Down, Shift + Enter moves Up, Tab moves Right, and Shift + Tab moves Left. When a bounding range is pre-selected, Enter wraps automatically to the next row.</p>
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
            Visual Formatting Flow: Keyboard Directional Flow & Bounding Box Data Entry
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
            title="Module 1.2 - Efficient Data Entry Techniques, AutoComplete, Pick from Drop-Down and Keyboard Shortcuts"
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
                <h3 className="text-base font-bold text-white">Barrackpore Student Department Tagging via Alt + Down Arrow</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Entering student departments across 100 rows without typing repetitive words.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Row_No</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Action_Sequence</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Key_Combination</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Speed_Advantage</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Row 15</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Press Alt + Down Arrow -> Select 'Taxation & GST'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Alt + Down -> Enter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% spelling accuracy, zero typos</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Alt + Down Arrow Pick List</div>
                <div className="text-emerald-400 font-semibold">Result: 100 student departments populated with perfect categorical consistency.</div>
                <div className="text-slate-400 text-[11px]">Using Alt+Down guarantees uniform spelling, preventing broken PivotTable category groupings.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Retail Cashier Instant Timestamp Logging</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A billing cashier stamps the current date and time upon generating customer receipts.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Billing_Step</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Key_Shortcut</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Generated_Value</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dynamic_vs_Static</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Stamp Current Date</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + ; (Semicolon)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">27-Aug-2026</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Static Permanent Date Stamp</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Stamp Current Time</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + Shift + : (Colon)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">14:45</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Static Permanent Time Stamp</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Ctrl + ; and Ctrl + Shift + :</div>
                <div className="text-emerald-400 font-semibold">Result: Permanent un-shifting audit timestamps captured instantly.</div>
                <div className="text-slate-400 text-[11px]">Keyboard date stamps insert static values that will not change tomorrow unlike =TODAY().</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Factory Batch Parameter Duplication via Ctrl + D</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Copying batch production date and supervisor name down 50 rows.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Selection_Range</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Shortcut_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Time_Taken</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">B2:C50 selected</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + D (Fill Down)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0.1 seconds</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All 50 rows populated with identical batch header</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Ctrl + D Fill Down</div>
                <div className="text-emerald-400 font-semibold">Result: 48 rows filled in a fraction of a second.</div>
                <div className="text-slate-400 text-[11px]">Ctrl+D eliminates repetitive copy-paste keystrokes.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Naihati Logistics Bounding Box Fast Ledger Entry</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Entering 200 rows of 3 columns (Qty, Rate, Total) without touching the arrow keys.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Workflow_Technique</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Navigation_Behavior</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Efficiency_Gain</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Pre-select range A2:C200 -> Type data -> Press Tab -> Tab -> Enter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Enter automatically wraps cursor to start of next row</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">3x faster than manual arrow key navigation</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Bounding Box Entry (Tab + Enter)</div>
                <div className="text-emerald-400 font-semibold">Result: 600 cells populated with zero mouse or arrow key redirection.</div>
                <div className="text-slate-400 text-[11px]">Pre-selecting a data grid constrains cursor movement to the active table block.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Accidental Date Drift with =TODAY()</td>
                  <td className="py-3 px-4 text-slate-300">Using dynamic =TODAY() function for historical ledger entries instead of static shortcut Ctrl+;.</td>
                  <td className="py-3 px-4 text-amber-300">Yesterday's voucher date updates to today's date when file is reopened.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use Ctrl + ; to stamp static historical transaction dates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">AutoComplete Broken by Blank Row</td>
                  <td className="py-3 px-4 text-slate-300">An empty row in the table breaks contiguous scan buffer for AutoComplete.</td>
                  <td className="py-3 px-4 text-amber-300">Excel stops suggesting department names after row 25.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Keep tables contiguous without blank dummy rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Caps Lock / Inconsistent Casing</td>
                  <td className="py-3 px-4 text-slate-300">Typing 'Kolkata', 'kolkata', 'KOLKATA' inconsistently across rows.</td>
                  <td className="py-3 px-4 text-amber-300">PivotTables and Filters split data into 3 separate groups.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use Alt + Down Arrow pick list or clean with =PROPER(A1).</td>
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
                Ctrl + ;
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert current date as a static, permanent timestamp.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + :
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert current time as a static, permanent timestamp.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + D
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Fill Down: Copy value and formula from cell directly above.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Down Arrow
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Pick from Drop-Down list of unique text entries in current column.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is a static date stamp (Ctrl+;) preferred over =TODAY() for financial ledger entries?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does pre-selecting a range before data entry change the behavior of the Enter key?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What causes AutoComplete to suggest words from the column above but never from adjacent columns?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Efficient Data Entry Techniques, AutoComplete, Pick from Drop-Down and Keyboard Shortcuts - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Speed in accounting and data modeling begins at data entry! Never type the current date manually—press Ctrl+; in a split second. Use Alt+Down Arrow to pick repeated vendor or department names with 100% spelling precision."
          />
        </div>
      </div>
    </div>
  );
}
