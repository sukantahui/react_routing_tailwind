"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_002_data_entry_editing_and_formatting_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
              📝 Data Hygiene & Formatting · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            AutoFill Magic, Custom Lists and AI-Powered Flash Fill (Ctrl + E) Pattern Intelligence
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Harness Excel's data transformation engines: AutoFill series extension (months, weekdays, linear sequences, exponential trends), Custom Lists creation, and AI pattern-matching Flash Fill (Ctrl + E) to split, concatenate, clean, and reformat dirty data without writing complex formulas.
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
            =FLASH_FILL(pattern, source_column)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Flash Fill (Ctrl+E)</td>
                  <td className="py-3 px-4 text-teal-400">AI Pattern Engine</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Data Cleaning</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Detects transformation patterns from 1 user example and applies across entire column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">AutoFill Handle</td>
                  <td className="py-3 px-4 text-teal-400">Drag Corner</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Series Fill</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Bottom-right cell square that extends dates, numbers, and custom lists.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Custom Lists</td>
                  <td className="py-3 px-4 text-teal-400">Registry Series</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Customization</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">User-defined text cycles (e.g. Barrackpore, Shyamnagar, Ichapur, Naihati).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Presentation Evaluation: </strong>
              Returns an optimized <span className="text-sky-300 font-semibold">Pattern-Extracted Array / Clean Text</span> while keeping underlying memory values 100% intact.
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
            <p>Flash Fill uses inductive program synthesis algorithms. It analyzes the character-level transformation between an input column and your sample output to generate an internal transformation rule.</p>
            <p>AutoFill inspects selected numerical or date intervals to determine step values (e.g. selecting 10 and 20 extends as 30, 40, 50).</p>
            <p>Custom Lists are stored in Excel's global registry, enabling automatic repetitive cycling of branch names or department names in any new workbook.</p>
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
            Visual Data Flow: Flash Fill Inductive Pattern Synthesis &amp; Series Drag Mechanics
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="t2_sample" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="t2_synth" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="t2_propagate" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#t2_sample)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Exemplar Exemplar</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Input: "Hui, Sukanta"</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Target Output: "Sukanta"</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">User Sample Pair</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#t2_synth)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Inductive Pattern AI</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Extracts Token Rule: Word 2</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Custom List / Linear Trend</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Flash Fill Engine (Ctrl + E)</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#t2_propagate)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Auto-Propagation</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Fills 10,000+ Rows Instantly</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Preserves Memory State</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Instant Transformation</text>
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
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic2"
            title="Module 1.2 - AutoFill Magic, Custom Lists and AI-Powered Flash Fill (Ctrl + E) Pattern Intelligence"
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
                <h3 className="text-base font-bold text-white">Kolkata Corporate Full Name Splitting into First &amp; Last Names</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Splitting 500 employee full names (e.g. 'Swadeep Mukherjee') into First and Last Name columns.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Full_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">First_Name (Sample)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Flash_Fill_Trigger</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Extracted_Last_Name</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep Mukherjee</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Press Ctrl + E</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mukherjee</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina Banerjee</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">(Auto-Extracted)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Banerjee</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Abhronila Sengupta</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">(Auto-Extracted)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Abhronila</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sengupta</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Type 'Swadeep' → Press Ctrl + E</div>
                <div className="text-emerald-400 font-semibold">Result: All 500 first and last names extracted in 1 second with zero formulas.</div>
                <div className="text-slate-400 text-[11px]">Flash Fill recognizes the delimiter space and extracts sub-strings automatically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Mobile Number International Formatting Masking</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Reformatting raw 10-digit mobile numbers (9830123456) into +91 98301-23456 format.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Mobile</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sample_Formatted_Output</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Flash_Fill_Key</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">9830123456</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+91 98301-23456</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + E</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All numbers formatted with country code and hyphen</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Type '+91 98301-23456' in B2 → Press Ctrl + E</div>
                <div className="text-emerald-400 font-semibold">Result: 500 phone numbers formatted with international prefixes instantly.</div>
                <div className="text-slate-400 text-[11px]">Flash Fill applies string injection templates across massive datasets effortlessly.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">North 24 Parganas Custom Branch Office AutoFill List</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Creating a custom list for Barrackpore, Shyamnagar, Ichapur, Naihati, Titagarh.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Custom_List_Entry</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Drag_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Generated_Sequence</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Type 'Barrackpore' in cell A1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Drag AutoFill handle down 5 rows</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Populates Shyamnagar, Ichapur, Naihati, Titagarh automatically</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: File → Options → Advanced → Edit Custom Lists</div>
                <div className="text-emerald-400 font-semibold">Result: Instant local geography cycling in all future workbooks.</div>
                <div className="text-slate-400 text-[11px]">Custom lists speed up recurring regional reporting.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Industrial PAN Card and GSTIN Deconstruction</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extracting 10-character PAN cards from 15-character GSTIN numbers (e.g. 19ABCDE1234F1Z5 → ABCDE1234F).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">GSTIN_Number</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Extracted_PAN (Flash Fill)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audit_Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">19ABCDE1234F1Z5</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">ABCDE1234F</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Verified 100% Accurate</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">19XYZPQ5678M1Z2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">XYZPQ5678M</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Verified 100% Accurate</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Type 'ABCDE1234F' in B2 → Press Ctrl + E</div>
                <div className="text-emerald-400 font-semibold">Result: All PAN cards extracted from state-coded GSTIN numbers.</div>
                <div className="text-slate-400 text-[11px]">Flash Fill extracts fixed-position substring patterns without MID() formulas.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Flash Fill Inconsistent Middle Names</td>
                  <td className="py-3 px-4 text-slate-300">Names with middle names (e.g. 'Rahul Kumar Ghosh') break single-pattern assumptions.</td>
                  <td className="py-3 px-4 text-amber-300">Flash Fill extracts 'Kumar' as last name instead of 'Ghosh'.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Provide 2 or 3 examples covering single, double, and triple word names before pressing Ctrl+E.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">AutoFill Duplicating Instead of Incrementing</td>
                  <td className="py-3 px-4 text-slate-300">Dragging 1 single number cell defaults to Copy Cells instead of Fill Series.</td>
                  <td className="py-3 px-4 text-amber-300">Cell values remain 1, 1, 1, 1 instead of 1, 2, 3, 4.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Hold Ctrl while dragging, or select 2 starting cells (1 and 2) before dragging.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Flash Fill Modifying Raw Data Permanently</td>
                  <td className="py-3 px-4 text-slate-300">Flash Fill outputs static text literals rather than dynamic formulas.</td>
                  <td className="py-3 px-4 text-amber-300">Changes to source Column A do not update Column B automatically.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-run Ctrl+E after source data changes, or use dynamic text functions (=TEXTBEFORE, =TEXTAFTER).</td>
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
                Ctrl + E
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Flash Fill: Instantly detect pattern and populate active column.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Drag Handle
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Force AutoFill numerical sequence incrementing (+1, +2).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Right-Click Drag
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open context menu with Fill Days, Fill Weekdays, Fill Months, Fill Years.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Double-Click Handle
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Instantly AutoFill down to the exact bottom row of the adjacent table.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Flash Fill differ fundamentally from traditional spreadsheet functions like LEFT, MID, and RIGHT?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is providing 2 distinct examples recommended when data patterns contain variable length words?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How can Custom Lists be exported and shared across all accountant workstations in an organization?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="AutoFill Magic, Custom Lists and AI-Powered Flash Fill (Ctrl + E) Pattern Intelligence - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Flash Fill (Ctrl+E) is pure spreadsheet magic! When a client sends you messy data with combined names, codes, or telephone numbers, never waste hours writing complex text formulas. Give Excel one clean example in the adjacent column and press Ctrl+E!"
          />
        </div>
      </div>
    </div>
  );
}
