import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import caseSanitization from "./topic3_files/case_and_sanitization_methods.py?raw";
import splitPartition from "./topic3_files/split_and_partition_methods.py?raw";
import joinReplace from "./topic3_files/join_and_replace_methods.py?raw";
import customerCleaner from "./topic3_files/customer_data_cleaner.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Essential String Methods (upper, lower, title, strip, split, join, replace)
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("case");
  const [sandboxInput, setSandboxInput] = useState("  sUSMITA  mUKHERJEE - bARRACKPORE  \n");
  const [activeMethod, setActiveMethod] = useState("title");

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

  // Helper to compute sandbox output based on activeMethod
  const computeSandboxResult = () => {
    try {
      switch (activeMethod) {
        case "upper":
          return { type: "str", result: sandboxInput.toUpperCase(), desc: "All characters converted to uppercase." };
        case "lower":
          return { type: "str", result: sandboxInput.toLowerCase(), desc: "All characters converted to lowercase." };
        case "title":
          return {
            type: "str",
            result: sandboxInput
              .split(" ")
              .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
              .join(" "),
            desc: "First letter of each word capitalized.",
          };
        case "capitalize":
          return {
            type: "str",
            result: sandboxInput.charAt(0).toUpperCase() + sandboxInput.slice(1).toLowerCase(),
            desc: "First letter of entire string capitalized, rest lowercase.",
          };
        case "strip":
          return { type: "str", result: sandboxInput.trim(), desc: "Leading & trailing whitespace trimmed." };
        case "lstrip":
          return { type: "str", result: sandboxInput.replace(/^\s+/, ""), desc: "Leading whitespace removed." };
        case "rstrip":
          return { type: "str", result: sandboxInput.replace(/\s+$/, ""), desc: "Trailing whitespace removed." };
        case "split_default":
          const tokens = sandboxInput.trim().split(/\s+/).filter(Boolean);
          return {
            type: "list",
            result: JSON.stringify(tokens, null, 2),
            itemCount: tokens.length,
            desc: "Whitespace collapsed into clean token list.",
          };
        case "split_comma":
          const commaTokens = sandboxInput.split(",");
          return {
            type: "list",
            result: JSON.stringify(commaTokens, null, 2),
            itemCount: commaTokens.length,
            desc: "Split on commas without collapsing empty items.",
          };
        case "partition_dash":
          const idx = sandboxInput.indexOf("-");
          const partRes =
            idx !== -1
              ? [sandboxInput.slice(0, idx), "-", sandboxInput.slice(idx + 1)]
              : [sandboxInput, "", ""];
          return {
            type: "tuple (3 elements)",
            result: `("${partRes[0].trim()}", "${partRes[1]}", "${partRes[2].trim()}")`,
            desc: "Guaranteed 3-tuple: (head, sep, tail) at first '-' occurrence.",
          };
        case "replace_dash":
          return {
            type: "str",
            result: sandboxInput.replaceAll("-", "|"),
            desc: "Substituted '-' with '|'.",
          };
        default:
          return { type: "str", result: sandboxInput, desc: "Original string." };
      }
    } catch {
      return { type: "error", result: "Transformation error", desc: "Invalid input" };
    }
  };

  const sandboxOutput = computeSandboxResult();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowEmerald {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.8)); }
        }
        .animate-glow-emerald {
          animation: pulseGlowEmerald 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Essential String Methods &amp; Transformation Pipelines
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master case conversion (<code className="text-emerald-400 font-mono">upper</code>, <code className="text-emerald-400 font-mono">lower</code>, <code className="text-emerald-400 font-mono">title</code>, <code className="text-emerald-400 font-mono">casefold</code>), whitespace sanitization (<code className="text-cyan-400 font-mono">strip</code>), delimiter tokenization (<code className="text-purple-400 font-mono">split</code>, <code className="text-purple-400 font-mono">partition</code>), sequence stitching (<code className="text-pink-400 font-mono">join</code>), and substitution (<code className="text-amber-400 font-mono">replace</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔤 Case Normalization &amp; Unicode Casefold
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧹 Strip &amp; Character-Set Trimming
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧩 split() vs partition() Tokenizers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(N) delimiter.join() &amp; replace()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CORE METHOD FAMILIES OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧰</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Five Core String Method Families
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Because strings in Python are strictly immutable, every string method operates as a <strong className="text-emerald-400">pure function</strong>: it accepts the current string, performs its transformation or tokenization, and returns a <strong className="text-white">brand-new string, list, or tuple</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Family 1 */}
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>🔤</span> Case Conversion
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-emerald-300 font-mono">upper()</code>, <code className="text-emerald-300 font-mono">lower()</code>, <code className="text-emerald-300 font-mono">title()</code>, <code className="text-emerald-300 font-mono">capitalize()</code>, <code className="text-emerald-300 font-mono">swapcase()</code>, <code className="text-emerald-300 font-mono">casefold()</code>.
                </p>
                <span className="text-xs text-emerald-400/80 font-mono">Returns: new str</span>
              </div>

              {/* Family 2 */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>🧹</span> Trimming &amp; Sanitizing
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-cyan-300 font-mono">strip()</code>, <code className="text-cyan-300 font-mono">lstrip()</code>, <code className="text-cyan-300 font-mono">rstrip()</code>. Removes whitespace or custom character sets from edges.
                </p>
                <span className="text-xs text-cyan-400/80 font-mono">Returns: new str</span>
              </div>

              {/* Family 3 */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>✂️</span> Tokenizing &amp; Splitting
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-purple-300 font-mono">split()</code>, <code className="text-purple-300 font-mono">rsplit()</code>, <code className="text-purple-300 font-mono">splitlines()</code>, <code className="text-purple-300 font-mono">partition()</code>, <code className="text-purple-300 font-mono">rpartition()</code>.
                </p>
                <span className="text-xs text-purple-400/80 font-mono">Returns: list or 3-tuple</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Why Method Chaining is Idiomatic &amp; Powerful in Python
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-2">
                Because each string transformation method returns a new <code className="text-emerald-300 font-mono">str</code> instance, you can chain multiple operations into a readable, high-performance data processing pipeline:
              </p>
              <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs sm:text-sm text-emerald-300 border border-slate-800">
                clean_name = raw_user_input.strip().title().replace("-", " ")
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUALIZER (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Method Architecture &amp; Execution
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("case")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "case"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Case Transformations
              </button>
              <button
                onClick={() => setActiveInteractiveTab("strip")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "strip"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Strip &amp; Edge Trimming
              </button>
              <button
                onClick={() => setActiveInteractiveTab("tokenizer")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tokenizer"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                split() vs partition()
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Exploring internal behavior and transformation steps across core string methods:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "case" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">CASE CONVERSION ENGINE (ORIGINAL: "coder &amp; accoTax bARRACkpORE")</text>

                {/* Method Cards */}
                <g transform="translate(30, 50)">
                  {/* upper() */}
                  <rect x="0" y="0" width="390" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#a7f3d0" fontSize="13" fontWeight="bold">s.upper()</text>
                  <text x="15" y="47" fill="#f8fafc" fontSize="12" fontStyle="italic">"CODER &amp; ACCOTAX BARRACKPORE"</text>

                  {/* lower() */}
                  <rect x="420" y="0" width="390" height="60" rx="8" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="435" y="25" fill="#7dd3fc" fontSize="13" fontWeight="bold">s.lower()</text>
                  <text x="435" y="47" fill="#f8fafc" fontSize="12" fontStyle="italic">"coder &amp; accotax barrackpore"</text>

                  {/* title() */}
                  <rect x="0" y="75" width="390" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="15" y="100" fill="#c7d2fe" fontSize="13" fontWeight="bold">s.title()</text>
                  <text x="15" y="122" fill="#f8fafc" fontSize="12" fontStyle="italic">"Coder &amp; Accotax Barrackpore"</text>

                  {/* capitalize() */}
                  <rect x="420" y="75" width="390" height="60" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="435" y="100" fill="#e9d5ff" fontSize="13" fontWeight="bold">s.capitalize()</text>
                  <text x="435" y="122" fill="#f8fafc" fontSize="12" fontStyle="italic">"Coder &amp; accotax barrackpore" (1st char only)</text>
                </g>

                {/* Unicode Casefold Alert */}
                <rect x="30" y="210" width="810" height="100" rx="8" fill="#090d16" stroke="#334155" />
                <text x="50" y="240" fill="#f59e0b" fontSize="13" fontWeight="bold">Unicode Caseless Matching: lower() vs casefold()</text>
                <text x="50" y="265" fill="#cbd5e1" fontSize="12">
                  • German 'Straße'.lower() == 'STRASSE'.lower() → <tspan fill="#fca5a5" fontWeight="bold">False</tspan> ('straße' != 'strasse')
                </text>
                <text x="50" y="290" fill="#cbd5e1" fontSize="12">
                  • German 'Straße'.casefold() == 'STRASSE'.casefold() → <tspan fill="#34d399" fontWeight="bold">True</tspan> (Aggressive Unicode normalization)
                </text>
              </svg>
            ) : activeInteractiveTab === "strip" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">BOUNDARY STRIPPING &amp; WHITESPACE SANITIZATION</text>

                {/* Raw String with Whitespace visualizer */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <rect x="10" y="12" width="130" height="45" rx="6" fill="#881337" stroke="#f43f5e" strokeDasharray="3,3" />
                  <text x="75" y="38" fill="#fda4af" fontSize="12" textAnchor="middle">\t \n (Leading)</text>

                  <rect x="150" y="12" width="480" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="390" y="40" fill="#a7f3d0" fontSize="15" fontWeight="bold" textAnchor="middle">"Susmita Mukherjee - Barrackpore"</text>

                  <rect x="640" y="12" width="160" height="45" rx="6" fill="#881337" stroke="#f43f5e" strokeDasharray="3,3" />
                  <text x="720" y="38" fill="#fda4af" fontSize="12" textAnchor="middle">\r \n (Trailing)</text>
                </g>

                {/* Strip Variants Flow */}
                <g transform="translate(30, 140)">
                  <rect x="0" y="0" width="255" height="75" rx="8" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="15" y="25" fill="#7dd3fc" fontSize="13" fontWeight="bold">lstrip() [Left Only]</text>
                  <text x="15" y="48" fill="#f8fafc" fontSize="11">Removes leading whitespace.</text>
                  <text x="15" y="65" fill="#94a3b8" fontSize="11">Trailing \r\n remains.</text>

                  <rect x="277" y="0" width="255" height="75" rx="8" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="292" y="25" fill="#7dd3fc" fontSize="13" fontWeight="bold">rstrip() [Right Only]</text>
                  <text x="292" y="48" fill="#f8fafc" fontSize="11">Removes trailing whitespace.</text>
                  <text x="292" y="65" fill="#94a3b8" fontSize="11">Leading \t\n remains.</text>

                  <rect x="555" y="0" width="255" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="570" y="25" fill="#a7f3d0" fontSize="13" fontWeight="bold">strip() [Both Ends]</text>
                  <text x="570" y="48" fill="#f8fafc" fontSize="11">Removes both edges cleanly.</text>
                  <text x="570" y="65" fill="#34d399" fontSize="11" fontWeight="bold">Output: Clean String!</text>
                </g>

                {/* Character set reminder */}
                <rect x="30" y="235" width="810" height="75" rx="8" fill="#090d16" stroke="#334155" />
                <text x="50" y="260" fill="#f43f5e" fontSize="12" fontWeight="bold">⚠️ Crucial Rule: strip(chars) takes a SET of individual characters, not a prefix!</text>
                <text x="50" y="285" fill="#cbd5e1" fontSize="12">
                  "www.example.com".strip("w.com") → "example" (Removes ANY 'w', '.', 'c', 'o', 'm' from either end).
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">TOKENIZER COMPARISON: split() (LIST) VS partition() (GUARANTEED 3-TUPLE)</text>

                {/* Left: split() */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#a5b4fc" fontSize="14" fontWeight="bold">1. s.split() / s.split(sep, maxsplit)</text>
                  <text x="20" y="55" fill="#cbd5e1" fontSize="12">• Returns a <tspan fill="#38bdf8" fontWeight="bold">list of strings</tspan> (variable length).</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="12">• s.split() collapses multiple spaces automatically.</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="12">• maxsplit limits number of tokens from left.</text>

                  <rect x="20" y="125" width="350" height="105" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="35" y="150" fill="#94a3b8" fontSize="11">Target: "2026-08-24 ERROR Timeout"</text>
                  <text x="35" y="175" fill="#38bdf8" fontSize="12" fontStyle="italic">s.split(" ", maxsplit=2)</text>
                  <text x="35" y="200" fill="#a7f3d0" fontSize="12" fontWeight="bold">['2026-08-24', 'ERROR', 'Timeout']</text>
                </g>

                {/* Right: partition() */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#e9d5ff" fontSize="14" fontWeight="bold">2. s.partition(sep) (Guaranteed 3-Tuple)</text>
                  <text x="20" y="55" fill="#cbd5e1" fontSize="12">• Returns exactly <tspan fill="#d8b4fe" fontWeight="bold">(head, sep, tail)</tspan>.</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="12">• Splits at the FIRST occurrence of separator.</text>
                  <text x="20" y="105" fill="#cbd5e1" fontSize="12">• If sep not found: returns (s, "", "") (Zero error!).</text>

                  <rect x="20" y="125" width="350" height="105" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="35" y="150" fill="#94a3b8" fontSize="11">Target: "DATABASE_URL = postgresql://..."</text>
                  <text x="35" y="175" fill="#d8b4fe" fontSize="12" fontStyle="italic">key, sep, val = s.partition("=")</text>
                  <text x="35" y="200" fill="#a7f3d0" fontSize="12" fontWeight="bold">key="DATABASE_URL", val="postgresql://..."</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE METHOD SANDBOX & PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive String Method Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Type custom text in the input box below or click any method to see live Python transformations:
          </p>

          <div className="space-y-6">
            {/* Input Box */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Raw Input String (Editable)
              </label>
              <textarea
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Enter any raw string to test methods..."
              />
            </div>

            {/* Method Action Selector Buttons */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Select String Method Transformation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {[
                  { id: "upper", label: ".upper()" },
                  { id: "lower", label: ".lower()" },
                  { id: "title", label: ".title()" },
                  { id: "capitalize", label: ".capitalize()" },
                  { id: "strip", label: ".strip()" },
                  { id: "lstrip", label: ".lstrip()" },
                  { id: "rstrip", label: ".rstrip()" },
                  { id: "split_default", label: ".split()" },
                  { id: "split_comma", label: ".split(',')" },
                  { id: "partition_dash", label: ".partition('-')" },
                  { id: "replace_dash", label: ".replace('-', '|')" },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveMethod(btn.id)}
                    className={clsx(
                      "py-2 px-3 rounded-lg font-mono text-xs font-semibold border transition-all text-center",
                      activeMethod === btn.id
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transformed Result Preview Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Return Type:</span>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-800 font-bold">
                    &lt;class '{sandboxOutput.type}'&gt;
                  </span>
                  {sandboxOutput.itemCount !== undefined && (
                    <span className="text-xs font-mono text-slate-400">({sandboxOutput.itemCount} items)</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 italic">{sandboxOutput.desc}</div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Transformed Output
                </span>
                <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-emerald-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                  {sandboxOutput.result}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: COMPLETE STRING METHODS REFERENCE TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master String Methods Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Method Signature</th>
                  <th className="py-3.5 px-4 font-bold">Return Type</th>
                  <th className="py-3.5 px-4 font-bold">Primary Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Example Input</th>
                  <th className="py-3.5 px-4 font-bold">Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.upper()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">All characters to uppercase</td>
                  <td className="py-3 px-4 font-mono">"kolkata"</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'KOLKATA'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.lower()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">All characters to lowercase</td>
                  <td className="py-3 px-4 font-mono">"PYTHON"</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'python'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.title()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">Capitalizes first letter of every word</td>
                  <td className="py-3 px-4 font-mono">"sukanta hui"</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'Sukanta Hui'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.strip(chars)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">Trims leading and trailing characters/whitespace</td>
                  <td className="py-3 px-4 font-mono">"  hi \n"</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">'hi'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s.split(sep, maxsplit)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">list[str]</td>
                  <td className="py-3 px-4">Tokenizes string on delimiter (collapses whitespace if sep=None)</td>
                  <td className="py-3 px-4 font-mono">"A B C"</td>
                  <td className="py-3 px-4 font-mono text-cyan-400 font-bold">['A', 'B', 'C']</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">s.partition(sep)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">tuple (3)</td>
                  <td className="py-3 px-4">Splits at first separator into (head, sep, tail)</td>
                  <td className="py-3 px-4 font-mono">"KEY=VAL"</td>
                  <td className="py-3 px-4 font-mono text-purple-400 font-bold">('KEY', '=', 'VAL')</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">sep.join(iterable)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">Stitches sequence of strings in O(N) linear time</td>
                  <td className="py-3 px-4 font-mono">"-".join(['A', 'B'])</td>
                  <td className="py-3 px-4 font-mono text-pink-400 font-bold">'A-B'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">s.replace(old, new, cnt)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">str</td>
                  <td className="py-3 px-4">Substitutes occurrences of substring with limit count</td>
                  <td className="py-3 px-4 font-mono">"a-b-c".replace("-", "|", 1)</td>
                  <td className="py-3 px-4 font-mono text-amber-400 font-bold">'a|b-c'</td>
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
            Explore 4 production-grade Python scripts demonstrating case conversions, whitespace cleaning, tokenizing, and customer intake pipelines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "case_and_sanitization_methods.py",
                code: caseSanitization,
                description: "upper, lower, title, casefold Unicode matching, and character-set stripping.",
              },
              {
                filename: "split_and_partition_methods.py",
                code: splitPartition,
                description: "split whitespace collapse vs split(sep), maxsplit, splitlines, and 3-tuple partition().",
              },
              {
                filename: "join_and_replace_methods.py",
                code: joinReplace,
                description: "delimiter.join, defensive type casting, replace with count, and O(N) benchmarks.",
              },
              {
                filename: "customer_data_cleaner.py",
                code: customerCleaner,
                description: "Production customer registration sanitizer generating standardized records and clean CSV.",
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
                <span>❌</span> Trap 1: Assuming strip(chars) Removes Substrings
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">"www.example.com".strip("w.com")</code> yields <code className="text-rose-300 font-mono">"example"</code> because strip treats its argument as a set of individual characters to trim from both edges.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">removeprefix("www.").removesuffix(".com")</code> in Python 3.9+!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Passing Non-Strings to delimiter.join()
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">"".join([1, 2, 3])</code> crashes with <code className="text-amber-300 font-mono">TypeError: sequence item 0: expected str instance, int found</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Cast items: <code className="text-emerald-300">"".join(str(x) for x in items)</code>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: split() vs split(" ") Empty Slots
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">"A  B".split()</code> produces <code className="text-emerald-400 font-mono">['A', 'B']</code>, while <code className="text-purple-300 font-mono">"A  B".split(" ")</code> produces <code className="text-amber-400 font-mono">['A', '', 'B']</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Omit arguments when tokenizing irregular whitespace!
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting to Reassign Transformed String
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">name.strip()</code> on its own does NOT modify <code className="text-cyan-300 font-mono">name</code> because strings are immutable.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always rebind: <code className="text-emerald-300">name = name.strip()</code>
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
            Comprehensive question-and-answer repository covering case conversions, whitespace cleaning, tokenizing, and method chaining:
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
            Download or print the complete reference sheet with method comparison matrices, partition patterns, and pipeline recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_essential_string_methods_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
