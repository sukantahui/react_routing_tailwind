/**
 * Topic 10: Functions with Arguments and Return Value
 * File: Topic10.jsx
 *
 * Pedagogical Focus:
 * - Complete the progression: now functions take inputs AND produce an output.
 * - Emphasise the data flow: arguments → computation → returned value.
 * - Builds directly on Topics 8 & 9; no pointers, no call‑by‑reference.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing two‑way data flow.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic10_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic10_files/add.c?raw";
import example2 from "./topic10_files/average.c?raw";
import example3 from "./topic10_files/is_even.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic10-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic10-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic10-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic10-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 10
// ----------------------------------------------------------------------
const Topic10 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic10-root",
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
              🔄 Functions with Arguments and Return Value
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              We now combine everything: a function receives data (arguments),
              processes it, and sends back a result (return value). This is the
              classic “black box” model – the foundation of all computation.
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
              <div className="topic10-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-3 text-lg font-semibold text-indigo-300">
                  🔹 Prototype / Signature
                </h3>
                <pre className="mb-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">int</span>{" "}
                  <span className="text-amber-300">add</span>(
                  <span className="text-emerald-300">int a</span>,{" "}
                  <span className="text-emerald-300">int b</span>);
                </pre>
                <p className="text-gray-300">
                  <strong>Return type:</strong> Any valid C type (int, float, char,
                  etc.) – the function produces a value of that type.
                  <br />
                  <strong>Purpose:</strong> Compute a result based on the inputs and
                  hand it back to the caller.
                  <br />
                  <strong>When & why:</strong> Whenever a task naturally produces a
                  value: mathematical operations, searching, validation, data
                  transformation – the vast majority of functions.
                </p>
              </div>

              {/* Right: animated SVG – function with input and output arrows */}
              <div
                className={clsx(
                  "topic10-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="160"
                  viewBox="0 0 300 160"
                  className="w-full max-w-xs"
                >
                  {/* Function box */}
                  <rect
                    x="100"
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
                  <text x="150" y="80" textAnchor="middle" fill="#c7d2fe">
                    function
                  </text>

                  {/* Input arrows – moving towards the box */}
                  <line
                    x1="20"
                    y1="60"
                    x2="90"
                    y2="60"
                    stroke="#a5b4fc"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="80;92;80"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="8" y="45" fill="#a5b4fc" fontSize="12">
                    arguments
                  </text>

                  {/* Output arrow – moving out of the box */}
                  <line
                    x1="210"
                    y1="60"
                    x2="280"
                    y2="60"
                    stroke="#6ee7b7"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="270;282;270"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="220" y="45" fill="#6ee7b7" fontSize="12">
                    return value
                  </text>

                  {/* Value label on return */}
                  <text x="250" y="90" fill="#6ee7b7" fontSize="14" fontWeight="bold">
                    42
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
            <div className="topic10-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, the examination system uses a
                function <code>float computePercentage(int marks[], int totalMarks)</code>.
                It receives the student’s marks and returns the percentage.{" "}
                <strong>Abhronila</strong> wrote this function and now the whole
                department uses it.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Ritaja</strong> built a
                library fine calculator:{" "}
                <code>int calculateFine(int daysOverdue)</code>. It returns the
                amount to be paid. The caller stores or displays that value.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Every student from <strong>Swadeep</strong> to{" "}
                <strong>Debangshu</strong> now understands that functions are like
                vending machines: insert coins (arguments), get a product (return
                value).
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
              Each function takes arguments, computes something, and returns the
              result. No side effects – pure computation.
            </p>

            <EditableCCodeBlock
              title="Example 1: Add two integers"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Average of an array"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Check if a number is even"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> Every function has a clear
              return type, and every execution path ends with a <code>return</code>{" "}
              statement that matches that type.
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
            <div className="topic10-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Missing return statement:
                  </span>{" "}
                  A non‑void function must return a value on all paths. Forgetting
                  leads to undefined behaviour (garbage value).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Returning wrong type:
                  </span>{" "}
                  <code>return 3.14;</code> from a function declared{" "}
                  <code>int</code> will be truncated, possibly with a warning.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring the returned value:
                  </span>{" "}
                  Calling <code>add(5,3);</code> without using the result is legal
                  but usually pointless. The compiler may warn you.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Misunderstanding <code>void</code>:
                  </span>{" "}
                  This topic is about non‑void returns. Do not use{" "}
                  <code>void</code> here unless you intend no return.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you call{" "}
                <code>isEven(5)</code> and store the result in a variable? What
                type should that variable be?
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
              <div className="topic10-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Noun‑like names for return values
                </h3>
                <p className="text-sm">
                  <code>getAverage()</code>, <code>calculateTotal()</code>,{" "}
                  <code>isValid()</code>. The name hints at what is returned.
                </p>
              </div>
              <div className="topic10-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ One return at the end
                </h3>
                <p className="text-sm">
                  For simple functions, a single <code>return</code> at the bottom
                  is easier to read. Multiple early returns are okay for error
                  checking.
                </p>
              </div>
              <div className="topic10-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Pure functions preferred
                </h3>
                <p className="text-sm">
                  Functions that only compute and return (no I/O, no global
                  modification) are easier to test and reason about.
                </p>
              </div>
              <div className="topic10-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Return error codes when needed
                </h3>
                <p className="text-sm">
                  Instead of printing errors, return a special value (e.g., -1) to
                  indicate failure. We’ll explore this in depth later.
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
              📋 Mini Checklist – Topic 10
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a function
                that takes arguments and returns a value.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always match the
                return type with the value I return.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that the caller
                can ignore the returned value, but it’s wasteful.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the
                difference between this and Topic 9 (void return).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can trace the flow:
                arguments → computation → return → assignment.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 8: TEACHER'S NOTE (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "topic10-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “When I teach this at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong>, I draw a huge black box on the
                  board. Students shout inputs, I write them on the left, then I
                  ‘compute’ and write the output on the right. That box is the
                  function. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Always initialise variables that will hold
                    return values. Never assume a function won’t fail.
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
                In the <code>average</code> example, what happens if you remove the
                <code>return avg;</code> line and just write <code>avg;</code>?
                Compile and see the warning. Then run – what value gets returned?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The function will return whatever garbage is in the register –
                  a great way to introduce bugs!)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 10 complete – you now know the full spectrum of function
            communication. Next: functions with no arguments but a return value.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic10;