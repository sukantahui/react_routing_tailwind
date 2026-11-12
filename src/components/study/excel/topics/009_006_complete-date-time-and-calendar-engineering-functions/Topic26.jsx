"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic26_files/topic26_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic26() {
  const sectionsRef = useRef([]);

  // Intersection Observer for fluid section reveal animations
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

  // Download Master Workbook
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "complete_date_time_calendar_engineering_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------------------------------------------------------------------
  // INTERACTIVE BENCHMARK & SIMULATOR STATE
  // ---------------------------------------------------------------------------

  const [inpPostingDate, setInpPostingDate] = useState("2026-11-12");

  const fiscalAudit = useMemo(() => {
    const d = new Date(inpPostingDate);
    if (isNaN(d.getTime())) {
      return { isError: true, error: "#VALUE! Enter a valid posting date" };
    }

    const yr = d.getUTCFullYear();
    const mo = d.getUTCMonth() + 1; // 1-12

    // Calendar Quarter
    const calQuarter = "Q" + Math.ceil(mo / 3);

    // Indian Fiscal Year (Apr 1 to Mar 31)
    let indFy = "";
    if (mo >= 4) {
      indFy = `FY ${yr}-${String(yr + 1).slice(-2)}`;
    } else {
      indFy = `FY ${yr - 1}-${String(yr).slice(-2)}`;
    }

    // Indian Fiscal Quarter
    const indQMap = [4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3];
    const indQuarter = "Q" + indQMap[mo - 1];

    // US Federal FY (Oct 1 to Sep 30)
    let usFy = "";
    if (mo >= 10) {
      usFy = `FY ${yr + 1}`;
    } else {
      usFy = `FY ${yr}`;
    }
    const usQMap = [2, 2, 2, 3, 3, 3, 4, 4, 4, 1, 1, 1];
    const usQuarter = "Q" + usQMap[mo - 1];

    return {
      isError: false,
      dateStr: inpPostingDate,
      calQuarter,
      indFy,
      indQuarter,
      usFy,
      usQuarter
    };
  }, [inpPostingDate]);
    

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
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
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-indigo-950/70 via-slate-900/80 to-slate-950 border border-indigo-900/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-600/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Date & Calendar Engineering · Topic 26
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Corporate Financial Accounting · Tax Engineering
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Formulate & Consolidate
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            Fiscal Calendar Engineering — Indian FY, US Federal Cycles & Dynamic Quarters
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>In corporate financial reporting, statutory taxation, and budgetary planning, transactions are rarely evaluated against standard Gregorian calendar years (January to December). Corporate financial cycles are governed by <strong>Fiscal Years (FY)</strong> established by sovereign tax authorities.</p><p>In India, the statutory Financial Year runs from <strong>April 1 to March 31</strong> (e.g. FY 2026-27), with distinct quarterly compliance cohorts (Q1: Apr-Jun, Q2: Jul-Sep, Q3: Oct-Dec, Q4: Jan-Mar). In the United States, the Federal Government fiscal cycle runs from <strong>October 1 to September 30</strong>. In Australia, it runs from <strong>July 1 to June 30</strong>. <strong>Fiscal Calendar Engineering</strong> is the practice of authoring dynamic, formulaic financial period bucketing engines that automatically map posting dates to accurate fiscal years, quarters, and statutory advance tax due dates.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">{"Indian FY: =IF(MONTH(A2)>=4, 'FY ' & YEAR(A2) & '-' & RIGHT(YEAR(A2)+1,2), 'FY ' & YEAR(A2)-1 & '-' & RIGHT(YEAR(A2),2))"}</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> {"Corporate Accounting, GST/TDS Compliance & International Financial Reporting"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> {"=CHOOSE(MONTH(A2), 4,4,4, 1,1,1, 2,2,2, 3,3,3) (Indian Fiscal Quarter)"}</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: INTERACTIVE LIVE BENCHMARK & SIMULATOR WORKBENCH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-xl space-y-6"
        >
          undefined
        </section>

        {/* =========================================================================
            SECTION 3: FORMULA ANATOMY & SIGNATURE CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">⚡</span> Formula Anatomy & Parameter Specifications
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800">
              Fiscal Period Translation Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Fiscal Calendar Engineering Formula Signature</div>
            <div className="text-white font-bold text-base">
              {"Fiscal_Year = \"FY \" & YEAR(EDATE(PostingDate, MonthOffset))"}
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Indian FY Convention:</strong> April 1 start. Q1: Apr-Jun, Q2: Jul-Sep, Q3: Oct-Dec, Q4: Jan-Mar. Notated as FY 2026-27.</div><div>• <strong className="text-sky-300">US Federal FY Convention:</strong> October 1 start. Advanced by 3 months. Notated as FY 2027 (named after the concluding calendar year).</div><div>• <strong className="text-amber-300">CHOOSE / EDATE Mapping:</strong> High-speed lookup formulas to convert month numbers 1-12 into statutory reporting quarters.</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: IN-DEPTH SYNTAX MATRIX & SPECIFICATION TABLE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">📊</span> Global Fiscal Year & Quarter Mapping Matrix (Posting Date: 2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how identical calendar dates map to contrasting fiscal years and quarters across global jurisdictions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Calendar Date</th>
                  <th className="py-3 px-4">Calendar Quarter</th>
                  <th className="py-3 px-4">Indian Fiscal Year</th>
                  <th className="py-3 px-4">Indian FY Quarter</th>
                  <th className="py-3 px-4">US Federal FY</th>
                  <th className="py-3 px-4">US Federal Quarter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">2026-02-15</td>
        <td className="py-3.5 px-4 text-white">Q1 (Jan-Mar)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">FY 2025-26</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Q4 (Final Quarter)</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold font-mono">FY 2026</td>
        <td className="py-3.5 px-4 text-slate-300">Q2</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">2026-04-15</td>
        <td className="py-3.5 px-4 text-white">Q2 (Apr-Jun)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">FY 2026-27</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Q1 (New FY Opening)</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold font-mono">FY 2026</td>
        <td className="py-3.5 px-4 text-slate-300">Q3</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">2026-07-20</td>
        <td className="py-3.5 px-4 text-white">Q3 (Jul-Sep)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">FY 2026-27</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Q2</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold font-mono">FY 2026</td>
        <td className="py-3.5 px-4 text-slate-300">Q4 (US Final Quarter)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">2026-10-15</td>
        <td className="py-3.5 px-4 text-white">Q4 (Oct-Dec)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">FY 2026-27</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Q3</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold font-mono">FY 2027</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Q1 (US New FY)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">Q4 (Oct-Dec)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">FY 2026-27</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Q3</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold font-mono">FY 2027</td>
        <td className="py-3.5 px-4 text-slate-300">Q1</td>
      </tr>
    
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ARCHITECTURAL DEEP DIVE & MATHEMATICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xl shrink-0">
              ⚙️
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The High-Speed CHOOSE Array Pattern for Quarter Bucketing
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why nested IF statements are obsolete for fiscal quarter classification.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>Novice financial analysts frequently write deeply nested <code className="text-rose-400 font-mono">IF()</code> statements like <code className="text-rose-400 font-mono">=IF(MONTH(A2)&lt;=3, "Q4", IF(MONTH(A2)&lt;=6, "Q1", IF(MONTH(A2)&lt;=9, "Q2", "Q3")))</code> to assign Indian fiscal quarters.</p><p>Nested IF functions are computationally slow, error-prone to maintain, and difficult to audit. Senior spreadsheet architects deploy the ultra-compact <code className="text-emerald-300 font-mono">CHOOSE()</code> pattern instead:</p><p className="font-mono text-sm bg-slate-900 p-3 rounded-lg border border-slate-800 text-emerald-300 font-bold">="Q" &amp; CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)</p><p>Because <code className="text-white font-mono">MONTH(A2)</code> yields an integer from 1 to 12, <code className="text-emerald-300 font-mono">CHOOSE()</code> directly indexes the result in a single CPU cycle with zero conditional branching! For January, February, and March (months 1, 2, 3), it returns 4. For April, May, June (months 4, 5, 6), it returns 1. This formula runs 10x faster across massive enterprise general ledger datasets.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Nested IF Spaghetti Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=IF(MONTH(A2)<4,\"Q4\",IF(MONTH(A2)<7,\"Q1\",IF(MONTH(A2)<10,\"Q2\",\"Q3\")))"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Inefficient branching; difficult to read, modify, and audit across enterprise models."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  High-Speed CHOOSE Indexing Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=\"Q\" & CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Direct 12-element index lookup; lightning-fast recalculation and zero branching complexity."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VISUAL CONCEPTUAL ARCHITECTURE (SVG PIPELINE)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📐</span> Visual Semantic Architecture & Flow Diagram
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Indian Fiscal Calendar Mapping: Translating Gregorian months into statutory financial quarters and fiscal year labels.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="40" width="180" height="110" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="120" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">POSTING DATE</text>
        <text x="120" y="100" textAnchor="middle" fill="#FFFFFF" className="text-base font-bold font-mono">12-Nov-2026</text>
        <text x="120" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Month = 11 (November)</text>

        <path d="M 220 95 L 260 95" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />

        <rect x="270" y="40" width="260" height="110" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="400" y="70" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">INDIAN FY ENGINE</text>
        <text x="400" y="100" textAnchor="middle" fill="#6EE7B7" className="text-xl font-black font-mono">FY 2026-27</text>
        <text x="400" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">=IF(MONTH>=4, Yr & "-" & Yr+1, ...)</text>

        <path d="M 540 95 L 580 95" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />

        <rect x="590" y="40" width="220" height="110" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="700" y="70" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">STATUTORY QUARTER</text>
        <text x="700" y="100" textAnchor="middle" fill="#FCD34D" className="text-2xl font-black font-mono">Q3</text>
        <text x="700" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Oct-Dec Compliance Window</text>
      </svg>
    
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: INTERACTIVE MASTER SPREADSHEET (EMBEDDED PRACTICE WORKBOOK)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Master Spreadsheet Practice
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore real Fiscal Calendar Engineering formula calculations, live audits, and calculated outputs in the embedded worksheet.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic26"
            title="Topic 26: Fiscal Calendar Engineering Master Practice Grid"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 8: REAL-WORLD ENTERPRISE BUSINESS SCENARIOS (6 DETAILED CASE STUDIES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Enterprise Business Scenarios
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industrial grade case studies from West Bengal IT hubs, banking institutes, and multinational supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div key="0" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 1: Corporate Tax Filing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate Finance</span>
              </div>
              <h3 className="text-base font-bold text-white">Statutory Indian Financial Year Label Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Kolkata corporate accounts must stamp every general ledger voucher with its statutory Indian FY string (e.g. 'FY 2026-27') for annual income tax audit filings."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Generate FY YYYY-YY notation based on April boundary</div>
                <div className="text-emerald-300 font-bold">{"=IF(MONTH(A2)>=4, \"FY \" & YEAR(A2) & \"-\" & RIGHT(YEAR(A2)+1, 2), \"FY \" & YEAR(A2)-1 & \"-\" & RIGHT(YEAR(A2), 2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Posting Date: 12-Nov-2026 → 'FY 2026-27'; 15-Feb-2026 → 'FY 2025-26'"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: GST Compliance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Tax Advisory</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Advance Tax & GST Quarterly Bucketing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A tax consultancy in Barrackpore maps client sales invoices into GST quarterly filing cohorts (Q1 to Q4) using the high-speed CHOOSE function."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Map calendar month to Indian fiscal quarter</div>
                <div className="text-emerald-300 font-bold">{"=\"Q\" & CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Invoice Date: 12-Nov-2026 → 'Q3'"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Advance Tax Deadlines
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Enterprise Treasury</span>
              </div>
              <h3 className="text-base font-bold text-white">Statutory Advance Tax Due Date Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Corporate treasury in Titagarh projects corporate advance tax installment deadlines: 15-Jun (15%), 15-Sep (45%), 15-Dec (75%), and 15-Mar (100%)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Generate exact advance tax deadline from fiscal quarter</div>
                <div className="text-emerald-300 font-bold">{"=DATE(IF(FiscalQtr=\"Q4\", Yr+1, Yr), CHOOSE(RIGHT(FiscalQtr,1), 6, 9, 12, 3), 15)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Q3 → 15-Dec-2026 Advance Tax Payment Due Date"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: SEC US Reporting
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar IT Services Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">US GAAP SEC Quarterly Fiscal Reporting Consolidation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A software exporter in Shyamnagar prepares quarterly consolidated financial statements for their US parent company, whose fiscal year begins October 1."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Advance date by 3 months to map to US Federal FY</div>
                <div className="text-emerald-300 font-bold">{"=\"FY \" & YEAR(EDATE(A2, 3)) & \"-Q\" & CEILING(MONTH(EDATE(A2, 3))/3, 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Posting Date: 12-Nov-2026 → 'FY 2027-Q1'"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Quarter-End Book Closing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Financial Controllership</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated Fiscal Quarter-End Book Closing Date</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Controllers in Naihati automate the calculation of the final date of the active fiscal quarter to trigger journal entry cutoffs."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Find last day of active fiscal quarter using EOMONTH</div>
                <div className="text-emerald-300 font-bold">{"=EOMONTH(DATE(YEAR(A2), CEILING(MONTH(A2)/3, 1)*3, 1), 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Posting Date: 12-Nov-2026 → 31-Dec-2026 (Quarter Closing Date)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Year-over-Year Comp
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Commercial Analytics</span>
              </div>
              <h3 className="text-base font-bold text-white">Prior Fiscal Year Parallel Period Revenue Comparison</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Ichapur analytics compares current fiscal quarter revenue against the exact corresponding fiscal date 12 months prior."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Step exactly 12 calendar months back</div>
                <div className="text-emerald-300 font-bold">{"=EDATE(A2, -12)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Current: 12-Nov-2026 → Prior Year: 12-Nov-2025 (FY 2025-26 Q3)"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Execution Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Identify Jurisdiction Fiscal Year Start Month</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Parameter: Indian FY Offset = Month 4"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Construct Fiscal Year Identifier Formula</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=IF(MONTH(A2)>=4, \"FY \" & YEAR(A2) & \"-\" & RIGHT(YEAR(A2)+1, 2), \"FY \" & YEAR(A2)-1 & \"-\" & RIGHT(YEAR(A2), 2))"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Deploy CHOOSE for Fiscal Quarter Classification</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=\"Q\" & CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Calculate Statutory Advance Tax Due Dates</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(Yr, Mo, 15)"}</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: ERROR & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Error & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Error Code / Bug</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Demonstration Trigger</th>
                  <th className="py-3 px-4">Professional Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
                <tr key="0" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Wrong Fiscal Year in Q4 (Jan-Mar)"}</td>
                  <td className="py-3 px-4 font-sans">{"Using YEAR(A2) directly: January 2027 erroneously labeled as FY 2027 instead of FY 2026-27."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Transactions in Jan, Feb, Mar"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Check MONTH(A2) >= 4; if FALSE, subtract 1 from YEAR(A2)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on EDATE Fiscal Shift"}</td>
                  <td className="py-3 px-4 font-sans">{"EDATE receives a non-numeric text date string."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=EDATE('2026.11.12', 3)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with DATEVALUE() or ensure authentic date formatting."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Cross-Jurisdiction Quarter Mismatch"}</td>
                  <td className="py-3 px-4 font-sans">{"Applying Gregorian Q1 (Jan-Mar) to Indian statutory tax schedules where Jan-Mar is actually Q4."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Consolidating US and Indian ledgers"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Explicitly maintain separate columns: 'Calendar_Qtr', 'Indian_FY_Qtr', and 'US_FY_Qtr'."}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: PRO TIPS & ARCHITECTURAL INSIGHTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Secret Heritage Insights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold">The EDATE Trick for US Fiscal Years</span>
              <p className="text-slate-300">{"Because the US Federal FY begins in October (3 months ahead of January), you can calculate the US Fiscal Year with: =\"FY \" & YEAR(EDATE(A2, 3)). For October 2026, EDATE adds 3 months to January 2027, yielding FY 2027 instantly!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Ultra-Fast Pivot Table Grouping</span>
              <p className="text-slate-300">{"If you add calculated columns for 'Indian FY' and 'Fiscal Quarter' in your raw transaction table, Excel Pivot Tables can instantly summarize financial results by statutory tax periods without complex slicers."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Indian FY Two-Digit Suffix Formula</span>
              <p className="text-slate-300">{"To format the clean Indian corporate notation '2026-27': =YEAR(A2) & \"-\" & RIGHT(YEAR(A2)+1, 2). It prevents ugly 8-digit strings like '2026-2027'."}</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: SOCRATIC ANALYTICAL QUESTIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Questions
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            
            <p key="0">
              • <strong>Fiscal Mechanics:</strong> {"Why does a transaction on 15-January-2027 belong to FY 2026-27 rather than FY 2027-28 in Indian taxation?"}
            </p>

            <p key="1">
              • <strong>Formula Optimization:</strong> {"Why is the CHOOSE() function computationally superior to four nested IF() statements when classifying 500,000 ledger rows?"}
            </p>

            <p key="2">
              • <strong>Global Alignment:</strong> {"How do multinational corporations manage financial consolidation when their headquarters operates on a US Oct-Sep FY while their Indian subsidiary operates on an Apr-Mar FY?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 26: Fiscal Calendar Engineering Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="Fiscal Calendar Engineering Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In financial accounting, calendar years are an illusion; fiscal years are reality. If your financial models confuse Q1 of the calendar year with Q1 of the Indian tax year, your advance tax schedules, depreciation books, and GST reconciliations will fail statutory audit. Master the CHOOSE pattern and EDATE offset tricks."}
          />
        </div>
      </div>
    </div>
  );
}
