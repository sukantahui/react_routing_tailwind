import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import demoCode from "./topic9_files/LoopPerformanceBreakcontinueLabelsInfiniteLoopGuardsDemo.js?raw";

/**
 * Topic9 – Loop Performance, Break/Continue Labels & Infinite Loop Guards
 * Module: 001_005_loops-and-iteration
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic9() {
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
        
        {/* ─── SECTION 1: HEADER & METADATA ─────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_005_loops-and-iteration · Topic 9</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Loop Performance, Break/Continue Labels & Infinite Loop Guards"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Advanced loop mastery: multi-level labeled statements, V8 loop unrolling, and memory optimization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">Course Code: JS-PRO-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* ─── SECTION 2: DETAILED CONCEPT DISCUSSION & MENTAL MODELS ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Conceptual Foundation &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              Understanding <strong className="text-amber-300">Labels & Loop Optimization</strong> is a core requirement for writing performant, readable, and predictable JavaScript. When building complex frontend state machines, mathematical processing pipelines, or real-time data streaming layers, mastering control flow ensures clean execution without subtle logic bugs.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              In the V8 engine compilation pipeline, loop constructs are analyzed by the Ignition interpreter and TurboFan JIT compiler. Writing clean iteration invariants allows the engine to optimize register allocations, vectorize operations, and leverage On-Stack Replacement (OSR).
            </p>

            {/* Classroom Story */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During an intensive lab session, student <strong>Debangshu</strong> tackled a complex real-world implementation challenge. Debangshu was implementing a 2D image pixel filter with nested loops. He used boolean flag variables to break both loops, causing branch prediction slowdowns. Sukanta Hui showed how labeled statements cleanly abort the outer loop with zero CPU branch overhead.
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated the precise runtime execution trace on the whiteboard, proving that understanding <em>Labels & Loop Optimization</em> removes ambiguity and produces deterministic software architecture.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Labeled Statements & Nested Loop Execution Architecture
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="Loop Performance, Break/Continue Labels & Infinite Loop Guards Architecture">
                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  Labeled Statements & Nested Loop Execution Architecture
                </text>
                
                {/* Outer Loop */}
                <g transform="translate(40, 50)">
                  <rect width="760" height="180" rx="12" fill="#1e293b" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="60" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">outerGrid: for (let r = 0; r &lt; rows; r++)</text>

                  {/* Inner Loop */}
                  <g transform="translate(40, 45)">
                    <rect width="400" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
                    <text x="200" y="24" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">innerLoop: for (let c = 0; c &lt; cols; c++)</text>
                    <rect x="20" y="40" width="360" height="50" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="200" y="58" fill="#f87171" fontSize="10" textAnchor="middle">if (pixel === target) break outerGrid;</text>
                    <text x="200" y="74" fill="#94a3b8" fontSize="9" textAnchor="middle">Direct multi-level jump out of both loops</text>
                  </g>

                  {/* Jump Arrow */}
                  <path d="M 480 100 L 580 100" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                  
                  {/* Outer Exit Target */}
                  <g transform="translate(585, 65)">
                    <rect width="180" height="70" rx="8" fill="#881337" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="90" y="28" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">Exit Outer Loop</text>
                    <text x="90" y="48" fill="#fda4af" fontSize="9" textAnchor="middle">Bypasses all remaining cells</text>
                  </g>
                </g>
    
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 9.1: Runtime execution lifecycle, memory flow, and control branching for Labels &amp; Loop Optimization.
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: DEEP TECHNICAL BREAKDOWN & SPECIFICATIONS ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How, Spec Invariants &amp; Engine Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript standard strictly governs loop lifecycle steps, lexical scoping boundaries, and statement evaluations. Understanding these specifications prevents edge-case pitfalls and memory retention leaks.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Stage / Feature</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Rule</th>
                    <th className="p-3 border border-slate-800">V8 Engine Execution</th>
                    <th className="p-3 border border-slate-800">Developer Invariant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs font-mono">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Header &amp; Entry</td>
                    <td className="p-3 text-slate-300 font-sans">Evaluates expression &amp; coerces via ToBoolean</td>
                    <td className="p-3 text-amber-300 font-sans">Branches via JumpIfFalse bytecode</td>
                    <td className="p-3 text-emerald-400 font-sans">Verify entry state correctness</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Iteration Block</td>
                    <td className="p-3 text-slate-300 font-sans">Creates fresh Lexical Scope per tick for 'let'</td>
                    <td className="p-3 text-amber-300 font-sans">Registers stored in Call Stack frame</td>
                    <td className="p-3 text-emerald-400 font-sans">Avoid heavy allocations in loop body</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">Back-Edge Cycle</td>
                    <td className="p-3 text-slate-300 font-sans">Advances step and repeats test condition</td>
                    <td className="p-3 text-amber-300 font-sans">Hot loops trigger On-Stack Replacement (OSR)</td>
                    <td className="p-3 text-emerald-400 font-sans">Ensure guaranteed progress to termination</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Corner Cases to Know
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Unbounded Loop Freeze:</strong> Missing state increment freezes browser tabs and locks the Event Loop.</li>
                <li><strong className="text-amber-300">Scope Mutation Traps:</strong> Closures created in loops capture variable bindings; using 'let' creates independent per-iteration bindings.</li>
                <li><strong className="text-sky-300">Precision Drift:</strong> Never compare floating point numbers with strict equality (!== or ===) in loop conditions.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: HANDS-ON MONACO CODE RUNNER (5+ EXAMPLES) ──── */}
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
              title="LoopPerformanceAndLabelsDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Imperfect Loop Boundaries</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Writing loops with off-by-one errors or mutating counters out of sequence causes subtle data omissions or index out-of-bound errors.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Off-by-one boundary
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // arr[length] is undefined!
}`}
              </pre>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: Precise Index &amp; Range Control</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Always use strict zero-indexed bounds (i &lt; arr.length) or prefer declarative iteration when index tracking is unneeded.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
for (let i = 0; i &lt; arr.length; i++) {
  console.log(arr[i]);
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: 💎 JAVASCRIPT HIDDEN GEMS & PRO TRICKS ──────── */}
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
                  V8 Loop Invariant Code Motion (LICM)
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              V8's TurboFan compiler automatically hoists calculations that do not change inside loop bodies outside the loop. However, calling impure functions inside loop conditions prevents LICM optimization.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET:
// LICM hoists this automatically:
const len = array.length;
for (let i = 0; i < len; i++) &#123; ... &#125;`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Optimization &amp; Safety
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              When designing high-throughput data processing algorithms in JavaScript, how do you balance imperative low-level loop speed with declarative immutability?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Keep application state management and UI components declarative (using immutability and map/filter), and encapsulate hot inner loop algorithms in specialized, high-speed pure imperative helper functions.
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25 ITEMS) ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "Labels & Loop Optimization"}
            subtitle="Explore 25 comprehensive questions covering runtime behavior, memory models, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "Labels & Loop Optimization"}
            downloadFileName="001_005_loops-and-iteration-topic9-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring at Coder & AccoTax in Barrackpore, I constantly remind engineers: a programming loop is a contract with CPU execution. Always be intentional about loop boundaries, state mutations, and memory allocations. Master these fundamentals and complex software architecture becomes effortless."}
          />
        </section>

      </div>
    </>
  );
}
