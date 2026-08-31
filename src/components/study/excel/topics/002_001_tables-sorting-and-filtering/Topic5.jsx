"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
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
    link.download = "002_001_tables_sorting_and_filtering_master.xlsx";
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
        {/* SECTION 1: HERO HEADER & OVERVIEW */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📑 Structured Tables · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 &amp; 3: Understand &amp; Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Removing Duplicates & Unique Record Extraction Engine
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master single-column and multi-column duplicate removal in Excel. Explore the Data → Remove Duplicates feature, case-insensitivity rules, leading/trailing space pitfalls, and dynamic array =UNIQUE() extraction.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Deduplication:</strong> Data → Remove Duplicates (Alt + A + M)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Dynamic Unique:</strong> =UNIQUE(tbl[Column]) Spilling Array</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Data Cleanliness:</strong> TRIM() & CLEAN() Pre-Processing</span>
            </div>
          </div>
        </header>

        {/* SECTION 2: FORMULA & SYNTAX ANATOMY CARD */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Structured Referencing &amp; Table Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            Remove Duplicates: Alt + A + M  |  Dynamic Formula: =UNIQUE(tblCustomers[Customer_ID])
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Remove Duplicates</td>
                  <td className="py-3 px-4 text-teal-400">Data Tool</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Destructive Action</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Permanently deletes duplicate rows from dataset, keeping first occurrence.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Select All Columns</td>
                  <td className="py-3 px-4 text-teal-400">Dialog Setting</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Multi-Key Check</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Evaluates exact match across ALL selected columns simultaneously.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">=UNIQUE(array)</td>
                  <td className="py-3 px-4 text-teal-400">Dynamic Array Function</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Non-Destructive</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts distinct values into a dynamic spilling array without altering raw data.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Always create a backup copy of raw data before using destructive Remove Duplicates!
            </div>
          </div>
        </section>

        {/* SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Deduplication Mechanics & Unique Record Extraction Engine
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Duplicate records distort corporate analytics, leading to double-counted revenues, duplicate customer mailings, and inaccurate inventory metrics.</p>
            <p>Excel's Remove Duplicates feature scans designated columns: if two rows contain identical values in ALL selected columns, Excel deletes subsequent occurrences, keeping only the first row.</p>
            <p>For non-destructive unique extraction, modern Excel provides the =UNIQUE() dynamic array function, which generates a live, spill-updated list of unique items.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Destructive vs Non-Destructive</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Remove Duplicates permanently mutates source data, whereas =UNIQUE() extracts non-duplicate items live into a separate range.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Case-Insensitive String Matching</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel considers 'Kolkata' and 'KOLKATA' as duplicates. Hidden spaces or non-breaking spaces prevent matches.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Architecture: Raw Duplicate Stream to Clean Master Registry
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table_5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query_5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer_5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table_5)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Raw Data Stream</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Contains 1,000 Records</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">200 Duplicate Entries</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Raw Input</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query_5)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Deduplication Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Column Key Check</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Case-Insensitive Scan</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Remove Duplicates</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer_5)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Clean Registry</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">800 Unique Master Rows</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Zero Error Propagation</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Master List</text>
            </svg>
          </div>
        </section>

        {/* SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 2.1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX106"
            title="Module 2.1 - Removing Duplicates & Unique Record Extraction Engine"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES) */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal &amp; Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Titagarh Client Registry Deduplication</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Removing duplicate client profiles based on Client ID and Tax PAN number.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Initial_Rows</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Duplicates_Removed</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Clean_Total</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,200 Records</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">150 Duplicates</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,050 Unique Clients</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Data → Remove Duplicates → Select All Columns</div>
                <div className="text-emerald-400 font-semibold">Result: Clean client registry.</div>
                <div className="text-slate-400 text-[11px]">Selecting multiple columns enforces multi-key uniqueness.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Customer Email List Cleaning</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extracting distinct customer email addresses using =UNIQUE().</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Emails</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Spilled_List</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">500 Emails</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=UNIQUE(tblCustomers[Email])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">380 Unique Emails</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Dynamic Array =UNIQUE()</div>
                <div className="text-emerald-400 font-semibold">Result: Spilled unique email vector.</div>
                <div className="text-slate-400 text-[11px]">=UNIQUE() updates live when new customers are added.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Barrackpore Student Enrollment Verification</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Identifying students registered in multiple courses.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audit_Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1002</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Remove Duplicates (ID + Course)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Duplicate Regs Cleared</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Multi-Key Deduplication</div>
                <div className="text-emerald-400 font-semibold">Result: Clean enrollment roster.</div>
                <div className="text-slate-400 text-[11px]">Check student ID and course code together to detect double enrollment.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Inventory SKU Cleaning</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Trimming hidden spaces before running duplicate removal.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU_Input</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Pre-Clean</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Deduplication_Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">'SKU-101 '</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=TRIM(A4)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Exact Duplicate Matched</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: TRIM() → Remove Duplicates</div>
                <div className="text-emerald-400 font-semibold">Result: 100% accurate SKU count.</div>
                <div className="text-slate-400 text-[11px]">Hidden trailing spaces cause Excel to view identical text as unique.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH */}
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
                <h3 className="text-sm font-bold text-white">Backup Raw Data Worksheet</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Right-click worksheet tab → Move or Copy → Create a copy (Safeguard raw data).
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Dataset & Open Remove Duplicates</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click inside table. Press Alt + A + M to open Remove Duplicates dialog.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Configure Matching Key Columns</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Check column checkboxes defining uniqueness (e.g. Customer ID + Email).
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Execute & Confirm Deletion Summary</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click OK. Excel displays summary: 'X duplicate values found and removed; Y unique values remain'.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls &amp; Diagnostic Troubleshooting
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Identical-Looking Text Not Removed as Duplicate</td>
                  <td className="py-3 px-4 text-slate-300">Hidden leading/trailing spaces or non-breaking space characters.</td>
                  <td className="py-3 px-4 text-amber-300">Test cell lengths with =LEN().</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Apply =TRIM(CLEAN(cell)) to strip invisible spaces before deduplicating.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Remove Duplicates Deleted Important Data</td>
                  <td className="py-3 px-4 text-slate-300">Only 1 column was checked in dialog instead of full composite key.</td>
                  <td className="py-3 px-4 text-amber-300">Undo immediately (Ctrl + Z).</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Select all key columns defining record uniqueness before clicking OK.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">=UNIQUE() Returns #SPILL! Error</td>
                  <td className="py-3 px-4 text-slate-300">Cell range below =UNIQUE() formula contains text or formatting obstacles.</td>
                  <td className="py-3 px-4 text-amber-300">Inspect cells below formula.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Clear all content in the spill path.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips &amp; High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + M
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Data → Remove Duplicates dialog instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Z
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Undo accidental duplicate deletion immediately.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                =UNIQUE()
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Extract non-destructive unique list using dynamic array formula.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                =TRIM()
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Remove leading and trailing spaces before deduplicating.</p>
            </div>
          </div>
        </section>

        {/* SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...") */}
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is running =TRIM() essential prior to removing duplicate text records?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the operational risk of using destructive Remove Duplicates vs non-destructive =UNIQUE()?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel evaluate record uniqueness when multiple column checkboxes are selected?</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS) */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Removing Duplicates & Unique Record Extraction - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* SECTION 12: TEACHER'S NOTE & EXAM WISDOM */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Removing Duplicates & Unique Record Extraction Engine"
            noteTitle="Sukanta Hui's Master Mentor Guide"
            mentorAdvice="Always duplicate your worksheet tab before running Data → Remove Duplicates! Remove Duplicates is a destructive operation. Keeping a raw backup sheet ensures you can verify deleted records against audit logs!"
            note="Master deduplication mechanics! Use TRIM() to clean hidden text spaces and leverage =UNIQUE() for live, non-destructive summary lists!"
          />
        </div>
      </div>
    </div>
  );
}
