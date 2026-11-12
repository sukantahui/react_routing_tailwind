"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic12() {
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

  const [inpWeekDate, setInpWeekDate] = useState("2026-11-12");
  const [returnTypeSelection, setReturnTypeSelection] = useState(2);

  const weeknumResult = useMemo(() => {
    const s = new Date(inpWeekDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const y = s.getFullYear();

    // Standard System 1 calculation with Monday start (type 2)
    const jan1 = new Date(y, 0, 1);
    const dayOfYear = Math.floor((s.getTime() - jan1.getTime()) / 86400000) + 1;
    const jan1DayOfWeek = (jan1.getDay() === 0 ? 7 : jan1.getDay()); // Mon=1..Sun=7

    // System 1 weeknum
    const sys1Week = Math.floor((dayOfYear + jan1DayOfWeek - 2) / 7) + 1;

    // ISO 8601 calculation (type 21)
    const target = new Date(s.valueOf());
    const dayNr = (s.getDay() + 6) % 7; // Mon=0..Sun=6
    target.setDate(target.getDate() - dayNr + 3); // Nearest Thursday
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const isoWeek = 1 + Math.ceil((firstThursday - target) / 604800000);

    const activeWeek = returnTypeSelection === 21 ? isoWeek : sys1Week;

    const weeksInYear = 52;
    const progressPct = Math.min(100, Math.round((activeWeek / weeksInYear) * 100));

    return {
      isError: false,
      activeWeek,
      sys1Week,
      isoWeek,
      progressPct,
      hasDiscrepancy: sys1Week !== isoWeek
    };
  }, [inpWeekDate, returnTypeSelection]);

  const applyPreset = (preset) => {
    if (preset === "today") {
      setInpWeekDate("2026-11-12");
      setReturnTypeSelection(2);
    } else if (preset === "jan1_dispute") {
      setInpWeekDate("2021-01-01"); // Classic dispute date!
      setReturnTypeSelection(2);
    } else if (preset === "mid_year") {
      setInpWeekDate("2026-07-01");
      setReturnTypeSelection(2);
    } else if (preset === "iso_mode") {
      setInpWeekDate("2026-11-12");
      setReturnTypeSelection(21);
    }
  };
    

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
              ⚡ Date & Calendar Engineering · Topic 12
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Cycle Math · Retail Forecasting
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Sequence
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            WEEKNUM Function — Calendar Week Numbering & Retail Cycle Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">WEEKNUM(serial_number, [return_type])</code> function returns an integer between 1 and 54 indicating where a specific date falls within the calendar year's sequential week cycles.</p><p>In retail merchandising, FMCG sales forecasting, manufacturing sprint planning, and supply chain logistics, business performance is analyzed weekly rather than monthly. Excel supports two fundamentally distinct week-numbering systems: <strong>System 1</strong> (where Week 1 begins unconditionally on January 1, regardless of day of week) and <strong>System 2</strong> (the European ISO 8601 standard, where Week 1 is the first week containing at least four days in the new year). Choosing the proper return type is critical to prevent cross-border operational misalignment.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=WEEKNUM(serial_number, [return_type])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Retail Weekly Sales Cycles, FMCG Logistics & Agile Sprints</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =WEEKNUM(A2, 2) (Monday-Start Calendar Week)</span>
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
          
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive WEEKNUM System Modeler
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare System 1 (Jan 1 Anchor) vs System 2 (ISO 8601) week numbers and observe January dispute edges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("today")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Today (12-Nov)
          </button>
          <button
            onClick={() => applyPreset("jan1_dispute")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Jan 1 Dispute Edge
          </button>
          <button
            onClick={() => applyPreset("mid_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Mid-Year Week 26
          </button>
          <button
            onClick={() => applyPreset("iso_mode")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            ISO 8601 Mode (Type 21)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Date Selection (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpWeekDate}
            onChange={(e) => setInpWeekDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Weeknum System (Arg 2)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setReturnTypeSelection(2)}
              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                returnTypeSelection === 2
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <div className="font-bold text-xs">Type 2: System 1</div>
              <div className="text-[10px] opacity-75">Mon Start, Jan 1 Anchor</div>
            </button>
            <button
              onClick={() => setReturnTypeSelection(21)}
              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                returnTypeSelection === 21
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <div className="font-bold text-xs">Type 21: ISO 8601</div>
              <div className="text-[10px] opacity-75">Mon Start, First Thursday</div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WEEKNUM("{inpWeekDate}", {returnTypeSelection})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Week Number:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              Week {weeknumResult.isError ? weeknumResult.error : weeknumResult.activeWeek}
            </span>
          </div>
        </div>

        {!weeknumResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System 1 (Type 2):</span>
              <span className="text-indigo-300 font-semibold font-mono text-base">
                Week {weeknumResult.sys1Week}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System 2 (ISO Type 21):</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                Week {weeknumResult.isoWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System Disparity Check:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  weeknumResult.hasDiscrepancy ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {weeknumResult.hasDiscrepancy ? "⚠️ Discrepancy Detected!" : "✓ Both Systems Match"}
              </span>
            </div>
          </div>
        )}
      </div>
    
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
              Calendar Week Sequencing Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical WEEKNUM Formula Signature</div>
            <div className="text-white font-bold text-base">
              =WEEKNUM(serial_number, [return_type])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">serial_number:</strong> Required. A date representing the date you want to sequence within the year.</div><div>• <strong className="text-sky-300">return_type:</strong> Optional. A number that determines on which day the week begins and which system is used: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">1 (or omitted):</code> System 1. Week begins on Sunday. Week containing Jan 1 is Week 1.<br/>&nbsp;&nbsp;• <code className="font-mono text-emerald-300">2:</code> System 1. Week begins on Monday. Week containing Jan 1 is Week 1. <em>(Standard corporate retail!)</em><br/>&nbsp;&nbsp;• <code className="font-mono text-amber-300">21:</code> System 2. ISO 8601 compliant. Week begins on Monday; Week 1 has the first Thursday.</div><div>• <strong className="text-amber-300">Week 53 / 54 Occurrence:</strong> In System 1, years can have up to 54 partial weeks when Jan 1 falls on a Saturday.</div>
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
              <span className="text-emerald-400">📊</span> WEEKNUM Return Type & System Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe the differences between System 1 (Jan 1 Anchor) and System 2 (ISO 8601).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Week Starts On</th>
                  <th className="py-3 px-4">System Type</th>
                  <th className="py-3 px-4">Week 1 Definition</th>
                  <th className="py-3 px-4">Industrial Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (Default)</td>
        <td className="py-3.5 px-4 text-white">Sunday</td>
        <td className="py-3.5 px-4 text-slate-300">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">US retail fiscal calendars (NRF)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2 (Common)</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Global corporate Monday-start dashboards</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">21 (ISO Standard)</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">System 2</td>
        <td className="py-3.5 px-4 text-sky-400">First week with Thursday</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">European supply chain & logistics (ISO 8601)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">11-17</td>
        <td className="py-3.5 px-4 text-white">Mon through Sun</td>
        <td className="py-3.5 px-4 text-slate-300">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Custom regional week start alignments</td>
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
                System 1 vs System 2 (ISO 8601): The January 1 Battleground
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why the same date can be Week 1 in New York and Week 52 in Frankfurt.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>The conflict between <strong>System 1</strong> and <strong>System 2</strong> is one of the most contentious topics in international supply chain analytics.</p><p>Under <strong>System 1</strong> (<code className="text-white font-mono">=WEEKNUM(A2, 2)</code>), January 1 is ALWAYS in Week 1, even if January 1 is a Sunday! This creates tiny 1-day or 2-day 'stub weeks' at the beginning of the year. <br/>Under <strong>System 2 (ISO 8601)</strong> (<code className="text-indigo-300 font-mono">=WEEKNUM(A2, 21)</code>), Week 1 must contain at least 4 days of the new year (the 'First Thursday' rule). If Jan 1 is a Friday, Saturday, or Sunday, those days belong to <strong>Week 52 or 53 of the PREVIOUS year</strong>! Always align with your supply chain partners before finalizing weekly reporting keys.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Default US Weeknum in European Supply Chains
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=WEEKNUM(A2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Uses Sunday start and System 1, causing week mismatch with European logistics partners using ISO 8601.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Explicit Weeknum Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=WEEKNUM(A2, 2)  // Or =WEEKNUM(A2, 21) for ISO"}
                </div>
                <p className="text-xs text-slate-400">
                  Always explicitly pass argument 2 (2 for standard corporate or 21 for ISO 8601).
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
            System 1 (unconditional Jan 1 anchor) vs System 2 (ISO First Thursday rule).
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Jan 1 on Friday</text>
        <text x="140" y="98" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">Date: 01-Jan-2021</text>
        <text x="140" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Only 3 days in year</text>

        <path d="M 250 80 L 340 60 M 250 120 L 340 140" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="230" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">System 1 (=WEEKNUM(A2, 2))</text>
        <text x="455" y="75" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold font-mono">➔ Evaluates as WEEK 1</text>

        <rect x="340" y="110" width="230" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="135" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">System 2 (=WEEKNUM(A2, 21))</text>
        <text x="455" y="155" textAnchor="middle" fill="#F87171" className="text-xs font-bold font-mono">➔ Evaluates as WEEK 53 (Prior)</text>

        <path d="M 570 60 L 640 85 M 570 140 L 640 115" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Audit Impact</text>
        <text x="725" y="105" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">1-Week Disparity</text>
        <text x="725" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Supply Chain Alert</text>
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
                Explore real WEEKNUM formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic12"
            title="Topic 12: WEEKNUM Master Practice Grid"
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
                  Scenario 1: Retail FMCG & Hypermarket Sales
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Retail Chain Headquarters</span>
              </div>
              <h3 className="text-base font-bold text-white">Weekly Store Revenue Aggregation Key</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Supermarkets track weekly turnover for year-over-year same-store sales comps. Generate an unambiguous weekly key (e.g. '2026-WK46') from transaction date in A2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine year with zero-padded weeknum</div>
                <div className="text-emerald-300 font-bold">{"=YEAR(A2) & \"-WK\" & TEXT(WEEKNUM(A2, 2), \"00\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"2026-WK46\" (for 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Agile Software Engineering
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V DevOps</span>
              </div>
              <h3 className="text-base font-bold text-white">Bi-Weekly Sprint Numbering Allocation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Software engineering runs 2-week sprints starting every odd week. Classify project milestone date in B2 into Sprint cycle."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Divide weeknum by 2 and round up with CEILING</div>
                <div className="text-emerald-300 font-bold">{"=\"Sprint \" & ROUNDUP(WEEKNUM(B2, 2) / 2, 0)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"Sprint 23\" (for Week 46 milestone)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Automotive Manufacturing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Assembly Plant</span>
              </div>
              <h3 className="text-base font-bold text-white">Vehicle Chassis Production Week Stamping</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Chassis compliance plates must stamp production week number according to German automotive standard (ISO 8601)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply Return Type 21 for ISO 8601 compliance</div>
                <div className="text-emerald-300 font-bold">{"=\"CW\" & TEXT(WEEKNUM(C2, 21), \"00\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"CW46\" (Calendar Week 46)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Cold Chain & Dairy Logistics
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Dairy Distribution</span>
              </div>
              <h3 className="text-base font-bold text-white">Weekly Route Delivery Schedule Assignment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Milk tanker delivery routes alternate between Route Alpha (odd week numbers) and Route Beta (even week numbers) based on dispatch date in D2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Test whether WEEKNUM is even or odd using ISODD</div>
                <div className="text-emerald-300 font-bold">{"=IF(ISODD(WEEKNUM(D2, 2)), \"ROUTE ALPHA\", \"ROUTE BETA\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"ROUTE BETA\" (for Week 46)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Human Resources Shift Planning
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Industrial Roster</span>
              </div>
              <h3 className="text-base font-bold text-white">Rotating Fortnight Shift Differential</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Factory team switches between day shift and night shift on alternating calendar weeks. Establish rotation key based on shift date in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate modulo 2 on week number</div>
                <div className="text-emerald-300 font-bold">{"=IF(MOD(WEEKNUM(E2, 2), 2) = 1, \"TEAM 1 DAY SHIFT\", \"TEAM 2 NIGHT SHIFT\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"TEAM 2 NIGHT SHIFT\" (for Week 46)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Agricultural Commodity Market
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Jute Exchange</span>
              </div>
              <h3 className="text-base font-bold text-white">Jute Fiber Harvest Weekly Price Index</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Jute procurement prices are updated weekly on the first business day of the week. Group daily market prices by weekly sequence."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Group transactions into weekly index buckets</div>
                <div className="text-emerald-300 font-bold">{"=WEEKNUM(F2, 2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Week 46 (for trading on 12-Nov)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Choose Your Weeknum System</span>
              <p>{"Determine whether your corporate partners use System 1 (type 2) or System 2 (ISO 8601 type 21)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Corporate Standard: =WEEKNUM(A2, 2)\nISO 8601 Standard: =WEEKNUM(A2, 21)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Avoid Default Type 1</span>
              <p>{"Never leave the return type empty unless you explicitly want Sunday as day 1."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Always pass argument 2 explicitly"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Construct Standard Weekly Label</span>
              <p>{"Pad week numbers with TEXT(..., '00') to ensure proper sorting in PivotTables."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=YEAR(A2) & \"-W\" & TEXT(WEEKNUM(A2, 2), \"00\")"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Audit January Edge Cases</span>
              <p>{"Check how your formula behaves for January 1, 2, and 3 to ensure cross-system consistency."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Verify Jan 1 behavior across calendar boundaries"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Week 53 / 54 Confusion"}</td>
                  <td className="py-3 px-4 font-sans">{"System 1 starts Week 1 unconditionally on Jan 1, creating stub weeks and pushing late December into Week 53 or 54."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Years where Jan 1 is Saturday or Sunday under System 1"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Switch to ISO 8601 (Type 21 or ISOWEEKNUM) to eliminate partial stub weeks."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Cross-Border 1-Week Disparity"}</td>
                  <td className="py-3 px-4 font-sans">{"US division using =WEEKNUM(A2) (Type 1) while European branch uses =WEEKNUM(A2, 21) (ISO)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Week 1 on US report matches Week 52 on European report"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Standardize enterprise policy on Return Type 2 or Return Type 21."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Supplying an invalid return type code (e.g. 5 or 25)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=WEEKNUM(A2, 5)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use only valid return types: 1, 2, 11-17, or 21."}</td>
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
              <span className="text-indigo-400 font-bold">The Zero-Padded Key Pattern</span>
              <p className="text-slate-300">{"Always zero-pad week numbers: =YEAR(A2) & '-W' & TEXT(WEEKNUM(A2,2), '00'). Without '00', Week 10 will sort before Week 2 alphabetically!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Direct ISOWEEKNUM Alternative</span>
              <p className="text-slate-300">{"In modern Excel (2013+), the function =ISOWEEKNUM(A2) is 100% equivalent to =WEEKNUM(A2, 21)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">4-4-5 Retail Calendars</span>
              <p className="text-slate-300">{"National Retail Federation (NRF) 4-4-5 calendars split quarters into 4-week, 4-week, and 5-week months based on WEEKNUM."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Weeks Remaining in the Year</span>
              <p className="text-slate-300">{"Calculate remaining weeks until year end: =52 - WEEKNUM(TODAY(), 2)."}</p>
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
              • <strong>Global Standards:</strong> {"Why did European standardization bodies create ISO 8601 week numbering instead of adopting the American Jan 1 convention?"}
            </p>

            <p key="1">
              • <strong>Data Modeling:</strong> {"Why does sorting a column of unpadded week numbers ('W1', 'W2', ... 'W10') alphabetically break reporting dashboards?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 12: WEEKNUM Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="WEEKNUM Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"When designing weekly sales or inventory dashboards, NEVER write =WEEKNUM(A2) without the second parameter. The default uses Sunday and System 1. Always write =WEEKNUM(A2, 2) for standard Monday-start weeks, and pad with TEXT(..., '00') so your charts sort chronologically."}
          />
        </div>
      </div>
    </div>
  );
}
