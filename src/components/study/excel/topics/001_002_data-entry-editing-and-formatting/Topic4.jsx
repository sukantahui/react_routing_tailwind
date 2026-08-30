"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_002_data_entry_editing_and_formatting_master.xlsx?url";
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
              📝 Data Hygiene & Formatting · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3 & 4: Apply & Analyze
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Mastering Custom Number Formatting: Currency (₹), Percentages, Accounting and Multi-Section Masks
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Unlock the full power of Excel's 4-section Custom Number Formatting engine: [Positive]; [Negative]; [Zero]; [Text]. Format Indian Rupee currency (₹ #,##,##0.00), abbreviated millions/crores, color codes ([Red], [Green]), and custom masking without altering underlying numerical values.
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
            Positive; Negative; Zero; Text
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Section 1 (Positive)</td>
                  <td className="py-3 px-4 text-teal-400">Format Mask</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rule applied when cell number is greater than zero (e.g. ₹ #,##0.00).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Section 2 (Negative)</td>
                  <td className="py-3 px-4 text-teal-400">Format Mask</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rule applied when cell number is negative (e.g. [Red](₹ #,##0.00)).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Section 3 (Zero)</td>
                  <td className="py-3 px-4 text-teal-400">Format Mask</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rule applied when cell number is exactly zero (e.g. "-" to blank out zeroes).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Section 4 (Text)</td>
                  <td className="py-3 px-4 text-teal-400">Format Mask</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rule applied when cell contains a text string (e.g. @ " (Client)").</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Presentation Evaluation: </strong>
              Returns an optimized <span className="text-sky-300 font-semibold">Visual Presentation Layer / Unaltered Memory Value</span> while keeping underlying memory values 100% intact.
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
            <p>Number formatting alters ONLY the visual presentation layer rendered on screen; the raw underlying number in memory remains completely unchanged for calculations.</p>
            <p>The 4 formatting sections are separated by semicolons: `Positive ; Negative ; Zero ; Text`.</p>
            <p>Trailing commas scale numbers down: a single trailing comma divides by 1,000 (Thousands), while two trailing commas divide by 1,000,000 (Millions) or 1,00,00,000 (Crores).</p>
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
            Visual Data Flow: 4-Section Custom Number Formatting Engine Architecture
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
            sheetName="Topic4_Number_Format"
            title="Module 1.2 - Mastering Custom Number Formatting: Currency (₹), Percentages, Accounting and Multi-Section Masks"
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
                <h3 className="text-base font-bold text-white">Kolkata Corporate Indian Lakhs &amp; Crores Boardroom Formatting</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Formatting large balance sheet assets in Crores (₹ 1.45 Cr) and Lakhs (₹ 7.5 L) without altering raw numbers.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Asset_Value</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Custom_Format_String</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formatted_Display</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Math_Preservation</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">14,500,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 0.00,, " Cr"</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1.45 Cr</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Underlying value remains 14500000</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">750,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 0.0, " L"</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 7.5 L</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Underlying value remains 750000</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Format String: ₹ 0.00,, " Cr"</div>
                <div className="text-emerald-400 font-semibold">Result: Clean boardroom-ready figures displayed without formula division.</div>
                <div className="text-slate-400 text-[11px]">Formatting avoids dividing by 10,000,000 in formulas, preserving full decimal precision for auditing.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Accounting Income Statement Zero Balance Blanking</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Displaying a clean dash ("-") instead of distracting 0.00 in trial balance ledgers.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Account_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Balance</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Format_String</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rendered_Output</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cash in Hand</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ #,##0.00;-₹ #,##0.00;"-";@</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 45,000.00</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Bank Overdraft</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">-12,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ #,##0.00;-₹ #,##0.00;"-";@</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">-₹ 12,000.00</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Petty Cash Reserve</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ #,##0.00;-₹ #,##0.00;"-";@</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">-</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: ₹ #,##0.00;-₹ #,##0.00;"-";@</div>
                <div className="text-emerald-400 font-semibold">Result: Zero balances rendered as clean professional dashes.</div>
                <div className="text-slate-400 text-[11px]">Blanking zeroes focuses executive attention on active revenue and expense accounts.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Sales Monthly Growth Color Highlighting</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Automatically displaying positive growth in Green and negative losses in Red without Conditional Formatting.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sales_Rep</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Profit_Margin_%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Custom_Format_Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rendered_Color</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0.145</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">[Green]+0.0%;[Red]-0.0%;"-"</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+14.5% (Green Text)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">-0.082</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">[Green]+0.0%;[Red]-0.0%;"-"</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">-8.2% (Red Text)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: [Green]+0.0%;[Red]-0.0%;"-"</div>
                <div className="text-emerald-400 font-semibold">Result: Instant high-contrast visual indicators with zero performance overhead.</div>
                <div className="text-slate-400 text-[11px]">Custom format color tags ([Red], [Green], [Blue]) format cells faster than conditional formatting rules.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Naihati Wholesale Phone Number and PIN Code Masking</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Formatting 6-digit postal PIN codes and 10-digit mobile numbers with prefix tags.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Number</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Custom_Format_Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rendered_Display</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">700122</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">"PIN-"000000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">PIN-700122</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">9830123456</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+91 #####-#####</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+91 98301-23456</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: +91 #####-##### and "PIN-"000000</div>
                <div className="text-emerald-400 font-semibold">Result: Professional masked identification tags displayed consistently.</div>
                <div className="text-slate-400 text-[11px]">Masking maintains pure numerical storage while displaying formatted human-readable labels.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Number Treated as Text After Hardcoding Currency Symbols</td>
                  <td className="py-3 px-4 text-slate-300">Typing 'Rs. 5000' or '₹ 5000' directly into the cell instead of applying Number Formatting.</td>
                  <td className="py-3 px-4 text-amber-300">Cell left-aligns; =SUM() ignores the cell and returns 0.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Enter pure number 5000, then press Ctrl+1 &amp;rarr; Custom &amp;rarr; type ₹ #,##0.00.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Negative Numbers Vanishing</td>
                  <td className="py-3 px-4 text-slate-300">Omitting the second section in a custom format code (e.g. typing '#,##0;;').</td>
                  <td className="py-3 px-4 text-amber-300">Negative values become completely invisible.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Provide all required sections: '#,##0;[Red]-#,##0;"-";@'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Losing Precision on Trailing Commas</td>
                  <td className="py-3 px-4 text-slate-300">Using trailing commas unintentionally divides the visual display by 1,000.</td>
                  <td className="py-3 px-4 text-amber-300">Number 50,000 displays as 50.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Remove trailing commas from the custom format code.</td>
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
                Ctrl + 1
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open the Format Cells dialog box directly to the Number tab.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + 4 ($)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Apply default Currency format with currency symbol and 2 decimals.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + 5 (%)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Apply default Percentage format.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + 1 (!)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Apply standard Number format with comma thousands separator and 2 decimals.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is custom number formatting preferred over dividing numbers by 10,000,000 in formula cells?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the difference between the '0' placeholder (forces leading zeros) and the '#' placeholder (optional digits)?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How do color tags like [Green] and [Red] in custom formats differ in performance from Conditional Formatting rules?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Mastering Custom Number Formatting: Currency (₹), Percentages, Accounting and Multi-Section Masks - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Master the 4-section custom format: Positive; Negative; Zero; Text! In corporate finance, never divide your numbers by 10 Lakhs in formulas just to make reports look pretty. Use ₹ 0.0,, ' Cr' so your underlying numbers remain 100% mathematically exact!"
          />
        </div>
      </div>
    </div>
  );
}
