"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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

  const [inpEndDate, setInpEndDate] = useState("2026-11-26");
  const [inpStartDate, setInpStartDate] = useState("2026-11-12");

  const daysDifference = useMemo(() => {
    const e = new Date(inpEndDate);
    const s = new Date(inpStartDate);

    if (isNaN(e.getTime()) || isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    // Isolate midnight UTC to strictly replicate DAYS() behavior
    const utcE = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const utcS = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());

    const diffDays = Math.round((utcE - utcS) / 86400000);

    let statusText = "Milestone on Target";
    let badgeClass = "text-emerald-400";
    if (diffDays < 0) {
      statusText = `⚠️ Overdue by ${Math.abs(diffDays)} Days`;
      badgeClass = "text-rose-400";
    } else if (diffDays > 0) {
      statusText = `✓ ${diffDays} Days Remaining`;
      badgeClass = "text-emerald-400";
    }

    const weeks = (diffDays / 7).toFixed(1);

    return {
      isError: false,
      diffDays,
      statusText,
      badgeClass,
      weeks,
      isPositive: diffDays >= 0
    };
  }, [inpEndDate, inpStartDate]);

  const applyPreset = (preset) => {
    if (preset === "sprint") {
      setInpStartDate("2026-11-12");
      setInpEndDate("2026-11-26");
    } else if (preset === "overdue") {
      setInpStartDate("2026-11-12");
      setInpEndDate("2026-11-01");
    } else if (preset === "quarter") {
      setInpStartDate("2026-10-01");
      setInpEndDate("2026-12-31");
    } else if (preset === "annual") {
      setInpStartDate("2026-04-01");
      setInpEndDate("2027-03-31");
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
              ⚡ Date & Calendar Engineering · Topic 7
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Difference · Signed Arithmetic
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Compare
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DAYS Function — Signed Date Difference & SLA Variance Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">DAYS(end_date, start_date)</code> function calculates the exact signed number of calendar days between two dates. It was introduced in modern Excel to provide a formalized, error-checked function for date subtraction.</p><p>Unlike simple arithmetic subtraction (<code className="text-white font-mono">=B2 - A2</code>) which can silently produce misleading results when formulas encounter mixed data types or regional text dates, <code className="text-indigo-300 font-mono">DAYS()</code> explicitly coerces recognized date text and strips away all attached timestamps before calculating the interval. Crucially, it observes strict sign convention: if <code className="text-teal-300 font-mono">end_date</code> is chronologically before <code className="text-sky-300 font-mono">start_date</code>, it returns a <strong>negative integer</strong>, making it the perfect mathematical engine for overdue debt aging, schedule variances, and contract lead-time audits.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=DAYS(end_date, start_date)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Project Schedule Variances, Accounts Receivable & SLA Overruns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =DAYS(Deadline, TODAY()) (Days Remaining / Overdue)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive DAYS(End, Start) Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate signed date differences, observe parameter order sensitivity, and test schedule overdue variances.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("sprint")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            2-Week Sprint (+14)
          </button>
          <button
            onClick={() => applyPreset("overdue")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Overdue Invoice (-11)
          </button>
          <button
            onClick={() => applyPreset("quarter")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Quarter Span (91d)
          </button>
          <button
            onClick={() => applyPreset("annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Indian FY (364d)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date (Argument 1)</span>
            <span className="text-[10px] text-teal-400 font-mono">Target Deadline</span>
          </label>
          <input
            type="date"
            value={inpEndDate}
            onChange={(e) => setInpEndDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date (Argument 2)</span>
            <span className="text-[10px] text-sky-400 font-mono">Baseline / TODAY()</span>
          </label>
          <input
            type="date"
            value={inpStartDate}
            onChange={(e) => setInpStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DAYS("{inpEndDate}", "{inpStartDate}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Signed Difference:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                daysDifference.diffDays < 0
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {daysDifference.isError ? daysDifference.error : `${daysDifference.diffDays > 0 ? "+" : ""}${daysDifference.diffDays} Days`}
            </span>
          </div>
        </div>

        {!daysDifference.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Operational Status:</span>
              <span className={`font-semibold font-mono text-sm ${daysDifference.badgeClass}`}>
                {daysDifference.statusText}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Equivalent Weeks:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {daysDifference.weeks} Weeks
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Argument Order Check:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                End ({inpEndDate}) - Start ({inpStartDate})
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
              Signed Calendar Difference Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DAYS Formula Signature</div>
            <div className="text-white font-bold text-base">
              =DAYS(end_date, start_date)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">end_date:</strong> Required. The ending date of the evaluated span. If end_date is after start_date, the result is positive; if earlier, the result is negative.</div><div>• <strong className="text-sky-300">start_date:</strong> Required. The starting date of the evaluated span.</div><div>• <strong className="text-amber-300">Parameter Order Alert:</strong> Notice the order: <code className="font-mono text-white">end_date</code> comes FIRST, <code className="font-mono text-white">start_date</code> comes SECOND. Inverting them reverses the sign of your result!</div>
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
              <span className="text-emerald-400">📊</span> DAYS() Calculation & Sign Convention Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how DAYS handles forward, backward, text-coerced, and identical date boundaries.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">End Date (Arg 1)</th>
                  <th className="py-3 px-4">Start Date (Arg 2)</th>
                  <th className="py-3 px-4">DAYS() Output</th>
                  <th className="py-3 px-4">Sign Status</th>
                  <th className="py-3 px-4">Operational Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-26</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+14</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Sprint duration: 14 days ahead</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-01</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">-11</td>
        <td className="py-3.5 px-4 text-rose-400">Negative</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Overdue invoice: 11 days past deadline</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-white font-bold">0</td>
        <td className="py-3.5 px-4 text-slate-400">Zero</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Same day milestone: 0 days elapsed</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2027-03-31"</td>
        <td className="py-3.5 px-4 text-white">"2026-04-01"</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+364</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Full fiscal year span (Text auto-coerced)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-03-01</td>
        <td className="py-3.5 px-4 text-white">2024-02-01</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+29</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap February span: correctly counts 29 days</td>
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
                DAYS() vs Direct Subtraction vs DATEDIF('D')
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Choosing the optimal date subtraction engine for mission-critical enterprise systems.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>Spreadsheet engineers frequently debate whether to write <code className="text-white font-mono">=B2 - A2</code>, <code className="text-indigo-300 font-mono">=DAYS(B2, A2)</code>, or <code className="text-sky-300 font-mono">=DATEDIF(A2, B2, "D")</code>.</p><p>Understanding their structural differences is vital: <br/>1. <code className="text-white font-mono">=B2 - A2</code> preserves fractional times. If B2 is 5:00 PM and A2 is 9:00 AM, subtraction yields <code className="text-white font-mono">0.333</code> days rather than a clean integer.<br/>2. <code className="text-sky-300 font-mono">=DATEDIF(A2, B2, "D")</code> strictly prohibits negative values; if start > end, it throws a fatal <code className="text-rose-400 font-mono">#NUM!</code> error.<br/>3. <code className="text-indigo-300 font-mono">=DAYS(B2, A2)</code> strips time automatically, handles text coercion, and safely returns signed negative integers when milestones are breached.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The DATEDIF Negative Breach Trap
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=DATEDIF(TargetDeadline, TODAY(), \"D\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Throws #NUM! as soon as the project deadline passes (since start_date > end_date), destroying downstream dashboards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Signed DAYS() Variance
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=DAYS(TargetDeadline, TODAY())"}
                </div>
                <p className="text-xs text-slate-400">
                  Returns clean negative numbers (e.g. -5 days) when overdue and positive numbers (+12 days) when ahead of schedule.
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
            Signed date difference pipeline showing positive forward horizons vs negative overdue variance.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <line x1="80" y1="100" x2="760" y2="100" stroke="#334155" strokeWidth="4" />

        <circle cx="420" cy="100" r="14" fill="#4338CA" stroke="#818CF8" strokeWidth="3" />
        <text x="420" y="135" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Baseline Date (Arg 2)</text>
        <text x="420" y="155" textAnchor="middle" fill="#94A3B8" className="text-[10px]">e.g. TODAY()</text>

        <path d="M 435 85 Q 560 40 675 85" fill="none" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="555" y="55" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">+14 Days (In Future)</text>

        <circle cx="680" cy="100" r="12" fill="#059669" stroke="#34D399" strokeWidth="2" />
        <text x="680" y="135" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono font-bold">Future Target</text>

        <path d="M 405 85 Q 280 40 165 85" fill="none" stroke="#F43F5E" strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="285" y="55" textAnchor="middle" fill="#FB7185" className="text-xs font-bold font-mono">-11 Days (Overdue)</text>

        <circle cx="160" cy="100" r="12" fill="#BE123C" stroke="#F43F5E" strokeWidth="2" />
        <text x="160" y="135" textAnchor="middle" fill="#FECDD3" className="text-xs font-mono font-bold">Past Due Target</text>
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
                Explore real DAYS formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic7"
            title="Topic 7: DAYS Master Practice Grid"
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
                  Scenario 1: Corporate Accounts Receivable
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Industrial Finance</span>
              </div>
              <h3 className="text-base font-bold text-white">Accounts Receivable Invoice Aging Bucket Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Credit control audits unpaid customer invoices based on invoice payment due date in column B relative to today's date. Tag invoices overdue by more than 30 days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate days past due: TODAY() - DueDate</div>
                <div className="text-emerald-300 font-bold">{"=IFS(DAYS(TODAY(), B2) <= 0, \"CURRENT (NOT DUE)\", DAYS(TODAY(), B2) <= 30, \"1-30 DAYS PAST DUE\", TRUE, \"CRITICAL OVERDUE\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"1-30 DAYS PAST DUE\" (for invoice due 18 days ago)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Software Project Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V Agile Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Agile Sprint Delivery Countdown Indicator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Sprint dashboard displays exact calendar days remaining until release milestone in cell C2. Display 'SPRINT EXPIRED' if deadline has elapsed."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Use DAYS with milestone deadline as end_date</div>
                <div className="text-emerald-300 font-bold">{"=IF(DAYS(C2, TODAY()) < 0, \"SPRINT EXPIRED\", DAYS(C2, TODAY()) & \" DAYS REMAINING\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"8 DAYS REMAINING\" (for sprint ending in 8 days)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Banking Fixed Term Deposits
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Commercial Bank</span>
              </div>
              <h3 className="text-base font-bold text-white">Premature FD Break Penalty Assessment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Fixed deposit penalty rates depend on total calendar days elapsed since booking date in D2 prior to liquidation date in E2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Measure total completed calendar days elapsed</div>
                <div className="text-emerald-300 font-bold">{"=DAYS(E2, D2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"184 Days Elapsed"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Procurement & Vendor SLAs
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Railway Wagons</span>
              </div>
              <h3 className="text-base font-bold text-white">Vendor Purchase Order Lead Time Variance</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Track vendor fulfillment performance by subtracting promised delivery date in F2 from actual warehouse receipt date in G2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Positive variance denotes vendor delivery delay</div>
                <div className="text-emerald-300 font-bold">{"=DAYS(G2, F2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"+6 Days Delay"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Insurance & Warranty Claims
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Consumer Electronics</span>
              </div>
              <h3 className="text-base font-bold text-white">Product Extended Warranty Validity Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Warranty coverage lasts exactly 730 days (2 years) from purchase date in H2. Verify whether incident claim date in I2 occurred within warranty span."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Verify claim date minus purchase date does not exceed 730 days</div>
                <div className="text-emerald-300 font-bold">{"=IF(DAYS(I2, H2) <= 730, \"WARRANTY APPROVED\", \"CLAIM REJECTED - EXPIRED\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"WARRANTY APPROVED\" (at 610 days elapsed)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Hospital Inpatient Census
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Medical Institute</span>
              </div>
              <h3 className="text-base font-bold text-white">Patient Length of Stay (LOS) Calculator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Health insurance billing requires calculating total inpatient billable calendar days between admission date in J2 and discharge date in K2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// DAYS strips time component; add 1 for inclusive stay billing</div>
                <div className="text-emerald-300 font-bold">{"=MAX(1, DAYS(K2, J2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"5 Days Length of Stay"}
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
              <span className="text-indigo-400 font-bold">Step 1: Check Parameter Sequence</span>
              <p>{"Remember that DAYS(end_date, start_date) puts the END date first. Passing start date first inverts the sign of your result."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DAYS(End, Start) -> Correct\n=DAYS(Start, End) -> Inverted Sign"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Automatic Time Component Stripping</span>
              <p>{"DAYS evaluates purely the integer calendar day, completely ignoring any attached timestamps."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DAYS('2026-11-15 18:00', '2026-11-12 09:00') -> Returns exactly 3"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Handle Automatic Text Coercion</span>
              <p>{"DAYS automatically parses standard ISO date text without requiring manual DATEVALUE wrapping."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DAYS('2026-11-20', '2026-11-10') -> 10"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Interpret Sign Convention</span>
              <p>{"Positive result = End is after Start (Future). Negative result = End is before Start (Past/Overdue)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"If Result < 0 -> Milestone Breached / Overdue"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inverted Negative Numbers"}</td>
                  <td className="py-3 px-4 font-sans">{"Swapping the arguments by writing start_date first instead of end_date."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DAYS(StartDate, EndDate)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure end_date is argument 1: =DAYS(EndDate, StartDate)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! from Unparseable Text"}</td>
                  <td className="py-3 px-4 font-sans">{"One of the arguments contains text in an unrecognized regional format."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DAYS('31/13/2026', '2026-11-12')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert dates using DATE(YYYY, MM, DD) or verify Short Date regional settings."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Inclusive vs Exclusive Off-By-One"}</td>
                  <td className="py-3 px-4 font-sans">{"DAYS calculates elapsed difference (End - Start). If billing requires counting both start and end days inclusively, add 1."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Booking from Monday to Monday yields 7, but billing requires 8 inclusive days"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use: =DAYS(End, Start) + 1 for inclusive calendar counting."}</td>
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
              <span className="text-indigo-400 font-bold">DAYS vs Simple Minus Sign</span>
              <p className="text-slate-300">{"Simple subtraction =B2 - A2 retains fractional time. Use DAYS(B2, A2) when you want strictly whole integer days regardless of timestamps."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Safe Overdue Aging Formulas</span>
              <p className="text-slate-300">{"Never use DATEDIF for overdue tracking because it crashes with #NUM! on negative numbers. Always use DAYS(Deadline, TODAY())."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Automatic Leap Year Compliance</span>
              <p className="text-slate-300">{"DAYS automatically accounts for leap years. =DAYS('2024-03-01', '2024-02-01') correctly yields 29."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Absolute Elapsed Days</span>
              <p className="text-slate-300">{"To determine absolute distance between two dates regardless of chronological order: =ABS(DAYS(A2, B2))."}</p>
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
              • <strong>Function Design:</strong> {"Why did Microsoft position end_date as Argument 1 and start_date as Argument 2 in the DAYS function signature?"}
            </p>

            <p key="1">
              • <strong>Financial Audit:</strong> {"When auditing commercial invoices, why must an auditor verify whether contract terms stipulate inclusive or exclusive day counts?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 7: DAYS Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DAYS Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"The DAYS function is the bedrock of project variance and overdue debt analysis. The #1 mistake students make is parameter inversion: always remember END comes before START. If you need clean negative variance numbers for overdue milestones, DAYS is vastly superior to DATEDIF."}
          />
        </div>
      </div>
    </div>
  );
}
