"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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

  const [sampleTimeVal, setSampleTimeVal] = useState("14:45:30");

  const parsedClockResult = useMemo(() => {
    const bits = sampleTimeVal.split(":");
    const h = parseInt(bits[0], 10) || 0;
    const m = parseInt(bits[1], 10) || 0;
    const s = parseInt(bits[2], 10) || 0;

    const totalSecondsInDay = (h * 3600) + (m * 60) + s;
    const decimalSerial = totalSecondsInDay / 86400;

    // Shift binning: Morning (06:00-14:00), Evening (14:00-22:00), Night (22:00-06:00)
    let shiftName = "Night Shift C";
    if (h >= 6 && h < 14) shiftName = "Morning Shift A";
    else if (h >= 14 && h < 22) shiftName = "Evening Shift B";

    // 15-Minute interval binning (e.g. 14:45)
    const quarterBin = `${String(h).padStart(2, "0")}:${String(Math.floor(m / 15) * 15).padStart(2, "0")}`;

    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;

    return {
      hour: h,
      minute: m,
      second: s,
      shiftName,
      quarterBin,
      decimalSerial: decimalSerial.toFixed(6),
      display12h: `${h12}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${ampm}`
    };
  }, [sampleTimeVal]);

  const applyPreset = (preset) => {
    if (preset === "morning_shift") {
      setSampleTimeVal("08:15:00");
    } else if (preset === "peak_traffic") {
      setSampleTimeVal("14:45:30");
    } else if (preset === "night_cutoff") {
      setSampleTimeVal("23:59:45");
    } else if (preset === "graveyard") {
      setSampleTimeVal("02:30:10");
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
              ⚡ Date & Calendar Engineering · Topic 6
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Decomposition · Clock Parser
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Bin
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            HOUR, MINUTE & SECOND Functions — Temporal Clock Parsing Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The precision triad <code className="text-indigo-300 font-mono font-bold">HOUR(serial_number)</code>, <code className="text-indigo-300 font-mono font-bold">MINUTE(serial_number)</code>, and <code className="text-indigo-300 font-mono font-bold">SECOND(serial_number)</code> isolates discrete time components from Excel's fractional day serials.</p><p>Because time in Excel is stored as an IEEE 754 64-bit floating point number between <code className="text-white font-mono">0.0</code> and <code className="text-white font-mono">0.99999</code>, extracting discrete hours (0-23), minutes (0-59), and seconds (0-59) via manual division often triggers minute floating-point rounding errors. These dedicated functions eliminate rounding jitter, providing reliable building blocks for shift binning, peak telephony call arrival modeling, server load profiling, and microsecond SLA tracking.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=HOUR(time), =MINUTE(time), =SECOND(time)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> BPO Call Center Queues, Web Traffic Peaks & Manufacturing Shifts</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =CHOOSE(INT(HOUR(A2)/8)+1, "Shift 1", "Shift 2", "Shift 3")</span>
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
            <span className="text-indigo-400">🧪</span> Interactive Temporal Clock Decomposer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Input any time string and observe real-time extraction of HOUR, MINUTE, SECOND alongside operational shift binning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("morning_shift")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Morning Shift (08:15)
          </button>
          <button
            onClick={() => applyPreset("peak_traffic")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Peak Hour (14:45:30)
          </button>
          <button
            onClick={() => applyPreset("night_cutoff")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Day End (23:59:45)
          </button>
          <button
            onClick={() => applyPreset("graveyard")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Graveyard (02:30:10)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Input Time (hh:mm:ss)</span>
            <span className="text-[10px] text-indigo-400 font-mono">24-Hour Input</span>
          </label>
          <input
            type="text"
            value={sampleTimeVal}
            onChange={(e) => setSampleTimeVal(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">HOUR()</span>
            <span className="text-xl font-bold font-mono text-indigo-300">{parsedClockResult.hour}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">MINUTE()</span>
            <span className="text-xl font-bold font-mono text-emerald-300">{parsedClockResult.minute}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">SECOND()</span>
            <span className="text-xl font-bold font-mono text-sky-300">{parsedClockResult.second}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Derived Operational Classifications
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Assigned Shift:</span>
            <span className="text-amber-300 font-semibold font-mono text-base">{parsedClockResult.shiftName}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">15-Min Telephony Bin:</span>
            <span className="text-emerald-300 font-semibold font-mono text-base">{parsedClockResult.quarterBin} Block</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">12-Hour AM/PM:</span>
            <span className="text-sky-300 font-semibold font-mono text-base">{parsedClockResult.display12h}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Day Fraction:</span>
            <span className="text-purple-300 font-semibold font-mono text-base">{parsedClockResult.decimalSerial}</span>
          </div>
        </div>
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
              Floating-Point Temporal Extractor
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical HOUR, MINUTE & SECOND Formula Signature</div>
            <div className="text-white font-bold text-base">
              =HOUR(serial_number) | =MINUTE(serial_number) | =SECOND(serial_number)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">serial_number:</strong> Required. The time or date-time value containing the time you want to extract. Can be supplied as a decimal serial, text string in quotes, or formula result.</div><div>• <strong className="text-sky-300">HOUR Return Range:</strong> An integer from 0 (12:00:00 AM) to 23 (11:00:00 PM). Excel always evaluates hours on a 24-hour military clock basis.</div><div>• <strong className="text-amber-300">MINUTE & SECOND Return Range:</strong> Integers from 0 to 59 representing the elapsed minutes and seconds within the current hour.</div>
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
              <span className="text-emerald-400">📊</span> Time Extraction & Operational Binning Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how fractional time decimals are decomposed into discrete 24-hour integers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Input Serial / Time</th>
                  <th className="py-3 px-4">HOUR()</th>
                  <th className="py-3 px-4">MINUTE()</th>
                  <th className="py-3 px-4">SECOND()</th>
                  <th className="py-3 px-4">Shift / Bin Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">08:15:30 AM (0.3441)</td>
        <td className="py-3.5 px-4 text-white">8</td>
        <td className="py-3.5 px-4 text-emerald-300">15</td>
        <td className="py-3.5 px-4 text-sky-300">30</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Morning Production Shift A</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">14:45:00 PM (0.6146)</td>
        <td className="py-3.5 px-4 text-white">14</td>
        <td className="py-3.5 px-4 text-emerald-300">45</td>
        <td className="py-3.5 px-4 text-sky-300">0</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Peak Telephony Inbound Spike</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">23:59:59 PM (0.9999)</td>
        <td className="py-3.5 px-4 text-white">23</td>
        <td className="py-3.5 px-4 text-emerald-300">59</td>
        <td className="py-3.5 px-4 text-sky-300">59</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Day-End Financial Batch Cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">00:30:15 AM (0.0210)</td>
        <td className="py-3.5 px-4 text-white">0</td>
        <td className="py-3.5 px-4 text-emerald-300">30</td>
        <td className="py-3.5 px-4 text-sky-300">15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Graveyard / Nocturnal Maintenance</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12:00:00 PM (0.5000)</td>
        <td className="py-3.5 px-4 text-white">12</td>
        <td className="py-3.5 px-4 text-emerald-300">0</td>
        <td className="py-3.5 px-4 text-sky-300">0</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midday Lunch Break Window</td>
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
                Floating Point Epsilon Jitter in Time Division
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why manual division =A1*24 triggers minute boundary mismatch errors.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>Due to IEEE 754 binary floating-point specifications, fractional numbers like <code className="text-white font-mono">1/24</code> (0.0416666666666667) and <code className="text-white font-mono">1/1440</code> cannot be represented exactly in binary registers.</p><p>If an analyst attempts to extract the minute integer manually using <code className="text-rose-400 font-mono">=INT((A1 - INT(A1*24)/24) * 1440)</code>, floating point epsilon noise often causes <code className="text-white font-mono">15.00000000000001</code> to round down to <code className="text-rose-400 font-mono">14</code>! Excel's native <code className="text-indigo-300 font-mono">MINUTE()</code> function internally rounds to the nearest second before extracting the minute integer, completely shielding your formulas from binary rounding corruption.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle Manual Floating Point Extraction
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=INT((MOD(A1, 1) - INT(MOD(A1, 1)*24)/24) * 1440)"}
                </div>
                <p className="text-xs text-slate-400">
                  Vulnerable to IEEE 754 precision dropoffs, intermittently returning minutes off by 1.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Native MINUTE() Function
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=MINUTE(A1)"}
                </div>
                <p className="text-xs text-slate-400">
                  Direct C++ microcode evaluation incorporating binary epsilon compensation.
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
            Decomposition of high-precision floating point time serial into discrete hour, minute, and second registers.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Time Decimal Serial</text>
        <text x="140" y="105" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">0.614583</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">14:45:00 PM</text>

        <path d="M 250 80 L 340 50 M 250 100 L 340 100 M 250 120 L 340 150" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">=HOUR(A2) ➔ 14 (2 PM)</text>

        <rect x="340" y="80" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="105" textAnchor="middle" fill="#10B981" className="text-xs font-mono font-bold">=MINUTE(A2) ➔ 45</text>

        <rect x="340" y="130" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="155" textAnchor="middle" fill="#F59E0B" className="text-xs font-mono font-bold">=SECOND(A2) ➔ 00</text>

        <path d="M 560 50 L 640 100 M 560 100 L 640 100 M 560 150 L 640 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Operational Bin</text>
        <text x="725" y="102" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">Shift: Afternoon</text>
        <text x="725" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono font-bold">Peak Traffic Window</text>
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
                Explore real HOUR, MINUTE & SECOND formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic6"
            title="Topic 6: HOUR, MINUTE & SECOND Master Practice Grid"
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
                  Scenario 1: BPO Inbound Telephony
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Park Telecom</span>
              </div>
              <h3 className="text-base font-bold text-white">Inbound Call Arrival Peak Hour Binning</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Call center analytics requires binning thousands of call arrival timestamps in column A into single-hour buckets (0 to 23) to forecast workforce staffing requirements."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Extract hour integer directly for PivotTable group charting</div>
                <div className="text-emerald-300 font-bold">{"=HOUR(A2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"14 (representing 2:00 PM to 3:00 PM peak arrival)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Corporate Facility Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Technology Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Three-Tier Manufacturing Shift Assignment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Classify worker swipe time in B2 into Shift 1 (06:00-14:00), Shift 2 (14:00-22:00), or Shift 3 (22:00-06:00 overnight)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Segment into shifts based on HOUR() boundaries</div>
                <div className="text-emerald-300 font-bold">{"=IFS(HOUR(B2) < 6, \"Shift 3\", HOUR(B2) < 14, \"Shift 1\", HOUR(B2) < 22, \"Shift 2\", TRUE, \"Shift 3\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"Shift 1\" (for swipe at 07:45 AM)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: E-Commerce Delivery Hub
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Logistics Fulfillment</span>
              </div>
              <h3 className="text-base font-bold text-white">Dispatch Delivery Run Cycle Binning</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Parcels sorted between minutes 0-29 go to Run Cycle 1; parcels sorted between minutes 30-59 go to Run Cycle 2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate MINUTE() to bifurcate the delivery run</div>
                <div className="text-emerald-300 font-bold">{"=IF(MINUTE(C2) < 30, \"CYCLE 1 (TOP OF HOUR)\", \"CYCLE 2 (BOTTOM OF HOUR)\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"CYCLE 2\" (for parcel scanned at 10:42 AM)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Cloud Database Architecture
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Data Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated Micro-Batch Latency SLA Tracker</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Database transactions must complete in under 45 seconds. Given start timestamp in D2 and end timestamp in E2, calculate elapsed seconds within the minute."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate difference in seconds using SECOND() and MINUTE()</div>
                <div className="text-emerald-300 font-bold">{"=(MINUTE(E2) - MINUTE(D2)) * 60 + (SECOND(E2) - SECOND(D2))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"28 Seconds Latency"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Healthcare Diagnostic Lab
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Pathology Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Blood Sample Centrifuge Centering Rounding</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Blood samples must be centrifuged within 15 minutes of collection timestamp in F2. Extract the exact minute elapsed to trigger alert."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Compare current system minute against collection minute</div>
                <div className="text-emerald-300 font-bold">{"=IF((NOW() - F2) * 1440 > 15, \"SAMPLE REJECTED - EXPIRED\", \"READY FOR TESTING\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"READY FOR TESTING\" (at 8 minutes elapsed)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Power Grid & Renewable Energy
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Solar Substation</span>
              </div>
              <h3 className="text-base font-bold text-white">Solar Inverter Peak Solar Generation Window</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Peak solar irradiance occurs between 11:00 AM and 14:00 PM. Flag whether inverter telemetry timestamp in G2 occurred during peak generation."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Check whether HOUR is between 11 and 13 inclusive</div>
                <div className="text-emerald-300 font-bold">{"=IF(AND(HOUR(G2) >= 11, HOUR(G2) < 14), \"PEAK GENERATION\", \"STANDARD\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"PEAK GENERATION\" (at 12:35 PM)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Isolate Time from Mixed Timestamps</span>
              <p>{"HOUR, MINUTE, and SECOND automatically ignore the calendar date integer and evaluate purely the decimal fraction."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=HOUR('2026-11-12 14:45:30') -> 14"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Understand the 24-Hour Range</span>
              <p>{"HOUR returns values from 0 to 23. Midnight is 0, noon is 12, and 11 PM is 23."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"HOUR('12:00 AM') = 0\nHOUR('12:00 PM') = 12"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Extract Minutes and Seconds</span>
              <p>{"Apply MINUTE() and SECOND() to obtain precise 0-59 integer counters."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"MINUTE('14:45:30') = 45\nSECOND('14:45:30') = 30"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Construct Time Slices</span>
              <p>{"Combine extracted components into custom time buckets using integer math."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"30-Min Bin: =HOUR(A2) + IF(MINUTE(A2)>=30, 0.5, 0)"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! from Unrecognized Format"}</td>
                  <td className="py-3 px-4 font-sans">{"Text string lacks valid colons or is formatted in a non-standard delimiter."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=HOUR('14.30.00') on systems configured for colons"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Substitute dots with colons or pass authentic numeric serials."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"HOUR() Returns 0 for Blank Cells"}</td>
                  <td className="py-3 px-4 font-sans">{"Empty cells evaluate to 0 in Excel, representing midnight 12:00:00 AM."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=HOUR(A2) where A2 is blank"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with: =IF(A2='', '', HOUR(A2))."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"12-Hour AM/PM Misinterpretation"}</td>
                  <td className="py-3 px-4 font-sans">{"Entering '12:30' without AM/PM defaults to 12:30 PM (Hour 12) rather than 00:30 AM (Hour 0)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=HOUR('12:30')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Explicitly include AM/PM or use 24-hour military clock '00:30'."}</td>
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
              <span className="text-indigo-400 font-bold">Converting Time to Decimal Hours</span>
              <p className="text-slate-300">{"Convert any timestamp to total decimal hours (e.g. 14.75 hours for 14:45): =HOUR(A2) + MINUTE(A2)/60 + SECOND(A2)/3600."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">15-Minute Block Rounding</span>
              <p className="text-slate-300">{"Group records into 15-minute telephony blocks for pivot charts: =TIME(HOUR(A2), FLOOR(MINUTE(A2), 15), 0)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Total Seconds Elapsed from Midnight</span>
              <p className="text-slate-300">{"Calculate absolute seconds elapsed since midnight: =HOUR(A2)*3600 + MINUTE(A2)*60 + SECOND(A2)."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Avoid Floating Point Rounding Bugs</span>
              <p className="text-slate-300">{"Always use native MINUTE() instead of manual modulo division to avoid IEEE 754 precision dropoffs."}</p>
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
              • <strong>System Architecture:</strong> {"Why does Excel's HOUR() function return 0 for both 12:00:00 AM and 00:00:00, but returns 12 for 12:00:00 PM?"}
            </p>

            <p key="1">
              • <strong>Data Engineering:</strong> {"When aggregating telephony call volume into hourly histograms, why is grouping by =HOUR(A2) preferred over grouping by text intervals like '14:00 - 15:00'?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 6: HOUR, MINUTE & SECOND Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="HOUR, MINUTE & SECOND Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"HOUR, MINUTE, and SECOND are critical for operational shift modeling. Always remember that HOUR operates strictly on a 24-hour clock. For call center staffing and plant rosters, memorize the 15-minute floor formula: =TIME(HOUR(A2), FLOOR(MINUTE(A2), 15), 0) — it is the gold standard for queue analytics."}
          />
        </div>
      </div>
    </div>
  );
}
