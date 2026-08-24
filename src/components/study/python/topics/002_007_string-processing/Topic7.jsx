import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import regexBasics from "./topic7_files/regex_syntax_and_raw_strings.py?raw";
import shorthands from "./topic7_files/shorthand_character_classes_and_quantifiers.py?raw";
import patternFlags from "./topic7_files/compiling_patterns_and_flags.py?raw";
import enterpriseValidator from "./topic7_files/token_and_pattern_validator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Basic Regular Expressions Concept with re Module
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("backslash");

  // Interactive Sandbox State
  const [testText, setTestText] = useState("Susmita Mukherjee (Barrackpore): PIN 700120, PAN ABCDE1234F, Mob: 7003756860.");
  const [patternStr, setPatternStr] = useState("\\b[A-Z]{5}\\d{4}[A-Z]\\b");
  const [flagI, setFlagI] = useState(true);
  const [flagM, setFlagM] = useState(false);

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

  // Helper to execute regex live in JS matching Python semantics
  const evaluateRegexMatches = () => {
    try {
      let flags = "g";
      if (flagI) flags += "i";
      if (flagM) flags += "m";

      const regex = new RegExp(patternStr, flags);
      const matches = [];
      let match;
      
      // Prevent infinite loop on zero-length matches
      while ((match = regex.exec(testText)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
        });
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }

      return {
        valid: true,
        matches,
        count: matches.length,
        error: null,
      };
    } catch (err) {
      return {
        valid: false,
        matches: [],
        count: 0,
        error: err.message,
      };
    }
  };

  const regexResult = evaluateRegexMatches();

  // Pattern presets
  const patternPresets = [
    { label: "PAN Card", pattern: "\\b[A-Z]{5}\\d{4}[A-Z]\\b", desc: "5 Letters + 4 Digits + 1 Letter" },
    { label: "PIN Code", pattern: "\\b[1-9]\\d{5}\\b", desc: "6 Digits (Non-zero start)" },
    { label: "10-Digit Mobile", pattern: "\\b[6-9]\\d{9}\\b", desc: "Indian Mobile Numbers" },
    { label: "All Digits", pattern: "\\d+", desc: "Numeric Groups" },
    { label: "Word Tokens", pattern: "\\b[A-Za-z_]+\\b", desc: "Alphabetic Words" },
    { label: "Greedy HTML", pattern: "<p>.*</p>", desc: "Swallows all tags" },
    { label: "Lazy HTML", pattern: "<p>.*?</p>", desc: "Isolates each tag" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowRose {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(244, 63, 94, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(244, 63, 94, 0.8)); }
        }
        .animate-glow-rose {
          animation: pulseGlowRose 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-rose-950/80 text-rose-300 px-3 py-1 rounded-full border border-rose-800/80 shadow-sm shadow-rose-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-pink-950/80 text-pink-300 px-3 py-1 rounded-full border border-pink-800/80 shadow-sm shadow-pink-950/50">
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Basic Regular Expressions Concept with <code className="text-rose-400 font-mono">re</code> Module
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's pattern matching engine: raw strings (<code className="text-rose-300 font-mono">r"..."</code>), the Backslash Plague, metacharacters, character classes (<code className="text-purple-400 font-mono">\d</code>, <code className="text-purple-400 font-mono">\w</code>, <code className="text-purple-400 font-mono">\b</code>), greedy vs lazy quantifiers (<code className="text-cyan-400 font-mono">.*</code> vs <code className="text-cyan-400 font-mono">.*?</code>), and pre-compilation with <code className="text-amber-400 font-mono">re.compile()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Raw Strings (r"...") &amp; Backslash Plague
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Greedy vs Lazy / Non-Greedy (.*?)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Pattern Pre-Compilation (re.compile)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚩 Core Flags (re.I, re.M, re.S, re.X)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE BACKSLASH PLAGUE & RAW STRINGS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧩</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Regex Foundation &amp; The Backslash Plague
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Regular expressions provide a domain-specific mini-language inside Python for complex text validation, token extraction, and pattern manipulation through the standard <code className="text-rose-400 font-mono">re</code> module.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Feature 1 */}
              <div className="p-5 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-rose-500">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-2">
                  <span>🛡️</span> Raw String Invariant
                </div>
                <p className="text-sm text-slate-300">
                  Always use <code className="text-rose-300 font-mono">r"..."</code> so Python passes backslashes directly to the regex engine without converting <code className="text-rose-300 font-mono">\b</code> into an ASCII backspace.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>📦</span> Pre-Compilation
                </div>
                <p className="text-sm text-slate-300">
                  Calling <code className="text-purple-300 font-mono">re.compile()</code> converts pattern strings into compiled bytecode objects for instant microsecond reusability in loops.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>🚩</span> Compilation Flags
                </div>
                <p className="text-sm text-slate-300">
                  Control behavior with <code className="text-cyan-300 font-mono">re.I</code> (case-insensitive), <code className="text-cyan-300 font-mono">re.M</code> (multiline anchors), and <code className="text-cyan-300 font-mono">re.X</code> (verbose readable regex).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Why Standard Python Strings Break Regular Expressions
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                In standard Python strings, <code className="text-rose-400 font-mono">'\b'</code> is interpreted as an ASCII Backspace control code (<code className="text-slate-400 font-mono">\x08</code>). When passed to regex without <code className="text-rose-300 font-mono">r"..."</code>, the regex engine searches for literal backspaces instead of word boundaries!
              </p>
              <p className="text-sm sm:text-base text-emerald-300 font-semibold mt-1">
                ✓ Rule: Always prefix regex pattern strings with <code className="text-emerald-400 font-mono">r"..."</code> (e.g. <code className="text-emerald-300 font-mono">r"\bcat\b"</code>).
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
                2. Visualizing Regex Pipelines &amp; Quantifiers
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("backslash")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "backslash"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Backslash Plague
              </button>
              <button
                onClick={() => setActiveInteractiveTab("greedy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "greedy"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Greedy vs Lazy (.*?)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("classes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "classes"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Character Classes Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining raw string processing, greedy backtracking engines, and character class coverage:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "backslash" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">WHY RAW STRINGS r"..." ARE MANDATORY FOR REGEX</text>

                {/* Normal string trap */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">WITHOUT RAW STRINGS ("\bword\b")</text>
                  <text x="20" y="60" fill="#f8fafc" fontSize="12">1. Python Lexer parses "\b" as ASCII <tspan fill="#fca5a5" fontWeight="bold">0x08 (Backspace)</tspan>.</text>
                  <text x="20" y="85" fill="#f8fafc" fontSize="12">2. Regex Engine receives literal backspace characters.</text>
                  <text x="20" y="110" fill="#fca5a5" fontSize="12">3. Fails to match word boundaries in text!</text>

                  <rect x="20" y="135" width="350" height="90" rx="6" fill="#881337" stroke="#e11d48" />
                  <text x="35" y="165" fill="#fecdd3" fontSize="12" fontWeight="bold">Double Escape Nightmare:</text>
                  <text x="35" y="190" fill="#ffe4e6" fontSize="12">Requires '\\\\bword\\\\b' for regex</text>
                  <text x="35" y="210" fill="#fca5a5" fontSize="11">Extremely error-prone and unreadable!</text>
                </g>

                {/* Raw string salvation */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="250" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">WITH RAW STRINGS (r"\bword\b")</text>
                  <text x="20" y="60" fill="#f8fafc" fontSize="12">1. Python Lexer treats '\b' as literal <tspan fill="#34d399" fontWeight="bold">'\' and 'b'</tspan>.</text>
                  <text x="20" y="85" fill="#f8fafc" fontSize="12">2. Regex Engine receives pristine '\b' escape token.</text>
                  <text x="20" y="110" fill="#34d399" fontSize="12">3. Accurately identifies word boundaries!</text>

                  <rect x="20" y="135" width="350" height="90" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="35" y="165" fill="#a7f3d0" fontSize="12" fontWeight="bold">Clean Pythonic Code:</text>
                  <text x="35" y="190" fill="#ecfdf5" fontSize="12">r"\b[A-Za-z_]\w*\b"</text>
                  <text x="35" y="210" fill="#34d399" fontSize="11" fontWeight="bold">100% clean, native regex syntax!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "greedy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">GREEDY (.*) VS LAZY / NON-GREEDY (.*?) MATCHING ENGINE</text>

                {/* Target String */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="40" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="25" fill="#cbd5e1" fontSize="13">Target: &lt;p&gt;First Paragraph&lt;/p&gt;&lt;p&gt;Second Paragraph&lt;/p&gt;</text>
                </g>

                {/* Greedy Pattern */}
                <g transform="translate(30, 105)">
                  <rect x="0" y="0" width="810" height="90" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="28" fill="#fda4af" fontSize="13" fontWeight="bold">A. GREEDY PATTERN: r"&lt;p&gt;.*&lt;/p&gt;"</text>
                  <text x="20" y="52" fill="#f8fafc" fontSize="12">Consumes characters all the way to the <tspan fill="#fca5a5" fontWeight="bold">LAST &lt;/p&gt;</tspan> in the entire document.</text>
                  <text x="20" y="75" fill="#fecdd3" fontSize="12" fontWeight="bold">→ Single Match: "&lt;p&gt;First Paragraph&lt;/p&gt;&lt;p&gt;Second Paragraph&lt;/p&gt;" (Swallowed all!)</text>
                </g>

                {/* Lazy Pattern */}
                <g transform="translate(30, 210)">
                  <rect x="0" y="0" width="810" height="90" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="28" fill="#a7f3d0" fontSize="13" fontWeight="bold">B. LAZY PATTERN: r"&lt;p&gt;.*?&lt;/p&gt;"</text>
                  <text x="20" y="52" fill="#f8fafc" fontSize="12">Stops at the <tspan fill="#34d399" fontWeight="bold">VERY FIRST &lt;/p&gt;</tspan> encountered.</text>
                  <text x="20" y="75" fill="#a7f3d0" fontSize="12" fontWeight="bold">→ Two Distinct Matches: ["&lt;p&gt;First Paragraph&lt;/p&gt;", "&lt;p&gt;Second Paragraph&lt;/p&gt;"]</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">PREDEFINED SHORTHAND CHARACTER CLASSES MATRIX</text>

                <g transform="translate(30, 50)">
                  {/* \d vs \D */}
                  <rect x="0" y="0" width="390" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="25" fill="#c7d2fe" fontSize="13" fontWeight="bold">\d (Digits [0-9]) vs \D (Non-Digits)</text>
                  <text x="20" y="52" fill="#a7f3d0" fontSize="13">r"\d{6}" matches "700120" (Barrackpore PIN)</text>

                  {/* \w vs \W */}
                  <rect x="420" y="0" width="390" height="75" rx="8" fill="#3b0764" stroke="#a855f7" />
                  <text x="440" y="25" fill="#e9d5ff" fontSize="13" fontWeight="bold">\w (Alphanumeric + _) vs \W (Symbols)</text>
                  <text x="440" y="52" fill="#a7f3d0" fontSize="13">r"\w+" matches "student_name_2026"</text>

                  {/* \s vs \S */}
                  <rect x="0" y="90" width="390" height="75" rx="8" fill="#0c4a6e" stroke="#0ea5e9" />
                  <text x="20" y="115" fill="#bae6fd" fontSize="13" fontWeight="bold">\s (Whitespace) vs \S (Non-Whitespace)</text>
                  <text x="20" y="142" fill="#a7f3d0" fontSize="13">Matches spaces, tabs, newlines [\t\n\r]</text>

                  {/* \b vs \B */}
                  <rect x="420" y="90" width="390" height="75" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="440" y="115" fill="#a7f3d0" fontSize="13" fontWeight="bold">\b (Word Boundary) vs \B (Inside Word)</text>
                  <text x="440" y="142" fill="#a7f3d0" fontSize="13">r"\bcat\b" isolates "cat" from "catalog"</text>

                  {/* Negated set */}
                  <rect x="0" y="180" width="810" height="65" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="205" fill="#f43f5e" fontSize="13" fontWeight="bold">Negated Character Sets: [^0-9] or [^aeiou]</text>
                  <text x="20" y="228" fill="#cbd5e1" fontSize="13">Matches ANY character NOT present in the bracketed set</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE REGEX TESTER & SANDBOX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Regex Pattern Tester &amp; Sandbox
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test regular expression patterns live against sample strings, toggle flags, or choose from production presets:
          </p>

          {/* Pattern Presets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {patternPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setPatternStr(preset.pattern)}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all text-xs",
                  patternStr === preset.pattern
                    ? "bg-rose-950/90 border-rose-500 text-rose-200 shadow-md shadow-rose-950"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="font-mono font-bold text-rose-300">{preset.label}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{preset.desc}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Inputs */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Target Sample Text
                </label>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Regex Pattern String (Raw: r"...")
                </label>
                <input
                  type="text"
                  value={patternStr}
                  onChange={(e) => setPatternStr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-rose-300 font-mono text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Flags */}
              <div className="flex items-center gap-4 pt-2 border-t border-slate-800 text-xs font-mono text-slate-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flagI}
                    onChange={(e) => setFlagI(e.target.checked)}
                    className="accent-rose-500"
                  />
                  re.IGNORECASE (re.I)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flagM}
                    onChange={(e) => setFlagM(e.target.checked)}
                    className="accent-rose-500"
                  />
                  re.MULTILINE (re.M)
                </label>
              </div>
            </div>

            {/* Right Output Results */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Compiled Python Snippet
                  </span>
                  <span className={clsx("text-xs font-mono font-bold px-2 py-0.5 rounded", regexResult.valid ? "bg-emerald-900 text-emerald-300" : "bg-rose-900 text-rose-300")}>
                    {regexResult.valid ? `${regexResult.count} Matches Found` : "Invalid Pattern"}
                  </span>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-rose-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {`import re\npattern = re.compile(r"${patternStr}"${flagI ? ", re.IGNORECASE" : ""}${flagM ? ", re.MULTILINE" : ""})\nmatches = pattern.findall(text)`}
                </pre>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Captured Match Tokens
                </span>
                {regexResult.valid ? (
                  regexResult.matches.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                      {regexResult.matches.map((m, idx) => (
                        <span
                          key={idx}
                          className="bg-rose-950/80 border border-rose-500/80 text-rose-200 font-mono text-xs px-2.5 py-1 rounded-lg"
                        >
                          #{idx + 1}: "{m.text}" <span className="text-slate-400 text-[10px]">(i={m.index})</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-500 italic p-2">
                      No matches found for the given pattern in sample text.
                    </div>
                  )
                ) : (
                  <div className="text-xs font-mono text-rose-400 p-2">
                    Regex Syntax Error: {regexResult.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: COMPLETE REGEX CHEAT SHEET */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Regular Expression Cheat Sheet
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Metacharacter</th>
                  <th className="py-3.5 px-4 font-bold">Name</th>
                  <th className="py-3.5 px-4 font-bold">Meaning</th>
                  <th className="py-3.5 px-4 font-bold">Example Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Match Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">.</td>
                  <td className="py-3 px-4">Wildcard</td>
                  <td className="py-3 px-4">Any character except newline</td>
                  <td className="py-3 px-4 font-mono">r'c.t'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'cat', 'cut', 'c#t'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">^</td>
                  <td className="py-3 px-4">Start Anchor</td>
                  <td className="py-3 px-4">Start of string or line (re.M)</td>
                  <td className="py-3 px-4 font-mono">r'^INV-\d+'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'INV-000942'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">$</td>
                  <td className="py-3 px-4">End Anchor</td>
                  <td className="py-3 px-4">End of string or line (re.M)</td>
                  <td className="py-3 px-4 font-mono">r'\.pdf$'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'report.pdf'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-bold">\b</td>
                  <td className="py-3 px-4">Word Boundary</td>
                  <td className="py-3 px-4">Edge between word char and non-word</td>
                  <td className="py-3 px-4 font-mono">r'\bcat\b'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'cat' (not 'catch')</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-bold">\d+</td>
                  <td className="py-3 px-4">Digits</td>
                  <td className="py-3 px-4">One or more decimal digits [0-9]</td>
                  <td className="py-3 px-4 font-mono">r'\d{6}'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'700120'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">.*?</td>
                  <td className="py-3 px-4">Lazy Wildcard</td>
                  <td className="py-3 px-4">Shortest match between bounds</td>
                  <td className="py-3 px-4 font-mono">r'&lt;p&gt;.*?&lt;/p&gt;'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'&lt;p&gt;Text&lt;/p&gt;'</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">[^0-9]</td>
                  <td className="py-3 px-4">Negated Set</td>
                  <td className="py-3 px-4">Any character NOT a digit</td>
                  <td className="py-3 px-4 font-mono">r'[^0-9]+'</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">'Barrackpore'</td>
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
            Explore 4 production-grade Python scripts demonstrating raw string mechanics, shorthand classes, greedy vs lazy quantifiers, re.compile, and enterprise Indian ID validators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "regex_syntax_and_raw_strings.py",
                code: regexBasics,
                description: "Raw strings (r'...'), the backslash plague, character sets, and word boundaries (\\b).",
              },
              {
                filename: "shorthand_character_classes_and_quantifiers.py",
                code: shorthands,
                description: "Shorthand classes (\\d, \\w, \\s), quantifiers, and the greedy (.*) vs lazy (.*?) HTML trap.",
              },
              {
                filename: "compiling_patterns_and_flags.py",
                code: patternFlags,
                description: "Pre-compiling with re.compile() and core flags: re.I, re.M, re.S, and re.VERBOSE (re.X).",
              },
              {
                filename: "token_and_pattern_validator.py",
                code: enterpriseValidator,
                description: "Enterprise validation engine for Indian PAN cards, GSTIN, PIN codes, mobiles, and emails.",
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
                <span>❌</span> Trap 1: Missing Raw String Prefix
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">"\bcat\b"</code> turns <code className="text-rose-300 font-mono">\b</code> into ASCII Backspace <code className="text-slate-400 font-mono">\x08</code>, causing the regex engine to never match word boundaries.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always prefix with <code className="text-emerald-300">r"\bcat\b"</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Greedy XML / HTML Tag Swallowing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">r"&lt;p&gt;.*&lt;/p&gt;"</code> on multi-paragraph text consumes from the first <code className="text-amber-300 font-mono">&lt;p&gt;</code> to the very last <code className="text-amber-300 font-mono">&lt;/p&gt;</code> in the entire file.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use lazy quantifier: <code className="text-emerald-300">r"&lt;p&gt;.*?&lt;/p&gt;"</code>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing Anchors in Form Validation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">r"\d{6}"</code> matches <code className="text-purple-300 font-mono">"abc700120xyz"</code> because it finds 6 digits as an internal substring.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Anchor with start and end: <code className="text-emerald-300">r"^\d{6}$"</code>
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Recompiling Inside Loops
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">re.search()</code> repeatedly in a 100,000-iteration loop forces Python to re-parse the pattern string continuously.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Compile once outside the loop with <code className="text-emerald-300">re.compile()</code>!
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
            Comprehensive question-and-answer repository covering metacharacters, raw strings, character classes, greedy vs lazy quantifiers, and regex flags:
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
            Download or print the complete reference sheet with regex metacharacters, shorthand classes, and Indian ID validation recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_basic_regex_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
