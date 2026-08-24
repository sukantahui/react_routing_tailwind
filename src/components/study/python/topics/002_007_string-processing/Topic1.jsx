import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import immutabilityBasics from "./topic1_files/immutability_basics_and_id.py?raw";
import interningDemo from "./topic1_files/string_interning_and_identity.py?raw";
import joinBenchmark from "./topic1_files/concatenation_vs_join_benchmark.py?raw";
import auditLogSystem from "./topic1_files/immutable_audit_log_system.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: String Immutability & Memory Representation
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("rebinding");

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
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-purple-500/30 selection:text-purple-200">
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
          0%, 100% { filter: drop-shadow(0 0 4px rgba(168, 85, 247, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.8)); }
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-purple-950/80 text-purple-300 px-3 py-1 rounded-full border border-purple-800/80 shadow-sm shadow-purple-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/80 shadow-sm shadow-indigo-950/50">
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          String Immutability &amp; Memory Representation
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Uncovering CPython's internal memory architecture (PEP 393), pointer rebinding vs mutation, string interning (<code className="text-purple-400 font-mono">sys.intern</code>), and <span className="text-emerald-400 font-semibold">O(N)</span> memory allocation strategies.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Strictly Immutable
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧠 CPython Memory Layout (PEP 393)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ String Interning (sys.intern)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚀 join() vs += Complexity
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHAT IS IMMUTABILITY? */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔒</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. What is String Immutability?
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, strings are <strong className="text-white">immutable sequences</strong>. Once a string object is created in memory, its character contents, encoding flags, and size <strong className="text-purple-400">can never be modified, resized, or overwritten in place</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>❌</span> In-Place Mutation is Blocked
                </div>
                <p className="text-sm text-slate-300">
                  Attempting to change a character like <code className="text-rose-300 font-mono">s[0] = 'K'</code> instantly raises <code className="text-rose-400 font-mono">TypeError: 'str' object does not support item assignment</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-500">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg mb-2">
                  <span>🔄</span> Rebinding Creates New Objects
                </div>
                <p className="text-sm text-slate-300">
                  Writing <code className="text-indigo-300 font-mono">s = s + " World"</code> does not modify the original string; it allocates a brand-new string object at a new memory address (<code className="text-indigo-300 font-mono">id(s)</code> changes).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-purple-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Why Did Python Designers Make Strings Immutable?
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-300">
                <li><strong className="text-white">Hash Stability (Dictionary Keys &amp; Sets):</strong> Because strings cannot change, their hash value is immutable and computed only once, making dictionary lookups blistering fast and reliable.</li>
                <li><strong className="text-white">Thread Safety:</strong> Immutable strings can be read concurrently by dozens of threads without mutex locks or race condition risks.</li>
                <li><strong className="text-white">Security &amp; Sandboxing:</strong> File paths, database connection URLs, and auth tokens passed to operating system calls cannot be maliciously modified by untrusted code after validation.</li>
                <li><strong className="text-white">Memory Efficiency (String Interning):</strong> Identical string literals can safely share the same memory address across the entire application runtime.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: VISUAL ARCHITECTURE & MEMORY POINTERS (SVG) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing CPython Memory: Rebinding &amp; Interning
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("rebinding")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "rebinding"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Pointer Rebinding
              </button>
              <button
                onClick={() => setActiveInteractiveTab("interning")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "interning"
                    ? "bg-indigo-900/50 text-indigo-300 border border-indigo-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                String Interning &amp; PEP 393
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            In CPython, variable names are simply pointers to heap-allocated <code className="font-mono text-purple-400">PyASCIIObject</code> structures.
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "rebinding" ? (
              <svg viewBox="0 0 850 360" className="w-full h-auto min-w-[650px] font-sans">
                <defs>
                  <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Stack Reference */}
                <text x="30" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">1. STACK (VARIABLE REFERENCE)</text>
                
                <rect x="30" y="65" width="180" height="75" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="45" y="95" fill="#c084fc" fontSize="14" fontWeight="bold">Variable: name</text>
                <text x="45" y="120" fill="#94a3b8" fontSize="12">Initially points to: 0x10A</text>

                {/* Rebinding pointer note */}
                <rect x="30" y="170" width="180" height="130" rx="8" fill="#090d16" stroke="#475569" strokeWidth="1" />
                <text x="42" y="195" fill="#38bdf8" fontSize="12" fontWeight="bold">Rebinding Statement:</text>
                <text x="42" y="220" fill="#f8fafc" fontSize="12" fontStyle="italic">name = name + " Roy"</text>
                <text x="42" y="250" fill="#94a3b8" fontSize="11">Pointer re-routed to 0x48F.</text>
                <text x="42" y="275" fill="#fca5a5" fontSize="11">0x10A is UNTOUCHED!</text>

                {/* Heap Objects */}
                <text x="320" y="35" fill="#94a3b8" fontSize="13" fontWeight="bold">2. HEAP MEMORY (IMMUTABLE STRING OBJECTS)</text>

                {/* Initial String Object at 0x10A */}
                <rect x="320" y="65" width="480" height="100" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <text x="340" y="92" fill="#94a3b8" fontSize="12" fontWeight="bold">Memory Address: <tspan fill="#a855f7">0x10A (PyASCIIObject)</tspan></text>
                <rect x="340" y="105" width="440" height="42" rx="6" fill="#090d16" stroke="#334155" />
                <text x="355" y="132" fill="#f8fafc" fontSize="13" fontWeight="bold">Length: 7 | Hash: 0x89A... | Characters: ['S', 'u', 's', 'm', 'i', 't', 'a']</text>

                {/* New Rebound String Object at 0x48F */}
                <rect x="320" y="195" width="480" height="100" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="340" y="222" fill="#94a3b8" fontSize="12" fontWeight="bold">New Memory Address: <tspan fill="#34d399">0x48F (Newly Allocated String)</tspan></text>
                <rect x="340" y="235" width="440" height="42" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="355" y="262" fill="#ffffff" fontSize="13" fontWeight="bold">Length: 11 | Hash: 0xCF1... | Characters: ['S', 'u', 's', 'm', 'i', 't', 'a', ' ', 'R', 'o', 'y']</text>

                {/* Connecting Pointer Arrows */}
                <path d="M 210 102 L 320 102" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                <text x="220" y="92" fill="#c084fc" fontSize="10">Old Ref</text>

                <path d="M 210 120 L 260 120 L 260 245 L 320 245" stroke="#10b981" strokeWidth="3" fill="none" />
                <text x="225" y="235" fill="#34d399" fontSize="11" fontWeight="bold">Active Ref</text>

                {/* Footer summary */}
                <text x="320" y="325" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  ✓ Original "Susmita" string is 100% unchanged. Python allocated a brand-new object at 0x48F.
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                {/* Interning Visualization */}
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">CPython String Interning: Shared Memory Table</text>

                {/* Variable a and b */}
                <rect x="30" y="65" width="190" height="80" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="45" y="95" fill="#818cf8" fontSize="14" fontWeight="bold">Variable: city_a</text>
                <text x="45" y="125" fill="#cbd5e1" fontSize="12">city_a = "barrackpore"</text>

                <rect x="30" y="165" width="190" height="80" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="45" y="195" fill="#818cf8" fontSize="14" fontWeight="bold">Variable: city_b</text>
                <text x="45" y="225" fill="#cbd5e1" fontSize="12">city_b = "barrackpore"</text>

                {/* Shared Intern Pool Object */}
                <rect x="340" y="85" width="460" height="140" rx="12" fill="#090d16" stroke="#10b981" strokeWidth="2" />
                <text x="360" y="115" fill="#34d399" fontSize="14" fontWeight="bold">GLOBAL INTERNED POOL (Single Shared Object)</text>
                <text x="360" y="140" fill="#94a3b8" fontSize="12">Address: 0x7FFF904 | RefCount: 2 | Type: PyASCIIObject (1-byte Compact ASCII)</text>
                
                <rect x="360" y="155" width="420" height="45" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="375" y="183" fill="#f8fafc" fontSize="13" fontMono="true">Value: "barrackpore" (11 Bytes Payload)</text>

                {/* Arrows pointing to shared object */}
                <path d="M 220 105 L 340 135" stroke="#10b981" strokeWidth="2.5" fill="none" />
                <path d="M 220 205 L 340 175" stroke="#10b981" strokeWidth="2.5" fill="none" />

                {/* Conclusion badge */}
                <text x="340" y="265" fill="#34d399" fontSize="13" fontWeight="bold">
                  ✓ city_a is city_b evaluates to TRUE! (Pointer comparison O(1) in CPU cache)
                </text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CPYTHON PEP 393 MEMORY EFFICIENCY TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. PEP 393: Flexible String Representation
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Prior to Python 3.3, Python allocated 4 bytes per character for all strings if compiled with UCS-4. Under <strong className="text-white">PEP 393</strong>, CPython inspects the maximum character code point and dynamically selects the most compact byte width:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 bg-slate-950/50">
                  <th className="p-3 font-semibold">Kind / Encoding</th>
                  <th className="p-3 font-semibold">Max Codepoint</th>
                  <th className="p-3 font-semibold">Bytes per Char</th>
                  <th className="p-3 font-semibold">Real-World Example</th>
                  <th className="p-3 font-semibold">Memory Overhead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-purple-400 font-bold">PyUnicode_1BYTE_KIND</td>
                  <td className="p-3 font-mono text-slate-400">&lt; 256 (ASCII / Latin-1)</td>
                  <td className="p-3 font-bold text-emerald-400">1 Byte</td>
                  <td className="p-3 font-mono text-xs text-slate-300">"Barrackpore", "Susmita"</td>
                  <td className="p-3 text-emerald-400">Minimal (~49B header + 1B/char)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-indigo-400 font-bold">PyUnicode_2BYTE_KIND</td>
                  <td className="p-3 font-mono text-slate-400">&lt; 65,536 (UCS-2)</td>
                  <td className="p-3 font-bold text-sky-400">2 Bytes</td>
                  <td className="p-3 font-mono text-xs text-slate-300">"₹ 4,500", "নমস্কার"</td>
                  <td className="p-3 text-sky-400">Compact (~72B header + 2B/char)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-rose-400 font-bold">PyUnicode_4BYTE_KIND</td>
                  <td className="p-3 font-mono text-slate-400">&gt;= 65,536 (UCS-4)</td>
                  <td className="p-3 font-bold text-amber-400">4 Bytes</td>
                  <td className="p-3 font-mono text-xs text-slate-300">"Python 🚀 🔥"</td>
                  <td className="p-3 text-amber-400">Standard (~72B header + 4B/char)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD PRODUCTION SCENARIOS */}
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
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛡️</span> 1. Immutable Audit Ledgers in Indian Rupees (₹)
              </div>
              <p className="text-sm text-slate-300">
                At <strong className="text-purple-400">Coder &amp; AccoTax Barrackpore</strong>, tuition payment records for students like Susmita, Mamata, and Debangshu are logged as cryptographically signed immutable strings. No rogue script can alter historical fees or audit timestamps in memory.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🚀</span> 2. High-Throughput API Gateway Token Interning
              </div>
              <p className="text-sm text-slate-300">
                In FastAPI/Django backends serving 50,000 requests/sec across Kolkata servers, applying <code className="text-indigo-300 font-mono">sys.intern()</code> on repeated header keys allows instant pointer comparisons (<code className="text-emerald-400 font-mono">O(1)</code>) instead of character-by-character string comparisons.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📊</span> 3. Big Data Pipelines: Eliminating O(N²) Slowdowns
              </div>
              <p className="text-sm text-slate-300">
                Processing 1,000,000 log records using naive <code className="text-rose-400 font-mono">+=</code> concatenation exhausts memory and crashes due to repeated allocations. Using <code className="text-emerald-400 font-mono">''.join(records)</code> pre-computes buffer capacity and finishes in milliseconds.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔑</span> 4. Thread-Safe Dictionary Key Stability
              </div>
              <p className="text-sm text-slate-300">
                Caching systems rely on string keys like <code className="text-amber-300 font-mono">"user:susmita:profile"</code>. Immutability guarantees the cached <code className="font-mono text-slate-200">hash()</code> never drifts, ensuring rock-solid hash table lookups in concurrent environments.
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
                Demo 1: Immutability, TypeError on Mutation &amp; id() Address Tracking
              </h3>
              <PythonFileLoader
                fileModule={immutabilityBasics}
                title="immutability_basics_and_id.py"
                highlightLines={[8, 12, 19, 27]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 2: String Interning, Memory Identity (is vs ==) &amp; sys.intern()
              </h3>
              <PythonFileLoader
                fileModule={interningDemo}
                title="string_interning_and_identity.py"
                highlightLines={[12, 13, 23, 31]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 3: Benchmarking O(N²) Loop Concatenation vs High-Speed ''.join()
              </h3>
              <PythonFileLoader
                fileModule={joinBenchmark}
                title="concatenation_vs_join_benchmark.py"
                highlightLines={[10, 15, 20, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo 4: Real-World Immutable Student Fee Audit Ledger in Indian Rupees (₹)
              </h3>
              <PythonFileLoader
                fileModule={auditLogSystem}
                title="immutable_audit_log_system.py"
                highlightLines={[7, 16, 20, 24]}
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
              6. Common Beginner Pitfalls &amp; Traps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Attempting In-Place Character Replacement
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s[0] = 'H'</code> fails. To replace characters, construct a new string via slicing: <code className="font-mono text-slate-200">s = 'H' + s[1:]</code> or convert to a mutable <code className="font-mono text-slate-200">list(s)</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Using 'is' Instead of '==' for Value Comparison
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Relying on <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">if user_input is "admin":</code> causes subtle bugs. Dynamic strings may have identical characters but different memory addresses. Always use <code className="font-mono text-emerald-400 font-bold">==</code> for content equality.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Accumulating Large Strings with '+='
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Appending strings inside a 10,000-iteration loop with <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">+=</code> creates thousands of throwaway string objects, causing GC thrashing. Collect in a list and call <code className="font-mono text-emerald-400 font-bold">''.join(list)</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Expecting Function Mutability on String Arguments
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Passing a string into a function and calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">param = param.strip()</code> only rebinds the local parameter. The caller's variable remains unchanged unless the return value is assigned.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">
              7. Professional Hints &amp; Think-About Prompts
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-purple-400 font-bold text-lg mt-0.5">💭</span>
              <div>
                <strong className="text-white">Think about:</strong> Why can a string be used as a dictionary key while a list cannot? Because strings are immutable, guaranteeing a stable, unchangeable <code className="text-purple-300 font-mono">hash()</code> value throughout program execution.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-indigo-400 font-bold text-lg mt-0.5">👁️</span>
              <div>
                <strong className="text-white">Observe carefully:</strong> When you slice a string <code className="text-indigo-300 font-mono">sub = s[0:5]</code>, Python allocates a new string object in memory. If you need zero-copy memory views on binary data without copying, use <code className="text-indigo-300 font-mono">memoryview(bytes_data)</code>.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-lg mt-0.5">🧪</span>
              <div>
                <strong className="text-white">Try changing this:</strong> Run <code className="text-emerald-300 font-mono">import sys; print(sys.getsizeof('A'), sys.getsizeof('₹'), sys.getsizeof('🚀'))</code> to verify PEP 393 adaptive 1-byte, 2-byte, and 4-byte encoding tiers firsthand.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: COMPREHENSIVE FAQS (30 QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 1 • String Immutability &amp; Memory Architecture: Master Review &amp; FAQ Library"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: PLAIN TEXT PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: String Immutability &amp; Memory Architecture Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic1_string_immutability_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 10: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Remember: In Python, strings are 100% immutable! When Susmita, Mamata, and Debangshu write production pipelines in Barrackpore or Kolkata, NEVER use '+=' inside loops — always collect string tokens in a list and call ''.join(list). It saves massive memory and runs in lightning-fast O(N) time!"
          />
        </section>

      </div>
    </div>
  );
}
