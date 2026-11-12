"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic19_files/topic19_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic19() {
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
  const [startDateStr, setStartDateStr] = useState("2018-04-15");
  const [endDateStr, setEndDateStr] = useState("2026-11-12");
  const [activeUnit, setActiveUnit] = useState("Y");

  // Accurate client-side DATEDIF simulation algorithm
  const datedifResult = useMemo(() => {
    const s = new Date(startDateStr);
    const e = new Date(endDateStr);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { error: "#VALUE! Invalid date entered", isError: true };
    }
    if (s > e) {
      return { error: "#NUM! Start date must be <= End date", isError: true };
    }

    // 1. Total Days (D)
    const diffTime = e.getTime() - s.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 2. Full Years (Y)
    let y = e.getFullYear() - s.getFullYear();
    const birthdayPassedThisYear =
      e.getMonth() > s.getMonth() ||
      (e.getMonth() === s.getMonth() && e.getDate() >= s.getDate());
    if (!birthdayPassedThisYear) {
      y--;
    }

    // 3. Full Months (M)
    let m = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    if (e.getDate() < s.getDate()) {
      m--;
    }

    // 4. Remaining Months ignoring years (YM)
    let ym = m % 12;
    if (ym < 0) ym += 12;

    // 5. Remaining Days ignoring months & years (MD)
    // Excel legacy Lotus 1-2-3 logic
    let md = e.getDate() - s.getDate();
    if (md < 0) {
      const prevMonthLastDate = new Date(e.getFullYear(), e.getMonth(), 0).getDate();
      md += prevMonthLastDate;
    }

    // 6. Robust Remaining Days via EDATE
    const advancedMonthMilestone = new Date(s);
    advancedMonthMilestone.setMonth(advancedMonthMilestone.getMonth() + m);
    const robustDays = Math.floor((e.getTime() - advancedMonthMilestone.getTime()) / (1000 * 60 * 60 * 24));

    // 7. Days ignoring years (YD)
    const currentYearStartAnniversary = new Date(e.getFullYear(), s.getMonth(), s.getDate());
    let yd = 0;
    if (e >= currentYearStartAnniversary) {
      yd = Math.floor((e.getTime() - currentYearStartAnniversary.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      const prevYearStartAnniversary = new Date(e.getFullYear() - 1, s.getMonth(), s.getDate());
      yd = Math.floor((e.getTime() - prevYearStartAnniversary.getTime()) / (1000 * 60 * 60 * 24));
    }

    const unitMap = {
      Y: y,
      M: m,
      D: totalDays,
      YM: ym,
      YD: yd,
      MD: md
    };

    return {
      isError: false,
      value: unitMap[activeUnit] ?? 0,
      years: y,
      months: m,
      totalDays,
      ym,
      md,
      robustDays,
      yd,
      tenureString: `${y} Years, ${ym} Months, ${md} Days`,
      robustTenureString: `${y} Years, ${ym} Months, ${robustDays} Days`,
      isGratuityEligible: y >= 5,
      isMDBugRisk: startDateStr.endsWith("-31") || (s.getDate() > 28 && e.getMonth() === 2)
    };
  }, [startDateStr, endDateStr, activeUnit]);

  // Preset scenarios
  const applyPreset = (preset) => {
    if (preset === "gratuity") {
      setStartDateStr("2018-04-15");
      setEndDateStr("2026-11-12");
      setActiveUnit("Y");
    } else if (preset === "retirement") {
      setStartDateStr("1968-08-20");
      setEndDateStr("2026-11-12");
      setActiveUnit("Y");
    } else if (preset === "mdbug") {
      setStartDateStr("2026-01-31");
      setEndDateStr("2026-03-01");
      setActiveUnit("MD");
    } else if (preset === "leap") {
      setStartDateStr("2024-02-29");
      setEndDateStr("2026-02-28");
      setActiveUnit("Y");
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
              ⚡ Date & Calendar Engineering · Topic 19
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Ultra Expert · HR, Payroll & SLA Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Synthesize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DATEDIF Function — Date Difference Analysis & Enterprise Tenure Modeling
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The <code className="text-indigo-300 font-mono font-bold">DATEDIF</code> function is Excel's famous undocumented powerhouse for calculating completed calendar years, months, and modular days between two timestamps. Essential for HR tenure, human age verification, gratuity qualification, and SLA dispute tracking.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> =DATEDIF(start, end, "unit")</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>6 Unit Codes:</strong> "Y", "M", "D", "YM", "YD", "MD"</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Bug Proof:</strong> EDATE mathematical mitigation</span>
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
                <span className="text-indigo-400">🧪</span> Live DATEDIF Interactive Workbench
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Adjust input dates, switch interval units, inspect raw formula outputs, and observe edge-case behaviors live.
              </p>
            </div>

            {/* Quick Scenario Preset Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
              <button
                onClick={() => applyPreset("gratuity")}
                className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
              >
                Gratuity (5+ Yrs)
              </button>
              <button
                onClick={() => applyPreset("retirement")}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
              >
                Superannuation (Age 58)
              </button>
              <button
                onClick={() => applyPreset("mdbug")}
                className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
              >
                Trigger "MD" Bug
              </button>
              <button
                onClick={() => applyPreset("leap")}
                className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
              >
                Leap Year (Feb 29)
              </button>
            </div>
          </div>

          {/* Interactive Date Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Start Date (Cell A2)</span>
                <span className="text-[10px] text-indigo-400 font-mono">Date of Joining / DOB</span>
              </label>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>End Date (Cell B2)</span>
                <span className="text-[10px] text-emerald-400 font-mono">TODAY() / Evaluation Date</span>
              </label>
              <input
                type="date"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Unit Code Selector Tabs */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select DATEDIF Unit Argument:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {[
                { code: "Y", label: "Years", desc: "Full calendar years" },
                { code: "M", label: "Months", desc: "Total full months" },
                { code: "D", label: "Days", desc: "Total calendar days" },
                { code: "YM", label: "Rem Months", desc: "Months excluding years" },
                { code: "YD", label: "Rem Days (Yr)", desc: "Days excluding years" },
                { code: "MD", label: "Rem Days (Mo)", desc: "Days excluding months" }
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setActiveUnit(item.code)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeUnit === item.code
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-[1.02]"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-bold text-sm">
                    <span>"{item.code}"</span>
                    <span className="text-[10px] opacity-75">{item.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Output Display Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="font-mono text-xs text-indigo-300">
                Formula Evaluated:{" "}
                <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  =DATEDIF("{startDateStr}", "{endDateStr}", "{activeUnit}")
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Result:</span>
                <span
                  className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                    datedifResult.isError
                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-inner"
                  }`}
                >
                  {datedifResult.isError ? datedifResult.error : datedifResult.value}
                </span>
              </div>
            </div>

            {/* Comprehensive Interval Readout */}
            {!datedifResult.isError && (
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Full Human Tenure:</span>
                  <span className="text-amber-300 font-semibold font-mono text-sm">
                    {datedifResult.tenureString}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Gratuity Status (5+ Yrs):</span>
                  <span
                    className={`font-bold inline-flex items-center gap-1.5 ${
                      datedifResult.isGratuityEligible ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {datedifResult.isGratuityEligible ? "✓ Eligible for Gratuity" : "✗ Ineligible (< 5 Years)"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Total Days Elapsed ("D"):</span>
                  <span className="text-sky-300 font-semibold font-mono text-sm">
                    {datedifResult.totalDays.toLocaleString()} Days
                  </span>
                </div>
              </div>
            )}

            {/* "MD" Bug Warning Banner */}
            {activeUnit === "MD" && (
              <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-600/50 text-amber-200 text-xs flex items-start gap-3">
                <span className="text-base">⚠️</span>
                <div>
                  <strong>Microsoft Known Issue Notice for "MD":</strong> Month lengths fluctuate between 28, 29, 30, and 31 days. In edge cases, <code className="font-mono text-white">"MD"</code> can return 0 or negative numbers.
                  <div className="mt-1 font-mono text-[11px] text-amber-300">
                    Safe Alternative: =B2 - EDATE(A2, DATEDIF(A2, B2, "M")) ➔ Yields:{" "}
                    <strong>{datedifResult.robustDays ?? 0} Days</strong>
                  </div>
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
              Lotus 1-2-3 Legacy Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DATEDIF Signature</div>
            <div className="text-white font-bold text-base">
              =DATEDIF(<span className="text-teal-300">start_date</span>, <span className="text-sky-300">end_date</span>, <span className="text-amber-300">"unit"</span>)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>
                • <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the evaluated period. Must be a valid Excel serial number, date literal, or cell reference.
              </div>
              <div>
                • <strong className="text-sky-300">end_date:</strong> Required. The ending date of the period. Must be chronologically greater than or equal to <code className="font-mono text-teal-300">start_date</code> (otherwise returns <code className="font-mono text-rose-400">#NUM!</code>).
              </div>
              <div>
                • <strong className="text-amber-300">unit:</strong> Required. A case-insensitive text string specifying the desired interval type: <code className="font-mono text-white">"Y"</code>, <code className="font-mono text-white">"M"</code>, <code className="font-mono text-white">"D"</code>, <code className="font-mono text-white">"YM"</code>, <code className="font-mono text-white">"YD"</code>, or <code className="font-mono text-white">"MD"</code>.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: COMPLETE 6-UNIT CODE MASTER MATRIX TABLE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">📊</span> The Complete 6-Unit Code Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Master the behavior, scope, and specific industrial applications of all six interval strings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Interval Description</th>
                  <th className="py-3 px-4">Modular / Total</th>
                  <th className="py-3 px-4">Sample Output</th>
                  <th className="py-3 px-4">Typical Real-World Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-indigo-400 font-bold text-sm">"Y"</td>
                  <td className="py-3.5 px-4 font-sans">Full completed calendar years</td>
                  <td className="py-3.5 px-4 text-emerald-400">Total Count</td>
                  <td className="py-3.5 px-4 text-white">8</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Completed age, employee tenure, gratuity qualification</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-indigo-400 font-bold text-sm">"M"</td>
                  <td className="py-3.5 px-4 font-sans">Total completed calendar months</td>
                  <td className="py-3.5 px-4 text-emerald-400">Total Count</td>
                  <td className="py-3.5 px-4 text-white">102</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Loan installment cycles, infant age milestones, contract terms</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-indigo-400 font-bold text-sm">"D"</td>
                  <td className="py-3.5 px-4 font-sans">Total elapsed calendar days (end - start)</td>
                  <td className="py-3.5 px-4 text-emerald-400">Total Count</td>
                  <td className="py-3.5 px-4 text-white">3,133</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Per diem allowances, interest accrual days, warranty validity</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-amber-400 font-bold text-sm">"YM"</td>
                  <td className="py-3.5 px-4 font-sans">Remaining months ignoring full years (0 to 11)</td>
                  <td className="py-3.5 px-4 text-amber-300">Modular (Rem)</td>
                  <td className="py-3.5 px-4 text-white">6</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Middle component in "X Years, Y Months, Z Days" strings</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-amber-400 font-bold text-sm">"YD"</td>
                  <td className="py-3.5 px-4 font-sans">Remaining days ignoring full years (0 to 365)</td>
                  <td className="py-3.5 px-4 text-amber-300">Modular (Rem)</td>
                  <td className="py-3.5 px-4 text-white">211</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Annual anniversary countdowns, birthday celebration countdown</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-rose-400 font-bold text-sm">"MD"</td>
                  <td className="py-3.5 px-4 font-sans">Remaining days ignoring months & years (0 to 30)</td>
                  <td className="py-3.5 px-4 text-rose-300">Modular (Bug Prone)</td>
                  <td className="py-3.5 px-4 text-white">28</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Final days component (Subject to MS month-length bug)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: THE INFAMOUS "MD" BUG & THE BULLETPROOF EDATE FIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-xl shrink-0">
              ⚠️
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Infamous "MD" Bug & The Bulletproof EDATE Alternative
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why Microsoft officially issues a warning for "MD", and how elite analysts formulate error-free days.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              In Microsoft's official documentation for <code className="text-indigo-300 font-mono">DATEDIF</code>, you will find this explicit advisory:
            </p>
            <blockquote className="p-4 rounded-2xl bg-amber-950/40 border-l-4 border-amber-500 text-amber-200 font-sans italic">
              "The 'MD' argument may result in a negative number, a zero, or an inaccurate result. We recommend using the alternative formula provided below."
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Flawed Legacy Method
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  =DATEDIF(A2, B2, "MD")
                </div>
                <p className="text-xs text-slate-400">
                  Fails when start date is at the end of a long month (e.g., Jan 31) and end date is in a shorter month (Feb 28 or March 1). Excel borrows month lengths inconsistently, sometimes returning negative values!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  The Production-Grade EDATE Solution
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  =B2 - EDATE(A2, DATEDIF(A2, B2, "M"))
                </div>
                <p className="text-xs text-slate-400">
                  Mathematically exact: Advances start date by all completed whole months using <code className="font-mono text-white">EDATE</code>, then subtracts that date from end date to yield the true remaining days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VISUAL SEMANTIC SVG TIMELINE DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📐</span> Visual Interval Decomposition Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Conceptual diagram showing how DATEDIF breaks down an arbitrary date span into hierarchical units.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            <svg viewBox="0 0 840 220" className="w-full max-w-4xl h-auto font-sans">
              <defs>
                <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338CA" />
                  <stop offset="60%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#38BDF8" />
                </marker>
              </defs>

              {/* Start Milestone Node */}
              <circle cx="70" cy="90" r="14" fill="#4338CA" stroke="#818CF8" strokeWidth="3" />
              <text x="70" y="125" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">
                Start Date
              </text>
              <text x="70" y="145" textAnchor="middle" fill="#94A3B8" className="text-[10px]">
                e.g. 15-Apr-2018
              </text>

              {/* Connecting Bar */}
              <rect x="85" y="85" width="670" height="10" rx="5" fill="url(#barGrad)" />

              {/* Segment 1: Completed Years */}
              <line x1="390" y1="60" x2="390" y2="120" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" />
              <text x="237" y="50" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold font-mono">
                "Y": 8 Full Years
              </text>
              <text x="237" y="70" textAnchor="middle" fill="#64748B" className="text-[10px]">
                (15-Apr-2018 to 15-Apr-2026)
              </text>

              {/* Segment 2: Remaining Months */}
              <line x1="630" y1="60" x2="630" y2="120" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
              <text x="510" y="50" textAnchor="middle" fill="#7DD3FC" className="text-xs font-bold font-mono">
                "YM": 6 Months
              </text>
              <text x="510" y="70" textAnchor="middle" fill="#64748B" className="text-[10px]">
                (15-Apr-2026 to 15-Oct-2026)
              </text>

              {/* Segment 3: Remaining Days */}
              <text x="700" y="50" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold font-mono">
                "MD": 28 Days
              </text>
              <text x="700" y="70" textAnchor="middle" fill="#64748B" className="text-[10px]">
                (15-Oct to 12-Nov)
              </text>

              {/* End Milestone Node */}
              <circle cx="755" cy="90" r="14" fill="#059669" stroke="#34D399" strokeWidth="3" />
              <text x="755" y="125" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">
                End Date
              </text>
              <text x="755" y="145" textAnchor="middle" fill="#94A3B8" className="text-[10px]">
                e.g. 12-Nov-2026
              </text>

              {/* Bottom Combined Summary Badge */}
              <rect x="220" y="170" width="400" height="36" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <text x="420" y="193" textAnchor="middle" fill="#F8FAFC" className="text-xs font-bold font-mono">
                Combined Output: 8 Years, 6 Months, 28 Days
              </text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: LIVE EXCEL FILE LOADER & DOWNLOAD PORTAL
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
                Explore real DATEDIF formulas, tenure strings, and gratuity status directly in the embedded spreadsheet.
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
            sheetName="Topic19"
            title="Topic 19: DATEDIF Master Practice Grid"
            rowsPerPage={15}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 8: REAL-WORLD ENTERPRISE BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Enterprise Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                Scenario 1: HR Gratuity Eligibility Audit
              </span>
              <h3 className="text-base font-bold text-white">Barrackpore Industrial Employee Compliance</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Under the Payment of Gratuity Act 1972, employees who complete at least 5 years of continuous service are eligible for statutory gratuity payouts upon exit.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 space-y-1">
                <div className="text-slate-500">// Check 5 full completed years in cell E2</div>
                <div>=IF(DATEDIF(E2, TODAY(), "Y") &gt;= 5, "Eligible", "Not Eligible")</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">
                Scenario 2: Employee Superannuation & Retirement Horizon
              </span>
              <h3 className="text-base font-bold text-white">Public Sector Retirement Date Engineering</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Determine exact retirement year and calculate countdown years and months remaining until an executive reaches age 60 from DOB in cell B2.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 space-y-1">
                <div className="text-slate-500">// Years and months until 60th birthday</div>
                <div>=60 - DATEDIF(B2, TODAY(), "Y") &amp; " Years, " &amp; (11 - DATEDIF(B2, TODAY(), "YM")) &amp; " Months"</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">
                Scenario 3: Banking Loan Tenor & EMI Elapsed Cycles
              </span>
              <h3 className="text-base font-bold text-white">Commercial Mortgage Amortization Progress</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Compute the exact number of monthly EMI cycles paid to date from loan disbursement date in C2 to audit interest amortizations.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 space-y-1">
                <div className="text-slate-500">// Completed monthly billing cycles</div>
                <div>=DATEDIF(C2, TODAY(), "M")</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 text-xs font-bold">
                Scenario 4: IT Service Desk SLA Ticket Aging
              </span>
              <h3 className="text-base font-bold text-white">Enterprise Helpdesk Escalation Matrix</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Categorize unresolved customer incident tickets into aging buckets (&lt; 7 Days, 7-30 Days, &gt; 30 Days) based on creation timestamp in D2.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 space-y-1">
                <div className="text-slate-500">// SLA Aging Bucket Classifier</div>
                <div>=IFS(DATEDIF(D2, TODAY(), "D") &lt; 7, "Normal", DATEDIF(D2, TODAY(), "D") &lt;= 30, "Warning", TRUE, "Breached")</div>
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
            <span className="text-sky-400">📝</span> Step-by-Step Construction of the Ultimate Age Formula
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 1: Extract Completed Years</span>
              <p>
                Calculate completed full years using <code className="text-indigo-300 font-mono">=DATEDIF(B2, TODAY(), "Y")</code>. This only counts anniversaries that have actually arrived.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Step 2: Extract Residual Months</span>
              <p>
                Calculate remaining months beyond completed years using <code className="text-sky-300 font-mono">=DATEDIF(B2, TODAY(), "YM")</code>. This returns a modular value between 0 and 11.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 3: Extract Residual Days via EDATE Safeguard</span>
              <p>
                Avoid the "MD" bug by calculating exact days after all full months: <code className="text-emerald-300 font-mono">=TODAY() - EDATE(B2, DATEDIF(B2, TODAY(), "M"))</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold">Step 4: Concatenate with Strings</span>
              <p>
                Combine into a unified sentence:{" "}
                <code className="text-amber-300 font-mono text-[11px] block mt-1 bg-slate-900 p-2 rounded">
                  =DATEDIF(B2,TODAY(),"Y") &amp; " Yrs, " &amp; DATEDIF(B2,TODAY(),"YM") &amp; " Mos, " &amp; (TODAY()-EDATE(B2,DATEDIF(B2,TODAY(),"M"))) &amp; " Days"
                </code>
              </p>
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
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Demonstration Trigger</th>
                  <th className="py-3 px-4">Professional Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr>
                  <td className="py-3 px-4 text-rose-400 font-bold">#NUM!</td>
                  <td className="py-3 px-4 font-sans">Start date is after End date, OR invalid unit string supplied.</td>
                  <td className="py-3 px-4 text-slate-400">=DATEDIF("2026-12-01", "2026-01-01", "Y")</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">Wrap with IF(A2 &lt;= B2, ...) or verify unit code spelling.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-rose-400 font-bold">#VALUE!</td>
                  <td className="py-3 px-4 font-sans">Date argument cannot be parsed as a valid numeric date serial.</td>
                  <td className="py-3 px-4 text-slate-400">=DATEDIF("Not a date", TODAY(), "Y")</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">Use DATE(YYYY, MM, DD) or DATEVALUE() to sanitize text strings.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-amber-400 font-bold">Negative Result</td>
                  <td className="py-3 px-4 font-sans">The legacy "MD" bug on month boundaries with varying lengths.</td>
                  <td className="py-3 px-4 text-slate-400">=DATEDIF("2026-01-31", "2026-03-01", "MD")</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">Replace "MD" with =end - EDATE(start, DATEDIF(start, end, "M")).</td>
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
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold">Why IntelliSense Ignores DATEDIF</span>
              <p className="text-slate-300">
                When you type <code className="text-indigo-300 font-mono">=DATE...</code> in Excel, DATEDIF does not appear in the pop-up list. This is intentional: Microsoft retains it for Lotus 1-2-3 backward compatibility without actively encouraging new users due to the "MD" edge case.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Leap Year Leapling Rule</span>
              <p className="text-slate-300">
                If someone is born on February 29 (leap year), Excel does not count their next birthday as completed on February 28 of a non-leap year. Full year completion occurs on March 1.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Dynamic Cell Unit References</span>
              <p className="text-slate-300">
                You do not need to hardcode <code className="text-white font-mono">"Y"</code> in quotes. If cell C1 contains the text <code className="text-white font-mono">YM</code>, <code className="text-sky-300 font-mono">=DATEDIF(A2, B2, C1)</code> executes dynamically.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">DATEDIF vs YEARFRAC</span>
              <p className="text-slate-300">
                DATEDIF returns strictly truncated whole integer intervals. For financial day-count fractions (like 2.45 years for bond pricing), use <code className="text-amber-300 font-mono">YEARFRAC(start, end, basis)</code> instead.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Questions
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p>
              • <strong>Critical Thinking:</strong> Why does subtracting years directly like <code className="text-indigo-300 font-mono">=YEAR(TODAY()) - YEAR(DOB)</code> often overstate a student's age by 1 full year, whereas <code className="text-emerald-300 font-mono">=DATEDIF(DOB, TODAY(), "Y")</code> is always legally accurate?
            </p>
            <p>
              • <strong>Edge Case Reasoning:</strong> If an employee joined on 2021-08-15 and resigned on 2026-08-14, why does DATEDIF return <code className="text-amber-300 font-mono">4</code> years instead of 5, and how does this affect their statutory gratuity entitlement?
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 19: DATEDIF Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DATEDIF Function & Date Difference Analysis"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In corporate financial and HR modeling, human age and tenure must never be calculated using arbitrary division by 365 or 365.25. DATEDIF provides exact calendar anniversary tracking. Remember to safeguard against the 'MD' bug using =end - EDATE(start, DATEDIF(start, end, 'M')), and always ensure start_date <= end_date to avoid #NUM! errors."}
          />
        </div>
      </div>
    </div>
  );
}

