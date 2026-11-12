"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic18_files/topic18_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic18() {
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

  const [inpYfStart, setInpYfStart] = useState("2026-01-01");
  const [inpYfEnd, setInpYfEnd] = useState("2026-07-01");
  const [inpYfBasis, setInpYfBasis] = useState(1);
  const [loanPrincipal, setLoanPrincipal] = useState(50000000);
  const [annualRatePct, setAnnualRatePct] = useState(8.5);

  const yfResult = useMemo(() => {
    const s = new Date(inpYfStart);
    const e = new Date(inpYfEnd);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const b = parseInt(inpYfBasis, 10);

    // Approximate JS implementation of the 5 conventions
    const utcE = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const utcS = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    const actualDays = Math.round((utcE - utcS) / 86400000);

    let fraction = 0;
    if (b === 0) {
      // 30/360 US
      let d1 = Math.min(s.getDate(), 30);
      let d2 = e.getDate() === 31 && d1 >= 30 ? 30 : e.getDate();
      fraction = ((e.getFullYear() - s.getFullYear()) * 360 + (e.getMonth() - s.getMonth()) * 30 + (d2 - d1)) / 360;
    } else if (b === 1) {
      // Actual / Actual
      const isLeapYearSpan = (s.getFullYear() % 4 === 0 && s.getFullYear() % 100 !== 0) || (s.getFullYear() % 400 === 0);
      const baseYearDays = isLeapYearSpan ? 366 : 365;
      fraction = actualDays / baseYearDays;
    } else if (b === 2) {
      // Actual / 360
      fraction = actualDays / 360;
    } else if (b === 3) {
      // Actual / 365
      fraction = actualDays / 365;
    } else if (b === 4) {
      // 30/360 European
      let d1 = Math.min(s.getDate(), 30);
      let d2 = Math.min(e.getDate(), 30);
      fraction = ((e.getFullYear() - s.getFullYear()) * 360 + (e.getMonth() - s.getMonth()) * 30 + (d2 - d1)) / 360;
    }

    const interestAmount = loanPrincipal * (annualRatePct / 100) * fraction;

    return {
      isError: false,
      fraction: fraction.toFixed(6),
      actualDays,
      interestAmount: interestAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      basisName: ["0: US 30/360", "1: Actual/Actual", "2: Actual/360", "3: Actual/365", "4: European 30/360"][b]
    };
  }, [inpYfStart, inpYfEnd, inpYfBasis, loanPrincipal, annualRatePct]);

  const applyPreset = (preset) => {
    if (preset === "treasury") {
      setInpYfStart("2026-01-01");
      setInpYfEnd("2026-07-01");
      setInpYfBasis(1); // Actual/Actual
    } else if (preset === "commercial_paper") {
      setInpYfStart("2026-01-01");
      setInpYfEnd("2026-07-01");
      setInpYfBasis(2); // Actual/360
    } else if (preset === "bank_loan") {
      setInpYfStart("2026-01-01");
      setInpYfEnd("2026-07-01");
      setInpYfBasis(3); // Actual/365
    } else if (preset === "corporate_bond") {
      setInpYfStart("2026-01-01");
      setInpYfEnd("2026-07-01");
      setInpYfBasis(0); // US 30/360
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
              ⚡ Date & Calendar Engineering · Topic 18
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Financial Engineering · Day-Count Basis
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Price
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            YEARFRAC Function — Financial Day-Count Fraction & Depreciation Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">YEARFRAC(start_date, end_date, [basis])</code> function calculates the fraction of the year represented by the number of whole days between two dates.</p><p>In global financial markets, bond yields, interest rate swaps, fixed asset depreciation, and actuarial annuities, calculating annualized interest requires converting calendar day differences into a precise decimal fraction of a year (e.g. 0.25 years for 3 months, or 2.476 years). <code className="text-indigo-300 font-mono">YEARFRAC()</code> implements the <strong>five official financial day-count conventions</strong> (US 30/360, Actual/Actual, Actual/360, Actual/365, and European 30/360). Choosing the proper basis is legally binding in financial contracts: an error in basis selection on a $100M debt issuance can cause hundreds of thousands of dollars in interest discrepancies!</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=YEARFRAC(start_date, end_date, [basis])</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Bond Yields, Interest Rate Swaps & Fixed Asset Depreciation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =YEARFRAC(A2, B2, 1) (Actual/Actual Treasury Basis)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive YEARFRAC Financial Day-Count Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare the five global day-count conventions and observe the multi-million dollar interest variance live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("treasury")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Treasury (Basis 1)
          </button>
          <button
            onClick={() => applyPreset("commercial_paper")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Money Mkt (Basis 2)
          </button>
          <button
            onClick={() => applyPreset("bank_loan")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            Bank Loan (Basis 3)
          </button>
          <button
            onClick={() => applyPreset("corporate_bond")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Bond (Basis 0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpYfStart}
            onChange={(e) => setInpYfStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date</span>
            <span className="text-[10px] text-sky-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpYfEnd}
            onChange={(e) => setInpYfEnd(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Day-Count Basis (Argument 3)
          </label>
          <select
            value={inpYfBasis}
            onChange={(e) => setInpYfBasis(parseInt(e.target.value, 10))}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={0}>0 — US (NASD) 30/360</option>
            <option value={1}>1 — Actual / Actual (Sovereign Treasuries)</option>
            <option value={2}>2 — Actual / 360 (Money Market & SOFR)</option>
            <option value={3}>3 — Actual / 365 (Commercial Bank Loans)</option>
            <option value={4}>4 — European 30/360 (Eurobonds)</option>
          </select>
          <span className="text-[10px] text-slate-500 block truncate">Regulates calendar divisor</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =YEARFRAC("{inpYfStart}", "{inpYfEnd}", {inpYfBasis})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Year Fraction:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {yfResult.isError ? yfResult.error : yfResult.fraction} Yrs
            </span>
          </div>
        </div>

        {!yfResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Active Basis:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {yfResult.basisName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Accrued Interest (₹50 Cr @ 8.5%):</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                ₹{yfResult.interestAmount}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Actual Calendar Days:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                {yfResult.actualDays} Days
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
              Financial Day-Count Fraction Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical YEARFRAC Formula Signature</div>
            <div className="text-white font-bold text-base">
              =YEARFRAC(start_date, end_date, [basis])
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the financial period.</div><div>• <strong className="text-sky-300">end_date:</strong> Required. The ending date of the financial period.</div><div>• <strong className="text-amber-300">basis:</strong> Optional. The type of day-count basis to use: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">0 (or omitted):</code> US (NASD) 30/360.<br/>&nbsp;&nbsp;• <code className="font-mono text-emerald-300">1:</code> Actual/Actual (Standard for Government Treasury Bonds!).<br/>&nbsp;&nbsp;• <code className="font-mono text-sky-300">2:</code> Actual/360 (Money Market, Commercial Paper, SOFR/LIBOR).<br/>&nbsp;&nbsp;• <code className="font-mono text-amber-300">3:</code> Actual/365 (Corporate Bank Loans, UK/Commonwealth).<br/>&nbsp;&nbsp;• <code className="font-mono text-purple-300">4:</code> European 30/360 (Eurobonds).</div>
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
              <span className="text-emerald-400">📊</span> The 5 Financial Day-Count Basis Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how each basis calculates fractional year length across identical date spans.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Basis Code</th>
                  <th className="py-3 px-4">Financial Convention</th>
                  <th className="py-3 px-4">Day Count Rule</th>
                  <th className="py-3 px-4">Base Year Days</th>
                  <th className="py-3 px-4">Primary Market Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0 (Default)</td>
        <td className="py-3.5 px-4 text-white">US (NASD) 30/360</td>
        <td className="py-3.5 px-4 text-slate-300">Months = 30 Days</td>
        <td className="py-3.5 px-4 text-slate-300">360 Days</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">US corporate bonds & agency debentures</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (Treasury)</td>
        <td className="py-3.5 px-4 text-white">Actual / Actual</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">Actual Calendar Days</td>
        <td className="py-3.5 px-4 text-emerald-400">Actual (365 or 366)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">US Treasury Bonds & Sovereign Government Debt</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2 (Money Mkt)</td>
        <td className="py-3.5 px-4 text-white">Actual / 360</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">Actual Calendar Days</td>
        <td className="py-3.5 px-4 text-sky-400">360 Days</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Commercial paper, T-bills, Eurodollar & SOFR loans</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">3 (Commercial)</td>
        <td className="py-3.5 px-4 text-white">Actual / 365</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Actual Calendar Days</td>
        <td className="py-3.5 px-4 text-amber-400">365 Days (Fixed)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">UK Gilts, Commonwealth & Indian commercial loans</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">4 (European)</td>
        <td className="py-3.5 px-4 text-white">European 30/360</td>
        <td className="py-3.5 px-4 text-purple-300 font-bold">Months = 30 Days (Euro)</td>
        <td className="py-3.5 px-4 text-purple-400">360 Days</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Eurobonds & European cross-border debentures</td>
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
                The Multi-Million Dollar Basis Spread: Basis 2 vs Basis 3
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why lenders prefer Actual/360 (Basis 2) to collect an extra 5 days of interest per year.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>In commercial lending, commercial banks almost universally structure floating-rate corporate credit using <strong>Basis 2 (Actual/360)</strong> rather than <strong>Basis 3 (Actual/365)</strong>.</p><p>Why? Because a standard calendar year has 365 days. Under Actual/360, the year fraction evaluates to <code className="text-amber-300 font-mono">365 / 360 = 1.013889</code> years! This produces an extra <strong>1.39% in interest revenue</strong> annually on the exact same nominal interest rate! On a INR 100 Crore corporate loan at 8.0% interest, switching from Basis 3 to Basis 2 earns the bank an additional <code className="text-emerald-300 font-mono">INR 11,11,111</code> in interest every single year! Financial modelers must never treat the basis argument as optional.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Arbitrary Division by 365 or 365.25
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=(End - Start) / 365.25"}
                </div>
                <p className="text-xs text-slate-400">
                  Fails regulatory day-count standards and produces non-compliant interest calculations for bond audits.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Regulatory YEARFRAC
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=Principal * Rate * YEARFRAC(Start, End, 1)"}
                </div>
                <p className="text-xs text-slate-400">
                  Applies exact statutory convention (Basis 1 for Treasuries, Basis 2 for Money Market, Basis 0 for Corporate Bonds).
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
            The 5 financial day-count conventions dividing day counts across different annual denominators.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="130" height="110" rx="12" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="95" y="75" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold">Basis 0</text>
        <text x="95" y="98" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">30 / 360 US</text>
        <text x="95" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Corporate Bonds</text>

        <rect x="180" y="45" width="140" height="110" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="250" y="75" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold">Basis 1</text>
        <text x="250" y="98" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">Actual / Actual</text>
        <text x="250" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">US Treasuries</text>

        <rect x="340" y="45" width="140" height="110" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="410" y="75" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold">Basis 2</text>
        <text x="410" y="98" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">Actual / 360</text>
        <text x="410" y="125" textAnchor="middle" fill="#BAE6FD" className="text-[10px]">Money Mkt / SOFR</text>

        <rect x="500" y="45" width="140" height="110" rx="12" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <text x="570" y="75" textAnchor="middle" fill="#FEF08A" className="text-xs font-bold">Basis 3</text>
        <text x="570" y="98" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">Actual / 365</text>
        <text x="570" y="125" textAnchor="middle" fill="#FDE68A" className="text-[10px]">Commercial Loans</text>

        <rect x="660" y="45" width="150" height="110" rx="12" fill="#581C87" stroke="#A855F7" strokeWidth="2" />
        <text x="735" y="75" textAnchor="middle" fill="#E9D5FF" className="text-xs font-bold">Basis 4</text>
        <text x="735" y="98" textAnchor="middle" fill="#FFFFFF" className="text-xs font-mono">30 / 360 Euro</text>
        <text x="735" y="125" textAnchor="middle" fill="#F3E8FF" className="text-[10px]">Eurobonds</text>
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
                Explore real YEARFRAC formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic18"
            title="Topic 18: YEARFRAC Master Practice Grid"
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
                  Scenario 1: Sovereign Debt Capital Markets
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Reserve Bank of India (RBI) Primary Dealer</span>
              </div>
              <h3 className="text-base font-bold text-white">Government of India Sovereign Bond Coupon Accrual</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Government of India (GoI) dated securities legally mandate the Actual/Actual (Basis 1) convention. Calculate accrued interest between coupon milestones in A2 and B2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Pass basis 1 for sovereign treasury bonds</div>
                <div className="text-emerald-300 font-bold">{"=FaceValue * CouponRate * YEARFRAC(A2, B2, 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 3,70,890.41 (on INR 1 Crore bond at 7.4% coupon)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Syndicated Corporate Lending
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate Banking Consortium</span>
              </div>
              <h3 className="text-base font-bold text-white">Commercial Syndicated Term Loan Interest Billing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Corporate loan of INR 100 Crores accrues interest at Repo + 250 bps using the standard commercial banking Actual/365 convention (Basis 3)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Pass basis 3 for Actual/365 commercial lending</div>
                <div className="text-emerald-300 font-bold">{"=Principal * EffectiveRate * YEARFRAC(C2, D2, 3)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 2,12,05,479.45 (for 91-day interest period)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Money Market Commercial Paper
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Financial Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">SOFR Floating Rate Note Accrual (Actual/360)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Secured Overnight Financing Rate (SOFR) floating rate notes calculate interest on the Actual/360 day-count convention (Basis 2)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Supply basis 2 for Actual/360 money market securities</div>
                <div className="text-emerald-300 font-bold">{"=Principal * (SOFRRate + Margin) * YEARFRAC(E2, F2, 2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"USD 125,000.00 (on USD 10M note for 90 days)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Corporate Fixed Asset Accounting
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Manufacturing Spares</span>
              </div>
              <h3 className="text-base font-bold text-white">Prorated Asset Depreciation Year Fraction</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Heavy industrial machinery acquired mid-year on date G2 requires prorated first-year depreciation under Companies Act 2013 (Schedule II)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate exact fraction of fiscal year elapsed until March 31</div>
                <div className="text-emerald-300 font-bold">{"=AssetCost * DepreciationRate * YEARFRAC(G2, DATE(YEAR(G2)+1, 3, 31), 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 3,84,219.00 (for 0.3842 year fraction)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Life Insurance & Actuarial Science
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Actuarial Consultancy</span>
              </div>
              <h3 className="text-base font-bold text-white">Actuarial Exact Fractional Age for Mortality Reserves</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Life insurance actuaries calculate policyholder mortality reserves based on exact decimal fractional age from DOB in H2 to valuation date in I2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Extract high-precision decimal age fraction</div>
                <div className="text-emerald-300 font-bold">{"=YEARFRAC(H2, I2, 1)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"34.7825 Years of Age"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: European Cross-Border Bonds
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Frankfurt / Kolkata Port Finance</span>
              </div>
              <h3 className="text-base font-bold text-white">Eurobond European 30/360 Coupon Pricing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Eurobonds denominated in Euros stipulate the ICMA European 30/360 day-count convention (Basis 4)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Pass basis 4 for European Eurobond convention</div>
                <div className="text-emerald-300 font-bold">{"=Principal * Rate * YEARFRAC(J2, K2, 4)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"EUR 75,000.00 (for 180 commercial days)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Check Debt Prospectus for Day-Count Basis</span>
              <p>{"Never guess the basis. Check whether the contract mandates US 30/360 (0), Actual/Actual (1), Actual/360 (2), or Actual/365 (3)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Treasuries: basis = 1\nMoney Market / SOFR: basis = 2\nBank Loans: basis = 3"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Understand the Divisor Impact</span>
              <p>{"Basis 2 divides actual days by 360, producing a higher fraction than Basis 3 which divides by 365."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"90 Days: 90/360 = 0.2500 vs 90/365 = 0.2466"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Calculate Accrued Financial Interest</span>
              <p>{"Multiply Principal, Annual Rate, and YEARFRAC output together."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=Principal * Rate * YEARFRAC(A2, B2, 1)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Format as Decimal or Currency</span>
              <p>{"Format the fraction cell as a 4 to 6 decimal place number, or wrap inside the interest equation."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Format: 0.000000"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Basis Omission Interest Discrepancy"}</td>
                  <td className="py-3 px-4 font-sans">{"Omitting the basis argument defaults to Basis 0 (US 30/360), which produces inaccurate coupon values for Treasury notes (Basis 1)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=YEARFRAC(Start, End) on Treasury bonds"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Always supply explicit basis argument: =YEARFRAC(Start, End, 1)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM! Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Supplying an invalid basis number outside the 0 to 4 range."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=YEARFRAC(A2, B2, 5)"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure basis is an integer between 0 and 4."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Text Date"}</td>
                  <td className="py-3 px-4 font-sans">{"One of the date arguments is an unparseable text string."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=YEARFRAC('text', '2026-11-12')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Pass authentic date serials constructed with DATE()."}</td>
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
              <span className="text-indigo-400 font-bold">Actuarial Exact Age</span>
              <p className="text-slate-300">{"For life insurance and pension models, =YEARFRAC(DOB, TODAY(), 1) is the industry standard for exact fractional age."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Basis 0 vs DAYS360</span>
              <p className="text-slate-300">{"The formula =YEARFRAC(A2, B2, 0) produces the exact same decimal fraction as =DAYS360(A2, B2, FALSE) / 360."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">The SOFR Floating Rate Rule</span>
              <p className="text-slate-300">{"All post-LIBOR US Dollar syndicated debt benchmarked against SOFR legally stipulates Basis 2 (Actual/360)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Fixed Asset Depreciation Proration</span>
              <p className="text-slate-300">{"Prorate annual depreciation for mid-year asset purchases: =AnnualDepreciation * YEARFRAC(PurchaseDate, FiscalYearEnd, 1)."}</p>
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
              • <strong>Financial Engineering:</strong> {"Why do commercial banks prefer lending on an Actual/360 basis (Basis 2) rather than Actual/365 (Basis 3)?"}
            </p>

            <p key="1">
              • <strong>Regulatory Compliance:</strong> {"Why does the Reserve Bank of India mandate Actual/Actual (Basis 1) for sovereign debt coupon settlements?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 18: YEARFRAC Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="YEARFRAC Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"YEARFRAC is the crown jewel of debt capital markets. Never leave the basis argument empty in corporate financial models — omitting it defaults to 30/360 US, which will fail an audit if your debt is benchmarked against SOFR (Basis 2) or Treasuries (Basis 1). Always verify the day-count convention in the loan term sheet."}
          />
        </div>
      </div>
    </div>
  );
}
