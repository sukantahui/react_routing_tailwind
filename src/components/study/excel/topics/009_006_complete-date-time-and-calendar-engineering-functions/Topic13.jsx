"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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

  const [inpIsoDate, setInpIsoDate] = useState("2024-12-30");

  const isoEvaluation = useMemo(() => {
    const s = new Date(inpIsoDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayOfWeekNames[s.getDay()];

    // Accurate ISO 8601 algorithm
    const target = new Date(s.valueOf());
    const dayNr = (s.getDay() + 6) % 7; // Mon=0..Sun=6
    target.setDate(target.getDate() - dayNr + 3); // Find Thursday of week

    const isoYear = target.getFullYear(); // The year of Thursday is the ISO Year!
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const isoWeekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);

    const calendarYear = s.getFullYear();
    const hasYearMismatch = calendarYear !== isoYear;

    const canonicalIsoString = `${isoYear}-W${String(isoWeekNumber).padStart(2, "0")}-${(s.getDay() === 0 ? 7 : s.getDay())}`;

    return {
      isError: false,
      isoWeekNumber,
      isoYear,
      calendarYear,
      dayOfWeek,
      hasYearMismatch,
      canonicalIsoString
    };
  }, [inpIsoDate]);

  const applyPreset = (preset) => {
    if (preset === "dispute_dec") {
      setInpIsoDate("2024-12-30"); // Mon -> Belongs to 2025-W01!
    } else if (preset === "dispute_jan") {
      setInpIsoDate("2021-01-01"); // Fri -> Belongs to 2020-W53!
    } else if (preset === "standard_now") {
      setInpIsoDate("2026-11-12");
    } else if (preset === "standard_leap") {
      setInpIsoDate("2024-02-29");
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
              ⚡ Date & Calendar Engineering · Topic 13
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Global Standard · Supply Chain Logistics
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Standardize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            ISOWEEKNUM Function — ISO 8601 Global Week Numbering Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">ISOWEEKNUM(date)</code> function returns the ISO 8601 week number of the year for a given date. Introduced in Excel 2013, it provides a dedicated, foolproof implementation of the international standard.</p><p>Under the ISO 8601 calendar specification (governing international shipping, container shipping lines like Maersk, global automotive manufacturing like BMW and Volkswagen, and European financial settlement systems), weeks <strong>strictly begin on Monday</strong> and end on Sunday. <strong>Week 1</strong> of any calendar year is formally defined as the week that contains the <strong>first Thursday of the new year</strong> (or equivalently, the week that contains January 4th). Consequently, dates in late December can belong to Week 1 of the following year, while dates in early January can belong to Week 52 or 53 of the preceding year.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=ISOWEEKNUM(date)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> International Supply Chain, Container Logistics & European Manufacturing</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =YEAR(A2) & "-W" & TEXT(ISOWEEKNUM(A2), "00")</span>
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
            <span className="text-indigo-400">🧪</span> Interactive ISO 8601 Week Engine & Year Auditor
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit edge-case boundary dates where ISO Year differs from Calendar Year according to the First Thursday Rule.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("dispute_dec")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Dec 30, 2024 (➔ 2025-W01)
          </button>
          <button
            onClick={() => applyPreset("dispute_jan")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            Jan 1, 2021 (➔ 2020-W53)
          </button>
          <button
            onClick={() => applyPreset("standard_now")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Today (12-Nov-2026)
          </button>
          <button
            onClick={() => applyPreset("standard_leap")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Leap Day (2024-W09)
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
            value={inpIsoDate}
            onChange={(e) => setInpIsoDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center space-y-1 text-xs">
          <span className="text-slate-400">The ISO 8601 First Thursday Rule:</span>
          <span className="text-indigo-300 font-mono font-bold">Week 1 contains the 1st Thursday of the year</span>
          <span className="text-[11px] text-slate-500">ISO weeks strictly run Monday (1) through Sunday (7).</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =ISOWEEKNUM("{inpIsoDate}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">ISO Week Number:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              Week {isoEvaluation.isError ? isoEvaluation.error : isoEvaluation.isoWeekNumber}
            </span>
          </div>
        </div>

        {!isoEvaluation.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Canonical ISO 8601 Key:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                {isoEvaluation.canonicalIsoString}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">True ISO Year:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {isoEvaluation.isoYear}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Calendar Year Mismatch:</span>
              <span
                className={`font-bold inline-flex items-center gap-1.5 ${
                  isoEvaluation.hasYearMismatch ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {isoEvaluation.hasYearMismatch
                  ? `⚠️ Mismatch! (Cal: ${isoEvaluation.calendarYear} vs ISO: ${isoEvaluation.isoYear})`
                  : "✓ Years Align Perfectly"}
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
              ISO 8601 International Standard Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical ISOWEEKNUM Formula Signature</div>
            <div className="text-white font-bold text-base">
              =ISOWEEKNUM(date)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">date:</strong> Required. The date for which you want to find the ISO 8601 week number. Must be an authentic Excel date serial or formula result.</div><div>• <strong className="text-sky-300">The First Thursday Rule:</strong> Week 1 is strictly the week with the year's first Thursday. This guarantees that Week 1 always has at least 4 days in the new year.</div><div>• <strong className="text-amber-300">Zero Configuration:</strong> Unlike WEEKNUM which requires memorizing return type 21, ISOWEEKNUM takes exactly one argument, eliminating configuration errors across distributed teams.</div>
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
              <span className="text-emerald-400">📊</span> ISO 8601 Boundary Year-End Behavior Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe the First Thursday Rule shifting early January and late December dates across calendar years.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Day of Week</th>
                  <th className="py-3 px-4">ISOWEEKNUM()</th>
                  <th className="py-3 px-4">ISO Year Assignment</th>
                  <th className="py-3 px-4">Explanation of Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2021-01-01</td>
        <td className="py-3.5 px-4 text-white">Friday</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">53</td>
        <td className="py-3.5 px-4 text-amber-300">ISO Year 2020</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">First Thursday is Jan 7; Jan 1-3 belong to 2020 Week 53!</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2021-01-04</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">1</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2021</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Contains Thursday Jan 7; official start of Week 1</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">Thursday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">46</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Standard mid-year operational week</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-12-30</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">1</td>
        <td className="py-3.5 px-4 text-sky-400">ISO Year 2025</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Contains Thursday Jan 2, 2025; Dec 30 is in Week 1 of 2025!</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-12-29</td>
        <td className="py-3.5 px-4 text-white">Sunday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">52</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2024</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Final day of ISO Year 2024 Week 52</td>
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
                The ISO Year Mismatch Dilemma: ISO Year vs Calendar Year
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why combining =YEAR(A2) with =ISOWEEKNUM(A2) corrupts December and January reporting keys.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A pervasive bug in enterprise reporting occurs when an analyst naively combines the calendar year with the ISO week number: <code className="text-rose-400 font-mono">=YEAR(A2) & "-W" & ISOWEEKNUM(A2)</code>.</p><p>Consider <strong>December 30, 2024</strong>: <br/>• <code className="text-white font-mono">YEAR(A2)</code> returns <code className="text-white font-mono">2024</code>.<br/>• <code className="text-white font-mono">ISOWEEKNUM(A2)</code> returns <code className="text-white font-mono">1</code> (because the week contains Thursday Jan 2, 2025).<br/>The naive formula produces <code className="text-rose-400 font-mono">"2024-W01"</code>! This merges late December transactions with transactions from early January 2024! To construct a true ISO 8601 string, the year must be derived from the <strong>Thursday of the current week</strong>: <code className="text-emerald-300 font-mono">=YEAR(A2 - WEEKDAY(A2, 2) + 4) & "-W" & TEXT(ISOWEEKNUM(A2), "00")</code>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Corrupting Naive ISO String Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=YEAR(A2) & \"-W\" & TEXT(ISOWEEKNUM(A2), \"00\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Disastrously stamps December 30, 2024 as '2024-W01', mixing it with January 2024 records.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Bulletproof ISO Year-Week Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=YEAR(A2 - WEEKDAY(A2, 2) + 4) & \"-W\" & TEXT(ISOWEEKNUM(A2), \"00\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Identifies the Thursday of the active week to anchor the ISO year accurately across year-end boundaries.
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
            Finding the Thursday of the current week to establish the inviolable ISO Year.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Boundary Date</text>
        <text x="140" y="98" textAnchor="middle" fill="#F87171" className="text-sm font-bold font-mono">30-Dec-2024 (Mon)</text>
        <text x="140" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Calendar Year: 2024</text>

        <path d="M 250 100 L 330 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="330" y="45" width="240" height="110" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Find Thursday of Week</text>
        <text x="450" y="98" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Thursday = 02-Jan-2025</text>
        <text x="450" y="120" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">ISO Year = 2025</text>

        <path d="M 570 100 L 640 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="640" y="45" width="170" height="110" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">True ISO Key</text>
        <text x="725" y="102" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">2025-W01</text>
        <text x="725" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">100% ISO Compliant</text>
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
                Explore real ISOWEEKNUM formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic13"
            title="Topic 13: ISOWEEKNUM Master Practice Grid"
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
                  Scenario 1: International Ocean Freight Logistics
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Port Container Terminal</span>
              </div>
              <h3 className="text-base font-bold text-white">Maersk Global Container Booking Week Key</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Global maritime shipping lines schedule vessel arrivals by ISO week numbers. Generate an authenticated ISO week identifier for cargo manifest date in A2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine Thursday-anchored ISO year with ISOWEEKNUM</div>
                <div className="text-emerald-300 font-bold">{"=YEAR(A2 - WEEKDAY(A2, 2) + 4) & \"-W\" & TEXT(ISOWEEKNUM(A2), \"00\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"2026-W46\" (for shipment on 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: European Automotive Supply Chain
                </span>
                <span className="text-[10px] text-slate-400 font-mono">BMW / Continental Tier-1 Vendor, Pune</span>
              </div>
              <h3 className="text-base font-bold text-white">European OEM Component Delivery Schedule Compliance</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"German automotive OEMs issue production call-offs as 'CW48'. Verify whether manufacturing batch completion date in B2 meets the required ISO calendar week."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Direct ISOWEEKNUM comparison against target CW</div>
                <div className="text-emerald-300 font-bold">{"=IF(ISOWEEKNUM(B2) <= TargetCW, \"ON SCHEDULE\", \"LOGISTICS DELAY\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"ON SCHEDULE\" (batch completed in CW46)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Global Pharmaceutical Cold Chain
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Bio-Tech Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">WHO Vaccine Batch Production Week Identifier</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"World Health Organization vaccine compliance requires printing the 2-digit ISO week number on vaccine ampoule packaging."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Format ISOWEEKNUM with leading zero</div>
                <div className="text-emerald-300 font-bold">{"=\"W\" & TEXT(ISOWEEKNUM(C2), \"00\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"W46\""}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Multinational ERP Integration
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V SAP Center</span>
              </div>
              <h3 className="text-base font-bold text-white">SAP ECC to Excel Weekly Sales Ledger Harmonization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"SAP stores weekly turnover under field 'GJAHR-POPER' (Year-Period). Harmonize Excel transactional export dates in D2 with SAP ISO week periods."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Match SAP's internal ISO week algorithm</div>
                <div className="text-emerald-300 font-bold">{"=YEAR(D2 - WEEKDAY(D2, 2) + 4) & \"/\" & TEXT(ISOWEEKNUM(D2), \"00\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"2026/46\""}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Agile Software Development
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Rajarhat Global Technology Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Cross-Border Multinational Sprint Release Cadence</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Engineering teams in London, Frankfurt, and Kolkata synchronize bi-weekly sprint reviews based on ISO odd/even week numbers."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Ensure global parity on odd vs even sprint cycles</div>
                <div className="text-emerald-300 font-bold">{"=IF(ISODD(ISOWEEKNUM(E2)), \"SPRINT DEMO WEEK\", \"SPRINT PLANNING WEEK\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"SPRINT PLANNING WEEK\" (for Week 46)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: International Air Freight
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NSCB International Cargo Terminal</span>
              </div>
              <h3 className="text-base font-bold text-white">IATA Air Waybill Scheduled Flight Rotation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Charter cargo flights operate on weekly slot rotations allocated by IATA calendar week numbers."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Extract IATA compliant ISO week number</div>
                <div className="text-emerald-300 font-bold">{"=ISOWEEKNUM(F2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand Single-Parameter Design</span>
              <p>{"Unlike WEEKNUM which requires return_type 21, ISOWEEKNUM takes exactly one argument, guaranteeing zero-configuration error."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=ISOWEEKNUM(A2)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Recognize the First Thursday Rule</span>
              <p>{"Week 1 is the week with the year's first Thursday. Early January dates can belong to Week 52 or 53 of the prior year."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=ISOWEEKNUM('2021-01-01') -> Returns 53"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Anchor the ISO Year to Thursday</span>
              <p>{"Never use =YEAR(A2). Always calculate the Thursday of the week: =YEAR(A2 - WEEKDAY(A2, 2) + 4)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"True ISO Year: =YEAR(A2 - WEEKDAY(A2, 2) + 4)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format with 'W' Prefix</span>
              <p>{"Combine with zero-padding for canonical ISO 8601 compliance."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=YEAR(A2 - WEEKDAY(A2, 2) + 4) & \"-W\" & TEXT(ISOWEEKNUM(A2), \"00\")"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"December Labeled with Wrong Year"}</td>
                  <td className="py-3 px-4 font-sans">{"Using =YEAR(A2) & ISOWEEKNUM(A2) for late December dates that already belong to Week 1 of next year."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"30-Dec-2024 labels as '2024-W01' instead of '2025-W01'"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use the Thursday-anchored year formula: =YEAR(A2 - WEEKDAY(A2, 2) + 4)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NAME? Error in Legacy Excel"}</td>
                  <td className="py-3 px-4 font-sans">{"ISOWEEKNUM was introduced in Excel 2013. Opening the sheet in Excel 2010 or older throws #NAME?."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=ISOWEEKNUM(A2) in Excel 2010"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use backward-compatible equivalent: =WEEKNUM(A2, 21)."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Argument"}</td>
                  <td className="py-3 px-4 font-sans">{"Date cell contains unrecognized text string."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=ISOWEEKNUM('text')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Sanitize using DATEVALUE() or DATE(YYYY, MM, DD)."}</td>
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
              <span className="text-indigo-400 font-bold">The Golden ISO Year-Week Formula</span>
              <p className="text-slate-300">{"Save this formula in your notes: =YEAR(A2 - WEEKDAY(A2, 2) + 4) & '-W' & TEXT(ISOWEEKNUM(A2), '00'). It is the only 100% bug-free ISO string generator in Excel."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Why Week 53 Exists</span>
              <p className="text-slate-300">{"In common years starting on Thursday or leap years starting on Wednesday/Thursday, the year contains 53 full ISO weeks."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Full Canonical ISO 8601 String</span>
              <p className="text-slate-300">{"Construct complete standard ISO week date: =YEAR(A2 - WEEKDAY(A2,2)+4) & '-W' & TEXT(ISOWEEKNUM(A2), '00') & '-' & WEEKDAY(A2, 2). E.g. '2026-W46-4'."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Direct Weekday Alignment</span>
              <p className="text-slate-300">{"Under ISO 8601, Monday is always day 1 and Sunday is always day 7. Always pair ISOWEEKNUM with WEEKDAY(A2, 2)."}</p>
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
              • <strong>Global Engineering:</strong> {"Why does the ISO 8601 standard stipulate that Week 1 must contain at least 4 days of the new calendar year?"}
            </p>

            <p key="1">
              • <strong>Data Pipeline Integrity:</strong> {"If a database ETL pipeline incorrectly extracts =YEAR(A2) alongside ISOWEEKNUM, what reporting errors occur during the final week of December?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 13: ISOWEEKNUM Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="ISOWEEKNUM Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"ISOWEEKNUM is mandatory for European trade and multinational supply chains. Remember: NEVER write =YEAR(A2) & ISOWEEKNUM(A2) — doing so will corrupt late December dates every few years! Always anchor the year to the Thursday of the week: =YEAR(A2 - WEEKDAY(A2, 2) + 4)."}
          />
        </div>
      </div>
    </div>
  );
}
