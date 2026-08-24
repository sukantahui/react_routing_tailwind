import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import matchObjects from "./topic8_files/matching_methods_and_match_objects.py?raw";
import findallIter from "./topic8_files/findall_finditer_and_groups.py?raw";
import subFunctions from "./topic8_files/sub_subn_and_replacement_functions.py?raw";
import logRedactor from "./topic8_files/log_parser_and_pii_redactor.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic8_files/topic8_note.txt?raw";

// FAQ Questions
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: Pattern matching: search(), match(), findall(), sub()
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic8() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("trio");

  // Interactive Simulator State
  const [selectedOperation, setSelectedOperation] = useState("sub"); // search, match, findall, sub
  const [sampleText, setSampleText] = useState("Susmita Mukherjee: 2026-08-24, Rahul Roy: 2026-08-15");
  const [patternInput, setPatternInput] = useState("(\\d{4})-(\\d{2})-(\\d{2})");
  const [replaceInput, setReplaceInput] = useState("$3-$2-$1"); // In JS $1, in Python \1

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

  // Helper to execute operations live in JS
  const evaluateOperation = () => {
    try {
      if (selectedOperation === "sub") {
        const regex = new RegExp(patternInput, "g");
        const replaced = sampleText.replace(regex, replaceInput);
        const pyRepl = replaceInput.replace(/\$(\d+)/g, "\\$1");
        return {
          valid: true,
          outputType: "substituted_string",
          result: replaced,
          pyCode: `import re\npattern = r"${patternInput}"\nresult = re.sub(pattern, r"${pyRepl}", text)\nprint(result)`,
        };
      } else if (selectedOperation === "match") {
        const regex = new RegExp(`^${patternInput}`);
        const m = regex.exec(sampleText);
        if (m) {
          return {
            valid: true,
            outputType: "match_object",
            fullMatch: m[0],
            groups: m.slice(1),
            span: `(0, ${m[0].length})`,
            pyCode: `import re\nm = re.match(r"${patternInput}", text)\nif m:\n    print(m.group(), m.groups())`,
          };
        } else {
          return {
            valid: true,
            outputType: "none",
            result: "None (Pattern did not match at start index 0)",
            pyCode: `import re\nm = re.match(r"${patternInput}", text)  # Returns None`,
          };
        }
      } else if (selectedOperation === "search") {
        const regex = new RegExp(patternInput);
        const m = regex.exec(sampleText);
        if (m) {
          return {
            valid: true,
            outputType: "match_object",
            fullMatch: m[0],
            groups: m.slice(1),
            span: `(${m.index}, ${m.index + m[0].length})`,
            pyCode: `import re\nm = re.search(r"${patternInput}", text)\nif m:\n    print(f"Match: {m.group()} at {m.span()}")`,
          };
        } else {
          return {
            valid: true,
            outputType: "none",
            result: "None (Pattern not found anywhere in string)",
            pyCode: `import re\nm = re.search(r"${patternInput}", text)  # Returns None`,
          };
        }
      } else if (selectedOperation === "findall") {
        const regex = new RegExp(patternInput, "g");
        const matches = [];
        let m;
        while ((m = regex.exec(sampleText)) !== null) {
          if (m.length > 2) {
            matches.push(m.slice(1));
          } else if (m.length === 2) {
            matches.push(m[1]);
          } else {
            matches.push(m[0]);
          }
          if (m.index === regex.lastIndex) regex.lastIndex++;
        }
        return {
          valid: true,
          outputType: "findall_list",
          matches,
          count: matches.length,
          pyCode: `import re\nmatches = re.findall(r"${patternInput}", text)\nprint(matches)`,
        };
      }
    } catch (err) {
      return {
        valid: false,
        error: err.message,
      };
    }
  };

  const opResult = evaluateOperation();

  // Preset operations
  const opPresets = [
    {
      label: "Date Swapper (sub)",
      op: "sub",
      text: "Exam 1: 2026-08-24, Exam 2: 2026-09-15",
      pattern: "(\\d{4})-(\\d{2})-(\\d{2})",
      repl: "$3-$2-$1",
    },
    {
      label: "Find Names & Marks (findall)",
      op: "findall",
      text: "Susmita: 96.5%, Rahul: 88.0%, Priya: 92.5%",
      pattern: "([A-Za-z]+):\\s*(\\d+\\.\\d+)%",
      repl: "",
    },
    {
      label: "Search Invoice (search)",
      op: "search",
      text: "Transaction receipt for INV-000942 completed.",
      pattern: "INV-(\\d+)",
      repl: "",
    },
    {
      label: "Match Start Token (match)",
      op: "match",
      text: "PY-9402: Susmita Mukherjee enrolled.",
      pattern: "PY-\\d+",
      repl: "",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Topic 8
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Pattern Matching &amp; Substitution with <code className="text-teal-400 font-mono">search()</code>, <code className="text-emerald-400 font-mono">match()</code>, <code className="text-cyan-400 font-mono">findall()</code> &amp; <code className="text-rose-400 font-mono">sub()</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's core regex operations: the matching trio (<code className="text-teal-300 font-mono">search</code> vs <code className="text-teal-300 font-mono">match</code> vs <code className="text-teal-300 font-mono">fullmatch</code>), <code className="text-purple-400 font-mono">Match</code> object coordinates (<code className="text-purple-300 font-mono">.group()</code>, <code className="text-purple-300 font-mono">.span()</code>), group extraction rules with <code className="text-cyan-400 font-mono">findall()</code>, streaming with <code className="text-cyan-400 font-mono">finditer()</code>, and backreference substitution with <code className="text-rose-400 font-mono">re.sub()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 search() vs match() vs fullmatch()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Match Object (.group, .groups, .groupdict, .span)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 sub() Backreferences (\1, \2, \g&lt;name&gt;)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Web Log Parsing &amp; PII Data Redaction
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE CORE OPERATIONS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4 Fundamental Regex Operations in Python
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              The Python <code className="text-teal-400 font-mono">re</code> module provides 4 specialized functions tailored for discovering, extracting, streaming, and transforming structured text:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* Op 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-teal-500">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-2">
                  <span>🔎</span> re.search()
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  Scans anywhere in the string to find the <strong>FIRST</strong> matching location.
                </p>
                <span className="text-[11px] text-teal-400/80 font-mono">Returns: Match or None</span>
              </div>

              {/* Op 2 */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-2">
                  <span>📍</span> re.match()
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  Checks for a match strictly at the <strong>BEGINNING (index 0)</strong> of the string.
                </p>
                <span className="text-[11px] text-emerald-400/80 font-mono">Returns: Match or None</span>
              </div>

              {/* Op 3 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-2">
                  <span>📑</span> re.findall()
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  Finds <strong>ALL</strong> non-overlapping matches across the entire text.
                </p>
                <span className="text-[11px] text-cyan-400/80 font-mono">Returns: list of str/tuples</span>
              </div>

              {/* Op 4 */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-rose-500">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-2">
                  <span>🔄</span> re.sub()
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  Replaces matches using templates, <strong>backreferences (\1)</strong>, or callable callbacks.
                </p>
                <span className="text-[11px] text-rose-400/80 font-mono">Returns: new str</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                The AttributeError Trap on Failed Searches
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When a pattern is not found, <code className="text-teal-300 font-mono">re.search()</code> and <code className="text-emerald-300 font-mono">re.match()</code> return <code className="text-rose-400 font-mono">None</code>. Calling <code className="text-rose-400 font-mono">re.search(pat, s).group()</code> directly will crash with <code className="text-rose-300 font-mono">AttributeError: 'NoneType' object has no attribute 'group'</code>.
              </p>
              <p className="text-sm sm:text-base text-emerald-300 font-semibold mt-1">
                ✓ Best Practice: Use Python 3.8+ walrus operator: <code className="text-emerald-400 font-mono">if (m := re.search(pat, s)): print(m.group())</code>.
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
                2. Visualizing Matching Mechanics &amp; Substitution
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("trio")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "trio"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                match vs search vs fullmatch
              </button>
              <button
                onClick={() => setActiveInteractiveTab("anatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "anatomy"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Match Object Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("subengine")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "subengine"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                re.sub() Backreferences
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining start constraints, coordinate extraction, and backreference replacement pipelines:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "trio" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">MATCHING TRIO COMPARISON: Target = "Student: 9402 from Barrackpore"</text>

                {/* Operation 1: match */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#1e293b" stroke="#0d9488" />
                  <text x="20" y="28" fill="#2dd4bf" fontSize="13" fontWeight="bold">1. re.match(r"\d+", text)  [Index 0 Only]</text>
                  <text x="20" y="55" fill="#fca5a5" fontSize="12">
                    Evaluates at index 0 ('S') → <tspan fill="#f43f5e" fontWeight="bold">Returns None</tspan> (Fails immediately because text starts with letters).
                  </text>
                </g>

                {/* Operation 2: search */}
                <g transform="translate(30, 140)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="28" fill="#a7f3d0" fontSize="13" fontWeight="bold">2. re.search(r"\d+", text) [Scans Entire String]</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="12">
                    Scans left-to-right → <tspan fill="#34d399" fontWeight="bold">Returns Match Object</tspan>: match='9402', span=(9, 13).
                  </text>
                </g>

                {/* Operation 3: fullmatch */}
                <g transform="translate(30, 230)">
                  <rect x="0" y="0" width="810" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="20" y="28" fill="#c7d2fe" fontSize="13" fontWeight="bold">3. re.fullmatch(r"\d+", text) [Entire String Must Match]</text>
                  <text x="20" y="55" fill="#fca5a5" fontSize="12">
                    Full text contains letters and spaces → <tspan fill="#f43f5e" fontWeight="bold">Returns None</tspan> (Would match only if text == "9402").
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "anatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">THE Match OBJECT ANATOMY: m = re.search(r"(\d{4})-(\d{2})-(\d{2})", "2026-08-24")</text>

                {/* Match Object Properties */}
                <g transform="translate(30, 50)">
                  {/* group(0) */}
                  <rect x="0" y="0" width="255" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">m.group() / m.group(0)</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="16" fontWeight="bold">"2026-08-24"</text>
                  <text x="20" y="90" fill="#94a3b8" fontSize="11">Entire matched sequence</text>

                  {/* groups() */}
                  <rect x="275" y="0" width="255" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="295" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">m.groups() (Tuple)</text>
                  <text x="295" y="55" fill="#a7f3d0" fontSize="15" fontWeight="bold">('2026', '08', '24')</text>
                  <text x="295" y="90" fill="#94a3b8" fontSize="11">Tuple of all captured subgroups</text>

                  {/* span() */}
                  <rect x="550" y="0" width="260" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="570" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">m.span() Coordinates</text>
                  <text x="570" y="55" fill="#38bdf8" fontSize="16" fontWeight="bold">(0, 10)</text>
                  <text x="570" y="90" fill="#94a3b8" fontSize="11">start()=0, end()=10 in text</text>
                </g>

                {/* Positional Subgroups */}
                <g transform="translate(30, 180)">
                  <rect x="0" y="0" width="810" height="110" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#34d399" fontSize="13" fontWeight="bold">Positional Groups Breakdown:</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="13">• <tspan fill="#38bdf8" fontWeight="bold">m.group(1)</tspan> = "2026" (Year) &nbsp;&nbsp;|&nbsp;&nbsp; • <tspan fill="#38bdf8" fontWeight="bold">m.group(2)</tspan> = "08" (Month) &nbsp;&nbsp;|&nbsp;&nbsp; • <tspan fill="#38bdf8" fontWeight="bold">m.group(3)</tspan> = "24" (Day)</text>
                  <text x="20" y="90" fill="#94a3b8" fontSize="12">If named groups are used: <tspan fill="#f59e0b" fontStyle="italic">m.groupdict() -> &#123;'year': '2026', 'month': '08', 'day': '24'&#125;</tspan></text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#fb7185" fontSize="14" fontWeight="bold">re.sub() BACKREFERENCE ENGINE &amp; DYNAMIC CALLBACK</text>

                {/* Backreference Swapping */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="28" fill="#fda4af" fontSize="13" fontWeight="bold">A. Date Format Swapper with Backreferences: r"\3-\2-\1"</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="13">
                    re.sub(r"(\d&#123;4&#125;)-(\d&#123;2&#125;)-(\d&#123;2&#125;)", r"\3-\2-\1", "2026-08-24")
                  </text>
                  <text x="20" y="85" fill="#a7f3d0" fontSize="14" fontWeight="bold">
                    → Output: "24-08-2026" (Swaps Day \3 to front, Year \1 to end)
                  </text>
                </g>

                {/* Callable Replacement Function */}
                <g transform="translate(30, 180)">
                  <rect x="0" y="0" width="810" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="28" fill="#a7f3d0" fontSize="13" fontWeight="bold">B. Dynamic Callback Function in re.sub()</text>
                  <text x="20" y="55" fill="#f8fafc" fontSize="12">
                    re.sub(r"\$(\d+)", lambda m: f"INR &#123;float(m.group(1))*83.5:,.2f&#125;", "Price: $50")
                  </text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="14" fontWeight="bold">
                    → Output: "Price: INR 4,175.00" (Executes custom Python math on every match!)
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE REGEX OPERATION SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Regex Operation Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an operation, enter your pattern with capture groups, and preview live match objects or backreference substitutions:
          </p>

          {/* Operation Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {opPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setSelectedOperation(preset.op);
                  setSampleText(preset.text);
                  setPatternInput(preset.pattern);
                  if (preset.repl) setReplaceInput(preset.repl);
                }}
                className={clsx(
                  "p-2.5 rounded-xl text-left border transition-all text-xs",
                  selectedOperation === preset.op && patternInput === preset.pattern
                    ? "bg-teal-950 border-teal-500 text-teal-200 shadow-md shadow-teal-950"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="font-mono font-bold text-teal-300">{preset.label}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{preset.pattern}</div>
              </button>
            ))}
          </div>

          {/* Operation Selector Buttons */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "search", label: "re.search()" },
              { id: "match", label: "re.match()" },
              { id: "findall", label: "re.findall()" },
              { id: "sub", label: "re.sub()" },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => setSelectedOperation(op.id)}
                className={clsx(
                  "flex-1 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                  selectedOperation === op.id
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {op.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Controls */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Target Sample String
                </label>
                <textarea
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Regex Pattern String (with capture groups)
                </label>
                <input
                  type="text"
                  value={patternInput}
                  onChange={(e) => setPatternInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              {selectedOperation === "sub" && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Replacement Template (Use $1, $2 or \1, \2 for groups)
                  </label>
                  <input
                    type="text"
                    value={replaceInput}
                    onChange={(e) => setReplaceInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-rose-300 font-mono text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}
            </div>

            {/* Right Output */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Generated Python Code
                </span>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {opResult.pyCode}
                </pre>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Evaluated Result
                </span>
                {opResult.valid ? (
                  opResult.outputType === "match_object" ? (
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="text-emerald-300 font-bold">
                        Match Found: "{opResult.fullMatch}" at span {opResult.span}
                      </div>
                      <div className="text-slate-300">
                        Subgroups: {JSON.stringify(opResult.groups)}
                      </div>
                    </div>
                  ) : opResult.outputType === "findall_list" ? (
                    <div className="space-y-1 text-xs font-mono">
                      <div className="text-emerald-300 font-bold">Total Matches: {opResult.count}</div>
                      <div className="text-slate-200 bg-slate-900 p-2 rounded max-h-24 overflow-y-auto">
                        {JSON.stringify(opResult.matches, null, 2)}
                      </div>
                    </div>
                  ) : opResult.outputType === "substituted_string" ? (
                    <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap font-bold">
                      {opResult.result}
                    </pre>
                  ) : (
                    <div className="text-xs font-mono text-rose-400 italic">
                      {opResult.result}
                    </div>
                  )
                ) : (
                  <div className="text-xs font-mono text-rose-400">{opResult.error}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER METHOD COMPARISON TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Regex Methods Comparison Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Method</th>
                  <th className="py-3.5 px-4 font-bold">Search Scope</th>
                  <th className="py-3.5 px-4 font-bold">Return Type on Match</th>
                  <th className="py-3.5 px-4 font-bold">Return on Failure</th>
                  <th className="py-3.5 px-4 font-bold">Ideal Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">re.search(pat, s)</td>
                  <td className="py-3 px-4">Scans anywhere in string</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">Match Object</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4">Finding the first occurrence of an embedded pattern</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">re.match(pat, s)</td>
                  <td className="py-3 px-4">Index 0 (Start of string only)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">Match Object</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4">Validating line start tokens or command prefixes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">re.fullmatch(pat, s)</td>
                  <td className="py-3 px-4">Entire string from start to end</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">Match Object</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4">Strict form validation (PAN, PIN, Mobile numbers)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">re.findall(pat, s)</td>
                  <td className="py-3 px-4">Entire string for all matches</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">list of str or tuples</td>
                  <td className="py-3 px-4 font-mono text-slate-400">[] (Empty list)</td>
                  <td className="py-3 px-4">Extracting all occurrences into a Python list</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">re.finditer(pat, s)</td>
                  <td className="py-3 px-4">Entire string (Lazy stream)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">callable_iterator</td>
                  <td className="py-3 px-4 font-mono text-slate-400">Empty iterator</td>
                  <td className="py-3 px-4">Streaming Match objects over huge log files with zero RAM waste</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">re.sub(pat, repl, s)</td>
                  <td className="py-3 px-4">Entire string substitution</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">str (Modified string)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">Original string</td>
                  <td className="py-3 px-4">Pattern replacements, date reformatting, PII redaction</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">re.split(pat, s)</td>
                  <td className="py-3 px-4">Splits by pattern delimiters</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">list of str</td>
                  <td className="py-3 px-4 font-mono text-slate-400">[s]</td>
                  <td className="py-3 px-4">Splitting text across multiple irregular separators</td>
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
            Explore 4 production-grade Python scripts demonstrating search/match/fullmatch, findall group rules, finditer streaming, sub backreferences, and server log PII redactors:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "matching_methods_and_match_objects.py",
                code: matchObjects,
                description: "re.search vs re.match vs re.fullmatch, positional groups (.group(1)), named groups, and span coordinates.",
              },
              {
                filename: "findall_finditer_and_groups.py",
                code: findallIter,
                description: "findall() return rules (0/1/2+ groups), finditer lazy streaming, and re.split with capturing delimiters.",
              },
              {
                filename: "sub_subn_and_replacement_functions.py",
                code: subFunctions,
                description: "re.sub with backreferences (\\1, \\2), dynamic callback replacement functions, and re.subn substitution counters.",
              },
              {
                filename: "log_parser_and_pii_redactor.py",
                code: logRedactor,
                description: "Industrial web server access log parser and privacy PII data redactor for mobile, PAN, and emails.",
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
                <span>❌</span> Trap 1: Calling `.group()` Without Checking `None`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">val = re.search(pat, s).group(1)</code> crashes with <code className="text-rose-300 font-mono">AttributeError: 'NoneType' object has no attribute 'group'</code> whenever the search fails.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Write <code className="text-emerald-300">if (m := re.search(pat, s)): val = m.group(1)</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Using `re.match()` Expecting Full-Text Search
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-amber-300 font-mono">re.match(r"\d+", "Invoice 101")</code> returns <code className="text-amber-300 font-mono">None</code> because <code className="text-amber-300 font-mono">match()</code> only looks at index 0 ('I').
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">re.search(r"\d+", text)</code> for general substring searches!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: `re.findall()` Tuple Surprise
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Adding parentheses to a pattern in <code className="text-purple-300 font-mono">re.findall(r"(\w+)-(\d+)", s)</code> changes the return type from a list of strings to a <strong>list of tuples</strong>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Tip:</span> Use non-capturing groups <code className="text-emerald-300">(?:...)</code> if you want full string matches!
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Backreference Escaping in `re.sub()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">re.sub(pat, "\1", s)</code> without raw string prefix treats <code className="text-cyan-300 font-mono">"\1"</code> as ASCII character <code className="text-slate-400 font-mono">\x01</code> instead of group 1.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use raw strings for replacement templates: <code className="text-emerald-300">r"\1"</code> or <code className="text-emerald-300">r"\g&lt;1&gt;"</code>
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
            Comprehensive question-and-answer repository covering match objects, group extraction rules, finditer streaming, and dynamic re.sub callbacks:
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
            Download or print the complete reference sheet with matching trio comparisons, Match object cheat sheets, and log redactor pipelines:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic8_pattern_matching_notes.txt"
              title="Print Topic 8 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
