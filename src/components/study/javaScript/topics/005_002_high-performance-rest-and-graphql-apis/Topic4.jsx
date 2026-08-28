import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import demoCode from "./topic4_files/RealTimeBidirectionalEventStreamingWithWebsocketsSocketioDemo.js?raw";

/**
 * Topic4 – Real-Time Bidirectional Event Streaming with WebSockets & Socket.io
 * Module: 005_002_high-performance-rest-and-graphql-apis
 *
 * @component
 * @returns {JSX.Element} Full 11-section interactive JavaScript tutorial component.
 */
export default function Topic4() {
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
            <span>Module 005_002_high-performance-rest-and-graphql-apis · Topic 4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the core mechanics, V8 execution rules, and practical enterprise workflows of <strong className="text-amber-300">{"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}</strong> in modern JavaScript.
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
              <span>💡</span> Conceptual Overview &amp; Mental Models
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              In JavaScript, understanding <strong className="text-amber-300">{"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}</strong> is critical for writing robust and bug-free code. When building enterprise web applications, code must be predictable, resilient to unexpected user inputs, and optimized for high-performance browser execution.
            </p>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-bold">🏫 Classroom Scenario (Barrackpore Lab):</span> During a hands-on lab exercise, <strong>Swadeep</strong> encountered unexpected runtime behavior while testing an interactive component. Mentor <strong>Sukanta Hui</strong> demonstrated how tracing the execution flow of <em>{"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}</em> eliminates guesswork, ensuring smooth and deterministic UI state transitions.
            </div>
          </div>
        </section>

        {/* ─── 3. SEMANTIC VISUAL SVG DIAGRAM ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Runtime Architecture &amp; Execution Diagram
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full h-auto" role="img" aria-label="DOM Hierarchy and Event Propagation">
  <defs>
    <linearGradient id="domGrad_4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
    </linearGradient>
  </defs>
  <rect width="800" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
  <text x="400" y="32" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">DOM Tree &amp; Event Propagation Architecture</text>
  
  <g transform="translate(320, 50)">
    <rect width="160" height="38" rx="8" fill="url(#domGrad_4)" stroke="#34d399" strokeWidth="1.5" />
    <text x="80" y="24" fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">Window → Document</text>
  </g>
  <line x1="400" y1="88" x2="400" y2="110" stroke="#10b981" strokeWidth="2" />
  
  <g transform="translate(340, 110)">
    <rect width="120" height="34" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
    <text x="60" y="22" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle">&lt;html&gt;</text>
  </g>
  
  <path d="M 360 144 L 200 170" stroke="#64748b" strokeWidth="1.5" />
  <path d="M 440 144 L 600 170" stroke="#64748b" strokeWidth="1.5" />

  <g transform="translate(140, 170)">
    <rect width="120" height="45" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
    <text x="60" y="22" fill="#e9d5ff" fontSize="12" fontWeight="bold" textAnchor="middle">&lt;head&gt;</text>
    <text x="60" y="37" fill="#94a3b8" fontSize="10" textAnchor="middle">&lt;title&gt;, &lt;meta&gt;</text>
  </g>

  <g transform="translate(540, 170)">
    <rect width="150" height="45" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="75" y="22" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle">&lt;body&gt; (Visual Root)</text>
    <text x="75" y="37" fill="#cbd5e1" fontSize="10" textAnchor="middle">&lt;header&gt;, &lt;main&gt;, &lt;button&gt;</text>
  </g>

  <path d="M 70 80 Q 50 140 70 200" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
  <text x="80" y="145" fill="#f87171" fontSize="11" fontWeight="bold">1. Capturing Phase ↓</text>

  <path d="M 730 200 Q 750 140 730 80" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
  <text x="660" y="145" fill="#60a5fa" fontSize="11" fontWeight="bold">3. Bubbling Phase ↑</text>
</svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.1: Architectural execution pipeline and memory layout.
            </p>
          </div>
        </section>

        {/* ─── 4. DEEP TECHNICAL BREAKDOWN ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Breakdown &amp; Execution Rules
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript specification defines formal execution invariants for <strong className="text-amber-300">{"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}</strong>. When a script runs, the JavaScript runtime establishes an execution context consisting of variable environments, lexical scopes, and binding environments.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Execution Phase</th>
                    <th className="p-3 border border-slate-800">Engine Behavior</th>
                    <th className="p-3 border border-slate-800">Developer Invariant</th>
                    <th className="p-3 border border-slate-800">Optimization Goal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-sky-400">1. Parse / Tokenize</td>
                    <td className="p-3">Lexer converts source code into AST tokens</td>
                    <td className="p-3">Zero syntax errors &amp; clean lexical grammar</td>
                    <td className="p-3 text-emerald-400">Fast AST building</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-sky-400">2. Ignition Bytecode</td>
                    <td className="p-3">Generates bytecodes and initializes type feedback</td>
                    <td className="p-3">Avoid dynamic property shape mutations</td>
                    <td className="p-3 text-emerald-400">Instant startup time</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-sky-400">3. TurboFan JIT</td>
                    <td className="p-3">Hot code paths compiled to optimized machine code</td>
                    <td className="p-3">Maintain monomorphic function call sites</td>
                    <td className="p-3 text-emerald-400">Near C++ performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── 5. HANDS-ON MONACO CODE RUNNER ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <span>💻</span> Interactive Monaco Playground: 5+ Working Examples
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
              Live In-Browser Execution
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <JavaScriptEditableCodeBlock
              initialCode={demoCode}
              title="RealTimeBidirectionalEventStreamingWithWebsocketsSocketioDemo.js"
            />
          </div>
        </section>

        {/* ─── 6. COMMON PITFALLS & BEST PRACTICES ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Incorrect */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-3">
                <span>❌</span>
                <span>Anti-Pattern / Common Bug</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Relying on implicit coercion, uninitialized variable hoisting, or neglecting boundary state checks.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Loose comparisons and unhandled TDZ
function checkStatus(val) {
  if (val == null) { // Unclear intent
    return "default";
  }
  return val.toUpperCase(); // May throw TypeError!
}`}
              </pre>
            </div>

            {/* Correct */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                <span>✓</span>
                <span>Senior Pro Best Practice</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Explicit type validation, strict equality, optional chaining, and nullish coalescing operators.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Safe, explicit and defensive
function checkStatus(val) {
  if (typeof val !== "string") {
    return "default";
  }
  return val.toUpperCase();
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── 7. 💎 JAVASCRIPT HIDDEN GEMS & SENIOR PRO TRICKS ────────── */}
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
                  {"Fastify Schema Compilation with ajv"}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {"Fastify pre-compiles JSON request/response validation schemas using fast-json-stringify and ajv, delivering up to 2x higher throughput than standard Express."}
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{"const fastify = require('fastify')();\nfastify.route({\n  method: 'GET',\n  url: '/api/v1/users',\n  schema: { response: { 200: { type: 'array', items: { type: 'object' } } } },\n  handler: async () => [{ id: 1, name: 'Swadeep' }]\n});"}</pre>
            </div>
          </div>
        </section>

        {/* ─── 8. THINKING & HINTS ("Think About This...") ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Think About This...
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              If an application triggers thousands of operations per second using <strong className="text-amber-300">{"Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}</strong>, how does the V8 engine manage memory allocation and Garbage Collection pressure without causing UI frame drops (jank)?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Focus on object pool recycling, avoiding closure leaks in long-lived event listeners, and minimizing temporary object allocations in hot loops.
            </div>
          </div>
        </section>

        {/* ─── 9. COMPREHENSIVE FAQ SECTION ───────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}
            subtitle="Explore 25+ comprehensive questions from basic to senior architecture levels"
            questions={questions}
          />
        </section>

        {/* ─── 10. PLAIN TEXT PRINTABLE STUDY NOTE ─────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · Real-Time Bidirectional Event Streaming with WebSockets & Socket.io"}
            downloadFileName="005_002_high-performance-rest-and-graphql-apis-topic4-note.txt"
          />
        </section>

        {/* ─── 11. TEACHER'S NOTE & MENTORSHIP ────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring engineers at Coder & AccoTax in Barrackpore, I have seen that mastering Real-Time Bidirectional Event Streaming with WebSockets & Socket.io is the exact turning point between amateur scripting and professional software engineering. Practice each example in the Monaco editor until you can explain the execution flow without hesitation."}
          />
        </section>

      </div>
    </>
  );
}
