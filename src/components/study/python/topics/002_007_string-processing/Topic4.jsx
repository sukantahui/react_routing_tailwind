import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import searchCount from "./topic4_files/searching_and_counting_methods.py?raw";
import prefixSuffix from "./topic4_files/prefix_and_suffix_validation.py?raw";
import charPredicates from "./topic4_files/character_classification_predicates.py?raw";
import formValidator from "./topic4_files/form_validator_and_security_scanner.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Searching & Validation Methods
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("search");
  const [testInput, setTestInput] = useState("700120");

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

  // Helper to evaluate predicate methods in JavaScript matching Python's semantics
  const evaluatePredicates = (val) => {
    const len = val.length;
    const isAscii = /^[\x00-\x7F]*$/.test(val);
    const isDecimal = len > 0 && /^[0-9]+$/.test(val);
    const isDigit = isDecimal || (len > 0 && /^[\d\u00B2\u00B3\u00B9\u2070-\u2079]+$/.test(val));
    const isNumeric = isDigit || (len > 0 && /^[\d\u00B2\u00B3\u00B9\u00BC-\u00BE\u2150-\u215E\u56DB]+$/.test(val));
    const isAlpha = len > 0 && /^[A-Za-z]+$/.test(val);
    const isAlnum = len > 0 && /^[A-Za-z0-9]+$/.test(val);
    const isSpace = len > 0 && /^\s+$/.test(val);
    const isPrintable = /^[\x20-\x7E\xA0-\xFF]*$/.test(val);
    const isLower = /[a-z]/.test(val) && !/[A-Z]/.test(val);
    const isUpper = /[A-Z]/.test(val) && !/[a-z]/.test(val);
    const isIdentifier = /^[A-Za-z_][A-Za-z0-9_]*$/.test(val);

    return {
      isdecimal: isDecimal,
      isdigit: isDigit,
      isnumeric: isNumeric,
      isalpha: isAlpha,
      isalnum: isAlnum,
      isspace: isSpace,
      isprintable: isPrintable,
      islower: isLower,
      isupper: isUpper,
      isidentifier: isIdentifier,
      isascii: isAscii,
    };
  };

  const currentPredicates = evaluatePredicates(testInput);

  // Preset testing strings for the playground
  const testPresets = [
    { label: "700120", desc: "PIN code (Decimal)" },
    { label: "ABCDE1234F", desc: "PAN card (Alnum)" },
    { label: "student_name_2", desc: "Python Identifier" },
    { label: "²", desc: "Superscript (Digit, not Decimal)" },
    { label: "½", desc: "Vulgar Fraction (Numeric only)" },
    { label: "Kolkata 2026", desc: "Mixed text with spaces" },
    { label: "  \t\n  ", desc: "Whitespace only (isspace)" },
    { label: "-42", desc: "Negative number (False for all digits!)" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowBlue {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8)); }
        }
        .animate-glow-blue {
          animation: pulseGlowBlue 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-blue-950/80 text-blue-300 px-3 py-1 rounded-full border border-blue-800/80 shadow-sm shadow-blue-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/80 shadow-sm shadow-indigo-950/50">
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Searching, Inspection &amp; Validation Methods
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master substring discovery (<code className="text-blue-400 font-mono">find</code> vs <code className="text-rose-400 font-mono">index</code>), occurrence counting (<code className="text-cyan-400 font-mono">count</code>), multi-prefix testing (<code className="text-emerald-400 font-mono">startswith</code>, <code className="text-emerald-400 font-mono">endswith</code>), and character classification predicates (<code className="text-purple-400 font-mono">isdecimal</code>, <code className="text-purple-400 font-mono">isdigit</code>, <code className="text-purple-400 font-mono">isalpha</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔎 find() vs index() (-1 vs ValueError)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Tuple Matching (startswith / endswith)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔢 Numeric Hierarchy (isdecimal ⊂ isdigit ⊂ isnumeric)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Security Scanning &amp; PAN/PIN Validation
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: SEARCHING & VALIDATION ARCHITECTURE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Searching, Affixes &amp; Validation Categories
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              String searching and validation in Python is structured around two distinct operational goals: <strong className="text-blue-400">locating substrings</strong> (where is the term located?) and <strong className="text-emerald-400">validating constraints</strong> (does the text satisfy structural and type rules?).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Category 1 */}
              <div className="p-5 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-lg shadow-blue-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-blue-500">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-lg mb-2">
                  <span>🔍</span> Substring Locator
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-blue-300 font-mono">find()</code>, <code className="text-blue-300 font-mono">rfind()</code>, <code className="text-blue-300 font-mono">index()</code>, <code className="text-blue-300 font-mono">rindex()</code>, <code className="text-blue-300 font-mono">count()</code>.
                </p>
                <span className="text-xs text-blue-400/80 font-mono">Returns: int index or -1</span>
              </div>

              {/* Category 2 */}
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>🏁</span> Affix Matching
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-emerald-300 font-mono">startswith(tuple)</code>, <code className="text-emerald-300 font-mono">endswith(tuple)</code>, <code className="text-emerald-300 font-mono">removeprefix()</code>, <code className="text-emerald-300 font-mono">removesuffix()</code>.
                </p>
                <span className="text-xs text-emerald-400/80 font-mono">Returns: bool or trimmed str</span>
              </div>

              {/* Category 3 */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>📋</span> Predicate Inspections
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <code className="text-purple-300 font-mono">isdecimal()</code>, <code className="text-purple-300 font-mono">isdigit()</code>, <code className="text-purple-300 font-mono">isalpha()</code>, <code className="text-purple-300 font-mono">isspace()</code>, <code className="text-purple-300 font-mono">isidentifier()</code>.
                </p>
                <span className="text-xs text-purple-400/80 font-mono">Returns: bool (True/False)</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-blue-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                The -1 Truthiness Pitfall: Why `if s.find(x):` is Dangerous
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                In Python, <code className="text-rose-400 font-mono">-1</code> is truthy (<code className="text-rose-300 font-mono">bool(-1) == True</code>). If you write <code className="text-rose-300 font-mono">if s.find('x'):</code>, Python will enter the if-block even when 'x' is MISSING!
              </p>
              <p className="text-sm sm:text-base text-emerald-300 font-semibold mt-1">
                ✓ Best Practice: Always check <code className="text-emerald-400 font-mono">if s.find('x') != -1:</code> or use <code className="text-emerald-400 font-mono">if 'x' in s:</code>.
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
                2. Visualizing Search Mechanics &amp; Numeric Hierarchy
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("search")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "search"
                    ? "bg-blue-900/50 text-blue-300 border border-blue-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                find() vs index()
              </button>
              <button
                onClick={() => setActiveInteractiveTab("affixes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "affixes"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Tuple Affix Matching
              </button>
              <button
                onClick={() => setActiveInteractiveTab("hierarchy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hierarchy"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Numeric Hierarchy Venn
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Exploring directional search pointers, candidate prefix testing, and character classification sets:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "search" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SUBSTRING SCANNING: s = "Coder &amp; AccoTax Barrackpore"</text>

                {/* Search flow cards */}
                <g transform="translate(30, 50)">
                  {/* find('Barrackpore') */}
                  <rect x="0" y="0" width="390" height="90" rx="8" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#7dd3fc" fontSize="13" fontWeight="bold">s.find("Barrackpore") (Left-to-Right)</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">Returns first match index: <tspan fill="#38bdf8" fontWeight="bold">16</tspan></text>
                  <text x="20" y="75" fill="#94a3b8" fontSize="11">If missing: returns <tspan fill="#34d399" fontWeight="bold">-1 (Zero Exception)</tspan></text>

                  {/* index('Barrackpore') */}
                  <rect x="420" y="0" width="390" height="90" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="440" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">s.index("Barrackpore") (Strict)</text>
                  <text x="440" y="55" fill="#f8fafc" fontSize="12">Returns first match index: <tspan fill="#fda4af" fontWeight="bold">16</tspan></text>
                  <text x="440" y="75" fill="#fca5a5" fontSize="11">If missing: raises <tspan fill="#f43f5e" fontWeight="bold">ValueError: substring not found</tspan></text>
                </g>

                {/* count non-overlapping rule */}
                <g transform="translate(30, 160)">
                  <rect x="0" y="0" width="810" height="145" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#34d399" fontSize="13" fontWeight="bold">Non-Overlapping Occurrence Rule: 'banana'.count('ana') == 1</text>
                  
                  {/* Character visualizer for banana */}
                  <g transform="translate(20, 45)">
                    {['b', 'a', 'n', 'a', 'n', 'a'].map((ch, idx) => (
                      <g key={idx}>
                        <rect
                          x={idx * 55}
                          y="0"
                          width="45"
                          height="45"
                          rx="6"
                          fill={idx >= 1 && idx <= 3 ? "#065f46" : "#1e293b"}
                          stroke={idx >= 1 && idx <= 3 ? "#34d399" : "#475569"}
                        />
                        <text x={idx * 55 + 22} y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">{ch}</text>
                        <text x={idx * 55 + 22} y="58" fill="#94a3b8" fontSize="10" textAnchor="middle">i={idx}</text>
                      </g>
                    ))}
                  </g>

                  <text x="360" y="70" fill="#cbd5e1" fontSize="12">
                    • Match 1: indices [1, 2, 3] ('ana') is claimed.
                  </text>
                  <text x="360" y="95" fill="#fda4af" fontSize="12">
                    • Index 3 ('a') is already consumed, so indices [3, 4, 5] cannot form a second match!
                  </text>
                  <text x="360" y="120" fill="#34d399" fontSize="12" fontWeight="bold">
                    Result: count('ana') returns 1.
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "affixes" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">TUPLE AFFIX MATCHING &amp; SUBSTRING STRIPPING</text>

                {/* Candidate Tuple Routing */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="110" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="14" fontWeight="bold">
                    url.startswith(('http://', 'https://', 'ftp://'))
                  </text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">
                    Python allows passing a <tspan fill="#34d399" fontWeight="bold">TUPLE</tspan> of candidate prefixes (lists and sets raise TypeError).
                  </text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="12">
                    • "https://codernaccotax.co.in".startswith(("http://", "https://")) → <tspan fill="#34d399" fontWeight="bold">True</tspan>
                  </text>
                  <text x="20" y="98" fill="#cbd5e1" fontSize="12">
                    • "smtp://mail.office.com".startswith(("http://", "https://")) → <tspan fill="#fca5a5" fontWeight="bold">False</tspan>
                  </text>
                </g>

                {/* removeprefix vs strip */}
                <g transform="translate(30, 180)">
                  <rect x="0" y="0" width="390" height="120" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="30" fill="#a5b4fc" fontSize="13" fontWeight="bold">s.removeprefix("www.") (Python 3.9+)</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">Removes EXACT prefix only.</text>
                  <text x="20" y="75" fill="#a7f3d0" fontSize="12">"www.example.com" → "example.com"</text>
                  <text x="20" y="95" fill="#94a3b8" fontSize="11">Safe no-op if prefix is missing.</text>

                  <rect x="420" y="0" width="390" height="120" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="440" y="30" fill="#fda4af" fontSize="13" fontWeight="bold">s.lstrip("w.") (Character Set Trap)</text>
                  <text x="440" y="55" fill="#f8fafc" fontSize="12">Removes ANY 'w' or '.' character.</text>
                  <text x="440" y="75" fill="#fda4af" fontSize="12">"www.w3schools.com" → "3schools.com" (Gotcha!)</text>
                  <text x="440" y="95" fill="#fca5a5" fontSize="11">Removes 'w' from actual domain word!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE NUMERIC HIERARCHY VENN: isdecimal() ⊂ isdigit() ⊂ isnumeric()</text>

                {/* Outer Ring: isnumeric() */}
                <circle cx="440" cy="180" r="140" fill="#3b0764" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
                <text x="440" y="65" fill="#e9d5ff" fontSize="14" fontWeight="bold" textAnchor="middle">1. isnumeric() (Broadest: Fractions '½', Chinese '四', Roman Numerals)</text>

                {/* Middle Ring: isdigit() */}
                <circle cx="440" cy="195" r="100" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" opacity="0.8" />
                <text x="440" y="115" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">2. isdigit() (Adds Superscripts '²', Subscripts)</text>

                {/* Inner Core: isdecimal() */}
                <circle cx="440" cy="215" r="60" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="440" y="210" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">3. isdecimal()</text>
                <text x="440" y="235" fill="#ecfdf5" fontSize="12" textAnchor="middle">'0' - '9' (int() safe)</text>

                {/* Side Callout: Floats and Negatives */}
                <rect x="30" y="240" width="220" height="70" rx="6" fill="#090d16" stroke="#f43f5e" />
                <text x="45" y="265" fill="#fda4af" fontSize="12" fontWeight="bold">Float &amp; Negative Trap:</text>
                <text x="45" y="290" fill="#cbd5e1" fontSize="11">"-10" &amp; "3.14" fail ALL 3 methods!</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE VALIDATOR SANDBOX & LIVE TESTER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive String Predicate Sandbox
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Type any string below or choose a preset to inspect live return values across all Python validation methods:
          </p>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {testPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setTestInput(preset.label)}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all text-xs",
                  testInput === preset.label
                    ? "bg-blue-950/90 border-blue-500 text-blue-200 shadow-md shadow-blue-950"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="font-mono font-bold text-blue-300">{preset.label}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{preset.desc}</div>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Inspect Target String
            </label>
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-slate-100 font-mono text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Type any string to inspect predicates..."
            />
          </div>

          {/* Predicates Live Grid */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Boolean Predicate Evaluation Results
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: ".isdecimal()", val: currentPredicates.isdecimal, tip: "Base-10 digits 0-9" },
                { name: ".isdigit()", val: currentPredicates.isdigit, tip: "Digits & superscripts" },
                { name: ".isnumeric()", val: currentPredicates.isnumeric, tip: "Broadest numeric set" },
                { name: ".isalpha()", val: currentPredicates.isalpha, tip: "Letters only" },
                { name: ".isalnum()", val: currentPredicates.isalnum, tip: "Letters + numbers" },
                { name: ".isspace()", val: currentPredicates.isspace, tip: "Whitespace only" },
                { name: ".isidentifier()", val: currentPredicates.isidentifier, tip: "Valid Python variable" },
                { name: ".isprintable()", val: currentPredicates.isprintable, tip: "No control codes" },
                { name: ".islower()", val: currentPredicates.islower, tip: "All letters lowercase" },
                { name: ".isupper()", val: currentPredicates.isupper, tip: "All letters uppercase" },
                { name: ".isascii()", val: currentPredicates.isascii, tip: "ASCII range (0..127)" },
              ].map((item) => (
                <div
                  key={item.name}
                  className={clsx(
                    "p-3 rounded-xl border flex flex-col justify-between transition-all",
                    item.val
                      ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-200"
                      : "bg-slate-900/50 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-200">{item.name}</span>
                    <span className={clsx("text-xs font-bold font-mono px-2 py-0.5 rounded", item.val ? "bg-emerald-900 text-emerald-300" : "bg-slate-800 text-slate-400")}>
                      {item.val ? "True" : "False"}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2">{item.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: SEARCH & VALIDATION MATRIX TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Complete Search &amp; Validation Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Method</th>
                  <th className="py-3.5 px-4 font-bold">Return Type</th>
                  <th className="py-3.5 px-4 font-bold">Behavior if Found / Satisfied</th>
                  <th className="py-3.5 px-4 font-bold">Behavior if NOT Found / Unmet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">s.find(sub, start, stop)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">int</td>
                  <td className="py-3 px-4">Lowest matching index (left-to-right)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">-1 (Zero Error)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">s.rfind(sub, start, stop)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">int</td>
                  <td className="py-3 px-4">Highest matching index (right-to-left)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">-1 (Zero Error)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">s.index(sub, start, stop)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">int</td>
                  <td className="py-3 px-4">Lowest matching index</td>
                  <td className="py-3 px-4 font-mono text-rose-400 font-bold">Raises ValueError</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">s.count(sub, start, stop)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">int</td>
                  <td className="py-3 px-4">Number of non-overlapping occurrences</td>
                  <td className="py-3 px-4 font-mono text-slate-400">0</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.startswith(prefix_tuple)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">bool</td>
                  <td className="py-3 px-4">Returns True if s starts with any candidate prefix</td>
                  <td className="py-3 px-4 font-mono text-slate-400">False</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">s.endswith(suffix_tuple)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">bool</td>
                  <td className="py-3 px-4">Returns True if s ends with any candidate suffix</td>
                  <td className="py-3 px-4 font-mono text-slate-400">False</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">s.isdecimal()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">bool</td>
                  <td className="py-3 px-4">All characters are base-10 digits 0-9 (len &gt; 0)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">False</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">s.isalpha()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">bool</td>
                  <td className="py-3 px-4">All characters are alphabetic letters (len &gt; 0)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">False</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">s.isidentifier()</td>
                  <td className="py-3 px-4 font-mono text-slate-400">bool</td>
                  <td className="py-3 px-4">Valid Python variable / identifier syntax</td>
                  <td className="py-3 px-4 font-mono text-slate-400">False</td>
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
            Explore 4 production-grade Python scripts demonstrating substring searching, multi-prefix routing, character predicate classifications, and form security validators:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "searching_and_counting_methods.py",
                code: searchCount,
                description: "find vs index (-1 vs ValueError), count non-overlapping rules, and membership testing.",
              },
              {
                filename: "prefix_and_suffix_validation.py",
                code: prefixSuffix,
                description: "startswith/endswith with tuple candidates, removeprefix, and document router.",
              },
              {
                filename: "character_classification_predicates.py",
                code: charPredicates,
                description: "The numeric hierarchy (isdecimal vs isdigit vs isnumeric) and isidentifier variable validator.",
              },
              {
                filename: "form_validator_and_security_scanner.py",
                code: formValidator,
                description: "Production form validator (PAN, PIN, mobile, password) and SQLi/XSS threat scanner.",
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
                <span>❌</span> Trap 1: The Truthy -1 `find()` Trap
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">if s.find("admin"):</code> evaluates to <code className="text-rose-300 font-mono">True</code> when "admin" is NOT found because <code className="text-rose-300 font-mono">bool(-1) == True</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Write <code className="text-emerald-300">if "admin" in s:</code> or <code className="text-emerald-300">if s.find("admin") != -1:</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Passing Lists or Sets to `startswith()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-amber-300 font-mono">s.startswith([".pdf", ".docx"])</code> crashes with <code className="text-amber-300 font-mono">TypeError: tuple for startswith must only contain str</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always pass a <strong>TUPLE</strong>: <code className="text-emerald-300">s.startswith((".pdf", ".docx"))</code>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Expecting `isdigit()` on Negative Numbers
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">"-10".isdigit()</code> returns <code className="text-purple-300 font-mono">False</code> because the minus sign <code className="text-purple-300 font-mono">'-'</code> is punctuation, not a digit.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Strip sign: <code className="text-emerald-300">s.lstrip("-+").isdigit()</code>
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Empty String Returns `False`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-cyan-300 font-mono">"".isalpha()</code>, <code className="text-cyan-300 font-mono">"".isdigit()</code>, and <code className="text-cyan-300 font-mono">"".isspace()</code> all return <code className="text-cyan-300 font-mono">False</code> because they require length &gt; 0.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Note:</span> <code className="text-emerald-300">"".isascii()</code> is the only predicate returning <code className="text-emerald-300">True</code> on empty strings!
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
            Comprehensive question-and-answer repository covering substring finders, tuple affixes, numeric hierarchies, and security validations:
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
            Download or print the complete reference sheet with search algorithms, predicate matrices, and security scanner recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_searching_and_validation_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
