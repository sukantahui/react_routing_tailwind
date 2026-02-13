/**
 * Topic 9: Functions with Arguments and No Return Value
 * File: Topic9.jsx
 *
 * Pedagogical Focus:
 * - Builds directly on Topic 8 (no args, no return).
 * - Now introduce input parameters while keeping return type void.
 * - Emphasise side effects (printing, modifying, etc.) as legitimate tasks.
 * - Zero‑config Tailwind animations, dark mode default, light mode via media query.
 * - SVG with native <animate> to show arguments entering but no exit arrow.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic9_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic9_files/print_sum.c?raw";
import example2 from "./topic9_files/greet_student.c?raw";
import example3 from "./topic9_files/display_array.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic9-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic9-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic9-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic9-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 9
// ----------------------------------------------------------------------
const Topic9 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic9-root",
          "min-h-screen w-full px-4 py-8 md:px-8 lg:px-16",
          "transition-colors duration-300",
          "font-sans leading-relaxed"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ----- SECTION 1: TITLE + CONTEXT (fadeSlideUp, delay-0) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none"
            )}
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-400 dark:text-indigo-400">
              🎯 Functions with Arguments and No Return Value
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              We already know how to write functions that simply perform an action
              (Topic 8). Now we add <strong>input data</strong> — but still no
              value is sent back. This is the workhorse of many everyday tasks.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – ANATOMY (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Prototype, Return Type, Purpose
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: signature breakdown */}
              <div className="topic9-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-3 text-lg font-semibold text-indigo-300">
                  🔹 Prototype / Signature
                </h3>
                <pre className="mb-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">functionName</span>(
                  <span className="text-emerald-300">int a</span>,{" "}
                  <span className="text-emerald-300">float b</span>);
                </pre>
                <p className="text-gray-300">
                  <strong>Return type:</strong> <code>void</code> — absolutely no
                  value is returned.
                  <br />
                  <strong>Purpose:</strong> Perform a task using provided inputs,
                  with no result needed by the caller.
                  <br />
                  <strong>When & why:</strong> Logging, displaying, updating
                  hardware, modifying global state, or any action that doesn’t
                  produce a computed output.
                </p>
              </div>

              {/* Right: animated SVG – function with inputs, blocked output */}
              <div
                className={clsx(
                  "topic9-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="280"
                  height="160"
                  viewBox="0 0 280 160"
                  className="w-full max-w-xs"
                >
                  {/* Function box */}
                  <rect
                    x="90"
                    y="40"
                    width="100"
                    height="80"
                    rx="12"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;20;0"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="140" y="80" textAnchor="middle" fill="#c7d2fe">
                    void
                  </text>
                  <text x="140" y="100" textAnchor="middle" fill="#c7d2fe" fontSize="12">
                    (no return)
                  </text>

                  {/* Input arrows – animated */}
                  <line
                    x1="20"
                    y1="50"
                    x2="80"
                    y2="50"
                    stroke="#a5b4fc"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="70;82;70"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="8" y="35" fill="#a5b4fc" fontSize="12">
                    arguments
                  </text>
                  <line
                    x1="20"
                    y1="80"
                    x2="80"
                    y2="80"
                    stroke="#a5b4fc"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="70;82;70"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* No output arrow – crossed out symbol */}
                  <circle cx="200" cy="70" r="14" stroke="#f87171" strokeWidth="2" fill="none" />
                  <line x1="190" y1="60" x2="210" y2="80" stroke="#f87171" strokeWidth="2" />
                  <text x="200" y="55" fill="#f87171" fontSize="12" textAnchor="middle">
                    no return
                  </text>

                  <defs>
                    <marker
                      id="arrowHead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="5"
                      orient="auto"
                    >
                      <path d="M0,0 L10,5 L0,10 Z" fill="#e0e7ff" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: REAL‑WORLD CONTEXT – students & places (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Why This Matters – Barrackpore & Naihati CNAT
            </h2>
            <div className="topic9-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, the daily attendance system
                uses a function <code>markPresent(char name[])</code>. It takes the
                student’s name, logs the timestamp, and updates the database.
                <em> No value is returned</em> – the act itself is the goal.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, the library system has{" "}
                <code>printDueDate(int bookID)</code>. It calculates and prints the
                return date. The caller doesn’t need the date back; it’s already on
                the screen.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Tuhina, Abhronila, Debangshu,
                Ritaja</strong> use these functions daily without realising they
                are invoking void functions with arguments.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – live editable (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Three Classic Examples
            </h2>
            <p className="text-gray-300">
              Each function takes argument(s), does something, and returns nothing.
            </p>

            <EditableCCodeBlock
              title="Example 1: Print sum of two integers"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Greet a student by name"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Display all elements of an array"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> All three functions have
              <code>void</code> return type. No <code>return</code> statement is
              needed (though a bare <code>return;</code> is allowed to exit early).
            </div>
          </section>

          {/* ----- SECTION 5: COMMON PITFALLS (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic9-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting <code>void</code>:
                  </span>{" "}
                  In old C, an empty parameter list meant “any arguments”, and
                  missing return type defaulted to <code>int</code>. Always write{" "}
                  <code>void</code> explicitly.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Returning a value:
                  </span>{" "}
                  Writing <code>return 5;</code> in a <code>void</code> function is
                  a compiler error. Use <code>return;</code> only if you need early
                  exit.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring parameter copies:
                  </span>{" "}
                  Arguments are passed by value (Topic 12). Modifying a parameter
                  inside the function does <em>not</em> change the original variable.
                  (This is a feature, not a bug!)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Misreading the prototype:
                  </span>{" "}
                  <code>void func(void);</code> means no arguments.{" "}
                  <code>void func();</code> in old C is different – avoid it.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> what happens if you try to use the
                result of a <code>void</code> function in an expression? The
                compiler will reject it.
              </p>
            </div>
          </section>

          {/* ----- SECTION 6: BEST PRACTICES & PRO TIPS (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic9-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Verb‑oriented names
                </h3>
                <p className="text-sm">
                  <code>printReport()</code>, <code>updateScore()</code>,{" "}
                  <code>logError()</code>. The name should clearly describe the
                  action.
                </p>
              </div>
              <div className="topic9-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Validate inputs first
                </h3>
                <p className="text-sm">
                  If the function expects positive numbers, check at the top and
                  <code>return;</code> early if invalid. (We'll see error handling
                  later.)
                </p>
              </div>
              <div className="topic9-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 One side effect per call
                </h3>
                <p className="text-sm">
                  Avoid mixing printing, file writing, and global updates in one
                  function. Split if needed.
                </p>
              </div>
              <div className="topic9-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Test with dummy arguments
                </h3>
                <p className="text-sm">
                  Call your <code>void</code> function with various inputs and
                  manually verify the output (print, file, etc.).
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 7: MINI CHECKLIST (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 9
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a function
                that takes arguments and returns nothing.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always write{" "}
                <code>void</code> return type explicitly.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that modifying a
                parameter doesn’t affect the caller.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand when to
                use this kind of function (actions, not computations).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can distinguish this
                from Topic 8 (no args, no return).
              </li>
            </ul>
          </section>

          {/* ----- SECTION 8: TEACHER'S NOTE (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "topic9-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “I’ve seen countless students at <strong>Barrackpore CNAT</strong>{" "}
                  and <strong>Naihati CNAT</strong> struggle with the idea that a
                  function doesn’t ‘owe’ a result. A postman delivers a letter
                  (argument) and doesn’t wait for a reply. That’s exactly what a{" "}
                  <code>void</code> function with arguments does. <br />
                  <span className="mt-2 block italic">
                    💡 Remind them: If the function name is a verb, you probably
                    don’t need a return value.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 9: HINT – subtle guidance (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In <code>printSum</code> example, add a <code>return a+b;</code> at
                the end. What does the compiler say? Why does it refuse?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Think about the contract between the function and its caller.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 9 complete – you’ve mastered input‑only functions. Next: functions
            that take arguments AND return a value.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic9;