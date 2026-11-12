"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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

  const [inputTimeString, setInputTimeString] = useState("02:30:45 PM");

  const parsedTimeResult = useMemo(() => {
    const raw = inputTimeString.trim();
    if (!raw) return { isError: true, error: "Empty input string" };

    // Regex check for 12h or 24h format
    const match12 = raw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if (!match12) {
      // Try checking if composite string
      const matchComp = raw.match(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?\b/i);
      if (!matchComp) {
        return { isError: true, error: "#VALUE! Text cannot be parsed as valid time format" };
      }
    }

    // Parse time components
    let hours = 0;
    let mins = 0;
    let secs = 0;

    const parts = raw.split(" ");
    let timePart = parts[0];
    let ampmPart = parts[1];

    if (parts.length > 2) {
      // Composite date time
      timePart = parts[1];
      ampmPart = parts[2];
    }

    const tBits = timePart.split(":");
    hours = parseInt(tBits[0], 10);
    mins = parseInt(tBits[1], 10);
    secs = tBits[2] ? parseInt(tBits[2], 10) : 0;

    if (isNaN(hours) || isNaN(mins) || isNaN(secs)) {
      return { isError: true, error: "#VALUE! Invalid numeric components" };
    }

    if (ampmPart) {
      const isPm = ampmPart.toUpperCase() === "PM";
      const isAm = ampmPart.toUpperCase() === "AM";
      if (isPm && hours < 12) hours += 12;
      if (isAm && hours === 12) hours = 0;
    }

    if (hours < 0 || hours > 23 || mins < 0 || mins > 59 || secs < 0 || secs > 59) {
      return { isError: true, error: "#VALUE! Hours (0-23), Mins (0-59), Secs (0-59) out of bounds" };
    }

    const totalSeconds = (hours * 3600) + (mins * 60) + secs;
    const decimal = totalSeconds / 86400;

    const formatted24 = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return {
      isError: false,
      decimalSerial: decimal.toFixed(6),
      formatted24,
      totalSeconds,
      fractionDescription: `${totalSeconds} / 86,400 seconds of a day`
    };
  }, [inputTimeString]);

  const applyPreset = (preset) => {
    if (preset === "afternoon_12h") {
      setInputTimeString("02:30:45 PM");
    } else if (preset === "military_24h") {
      setInputTimeString("18:45:00");
    } else if (preset === "composite") {
      setInputTimeString("2026-11-12 09:15:00 AM");
    } else if (preset === "invalid_clock") {
      setInputTimeString("25:10:00");
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
              ⚡ Date & Calendar Engineering · Topic 4
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Data Cleansing · Decimal Converter
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Coerce
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            TIMEVALUE Function — ERP Text-to-Time Conversion & Normalization
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">TIMEVALUE(time_text)</code> function is the specialized counterpart to DATEVALUE for temporal string sanitization. It reads text strings representing clock times and transforms them into standard Excel decimal fractions between <code className="text-white font-mono">0.0</code> and <code className="text-white font-mono">0.999988</code>.</p><p>In enterprise biometric systems, RFID turnstiles, and legacy punch clock software, timestamps frequently export as dead text strings such as <code className="text-white font-mono">"08:30:15 AM"</code> or <code className="text-white font-mono">"18:45"</code>. These strings cannot be summed, subtracted, or averaged directly. <code className="text-indigo-300 font-mono">TIMEVALUE()</code> converts these strings into genuine numeric day fractions while discarding any accompanying calendar date strings.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=TIMEVALUE(time_text)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Biometric Punch Clocks, Telephony CDRs & Shift Payroll</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =TIMEVALUE(RIGHT(A2, 8)) (Extract Decimal Time)</span>
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
            <span className="text-indigo-400">🧪</span> Interactive TIMEVALUE Text Converter Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert 12-hour AM/PM, 24-hour military, or composite strings into authentic decimal day fractions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("afternoon_12h")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            12-Hour "02:30:45 PM"
          </button>
          <button
            onClick={() => applyPreset("military_24h")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Military "18:45:00"
          </button>
          <button
            onClick={() => applyPreset("composite")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Composite Date + Time
          </button>
          <button
            onClick={() => applyPreset("invalid_clock")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Invalid "25:10:00"
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Time Text String (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Uncoerced String</span>
          </label>
          <input
            type="text"
            value={inputTimeString}
            onChange={(e) => setInputTimeString(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center space-y-1 text-xs">
          <span className="text-slate-400">Mathematical Relationship:</span>
          <span className="text-indigo-300 font-mono font-bold">1 Day = 1.0 = 24 Hours = 86,400 Seconds</span>
          <span className="text-[11px] text-slate-500">TIMEVALUE returns purely the decimal portion (0.0 to 0.999988).</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =TIMEVALUE("{inputTimeString}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Decimal Fraction:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                parsedTimeResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {parsedTimeResult.isError ? parsedTimeResult.error : parsedTimeResult.decimalSerial}
            </span>
          </div>
        </div>

        {!parsedTimeResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Normalized 24-Hr Time:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {parsedTimeResult.formatted24}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Elapsed Seconds:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {parsedTimeResult.totalSeconds.toLocaleString()} s
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day Fraction Ratio:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {parsedTimeResult.fractionDescription}
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
              Time String Coercion Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical TIMEVALUE Formula Signature</div>
            <div className="text-white font-bold text-base">
              =TIMEVALUE(time_text)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">time_text:</strong> Required. A text string that represents a time in any of the Microsoft Excel time formats, such as "6:45 PM" or "18:45:00". Cell references containing text dates and times are also valid.</div><div>• <strong className="text-sky-300">Date Information Stripping:</strong> Any date information included inside the time_text argument (e.g. "12-Nov-2026 6:45 PM") is completely ignored; only the fractional time component is evaluated.</div><div>• <strong className="text-amber-300">Error Trigger:</strong> Returns <code className="font-mono text-rose-400">#VALUE!</code> if the text string cannot be parsed as a valid clock time between 00:00:00 and 23:59:59.</div>
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
              <span className="text-emerald-400">📊</span> TIMEVALUE String Parsing & Output Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how TIMEVALUE handles 12-hour, 24-hour military, and composite date-time text strings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Input String</th>
                  <th className="py-3 px-4">Format Description</th>
                  <th className="py-3 px-4">Decimal Serial</th>
                  <th className="py-3 px-4">Parsed Time</th>
                  <th className="py-3 px-4">Industrial Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"06:30 AM"</td>
        <td className="py-3.5 px-4 text-white">12-Hour Morning String</td>
        <td className="py-3.5 px-4 text-emerald-300">0.270833</td>
        <td className="py-3.5 px-4 text-slate-300">06:30:00 AM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Early shift factory attendance log</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"18:45:30"</td>
        <td className="py-3.5 px-4 text-white">24-Hour Military Format</td>
        <td className="py-3.5 px-4 text-emerald-300">0.781597</td>
        <td className="py-3.5 px-4 text-slate-300">06:45:30 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Server syslog & database event logging</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"12-Nov-2026 14:00"</td>
        <td className="py-3.5 px-4 text-white">Composite Date + Time</td>
        <td className="py-3.5 px-4 text-emerald-300">0.583333</td>
        <td className="py-3.5 px-4 text-slate-300">02:00:00 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Extracts time; strips date automatically</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"23:59:59"</td>
        <td className="py-3.5 px-4 text-white">Day End Boundary</td>
        <td className="py-3.5 px-4 text-amber-300">0.999988</td>
        <td className="py-3.5 px-4 text-slate-300">11:59:59 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">End of billing cycle cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-rose-400 font-bold">"24:30:00"</td>
        <td className="py-3.5 px-4 text-white">Invalid Clock String</td>
        <td className="py-3.5 px-4 text-rose-400">#VALUE!</td>
        <td className="py-3.5 px-4 text-slate-400">Error</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Hour 24 is out of clock range (0-23)</td>
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
                Composite Date-Time Parsing: DATEVALUE vs TIMEVALUE
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How to deconstruct and reconstruct composite timestamps with surgical precision.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>When an enterprise ERP exports composite strings such as <code className="text-white font-mono">"2026-11-12 18:45:00"</code>, neither DATEVALUE nor TIMEVALUE alone provides the complete numeric timestamp.</p><p><code className="text-indigo-300 font-mono">DATEVALUE()</code> extracts <code className="text-emerald-300 font-mono">46338.0</code> (discarding the time), while <code className="text-sky-300 font-mono">TIMEVALUE()</code> extracts <code className="text-amber-300 font-mono">0.78125</code> (discarding the date). To reconstruct the full high-precision 64-bit timestamp, add both functions together: <code className="text-emerald-300 font-mono">=DATEVALUE(A2) + TIMEVALUE(A2)</code>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle Text Substring Slicing
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=VALUE(MID(A2, 12, 2))/24 + VALUE(MID(A2, 15, 2))/1440"}
                </div>
                <p className="text-xs text-slate-400">
                  Hardcoded character positions break instantly when date formats switch between single-digit and double-digit months/days.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Composite Reconstructor
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=DATEVALUE(A2) + TIMEVALUE(A2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Allows Excel's internal parser to intelligently separate the integer date and decimal time regardless of string spacing.
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
            Composite text timestamp bifurcated into integer date and fractional time before final summation.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Composite Text String</text>
        <text x="140" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">"2026-11-12 18:45:00"</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Unformatted Database Export</text>

        <path d="M 250 80 L 330 65 M 250 120 L 330 135" stroke="#38BDF8" strokeWidth="2" />

        <rect x="330" y="30" width="220" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">=DATEVALUE(A2)</text>
        <text x="440" y="75" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Integer: 46338</text>

        <rect x="330" y="110" width="220" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="135" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">=TIMEVALUE(A2)</text>
        <text x="440" y="155" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Decimal: 0.78125</text>

        <path d="M 550 65 L 630 85 M 550 135 L 630 115" stroke="#38BDF8" strokeWidth="2" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Summed Serial</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338.78125</text>
        <text x="720" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">Complete Timestamp</text>
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
                Explore real TIMEVALUE formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic4"
            title="Topic 4: TIMEVALUE Master Practice Grid"
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
                  Scenario 1: Biometric Shift Attendance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Park Turnstiles</span>
              </div>
              <h3 className="text-base font-bold text-white">RFID Badge Punch Text Normalization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Biometric turnstiles log employee entry as text string '08:45:22' in column B. Convert into decimal time and evaluate whether the punch occurred before 09:00:00 AM."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Convert text string to decimal and compare against 9:00 AM cutoff</div>
                <div className="text-emerald-300 font-bold">{"=IF(TIMEVALUE(B2) <= TIME(9, 0, 0), \"ON-TIME BONUS\", \"STANDARD PAY\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"ON-TIME BONUS\" (for punch at 08:45:22)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Telephony & BPO Contact Center
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Salt Lake Sector V Call Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Telecom CDR Call Start Time Normalization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Call Detail Records (CDRs) log call initiation times as '14:22:10' text strings. Calculate total call volume arriving during the afternoon peak window (14:00 to 16:00)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Filter calls using TIMEVALUE between 14:00 and 16:00</div>
                <div className="text-emerald-300 font-bold">{"=IF(AND(TIMEVALUE(C2) >= TIME(14,0,0), TIMEVALUE(C2) < TIME(16,0,0)), \"PEAK HOUR\", \"OFF-PEAK\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"PEAK HOUR\" (for call at 14:22:10)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Hospitality & Flight Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Netaji Subhash Chandra Bose Airport</span>
              </div>
              <h3 className="text-base font-bold text-white">Flight Departure Schedule Drift Analysis</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Airline flight schedule API exports scheduled departure as '18:30' (text in D2) and actual takeoff as '19:15' (text in E2). Calculate delay in minutes."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Subtract scheduled TIMEVALUE from actual TIMEVALUE and multiply by 1440</div>
                <div className="text-emerald-300 font-bold">{"=(TIMEVALUE(E2) - TIMEVALUE(D2)) * 1440"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"45 Minutes Delay"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Manufacturing Heavy Plant
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Rail Systems</span>
              </div>
              <h3 className="text-base font-bold text-white">Night Shift Punch Clock Midnight Bridge</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Night welding shift workers punch in at '22:15' (A2) and punch out at '06:30' (B2) on the following day. Calculate total shift hours worked without error."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine TIMEVALUE with MOD 1 to bridge midnight boundary</div>
                <div className="text-emerald-300 font-bold">{"=MOD(TIMEVALUE(B2) - TIMEVALUE(A2), 1) * 24"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"8.25 Hours Worked"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: E-Commerce Dispatch Hub
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dankuni Warehouse</span>
              </div>
              <h3 className="text-base font-bold text-white">Courier Express Pickup Cutoff Enforcement</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Parcels packed before courier cutoff string '17:00:00' in cell F2 qualify for same-day dispatch. Evaluate pack timestamp string in G2."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Compare parcel packaging TIMEVALUE against cutoff</div>
                <div className="text-emerald-300 font-bold">{"=IF(TIMEVALUE(G2) <= TIMEVALUE(F2), \"SAME-DAY AIR\", \"NEXT-DAY SURFACE\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"SAME-DAY AIR\" (for order packed at 16:20)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Cloud Security & Audit Logs
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Cyber Command</span>
              </div>
              <h3 className="text-base font-bold text-white">Firewall Intrusion Time Window Classification</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"AWS CloudTrail security alerts log intrusion attempts as text strings '03:15:20 AM'. Classify whether the event occurred during the dead-of-night high-risk window."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate whether intrusion timestamp falls between 01:00 AM and 05:00 AM</div>
                <div className="text-emerald-300 font-bold">{"=IF(AND(TIMEVALUE(H2) >= TIME(1,0,0), TIMEVALUE(H2) <= TIME(5,0,0)), \"HIGH RISK NOCTURNAL\", \"STANDARD\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"\"HIGH RISK NOCTURNAL\" (for event at 03:15:20 AM)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Inspect Text Format</span>
              <p>{"Ensure the text string uses recognizable delimiters (: or .) and optionally valid AM/PM indicators."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Target: '14:30:00' or '02:30 PM'"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Clean Non-Standard Characters</span>
              <p>{"Strip leading/trailing whitespace and non-breaking spaces with TRIM and SUBSTITUTE."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=SUBSTITUTE(TRIM(A2), CHAR(160), '')"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Execute TIMEVALUE</span>
              <p>{"Pass sanitized text into TIMEVALUE to obtain the 64-bit decimal day fraction."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=TIMEVALUE(A2) -> Yields 0.604167"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Scale into Desired Operational Metric</span>
              <p>{"Multiply by 24 for elapsed hours, or 1,440 for elapsed minutes."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Hours: =TIMEVALUE(A2) * 24\nMinutes: =TIMEVALUE(A2) * 1440"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on 24:00:00"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel's 24-hour clock only recognizes hours 0 through 23. Hour 24 is invalid syntax."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIMEVALUE('24:00:00')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Replace '24:00' with '00:00' or '23:59:59' before converting."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Missing Colon Delimiters"}</td>
                  <td className="py-3 px-4 font-sans">{"Time text formatted as raw digits like '143000' rather than standard '14:30:00'."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIMEVALUE('143000')"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Inject colons using: =TIME(LEFT(A2,2), MID(A2,3,2), RIGHT(A2,2))."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Authentic Numeric Time"}</td>
                  <td className="py-3 px-4 font-sans">{"The target cell is already an authentic numeric decimal. TIMEVALUE expects text and rejects numbers."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=TIMEVALUE(0.5) or =TIMEVALUE(NOW())"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with =IF(ISNUMBER(A2), MOD(A2,1), TIMEVALUE(A2))."}</td>
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
              <span className="text-indigo-400 font-bold">The Double Unary Shortcut for Times</span>
              <p className="text-slate-300">{"Just like dates, applying double unary (--A2) to a valid time text string automatically converts it to its decimal serial without TIMEVALUE!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Composite Reassembly Trick</span>
              <p className="text-slate-300">{"Recombine separate date and time columns into a complete timestamp: =DATEVALUE(A2) + TIMEVALUE(B2)."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Time Extraction from ISO Strings</span>
              <p className="text-slate-300">{"For strings like '2026-11-12T18:45:00', extract time instantly using: =TIMEVALUE(MID(A2, 12, 8))."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Handling 12-Hour Midnight Ambiguity</span>
              <p className="text-slate-300">{"Remember that '12:00 AM' is 0.0 (midnight), while '12:00 PM' is 0.5 (noon). Always verify AM/PM tags on biometric exports."}</p>
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
              • <strong>System Architecture:</strong> {"Why does TIMEVALUE discard any date part in composite strings like '2026-11-12 18:30', while DATEVALUE discards the time part?"}
            </p>

            <p key="1">
              • <strong>Performance Optimization:</strong> {"In a 200,000-row telephony dataset, why is =--RIGHT(A2,8) significantly faster than =TIMEVALUE(RIGHT(A2,8))?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 4: TIMEVALUE Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="TIMEVALUE Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"When dealing with punch clocks and biometric exports, TIMEVALUE is indispensable. Always remember that Excel treats time as a decimal fraction of 24 hours. If an export arrives without colons (e.g. 1430), don't force TIMEVALUE — use TIME(LEFT(A2,2), RIGHT(A2,2), 0) instead."}
          />
        </div>
      </div>
    </div>
  );
}
