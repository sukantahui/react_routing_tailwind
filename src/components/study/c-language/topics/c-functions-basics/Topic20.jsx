/**
 * Topic 20: Nested Function Calls and Execution Order
 * File: Topic20.jsx
 *
 * Pedagogical Focus:
 * - Explain what happens when one function calls another.
 * - Show the execution order: caller pauses, callee runs to completion, then caller resumes.
 * - Introduce the call stack conceptually (without deep stack frame details – that's Topic 23/40).
 * - Build on Topics 4 (function call flow) and 16 (local variables).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing stack frames and return arrows.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic20_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic20_files/simple_nested.c?raw";
import example2 from "./topic20_files/nested_with_params.c?raw";
import example3 from "./topic20_files/order_demo.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic20-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic20-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic20-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic20-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 20
// ----------------------------------------------------------------------
const Topic20 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic20-root",
          "min-h-screen w-full px-4 py-8 md:px-8 lg:px-16",
          "transition-colors duration-300",
          "font-sans leading-relaxed"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ----- SECTION 1: TITLE + INTRO (fadeSlideUp, delay-0) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none"
            )}
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-400 dark:text-indigo-400">
              🔄 Nested Function Calls and Execution Order
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Functions don't live in isolation – they call other functions.
              Understanding the order in which they execute is essential for
              tracing program flow and debugging. This topic reveals the
              hidden choreography behind every function call.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 How Nested Calls Work
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic20-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  When a function calls another function, the current function
                  <strong> pauses</strong> its execution, the called function runs
                  to completion, and then the caller <strong>resumes</strong>.
                </p>
                <p className="mb-3">This creates a stack of active functions:</p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li><code>main()</code> calls <code>funcA()</code>.</li>
                  <li><code>funcA()</code> calls <code>funcB()</code>.</li>
                  <li><code>funcB()</code> runs and returns to <code>funcA()</code>.</li>
                  <li><code>funcA()</code> continues and returns to <code>main()</code>.</li>
                </ol>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> The last function called is
                  the first to finish – this is LIFO (Last In, First Out) behaviour.
                </p>
              </div>

              {/* Right: animated SVG – call stack with arrows */}
              <div
                className={clsx(
                  "topic20-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Stack frames */}
                  <rect x="100" y="30" width="140" height="35" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="52" fill="#d1d5db" fontSize="10" textAnchor="middle">main()</text>

                  <rect x="100" y="70" width="140" height="35" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="92" fill="#d1d5db" fontSize="10" textAnchor="middle">funcA()</text>

                  <rect x="100" y="110" width="140" height="35" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="132" fill="#d1d5db" fontSize="10" textAnchor="middle">funcB()</text>

                  {/* Call arrows (down) */}
                  <line x1="170" y1="65" x2="170" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="y2" values="70;75;70" dur="1.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="170" y1="105" x2="170" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="y2" values="110;115;110" dur="1.5s" repeatCount="indefinite" />
                  </line>

                  {/* Return arrows (up) */}
                  <line x1="190" y1="145" x2="190" y2="105" stroke="#6ee7b7" strokeWidth="2" markerEnd="url(#arrowHead2)">
                    <animate attributeName="y2" values="105;100;105" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
                  </line>
                  <line x1="150" y1="105" x2="150" y2="65" stroke="#6ee7b7" strokeWidth="2" markerEnd="url(#arrowHead2)">
                    <animate attributeName="y2" values="65;60;65" dur="1.5s" begin="1.5s" repeatCount="indefinite" />
                  </line>

                  <defs>
                    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowHead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#6ee7b7" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (not a function, but the pattern) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Execution Order Rules
            </h2>
            <div className="topic20-card rounded-xl border p-6">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Rule 1 – Caller blocks:</strong> The calling function waits until the called function finishes.</li>
                <li><strong>Rule 2 – LIFO completion:</strong> If A calls B calls C, then C finishes first, then B, then A.</li>
                <li><strong>Rule 3 – Return location:</strong> After a called function returns, execution continues exactly after the call.</li>
                <li><strong>Rule 4 – Arguments are evaluated first:</strong> Before the call, all arguments are computed (in unspecified order in C, but before the call).</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “The call stack is
                like a stack of plates – you put one on top, and you must take it off
                before you can get to the one below.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Examples in C
            </h2>

            <EditableCCodeBlock
              title="Example 1: Simple nested calls"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Nested calls with parameters"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Demonstrating execution order with print statements"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, the output shows
              that <code>funcC</code> completes before <code>funcB</code> continues,
              and <code>funcB</code> completes before <code>main</code> continues.
            </div>
          </section>

          {/* ----- SECTION 5: REAL‑WORLD CONTEXT – students & places (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Nested Calls at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic20-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Abhronila</strong> wrote
                a program to compute final grades. <code>main</code> called{" "}
                <code>computeGrade</code>, which called <code>calculateAverage</code>,
                which called <code>sumArray</code>. She traced the execution by adding
                print statements – a classic debugging technique.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> created a
                recursive directory traversal (later topics). He was surprised to see
                the nested calls unwinding in reverse order – exactly as the stack
                predicts.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Tuhina, Ritaja</strong> now
                understand that every function call follows this strict order.
              </p>
            </div>
          </section>

          {/* ----- SECTION 6: COMMON PITFALLS (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic20-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Misunderstanding return order:
                  </span>{" "}
                  Thinking that after a nested call, the caller starts over from the
                  beginning. No – it resumes right after the call.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Infinite recursion (accidental):
                  </span>{" "}
                  If a function calls itself without a stopping condition, the stack
                  grows until overflow. (We'll cover recursion soon.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming parallel execution:
                  </span>{" "}
                  C functions execute sequentially, not in parallel. Nested calls are
                  strictly ordered.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to return:
                  </span>{" "}
                  In a non‑void function, forgetting to return leads to undefined
                  behaviour – the caller receives garbage.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if the nesting depth is
                very large (e.g., 10,000 nested calls)? (Stack overflow – we'll see
                later.)
              </p>
            </div>
          </section>

          {/* ----- SECTION 7: BEST PRACTICES & PRO TIPS (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic20-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Keep nesting depth manageable
                </h3>
                <p className="text-sm">
                  Deeply nested calls are hard to follow. If you need many levels,
                  consider refactoring.
                </p>
              </div>
              <div className="topic20-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Use descriptive function names
                </h3>
                <p className="text-sm">
                  Names like <code>computeAverage</code> make the call hierarchy
                  self‑documenting.
                </p>
              </div>
              <div className="topic20-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🐛 Debug with print statements
                </h3>
                <p className="text-sm">
                  Temporarily add <code>printf("entering X\n");</code> and
                  <code>printf("leaving X\n");</code> to trace order.
                </p>
              </div>
              <div className="topic20-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Understand the call stack
                </h3>
                <p className="text-sm">
                  Use a debugger to inspect the call stack. It shows exactly which
                  functions are currently active.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 8: MINI CHECKLIST (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 20
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain what a
                nested function call is.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that the
                caller waits for the callee.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that the last called
                function returns first (LIFO).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can trace the output of
                nested calls with print statements.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I'm aware of stack overflow
                risks from excessive nesting.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic20-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
              "transition-all duration-300 hover:scale-[1.01] hover:border-indigo-400 hover:shadow-2xl"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🧑‍🏫</div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold text-indigo-300">
                  Teacher’s Note
                </h2>
                <p className="mb-2 font-medium text-indigo-200">
                  Sukanta Hui — Mentor, C Programming
                </p>
                <p className="mb-2 text-sm">
                  📧 sukantahui@codernaccotax.co.in &nbsp;|&nbsp; 📱 7003756860
                  &nbsp;|&nbsp; 💻 {experienceYears} years (since 1998)
                </p>
                <p className="text-gray-300">
                  “I tell my students at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong>: imagine you're reading a book, and
                  you see a footnote. You stop reading the main text, read the
                  footnote completely, and then return to where you left off. That's
                  exactly how nested calls work. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When debugging, use a debugger's call stack
                    window – it's like X‑ray vision for your program's execution.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: HINT – subtle guidance (delay-0.9s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.9s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In the order demo example, add another function call inside{" "}
                <code>funcC</code>, creating a fourth level. Predict the output, then
                run it. Were you correct?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The pattern continues – deepest first.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 20 complete – you understand the order of nested calls. Next:
            recursive functions – concept and definition.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic20;