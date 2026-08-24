import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import fstringExpressions from "./topic5_files/fstring_expressions_and_debugging.py?raw";
import paddingAlignment from "./topic5_files/padding_alignment_and_numbers.py?raw";
import formatLegacy from "./topic5_files/format_method_and_legacy_interpolation.py?raw";
import invoiceGenerator from "./topic5_files/financial_invoice_and_report_generator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Advanced Formatting (f-strings, format() method, padding, alignment)
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("anatomy");

  // Playground state
  const [sampleVal, setSampleVal] = useState("1245000.7856");
  const [width, setWidth] = useState(24);
  const [align, setAlign] = useState("^");
  const [fillChar, setFillChar] = useState("*");
  const [precision, setPrecision] = useState(2);
  const [commaGroup, setCommaGroup] = useState(true);
  const [formatType, setFormatType] = useState("f");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Helper to compute formatted preview in JS matching Python format specifiers
  const computePlaygroundResult = () => {
    const num = parseFloat(sampleVal);
    let innerStr = "";

    if (!isNaN(num) && (formatType === "f" || formatType === "%")) {
      if (formatType === "%") {
        const pct = (num * 100).toFixed(precision);
        innerStr = `${pct}%`;
      } else {
        const rounded = num.toFixed(precision);
        if (commaGroup) {
          const parts = rounded.split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          innerStr = parts.join(".");
        } else {
          innerStr = rounded;
        }
      }
    } else if (!isNaN(num) && formatType === "d") {
      const intVal = Math.floor(num);
      innerStr = commaGroup
        ? intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : intVal.toString();
    } else {
      innerStr = sampleVal;
    }

    const currentLen = innerStr.length;
    const targetWidth = Math.max(width, currentLen);
    const totalPad = targetWidth - currentLen;
    const padChar = fillChar || " ";

    let padded = innerStr;
    if (align === "<") {
      padded = innerStr + padChar.repeat(totalPad);
    } else if (align === ">") {
      padded = padChar.repeat(totalPad) + innerStr;
    } else if (align === "^") {
      const leftPad = Math.floor(totalPad / 2);
      const rightPad = totalPad - leftPad;
      padded = padChar.repeat(leftPad) + innerStr + padChar.repeat(rightPad);
    }

    // Build the Python format specifier string
    const spec = `${fillChar !== " " ? fillChar : ""}${align}${targetWidth}${commaGroup && !isNaN(num) ? "," : ""}${
      formatType === "f" || formatType === "%" ? `.${precision}` : ""
    }${formatType}`;

    return {
      specifier: spec,
      pythonCode: `f"Result: [{value:${spec}}]"`,
      rendered: `[${padded}]`,
      charCount: padded.length,
    };
  };

  const playgroundData = computePlaygroundResult();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowAmber {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.8)); }
        }
        .animate-glow-amber {
          animation: pulseGlowAmber 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-amber-950/80 text-amber-300 px-3 py-1 rounded-full border border-amber-800/80 shadow-sm shadow-amber-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-blue-950/80 text-blue-300 px-3 py-1 rounded-full border border-blue-800/80 shadow-sm shadow-blue-950/50">
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Advanced String Formatting, f-Strings &amp; Alignments
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master formatted string literals (<code className="text-amber-400 font-mono">f"..."</code>), inline expressions, self-documenting debugging (<code className="text-cyan-400 font-mono">f"&#123;var=&#125;"</code>), the Format Specification Mini-Language, currency commas (<code className="text-emerald-400 font-mono">:,.2f</code>), alignments (<code className="text-purple-400 font-mono">&lt;</code>, <code className="text-purple-400 font-mono">&gt;</code>, <code className="text-purple-400 font-mono">^</code>), and <code className="text-pink-400 font-mono">str.format()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Bytecode-Optimized f-Strings (PEP 498 &amp; 701)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Format Mini-Language Anatomy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💰 Currency (:,.2f) &amp; Percentage (:.1%)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🐞 Self-Documenting Debugging (&#123;var=&#125;)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: FORMAT SPECIFICATION OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Modern Python String Formatting Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python has evolved through three distinct formatting paradigms: legacy <strong className="text-slate-400">% printf-style</strong>, <strong className="text-blue-400">str.format()</strong>, and modern <strong className="text-amber-400">Formatted String Literals (f-strings)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Feature 1 */}
              <div className="p-5 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg shadow-amber-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-amber-500">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
                  <span>⚡</span> f-Strings (PEP 498)
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Parsed at compile time and emitted directly as optimized bytecode. Evaluates arbitrary expressions, arithmetic, and ternary branches inline.
                </p>
                <span className="text-xs text-amber-400/80 font-mono">Status: Standard &amp; Fastest</span>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>🐞</span> Debugging Specifier
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Writing <code className="text-cyan-300 font-mono">f"&#123;total=:.2f&#125;"</code> automatically prints both the variable expression name and its formatted value.
                </p>
                <span className="text-xs text-cyan-400/80 font-mono">Introduced in: Python 3.8+</span>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>📐</span> Format Mini-Language
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Standardized grammar for controlling width, precision, thousands commas (<code className="text-purple-300 font-mono">:,</code>), alignments (<code className="text-purple-300 font-mono">&lt;</code>, <code className="text-purple-300 font-mono">&gt;</code>, <code className="text-purple-300 font-mono">^</code>), and bases.
                </p>
                <span className="text-xs text-purple-400/80 font-mono">Feature: Rich Formatting Engine</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-amber-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Format Specification Mini-Language Structure
              </h3>
              <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs sm:text-sm text-amber-300 border border-slate-800 overflow-x-auto">
                &#123;[expression] : [[fill]align] [sign] [#] [0] [width] [grouping] [.precision] [type]&#125;
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Example: <code className="text-emerald-300 font-mono">f"&#123;fee:*^20,.2f&#125;"</code> &nbsp;→&nbsp; Fill with <code className="text-slate-200 font-mono">'*'</code>, center align <code className="text-slate-200 font-mono">'^'</code>, total width <code className="text-slate-200 font-mono">20</code>, thousands comma <code className="text-slate-200 font-mono">','</code>, 2 float decimals <code className="text-slate-200 font-mono">'.2f'</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Format Mini-Language &amp; Alignments
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("anatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "anatomy"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mini-Language Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("alignments")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "alignments"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Alignment &amp; Padding
              </button>
              <button
                onClick={() => setActiveInteractiveTab("numbers")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "numbers"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Number &amp; Currency Layout
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining syntax breakdown, padding mechanics, and precision formatting:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "anatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f59e0b" fontSize="14" fontWeight="bold">FORMAT SPECIFIER BREAKDOWN: &#123;fee : * ^ + 20 , .2 f&#125;</text>

                {/* Anatomy Boxes */}
                <g transform="translate(30, 50)">
                  {/* Fill */}
                  <rect x="0" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="50" y="25" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">1. FILL</text>
                  <text x="50" y="50" fill="#38bdf8" fontSize="18" fontWeight="extrabold" textAnchor="middle">'*'</text>

                  {/* Align */}
                  <rect x="115" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="165" y="25" fill="#e9d5ff" fontSize="13" fontWeight="bold" textAnchor="middle">2. ALIGN</text>
                  <text x="165" y="50" fill="#c084fc" fontSize="18" fontWeight="extrabold" textAnchor="middle">'^'</text>

                  {/* Sign */}
                  <rect x="230" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="280" y="25" fill="#bae6fd" fontSize="13" fontWeight="bold" textAnchor="middle">3. SIGN</text>
                  <text x="280" y="50" fill="#38bdf8" fontSize="18" fontWeight="extrabold" textAnchor="middle">'+'</text>

                  {/* Width */}
                  <rect x="345" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="395" y="25" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">4. WIDTH</text>
                  <text x="395" y="50" fill="#34d399" fontSize="18" fontWeight="extrabold" textAnchor="middle">'20'</text>

                  {/* Grouping */}
                  <rect x="460" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="510" y="25" fill="#fda4af" fontSize="13" fontWeight="bold" textAnchor="middle">5. GROUP</text>
                  <text x="510" y="50" fill="#fb7185" fontSize="18" fontWeight="extrabold" textAnchor="middle">','</text>

                  {/* Precision */}
                  <rect x="575" y="0" width="115" height="70" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
                  <text x="632" y="25" fill="#fef08a" fontSize="13" fontWeight="bold" textAnchor="middle">6. PRECISION</text>
                  <text x="632" y="50" fill="#facc15" fontSize="18" fontWeight="extrabold" textAnchor="middle">'.2'</text>

                  {/* Type */}
                  <rect x="705" y="0" width="105" height="70" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="757" y="25" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">7. TYPE</text>
                  <text x="757" y="50" fill="#818cf8" fontSize="18" fontWeight="extrabold" textAnchor="middle">'f'</text>
                </g>

                {/* Rendered Output Showcase */}
                <g transform="translate(30, 145)">
                  <rect x="0" y="0" width="810" height="135" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#34d399" fontSize="13" fontWeight="bold">Evaluated Result on fee = 4500.5:</text>
                  <rect x="20" y="45" width="770" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="405" y="70" fill="#ecfdf5" fontSize="16" fontWeight="bold" textAnchor="middle">
                    "*****+4,500.50******" (Length: 20 chars)
                  </text>
                  <text x="20" y="115" fill="#94a3b8" fontSize="12">
                    Centers the value, prepends the sign, formats thousands comma, limits decimals to 2, and pads remaining 10 slots with '*'.
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "alignments" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ALIGNMENT OPERATORS: target = "PYTHON", width = 20</text>

                <g transform="translate(30, 50)">
                  {/* Left Align < */}
                  <rect x="0" y="0" width="810" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="33" fill="#c7d2fe" fontSize="14" fontWeight="bold">Left (&lt;) : f"&#123;target:&lt;20&#125;"</text>
                  <text x="450" y="33" fill="#a7f3d0" fontSize="14" fontStyle="italic">"PYTHON              "</text>

                  {/* Right Align > */}
                  <rect x="0" y="70" width="810" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="103" fill="#c7d2fe" fontSize="14" fontWeight="bold">Right (&gt;) : f"&#123;target:&gt;20&#125;"</text>
                  <text x="450" y="103" fill="#a7f3d0" fontSize="14" fontStyle="italic">"              PYTHON"</text>

                  {/* Center Align ^ */}
                  <rect x="0" y="140" width="810" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="173" fill="#c7d2fe" fontSize="14" fontWeight="bold">Center (^) : f"&#123;target:^20&#125;"</text>
                  <text x="450" y="173" fill="#a7f3d0" fontSize="14" fontStyle="italic">"       PYTHON       "</text>

                  {/* Custom Fill Center */}
                  <rect x="0" y="210" width="810" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="20" y="243" fill="#a7f3d0" fontSize="14" fontWeight="bold">Custom Fill : f"&#123;target:*^20&#125;"</text>
                  <text x="450" y="243" fill="#ecfdf5" fontSize="14" fontWeight="bold">"*******PYTHON*******"</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">NUMBER, CURRENCY &amp; BASE FORMATTING MATRIX</text>

                <g transform="translate(30, 50)">
                  {/* Currency */}
                  <rect x="0" y="0" width="390" height="75" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="25" fill="#a7f3d0" fontSize="13" fontWeight="bold">Currency INR : f"INR &#123;1250000.5:,.2f&#125;"</text>
                  <text x="20" y="52" fill="#ecfdf5" fontSize="15" fontWeight="bold">"INR 1,250,000.50"</text>

                  {/* Percentage */}
                  <rect x="420" y="0" width="390" height="75" rx="8" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="440" y="25" fill="#bae6fd" fontSize="13" fontWeight="bold">Percentage : f"&#123;0.185:.1%&#125;"</text>
                  <text x="440" y="52" fill="#e0f2fe" fontSize="15" fontWeight="bold">"18.5%" (Auto-multiplies 100)</text>

                  {/* Zero Padded */}
                  <rect x="0" y="90" width="390" height="75" rx="8" fill="#3b0764" stroke="#a855f7" />
                  <text x="20" y="115" fill="#e9d5ff" fontSize="13" fontWeight="bold">Zero-Padded Invoice : f"INV-&#123;942:06d&#125;"</text>
                  <text x="20" y="142" fill="#fae8ff" fontSize="15" fontWeight="bold">"INV-000942"</text>

                  {/* Hex / Binary */}
                  <rect x="420" y="90" width="390" height="75" rx="8" fill="#451a03" stroke="#f59e0b" />
                  <text x="440" y="115" fill="#fde68a" fontSize="13" fontWeight="bold">Hex Base Prefixed : f"&#123;255:#x&#125;"</text>
                  <text x="440" y="142" fill="#fef3c7" fontSize="15" fontWeight="bold">"0xff" (Binary: 0b11111111)</text>

                  {/* Datetime Stamp */}
                  <rect x="0" y="180" width="810" height="65" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="205" fill="#38bdf8" fontSize="13" fontWeight="bold">Datetime Specifier : f"&#123;datetime.now():%d-%b-%Y %I:%M %p&#125;"</text>
                  <text x="20" y="228" fill="#cbd5e1" fontSize="13">"24-Aug-2026 06:45 PM" (Native strftime inside f-strings)</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE FORMAT PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Format Specification Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust the sliders, alignment, fill character, and precision below to generate dynamic Python f-string expressions in real time:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Control Panel */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Sample Value (Text or Number)
                </label>
                <input
                  type="text"
                  value={sampleVal}
                  onChange={(e) => setSampleVal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Field Width: {width}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Decimals / Precision: {precision}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={precision}
                    onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Alignment Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Alignment Operator
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "<", label: "Left (<)" },
                    { id: ">", label: "Right (>)" },
                    { id: "^", label: "Center (^)" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setAlign(btn.id)}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all",
                        align === btn.id
                          ? "bg-amber-950 border-amber-500 text-amber-300 shadow"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fill Character Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Fill Character
                </label>
                <div className="flex gap-2">
                  {[
                    { val: " ", label: "Space ' '" },
                    { val: "*", label: "Star '*'" },
                    { val: "-", label: "Dash '-'" },
                    { val: "=", label: "Equal '='" },
                    { val: "0", label: "Zero '0'" },
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => setFillChar(btn.val)}
                      className={clsx(
                        "flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all",
                        fillChar === btn.val
                          ? "bg-purple-950 border-purple-500 text-purple-300 shadow"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Type & Comma Separator */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={commaGroup}
                    onChange={(e) => setCommaGroup(e.target.checked)}
                    className="accent-amber-500"
                  />
                  Thousands Comma (:,)
                </label>

                <div className="flex gap-1.5 text-xs font-mono">
                  {["f", "%", "d", "s"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormatType(t)}
                      className={clsx(
                        "px-2.5 py-1 rounded border",
                        formatType === t
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300 font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      )}
                    >
                      :{t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Generated Code & Rendered Preview */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Generated Python f-String Statement
                </span>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-amber-300 font-mono text-sm overflow-x-auto">
                  {playgroundData.pythonCode}
                </pre>

                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mt-2">
                  Specifier Anatomy: <code className="text-cyan-300 font-mono">:{playgroundData.specifier}</code>
                </span>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Rendered Terminal Output
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Length: {playgroundData.charCount} chars
                  </span>
                </div>
                <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300 font-mono text-base overflow-x-auto font-bold">
                  {playgroundData.rendered}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: COMPLETE FORMATTING CHEAT SHEET */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Format Specifier Cheat Sheet
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Format Specifier</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Sample Value</th>
                  <th className="py-3.5 px-4 font-bold">Rendered Output</th>
                  <th className="py-3.5 px-4 font-bold">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">&#123;val:.2f&#125;</td>
                  <td className="py-3 px-4">Float</td>
                  <td className="py-3 px-4 font-mono">124.5678</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'124.57'</td>
                  <td className="py-3 px-4">Fixed 2 decimal digits (rounded)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">&#123;val:,.2f&#125;</td>
                  <td className="py-3 px-4">Currency</td>
                  <td className="py-3 px-4 font-mono">1250000.5</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'1,250,000.50'</td>
                  <td className="py-3 px-4">Financial currency formatting with thousands commas</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">&#123;val:.1%&#125;</td>
                  <td className="py-3 px-4">Percentage</td>
                  <td className="py-3 px-4 font-mono">0.185</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'18.5%'</td>
                  <td className="py-3 px-4">Tax rate &amp; discount percentages</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">&#123;val:06d&#125;</td>
                  <td className="py-3 px-4">Integer Pad</td>
                  <td className="py-3 px-4 font-mono">942</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'000942'</td>
                  <td className="py-3 px-4">Fixed-length invoice serials &amp; IDs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">&#123;val:*^20&#125;</td>
                  <td className="py-3 px-4">Alignment</td>
                  <td className="py-3 px-4 font-mono">"PYTHON"</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'*******PYTHON*******'</td>
                  <td className="py-3 px-4">Centered banner headers</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">&#123;val=&#125;</td>
                  <td className="py-3 px-4">Debugging</td>
                  <td className="py-3 px-4 font-mono">x = 10</td>
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">'x=10'</td>
                  <td className="py-3 px-4">Self-documenting debug logging</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">&#123;val:#x&#125;</td>
                  <td className="py-3 px-4">Hex Base</td>
                  <td className="py-3 px-4 font-mono">255</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'0xff'</td>
                  <td className="py-3 px-4">Prefixed hexadecimal notation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">&#123;dt:%d-%b-%Y&#125;</td>
                  <td className="py-3 px-4">Datetime</td>
                  <td className="py-3 px-4 font-mono">datetime.now()</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'24-Aug-2026'</td>
                  <td className="py-3 px-4">Standardized date representation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating f-strings, self-documenting debugging, alignment engines, str.format() dictionary unpacking, and financial fee receipt generators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "fstring_expressions_and_debugging.py",
                code: fstringExpressions,
                description: "Inline expressions, ternary logic, f'{var=}' debugging, brace escaping, and datetime formatters.",
              },
              {
                filename: "padding_alignment_and_numbers.py",
                code: paddingAlignment,
                description: "Alignments (<, >, ^, =), custom fill characters, float precision, thousands commas, and base conversions.",
              },
              {
                filename: "format_method_and_legacy_interpolation.py",
                code: formatLegacy,
                description: "str.format() positional & named mapping, **dict unpacking, legacy %, and speed benchmarks.",
              },
              {
                filename: "financial_invoice_and_report_generator.py",
                code: invoiceGenerator,
                description: "Production financial invoice & student fee billing receipt generator with exact column alignments.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Forgetting to Escape JSON / CSS Braces
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">f"JSON: &#123;'id': 101&#125;"</code> raises a <code className="text-rose-300 font-mono">SyntaxError</code> because Python tries to evaluate <code className="text-rose-300 font-mono">'id': 101</code> as a dictionary expression.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Double the braces: <code className="text-emerald-300">f"JSON: &#123;&#123;'id': &#123;uid&#125;&#125;&#125;"</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Quote Clashes in Python &le; 3.11
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">f"Hello &#123;data["name"]&#125;"</code> crashed in Python 3.11 with <code className="text-amber-300 font-mono">SyntaxError</code> due to matching outer double quotes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Tip:</span> Alternate quotes <code className="text-emerald-300">f'&#123;data["name"]&#125;'</code> or upgrade to Python 3.12+ (PEP 701)!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Float Rounding Imprecision
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">f"&#123;2.675:.2f&#125;"</code> might render as <code className="text-purple-300 font-mono">"2.67"</code> instead of <code className="text-purple-300 font-mono">"2.68"</code> due to standard IEEE 754 binary floating-point representation.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">decimal.Decimal</code> for financial accounting calculations!
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Dynamic Templates with f-Strings
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                f-strings cannot format strings loaded from a database or JSON file at runtime because they are evaluated only at compile time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">template_str.format(**params)</code> for runtime dynamic templates!
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering f-string mechanics, debugging specifiers, alignment operators, and performance benchmarks:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with format mini-language rules, alignment tables, and invoice generators:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_advanced_formatting_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
