/**
 * Topic 11: Functions with No Arguments but Return Value
 * File: Topic11.jsx
 *
 * Pedagogical Focus:
 * - Complete the four‑part taxonomy (Topics 8‑11).
 * - Now a function produces a value but requires no external input.
 * - Builds on Topics 8‑10; no global variables, no static (future topics).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing only an output arrow.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic11_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic11_files/get_answer.c?raw";
import example2 from "./topic11_files/get_pi.c?raw";
import example3 from "./topic11_files/get_initial.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic11-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic11-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic11-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic11-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 11
// ----------------------------------------------------------------------
const Topic11 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic11-root",
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
              📤 Functions with No Arguments but Return Value
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              We’ve seen functions that only act (Topic 8), that act on inputs
              (Topic 9), and that transform inputs into outputs (Topic 10). Now we
              meet the fourth kind: a function that <em>produces a value</em> but
              needs <strong>no information from the caller</strong>.
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
              <div className="topic11-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-3 text-lg font-semibold text-indigo-300">
                  🔹 Prototype / Signature
                </h3>
                <pre className="mb-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">int</span>{" "}
                  <span className="text-amber-300">getAnswer</span>(
                  <span className="text-emerald-300">void</span>);
                </pre>
                <p className="text-gray-300">
                  <strong>Return type:</strong> Any non‑void C type. The function
                  <em>must</em> return a value of that type.
                  <br />
                  <strong>Purpose:</strong> Supply a value that is either constant,
                  derived from internal state, or obtained from the environment
                  (time, random, configuration).
                  <br />
                  <strong>When & why:</strong> When the caller needs a piece of
                  data but has nothing to contribute – e.g., mathematical constants,
                  system information, default settings.
                </p>
                <div className="mt-4 rounded bg-gray-800 p-2 text-xs">
                  <span className="font-bold text-amber-300">⚠️ Important:</span> In
                  C, <code>int func();</code> means “any arguments” (old style).{" "}
                  <code>int func(void);</code> means “no arguments”. Always use{" "}
                  <code>void</code> for zero parameters.
                </div>
              </div>

              {/* Right: animated SVG – no input, only output */}
              <div
                className={clsx(
                  "topic11-card flex items-center justify-center rounded-xl border p-4",
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
                    function
                  </text>

                  {/* No input arrows – instead a subtle "no input" symbol */}
                  <circle cx="40" cy="70" r="16" stroke="#f87171" strokeWidth="2" fill="none" />
                  <line x1="28" y1="58" x2="52" y2="82" stroke="#f87171" strokeWidth="2" />
                  <text x="40" y="55" fill="#f87171" fontSize="12" textAnchor="middle">
                    no args
                  </text>

                  {/* Output arrow – moving out */}
                  <line
                    x1="200"
                    y1="70"
                    x2="260"
                    y2="70"
                    stroke="#6ee7b7"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="250;262;250"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="210" y="55" fill="#6ee7b7" fontSize="12">
                    return value
                  </text>
                  <text x="250" y="100" fill="#6ee7b7" fontSize="14" fontWeight="bold">
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
            <div className="topic11-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, the exam server has a function{" "}
                <code>int getCurrentSessionYear()</code>. It knows the academic
                year from its internal clock; no one needs to tell it.{" "}
                <strong>Swadeep</strong> uses it to label answer scripts.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, the library system has{" "}
                <code>float getLateFeePerDay()</code>. The fee is fixed by the
                administration – the function simply returns the constant.{" "}
                <strong>Tuhina</strong> calls it to compute fines.
              </p>
              <p className="mb-4">
                <strong>Abhronila</strong> wrote a game where{" "}
                <code>char getPlayerInitial()</code> returns her initial ‘A’ – a
                small personalisation without needing input.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Every student now sees that functions can be sources of data,
                not just consumers.
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
              💻 Three Minimal Examples
            </h2>
            <p className="text-gray-300">
              Each function takes <code>void</code> and returns a value. No
              side effects – they are pure suppliers.
            </p>

            <EditableCCodeBlock
              title="Example 1: Return a fixed integer"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Return a mathematical constant"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Return a character"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> All three use{" "}
              <code>(void)</code> in the parameter list. The return type matches
              the value returned. The caller can use the returned value directly.
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
            <div className="topic11-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Empty parentheses ≠ void:
                  </span>{" "}
                  <code>int get();</code> in C does <em>not</em> mean “no
                  arguments” – it means “arguments unspecified”. Always write{" "}
                  <code>int get(void);</code>.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to return:
                  </span>{" "}
                  A non‑void function with no return statement causes undefined
                  behaviour. The caller will receive garbage.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Using <code>void</code> as return type:
                  </span>{" "}
                  That would be Topic 8, not this topic. Here we want a value.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Thinking “no arguments” means “no purpose”:
                  </span>{" "}
                  Constants, configuration, and environmental queries are extremely
                  common in real systems.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why did the C standard keep the
                old <code>int func();</code> syntax? (Historical compatibility.)
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
              <div className="topic11-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Prefixes that signal “getter”
                </h3>
                <p className="text-sm">
                  <code>get_</code>, <code>fetch_</code>, <code>current_</code> – e.g.,{" "}
                  <code>get_timestamp()</code>. Immediately tells the caller no
                  input is needed.
                </p>
              </div>
              <div className="topic11-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Always use <code>(void)</code>
                </h3>
                <p className="text-sm">
                  In C, this is the only portable way to say “no parameters”. It
                  also enables better compiler diagnostics.
                </p>
              </div>
              <div className="topic11-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Pure functions are testable
                </h3>
                <p className="text-sm">
                  A function that only returns a constant is trivial to test. If it
                  reads time/random, mock those dependencies.
                </p>
              </div>
              <div className="topic11-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Consider <code>const</code> for constants
                </h3>
                <p className="text-sm">
                  Instead of a function, a <code>#define</code> or{" "}
                  <code>const</code> global is often better. But a function allows
                  future changes (e.g., reading from a config file).
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
              📋 Mini Checklist – Topic 11
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a function
                with <code>(void)</code> and a non‑void return.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know the difference
                between <code>func()</code> and <code>func(void)</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always include a
                matching <code>return</code> statement.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can use the returned
                value in an expression or assignment.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that this
                complements Topic 8 (void return, void argument).
              </li>
            </ul>
          </section>

          {/* ----- SECTION 8: TEACHER'S NOTE (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "topic11-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “At <strong>Barrackpore CNAT</strong>, I draw a vending machine
                  with an empty coin slot – students laugh, but they remember. The
                  machine still gives a soda (the return value) because it’s
                  pre‑programmed. <br />
                  <span className="mt-2 block italic">
                    💡 Professional insight: In large codebases, getter functions
                    without arguments are often the first step toward refactoring
                    hard‑coded constants into configurable values.
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
                In <code>get_answer.c</code>, remove the <code>void</code> keyword
                so the prototype becomes <code>int getAnswer()</code>. Compile with
                warnings enabled (<code>-Wall -Wextra</code>). What does the
                compiler say? Now call <code>getAnswer(10, 20);</code> – does it
                compile? Run it. Surprised?
                <br />
                <span className="mt-2 block text-gray-400">
                  (This demonstrates why old‑style declarations are dangerous.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 11 complete – you’ve mastered all four fundamental function
            patterns. Next: how arguments are passed – call by value.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic11;