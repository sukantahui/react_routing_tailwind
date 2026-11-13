"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic16_files/topic16_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic16() {
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

  const [inpNetStart, setInpNetStart] = useState("2026-11-01");
  const [inpNetEnd, setInpNetEnd] = useState("2026-11-30");
  const [excludeNovHoliday, setExcludeNovHoliday] = useState(true);
  const [dailyRate, setDailyRate] = useState(15000);
  const [selectedMask, setSelectedMask] = useState("0000011");

  const weekendMaskOptions = [
    { mask: "0000011", name: "Standard 5-Day (NETWORKDAYS Default)", desc: "Saturday & Sunday non-working (Western & Indian Corporate)" },
    { mask: "0000110", name: "Middle East GCC Trade Corridor", desc: "Friday & Saturday non-working (Sunday-Thursday workweek)" },
    { mask: "0000001", name: "Indian 6-Day Manufacturing / Plant", desc: "Sunday only non-working (Monday-Saturday factory shift)" },
    { mask: "0000100", name: "Islamic Port & Friday Off", desc: "Friday only non-working (Saturday-Thursday workweek)" },
    { mask: "0101011", name: "Part-Time Consultant (Mon/Wed/Fri)", desc: "Tuesday, Thursday, Saturday & Sunday non-working" },
    { mask: "0000000", name: "24/7 Mission-Critical Continuous Operations", desc: "Zero weekend days (All 7 days operational)" }
  ];

  const sampleHolidaysNov = ["2026-11-18"];

  const netDaysResult = useMemo(() => {
    const s = new Date(inpNetStart);
    const e = new Date(inpNetEnd);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const holidays = excludeNovHoliday ? sampleHolidaysNov : [];

    // Calculate inclusive network days
    const isReverse = s > e;
    let dStart = isReverse ? new Date(e) : new Date(s);
    let dEnd = isReverse ? new Date(s) : new Date(e);

    let curr = new Date(dStart.getFullYear(), dStart.getMonth(), dStart.getDate());
    let targetEnd = new Date(dEnd.getFullYear(), dEnd.getMonth(), dEnd.getDate());

    let netCount = 0;
    let weekendCount = 0;
    let holidayCount = 0;
    let totalCalendarDays = 0;

    // Custom mask counting
    let maskNetCount = 0;
    let maskWeekendCount = 0;

    while (curr <= targetEnd) {
      totalCalendarDays++;
      const jsDay = curr.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
      const isoStr = curr.toISOString().slice(0, 10);
      const isHol = holidays.includes(isoStr);

      // Standard NETWORKDAYS (Sat=6, Sun=0)
      if (jsDay === 0 || jsDay === 6) {
        weekendCount++;
      } else if (isHol) {
        holidayCount++;
      } else {
        netCount++;
      }

      // Custom mask evaluation (pos 0=Mon ... pos 6=Sun)
      const maskIdx = jsDay === 0 ? 6 : jsDay - 1;
      const isMaskWeekend = selectedMask.charAt(maskIdx) === "1";
      if (isMaskWeekend) {
        maskWeekendCount++;
      } else if (!isHol) {
        maskNetCount++;
      }

      curr.setDate(curr.getDate() + 1);
    }

    const finalNet = isReverse ? -netCount : netCount;
    const finalMaskNet = isReverse ? -maskNetCount : maskNetCount;
    const totalBillableHours = finalNet * 8;
    const totalBillingAmount = finalNet * dailyRate;

    return {
      isError: false,
      finalNet,
      finalMaskNet,
      totalCalendarDays,
      weekendCount,
      maskWeekendCount,
      holidayCount,
      totalBillableHours,
      totalBillingAmount: totalBillingAmount.toLocaleString("en-IN")
    };
  }, [inpNetStart, inpNetEnd, excludeNovHoliday, dailyRate, selectedMask]);

  const applyPreset = (preset) => {
    if (preset === "full_nov") {
      setInpNetStart("2026-11-01");
      setInpNetEnd("2026-11-30");
      setExcludeNovHoliday(true);
    } else if (preset === "one_week") {
      setInpNetStart("2026-11-09");
      setInpNetEnd("2026-11-13");
      setExcludeNovHoliday(false);
    } else if (preset === "quarter_q4") {
      setInpNetStart("2026-10-01");
      setInpNetEnd("2026-12-31");
      setExcludeNovHoliday(true);
    } else if (preset === "pure_weekend") {
      setInpNetStart("2026-11-14");
      setInpNetEnd("2026-11-15");
      setExcludeNovHoliday(false);
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
              ⚡ Date & Calendar Engineering · Topic 16
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Utilization · Capacity Planning
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Quantify
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            NETWORKDAYS Function — Net Working Days & Billable Hours Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">NETWORKDAYS(start_date, end_date, [holidays])</code> function returns the exact number of whole working days between a starting date and an ending date, automatically excluding Saturdays, Sundays, and optional statutory holidays.</p><p>In corporate workforce utilization, IT professional services billing, HR payroll capacity planning, and SLA resolution tracking, billing clients by total calendar days is contractually prohibited. A calendar month of 31 days contains only 20 to 22 actual billable working days. <code className="text-indigo-300 font-mono">NETWORKDAYS()</code> counts the net operational days <strong>inclusively</strong> (both start_date and end_date are evaluated and counted if they are working days), making it the definitive engine for calculating gross billable consultant hours and employee attendance quotas.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=NETWORKDAYS(start_date, end_date, [holidays])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Consultant Billable Hours, Workforce Capacity & Monthly Utilization</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =NETWORKDAYS(MonthStart, MonthEnd, Holidays) * 8 (Monthly Billable Hours)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive NETWORKDAYS Utilization Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate gross billable working days, inspect inclusive boundary counting, and project billing revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("full_nov")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Full Month (Nov 2026)
          </button>
          <button
            onClick={() => applyPreset("one_week")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            5-Day Week (40h)
          </button>
          <button
            onClick={() => applyPreset("quarter_q4")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Full Q4 Quarter (65d)
          </button>
          <button
            onClick={() => applyPreset("pure_weekend")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Sat-Sun Span (0 Days)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Inclusive Boundary</span>
          </label>
          <input
            type="date"
            value={inpNetStart}
            onChange={(e) => setInpNetStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date</span>
            <span className="text-[10px] text-sky-400 font-mono">Inclusive Boundary</span>
          </label>
          <input
            type="date"
            value={inpNetEnd}
            onChange={(e) => setInpNetEnd(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Weekend Mask Mode</span>
            <span className="text-[10px] text-amber-400 font-mono">e.g. ('0000011')</span>
          </label>
          <select
            value={selectedMask}
            onChange={(e) => setSelectedMask(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {weekendMaskOptions.map((opt) => (
              <option key={opt.mask} value={opt.mask}>
                {opt.mask} — {opt.name}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-400 truncate">
            {weekendMaskOptions.find((o) => o.mask === selectedMask)?.desc}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Daily Rate & Holiday Filter
          </label>
          <input
            type="number"
            step="1000"
            value={dailyRate}
            onChange={(e) => setDailyRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Daily rate ₹"
          />
          <label className="flex items-center gap-2 cursor-pointer mt-1 text-[11px] text-slate-400">
            <input
              type="checkbox"
              checked={excludeNovHoliday}
              onChange={(e) => setExcludeNovHoliday(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Exclude Holiday (18-Nov)</span>
          </label>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        {/* Comparison Header: Default NETWORKDAYS vs Custom Weekend String */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                1. Classic NETWORKDAYS (Sat & Sun Hardcoded)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800">
                Default
              </span>
            </div>
            <div className="font-mono text-xs text-slate-300 break-all">
              =NETWORKDAYS("{inpNetStart}", "{inpNetEnd}"{excludeNovHoliday ? ', {"2026-11-18"}' : ""})
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Result:</span>
              <span className="font-mono text-xl font-black text-indigo-300">
                {netDaysResult.isError ? netDaysResult.error : `${netDaysResult.finalNet} Working Days`}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                2. Equivalent Weekend String Syntax ('{selectedMask}')
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                {selectedMask === "0000011" ? "Identical Match" : "Custom Schedule"}
              </span>
            </div>
            <div className="font-mono text-xs text-slate-300 break-all">
              =NETWORKDAYS.INTL("{inpNetStart}", "{inpNetEnd}", <span className="text-amber-300 font-bold">"{selectedMask}"</span>{excludeNovHoliday ? ', {"2026-11-18"}' : ""})
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Result:</span>
              <span className="font-mono text-xl font-black text-amber-300">
                {netDaysResult.isError ? netDaysResult.error : `${netDaysResult.finalMaskNet} Working Days`}
              </span>
              {selectedMask === "0000011" && (
                <span className="text-[11px] text-emerald-400 font-semibold ml-2">
                  ✓ Exactly equals NETWORKDAYS
                </span>
              )}
            </div>
          </div>
        </div>

        {!netDaysResult.isError && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Billable Labor Hours:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                {netDaysResult.totalBillableHours} Hours (x 8h)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Consulting Revenue:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                ₹{netDaysResult.totalBillingAmount}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Weekend Days Excluded:</span>
              <span className="text-purple-300 font-semibold font-mono text-base">
                {selectedMask === "0000011" ? netDaysResult.weekendCount : netDaysResult.maskWeekendCount} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Calendar Days:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {netDaysResult.totalCalendarDays} Days
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
              Inclusive Business Day Counter
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical NETWORKDAYS Formula Signature</div>
            <div className="text-white font-bold text-base">
              =NETWORKDAYS(start_date, end_date, [holidays])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the evaluated period.</div><div>• <strong className="text-sky-300">end_date:</strong> Required. The ending date of the evaluated period. If end_date is earlier than start_date, the function returns a negative value.</div><div>• <strong className="text-amber-300">holidays:</strong> Optional. A cell range or array constant containing dates to exclude from the working calendar.</div><div>• <strong className="text-emerald-300">Inclusive Counting Rule:</strong> Both start_date and end_date are counted if they are valid working days. Monday to Monday yields 6 working days!</div>
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
              <span className="text-emerald-400">📊</span> NETWORKDAYS Inclusive Counting & Horizon Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how NETWORKDAYS counts working days and handles weekends and holidays.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Total Calendar Days</th>
                  <th className="py-3 px-4">Excluded Holidays</th>
                  <th className="py-3 px-4">NETWORKDAYS Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-02 (Mon)</td>
        <td className="py-3.5 px-4 text-white">2026-11-06 (Fri)</td>
        <td className="py-3.5 px-4 text-slate-300">5 Days</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">5 Working Days (40 Billable Hours)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-02 (Mon)</td>
        <td className="py-3.5 px-4 text-white">2026-11-09 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">8 Days (Incl)</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">6 Working Days (Skips Sat & Sun)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-01 (Sun)</td>
        <td className="py-3.5 px-4 text-white">2026-11-30 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">30 Days</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">21 Working Days (Full Month Nov 2026)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-01 (Sun)</td>
        <td className="py-3.5 px-4 text-white">2026-11-30 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">30 Days</td>
        <td className="py-3.5 px-4 text-amber-300">2026-11-18 (Wed)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">20 Working Days (Minus 1 Holiday)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-14 (Sat)</td>
        <td className="py-3.5 px-4 text-white">2026-11-15 (Sun)</td>
        <td className="py-3.5 px-4 text-slate-300">2 Days</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">0 Working Days (Pure Weekend Span)</td>
      </tr>
    
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4B: 7-CHARACTER BINARY WEEKEND MASK ARCHITECTURE ('0000011')
        ========================================================================= */}
        <section
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-900/40 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Global Calendar Engineering
                </span>
                <span className="text-xs text-slate-400 font-mono">NETWORKDAYS Equivalent</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-amber-400">🌍</span> The 7-Character Binary Weekend String Architecture: Understanding <code className="text-amber-300 font-mono text-lg font-bold">('0000011')</code>
              </h2>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0">
              0 = Working · 1 = Non-Working
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
            <p>
              In classic Excel, <code className="text-indigo-300 font-mono font-bold">NETWORKDAYS(start, end, [holidays])</code> has a <strong>permanently hardcoded weekend definition</strong>: Saturday and Sunday are always non-working days.
            </p>
            <p>
              To support global enterprise supply chains and diverse labor schedules, Excel introduced the <strong>7-character binary weekend string mask</strong>. In this system, exactly 7 digits represent <strong>Monday through Sunday in sequential order</strong>. A <code className="text-emerald-400 font-mono font-bold">0</code> indicates an operational working day, while a <code className="text-rose-400 font-mono font-bold">1</code> marks a non-working weekend day.
            </p>
            <p className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-900/50 text-indigo-200 font-medium">
              💡 <strong>Core Architectural Fact:</strong> Calling <code className="text-white font-mono font-bold">=NETWORKDAYS(A1, B1, Holidays)</code> is 100% mathematically and computationally identical to writing <code className="text-amber-300 font-mono font-bold">=NETWORKDAYS.INTL(A1, B1, "0000011", Holidays)</code>. The string <code className="text-amber-300 font-mono font-bold">'0000011'</code> explicitly defines Monday through Friday as working days (five zeros) and Saturday and Sunday as non-working days (two ones).
            </p>
          </div>

          {/* VISUAL 7-DIGIT MASK BREAKDOWN */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Anatomy of Weekend String: <code className="text-amber-300 font-mono text-sm">"0000011"</code></span>
              <span className="text-[11px] text-slate-400 font-mono">Position 1 (Mon) → Position 7 (Sun)</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center font-mono">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 1</span>
                <span className="text-sm font-bold text-white block">Mon</span>
                <span className="text-lg font-black text-emerald-400">0</span>
                <span className="text-[9px] text-emerald-300 block mt-0.5">Work</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 2</span>
                <span className="text-sm font-bold text-white block">Tue</span>
                <span className="text-lg font-black text-emerald-400">0</span>
                <span className="text-[9px] text-emerald-300 block mt-0.5">Work</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 3</span>
                <span className="text-sm font-bold text-white block">Wed</span>
                <span className="text-lg font-black text-emerald-400">0</span>
                <span className="text-[9px] text-emerald-300 block mt-0.5">Work</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 4</span>
                <span className="text-sm font-bold text-white block">Thu</span>
                <span className="text-lg font-black text-emerald-400">0</span>
                <span className="text-[9px] text-emerald-300 block mt-0.5">Work</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 5</span>
                <span className="text-sm font-bold text-white block">Fri</span>
                <span className="text-lg font-black text-emerald-400">0</span>
                <span className="text-[9px] text-emerald-300 block mt-0.5">Work</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 6</span>
                <span className="text-sm font-bold text-white block">Sat</span>
                <span className="text-lg font-black text-rose-400">1</span>
                <span className="text-[9px] text-rose-300 block mt-0.5">Weekend</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700/60">
                <span className="text-[10px] text-slate-400 block mb-1">Pos 7</span>
                <span className="text-sm font-bold text-white block">Sun</span>
                <span className="text-lg font-black text-rose-400">1</span>
                <span className="text-[9px] text-rose-300 block mt-0.5">Weekend</span>
              </div>
            </div>
          </div>

          {/* INTERNATIONAL WEEKEND MASK COMPARISON MATRIX */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>🌐</span> Master Weekend Mask Comparison Matrix
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                    <th className="py-3 px-3.5">Weekend Mask</th>
                    <th className="py-3 px-3.5">Workweek Schedule</th>
                    <th className="py-3 px-3.5">Days Off</th>
                    <th className="py-3 px-3.5">Target Industry / Regional Corridor</th>
                    <th className="py-3 px-3.5">Production Excel Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  <tr className="hover:bg-slate-900/40 bg-indigo-950/20">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0000011"</td>
                    <td className="py-3 px-3.5 text-white font-sans">Mon – Fri (5-Day)</td>
                    <td className="py-3 px-3.5 text-rose-300">Sat & Sun</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">Western / Indian IT Corporate (Default NETWORKDAYS)</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0000011", Holidays)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0000110"</td>
                    <td className="py-3 px-3.5 text-white font-sans">Sun – Thu (5-Day)</td>
                    <td className="py-3 px-3.5 text-rose-300">Fri & Sat</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">Middle East GCC (Dubai, Riyadh, Doha Cargo Customs)</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0000110", Holidays)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0000001"</td>
                    <td className="py-3 px-3.5 text-white font-sans">Mon – Sat (6-Day)</td>
                    <td className="py-3 px-3.5 text-rose-300">Sun Only</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">Indian Manufacturing Plants, EPC Site Construction, Retail</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0000001", Holidays)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0000100"</td>
                    <td className="py-3 px-3.5 text-white font-sans">Sat – Thu (6-Day)</td>
                    <td className="py-3 px-3.5 text-rose-300">Fri Only</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">Traditional Islamic Port Customs & Municipal Offices</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0000100", Holidays)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0101011"</td>
                    <td className="py-3 px-3.5 text-white font-sans">Mon, Wed, Fri (3-Day)</td>
                    <td className="py-3 px-3.5 text-rose-300">Tue, Thu, Sat, Sun</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">Part-Time Consultant, Hospital Visiting Surgeon, Job-Share</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0101011", Holidays)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3.5 text-amber-300 font-bold">"0000000"</td>
                    <td className="py-3 px-3.5 text-white font-sans">All 7 Days (24/7)</td>
                    <td className="py-3 px-3.5 text-emerald-400 font-sans">None (0 Days)</td>
                    <td className="py-3 px-3.5 text-slate-300 font-sans">24/7 Cloud Data Centers, ICU Hospital Wards, Power Grid</td>
                    <td className="py-3 px-3.5 text-emerald-300 font-bold">=NETWORKDAYS.INTL(B4, C4, "0000000", Holidays)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5 CONCRETE REAL-WORLD CODE EXAMPLES */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>💻</span> 5 Practical Production Formula Examples
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 block">
                  Example 1: Standard Indian/US Corporate 5-Day SLA
                </span>
                <p className="text-xs text-slate-400">
                  Calculates net operational days using the standard Saturday/Sunday weekend string, exactly matching NETWORKDAYS.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-emerald-300">
                  =NETWORKDAYS.INTL(B4, C4, "0000011", tblHolidays[Date])
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">
                  Example 2: Middle East Gulf Cargo Transit SLA
                </span>
                <p className="text-xs text-slate-400">
                  For shipments clearing Jebel Ali (Dubai) or Dammam (Saudi Arabia) where customs offices take Friday and Saturday off.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-amber-300">
                  =NETWORKDAYS.INTL(B4, C4, "0000110", MiddleEastHolidays)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-sky-400 block">
                  Example 3: Manufacturing Plant 6-Day Production Shift
                </span>
                <p className="text-xs text-slate-400">
                  In Indian factory plants operating Monday through Saturday with only Sunday as the statutory rest day.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-sky-300">
                  =NETWORKDAYS.INTL(B4, C4, "0000001", FactoryShutdownDates)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400 block">
                  Example 4: Part-Time Senior Consultant Capacity
                </span>
                <p className="text-xs text-slate-400">
                  For contracted specialists who work strictly on Mondays, Wednesdays, and Fridays (Tuesday, Thursday, Saturday, Sunday off).
                </p>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-purple-300">
                  =NETWORKDAYS.INTL(MonthStart, MonthEnd, "0101011", Holidays) * 8
                </div>
              </div>
            </div>
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
                The Inclusive Off-By-One Accounting Quirk
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why NETWORKDAYS(Mon, Mon) returns 1, while simple subtraction returns 0.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A vital mathematical distinction that every financial auditor must grasp is that <code className="text-indigo-300 font-mono">NETWORKDAYS()</code> performs <strong>inclusive boundary counting</strong>.</p><p>In standard algebra, subtracting identical dates (<code className="text-white font-mono">2026-11-16 minus 2026-11-16</code>) yields <code className="text-white font-mono">0</code>. However, <code className="text-indigo-300 font-mono">=NETWORKDAYS("2026-11-16", "2026-11-16")</code> returns <code className="text-emerald-300 font-mono">1</code>! Why? Because Monday is a valid working day, and an employee working on that Monday delivered 1 billable day of labor. When subtracting days for durations where the start day should be exclusive, analysts must account for this boundary behavior.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Gross Calendar Day Billing Trap
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=(End - Start) * 8 * HourlyRate"}
                </div>
                <p className="text-xs text-slate-400">
                  Bills clients for weekend days when no work occurred, violating Master Services Agreements (MSAs).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Net Billable Hours Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=NETWORKDAYS(Start, End, tblHolidays[Date]) * 8 * HourlyRate"}
                </div>
                <p className="text-xs text-slate-400">
                  Calculates genuine operational working days and multiplies by standard 8-hour billable shift.
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
            Inclusive working day evaluation: evaluating each day between Start and End.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="50" width="100" height="90" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="80" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Mon (Start)</text>
        <text x="80" y="105" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">INCLUDED (1)</text>

        <rect x="140" y="50" width="100" height="90" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
        <text x="190" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Tue</text>
        <text x="190" y="105" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">INCLUDED (2)</text>

        <rect x="250" y="50" width="100" height="90" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
        <text x="300" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Wed</text>
        <text x="300" y="105" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">INCLUDED (3)</text>

        <rect x="360" y="50" width="100" height="90" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
        <text x="410" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Thu</text>
        <text x="410" y="105" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">INCLUDED (4)</text>

        <rect x="470" y="50" width="100" height="90" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
        <text x="520" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Fri (End)</text>
        <text x="520" y="105" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">INCLUDED (5)</text>

        <rect x="580" y="50" width="100" height="90" rx="10" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="630" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold font-mono">Sat</text>
        <text x="630" y="105" textAnchor="middle" fill="#F43F5E" className="text-xs font-bold">EXCLUDED (0)</text>

        <rect x="690" y="45" width="120" height="100" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="750" y="80" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">Total Net Days</text>
        <text x="750" y="108" textAnchor="middle" fill="#6EE7B7" className="text-xl font-black font-mono">5.0</text>
        <text x="750" y="128" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">40 Billable Hours</text>
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
                Explore real NETWORKDAYS formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic16"
            title="Topic 16: NETWORKDAYS Master Practice Grid"
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
                  Scenario 1: IT Professional Services Billing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V IT Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Monthly Consultant Time & Materials Billing Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Enterprise client contracts bill IT senior architects at INR 25,000 per billable working day. Calculate total monthly billing for month span in A2 to B2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate net working days and multiply by daily billing rate</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS(A2, B2, tblHolidays[Date]) * DailyConsultantRate"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 5,00,000.00 (for 20 working days in Nov 2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: HR Attendance & Capacity Planning
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Employee Expected Monthly Attendance Target</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"HR requires establishing the maximum possible working days an employee could have attended in any calendar month from month start date in C2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine EOMONTH with NETWORKDAYS for full-month capacity</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS(C2, EOMONTH(C2, 0), CompanyHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"20 Days Expected Capacity"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Customer Support & SLA Penalties
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Enterprise Support Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">Severity-2 Incident Business Day Resolution Time</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"SLA contract allows 5 business days for bug resolution. Given ticket opened on date D2 and resolved on date E2, calculate actual business days taken."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Measure business days elapsed inclusively</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS(D2, E2, SupportHolidays) - 1"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"4 Business Days (within 5-day SLA)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Manufacturing Plant Capacity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Industrial Engineering</span>
              </div>
              <h3 className="text-base font-bold text-white">Quarterly Production Plant Throughput Model</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Manufacturing plant produces 25 rail bogies per working day. Project quarterly production output for Q4 from F2 to G2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Multiply net working days by daily manufacturing capacity</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS(F2, G2, PlantHolidays) * 25"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"1,600 Bogies (for 64 working days)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Civil Construction & Infrastructure
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Flyover Project</span>
              </div>
              <h3 className="text-base font-bold text-white">Contractor Weather Delay Working Day Deduction</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Contractor is granted deadline extensions only for unworkable weather days that fell on scheduled working days (excluding weekends)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Verify working day overlap for monsoon delay</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS(RainStart, RainEnd, Holidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"7 Valid Working Days Extension"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Academic & University Administration
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kalyani University Faculty</span>
              </div>
              <h3 className="text-base font-bold text-white">Semester Mandated 90 Instructional Days Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"University Grants Commission (UGC) mandates at least 90 instructional teaching days per semester between term start in H2 and term end in I2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Audit academic calendar for 90-day UGC compliance</div>
                <div className="text-emerald-300 font-bold">{"=IF(NETWORKDAYS(H2, I2, AcademicHolidays) >= 90, \"UGC COMPLIANT\", \"DEFICIT - SCHEDULE EXTRA CLASSES\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"UGC COMPLIANT\" (94 teaching days)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand Inclusive Counting</span>
              <p>{"NETWORKDAYS counts both start and end dates. Monday to Friday evaluates to 5, not 4."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=NETWORKDAYS('2026-11-09', '2026-11-13') -> 5"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Provide Clean Holiday Ranges</span>
              <p>{"Always supply holidays as an authentic table or range to prevent billing for national holidays."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=NETWORKDAYS(Start, End, tblHolidays[Date])"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Convert Days to Hours</span>
              <p>{"Multiply the resulting net days by your corporate daily shift hours (typically 8.0 or 7.5)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Billable Hours: =NETWORKDAYS(A2, B2, Holidays) * 8"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Handle Negative Spans</span>
              <p>{"If end_date is before start_date, NETWORKDAYS returns a negative number, enabling automated variance tracking."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=NETWORKDAYS('2026-11-20', '2026-11-10') -> -9"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inclusive Boundary Off-By-One"}</td>
                  <td className="py-3 px-4 font-sans">{"Assuming NETWORKDAYS calculates elapsed duration rather than inclusive headcount."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Expecting NETWORKDAYS(Mon, Mon) to return 0"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Subtract 1 if you require exclusive elapsed duration: =NETWORKDAYS(Start, End) - 1."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Wrong Weekend in Middle East"}</td>
                  <td className="py-3 px-4 font-sans">{"NETWORKDAYS is hardcoded for Saturday/Sunday weekends. It cannot evaluate Middle East Friday/Saturday weekends."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Using NETWORKDAYS in Saudi Arabia or UAE"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Upgrade to NETWORKDAYS.INTL specifying weekend code 7."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"Start date, end date, or a holiday entry is formatted as text."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=NETWORKDAYS('2026-11-01', 'text')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Sanitize all dates with DATEVALUE() or DATE(YYYY, MM, DD)."}</td>
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
              <span className="text-indigo-400 font-bold">Full Month Working Days Idiom</span>
              <p className="text-slate-300">{"Calculate total working days in the current month dynamically: =NETWORKDAYS(EOMONTH(TODAY(), -1) + 1, EOMONTH(TODAY(), 0), Holidays)."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Working Days Remaining in the Month</span>
              <p className="text-slate-300">{"Track monthly sprint runway: =NETWORKDAYS(TODAY(), EOMONTH(TODAY(), 0), Holidays)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Billable Utilization Percentage</span>
              <p className="text-slate-300">{"Calculate consultant utilization: =ActualHoursBilled / (NETWORKDAYS(MonthStart, MonthEnd, Holidays) * 8)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Array Constant Holidays</span>
              <p className="text-slate-300">{"For quick ad-hoc analysis: =NETWORKDAYS(A2, B2, {'2026-11-18', '2026-12-25'})."}</p>
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
              • <strong>Accounting Mechanics:</strong> {"Why does NETWORKDAYS count both the start date and end date inclusively, whereas standard day subtraction (B2 - A2) counts exclusively?"}
            </p>

            <p key="1">
              • <strong>Contract Law:</strong> {"If a consulting contract stipulates billing 'per billable business day', what financial risk arises from calculating fees via simple subtraction divided by 7 times 5?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 16: NETWORKDAYS Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="NETWORKDAYS Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In IT consulting and corporate billing, NETWORKDAYS is the foundation of revenue recognition. Memorize the full-month capacity idiom: =NETWORKDAYS(EOMONTH(A2,-1)+1, EOMONTH(A2,0), Holidays). Always verify whether your client agreement requires inclusive or exclusive counting to prevent billing disputes."}
          />
        </div>
      </div>
    </div>
  );
}
