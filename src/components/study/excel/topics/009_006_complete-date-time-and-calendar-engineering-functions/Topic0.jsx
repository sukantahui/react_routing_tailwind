"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
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

  const [ticketTimeStr, setTicketTimeStr] = useState("2026-11-12T09:00");
  const [slaHoursLimit, setSlaHoursLimit] = useState(8);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeTimestamp, setFreezeTimestamp] = useState(null);

  const liveNow = useMemo(() => {
    return isFrozen && freezeTimestamp ? freezeTimestamp : new Date();
  }, [isFrozen, freezeTimestamp]);

  const liveCalculation = useMemo(() => {
    const tStart = new Date(ticketTimeStr);
    if (isNaN(tStart.getTime())) {
      return { error: "Invalid Start Time", isError: true };
    }
    const diffMs = liveNow.getTime() - tStart.getTime();
    const diffFractionalDays = diffMs / (1000 * 60 * 60 * 24);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffMinutes = (diffMs / (1000 * 60)) % 60;
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    const isBreached = diffHours > slaHoursLimit;
    const remainingHours = slaHoursLimit - diffHours;

    // Excel serial calculation:
    // Days between 1900-01-01 and 1970-01-01 is 25569. Excel leap year bug adds 1 day -> 25569.
    const excelSerial = 25569.0 + (liveNow.getTime() - (liveNow.getTimezoneOffset() * 60000)) / 86400000.0;

    return {
      isError: false,
      diffFractionalDays: diffFractionalDays.toFixed(6),
      diffHours: diffHours.toFixed(2),
      formattedDuration: `${Math.floor(diffHours)}h ${Math.floor(diffMinutes)}m ${diffSeconds}s`,
      isBreached,
      remainingHours: remainingHours.toFixed(2),
      excelSerial: excelSerial.toFixed(5),
      isoString: liveNow.toISOString().replace("T", " ").slice(0, 19)
    };
  }, [ticketTimeStr, slaHoursLimit, liveNow]);

  const applyPreset = (preset) => {
    const now = new Date();
    if (preset === "incident") {
      const past = new Date(now.getTime() - 3.5 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(4);
    } else if (preset === "breach") {
      const past = new Date(now.getTime() - 11.2 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(8);
    } else if (preset === "shift") {
      const past = new Date(now.getTime() - 7.8 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(8.5);
    } else if (preset === "just_logged") {
      const past = new Date(now.getTime() - 15 * 60000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(2);
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
              ⚡ Date & Calendar Engineering · Topic 0
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Function · Volatile Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Apply
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            NOW Function — Live System Timestamp & SLA Drift Engine
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">NOW()</code> function is Excel's real-time system clock transducer. It interrogates the host operating system's local clock cycle and returns a 64-bit double precision floating-point serial number combining the integer date with the high-precision fractional day.</p><p>Because <code className="text-indigo-300 font-mono">NOW()</code> is classified as a <strong>Volatile Function</strong>, it forces recalculation of its host cell and all downstream dependent calculation trees whenever Excel executes a recalculation event (cell edit, F9 manual trigger, or workbook open). In enterprise analytics across IT service management, real-time SLA monitors, automated shift attendance, and dynamic batch execution pipelines, understanding its dual-precision nature and performance overhead is mandatory.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=NOW()</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Real-Time IT Service Desk & SLA Monitoring</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =NOW() - A2 (Elapsed Fractional Days)</span>
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
            <span className="text-indigo-400">🧪</span> Live NOW() System Clock & SLA Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate real-time SLA drift, examine Excel 64-bit serial calculations, and toggle live vs frozen clock states.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (isFrozen) {
                setIsFrozen(false);
                setFreezeTimestamp(null);
              } else {
                setIsFrozen(true);
                setFreezeTimestamp(new Date());
              }
            }}
            className={`px-3 py-1.5 text-xs rounded-xl font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              isFrozen
                ? "bg-amber-950/80 text-amber-300 border-amber-600/70"
                : "bg-emerald-950/80 text-emerald-300 border-emerald-600/70 animate-pulse"
            }`}
          >
            <span>{isFrozen ? "❄️ Frozen Clock (Static)" : "⚡ Live Ticking (Volatile)"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">SLA Presets:</span>
        <button
          onClick={() => applyPreset("incident")}
          className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
        >
          P1 Incident (4h SLA)
        </button>
        <button
          onClick={() => applyPreset("breach")}
          className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
        >
          Critical SLA Breach
        </button>
        <button
          onClick={() => applyPreset("shift")}
          className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
        >
          Daily Shift Handover
        </button>
        <button
          onClick={() => applyPreset("just_logged")}
          className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
        >
          15-Min Heartbeat
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Ticket Logged Timestamp (A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Past Baseline</span>
          </label>
          <input
            type="datetime-local"
            value={ticketTimeStr}
            onChange={(e) => setTicketTimeStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>SLA Target Limit (Hours)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Contractual Ceiling</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="72"
            value={slaHoursLimit}
            onChange={(e) => setSlaHoursLimit(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =(NOW() - A2) * 24
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Elapsed Hours:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                liveCalculation.isBreached
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {liveCalculation.diffHours} hrs
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Calculated Duration:</span>
            <span className="text-amber-300 font-semibold font-mono text-sm">
              {liveCalculation.formattedDuration}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">SLA Compliance:</span>
            <span
              className={`font-bold inline-flex items-center gap-1.5 ${
                liveCalculation.isBreached ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {liveCalculation.isBreached ? "✗ SLA Breached" : "✓ Within Contractual SLA"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Raw NOW() Serial:</span>
            <span className="text-sky-300 font-semibold font-mono text-sm">
              {liveCalculation.excelSerial}
            </span>
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
              Dynamic Host Clock Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical NOW Formula Signature</div>
            <div className="text-white font-bold text-base">
              =NOW()
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Arguments:</strong> None. The function accepts no parameters. Any arguments supplied inside the parentheses will trigger a <code className="font-mono text-rose-400">#N/A</code> or syntax error dialog.</div><div>• <strong className="text-sky-300">Return Value:</strong> Serial date-time number. The integer portion represents days elapsed since January 1, 1900; the decimal portion represents fractional day elapsed since 12:00:00 AM (midnight).</div><div>• <strong className="text-amber-300">Recalculation Behavior:</strong> Volatile. Recalculates dynamically across all threads upon worksheet recalculation events.</div>
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
              <span className="text-emerald-400">📊</span> NOW() Precision & Serial Breakdown Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how Excel stores fractional time slices and how time arithmetic operates on the serial.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Fractional Serial</th>
                  <th className="py-3 px-4">Clock Time</th>
                  <th className="py-3 px-4">Elapsed Hours</th>
                  <th className="py-3 px-4">Elapsed Minutes</th>
                  <th className="py-3 px-4">Sample Formula Extraction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.000000</td>
        <td className="py-3.5 px-4 text-white">12:00:00 AM (Midnight)</td>
        <td className="py-3.5 px-4 text-slate-300">0.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">0 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW())</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.250000</td>
        <td className="py-3.5 px-4 text-white">06:00:00 AM</td>
        <td className="py-3.5 px-4 text-slate-300">6.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">360 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.25</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.500000</td>
        <td className="py-3.5 px-4 text-white">12:00:00 PM (Noon)</td>
        <td className="py-3.5 px-4 text-slate-300">12.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">720 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.50</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.750000</td>
        <td className="py-3.5 px-4 text-white">06:00:00 PM</td>
        <td className="py-3.5 px-4 text-slate-300">18.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">1,080 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.75</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-amber-400 font-bold">0.999988</td>
        <td className="py-3.5 px-4 text-white">11:59:59 PM</td>
        <td className="py-3.5 px-4 text-slate-300">23.999 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">1,439.98 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=NOW()</td>
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
                The Volatility Cascade & Operating System Clock Resolution
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why thousands of =NOW() formulas cripple workbook responsiveness and how enterprise models mitigate recalculation spikes.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>In Microsoft Excel's multi-threaded calculation engine, formulas are indexed into an internal <strong>Dependency Tree</strong>. Standard formulas (such as <code className="text-white font-mono">=A1 + B1</code>) only recalculate when their predecessor precedents change.</p><p>However, functions flagged as <strong>Volatile</strong> (<code className="text-indigo-300 font-mono">NOW</code>, <code className="text-indigo-300 font-mono">TODAY</code>, <code className="text-indigo-300 font-mono">RAND</code>, <code className="text-indigo-300 font-mono">OFFSET</code>, <code className="text-indigo-300 font-mono">INDIRECT</code>) register unconditionally on the global unbuffered recalculation list. Every single time a user enters data into ANY cell in the workbook, Excel is forced to evaluate every <code className="text-indigo-300 font-mono">NOW()</code> formula and recalculate all downstream dependent formulas.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Volatile Performance Killer Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=IF(NOW() > [@[SLADeadline]], \"Breached\", \"In SLA\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Placed in 50,000 table rows: Recalculates 50,000 times per keystroke across the entire workbook, causing 4 to 8 second UI freezing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Single-Cell Reference Pattern
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=IF($Z$1 > [@[SLADeadline]], \"Breached\", \"In SLA\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Place =NOW() in exactly one anchor cell ($Z$1). The dependency engine updates only the anchor and only triggers recalculations when explicitly targeted.
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
            Visual architecture of the host OS clock cycle flowing into Excel's 64-bit IEEE 754 floating point representation.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <defs>
          <linearGradient id="nowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect x="30" y="40" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">OS Hardware Clock</text>
        <text x="140" y="98" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">System RTC (2026-11-12)</text>
        <text x="140" y="120" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">18:45:00.000 UTC+5:30</text>

        <path d="M 250 95 L 310 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="310" y="40" width="230" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="425" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Excel Serial Assembler</text>
        <text x="425" y="98" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Date Part: 46338 (Days)</text>
        <text x="425" y="120" textAnchor="middle" fill="#34D399" className="text-xs font-mono">+ Time Part: 0.78125</text>

        <path d="M 540 95 L 600 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="600" y="40" width="210" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="705" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Evaluated =NOW()</text>
        <text x="705" y="100" textAnchor="middle" fill="#6EE7B7" className="text-sm font-black font-mono">46338.78125</text>
        <text x="705" y="122" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">12-Nov-2026 6:45 PM</text>
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
                Explore real NOW formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic0"
            title="Topic 0: NOW Master Practice Grid"
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
                  Scenario 1: ITSM Incident Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Cloud NOC</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Severity-1 Incident Duration Tracker</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"The Tier-3 cloud operations team needs a live formula to calculate elapsed minutes since server outage timestamp in cell A2 and trigger an escalation alert if time exceeds 30 minutes."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate elapsed fractional days, multiply by 1440 minutes in a day, compare against SLA</div>
                <div className="text-emerald-300 font-bold">{"=IF((NOW() - A2) * 1440 > 30, \"ESCALATE TO VP ENGINEERING\", \"IN MONITORING\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"ESCALATE TO VP ENGINEERING\" (when outage is 42 mins old)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Corporate HR & Attendance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Technology Park</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated Daily Shift Check-In Timestamp Capture</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"HR requires capturing an immutable check-in timestamp when an employee clicks 'Check-In' in cell B2, without having the timestamp update on subsequent days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Requires Iterative Calculation enabled (Options > Formulas > Enable iterative calculation)</div>
                <div className="text-emerald-300 font-bold">{"=IF(B2=\"Check-In\", IF(C2=\"\", NOW(), C2), \"\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46338.37500 (Displays 09:00:00 AM permanently in C2)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Banking Treasury & Forex
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dalhousie Financial Hub, Kolkata</span>
              </div>
              <h3 className="text-base font-bold text-white">T+1 Overnight Interbank Repo Interest Accrual</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Money market desk calculates fractional day interest accrued on an overnight overnight repo loan of INR 50 Crores since booking timestamp in cell D2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Fractional day times annual rate divided by 360 commercial bank days</div>
                <div className="text-emerald-300 font-bold">{"=(NOW() - D2) * (Principal * RepoRate / 360)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"INR 93,750.00 (accrued for 0.75 fractional days)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Supply Chain & Cold Storage
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dankuni Logistics Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Temperature Excursion Warning Horizon</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Vaccine storage monitors track vaccine temperature readings updated every 15 minutes. If no ping is received from sensor within 45 minutes of cell E2, flag communication failure."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Subtract sensor timestamp from NOW() and verify minutes elapsed</div>
                <div className="text-emerald-300 font-bold">{"=IF((NOW() - E2) * 24 * 60 > 45, \"SENSOR TIMEOUT / ALARM\", \"ONLINE\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"ONLINE\" (when last ping was 12 mins ago)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Enterprise Finance & Month End
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V, Kolkata</span>
              </div>
              <h3 className="text-base font-bold text-white">Month-End Financial Books Closing Countdown</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Corporate controller publishes a live dashboard showing exact hours and fractional minutes remaining until financial book closure at 11:59:59 PM on month end."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Subtract NOW() from EOMONTH midnight deadline</div>
                <div className="text-emerald-300 font-bold">{"=(EOMONTH(TODAY(), 0) + TIME(23, 59, 59) - NOW()) * 24"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"18.42 Hours Remaining"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Digital Signature & Audit Log
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Compliance Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Cryptographic Audit Token Expiration Check</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Tax audit reports contain an OAuth token with a 3600-second TTL created at timestamp F2. Flag whether the token is still valid for automated GST portal submission."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Convert 3600 seconds to fractional days (3600 / 86400 = 0.041667)</div>
                <div className="text-emerald-300 font-bold">{"=IF(NOW() <= F2 + (3600 / 86400), \"TOKEN VALID\", \"TOKEN EXPIRED\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"TOKEN VALID\" (at 2,100 seconds elapsed)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Understand Excel's 64-Bit Serial Storage</span>
              <p>{"Excel stores dates as whole integers starting with 1 = Jan 1, 1900. Times are stored as decimals from 0.00000 to 0.99999 representing the portion of the 24-hour cycle."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"NOW() -> 46338.75 = 12-Nov-2026 at 6:00:00 PM"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Isolate the Date Portion</span>
              <p>{"To strip off the fractional time and retain purely today's date serial, apply the INT() function or use TODAY()."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=INT(NOW()) equals =TODAY()"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Isolate the Time Portion</span>
              <p>{"To extract the fractional time of day independent of the calendar date, use the MOD function with divisor 1."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=MOD(NOW(), 1) -> Returns 0.75 for 6:00 PM"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Scale Elapsed Time into Practical Units</span>
              <p>{"Subtracting two timestamps yields fractional days. Multiply by 24 for hours, 1,440 for minutes, or 86,400 for seconds."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Elapsed Hours: =(NOW() - StartTime) * 24\nElapsed Minutes: =(NOW() - StartTime) * 1440"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Continuous Workbook Freezing"}</td>
                  <td className="py-3 px-4 font-sans">{"Too many volatile NOW() formulas in large worksheets triggering global recalculation cascades on every edit."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=NOW() copied across 50,000 table rows"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Calculate =NOW() once in a single dedicated control cell ($Z$1) and reference that cell across formulas."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Subtraction"}</td>
                  <td className="py-3 px-4 font-sans">{"The baseline cell contains a text string resembling a date rather than an authentic numeric date-time serial."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=NOW() - '12-11-2026 09:00'"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert the string using DATEVALUE + TIMEVALUE or replace text with authentic date serials."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Negative Time Displayed as #######"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel's 1900 date system cannot display negative dates or times unless the 1904 date system is enabled."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=(StartTime - NOW()) formatted as [h]:mm:ss"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with ABS() or use IF(StartTime > NOW(), ...) before formatting as time."}</td>
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
              <span className="text-indigo-400 font-bold">Static Timestamp Shortcuts</span>
              <p className="text-slate-300">{"Need a timestamp that NEVER changes? Press 'Ctrl + ;' for static date, followed by Space, then 'Ctrl + Shift + ;' for static time."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">F9 Recalculation Control</span>
              <p className="text-slate-300">{"Switch Excel to Manual Calculation (Formulas > Calculation Options > Manual) when working on massive models. Press F9 only when ready to refresh."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Custom Time Number Formatting</span>
              <p className="text-slate-300">{"To display cumulative elapsed hours beyond 24, wrap the hour token in brackets: [h]:mm:ss instead of standard hh:mm:ss."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">VBA & Office Script Alternatives</span>
              <p className="text-slate-300">{"For audit trails, write a single-line Worksheet_Change event in VBA to write DateTime.Now statically into logging columns."}</p>
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
              • <strong>System Architecture:</strong> {"Why does Microsoft Excel consider NOW() volatile while mathematical functions like SUM, AVERAGE, and EXP are strictly non-volatile?"}
            </p>

            <p key="1">
              • <strong>Data Engineering Precision:</strong> {"If an automated macro records transaction logs using NOW(), what precision issues might arise when transactions occur milliseconds apart?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 0: NOW Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="NOW Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In enterprise data engineering, NOW() is like a running engine: powerful, but you must know when to turn it off. Never use NOW() in large transactional tables across tens of thousands of rows. Anchor it to a single dashboard cell, or better yet, use static timestamp shortcuts for historical tracking."}
          />
        </div>
      </div>
    </div>
  );
}
