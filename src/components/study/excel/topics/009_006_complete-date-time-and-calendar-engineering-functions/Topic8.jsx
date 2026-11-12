"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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

  const [inpStart, setInpStart] = useState("2026-01-01");
  const [inpEnd, setInpEnd] = useState("2026-07-01");
  const [methodEuro, setMethodEuro] = useState(false);
  const [bondPrincipal, setBondPrincipal] = useState(10000000);
  const [couponRate, setCouponRate] = useState(7.5);

  const bondCalcResult = useMemo(() => {
    const s = new Date(inpStart);
    const e = new Date(inpEnd);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    // Days360 algorithm
    let d1 = s.getDate();
    let m1 = s.getMonth() + 1;
    let y1 = s.getFullYear();

    let d2 = e.getDate();
    let m2 = e.getMonth() + 1;
    let y2 = e.getFullYear();

    if (!methodEuro) {
      // US (NASD) Method
      if (d1 === 31) d1 = 30;
      if (d2 === 31 && d1 >= 30) d2 = 30;
    } else {
      // European Method
      if (d1 === 31) d1 = 30;
      if (d2 === 31) d2 = 30;
    }

    const days360Value = (y2 - y1) * 360 + (m2 - m1) * 30 + (d2 - d1);

    // Actual calendar days
    const utcE = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const utcS = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    const actualDays = Math.round((utcE - utcS) / 86400000);

    const interestAccrued = (bondPrincipal * (couponRate / 100) * (days360Value / 360));
    const actualInterest = (bondPrincipal * (couponRate / 100) * (actualDays / 365));
    const variance = interestAccrued - actualInterest;

    return {
      isError: false,
      days360Value,
      actualDays,
      interestAccrued: interestAccrued.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      actualInterest: actualInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      variance: variance.toLocaleString("en-IN", { maximumFractionDigits: 2 })
    };
  }, [inpStart, inpEnd, methodEuro, bondPrincipal, couponRate]);

  const applyPreset = (preset) => {
    if (preset === "semi_annual") {
      setInpStart("2026-01-01");
      setInpEnd("2026-07-01");
      setMethodEuro(false);
    } else if (preset === "month_end_jan") {
      setInpStart("2026-01-01");
      setInpEnd("2026-01-31");
      setMethodEuro(false);
    } else if (preset === "euro_feb") {
      setInpStart("2026-02-28");
      setInpEnd("2026-03-31");
      setMethodEuro(true);
    } else if (preset === "full_year") {
      setInpStart("2026-01-01");
      setInpEnd("2027-01-01");
      setMethodEuro(false);
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
              ⚡ Date & Calendar Engineering · Topic 8
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Financial Engineering · 30/360 Convention
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Calculate
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DAYS360 Function — Commercial 360-Day Bond Convention Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">DAYS360(start_date, end_date, [method])</code> function calculates the day difference between two dates based on a standardized <strong>360-day commercial calendar</strong>, where every calendar month is artificially treated as having exactly 30 days.</p><p>Originating in European commercial banking and formalized by the US National Association of Securities Dealers (NASD), the 30/360 day-count convention simplifies interest accrual schedules, corporate bond coupon pricing, commercial paper yields, and fixed-rate mortgage amortization tables. Understanding the subtle mathematical differences between the <strong>US (NASD) Method</strong> and the <strong>European Method</strong>—particularly around month-end dates and February boundaries—is essential for financial analysts and corporate accountants.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=DAYS360(start_date, end_date, [method])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Corporate Bond Pricing, Commercial Paper & Mortgage Amortization</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =DAYS360(A2, B2, FALSE) (US NASD 30/360 Method)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive DAYS360 Bond Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare the US (NASD) vs European 30/360 day-count methods and calculate commercial bond interest accruals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("semi_annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Semi-Annual (180d)
          </button>
          <button
            onClick={() => applyPreset("month_end_jan")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Jan 1 - Jan 31
          </button>
          <button
            onClick={() => applyPreset("euro_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            European Feb Clamping
          </button>
          <button
            onClick={() => applyPreset("full_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Full Year (360 vs 365)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Coupon Start</span>
          </label>
          <input
            type="date"
            value={inpStart}
            onChange={(e) => setInpStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date</span>
            <span className="text-[10px] text-sky-400 font-mono">Settlement Date</span>
          </label>
          <input
            type="date"
            value={inpEnd}
            onChange={(e) => setInpEnd(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Method Selection (3rd Arg)
          </label>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setMethodEuro(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                !methodEuro ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              US NASD (FALSE)
            </button>
            <button
              onClick={() => setMethodEuro(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                methodEuro ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              European (TRUE)
            </button>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">Controls day 31 clamping rules</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DAYS360("{inpStart}", "{inpEnd}", {methodEuro ? "TRUE" : "FALSE"})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">360-Day Count:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {bondCalcResult.days360Value} Days
            </span>
          </div>
        </div>

        {!bondCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Actual Calendar Days (DAYS):</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {bondCalcResult.actualDays} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">30/360 Accrued Interest:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                ₹{bondCalcResult.interestAccrued}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Interest Variance vs Actual/365:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                ₹{bondCalcResult.variance}
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
              Commercial 30/360 Financial Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DAYS360 Formula Signature</div>
            <div className="text-white font-bold text-base">
              =DAYS360(start_date, end_date, [method])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the interest accrual period.</div><div>• <strong className="text-sky-300">end_date:</strong> Required. The ending date of the interest accrual period.</div><div>• <strong className="text-amber-300">method:</strong> Optional. A boolean value specifying the calculation method: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">FALSE or omitted:</code> <strong>US (NASD) Method.</strong> If start date is day 31, it becomes day 30. If end date is day 31 and start date is earlier than day 30, end date becomes day 1 of next month; otherwise day 30.<br/>&nbsp;&nbsp;• <code className="font-mono text-white">TRUE:</code> <strong>European Method.</strong> Start dates and end dates occurring on day 31 become day 30.</div>
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
              <span className="text-emerald-400">📊</span> US (NASD) vs European 30/360 Method Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how month-end date pairs calculate under US vs European financial standards.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Actual Days (DAYS)</th>
                  <th className="py-3 px-4">DAYS360 (US - FALSE)</th>
                  <th className="py-3 px-4">DAYS360 (Euro - TRUE)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2026-01-31</td>
        <td className="py-3.5 px-4 text-slate-300">30</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">30</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">29</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-31</td>
        <td className="py-3.5 px-4 text-white">2026-02-28</td>
        <td className="py-3.5 px-4 text-slate-300">28</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">28</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">28</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-02-28</td>
        <td className="py-3.5 px-4 text-white">2026-03-31</td>
        <td className="py-3.5 px-4 text-slate-300">31</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">33</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">32</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2026-07-01</td>
        <td className="py-3.5 px-4 text-slate-300">181</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">180</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">180</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2027-01-01</td>
        <td className="py-3.5 px-4 text-slate-300">365</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">360</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">360</td>
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
                Financial Day-Count Conventions: Actual/Actual vs 30/360
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why multi-million dollar bond interest calculations depend on the 360-day baseline.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>In global financial markets, interest is calculated using the canonical formula: <code className="text-white font-mono">Interest = Principal × Rate × (Days / BaseYear)</code>.</p><p>Under the <strong>Actual/Actual</strong> convention used for US Treasury Bonds, the actual calendar days (365 or 366) are divided by the actual days in the year. However, for <strong>Corporate Bonds and Commercial Paper</strong>, the standardized <strong>30/360</strong> convention is mandated. By pretending every month has exactly 30 days and the year has 360 days, semi-annual coupons are perfectly equal (<code className="text-emerald-300 font-mono">180 / 360 = 0.50</code>), preventing coupon payment discrepancies between leap years and common years.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Common Calendar Bond Pricing Error
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=Principal * Rate * ((B2 - A2) / 365)"}
                </div>
                <p className="text-xs text-slate-400">
                  Fails regulatory compliance for municipal and corporate bonds that legally stipulate the 30/360 day-count convention.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Regulatory DAYS360 Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=Principal * Rate * (DAYS360(A2, B2, FALSE) / 360)"}
                </div>
                <p className="text-xs text-slate-400">
                  Applies the exact NASD 30/360 day-count rule, ensuring penny-accurate bond coupon pricing.
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
            The 30/360 convention homogenizing calendar months into uniform 30-day blocks.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="60" rx="12" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold font-mono">January (31 Days)</text>
        <text x="110" y="75" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Real Calendar</text>

        <rect x="210" y="30" width="160" height="60" rx="12" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="290" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold font-mono">February (28 Days)</text>
        <text x="290" y="75" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Real Calendar</text>

        <path d="M 110 95 L 200 135 M 290 95 L 200 135" stroke="#38BDF8" strokeWidth="2" />

        <rect x="120" y="130" width="160" height="50" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="200" y="152" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">DAYS360 Engine</text>
        <text x="200" y="168" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Clamp: Month = 30 Days</text>

        <path d="M 285 155 L 360 155" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="360" y="125" width="450" height="60" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="585" y="150" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold font-mono">Semi-Annual Coupon: Exactly 180 Days (180/360 = 0.50)</text>
        <text x="585" y="170" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">No Leap Year Fluctuations</text>
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
                Explore real DAYS360 formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic8"
            title="Topic 8: DAYS360 Master Practice Grid"
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
                  Scenario 1: Corporate Debt & Bond Treasury
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Dalhousie Financial District</span>
              </div>
              <h3 className="text-base font-bold text-white">Corporate Debenture Semi-Annual Coupon Accrual</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A commercial debenture of INR 10 Crores pays a 7.5% annual coupon under the US 30/360 bond convention. Calculate accrued interest between settlement dates in A2 and B2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Multiply principal by rate and fractional 360-day year</div>
                <div className="text-emerald-300 font-bold">{"=Principal * CouponRate * (DAYS360(A2, B2, FALSE) / 360)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 3,75,000.00 (exactly 0.50 of year for 180 days)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Commercial Banking & Mortgages
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Cooperative Bank</span>
              </div>
              <h3 className="text-base font-bold text-white">Commercial Real Estate Mortgage Interest Schedule</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Commercial mortgage amortizations accrue interest on a 30/360 day basis to ensure identical monthly interest debits regardless of February's 28-day length."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate monthly interest factor on 30-day basis</div>
                <div className="text-emerald-300 font-bold">{"=LoanOutstanding * (AnnualRate / 360) * DAYS360(StartDate, EndDate)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 62,500.00 (standardized 30-day interest charge)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Money Market & Commercial Paper
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Financial Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">90-Day Commercial Paper Discount Yield Valuation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Discounted commercial paper issued on date in C2 matures on date in D2. Verify whether the issuance complies with the standard 90-day 30/360 tenor."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Verify exact 90-day commercial tenor</div>
                <div className="text-emerald-300 font-bold">{"=IF(DAYS360(C2, D2) = 90, \"COMPLIANT 90-DAY CP\", \"NON-STANDARD TENOR\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"COMPLIANT 90-DAY CP\""}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: International Trade & Letters of Credit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Port Logistics</span>
              </div>
              <h3 className="text-base font-bold text-white">European Method Usance LC Acceptance Commission</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A European buyer issues a 180-day Usance Letter of Credit. Acceptance commission of 1.25% p.a. is calculated using the European 30/360 day-count convention."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Pass TRUE for European 30/360 calculation method</div>
                <div className="text-emerald-300 font-bold">{"=LCAmount * CommissionRate * (DAYS360(IssueDate, MaturityDate, TRUE) / 360)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"EUR 12,500.00 (on EUR 2,000,000 LC)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Municipal Bond Finance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kanchrapara Urban Infrastructure</span>
              </div>
              <h3 className="text-base font-bold text-white">Municipal Infrastructure Bond Broken Period Interest</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"When a municipal bond is purchased between coupon dates (broken period from 15-Jan to 28-Feb), calculate accrued interest owed to seller under NASD rules."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate accrued broken period days using DAYS360</div>
                <div className="text-emerald-300 font-bold">{"=FaceValue * Coupon * (DAYS360(LastCouponDate, PurchaseDate, FALSE) / 360)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 18,333.33 (for 44 commercial days)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Equipment Lease Amortization
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Heavy Machinery Rentals</span>
              </div>
              <h3 className="text-base font-bold text-white">Heavy Equipment Lease Per-Diem Accrual</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Lease contract stipulates interest compounding on a 360-day commercial year. Determine per diem interest rate for crane rental over date range in E2 to F2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// DAYS360 ensures 30 days per month regardless of month lengths</div>
                <div className="text-emerald-300 font-bold">{"=LeaseCapital * Rate * (DAYS360(E2, F2) / 360)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 45,000.00 (for 3 months lease period)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Identify Financial Convention</span>
              <p>{"Verify whether your loan or bond agreement mandates US (NASD) 30/360 or European 30/360."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"US Method: method = FALSE (or omitted)\nEuropean: method = TRUE"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Understand the 30-Day Month Constraint</span>
              <p>{"DAYS360 treats every month as having exactly 30 days. February 28 to March 31 is computed as 33 days in US NASD method."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DAYS360('2026-02-28', '2026-03-31', FALSE) -> 33"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Calculate the Year Fraction</span>
              <p>{"Divide DAYS360 output by 360 to obtain the exact commercial year fraction for interest formulas."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Fraction: =DAYS360(A2, B2) / 360"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Contrast Against Actual/Actual</span>
              <p>{"Notice that DAYS360 yields 180 for semi-annual dates, whereas actual calendar days fluctuates between 181 and 184."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Semi-Annual: 180 / 360 = 0.5000 exactly"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Discrepancy Between US and European Methods"}</td>
                  <td className="py-3 px-4 font-sans">{"End date falls on day 31. European method clamps day 31 to day 30, while US method rolls to day 1 under specific rules."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DAYS360('2026-01-01', '2026-01-31', FALSE) -> 30, but TRUE -> 29!"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Check bond prospectus for exact '30E/360' (European) or '30/360 US' specification."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Mismatched Parameter Order"}</td>
                  <td className="py-3 px-4 font-sans">{"Unlike the DAYS function which takes (End, Start), DAYS360 takes (Start, End)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DAYS360(EndDate, StartDate) returns a negative number"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Pass StartDate as Arg 1 and EndDate as Arg 2: =DAYS360(Start, End)."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Accrual Variance vs Bank Statements"}</td>
                  <td className="py-3 px-4 font-sans">{"Using DAYS360 for bank accounts that calculate interest on Actual/365 convention."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Calculating consumer savings account interest with DAYS360"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use standard DAYS(End, Start) / 365 for retail bank accounts."}</td>
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
              <span className="text-rose-400 font-bold">Parameter Sequence Warning</span>
              <p className="text-slate-300">{"Beware! =DAYS(End, Start) has End first, but =DAYS360(Start, End) has Start first! This is one of Excel's most infamous parameter inconsistencies."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold">The YEARFRAC Basis 0 Equivalent</span>
              <p className="text-slate-300">{"The formula =DAYS360(A2, B2, FALSE) / 360 is mathematically 100% identical to =YEARFRAC(A2, B2, 0)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Why 360 Days Exists</span>
              <p className="text-slate-300">{"Before computers, calculating 365-day fractional interest with varying month lengths (28, 30, 31) was slow and error-prone. The 30/360 convention standardized manual math."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Negative Tenor Support</span>
              <p className="text-slate-300">{"If start date is chronologically after end date, DAYS360 returns a negative integer, allowing backward interest adjustments."}</p>
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
              • <strong>Financial History:</strong> {"Why did 19th-century commercial banks create the 360-day year convention, and why does Wall Street still use it for corporate debentures today?"}
            </p>

            <p key="1">
              • <strong>Parameter Nuance:</strong> {"Why does DAYS360 take (start_date, end_date) while the newer DAYS function takes (end_date, start_date)?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 8: DAYS360 Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DAYS360 Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In corporate debt capital markets, precision is paramount. Never use standard day subtraction for bond coupons — corporate debentures legally mandate the 30/360 day-count convention. And guard against Excel's signature trap: DAYS takes (End, Start), while DAYS360 takes (Start, End)."}
          />
        </div>
      </div>
    </div>
  );
}
