import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/WhileLoopDemo.js?raw";

/**
 * Topic0 – while Loop
 * Module: 001_005_loops-and-iteration
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
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
        
        {/* ─── SECTION 1: HEADER & METADATA ─────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 001_005_loops-and-iteration · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"The while Loop in JavaScript"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the core mechanics, V8 bytecode branching, truthy/falsy condition evaluation, and indeterminate execution flow of JavaScript's foundational entry-controlled loop.
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
              <span>💡</span> Conceptual Overview &amp; Entry-Control Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              The <code className="text-amber-300 font-mono">while</code> statement creates a loop that executes as long as a specified test condition evaluates to a truthy value. Crucially, the condition is evaluated <em>prior to each execution of the loop body</em>. If the condition is false upon initial evaluation, the loop body is bypassed entirely (executing exactly 0 times).
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              Unlike a fixed-count <code className="text-sky-300 font-mono">for</code> loop, the <code className="text-amber-300 font-mono">while</code> loop is engineered for <strong>indeterminate iteration</strong>: scenarios where the exact count of cycles cannot be known upfront, such as draining dynamic asynchronous task queues, reading linked data nodes until a null pointer, retrying network connections with backoff, or parsing tokens until an End-Of-File (EOF) marker.
            </p>

            {/* Classroom Story with Code/State */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During an asynchronous lab test, student <strong>Swadeep</strong> attempted to process an incoming job queue using a traditional <code className="text-rose-400">for</code> loop with a cached <code className="text-slate-200">queue.length</code>. Because worker jobs were dynamically pushed into the queue during execution, the loop missed half the jobs!
              </p>
              <p>
                Mentor <strong>Sukanta Hui</strong> demonstrated that <code className="text-emerald-400">while (queue.length &gt; 0) &#123; const job = queue.shift(); process(job); &#125;</code> continuously re-evaluates the live buffer length on every iteration, providing resilient queue consumption without index drift.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> while Loop · Runtime Execution &amp; Control Flow Diagram
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 840 280" className="w-full h-auto" role="img" aria-label="while Loop Control Flow and Bytecode Pipeline">
                <defs>
                  <linearGradient id="whileGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="whileGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="whileGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <rect width="840" height="280" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="420" y="28" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  while (condition) · Entry Condition &amp; JumpLoop Lifecycle
                </text>

                {/* Step 1: Entry Check */}
                <g transform="translate(40, 60)">
                  <rect width="180" height="90" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="90" y="26" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">1. Evaluate Condition</text>
                  <rect x="15" y="38" width="150" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="90" y="56" fill="#f8fafc" fontSize="11" textAnchor="middle">ToBoolean(condition)</text>
                  <text x="90" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">JumpIfFalse opcode</text>
                </g>

                {/* Branch Arrow -&gt; True */}
                <path d="M 220 105 L 290 105" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="255" y="96" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">TRUE</text>

                {/* Step 2: Loop Body */}
                <g transform="translate(295, 60)">
                  <rect width="210" height="90" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="105" y="26" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">2. Execute Loop Body</text>
                  <rect x="15" y="38" width="180" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="105" y="56" fill="#e2e8f0" fontSize="10" textAnchor="middle">Process Statements</text>
                  <text x="105" y="70" fill="#a7f3d0" fontSize="9" textAnchor="middle">Block Scope Environment</text>
                </g>

                {/* Branch Arrow -&gt; Mutation */}
                <path d="M 505 105 L 565 105" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                
                {/* Step 3: State Mutation */}
                <g transform="translate(570, 60)">
                  <rect width="210" height="90" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="105" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">3. State Mutation</text>
                  <rect x="15" y="38" width="180" height="38" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="105" y="56" fill="#e2e8f0" fontSize="10" textAnchor="middle">counter++ / queue.shift()</text>
                  <text x="105" y="70" fill="#7dd3fc" fontSize="9" textAnchor="middle">Progresses toward boundary</text>
                </g>

                {/* Back-Edge JumpLoop Arrow returning to Step 1 */}
                <path d="M 675 150 L 675 220 L 130 220 L 130 150" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
                <text x="400" y="212" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                  V8 JumpLoop Opcode (Back-Edge Re-evaluates Condition)
                </text>

                {/* Exit Path Arrow when FALSE */}
                <path d="M 130 60 L 130 40 L 40 L 40 L 40 240 L 170 240" fill="none" stroke="#f43f5e" strokeWidth="2" />
                <g transform="translate(175, 220)">
                  <rect width="180" height="40" rx="8" fill="#881337" fillOpacity="0.5" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="90" y="24" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">FALSE → Exit Loop (0 runs)</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 0.1: Step-by-step entry-evaluation, body execution, state mutation, and V8 JumpLoop bytecode cycle.
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: DEEP TECHNICAL BREAKDOWN & SPECIFICATIONS ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How, Spec Invariants &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              In the ECMAScript formal specification, the <code className="text-amber-300">while</code> statement evaluates the expression <code className="text-slate-200">expr</code>, applies <code className="text-sky-300">ToBoolean(GetValue(expr))</code>, and if <code className="text-emerald-400">true</code>, enters an iteration context. Understanding how V8 compiles while loops avoids CPU thread-locking and memory leaks.
            </p>

            {/* Topic-Specific Specifications Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Evaluation Phase</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Rule</th>
                    <th className="p-3 border border-slate-800">V8 Runtime Engine Behavior</th>
                    <th className="p-3 border border-slate-800">Developer Best Practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400 font-mono">1. Entry Condition</td>
                    <td className="p-3 font-mono">ToBoolean(expr)</td>
                    <td className="p-3">Ignition runs <code className="text-amber-300">JumpIfFalse</code> to exit address</td>
                    <td className="p-3 text-emerald-400">Verify initial state isn't accidentally falsy</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-emerald-400 font-mono">2. Body Execution</td>
                    <td className="p-3 font-mono">Evaluate(Statement)</td>
                    <td className="p-3">Allocates fresh block-scoped Lexical Record for <code className="text-sky-300">let</code></td>
                    <td className="p-3 text-emerald-400">Never declare heavy objects inside loop body</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-amber-400 font-mono">3. Back-Edge Step</td>
                    <td className="p-3 font-mono">Repeat Loop Header</td>
                    <td className="p-3">Hot loops trigger On-Stack Replacement (OSR)</td>
                    <td className="p-3 text-emerald-400">Ensure counter increment precedes any continue</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Corner Cases to Know
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">Infinite Loop Freeze:</strong> If the condition variable is not mutated inside the body, the loop runs forever, pegging the CPU at 100% and triggering Chrome's "Page Unresponsive" dialog.</li>
                <li><strong className="text-amber-300">Floating-Point Strict Equality Trap:</strong> <code className="text-rose-300">while (x !== 1.0) &#123; x += 0.1; &#125;</code> misses 1.0 due to IEEE 754 precision drift (<code className="text-slate-300">0.9999999999999999 -&gt; 1.0999999999999999</code>). Always use inequalities (<code className="text-emerald-300">&lt;</code> or <code className="text-emerald-300">&gt;</code>).</li>
                <li><strong className="text-sky-300">Continue Skipping Mutation:</strong> If <code className="text-amber-300">continue</code> is invoked before incrementing the counter variable, the loop immediately jumps back to the test with the same value, locking into an infinite cycle.</li>
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
              title="WhileLoopDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfall 1 */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Skipping Increment before Continue</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300">continue</code> before incrementing the index variable creates an instant infinite loop.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID:
let i = 0;
while (i &lt; 5) {
  if (i === 2) continue; // i stays 2 forever!
  i++;
}`}
              </pre>
            </div>

            {/* Best Practice 1 */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: Upfront State Advancement</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Advance the counter immediately before branching, or structure loop conditions cleanly with sentinel objects.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
let i = 0;
while (i &lt; 5) {
  const current = i++;
  if (current === 2) continue;
  console.log(current);
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
                  The Linked Pointer Traversal Idiom: while (node = node.next)
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              In JavaScript, assignment expressions return the assigned value. By combining assignment and truthiness testing in a single <code className="text-amber-300">while</code> header, senior engineers traverse singly-linked lists, DOM parent chains (<code className="text-slate-200">while (el = el.parentElement)</code>), and middleware execution pipelines cleanly with zero boilerplate.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET: Traversing DOM hierarchy up to body tag
function findClosestWithAttribute(element, attr) {
  let curr = element;
  while (curr = curr.parentElement) {
    if (curr.hasAttribute(attr)) return curr;
  }
  return null;
}`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Preventing UI Freezes
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              If an algorithm requires calculating prime numbers using a while loop over millions of iterations, how can you prevent the while loop from blocking user clicks and browser animations on the main thread?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Time-slicing using <code className="text-amber-300">performance.now()</code> and yielding execution back to the Event Loop with <code className="text-emerald-400">await new Promise(requestAnimationFrame)</code>, or offloading the while loop entirely to a <code className="text-sky-300">Web Worker</code> thread.
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25 ITEMS) ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · while Loop"}
            subtitle="Explore 25 comprehensive questions covering entry-controlled mechanics, memory, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · while Loop"}
            downloadFileName="001_005_loops-and-iteration-topic0-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring at Coder & AccoTax in Barrackpore, I always advise students: use 'for' when the boundary is static and known, but choose 'while' when the boundary dynamically changes during computation. Always trace your exit condition on paper before running a while loop to ensure guaranteed termination."}
          />
        </section>

      </div>
    </>
  );
}
