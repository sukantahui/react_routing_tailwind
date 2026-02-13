/**
 * Topic 12: Call by Value Mechanism in C
 * File: Topic12.jsx
 *
 * Pedagogical Focus:
 * - Explain the fundamental parameter‑passing mechanism of C.
 * - Emphasise that arguments are copied; the function works on copies.
 * - Builds directly on Topics 5‑6 (parameters vs arguments, formal/actual).
 * - No pointers, no call‑by‑reference – pure call‑by‑value.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing data being copied into stack frames.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic12_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic12_files/increment.c?raw";
import example2 from "./topic12_files/swap_fail.c?raw";
import example3 from "./topic12_files/array_element.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseCopy {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  @media (prefers-color-scheme: light) {
    .topic12-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic12-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic12-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic12-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 12
// ----------------------------------------------------------------------
const Topic12 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic12-root",
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
              📦 Call by Value Mechanism in C
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              When you pass data to a C function, you are always giving it a
              <em> copy</em>. The function works on its own private copies, not the
              originals. This is the most important rule of C functions – and the
              source of endless beginner confusion.
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
              📌 What Is Call by Value?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic12-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <strong className="text-indigo-300">Definition:</strong> The
                  value of each actual argument is evaluated and <em>copied</em> into
                  the corresponding formal parameter (a brand‑new local variable).
                </p>
                <p className="mb-3">
                  Inside the function, you are always touching the copy. When the
                  function ends, the copies are destroyed. The original variables
                  remain unchanged.
                </p>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">change</span>(
                  <span className="text-emerald-300">int x</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;x = 100; &nbsp;
                  <span className="text-gray-400">// changes the COPY</span>
                  <br />
                  {"}"}
                  <br />
                  <span className="text-purple-400">int</span> a = 5;
                  <br />
                  change(a);
                  <br />
                  <span className="text-gray-400">// a is STILL 5</span>
                </div>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> No special syntax – this
                  is the <em>only</em> way C passes parameters.
                </p>
              </div>

              {/* Right: animated SVG – copying values */}
              <div
                className={clsx(
                  "topic12-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Original variable (caller) */}
                  <rect
                    x="20"
                    y="30"
                    width="60"
                    height="40"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.1"
                    stroke="#818cf8"
                    strokeWidth="2"
                  />
                  <text x="50" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="12">
                    a = 5
                  </text>

                  {/* Copy operation (animated) */}
                  <circle cx="100" cy="50" r="12" fill="#f59e0b" fillOpacity="0.3">
                    <animate
                      attributeName="r"
                      values="12;16;12"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text x="100" y="30" fill="#f59e0b" fontSize="10" textAnchor="middle">
                    copy
                  </text>

                  {/* Function box with parameter copy */}
                  <rect
                    x="140"
                    y="20"
                    width="140"
                    height="120"
                    rx="12"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="210" y="40" fill="#9ca3af" fontSize="12">
                    function
                  </text>

                  {/* Parameter copy inside function */}
                  <rect
                    x="170"
                    y="60"
                    width="60"
                    height="40"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="2"
                  />
                  <text x="200" y="85" textAnchor="middle" fill="#c7d2fe" fontSize="12">
                    x = 5
                  </text>

                  {/* Modification inside function */}
                  <text x="200" y="120" fill="#f87171" fontSize="12">
                    x = 100 (copy)
                  </text>

                  {/* Arrow from caller to copy */}
                  <line
                    x1="85"
                    y1="50"
                    x2="165"
                    y2="80"
                    stroke="#a5b4fc"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;20;0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Cross over original? No – indicate no change */}
                  <line
                    x1="15"
                    y1="80"
                    x2="75"
                    y2="80"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeDasharray="5 2"
                  />
                  <text x="45" y="95" fill="#f87171" fontSize="10">
                    unchanged
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

          {/* ----- SECTION 3: WHY CALL BY VALUE? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🛡️ Why Does C Do This?
            </h2>
            <div className="topic12-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <strong>Protection:</strong> The caller’s data is isolated. A
                  function cannot accidentally corrupt variables it was only meant
                  to read.
                </li>
                <li>
                  <strong>Simplicity:</strong> Each function works on its own stack
                  frame; no complex aliasing rules.
                </li>
                <li>
                  <strong>Predictability:</strong> Expressions are evaluated once,
                  and the resulting value is passed.
                </li>
                <li>
                  <strong>Historical:</strong> C was designed for systems
                  programming; call‑by‑value maps directly to machine instructions
                  (push values on stack).
                </li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “You give a
                photocopy of your homework, not the original.”
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
              💻 Call by Value in Action
            </h2>
            <p className="text-gray-300">
              Run these examples. Notice how the original variables never change.
            </p>

            <EditableCCodeBlock
              title="Example 1: Increment – does it work?"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Swap – a classic failure"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Array element – still a copy (the index)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 2, the values of
              <code>a</code> and <code>b</code> are unchanged after calling{" "}
              <code>swap</code>. The function swapped its own copies, then threw
              them away.
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
              🏫 When It Matters – Barrackpore & Naihati CNAT
            </h2>
            <div className="topic12-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Debangshu</strong>{" "}
                wrote a function to apply a discount to a price. He passed the
                price variable, modified the parameter, and wondered why the
                original price didn’t change. Call by value!
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Ritaja</strong> tried to
                write a <code>swap</code> function to sort student IDs. She learned
                the hard way that C doesn’t work like that – she needed pointers
                (Topic 15).
              </p>
              <p className="text-sm italic text-gray-400">
                💡 Every student from <strong>Swadeep</strong> to{" "}
                <strong>Abhronila</strong> must internalise: functions get copies,
                not the originals.
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
            <div className="topic12-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    “My function didn’t change the variable”:
                  </span>{" "}
                  You modified the parameter, not the original. This is the #1
                  mistake in early C.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Confusing with pass‑by‑reference:
                  </span>{" "}
                  Some languages (C++, Python) have other mechanisms. C is strictly
                  call‑by‑value. (Arrays are a special case – the array name
                  decays to a pointer, which is <em>itself</em> passed by value.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Expecting swap to work:
                  </span>{" "}
                  A classic trap. Beginners write swap, test it inside the function
                  (it works there!), but the caller sees no change.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    IDE / compiler:
                  </span>{" "}
                  No error is generated – the code is perfectly legal C. The bug is
                  logical, not syntactic.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why does C allow you to modify the
                parameter if it doesn’t affect the caller? (Because the copy is
                yours to do with as you wish.)
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
              <div className="topic12-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Treat parameters as read‑only
                </h3>
                <p className="text-sm">
                  Unless you explicitly need a local copy to modify, don’t assign to
                  parameters. It confuses readers.
                </p>
              </div>
              <div className="topic12-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Use <code>const</code> for input parameters
                </h3>
                <p className="text-sm">
                  <code>void print(const int x);</code> tells the compiler and
                  humans: this is read‑only. (C99+)
                </p>
              </div>
              <div className="topic12-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Return the new value
                </h3>
                <p className="text-sm">
                  If you need to “modify” a variable, return the new value and
                  assign it: <code>x = increment(x);</code>
                </p>
              </div>
              <div className="topic12-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Pointer parameters for modification
                </h3>
                <p className="text-sm">
                  When you absolutely must change the caller’s variable, you’ll need
                  pointers (Topic 15). But that’s a future topic – for now, embrace
                  the copy.
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
              📋 Mini Checklist – Topic 12
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain call by
                value to a classmate.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that modifying a
                parameter does not change the original argument.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can predict the output
                of a function that changes its parameters.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand why
                <code>swap</code> doesn’t work without pointers.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that arrays are
                different (a pointer is passed by value).
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic12-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “For 27 years, at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong>, I’ve watched students stare at
                  their screens wondering why their <code>swap</code> function
                  doesn’t swap. It’s a rite of passage. <br />
                  <span className="mt-2 block italic">
                    💡 My trick: I bring two pieces of paper, write numbers on
                    them, and ask a student to ‘swap’ using photocopies. They see
                    immediately – the originals stay on my desk.
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
                In the <code>swap_fail.c</code> example, add print statements
                <em>inside</em> the <code>swap</code> function. You’ll see that
                <code>x</code> and <code>y</code> are swapped – so why aren’t{" "}
                <code>a</code> and <code>b</code> affected?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Because <code>x</code> and <code>y</code> are ghosts – they
                  vanish when the function ends.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 12 complete – you now understand why variables don’t change when
            passed to functions. Next: why C doesn’t have true call‑by‑reference.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic12;