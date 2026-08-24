import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import setBasics from "./topic0_files/set_intro_basics.py?raw";
import setUniqueness from "./topic0_files/set_uniqueness_demo.py?raw";
import setCreation from "./topic0_files/set_creation_types.py?raw";
import setMembership from "./topic0_files/set_membership_lookup.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Introduction to Sets in Python
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("hash");

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
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.8)); }
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_006
          </span>
          <span className="text-xs sm:text-sm font-mono bg-sky-950/80 text-sky-300 px-3 py-1 rounded-full border border-sky-800/80 shadow-sm shadow-sky-950/50">
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Core Data Structures
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Introduction to Sets in Python
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Unlocking high-speed <span className="text-emerald-400 font-semibold">O(1)</span> lookups, automatic deduplication, and mathematical set theory with Python's hash-powered collection.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Guaranteed Uniqueness
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ O(1) Hash Table Lookup
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Hashable Elements Only
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Mutable Container
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHAT IS A SET? (THEORY & FOUNDATIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💎</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. What is a Set in Python?
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, a <strong className="text-white">Set</strong> is an <em>unordered</em>, <em>unindexed</em>, and <em>mutable</em> collection of <strong className="text-emerald-400">unique</strong>, <strong className="text-sky-400">immutable (hashable)</strong> items. Modeled directly on the mathematical concept of sets, it serves two foundational purposes in modern software engineering:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>✨</span> Automatic Deduplication
                </div>
                <p className="text-sm text-slate-300">
                  Duplicates are strictly prohibited. Any redundant element entered into a set is silently and automatically stripped away in <span className="font-semibold text-emerald-400">O(1)</span> time without errors.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-sky-950/40 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-sky-500">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg mb-2">
                  <span>⚡</span> Ultra-Fast Membership Testing
                </div>
                <p className="text-sm text-slate-300">
                  Checking if an item exists (<code className="text-sky-300 font-mono">x in s</code>) executes in <strong className="text-white">O(1) average time</strong>, compared to scanning sequentially through a list in <span className="font-semibold text-amber-400">O(N) time</span>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Core Rules of Python Sets (The 4 Pillars):
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-300">
                <li><strong className="text-white">No Duplicates:</strong> Every member must be completely distinct.</li>
                <li><strong className="text-white">Unordered:</strong> Elements do not maintain an insertion order or fixed index. Slicing (<code className="font-mono text-emerald-400">s[0:2]</code>) is not supported.</li>
                <li><strong className="text-white">Mutable Container:</strong> You can add or remove elements after the set has been created.</li>
                <li><strong className="text-white">Hashable Elements:</strong> Elements inside must be immutable (numbers, strings, tuples, frozensets). Mutable objects like lists, dictionaries, or other sets cannot be members.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: VISUAL ARCHITECTURE & HASH TABLE MECHANICS (SVG DIAGRAM) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. How Sets Work Under the Hood
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("hash")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hash"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hash Table Architecture
              </button>
              <button
                onClick={() => setActiveInteractiveTab("complexity")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "complexity"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Set vs List Search Time
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Sets are implemented internally using <strong className="text-white">open-addressing hash tables</strong>. When an element is added, Python passes it to <code className="font-mono text-emerald-400">hash()</code> to compute its bucket address.
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "hash" ? (
              <svg viewBox="0 0 850 360" className="w-full h-auto min-w-[650px] font-sans">
                {/* Background Grid Accent */}
                <defs>
                  <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Input Stream */}
                <text x="30" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">1. RAW INPUT STREAM</text>
                
                {/* Items entering */}
                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="60" width="130" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="86" fill="#f8fafc" fontSize="13" fontWeight="600">"Susmita" (1st)</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="115" width="130" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="141" fill="#f8fafc" fontSize="13" fontWeight="600">"Debangshu"</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="170" width="130" height="42" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="45" y="196" fill="#fca5a5" fontSize="13" fontWeight="600">"Susmita" (Dupe!)</text>
                </g>

                <g className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  <rect x="30" y="225" width="130" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="45" y="251" fill="#f8fafc" fontSize="13" fontWeight="600">"Mamata"</text>
                </g>

                {/* Hash Function Box */}
                <rect x="230" y="75" width="150" height="180" rx="12" fill="#090d16" stroke="#0ea5e9" strokeWidth="2" />
                <text x="252" y="110" fill="#38bdf8" fontSize="14" fontWeight="bold">2. HASH ENGINE</text>
                <text x="250" y="135" fill="#94a3b8" fontSize="12">hash("Susmita") → 4</text>
                <text x="250" y="165" fill="#94a3b8" fontSize="12">hash("Debangshu") → 1</text>
                <text x="250" y="195" fill="#fca5a5" fontSize="12">hash("Susmita") → 4</text>
                <text x="250" y="225" fill="#94a3b8" fontSize="12">hash("Mamata") → 7</text>

                {/* Arrows Connecting */}
                <path d="M 160 81 L 230 115" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <path d="M 160 136 L 230 145" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <path d="M 160 191 L 230 195" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <path d="M 160 246 L 230 225" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Internal Hash Buckets */}
                <text x="450" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">3. INTERNAL HASH BUCKET ARRAY</text>

                {/* Bucket 0 */}
                <rect x="450" y="55" width="370" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="465" y="77" fill="#64748b" fontSize="12" fontWeight="bold">Bucket [0]:</text>
                <text x="550" y="77" fill="#64748b" fontSize="12">&lt;EMPTY&gt;</text>

                {/* Bucket 1: Debangshu */}
                <rect x="450" y="95" width="370" height="34" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                <text x="465" y="117" fill="#34d399" fontSize="12" fontWeight="bold">Bucket [1]:</text>
                <text x="550" y="117" fill="#f8fafc" fontSize="12" fontWeight="600">"Debangshu"</text>
                <text x="730" y="117" fill="#10b981" fontSize="11">✓ Stored</text>

                {/* Bucket 2 */}
                <rect x="450" y="135" width="370" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="465" y="157" fill="#64748b" fontSize="12" fontWeight="bold">Bucket [2]:</text>
                <text x="550" y="157" fill="#64748b" fontSize="12">&lt;EMPTY&gt;</text>

                {/* Bucket 3 */}
                <rect x="450" y="175" width="370" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="465" y="197" fill="#64748b" fontSize="12" fontWeight="bold">Bucket [3]:</text>
                <text x="550" y="197" fill="#64748b" fontSize="12">&lt;EMPTY&gt;</text>

                {/* Bucket 4: Susmita */}
                <rect x="450" y="215" width="370" height="34" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                <text x="465" y="237" fill="#34d399" fontSize="12" fontWeight="bold">Bucket [4]:</text>
                <text x="550" y="237" fill="#f8fafc" fontSize="12" fontWeight="600">"Susmita"</text>
                <text x="680" y="237" fill="#ef4444" fontSize="11">⚡ Dupe rejected!</text>

                {/* Bucket 7: Mamata */}
                <rect x="450" y="255" width="370" height="34" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                <text x="465" y="277" fill="#34d399" fontSize="12" fontWeight="bold">Bucket [7]:</text>
                <text x="550" y="277" fill="#f8fafc" fontSize="12" fontWeight="600">"Mamata"</text>
                <text x="730" y="277" fill="#10b981" fontSize="11">✓ Stored</text>

                {/* Output Final Set */}
                <rect x="450" y="305" width="370" height="42" rx="8" fill="url(#gradEmerald)" />
                <text x="465" y="331" fill="#ffffff" fontSize="13" fontWeight="bold">
                  Final Output Set: {'{"Debangshu", "Susmita", "Mamata"}'} (Len: 3)
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                {/* List Lookup vs Set Lookup */}
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Time Complexity: List vs Set Membership Search</text>

                {/* List Container */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="50" y="95" fill="#fbbf24" fontSize="14" fontWeight="bold">List Search: O(N) Linear Scan</text>
                <text x="50" y="125" fill="#cbd5e1" fontSize="13">target = "Mamata"</text>

                <rect x="50" y="145" width="60" height="36" rx="4" fill="#334155" />
                <text x="60" y="168" fill="#94a3b8" fontSize="11">Step 1 ✗</text>

                <rect x="120" y="145" width="60" height="36" rx="4" fill="#334155" />
                <text x="130" y="168" fill="#94a3b8" fontSize="11">Step 2 ✗</text>

                <rect x="190" y="145" width="60" height="36" rx="4" fill="#334155" />
                <text x="200" y="168" fill="#94a3b8" fontSize="11">Step 3 ✗</text>

                <rect x="260" y="145" width="80" height="36" rx="4" fill="#059669" />
                <text x="270" y="168" fill="#ffffff" fontSize="11">Step N (Found!)</text>

                <text x="50" y="220" fill="#94a3b8" fontSize="12">If list has 1,000,000 items, Python may check</text>
                <text x="50" y="240" fill="#fca5a5" fontSize="12" fontWeight="bold">up to 1,000,000 slots one by one!</text>

                {/* Set Container */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Set Search: O(1) Instant Hash Jump</text>
                <text x="460" y="125" fill="#cbd5e1" fontSize="13">target = "Mamata"</text>

                <rect x="460" y="145" width="340" height="40" rx="6" fill="#090d16" stroke="#0ea5e9" strokeWidth="1" />
                <text x="475" y="170" fill="#38bdf8" fontSize="12" fontWeight="bold">hash("Mamata") → directly jumps to Bucket [7]!</text>

                <text x="460" y="220" fill="#94a3b8" fontSize="12">Even with 100,000,000 items in the set,</text>
                <text x="460" y="240" fill="#34d399" fontSize="12" fontWeight="bold">lookup takes exactly 1 step on average!</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CREATING SETS & THE EMPTY SET TRAP */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Set Creation Syntax & The Empty Set Trap
            </h2>
          </div>

          <div className="space-y-6 text-slate-300">
            <p className="text-base sm:text-lg leading-relaxed">
              Sets can be created in Python through two primary avenues: <strong className="text-white">Set Literals</strong> using curly braces <code className="font-mono text-emerald-400">{"{ ... }"}</code>, or by passing any iterable into the <code className="font-mono text-emerald-400">set()</code> constructor.
            </p>

            {/* Crucial Alert: The Empty Set Trap */}
            <div className="p-5 rounded-xl bg-amber-950/40 border-l-4 border-amber-500 border border-amber-800/60 text-amber-200">
              <div className="flex items-center gap-2 font-bold text-lg mb-1">
                <span>⚠️</span> The #1 Beginner Trap: Empty Set Creation
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-amber-200/90">
                Writing <code className="font-mono font-bold bg-amber-900/50 px-2 py-0.5 rounded text-amber-300">s = {"{}"}</code> does <strong className="text-white">NOT</strong> create an empty set. It creates an empty <strong className="text-white">Dictionary</strong> (<code className="font-mono">&lt;class 'dict'&gt;</code>). You <strong className="text-white">MUST</strong> use <code className="font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">s = set()</code> to instantiate an empty set!
              </p>
            </div>

            {/* Python Code Loader: Creation Mechanisms */}
            <div className="mt-4">
              <PythonFileLoader
                fileModule={setCreation}
                title="set_creation_types.py"
                highlightLines={[5, 8, 13, 17, 22]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD USE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌍</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Industry Scenarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Scenario 1 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🏫</span> 1. School Registration Deduplication
              </div>
              <p className="text-sm text-slate-300">
                When Mamata and Debangshu import 5,000 admission records from schools across <strong className="text-emerald-400">Barrackpore</strong> and <strong className="text-emerald-400">Ichapur</strong>, converting raw student roll numbers to a set instantly identifies exact unique headcounts for exam desk allocations.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔐</span> 2. High-Speed Role Permission Guards
              </div>
              <p className="text-sm text-slate-300">
                In a web server gateway handling 100,000 API requests per second, checking <code className="font-mono text-sky-400">if user_role in ALLOWED_ADMIN_ROLES</code> executes in instantaneous <span className="font-semibold text-emerald-400">O(1)</span> time without taxing CPU cycles.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🏷️</span> 3. Tag & Keyword Indexing in Publishing
              </div>
              <p className="text-sm text-slate-300">
                Article tag management systems store hashtags like <code className="font-mono text-purple-400">{"{'python', 'backend', 'kolkata'}"}</code>. Sets make finding overlapping common tags between articles effortless and lightning fast.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🕷️</span> 4. Web Crawler Visited URL Tracking
              </div>
              <p className="text-sm text-slate-300">
                Web crawlers maintain a set of visited links. Before crawling a new webpage, an <span className="font-semibold text-emerald-400">O(1)</span> check prevents scraping the same URL twice, saving network bandwidth and preventing infinite recursion loops.
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
                Example A: Set Creation & Automatic Duplicate Pruning
              </h3>
              <PythonFileLoader
                fileModule={setBasics}
                title="set_intro_basics.py"
                highlightLines={[6, 12, 17, 22]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Example B: Real-World Exam Registration Deduplication & Revenue in Rupees (₹)
              </h3>
              <PythonFileLoader
                fileModule={setUniqueness}
                title="set_uniqueness_demo.py"
                highlightLines={[12, 17, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Example C: High-Velocity Access Control & Role Lookup
              </h3>
              <PythonFileLoader
                fileModule={setMembership}
                title="set_membership_lookup.py"
                highlightLines={[6, 10, 17]}
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
                ❌ Pitfall 1: Placing Lists Inside Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s = {"{[1, 2], [3, 4]}"}</code> raises <code className="text-rose-400 font-bold">TypeError: unhashable type: 'list'</code>. Use immutable tuples <code className="font-mono text-slate-200">{"{(1, 2), (3, 4)}"}</code> instead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Attempting Index Subscripting
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">first_item = my_set[0]</code> raises <code className="text-rose-400 font-bold">TypeError: 'set' object is not subscriptable</code>. Sets do not have indices.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Assuming Fixed Print Order
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Set iteration order is non-deterministic and can vary between Python runs due to randomized string hash seeds. Never rely on set order for sequence-dependent logic.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: True / 1 Collisions
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Since in Python <code className="font-mono text-slate-200">True == 1</code> and <code className="font-mono text-slate-200">hash(True) == hash(1)</code>, creating <code className="font-mono text-slate-200">{"{1, True}"}</code> keeps only <code className="font-mono text-emerald-400">{"{1}"}</code>. Remember that booleans are integers under the hood.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-400">
              7. Professional Hints & Think-About Prompts
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-lg mt-0.5">💭</span>
              <div>
                <strong className="text-white">Think about:</strong> When Susmita needs to preserve the original insertion order while removing duplicates, what is the cleanest Python one-liner? (<em>Hint: <code className="text-emerald-300 font-mono">list(dict.fromkeys(raw_list))</code></em>).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg mt-0.5">👁️</span>
              <div>
                <strong className="text-white">Observe carefully:</strong> Why does <code className="text-sky-300 font-mono">len(set("banana"))</code> evaluate to 3? Because the unique letters are <code className="text-sky-300 font-mono">'b'</code>, <code className="text-sky-300 font-mono">'a'</code>, and <code className="text-sky-300 font-mono">'n'</code>.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-amber-400 font-bold text-lg mt-0.5">🧪</span>
              <div>
                <strong className="text-white">Try changing this:</strong> Try creating <code className="text-amber-300 font-mono">s = {"{10, (1, 2), True}"}</code> and notice how Python effortlessly stores composite immutable tuples inside sets.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Introduction to Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic0_intro_to_sets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: COMPREHENSIVE FAQS (30 QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 0 • Introduction to Sets: Master Review & FAQ Library"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 10: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Remember: Sets are powered by hash tables under the hood. Always use set() for an empty set, never {}. When Susmita, Abhronila, and Debangshu need ultra-fast O(1) duplicate checks or permission checks in Barrackpore or Kolkata, sets are your ultimate weapon!"
          />
        </section>

      </div>
    </div>
  );
}
