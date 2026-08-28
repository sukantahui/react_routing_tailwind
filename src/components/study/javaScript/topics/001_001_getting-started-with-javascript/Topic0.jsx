import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/WhatIsJavascriptAndWhereItRunsDemo.js?raw";

export default function Topic0() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* ─── 1. HEADER SECTION ──────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_001_getting-started-with-javascript · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"What is JavaScript and Where It Runs?"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deconstruct the fundamental architecture of the world&apos;s most widely deployed language. Explore the V8 engine compilation pipeline, memory allocation models, and host execution environments from web browsers to cloud runtimes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">Course Code: JS-PRO-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* ─── 2. CONCEPT OVERVIEW ────────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Discussion &amp; Conceptual Foundation
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              JavaScript is a high-level, dynamically typed, multi-paradigm, prototype-based language designed with first-class functions and single-threaded asynchronous non-blocking event loop concurrency. Created in May 1995 by Brendan Eich at Netscape in just 10 days, it was formally standardized under the <strong className="text-amber-300">ECMAScript (ECMA-262)</strong> specification and has evolved from a simple client-side browser script into the universal foundation of modern software engineering.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Unlike purely interpreted languages, modern JavaScript executes via <strong className="text-sky-300">Just-In-Time (JIT) compilation</strong> engines (such as Google V8, Apple JavaScriptCore, and Mozilla SpiderMonkey). Code is parsed into an Abstract Syntax Tree (AST), translated into bytecode by an interpreter (e.g. V8 Ignition), profiled with runtime type feedback, and compiled into native C++-speed machine instructions by optimizing compilers (e.g. V8 TurboFan).
            </p>

            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During a lab session at our Barrackpore center, student <strong>Swadeep</strong> copied code meant for Node.js into a browser script and wondered why <code>process.env</code> threw a <code>ReferenceError</code>. Mentor <strong>Sukanta Hui</strong> demonstrated on the whiteboard that while the JavaScript core syntax is identical, the host environment supplies different APIs: browsers provide <code>window</code>, <code>document</code>, and Web APIs, whereas server runtimes like Node.js and Bun supply <code>process</code>, <code>fs</code>, and operating system sockets.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> JavaScript V8 Engine &amp; Host Runtime Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 850 280" className="w-full h-auto" role="img" aria-label="JavaScript Engine JIT & Memory Architecture">
                <defs>
                  <linearGradient id="v8Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="optGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="heapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect width="850" height="280" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="425" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">V8 Engine Execution Pipeline &amp; Host Environment Interop</text>

                {/* V8 Pipeline Box */}
                <g transform="translate(30, 50)">
                  <rect width="460" height="210" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="230" y="24" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Google V8 Engine (ECMA-262 Core)</text>
                  
                  {/* Step 1: Parser */}
                  <rect x="20" y="40" width="120" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" />
                  <text x="80" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Lexer &amp; Parser</text>
                  <text x="80" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">Source → AST Tree</text>

                  {/* Arrow 1 */}
                  <path d="M 140 65 L 165 65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 2: Ignition */}
                  <rect x="170" y="40" width="120" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" />
                  <text x="230" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">2. Ignition</text>
                  <text x="230" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">Fast Bytecode Stream</text>

                  {/* Arrow 2 */}
                  <path d="M 290 65 L 315 65" stroke="#10b981" strokeWidth="2" />

                  {/* Step 3: TurboFan */}
                  <rect x="320" y="40" width="120" height="50" rx="8" fill="url(#optGrad)" stroke="#10b981" />
                  <text x="380" y="60" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">3. TurboFan JIT</text>
                  <text x="380" y="78" fill="#d1fae5" fontSize="9" textAnchor="middle">Optimized Machine Code</text>

                  {/* Memory Subsystem */}
                  <rect x="20" y="105" width="200" height="85" rx="8" fill="#0f172a" stroke="#64748b" />
                  <text x="120" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Call Stack (Primitives &amp; Frames)</text>
                  <text x="120" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">let student = &quot;Swadeep&quot;</text>
                  <text x="120" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">let roll = 101 (LIFO Stack)</text>

                  <rect x="240" y="105" width="200" height="85" rx="8" fill="url(#heapGrad)" stroke="#a855f7" />
                  <text x="340" y="125" fill="#f3e8ff" fontSize="10" fontWeight="bold" textAnchor="middle">Memory Heap (Objects / GC)</text>
                  <text x="340" y="145" fill="#e9d5ff" fontSize="9" textAnchor="middle">&#123; course: &quot;JS-PRO-101&quot; &#125;</text>
                  <text x="340" y="165" fill="#c084fc" fontSize="9" textAnchor="middle">Garbage Collector (Mark &amp; Sweep)</text>
                </g>

                {/* Host Environments Box */}
                <g transform="translate(520, 50)">
                  <rect width="300" height="210" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="150" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Host Execution Environments</text>

                  {/* Browser Box */}
                  <rect x="15" y="40" width="270" height="68" rx="8" fill="#0f172a" stroke="#0ea5e9" />
                  <text x="25" y="58" fill="#38bdf8" fontSize="11" fontWeight="bold">🌐 Web Browser (Client Host)</text>
                  <text x="25" y="75" fill="#94a3b8" fontSize="9">Global: window · document · DOM Tree</text>
                  <text x="25" y="90" fill="#64748b" fontSize="9">Web APIs: fetch(), localStorage, WebSockets</text>

                  {/* Server Box */}
                  <rect x="15" y="120" width="270" height="70" rx="8" fill="#0f172a" stroke="#10b981" />
                  <text x="25" y="138" fill="#34d399" fontSize="11" fontWeight="bold">🟢 Node.js / Deno / Bun (Server Host)</text>
                  <text x="25" y="155" fill="#94a3b8" fontSize="9">Global: global / globalThis · process</text>
                  <text x="25" y="170" fill="#64748b" fontSize="9">OS APIs: fs (Filesystem), net, crypto, streams</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.1: Complete architectural relationship between ECMAScript core V8 compilation and Host Platform APIs.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How, Spec Invariants &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Under the ECMAScript 2024 (ECMA-262) specification, JavaScript execution is governed by discrete <strong className="text-amber-300">Execution Contexts</strong>, containing an <em>Environment Record</em>, a <em>Lexical Environment</em>, and dynamic memory bindings. When executing, the engine distinguishes fundamentally between primitive stack values and reference heap structures.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Execution Phase / Layer</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Rule</th>
                    <th className="p-3 border border-slate-800">Runtime / V8 Engine Behavior</th>
                    <th className="p-3 border border-slate-800">Developer Best Practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">1. Parsing &amp; AST Generation</td>
                    <td className="p-3 text-slate-300 font-sans">Source text converted to tokens and verified against formal grammar</td>
                    <td className="p-3 text-amber-300 font-sans">Eager parsing for top-level code; lazy parsing for nested function bodies</td>
                    <td className="p-3 text-emerald-400 font-sans">Avoid massive monolithic files; leverage modular tree-shakable ES modules</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">2. Ignition Bytecode Execution</td>
                    <td className="p-3 text-slate-300 font-sans">Evaluates opcodes and mutates Lexical Environments in execution frame</td>
                    <td className="p-3 text-amber-300 font-sans">Populates Inline Caches (ICs) with property shape feedback</td>
                    <td className="p-3 text-emerald-400 font-sans">Initialize object fields in consistent order to preserve monomorphic shapes</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">3. TurboFan JIT Optimization</td>
                    <td className="p-3 text-slate-300 font-sans">Inlines function call sites and eliminates redundant type assertions</td>
                    <td className="p-3 text-amber-300 font-sans">Compiles hot loops into direct x86/ARM64 assembly instructions</td>
                    <td className="p-3 text-emerald-400 font-sans">Keep functions small, pure, and avoid passing mixed primitive types</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-bold">4. Garbage Collection (GC)</td>
                    <td className="p-3 text-slate-300 font-sans">Reclaims memory unreachable from root execution objects</td>
                    <td className="p-3 text-amber-300 font-sans">Scavenger algorithm for Young Generation; Mark-Sweep-Compact for Old Gen</td>
                    <td className="p-3 text-emerald-400 font-sans">Clean up timers, DOM event listeners, and avoid global variable leaks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Runtime Pitfalls to Know
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">ReferenceError on Host APIs:</strong> Attempting to access <code>window</code> in Node.js or <code>process</code> in browser scripts throws an unrecoverable <code>ReferenceError</code>.</li>
                <li><strong className="text-amber-300">Single-Threaded CPU Starvation:</strong> Running heavy synchronous loops blocks the Call Stack, preventing browser paint cycles and freezing the user interface.</li>
                <li><strong className="text-sky-300">typeof null === &quot;object&quot;:</strong> An infamous legacy bug from JavaScript 1.0 that persists to preserve web backward compatibility.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 5. HANDS-ON MONACO CODE RUNNER ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <span>💻</span> Interactive Monaco Playground: 5+ Practical Working Examples
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
              Live In-Browser Execution
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <JavaScriptEditableCodeBlock
              initialCode={demoCode}
              title="WhatIsJavascriptAndWhereItRunsDemo.js"
            />
          </div>
        </section>

        {/* ─── 6. COMMON PITFALLS & BEST PRACTICES ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anti-pattern */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Hardcoding Host Global Objects</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Directly accessing <code>window</code> or <code>global</code> makes libraries and utility modules non-portable across Next.js SSR, Web Workers, or Node.js services.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Crashes in Node.js / SSR
function getSessionToken() {
  return window.localStorage.getItem("token"); // ReferenceError in SSR!
}`}
              </pre>
            </div>

            {/* Best Practice */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro: Universal Environment Guard</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use <code>globalThis</code> or defensive type guards to inspect available runtime host capabilities before execution.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Safe Universal Guard
function getSessionToken() {
  if (typeof globalThis.localStorage !== "undefined") {
    return globalThis.localStorage.getItem("token");
  }
  return null; // Safe fallback for server-side
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── 7. 💎 JAVASCRIPT HIDDEN GEMS & PRO TRICKS ──────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-purple-950/20 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xl shadow-md">
                💎
              </span>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  JavaScript Hidden Gem &amp; Senior Pro Secret
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Universal globalThis &amp; DevTools Memory Profiling
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Standardized in ES2020, <code>globalThis</code> guarantees access to the root context across browsers, Node.js, Deno, Bun, and Web Workers. Additionally, in Chrome DevTools, you can inspect hidden V8 properties using <code>console.table()</code> and examine live object references with precision.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR PRO SECRET: Universal Environment Feature Map
const runtimeCapabilities = {
  isBrowser: typeof window !== "undefined",
  isNode: typeof process !== "undefined" && !!process.versions?.node,
  hasCrypto: typeof globalThis.crypto?.subtle !== "undefined",
  engine: navigator?.userAgent?.includes("Chrome") ? "V8" : "Other"
};
console.table(runtimeCapabilities);`}</pre>
            </div>
          </div>
        </section>

        {/* ─── 8. THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Think About This...
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              If JavaScript is strictly single-threaded, how can a high-traffic Node.js server handle 50,000 concurrent HTTP requests without getting blocked by the first slow database query?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Think about the separation between V8 JavaScript execution and the Libuv C++ asynchronous threadpool that manages kernel epoll/kqueue network events!
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title="Frequently Asked Questions · What is JavaScript and Where It Runs?"
            subtitle="Explore 25+ comprehensive questions from basic engine concepts to enterprise architecture"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="JavaScript Master Note · What is JavaScript and Where It Runs?"
            downloadFileName="001_001_getting-started-with-javascript-topic0-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note="In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I have seen that understanding where JavaScript executes and how V8 manages memory transforms students from syntax coders into genuine system architects. Master the difference between the Call Stack and Memory Heap before writing complex state logic."
          />
        </section>

      </div>
    </>
  );
}
