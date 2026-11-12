"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic14() {
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

  const [inpWkStart, setInpWkStart] = useState("2026-11-12");
  const [inpWkDays, setInpWkDays] = useState(10);
  const [includeHoliday, setIncludeHoliday] = useState(true);

  const sampleHolidays = ["2026-11-18"]; // Sample holiday in the path

  const workdayResult = useMemo(() => {
    const s = new Date(inpWkStart);
    const n = parseInt(inpWkDays, 10);

    if (isNaN(s.getTime()) || isNaN(n)) {
      return { isError: true, error: "#VALUE! Invalid date or days argument" };
    }

    const holidaysList = includeHoliday ? sampleHolidays : [];

    let curr = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    let step = n >= 0 ? 1 : -1;
    let daysToCount = Math.abs(n);
    let weekendsSkipped = 0;
    let holidaysSkipped = 0;

    while (daysToCount > 0) {
      curr.setDate(curr.getDate() + step);
      const dayOfWeek = curr.getDay(); // 0 = Sun, 6 = Sat
      const isoStr = curr.toISOString().slice(0, 10);

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendsSkipped++;
      } else if (holidaysList.includes(isoStr)) {
        holidaysSkipped++;
      } else {
        daysToCount--;
      }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = `${String(curr.getDate()).padStart(2, "0")}-${monthNames[curr.getMonth()]}-${curr.getFullYear()}`;
    const dayName = curr.toLocaleDateString("en-US", { weekday: "long" });

    const totalCalendarDays = Math.round(Math.abs(curr.getTime() - s.getTime()) / 86400000);

    return {
      isError: false,
      outDateStr,
      dayName,
      totalCalendarDays,
      weekendsSkipped,
      holidaysSkipped
    };
  }, [inpWkStart, inpWkDays, includeHoliday]);

  const applyPreset = (preset) => {
    if (preset === "sprint_10") {
      setInpWkStart("2026-11-12");
      setInpWkDays(10);
      setIncludeHoliday(false);
    } else if (preset === "sprint_holiday") {
      setInpWkStart("2026-11-12");
      setInpWkDays(10);
      setIncludeHoliday(true);
    } else if (preset === "po_lead") {
      setInpWkStart("2026-11-13"); // Friday
      setInpWkDays(3);
      setIncludeHoliday(false);
    } else if (preset === "lookback") {
      setInpWkStart("2026-11-16");
      setInpWkDays(-5);
      setIncludeHoliday(false);
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
              ⚡ Date & Calendar Engineering · Topic 14
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Project Management · Business Days
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Plan & Schedule
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            WORKDAY Function — Project Sprints & Business Day Deadline Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">WORKDAY(start_date, days, [holidays])</code> function returns the date before or after a specified number of workdays, automatically excluding standard weekends (Saturday and Sunday) and any user-specified statutory or corporate holidays.</p><p>In enterprise project management, supply chain procurement, legal contract timelines, and software sprint planning, delivery milestones cannot be calculated using simple day addition (<code className="text-rose-400 font-mono">=A2 + 10</code>) because work ceases over the weekend. A 10-business-day sprint actually spans 14 calendar days (or more if holidays intervene). <code className="text-indigo-300 font-mono">WORKDAY()</code> accurately steps through the business calendar, ensuring project milestones, purchase order promises, and regulatory notice periods land exclusively on genuine working business days.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=WORKDAY(start_date, days, [holidays])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Project Management, Agile Sprints & Procurement Lead Times</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =WORKDAY(SprintStart, 10, HolidayRange) (Sprint Completion Date)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive WORKDAY Sprint Scheduler
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate business sprint delivery dates, observe automatic weekend skipping, and test holiday pushing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("sprint_10")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            10-Day Sprint (Clean)
          </button>
          <button
            onClick={() => applyPreset("sprint_holiday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            10-Day Sprint + Holiday
          </button>
          <button
            onClick={() => applyPreset("po_lead")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            3-Day Lead (Over Weekend)
          </button>
          <button
            onClick={() => applyPreset("lookback")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            -5 Day Audit Lookback
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Sprint Start (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Base Date</span>
          </label>
          <input
            type="date"
            value={inpWkStart}
            onChange={(e) => setInpWkStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Workdays (Non-Weekend)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer (+ / -)</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpWkDays}
            onChange={(e) => setInpWkDays(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Holiday Exclusion Filter
          </label>
          <label className="flex items-center gap-2 cursor-pointer mt-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={includeHoliday}
              onChange={(e) => setIncludeHoliday(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include Public Holiday (18-Nov-2026)</span>
          </label>
          <span className="text-[10px] text-slate-500 mt-1">Pushes delivery by 1 business day</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WORKDAY("{inpWkStart}", {inpWkDays}{includeHoliday ? ', {"2026-11-18"}' : ""})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Target Delivery:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {workdayResult.isError ? workdayResult.error : workdayResult.outDateStr}
            </span>
          </div>
        </div>

        {!workdayResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Delivery Day:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {workdayResult.dayName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Calendar Days:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                {workdayResult.totalCalendarDays} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Weekend Days Skipped:</span>
              <span className="text-purple-300 font-semibold font-mono text-base">
                {workdayResult.weekendsSkipped} Days (Sat/Sun)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Holidays Skipped:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                {workdayResult.holidaysSkipped} Days
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
              Business Day Stepping Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical WORKDAY Formula Signature</div>
            <div className="text-white font-bold text-base">
              =WORKDAY(start_date, days, [holidays])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The starting date from which business days are counted.</div><div>• <strong className="text-sky-300">days:</strong> Required. The number of non-weekend, non-holiday days before (negative integer) or after (positive integer) start_date.</div><div>• <strong className="text-amber-300">holidays:</strong> Optional. A cell range or array constant containing one or more dates to exclude from the working calendar (e.g. Durga Puja, Diwali, Republic Day).</div>
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
              <span className="text-emerald-400">📊</span> WORKDAY Calendar Stepping Behavior Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how WORKDAY skips Saturdays, Sundays, and public holidays.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">Workdays Added</th>
                  <th className="py-3 px-4">Holidays Excluded</th>
                  <th className="py-3 px-4">Resulting Deadline</th>
                  <th className="py-3 px-4">Calendar Days Elapsed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-13 (Fri)</td>
        <td className="py-3.5 px-4 text-white">1 Workday</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-11-16 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">3 Days (Skips Sat & Sun)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12 (Thu)</td>
        <td className="py-3.5 px-4 text-white">5 Workdays</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-11-19 (Thu)</td>
        <td className="py-3.5 px-4 text-slate-300">7 Days (Skips 1 Weekend)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12 (Thu)</td>
        <td className="py-3.5 px-4 text-white">10 Workdays</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-11-26 (Thu)</td>
        <td className="py-3.5 px-4 text-slate-300">14 Days (Standard 2-Week Sprint)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12 (Thu)</td>
        <td className="py-3.5 px-4 text-white">10 Workdays</td>
        <td className="py-3.5 px-4 text-amber-300">2026-11-18 (Wed)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-11-27 (Fri)</td>
        <td className="py-3.5 px-4 text-slate-300">15 Days (Pushed 1 extra day for holiday)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-16 (Mon)</td>
        <td className="py-3.5 px-4 text-white">-5 Workdays</td>
        <td className="py-3.5 px-4 text-slate-400">None</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">2026-11-09 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">7 Days Lookback (Backward step)</td>
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
                The Holiday Range Trap & Dynamic Table Spill Ranges
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why referencing static ranges $H$2:$H$10 creates silent errors when new holidays are added.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A major vulnerability in enterprise project tracking is hardcoding holiday ranges like <code className="text-rose-400 font-mono">=WORKDAY(A2, 10, $H$2:$H$10)</code>.</p><p>When HR adds an impromptu state holiday (e.g. Cyclone warning or public holiday declared by the West Bengal Government), if an analyst appends the date in cell <code className="text-white font-mono">H11</code>, it sits outside the hardcoded formula range! The project deadline fails to adjust, resulting in false SLA breach alerts! <br/>To safeguard your templates, place holidays in an <strong>official Excel Table</strong> (<code className="text-emerald-300 font-mono">=WORKDAY(A2, 10, tblHolidays[Date])</code>) or use a dynamic spill range (<code className="text-emerald-300 font-mono">H2#</code>), ensuring that new holidays instantly propagate across all project schedules.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle Static Holiday Range Reference
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=WORKDAY(A2, 10, $Z$2:$Z$15)"}
                </div>
                <p className="text-xs text-slate-400">
                  Fails to include holidays added beyond row 15; causes erroneous milestone dates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Excel Table Structured Reference
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=WORKDAY(A2, 10, tblHolidays[HolidayDate])"}
                </div>
                <p className="text-xs text-slate-400">
                  Dynamically expands whenever HR inserts new statutory or company holidays.
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
            WORKDAY skipping weekends and holidays to land safely on valid operational business days.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="80" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Thu (Start)</text>
        <text x="80" y="105" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold">12-Nov</text>

        <rect x="140" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="190" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Fri (Day 1)</text>
        <text x="190" y="105" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold">13-Nov</text>

        <rect x="250" y="50" width="100" height="90" rx="10" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="300" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold font-mono">Sat (SKIP)</text>
        <text x="300" y="105" textAnchor="middle" fill="#F43F5E" className="text-xs font-bold">Weekend</text>

        <rect x="360" y="50" width="100" height="90" rx="10" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="410" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold font-mono">Sun (SKIP)</text>
        <text x="410" y="105" textAnchor="middle" fill="#F43F5E" className="text-xs font-bold">Weekend</text>

        <rect x="470" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="520" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Mon (Day 2)</text>
        <text x="520" y="105" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold">16-Nov</text>

        <rect x="580" y="50" width="100" height="90" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <text x="630" y="80" textAnchor="middle" fill="#FEF08A" className="text-xs font-bold font-mono">Tue (SKIP)</text>
        <text x="630" y="105" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold">Holiday</text>

        <rect x="690" y="45" width="120" height="100" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="750" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Wed (Day 3)</text>
        <text x="750" y="105" textAnchor="middle" fill="#6EE7B7" className="text-sm font-bold font-mono">18-Nov</text>
        <text x="750" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">DELIVERY</text>
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
                Explore real WORKDAY formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic14"
            title="Topic 14: WORKDAY Master Practice Grid"
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
                  Scenario 1: Software Project Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Tech Park</span>
              </div>
              <h3 className="text-base font-bold text-white">Agile 2-Week Sprint Release Deadline Generator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Sprints consist of exactly 10 working days starting on sprint launch date in cell A2. Determine the sprint completion and demo presentation date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 10 working business days excluding holidays</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(A2, 10, tblHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"26-Nov-2026 (for sprint launched 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Supply Chain Procurement
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Industrial Spares</span>
              </div>
              <h3 className="text-base font-bold text-white">Vendor Purchase Order Guaranteed Lead Time Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Vendor agreement guarantees delivery within 15 business days of PO issue date in B2. Calculate the contractually binding delivery date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Advance by 15 working days</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(B2, 15, $Z$2:$Z$20)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"03-Dec-2026 (from 12-Nov-2026 PO)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Corporate Legal & Regulatory
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata High Court Legal Cell</span>
              </div>
              <h3 className="text-base font-bold text-white">Statutory 30-Business-Day Legal Notice Expiration</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Statutory civil legal notice requires a response within 30 business days from the formal service date in C2. Establish the response deadline."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Step forward 30 working business days</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(C2, 30, CourtHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"28-Dec-2026 (for notice served 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Banking Treasury & FX Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dalhousie Forex Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">Spot Foreign Exchange T+2 Settlement Date</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Spot FX currency trades settle on 'T+2' (Trade Date + 2 business days), skipping weekends and bank holidays."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Add 2 business days to Trade Date in D2</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(D2, 2, BankingHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"16-Nov-2026 (for trade executed on Thursday 12-Nov)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Manufacturing Assembly Scheduling
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Railway Wagon Plant</span>
              </div>
              <h3 className="text-base font-bold text-white">Locomotive Bogie Fabrication Cycle Completion</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Bogie fabrication requires 8 uninterrupted manufacturing days on a 5-day week starting from date in E2. Establish rollout date."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate 8 working manufacturing days</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(E2, 8, PlantHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"24-Nov-2026 (from 12-Nov start)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Government Civil Works
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Municipal Engineering</span>
              </div>
              <h3 className="text-base font-bold text-white">Contractor Tender Submission Window</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Municipal infrastructure tender gives bidders 21 working days from gazette publication date in F2 to submit sealed bids."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate 21 working days tender close date</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY(F2, 21, StateHolidays)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"11-Dec-2026 (for tender published 12-Nov)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand Weekend Invariance</span>
              <p>{"WORKDAY strictly treats Saturday and Sunday as non-working days. It cannot be configured for other weekend days (use WORKDAY.INTL for custom weekends)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WORKDAY('2026-11-13', 1) -> 2026-11-16 (Skips Sat & Sun)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Prepare the Holiday Range</span>
              <p>{"Create a clean, dedicated column of public holidays formatted as authentic dates."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Range: $Z$2:$Z$20 or Table: tblHolidays[Date]"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Execute Forward or Backward Stepping</span>
              <p>{"Positive days step forward in time; negative days step backward for retroactive SLA audits."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Forward: =WORKDAY(A2, 10, Holidays)\nBackward: =WORKDAY(A2, -5, Holidays)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format Cell Output as Date</span>
              <p>{"WORKDAY outputs a numeric date serial. Apply Short Date format."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format Cells > Date"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Skips Wrong Days in Middle East"}</td>
                  <td className="py-3 px-4 font-sans">{"WORKDAY is hardcoded for Saturday/Sunday weekends. It cannot handle Friday/Saturday weekends in Gulf countries."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Using WORKDAY in Dubai, Riyadh, or Cairo"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Upgrade to WORKDAY.INTL specifying weekend code 7 (Fri/Sat)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Holiday Ignored by Formula"}</td>
                  <td className="py-3 px-4 font-sans">{"Holiday cell contains text rather than a numeric date serial, or sits outside the hardcoded formula range."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Holiday entered as '15-Aug' text string"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert holidays to authentic dates and use an Excel Table structured reference."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"Start date or one of the holiday entries is unparseable text."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=WORKDAY('invalid', 5)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Verify that all holiday dates return TRUE under =ISNUMBER()."}</td>
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
              <span className="text-indigo-400 font-bold">Dynamic Table Reference for Holidays</span>
              <p className="text-slate-300">{"Always put holidays in an Excel Table: =WORKDAY(A2, 10, tblHolidays[Date]). It automatically expands as you add new holidays!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">The Zero-Day Normalization Trick</span>
              <p className="text-slate-300">{"Need to ensure a date lands on a working day? Use: =WORKDAY(A2 - 1, 1, Holidays). If A2 is a Saturday, it rolls cleanly to Monday!"}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Retroactive SLA Audit Lookback</span>
              <p className="text-slate-300">{"Calculate when a 5-day SLA ticket was due for resolution: =WORKDAY(ResolvedDate, -5, Holidays)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Array Constant Holidays</span>
              <p className="text-slate-300">{"For quick one-off formulas without a sheet range: =WORKDAY(A2, 10, {'2026-11-18', '2026-12-25'})."}</p>
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
              • <strong>System Architecture:</strong> {"Why does WORKDAY automatically advance to Monday when start_date is a Friday and days = 1, completely ignoring the 48 hours of the weekend?"}
            </p>

            <p key="1">
              • <strong>Contract Integrity:</strong> {"If a software contract specifies '10 Days' without stating 'Business Days', how can an analyst prove that WORKDAY should be used instead of simple +10 addition?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 14: WORKDAY Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="WORKDAY Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Never calculate project sprints or vendor delivery dates using simple addition like =A2+10. Work ceases over the weekend. A 10-day sprint always requires at least 14 calendar days. Master WORKDAY and remember the zero-day trick (=WORKDAY(A2-1, 1, Holidays)) to normalize any weekend date to Monday."}
          />
        </div>
      </div>
    </div>
  );
}
