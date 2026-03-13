/**
 * Topic 18: Difference between Local and Global Variables
 * File: Topic18.jsx
 *
 * Pedagogical Focus:
 * - Compare and contrast local and global variables across key dimensions.
 * - Build on Topics 16 and 17.
 * - Help students decide when to use each.
 * - Emphasise that local is the default, global is the exception.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing side‑by‑side comparison.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic18_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic18_files/local_example.c?raw";
import example2 from "./topic18_files/global_example.c?raw";
import example3 from "./topic18_files/shadow_example.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic18-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic18-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic18-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic18-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 18
// ----------------------------------------------------------------------
const Topic18 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic18-root",
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
              ⚖️ Difference Between Local and Global Variables
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Now that we've studied both local (Topic 16) and global (Topic 17)
              variables, it's time to compare them side by side. Understanding the
              differences is crucial for writing correct, maintainable C programs.
            </p>
          </section>

          {/* ----- SECTION 2: COMPARISON TABLE (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📊 Side‑by‑Side Comparison
            </h2>
            <div className="topic18-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-sm">
                {/* Header */}
                <div className="font-bold text-indigo-300">Aspect</div>
                <div className="font-bold text-indigo-300">Local Variables</div>
                <div className="font-bold text-indigo-300">Global Variables</div>

                {/* Scope */}
                <div className="text-gray-300">Scope</div>
                <div className="text-gray-300">Inside the block/function where declared</div>
                <div className="text-gray-300">Entire file (from declaration to end)</div>

                {/* Lifetime */}
                <div className="text-gray-300">Lifetime</div>
                <div className="text-gray-300">From block entry to block exit</div>
                <div className="text-gray-300">Entire program execution</div>

                {/* Storage */}
                <div className="text-gray-300">Storage</div>
                <div className="text-gray-300">Stack</div>
                <div className="text-gray-300">Data segment (or BSS)</div>

                {/* Default initial value */}
                <div className="text-gray-300">Default initial value</div>
                <div className="text-gray-300">Garbage (indeterminate)</div>
                <div className="text-gray-300">Zero</div>

                {/* Accessibility */}
                <div className="text-gray-300">Accessible by</div>
                <div className="text-gray-300">Only the function/block</div>
                <div className="text-gray-300">All functions in the file</div>

                {/* Creation/destruction */}
                <div className="text-gray-300">Creation/Destruction</div>
                <div className="text-gray-300">On each call/entry and exit</div>
                <div className="text-gray-300">Once, before/after main()</div>

                {/* Use case */}
                <div className="text-gray-300">Typical use</div>
                <div className="text-gray-300">Temporary data, loop counters, parameters</div>
                <div className="text-gray-300">Configuration, shared state, constants</div>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: ILLUSTRATIVE SVG (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "flex justify-center"
            )}
          >
            <div
              className={clsx(
                "topic18-card inline-block rounded-xl border p-4",
                "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              )}
            >
              <svg
                width="400"
                height="200"
                viewBox="0 0 400 200"
                className="w-full max-w-md"
              >
                {/* Global area at top */}
                <rect
                  x="50"
                  y="10"
                  width="300"
                  height="40"
                  rx="6"
                  fill="#4f46e5"
                  fillOpacity="0.2"
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;20;0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="200" y="35" fill="#c7d2fe" fontSize="12" textAnchor="middle">
                  Global variables (data segment)
                </text>
                <rect x="170" y="15" width="40" height="25" rx="4" fill="#4f46e5" fillOpacity="0.4" />
                <text x="190" y="32" fill="#e0e7ff" fontSize="10" textAnchor="middle">
                  g
                </text>

                {/* Stack growing downward */}
                <rect
                  x="50"
                  y="80"
                  width="300"
                  height="100"
                  fill="none"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <text x="200" y="75" fill="#9ca3af" fontSize="10" textAnchor="middle">
                  Stack
                </text>

                {/* main() frame */}
                <rect
                  x="70"
                  y="90"
                  width="120"
                  height="30"
                  rx="4"
                  fill="#1f2937"
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                <text x="130" y="110" fill="#d1d5db" fontSize="8" textAnchor="middle">
                  main() frame
                </text>
                <rect x="90" y="95" width="20" height="15" rx="2" fill="#4f46e5" fillOpacity="0.3" />
                <text x="100" y="107" fill="#c7d2fe" fontSize="7" textAnchor="middle">
                  a
                </text>

                {/* func() frame */}
                <rect
                  x="210"
                  y="120"
                  width="120"
                  height="30"
                  rx="4"
                  fill="#1f2937"
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                <text x="270" y="140" fill="#d1d5db" fontSize="8" textAnchor="middle">
                  func() frame
                </text>
                <rect x="240" y="125" width="20" height="15" rx="2" fill="#4f46e5" fillOpacity="0.3" />
                <text x="250" y="137" fill="#c7d2fe" fontSize="7" textAnchor="middle">
                  b
                </text>

                {/* Arrows showing accessibility */}
                <line
                  x1="80"
                  y1="50"
                  x2="120"
                  y2="90"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  markerEnd="url(#arrowHead)"
                />
                <line
                  x1="280"
                  y1="50"
                  x2="270"
                  y2="120"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  markerEnd="url(#arrowHead)"
                />

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
              title="Example 1: Local variables in action"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Global variable shared across functions"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Shadowing – local hides global"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, the local
              <code>x</code> in <code>func</code> hides the global. Inside
              <code>func</code>, there's no way to access the global (without using
              the scope resolution operator, which C doesn't have).
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
              🏫 Local vs Global at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic18-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> was
                writing a program to manage student grades. He used a global
                <code>total_students</code>. But when he wrote a function to compute
                average, he accidentally reused the same name as a local counter –
                shadowing caused a bug that took hours to find.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Tuhina</strong> learned to
                use globals only for configuration (like school name) and locals for
                everything else. Her code became much easier to debug.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Abhronila, Debangshu, Ritaja</strong> now
                instinctively think: “Should this be local or global?”
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
            <div className="topic18-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Shadowing without realising:
                  </span>{" "}
                  Declaring a local with the same name as a global hides the global.
                  The function works on the local, and the global remains unchanged,
                  often unexpectedly.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming globals are safe:
                  </span>{" "}
                  Because they're accessible everywhere, any function can change
                  them, leading to mysterious state changes.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not initialising locals:
                  </span>{" "}
                  Locals contain garbage; using them before assignment causes
                  undefined behaviour. Globals are zero‑initialised.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Using globals for temporary data:
                  </span>{" "}
                  This ties functions together unnecessarily and makes code less
                  modular.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why would a language designer make
                locals uninitialised by default? (Performance – initialising
                everything would be costly.)
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
              <div className="topic18-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Prefer locals by default
                </h3>
                <p className="text-sm">
                  Keep data as local as possible. Only promote to global when
                  multiple functions genuinely need shared state.
                </p>
              </div>
              <div className="topic18-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🏷️ Name globals distinctively
                </h3>
                <p className="text-sm">
                  Use a prefix like <code>g_</code> (e.g., <code>g_total</code>) to
                  immediately identify globals in code.
                </p>
              </div>
              <div className="topic18-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Make globals <code>const</code> when possible
                </h3>
                <p className="text-sm">
                  If a global shouldn't change, declare it <code>const</code> to
                  prevent accidental modification.
                </p>
              </div>
              <div className="topic18-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📦 Pass parameters instead of globals
                </h3>
                <p className="text-sm">
                  Functions that communicate via parameters are easier to test and
                  reuse. Globals create hidden dependencies.
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
              📋 Mini Checklist – Topic 18
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can list at least five
                differences between local and global variables.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that locals are
                uninitialised by default, globals are zero‑initialised.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand shadowing
                and how to avoid it.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can decide when to use
                a global vs local in my own programs.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I use naming conventions
                to distinguish globals.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic18-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “In my 27 years at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong>, the ‘local vs global’ confusion
                  causes more bugs than almost anything else. I tell my students:
                  think of locals as your personal notebook, globals as the public
                  library. You can scribble in your notebook, but if you write in a
                  library book, everyone sees it. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When debugging, first suspect global
                    variables – they're often the culprit.
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
                In the shadowing example, add <code>extern int x;</code> inside the
                block. Does it let you access the global? (No – C has no way to
                access a shadowed global.)
                <br />
                <span className="mt-2 block text-gray-400">
                  (This is why you should avoid shadowing altogether.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 18 complete – you can now distinguish locals from globals. Next:
            static variables inside functions (intro).
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic18;