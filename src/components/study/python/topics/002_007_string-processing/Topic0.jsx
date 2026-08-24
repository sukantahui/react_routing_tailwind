import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import stringBasics from "./topic0_files/string_creation_basics.py?raw";
import escapeSequences from "./topic0_files/escape_sequences_deep_dive.py?raw";
import multilineRaw from "./topic0_files/multiline_and_raw_strings.py?raw";
import invoiceGenerator from "./topic0_files/invoice_receipt_generator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: String Creation, Multiline Strings & Escape Sequences
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("lexer");

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8)); }
        }
        .animate-glow {
          animation: pulseGlow 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/80 shadow-sm shadow-indigo-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing & Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          String Creation, Multiline Strings & Escape Sequences
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering string literals, Unicode representation, escape sequences (<code className="text-indigo-400 font-mono">\n</code>, <code className="text-indigo-400 font-mono">\t</code>, <code className="text-indigo-400 font-mono">\u20B9</code>), raw strings (<code className="text-cyan-400 font-mono">r"..."</code>), and multiline Docstrings.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔤 Single vs Double Quotes
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 Triple Quotes & Docstrings
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Raw Strings (r"")
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Escape Sequences & Unicode
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: STRING LITERALS & FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔤</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Understanding Python String Literals
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, a <strong className="text-white">String</strong> (<code className="text-indigo-400 font-mono">str</code>) is an <em>immutable sequence of Unicode characters</em>. Python offers unprecedented flexibility when defining strings, allowing developers to choose between single quotes, double quotes, triple quotes, and specialized raw prefixes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-500">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg mb-2">
                  <span>'...' vs "..."</span> Single & Double Quotes
                </div>
                <p className="text-sm text-slate-300">
                  Functionally identical in Python. Having both allows seamless embedding of quotes without escaping: <code className="text-indigo-300 font-mono">"Susmita's notes"</code> or <code className="text-indigo-300 font-mono">'He said "Hello"'</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-2">
                  <span>"""..."""</span> Triple Quotes & Docstrings
                </div>
                <p className="text-sm text-slate-300">
                  Preserves exact indentation, line breaks, and whitespace across multiple physical lines. Serves as official documentation strings (Docstrings) when placed at the top of functions/classes.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-indigo-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Core Rules for String Creation:
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-300">
                <li><strong className="text-white">Interchangeable Delimiters:</strong> Single quotes <code className="text-indigo-300 font-mono">'...'</code> and double quotes <code className="text-indigo-300 font-mono">"..."</code> produce the exact same <code className="font-mono text-indigo-400">str</code> type in memory.</li>
                <li><strong className="text-white">Immutable Nature:</strong> Once created in memory, characters cannot be reassigned in-place (<code className="font-mono text-rose-400">s[0] = 'A'</code> triggers a <code className="text-rose-400 font-mono">TypeError</code>).</li>
                <li><strong className="text-white">Explicit Casting:</strong> Any Python data type (integer, float, list, dictionary) can be transformed into a string using the constructor <code className="font-mono text-indigo-400">str(value)</code>.</li>
                <li><strong className="text-white">Unicode by Default:</strong> Python 3 strings are native UTF-8 Unicode, allowing direct use of emojis, Indian languages, and symbols like <code className="font-mono text-emerald-400">₹</code>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: VISUAL ARCHITECTURE & ESCAPE SEQUENCE PARSER (SVG) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visual Architecture: Lexer Parsing & Raw Strings
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("lexer")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lexer"
                    ? "bg-indigo-900/50 text-indigo-300 border border-indigo-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Escape Code Lexer
              </button>
              <button
                onClick={() => setActiveInteractiveTab("raw")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "raw"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Raw String vs Standard Path
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            When Python encounters a string literal, its lexical analyzer scans for the backslash <code className="font-mono text-indigo-400">\</code> character to evaluate escape commands before compiling bytecode into memory.
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "lexer" ? (
              <svg viewBox="0 0 850 360" className="w-full h-auto min-w-[650px] font-sans">
                <defs>
                  <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Input Stream */}
                <text x="30" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">1. SOURCE CODE STRING LITERAL</text>
                
                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="60" width="160" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="86" fill="#f8fafc" fontSize="13" fontWeight="600">"Susmita\nRoy"</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="115" width="160" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="141" fill="#f8fafc" fontSize="13" fontWeight="600">"Fee:\t\u20B9 4500"</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="170" width="160" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="196" fill="#f8fafc" fontSize="13" fontWeight="600">"Coder &amp; AccoTax"</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="225" width="160" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="251" fill="#f8fafc" fontSize="13" fontWeight="600">"Barrackpore\\Center"</text>
                </g>

                {/* Lexer Box */}
                <rect x="250" y="75" width="180" height="180" rx="12" fill="#090d16" stroke="#6366f1" strokeWidth="2" />
                <text x="270" y="110" fill="#818cf8" fontSize="14" fontWeight="bold">2. ESCAPE LEXER</text>
                <text x="268" y="135" fill="#94a3b8" fontSize="12">\n → [Line Feed 0x0A]</text>
                <text x="268" y="165" fill="#94a3b8" fontSize="12">\t → [Horiz Tab 0x09]</text>
                <text x="268" y="195" fill="#34d399" fontSize="12">\u20B9 → [Rupee '₹']</text>
                <text x="268" y="225" fill="#94a3b8" fontSize="12">\\ → [Literal Backslash '\']</text>

                {/* Arrows Connecting */}
                <path d="M 190 81 L 250 115" stroke="#6366f1" strokeWidth="2" fill="none" />
                <path d="M 190 136 L 250 165" stroke="#6366f1" strokeWidth="2" fill="none" />
                <path d="M 190 191 L 250 195" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <path d="M 190 246 L 250 225" stroke="#6366f1" strokeWidth="2" fill="none" />

                {/* Internal Bytecode & Console Output */}
                <text x="490" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">3. COMPILED RUNTIME MEMORY &amp; TERMINAL</text>

                {/* Output 1 */}
                <rect x="490" y="55" width="330" height="42" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="505" y="75" fill="#818cf8" fontSize="11" fontWeight="bold">Parsed Output 1 (Two Lines):</text>
                <text x="505" y="90" fill="#f8fafc" fontSize="12">Susmita ↵ Roy</text>

                {/* Output 2 */}
                <rect x="490" y="105" width="330" height="42" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="505" y="125" fill="#34d399" fontSize="11" fontWeight="bold">Parsed Output 2 (Tab + Rupee):</text>
                <text x="505" y="140" fill="#f8fafc" fontSize="12">Fee:    ₹ 4500 (Unicode decoded)</text>

                {/* Output 3 */}
                <rect x="490" y="155" width="330" height="42" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="505" y="175" fill="#64748b" fontSize="11" fontWeight="bold">Parsed Output 3 (Standard text):</text>
                <text x="505" y="190" fill="#f8fafc" fontSize="12">Coder &amp; AccoTax</text>

                {/* Output 4 */}
                <rect x="490" y="205" width="330" height="42" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="505" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold">Parsed Output 4 (Escaped Backslash):</text>
                <text x="505" y="240" fill="#f8fafc" fontSize="12">Barrackpore\Center</text>

                {/* Summary Banner */}
                <rect x="490" y="265" width="330" height="45" rx="8" fill="url(#gradIndigo)" />
                <text x="505" y="293" fill="#ffffff" fontSize="13" fontWeight="bold">
                  ✓ Backslashes trigger escape evaluation
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                {/* Raw String vs Normal String */}
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Windows Path Bug vs Raw String (r"...") Solution</text>

                {/* Standard String Path Corruption */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">Standard String: "C:\notes\test.txt"</text>
                
                <rect x="50" y="115" width="340" height="60" rx="6" fill="#090d16" stroke="#b91c1c" strokeWidth="1" />
                <text x="65" y="138" fill="#fca5a5" fontSize="12">Lexer encounters <tspan fill="#ef4444" fontWeight="bold">\n</tspan> (newline) and <tspan fill="#ef4444" fontWeight="bold">\t</tspan> (tab)!</text>
                <text x="65" y="160" fill="#cbd5e1" fontSize="11">Path corrupts into: C: ↵ otes [tab] est.txt</text>

                <text x="50" y="210" fill="#ef4444" fontSize="12" fontWeight="bold">❌ Result: FileNotFoundError / SyntaxError</text>
                <text x="50" y="235" fill="#94a3b8" fontSize="12">Windows file system cannot open broken path.</text>

                {/* Raw String Clean Path */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="460" y="95" fill="#67e8f9" fontSize="14" fontWeight="bold">Raw String: r"C:\notes\test.txt"</text>
                
                <rect x="460" y="115" width="340" height="60" rx="6" fill="#090d16" stroke="#0891b2" strokeWidth="1" />
                <text x="475" y="138" fill="#67e8f9" fontSize="12">Prefix <tspan fill="#22d3ee" fontWeight="bold">'r'</tspan> suppresses escape parsing completely.</text>
                <text x="475" y="160" fill="#cbd5e1" fontSize="11">Exact path stored: C:\notes\test.txt</text>

                <text x="460" y="210" fill="#34d399" fontSize="12" fontWeight="bold">✓ Result: File Opens Perfectly!</text>
                <text x="460" y="235" fill="#94a3b8" fontSize="12">Mandatory for Windows file paths &amp; RegEx.</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: ESCAPE SEQUENCES REFERENCE TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📋</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Python Escape Sequences Quick Reference
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 bg-slate-950/50">
                  <th className="p-3 font-semibold">Escape Code</th>
                  <th className="p-3 font-semibold">Name & Description</th>
                  <th className="p-3 font-semibold">Real-World Code Example</th>
                  <th className="p-3 font-semibold">Output Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\n</td>
                  <td className="p-3">Newline (Line Feed - LF)</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"Kolkata\nBarrackpore"</td>
                  <td className="p-3 text-slate-200">Two separate lines</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\t</td>
                  <td className="p-3">Horizontal Tab</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"Student:\tSusmita"</td>
                  <td className="p-3 text-slate-200">Advances cursor 4-8 spaces</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\\</td>
                  <td className="p-3">Literal Backslash</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"C:\\Python\\Projects"</td>
                  <td className="p-3 text-slate-200">C:\Python\Projects</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\'</td>
                  <td className="p-3">Literal Single Quote</td>
                  <td className="p-3 font-mono text-xs text-slate-400">'Susmita\'s notebook'</td>
                  <td className="p-3 text-slate-200">Susmita's notebook</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\"</td>
                  <td className="p-3">Literal Double Quote</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"He said \"Welcome!\""</td>
                  <td className="p-3 text-slate-200">He said "Welcome!"</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-emerald-400 font-bold">\u20B9</td>
                  <td className="p-3">16-bit Unicode (Indian Rupee)</td>
                  <td className="p-3 font-mono text-xs text-emerald-300">"\u20B9 4,500"</td>
                  <td className="p-3 text-emerald-400 font-bold">₹ 4,500</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\r</td>
                  <td className="p-3">Carriage Return (Moves cursor to line start)</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"Progress: 50%\rProgress: 100%"</td>
                  <td className="p-3 text-slate-200">Overwrites line in terminal</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">\b</td>
                  <td className="p-3">Backspace</td>
                  <td className="p-3 font-mono text-xs text-slate-400">"Kolkataa\b"</td>
                  <td className="p-3 text-slate-200">Kolkata</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD INDUSTRY USE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌍</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Production Scenarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Scenario 1 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🧾</span> 1. Automated GST Invoices in Rupees (₹)
              </div>
              <p className="text-sm text-slate-300">
                At the <strong className="text-indigo-400">Coder &amp; AccoTax Barrackpore Center</strong>, fee receipts for students like Susmita and Debangshu are formatted using multiline strings (<code className="text-indigo-300 font-mono">"""..."""</code>) and the Indian Rupee symbol (<code className="text-emerald-400 font-mono">₹</code> / <code className="text-emerald-400 font-mono">\u20B9</code>) with fixed tab alignments.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📁</span> 2. Windows Filesystem Automation Scripts
              </div>
              <p className="text-sm text-slate-300">
                Python scripts automating file imports in Kolkata offices must use raw strings (<code className="text-cyan-300 font-mono">r"C:\Users\data\new_batch.csv"</code>) to prevent accidental newline interpretation (<code className="text-rose-400 font-mono">\n</code>) of folder names starting with 'n' or 't'.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📜</span> 3. PEP-257 Standard Docstring Specifications
              </div>
              <p className="text-sm text-slate-300">
                Enterprise Python codebases document function contracts, parameters, exceptions, and return types using triple double-quoted (<code className="text-purple-300 font-mono">"""..."""</code>) docstrings directly read by Sphinx and IDE autocomplete engines.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🌐</span> 4. Multilingual Unicode & Internationalization
              </div>
              <p className="text-sm text-slate-300">
                Web scrapers and backend APIs in West Bengal handle Bengali Unicode strings (such as <code className="text-amber-300 font-mono">\u09A8\u09AE\u09B8\u09CD\u0995\u09BE\u09B0</code> for <em>নমস্কার</em>) effortlessly thanks to native UTF-8 encoding support.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: PRACTICAL CODE EXAMPLES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Hands-On Python Code Demos
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 1: Single, Double Quotes, Embedding & str() Casting
              </h3>
              <PythonFileLoader
                fileModule={stringBasics}
                title="string_creation_basics.py"
                highlightLines={[8, 18, 21, 28]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 2: Comprehensive Escape Sequences & Unicode Indian Rupee (₹)
              </h3>
              <PythonFileLoader
                fileModule={escapeSequences}
                title="escape_sequences_deep_dive.py"
                highlightLines={[9, 14, 19, 27]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 3: Multiline Strings, Raw Strings (r"") & Line Continuation
              </h3>
              <PythonFileLoader
                fileModule={multilineRaw}
                title="multiline_and_raw_strings.py"
                highlightLines={[9, 24, 25, 33]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 4: Real-World GST Fee Receipt Generator for Barrackpore Students
              </h3>
              <PythonFileLoader
                fileModule={invoiceGenerator}
                title="invoice_receipt_generator.py"
                highlightLines={[8, 13, 21, 32]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON PITFALLS & MISTAKES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛑</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Beginner Pitfalls & Traps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Unescaped Apostrophe in Single Quotes
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">'Susmita's project'</code> causes a <code className="text-rose-400 font-bold">SyntaxError: unterminated string literal</code>. Wrap the string in double quotes <code className="font-mono text-slate-200">"Susmita's project"</code> or escape with <code className="font-mono text-slate-200">\'</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Accidental Escape Triggers in Windows Paths
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">"C:\notes\today.txt"</code> breaks because <code className="text-rose-400 font-mono">\n</code> is parsed as newline and <code className="text-rose-400 font-mono">\t</code> as tab. Always prefix with <code className="font-mono text-emerald-400 font-bold">r"C:\notes\today.txt"</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Odd Trailing Backslash in Raw Strings
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">r"C:\folder\"</code> is illegal and raises a SyntaxError because the trailing <code className="font-mono text-rose-300">\"</code> escapes the closing quote! Use <code className="font-mono text-slate-200">r"C:\folder" + "\\"</code> instead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: In-Place Mutation Assumption
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Attempting <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s[0] = 'H'</code> raises <code className="text-rose-400 font-bold">TypeError: 'str' object does not support item assignment</code>. Strings are strictly immutable; build a new string instead.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: PRO HINTS & MENTAL MODEL CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
              7. Professional Hints & Think-About Prompts
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-indigo-400 font-bold text-lg mt-0.5">💭</span>
              <div>
                <strong className="text-white">Think about:</strong> Why is <code className="text-indigo-300 font-mono">r"..."</code> universally recommended when writing Regular Expressions (<code className="text-indigo-300 font-mono">re</code> module)? Because without raw strings, matching a literal backslash requires four backslashes (<code className="text-indigo-300 font-mono">"\\\\"</code>) instead of two (<code className="text-indigo-300 font-mono">r"\\"</code>).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-cyan-400 font-bold text-lg mt-0.5">👁️</span>
              <div>
                <strong className="text-white">Observe carefully:</strong> Two adjacent string literals like <code className="text-cyan-300 font-mono">"Hello " "World"</code> are automatically concatenated at compile time by Python into <code className="text-cyan-300 font-mono">"Hello World"</code> with zero runtime overhead.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-lg mt-0.5">🧪</span>
              <div>
                <strong className="text-white">Try changing this:</strong> Try printing <code className="text-emerald-300 font-mono">"\u20B9 50,000"</code> and <code className="text-emerald-300 font-mono">"\U0001F680"</code> (Rocket emoji) in your Python script to observe native 16-bit and 32-bit Unicode decoding in action.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: COMPREHENSIVE FAQS (30 QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 0 • String Creation & Escape Sequences: Master Review & FAQ Library"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: PLAIN TEXT PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: String Creation & Escape Sequences Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic0_string_creation_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 10: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Remember: In Python, strings are immutable Unicode sequences. Use double quotes when your string contains an apostrophe, and always use raw strings (r'...') for Windows paths and regex patterns to prevent accidental escape triggers. When Susmita, Mamata, and Debangshu generate fee receipts in Barrackpore or Kolkata, always format monetary values with the Indian Rupee (₹ / \u20B9) symbol!"
          />
        </section>

      </div>
    </div>
  );
}
