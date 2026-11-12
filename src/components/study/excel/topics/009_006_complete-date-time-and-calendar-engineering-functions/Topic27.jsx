"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic27_files/topic27_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic27() {
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

  const [inpPlanDays, setInpPlanDays] = useState(30);
  const [inpActualVariance, setInpActualVariance] = useState(-2); // 2 days ahead
  const [inpSlaTargetHours, setInpSlaTargetHours] = useState(4.0);
  const [inpActualSlaHours, setInpActualSlaHours] = useState(3.5);

  const capstoneAudit = useMemo(() => {
    const plan = parseInt(inpPlanDays, 10);
    const variance = parseInt(inpActualVariance, 10);
    const targetSla = parseFloat(inpSlaTargetHours);
    const actualSla = parseFloat(inpActualSlaHours);

    let scheduleHealth = "On Schedule (Healthy)";
    let healthColor = "text-emerald-400";
    if (variance > 0 && variance <= 2) {
      scheduleHealth = "Moderate Risk (Slight Delay)";
      healthColor = "text-amber-400";
    } else if (variance > 2) {
      scheduleHealth = "Critical Schedule Breach";
      healthColor = "text-rose-400";
    }

    const slaMet = actualSla <= targetSla;

    return {
      isError: false,
      scheduleHealth,
      healthColor,
      varianceDays: variance,
      slaMet,
      slaStatus: slaMet ? "Compliant with Contractual SLA" : "SLA Penalty Triggered"
    };
  }, [inpPlanDays, inpActualVariance, inpSlaTargetHours, inpActualSlaHours]);
    

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
              ⚡ Date & Calendar Engineering · Topic 27
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Enterprise Capstone · Systems Integration
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Synthesize, Build & Defend
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            Date-Time Automation Capstone Project — Operations Dashboard & Portfolio Risk Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>Welcome to the <strong>Engineering Capstone Project</strong> of the Complete Date, Time, and Calendar Engineering Master Curriculum. This capstone integrates every foundational concept and advanced function covered across Topics 0 through 26 into a comprehensive, production-grade <strong>Enterprise Operations & Portfolio Delivery Dashboard</strong>.</p><p>As an enterprise systems engineer across Kolkata, Barrackpore, Shyamnagar, and Titagarh, you will orchestrate dynamic milestone stepping (<code className="text-indigo-300 font-mono">WORKDAY.INTL</code>), net business capacity analytics (<code className="text-emerald-300 font-mono">NETWORKDAYS.INTL</code>), fiscal bucketing (<code className="text-amber-300 font-mono">CHOOSE / EDATE</code>), elapsed tenure calculations (<code className="text-sky-300 font-mono">DATEDIF</code>), and floating timestamp precision math (<code className="text-indigo-300 font-mono">INT / MOD</code>). This end-to-end framework calculates schedule variances, flags delivery risks, automates statutory advance tax compliance, and drives executive KPI cockpits with 100% mathematical integrity.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">{"Comprehensive Integration: WORKDAY.INTL + NETWORKDAYS.INTL + DATEDIF + EDATE + EOMONTH + CHOOSE"}</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> {"PMO Executive Cockpits, Enterprise Resource Planning & Financial Governance"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> {"=IF(VarianceDays <= 0, 'On Schedule', 'Delayed Risk') | =DATEDIF(...) & ' Y, ' & ..."}</span>
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
              End-to-End Enterprise Operations Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Date-Time Automation Capstone Project Formula Signature</div>
            <div className="text-white font-bold text-base">
              {"ProjectHealth = IF(ActualEnd <= TargetEnd, \"On Schedule\", IF(ActualEnd - TargetEnd <= 3, \"Moderate Risk\", \"Critical Delay\"))"}
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Milestone Engine:</strong> Dynamic target date generation via WORKDAY.INTL with corporate holiday exclusions.</div><div>• <strong className="text-sky-300">Variance Engine:</strong> Signed calendar and business day variance tracking (ActualFinish - TargetFinish).</div><div>• <strong className="text-amber-300">Executive Health Index:</strong> Formulaic KPI status cards ('On Schedule', 'At Risk', 'Delayed') bound to conditional formatting.</div>
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
              <span className="text-emerald-400">📊</span> Capstone Enterprise Operations Workstream Portfolio Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review production schedule health, business day variances, and milestone delivery indexes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Workstream ID</th>
                  <th className="py-3 px-4">Workstream Lead</th>
                  <th className="py-3 px-4">Planned Start</th>
                  <th className="py-3 px-4">Target Finish</th>
                  <th className="py-3 px-4">Actual Finish</th>
                  <th className="py-3 px-4">Schedule Variance</th>
                  <th className="py-3 px-4">Portfolio Health Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">CAP-5001</td>
        <td className="py-3.5 px-4 text-white">Swadeep Hui (Barrackpore)</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">2026-10-01</td>
        <td className="py-3.5 px-4 text-sky-300 font-mono">2026-11-15</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">2026-11-13</td>
        <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">-2 Days (Ahead)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">On Schedule (Healthy)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">CAP-5002</td>
        <td className="py-3.5 px-4 text-white">Tuhina Das (Shyamnagar)</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">2026-10-01</td>
        <td className="py-3.5 px-4 text-sky-300 font-mono">2026-11-15</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">2026-11-14</td>
        <td className="py-3.5 px-4 text-emerald-400 font-bold font-mono">-1 Day (Ahead)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">On Schedule (Healthy)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">CAP-5003</td>
        <td className="py-3.5 px-4 text-white">Susmita Sen (Naihati)</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">2026-10-01</td>
        <td className="py-3.5 px-4 text-sky-300 font-mono">2026-11-15</td>
        <td className="py-3.5 px-4 text-white font-mono font-bold">2026-11-15</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">0 Days (Exact)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">On Schedule (Healthy)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">CAP-5004</td>
        <td className="py-3.5 px-4 text-white">Debangshu Roy (Ichapur)</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">2026-10-01</td>
        <td className="py-3.5 px-4 text-sky-300 font-mono">2026-11-15</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono font-bold">2026-11-16</td>
        <td className="py-3.5 px-4 text-amber-400 font-bold font-mono">+1 Day (Late)</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Moderate Risk</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">CAP-5005</td>
        <td className="py-3.5 px-4 text-white">Susmita Roy (Titagarh)</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">2026-10-01</td>
        <td className="py-3.5 px-4 text-sky-300 font-mono">2026-11-15</td>
        <td className="py-3.5 px-4 text-rose-400 font-mono font-bold">2026-11-17</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold font-mono">+2 Days (Late)</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">Critical Delay Risk</td>
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
                Architecture of an Enterprise Operations KPI Cockpit
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How to assemble a multi-layered executive dashboard combining operational and fiscal metrics.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A world-class Excel executive dashboard is not a random collection of formulas; it is an integrated computational pipeline structured into four rigorous layers:</p>
    <ol className="list-decimal list-inside space-y-1.5 font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
      <li><strong>Data Layer (Structured Tables):</strong> Master transaction tables (<code className="text-indigo-300 font-bold">tblWorkstreams</code>, <code className="text-emerald-300 font-bold">tblHolidays</code>, <code className="text-amber-300 font-bold">tblRosters</code>) with 100% validated data types.</li>
      <li><strong>Calculation Engine:</strong> Pure formula columns computing business milestone dates (<code className="text-white">WORKDAY.INTL</code>), tenure (<code className="text-white">DATEDIF</code>), and fiscal bucketing (<code className="text-white">CHOOSE</code>).</li>
      <li><strong>Audit & Variance Layer:</strong> Delta metrics measuring schedule slippage (<code className="text-rose-400 font-bold">=Actual - Target</code>) and SLA compliance percentages.</li>
      <li><strong>Presentation Cockpit:</strong> High-impact KPI summary cards, color-coded status badges, and dynamic spill range charts that refresh instantly upon data entry.</li>
    </ol>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Fragmented Hardcoded Workbook
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"Single sheet with static dates, manual colors, and coordinate formulas ($A$1:$D$50)"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Breaks upon row insertion; impossible to audit; requires manual updating every week."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Modular Multi-Tier Enterprise Cockpit
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"Structured Tables + Named Config Ranges + Dynamic Spill Formulas + Automated Health Index"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Fully automated, self-healing, audit-compliant, and scalable to hundreds of thousands of records."}
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
            Complete Date-Time Engineering Stack: From raw serial numbers to executive portfolio KPI dashboards.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="40" width="160" height="110" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">LAYER 1: RAW SERIALS</text>
        <text x="110" y="95" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">46338.604167</text>
        <text x="110" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">INT / MOD Mechanics</text>

        <path d="M 195 95 L 225 95" stroke="#64748B" strokeWidth="2" />

        <rect x="230" y="40" width="180" height="110" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
        <text x="320" y="70" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">LAYER 2: CALENDARS</text>
        <text x="320" y="95" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">WORKDAY.INTL</text>
        <text x="320" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">tblHolidays & Binary Masks</text>

        <path d="M 415 95 L 445 95" stroke="#64748B" strokeWidth="2" />

        <rect x="450" y="40" width="180" height="110" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="540" y="70" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">LAYER 3: FISCAL/SLA</text>
        <text x="540" y="95" textAnchor="middle" fill="#FCD34D" className="text-xs font-mono">Indian FY & SLA Hours</text>
        <text x="540" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">CHOOSE & EDATE Engines</text>

        <path d="M 635 95 L 665 95" stroke="#10B981" strokeWidth="2" />

        <rect x="670" y="35" width="140" height="120" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="740" y="65" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">LAYER 4: KPI</text>
        <text x="740" y="95" textAnchor="middle" fill="#6EE7B7" className="text-sm font-black font-mono">PORTFOLIO</text>
        <text x="740" y="115" textAnchor="middle" fill="#A7F3D0" className="text-[10px] font-bold">HEALTH INDEX</text>
        <text x="740" y="135" textAnchor="middle" fill="#FFFFFF" className="text-[10px]">98.2% SLA MET</text>
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
                Explore real Date-Time Automation Capstone Project formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic27"
            title="Topic 27: Date-Time Automation Capstone Project Master Practice Grid"
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
                  Scenario 1: PMO Governance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Delivery Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated Workstream Delivery Milestone Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A program management office in Kolkata manages 40 parallel software workstreams. The master schedule must compute delivery target dates automatically using WORKDAY.INTL with client holidays."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Step 30 business days excluding Sat/Sun and client holidays</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(PlannedStartDate, 30, 1, tblHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Start: 01-Oct-2026 → Target Delivery Date: 15-Nov-2026"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Variance Analytics
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Engineering Office</span>
              </div>
              <h3 className="text-base font-bold text-white">Signed Schedule Slippage Variance Indicator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Barrackpore project managers calculate signed variance days between actual completion and target completion to drive executive traffic-light indicators."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate schedule slippage in calendar days</div>
                <div className="text-emerald-300 font-bold">{"=ActualCompletedDate - TargetFinishDate"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"-2 Days (Completed 2 days early) or +3 Days (Delayed 3 days)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Traffic Light KPI
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Enterprise ERP</span>
              </div>
              <h3 className="text-base font-bold text-white">Three-Tier Portfolio Health Status Index</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Titagarh executive dashboard assigns automated status badges ('On Schedule', 'Moderate Risk', 'Critical Delay') based on variance thresholds."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Categorize project risk by variance threshold</div>
                <div className="text-emerald-300 font-bold">{"=IF(Variance<=0, \"On Schedule\", IF(Variance<=3, \"Moderate Risk\", \"Critical Delay\"))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Variance = -1 → 'On Schedule'; Variance = +5 → 'Critical Delay'"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Tenure & Gratuity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Human Resources</span>
              </div>
              <h3 className="text-base font-bold text-white">Employee Service Tenure & Gratuity Eligibility Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Shyamnagar HR tracks engineer service tenure down to exact Years, Months, and Days using DATEDIF to audit statutory gratuity eligibility (>= 5 Years)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate exact 5-year gratuity milestone</div>
                <div className="text-emerald-300 font-bold">{"=IF(DATEDIF(HireDate, TODAY(), \"Y\")>=5, \"Gratuity Eligible\", \"Not Yet Eligible\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Hire Date: 15-Apr-2018 → 8 Years Service → 'Gratuity Eligible'"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Fiscal Dashboard
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Financial Accounting</span>
              </div>
              <h3 className="text-base font-bold text-white">Multi-Period Indian FY Revenue Aggregator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Accountants in Naihati aggregate project billing milestones into Indian fiscal quarters using dynamic SUMIFS linked to fiscal quarter buckets."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Sum project revenue for active fiscal quarter</div>
                <div className="text-emerald-300 font-bold">{"=SUMIFS(tblProjects[Billing], tblProjects[FiscalQtr], \"Q3\", tblProjects[FiscalYear], \"FY 2026-27\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Returns total billing for Q3 FY 2026-27 with zero manual filtering."}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Executive Cockpit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Executive Boardroom</span>
              </div>
              <h3 className="text-base font-bold text-white">Executive On-Time Delivery Compliance Percentage</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Boardroom presentation card computes the overall percentage of portfolio projects completed on or ahead of target milestone dates."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Compute portfolio on-time delivery rate</div>
                <div className="text-emerald-300 font-bold">{"=COUNTIF(tblProjects[VarianceDays], \"<=0\") / COUNTA(tblProjects[ProjectID])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Evaluates to 0.9167 (Formatted as 91.7% On-Time Delivery)"}
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
              <span className="text-indigo-400 font-bold">Structure Raw Data Tables in Excel</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"tblProjects, tblHolidays, tblRosters"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Engineer Target Milestone and Variance Formulas</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WORKDAY.INTL(Start, Days, 1, tblHolidays[Date])"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Implement Portfolio Health & Compliance Index</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=IF(Variance<=0, \"On Schedule\", IF(Variance<=3, \"Moderate Risk\", \"Critical Delay\"))"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Design Executive KPI Cards & Slicers</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=COUNTIF(tblProjects[VarianceDays], \"<=0\") / COUNTA(tblProjects[ProjectID])"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#REF! on Deleted Column"}</td>
                  <td className="py-3 px-4 font-sans">{"Deleting a raw date column referenced by downstream KPI cards."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Deleting column without updating structured formulas"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use Excel Table structured references: tblProjects[PlannedStart] rather than coordinate references."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inverted Variance Sign"}</td>
                  <td className="py-3 px-4 font-sans">{"Calculating Target - Actual instead of Actual - Target."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Late project displays as negative variance"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Standardize convention: Variance = ActualFinish - TargetFinish. Positive = Late, Negative = Early."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Division by Zero (#DIV/0!)"}</td>
                  <td className="py-3 px-4 font-sans">{"Computing On-Time % when the filtered table contains zero projects."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=COUNTIF(...) / COUNTA(...) with no matching rows"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with IFERROR(): =IFERROR(COUNTIF(...) / COUNTA(...), 0)."}</td>
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
              <span className="text-indigo-400 font-bold">The Golden Rule of Dashboard Architecture</span>
              <p className="text-slate-300">{"Separate your workbook into three distinct tab groups: 'RAW_DATA' (read-only ingested tables), 'CALC_ENGINE' (intermediate transformation formulas), and 'DASHBOARD' (clean executive presentation cards). Never mix raw data entry with executive charts."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Dynamic Spill Range Card Metrics</span>
              <p className="text-slate-300">{"In Microsoft 365, use dynamic array formulas like =UNIQUE(tblProjects[WorkstreamLead]) and =FILTER(tblProjects, tblProjects[Health]='Critical Delay') to create self-updating audit exception lists."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Automated Number Formatting</span>
              <p className="text-slate-300">{"Use custom format string: +0 Days;-0 Days;\"On Schedule\" on your variance column. Excel automatically adds a '+' to late projects, a '-' to early projects, and prints 'On Schedule' for zero-day variance!"}</p>
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
              • <strong>System Architecture:</strong> {"Why does an enterprise operations dashboard require combining WORKDAY.INTL, DATEDIF, and CHOOSE rather than relying on a single date function?"}
            </p>

            <p key="1">
              • <strong>Data Governance:</strong> {"How do structured Excel Tables (Ctrl+T) eliminate maintenance overhead when new project rows are inserted into a live dashboard?"}
            </p>

            <p key="2">
              • <strong>Executive Decision Support:</strong> {"How does a signed variance metric (+2 Days vs -2 Days) provide better decision support to senior leadership than raw calendar dates alone?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 27: Date-Time Automation Capstone Project Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="Date-Time Automation Capstone Project Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Congratulations on completing this comprehensive Date, Time, and Calendar Engineering Master Curriculum! You have journeyed from the foundational IEEE 754 64-bit floating point serial date architecture to advanced international workweek bitmasks, high-precision SLA clamping engines, and executive operations dashboards. Carry these principles into your daily professional work: always separate presentation from data, always respect the calendar mechanics of your operating territory, and never let a date formula fail silently."}
          />
        </div>
      </div>
    </div>
  );
}
