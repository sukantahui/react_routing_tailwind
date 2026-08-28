import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import demoCode from "./topic1_files/DowhileLoopDemo.js?raw";

/**
 * Topic1 – do...while Loop in JavaScript
 * Module: 001_005_loops-and-iteration
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic1() {
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
            <span>Module 001_005_loops-and-iteration · Topic 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"do...while Loop in JavaScript"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the exit-controlled loop structure in JavaScript, guaranteeing at least one execution pass before evaluating the test condition.
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
              Understanding <strong className="text-amber-300">do...while Loop</strong> is a core requirement for writing performant, readable, and predictable JavaScript. When building complex frontend state machines, mathematical processing pipelines, or real-time data streaming layers, mastering control flow ensures clean execution without subtle logic bugs.
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
                During an intensive lab session, student <strong>Tuhina</strong> tackled a complex real-world implementation challenge. Tuhina built a command-line input prompter that required at least one initial user prompt before checking if the response was valid. A while loop required duplicate code before the loop, but a do...while loop handled the mandatory initial pass elegantly.
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated the precise runtime execution trace on the whiteboard, proving that understanding <em>do...while Loop</em> removes ambiguity and produces deterministic software architecture.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> do...while Loop · Exit-Controlled Execution Pipeline
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="do...while Loop in JavaScript Architecture">
                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  do...while Loop · Exit-Controlled Execution Pipeline
                </text>
                
                {/* Step 1: Initial Execution */}
                <g transform="translate(40, 60)">
                  <rect width="200" height="90" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="100" y="26" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. Execute Body First</text>
                  <rect x="15" y="38" width="170" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="100" y="56" fill="#e2e8f0" fontSize="10" textAnchor="middle">Guaranteed 1st Pass</text>
                  <text x="100" y="70" fill="#a7f3d0" fontSize="9" textAnchor="middle">Runs unconditionally</text>
                </g>

                {/* Arrow to Condition */}
                <path d="M 240 105 L 310 105" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Step 2: Exit Condition Evaluation */}
                <g transform="translate(315, 60)">
                  <rect width="210" height="90" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="105" y="26" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">2. Test Condition at Exit</text>
                  <rect x="15" y="38" width="180" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="105" y="56" fill="#f8fafc" fontSize="10" textAnchor="middle">while (condition);</text>
                  <text x="105" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">Evaluates post-execution</text>
                </g>

                {/* Repeat Loop Path if TRUE */}
                <path d="M 420 150 L 420 220 L 140 220 L 140 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3" />
                <text x="280" y="212" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  TRUE → Repeat Body Execution
                </text>

                {/* Exit Path if FALSE */}
                <path d="M 525 105 L 595 105" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                <g transform="translate(600, 60)">
                  <rect width="200" height="90" rx="10" fill="#881337" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="100" y="26" fill="#fecdd3" fontSize="12" fontWeight="bold" textAnchor="middle">3. Exit Loop</text>
                  <rect x="15" y="38" width="170" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="100" y="56" fill="#e2e8f0" fontSize="10" textAnchor="middle">Condition is FALSE</text>
                  <text x="100" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">Minimum 1 execution</text>
                </g>
    
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 1.1: Runtime execution lifecycle, memory flow, and control branching for do...while Loop.
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
              title="DowhileLoopDemo.js"
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
                  The Semicolon Invariant of do...while
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Unlike standard while or for loops which do not require a closing semicolon after their block, do...while requires a trailing semicolon: do &#123; ... &#125; while (cond); Failing to include it can cause ASI (Automatic Semicolon Insertion) parsing errors in minified builds.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET:
let status;
do {
  status = checkDevice();
} while (!status); // Semicolon mandatory here!`}</pre>
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
            title={"Frequently Asked Questions · " + "do...while Loop"}
            subtitle="Explore 25 comprehensive questions covering runtime behavior, memory models, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "do...while Loop"}
            downloadFileName="001_005_loops-and-iteration-topic1-note.txt"
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
