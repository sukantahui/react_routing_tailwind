"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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

  const [inputText, setInputText] = useState("2026-11-12T14:30:00Z");
  const [stripSpaces, setStripSpaces] = useState(true);

  const parsedResult = useMemo(() => {
    let cleanText = inputText;
    if (stripSpaces) {
      // Clean non-breaking and standard spaces
      cleanText = cleanText.replace(/\u00a0/g, " ").trim();
    }

    // Try parsing date
    // Check if ISO format with time
    if (cleanText.includes("T")) {
      cleanText = cleanText.split("T")[0];
    } else if (cleanText.includes(" ")) {
      cleanText = cleanText.split(" ")[0];
    }

    // Replace dots with hyphens
    cleanText = cleanText.replace(/\./g, "-").replace(/\//g, "-");

    const parts = cleanText.split("-");
    let y, m, d;

    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD
        y = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
        d = parseInt(parts[2], 10);
      } else if (parts[2].length === 4) {
        // DD-MM-YYYY or MM-DD-YYYY
        d = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
        y = parseInt(parts[2], 10);
      }
    }

    if (!y || isNaN(y) || !m || isNaN(m) || !d || isNaN(d)) {
      return {
        isError: true,
        error: "#VALUE! Unable to parse text into valid date serial",
        raw: inputText
      };
    }

    const dt = new Date(y, m - 1, d);
    if (isNaN(dt.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date range", raw: inputText };
    }

    const baseUtc = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const excelEpoch = Date.UTC(1899, 11, 30);
    const serial = Math.round((baseUtc - excelEpoch) / 86400000);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${String(dt.getDate()).padStart(2, "0")}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`;

    return {
      isError: false,
      serial,
      formattedDate,
      isolatedText: cleanText,
      isNumeric: true
    };
  }, [inputText, stripSpaces]);

  const applyPreset = (preset) => {
    if (preset === "iso_timestamp") {
      setInputText("2026-11-12T18:45:00Z");
    } else if (preset === "german_dot") {
      setInputText("12.11.2026");
    } else if (preset === "dirty_space") {
      setInputText("   2026-11-12   ");
    } else if (preset === "invalid_string") {
      setInputText("CONFIRMED_ON_NOVEMBER");
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
              ⚡ Date & Calendar Engineering · Topic 2
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Data Cleansing · ETL Sanitizer
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Cleanse
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            DATEVALUE Function — Enterprise Text-to-Date Sanitization
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>The <code className="text-indigo-300 font-mono font-bold">DATEVALUE(date_text)</code> function is the frontline sanitation engine for ETL (Extract, Transform, Load) pipelines in Excel. It interrogates raw text strings representing calendar dates, strips out formatting anomalies, and converts them into authentic numeric Excel date serials.</p><p>When enterprise data is exported from external ERPs (SAP, Oracle NetSuite, Tally Prime) or scraped from web portals, dates frequently arrive as dead text strings. These pseudo-dates look valid to the human eye, but fail catastrophically inside PivotTables, timeline slicers, and mathematical formulas. <code className="text-indigo-300 font-mono">DATEVALUE()</code> bridges this gap, while simultaneously stripping away any attached timestamps.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=DATEVALUE(date_text)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> ETL Pipelines, ERP Data Migration & Web Scraping</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =DATEVALUE(LEFT(A2, 10)) (ISO String Sanitization)</span>
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
            <span className="text-indigo-400">🧪</span> Live DATEVALUE Text Sanitization Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test how raw ERP text strings, ISO timestamps, and dirty web scrapes are converted into clean numeric serials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("iso_timestamp")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            ISO Timestamp (API)
          </button>
          <button
            onClick={() => applyPreset("german_dot")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            European Dot Date
          </button>
          <button
            onClick={() => applyPreset("dirty_space")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Dirty Padded Text
          </button>
          <button
            onClick={() => applyPreset("invalid_string")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Malformed String
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Raw Text Input (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Unsanitized String</span>
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Sanitization Pre-Processor Filters
          </label>
          <label className="flex items-center gap-2 cursor-pointer mt-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={stripSpaces}
              onChange={(e) => setStripSpaces(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Strip Non-Breaking Spaces (CHAR 160) & Auto-Split Timestamp</span>
          </label>
          <span className="text-[10px] text-slate-500 mt-1">Simulates: =DATEVALUE(LEFT(TRIM(A2), 10))</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DATEVALUE("{inputText}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span
              className={`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl ${
                parsedResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }`}
            >
              {parsedResult.isError ? parsedResult.error : parsedResult.serial}
            </span>
          </div>
        </div>

        {!parsedResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Evaluated Calendar Date:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {parsedResult.formattedDate}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Numeric Verification:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                =ISNUMBER() ➔ TRUE
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Isolated Date String:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                "{parsedResult.isolatedText}"
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
              Text-to-Serial Translation Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical DATEVALUE Formula Signature</div>
            <div className="text-white font-bold text-base">
              =DATEVALUE(date_text)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">date_text:</strong> Required. A text string that represents a date in a format recognized by your operating system's Short Date regional settings, or a cell reference containing text. Must represent a date between January 1, 1900 and December 31, 9999.</div><div>• <strong className="text-sky-300">Attached Time Behavior:</strong> Any timestamp attached to the text string (e.g. "2026-11-12 18:30:00") is automatically discarded. DATEVALUE returns purely the integer date serial.</div><div>• <strong className="text-amber-300">Error Trigger:</strong> Returns <code className="font-mono text-rose-400">#VALUE!</code> if the text string cannot be coerced into a valid date under the active Windows regional settings.</div>
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
              <span className="text-emerald-400">📊</span> DATEVALUE Input Text Parsing Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe how DATEVALUE parses various text date structures across standard enterprise exports.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Input Text String</th>
                  <th className="py-3 px-4">Format Type</th>
                  <th className="py-3 px-4">DATEVALUE Serial</th>
                  <th className="py-3 px-4">Evaluated Date</th>
                  <th className="py-3 px-4">Sanitization Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026-11-12"</td>
        <td className="py-3.5 px-4 text-white">ISO 8601 Standard</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Direct parse; standard SQL export format</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"12-Nov-2026"</td>
        <td className="py-3.5 px-4 text-white">Alpha Month String</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Locale-safe; alpha month eliminates MM/DD confusion</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026.11.12"</td>
        <td className="py-3.5 px-4 text-white">German / Dot Delimited</td>
        <td className="py-3.5 px-4 text-amber-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Requires SUBSTITUTE(A2, ".", "-") before DATEVALUE</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026-11-12T18:45:00Z"</td>
        <td className="py-3.5 px-4 text-white">Full ISO UTC String</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Requires LEFT(A2, 10) to isolate date before parsing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-rose-400 font-bold">" 2026-11-12 "</td>
        <td className="py-3.5 px-4 text-white">Dirty Web Scraped Text</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Wrap with TRIM() and SUBSTITUTE(..., CHAR(160), " ")</td>
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
                The Invisible Saboteur: Non-Breaking Spaces (CHAR 160)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why standard TRIM() fails on web exports and how to clean SAP/Oracle reports bulletproof.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A ubiquitous trap in enterprise data migration occurs when data exported from web portals or SAP systems includes the HTML entity <code className="text-amber-300 font-mono">&amp;nbsp;</code> (Unicode character 160, ASCII 160).</p><p>To the human eye, <code className="text-white font-mono">"2026-11-12 "</code> looks like a normal space. However, Excel's native <code className="text-white font-mono">TRIM()</code> function <strong>only removes ASCII space 32</strong>! It completely ignores character 160, leaving behind invisible debris that causes <code className="text-rose-400 font-mono">DATEVALUE()</code> to throw a fatal <code className="text-rose-400 font-mono">#VALUE!</code> error.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  The Incomplete Sanitization Trap
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=DATEVALUE(TRIM(A2))"}
                </div>
                <p className="text-xs text-slate-400">
                  Fails on web scraped or ERP data containing non-breaking spaces (CHAR 160), returning #VALUE! errors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production Deep-Cleanse Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=DATEVALUE(TRIM(SUBSTITUTE(A2, CHAR(160), \" \")))"}
                </div>
                <p className="text-xs text-slate-400">
                  Transmutes all non-breaking spaces into standard spaces before trimming and passing to DATEVALUE.
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
            The multi-stage sanitization pipeline from dirty ERP text to clean Excel numeric serial.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="200" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="130" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Dirty Text String</text>
        <text x="130" y="105" textAnchor="middle" fill="#F43F5E" className="text-xs font-mono">" 2026-11-12T14:30 "</text>
        <text x="130" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Contains CHAR(160) + Time</text>

        <path d="M 230 100 L 290 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="290" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="410" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Sanitization Filters</text>
        <text x="410" y="102" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">1. LEFT(A2, 10)</text>
        <text x="410" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">2. SUBSTITUTE(CHAR 160)</text>

        <path d="M 530 100 L 590 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="590" y="45" width="220" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="700" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">DATEVALUE() Serial</text>
        <text x="700" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="700" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">Valid Numeric Date</text>
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
                Explore real DATEVALUE formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic2"
            title="Topic 2: DATEVALUE Master Practice Grid"
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
                  Scenario 1: ERP Data Integration
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata IT Corridor</span>
              </div>
              <h3 className="text-base font-bold text-white">SAP S/4HANA ISO Timestamp Cleanse</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Raw database exports deliver order creation timestamps in ISO format ('2026-11-12T08:30:00Z') in column A. Convert them into authentic Excel dates for weekly sales trend charts."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Isolate the first 10 characters and parse with DATEVALUE</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(LEFT(A2, 10))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46338 (Formats to 12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Web Scraping & Competitor Intelligence
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore E-Commerce Logistics</span>
              </div>
              <h3 className="text-base font-bold text-white">Sanitizing Web Scraped Dot-Separated Dates</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Scraped competitor shipping logs contain dot-delimited dates like '15.11.2026' with trailing non-breaking spaces. Convert them into computable date serials."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Substitute dots with hyphens and strip non-breaking spaces</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(SUBSTITUTE(SUBSTITUTE(TRIM(A2), CHAR(160), \"\"), \".\", \"-\"))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46341 (15-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Banking Reconciliation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Co-Operative Bank</span>
              </div>
              <h3 className="text-base font-bold text-white">Tally Prime Ledger Text Date Conversion</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Legacy Tally accounting export stores transaction dates as text in format '12-Nov-26'. Convert them into full 4-digit serial numbers for automated bank reconciliation."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Direct DATEVALUE parse handles 3-letter month abbreviations cleanly</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(A2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46338 (12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Tax Audit & Compliance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati GST Facilitation Centre</span>
              </div>
              <h3 className="text-base font-bold text-white">Govt GST Portal JSON String Parsing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"GST portal GSTR-2B JSON payloads output invoice dates as plain text numbers '12112026' (DDMMYYYY). Reconstruct into standard format before DATEVALUE."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Slice day, month, year with MID and concatenate with hyphens</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(LEFT(A2,2) & \"-\" & MID(A2,3,2) & \"-\" & RIGHT(A2,4))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46338 (12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Clinical Healthcare Systems
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Health Research Labs</span>
              </div>
              <h3 className="text-base font-bold text-white">Patient Intake Log Timestamp Discard</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Electronic Health Records (EHR) export patient triage check-ins as '12/11/2026 09:15:30 AM'. Extract purely the date component for daily census counting."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// DATEVALUE strips the timestamp automatically from valid date strings</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(A2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46338 (12-Nov-2026)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Payroll & Provident Fund
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Jute Mills Payroll</span>
              </div>
              <h3 className="text-base font-bold text-white">EPFO Member Portal Date String Sanitization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Provident Fund portal exports date of exit as '30-06-2026'. Ensure the cell is recognized as a number before running gratuity and pension formulas."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Wrap with IFERROR to guard against corrupted text entries</div>
                <div className="text-emerald-300 font-bold">{"=IFERROR(DATEVALUE(A2), \"INVALID DATE STRING\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"46199 (30-Jun-2026)"}
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
              <span className="text-indigo-400 font-bold">Step 1: Test with ISNUMBER()</span>
              <p>{"Before applying DATEVALUE, verify whether the target cell is already a number. If =ISNUMBER(A2) returns TRUE, it is already a date; applying DATEVALUE may throw #VALUE!."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=IF(ISNUMBER(A2), A2, DATEVALUE(A2))"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Clean Non-Breaking Spaces</span>
              <p>{"Replace CHAR(160) entities and trim whitespace from the string."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=SUBSTITUTE(TRIM(A2), CHAR(160), '')"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Strip Attached Timestamp Strings</span>
              <p>{"If text contains timestamps ('2026-11-12T14:30:00'), isolate the date substring before parsing."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=LEFT(A2, 10)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Execute DATEVALUE and Apply Number Format</span>
              <p>{"Feed clean text to DATEVALUE and format cell as Short Date."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATEVALUE(LEFT(SUBSTITUTE(A2, CHAR(160), ''), 10))"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Legitimate Date"}</td>
                  <td className="py-3 px-4 font-sans">{"The target cell already contains an authentic numeric serial. DATEVALUE expects text and rejects numbers."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATEVALUE(46338) or =DATEVALUE(TODAY())"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with =IF(ISNUMBER(A2), A2, DATEVALUE(A2))."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! from Regional Settings Mismatch"}</td>
                  <td className="py-3 px-4 font-sans">{"Text format '13/05/2026' opened on a US computer expecting MM/DD/YYYY throws #VALUE! because month 13 does not exist."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATEVALUE('13/05/2026') on Windows US Locale"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use DATE(RIGHT(A2,4), MID(A2,4,2), LEFT(A2,2)) instead of DATEVALUE."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! Caused by Hidden Characters"}</td>
                  <td className="py-3 px-4 font-sans">{"Carriage returns (CHAR 10) or non-breaking spaces (CHAR 160) embedded in data."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=DATEVALUE(A2) where cell has web copy-pasted text"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Apply CLEAN() and SUBSTITUTE(A2, CHAR(160), '') before DATEVALUE."}</td>
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
              <span className="text-indigo-400 font-bold">The Double-Unary Math Trick</span>
              <p className="text-slate-300">{"Did you know that adding 0 or applying double unary (--A2) to a text date achieves the exact same result as DATEVALUE? E.g., =--LEFT(A2,10)."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">PivotTable Grouping Rescue</span>
              <p className="text-slate-300">{"If your PivotTable refuses to group by Years and Months, it means one or more records are text dates. Run DATEVALUE across the column to fix."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Text to Columns Utility</span>
              <p className="text-slate-300">{"Need to convert 100,000 text dates at once without formulas? Select column > Data tab > Text to Columns > Delimited > Next > Next > Select Date (YMD) > Finish."}</p>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold">Safety with IFERROR</span>
              <p className="text-slate-300">{"Always wrap production ETL conversions in IFERROR: =IFERROR(DATEVALUE(A2), 'Flagged for Manual Review')."}</p>
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
              • <strong>System Compatibility:</strong> {"Why does the double-unary trick (=--A2) often convert text dates faster in large spreadsheets than the formal =DATEVALUE(A2) function?"}
            </p>

            <p key="1">
              • <strong>ETL Architecture:</strong> {"If an upstream database changes its date output from YYYY-MM-DD to DD/MM/YYYY, how will DATEVALUE behave on workstations configured with US vs UK regional settings?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 2: DATEVALUE Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="DATEVALUE Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In data engineering, never trust raw text dates. Every analyst must know how to inspect data with =ISNUMBER(). If FALSE, sanitize non-breaking spaces immediately. Master the combination of TRIM, SUBSTITUTE(CHAR(160)), and DATEVALUE to ensure your downstream financial models never crash."}
          />
        </div>
      </div>
    </div>
  );
}
