"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
  const sectionsRef = useRef([]);

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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "regex_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
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
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Cleansing & Privacy Masking · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Transform
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Cleaning, Masking, and Reformatting Text with REGEXREPLACE
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Corporate data pipelines frequently require sanitizing unstructured text: masking confidential 
            statutory identifiers (such as 12-digit Indian Aadhaar and 16-digit credit card numbers) for GDPR/data privacy compliance, 
            stripping noisy web tags (<code className="text-amber-300 font-mono">{"<p>, <b>"}</code>), and reformatting 
            date strings into SQL standard format. The <code className="text-purple-300 font-mono font-bold">REGEXREPLACE</code> function 
            performs all these transformations in a single pass using powerful <strong>Capturing Group Backreferences</strong> 
            (<code className="text-emerald-300 font-mono font-bold">$1, $2, $3</code>)!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Privacy Masking:</strong> Aadhaar, PAN & Card protection</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Backreferences ($1, $2):</strong> Restructure strings dynamically</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Noise Stripping:</strong> Removes HTML, illegal symbols & spaces</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> Formula Anatomy: =REGEXREPLACE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =REGEXREPLACE(text, pattern, replacement, [occurrence], [case])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Pattern Replacement & Backreference Syntax</span>
            <div className="mt-1 text-white font-bold">
              =REGEXREPLACE(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-emerald-300">replacement</span>, <span className="text-yellow-300">[occurrence]</span>, <span className="text-slate-400">[case_sensitivity]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Mask Aadhaar Number Keeping Last 4 Digits</span> <br />
              <span className="text-emerald-400 font-bold">
                =REGEXREPLACE(C5, "^\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})$", "XXXX-XXXX-$1")
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Options / Defaults</th>
                  <th className="py-3 px-4">Execution Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">text</td>
                  <td className="py-3 px-4 text-slate-300">Source Input</td>
                  <td className="py-3 px-4 text-emerald-400">Cell / Range</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The string or column range to cleanse or transform.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">pattern</td>
                  <td className="py-3 px-4 text-slate-300">Target Match</td>
                  <td className="py-3 px-4 text-emerald-400">PCRE Regex</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The pattern describing the text tokens to replace or reorder.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">replacement</td>
                  <td className="py-3 px-4 text-slate-300">New String</td>
                  <td className="py-3 px-4 text-emerald-400">Text / $1..$N</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The substitution string. Use <code className="text-emerald-400 font-mono">$1, $2</code> to insert matched capturing groups.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[occurrence]</td>
                  <td className="py-3 px-4 text-slate-300">Target Instance</td>
                  <td className="py-3 px-4 text-slate-400">0 (Default)</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">0</code> = Replace all matches; <code className="text-sky-300 font-mono">1..N</code> = Replace only specific match instance.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Backreferences & Single-Pass Transformation Speed
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              High-Speed RAM Substitution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Capturing Group Backreferences ($1, $2)
              </h3>
              <p className="leading-relaxed">
                Backreferences allow you to rearrange components of a string without losing data. 
                Given <code className="text-sky-300 font-mono">26/08/2026</code>, the pattern <code className="text-amber-300 font-mono">^(\d{"{2}"})/(\d{"{2}"})/(\d{"{4}"})$</code> 
                captures Day ($1), Month ($2), and Year ($3). Replacing with <code className="text-emerald-300 font-mono">"$3-$2-$1"</code> converts it to SQL standard <code className="text-emerald-300 font-mono">2026-08-26</code> in 1 step!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Pattern: ^(\d{"{2}"})/(\d{"{2}"})/(\d{"{4}"})$ → Replacement: "$3-$2-$1"
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Single-Pass SIMD vs Chained SUBSTITUTE
              </h3>
              <p className="leading-relaxed">
                Chaining 8 nested <code className="text-rose-400 font-mono">SUBSTITUTE</code> functions to strip unwanted symbols creates 8 temporary strings in memory, causing severe workbook lag. 
                <code className="text-purple-300 font-mono">=REGEXREPLACE(A2, "[^a-zA-Z0-9\s]", "")</code> executes in <strong>1 single pass in compiled C++ RAM</strong>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                10x Speedup with Zero Formula Sprawl
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Instant HTML & XML Tag Stripping
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Convert raw web-scraped reviews containing tags like <code className="text-rose-400 font-mono"><p>Great <b>Service</b></p></code> into clean plain text:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                {"=TRIM(REGEXREPLACE(D5, \"<[^>]+>\", \"\"))"}
              </code>
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">📐</span> Visual REGEXREPLACE Privacy Masking & Reformatting Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Sanitization Engine
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how REGEXREPLACE transforms confidential PII numbers and messy HTML into pristine, audit-ready data:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Data (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW UNPROTECTED DATA</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="42" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="16" fill="#FECACA" fontSize="8" fontFamily="sans-serif">Confidential Aadhaar (PII):</text>
                <text x="10" y="32" fill="#FDE047" fontSize="8.5" fontFamily="monospace">"5482-9921-3344"</text>

                <rect y="50" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Messy HTML Feedback:</text>
                <text x="10" y="82" fill="#38BDF8" fontSize="8.5" fontFamily="monospace">"<p>Great <b>Product</b></p>"</text>

                <rect y="100" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Unstandardized Date:</text>
                <text x="10" y="132" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">"26/08/2026"</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Compliance Exposure</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Unmasked Sensitive Numbers</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Transformation Engine (Center) */}
              <rect x="325" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">REGEXREPLACE ENGINE</text>

              <g transform="translate(340, 75)">
                <rect width="220" height="42" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="16" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="monospace">^\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})$</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Replacement: "XXXX-XXXX-$1"</text>

                <rect y="50" width="220" height="42" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="66" fill="#BAE6FD" fontSize="8.5" fontWeight="bold" fontFamily="monospace">&lt;[^&gt;]+&gt;</text>
                <text x="10" y="82" fill="#FDE047" fontSize="8" fontFamily="sans-serif">Replacement: "" (Delete Tag)</text>

                <rect y="100" width="220" height="42" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="116" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" fontFamily="monospace">^(\d{"{2}"})/(\d{"{2}"})/(\d{"{4}"})$</text>
                <text x="10" y="132" fill="#E2E8F0" fontSize="8" fontFamily="sans-serif">Replacement: "$3-$2-$1"</text>
              </g>

              <text x="450" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Single-Pass SIMD Reordering</text>

              {/* Arrow */}
              <path d="M 590 165 L 620 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,165 615,160 615,170" fill="#10B981" />

              {/* Output Results (Right) */}
              <rect x="630" y="30" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="30" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SANITIZED OUTPUT</text>

              <g transform="translate(640, 75)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Masked Aadhaar Result:</text>
                <text x="10" y="32" fill="#34D399" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"XXXX-XXXX-3344"</text>

                <rect y="50" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Clean Text Result:</text>
                <text x="10" y="82" fill="#FDE047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"Great Product"</text>

                <rect y="100" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Standard SQL Date:</text>
                <text x="10" y="132" fill="#38BDF8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"2026-08-26"</text>
              </g>

              <rect x="640" y="240" width="175" height="45" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="260" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Privacy-Compliant</text>
              <text x="727" y="275" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Clean Structured Data</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the privacy masking & text sanitization dataset below or download the practice workbook to test <code className="text-purple-300 font-mono">REGEXREPLACE</code> in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX1906"
            title="Text Cleansing, Masking & Reformatting Dataset (Record ID, Raw Text, Masked Output, Goal Description)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Statutory Data Privacy</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Aadhaar & Card Number Masking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Officer <strong>Swadeep Banerjee</strong> masks 25,000 sensitive records: 
                <code className="text-emerald-300 font-mono">=REGEXREPLACE(C5, "^\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})$", "XXXX-XXXX-$1")</code>. 
                Ensures only the last 4 digits are visible on customer service screens.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REGEXREPLACE(Aadhaar, ..., "XXXX-XXXX-$1")
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Web Portal Data Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated HTML Tag Stripping
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Tuhina Mukherjee</strong> sanitizes customer web portal comments: 
                <code className="text-amber-300 font-mono">{"=TRIM(REGEXREPLACE(B5, \"<[^>]+>\", \"\"))"}</code>, 
                converting rich text into clean plain text for AI sentiment analysis.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Strips: &lt;p&gt;, &lt;b&gt;, &lt;span&gt; tags instantly in pure RAM
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · SQL Database Migration</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Date Transposition with Backreferences
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Database Administrator <strong>Abhronila Sengupta</strong> converts Indian date formats: 
                <code className="text-indigo-300 font-mono">=REGEXREPLACE(B5, "^(\d{"{2}"})/(\d{"{2}"})/(\d{"{4}"})$", "$3-$2-$1")</code>, 
                producing ISO 8601 strings (<code className="text-emerald-300 font-mono">YYYY-MM-DD</code>) for automated SQL bulk inserts.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Transforms: "26/08/2026" → "2026-08-26"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Telecom CRM Formatting</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Telephone Standard Masking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> formats raw mobile numbers: 
                <code className="text-amber-300 font-mono">=REGEXREPLACE(Phone, "^(\d{"{3}"})(\d{"{3}"})(\d{"{4}"})$", "($1) $2-$3")</code>, 
                converting <code className="text-slate-300 font-mono">9830111223</code> into <code className="text-emerald-300 font-mono">(983) 011-1223</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Single-Formula Standardized Phone Number Formatting
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🪜</span> Step-by-Step REGEXREPLACE Implementation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Target String & Replacement Goal</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Target: 12-digit Aadhaar number in cell <code className="text-amber-300 font-mono">B5</code>: <code className="text-amber-300 font-mono">5482-9921-3344</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Regex Pattern with Capturing Group</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"^\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})$"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Define Replacement String with $1 Backreference</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Replacement: <code className="text-purple-300 font-mono">"XXXX-XXXX-$1"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Sanitized Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C5</code>, write: <code className="text-purple-300 font-mono">=REGEXREPLACE(B5, "^\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})$", "XXXX-XXXX-$1")</code>. Evaluates to <code className="text-emerald-300 font-mono font-bold">XXXX-XXXX-3344</code>!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Literal $1 Output</td>
                  <td className="py-3 px-4 text-slate-300">Forgot parentheses in pattern; wrote <code className="text-rose-300 font-mono">^\d{"{4}"}</code> instead of <code className="text-emerald-300 font-mono">^(\d{"{4}"})</code>, so `$1` prints literally.</td>
                  <td className="py-3 px-4 text-slate-400">Output contains literal "$1".</td>
                  <td className="py-3 px-4 text-emerald-400">Enclose target tokens in parentheses <code className="text-emerald-400 font-mono">(...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Greedy Tag Over-Deletion</td>
                  <td className="py-3 px-4 text-slate-300">Used <code className="text-rose-300 font-mono">{"<.*>"}</code> which deleted all text between the first and last HTML tag.</td>
                  <td className="py-3 px-4 text-slate-400">Entire sentence disappears.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">{"<[^>]+>"}</code> or lazy <code className="text-emerald-400 font-mono">{"<.*?>"}</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Invalid regex syntax (e.g. unclosed bracket or quantifier syntax error).</td>
                  <td className="py-3 px-4 text-slate-400">Check pattern syntax for typos.</td>
                  <td className="py-3 px-4 text-emerald-400">Validate pattern string syntax.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Sanitization Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">TRIM + \s+</span>
                <span>Whitespace Cleansing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Collapse tabs & newlines: <code className="text-emerald-300 font-mono">=TRIM(REGEXREPLACE(A2, "\s+", " "))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Negated Class</span>
                <span>Strip Symbols</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remove all punctuation: <code className="text-sky-300 font-mono">=REGEXREPLACE(A2, "[^a-zA-Z0-9\s]", "")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Leading Zeros</span>
                <span>Clean SKUs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strip leading zeros: <code className="text-purple-300 font-mono">=REGEXREPLACE(A2, "^0+", "")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Preview Replacement</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight your REGEXREPLACE formula and press <strong>F9</strong> to inspect the cleansed string in RAM.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on data privacy compliance:</strong> Why is masking statutory numbers (like Aadhaar and Credit Cards) at the formula level using <code className="text-purple-300 font-mono">REGEXREPLACE</code> essential for enterprise data security?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine backreference power:</strong> How do backreferences (<code className="text-emerald-300 font-mono">$1, $2, $3</code>) allow you to transpose date components from <code className="text-sky-300 font-mono">DD/MM/YYYY</code> to <code className="text-emerald-300 font-mono">YYYY-MM-DD</code> without complex string splitting?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider ETL efficiency:</strong> Why does a single <code className="text-purple-300 font-mono">REGEXREPLACE(A2, "[^a-zA-Z0-9\s]", "")</code> formula execute 10x faster than chaining 8 nested <code className="text-rose-400 font-mono">SUBSTITUTE</code> functions?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Text Cleansing, Masking & Reformatting with REGEXREPLACE — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never expose unmasked statutory personal identifiers (like Aadhaar, PAN, or Credit Card numbers) in corporate spreadsheets! REGEXREPLACE with Capturing Group Backreferences ($1, $2) gives you the power to sanitize data at scale, reorder date components, and strip noisy HTML/whitespace in sub-millisecond memory speed!"
            }
          />
        </div>
      </div>
    </div>
  );
}
