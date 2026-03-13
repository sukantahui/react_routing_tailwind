/**
 * Topic 0: Concept of Functions and Why They Are Needed
 * File: Topic0.jsx
 *
 * Pedagogical Focus:
 * - Introduce the abstract idea of a function as a reusable, named block of code.
 * - Emphasize the "why" before the "how".
 * - Use real-world analogies, C code previews, and interactive SVGs.
 * - Strictly zero-config animations (Tailwind arbitrary values + inline keyframes).
 * - Dark mode default, light mode via prefers-color-scheme.
 * - Single‑responsibility, one topic per file.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – assume raw imports from topic0_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic0_files/function_example1.c?raw";
import example2 from "./topic0_files/function_example2.c?raw";
import example3 from "./topic0_files/function_example3.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – zero‑config, scoped to this component
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic0-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic0-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic0-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic0-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
const Topic0 = () => {
  // Calculate teacher's experience dynamically (started in 1998)
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic0-root",
          "min-h-screen w-full px-4 py-8 md:px-8 lg:px-16",
          "transition-colors duration-300",
          "font-sans leading-relaxed"
        )}
        // Dark mode default is set via the media query in the style block
      >
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ----- SECTION 1: TITLE + INTRO (fade + slide-up, delay 0) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none"
            )}
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-400 dark:text-indigo-400">
              📘 Concept of Functions & Why We Need Them
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Before writing a single line of code, every professional programmer
              asks: <em>“Why do I need this?”</em> This topic builds the intuition
              behind functions – the building blocks of every C program.
            </p>
          </section>

          {/* ----- SECTION 2: WHAT IS A FUNCTION? (conceptual SVG + explanation) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🧠 What is a Function?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: descriptive text */}
              <div className="topic0-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A <strong className="text-indigo-300">function</strong> is a
                  self‑contained, named block of code designed to perform a
                  single, specific task. Think of it as a tiny machine:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-gray-300">
                  <li>
                    <span className="font-semibold text-indigo-300">
                      Input →
                    </span>{" "}
                    data you give it (parameters)
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">
                      Process →
                    </span>{" "}
                    the instructions inside
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">
                      → Output
                    </span>{" "}
                    result it sends back (return value)
                  </li>
                </ul>
                <p className="mt-4 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> Without functions, all
                  code would be one long, unorganized script – hard to read,
                  debug, or reuse.
                </p>
              </div>

              {/* Right: animated SVG – function box with I/O */}
              <div
                className={clsx(
                  "topic0-card flex items-center justify-center rounded-xl border p-4",
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

                  {/* Input arrow + label */}
                  <line
                    x1="20"
                    y1="70"
                    x2="80"
                    y2="70"
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
                  <text x="8" y="55" fill="#a5b4fc" fontSize="12">
                    arguments
                  </text>

                  {/* Output arrow + label */}
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

                  {/* Arrow marker definition */}
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

          {/* ----- SECTION 3: WHY FUNCTIONS? (real‑world, students, places) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              ❓ Why Are Functions Indispensable?
            </h2>
            <div className="topic0-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                Imagine the computer science lab at{" "}
                <strong className="text-indigo-300">Barrackpore CNAT</strong>.
                Four students – <strong>Swadeep, Tuhina, Abhronila, Debangshu</strong>{" "}
                – are each asked to compute the average of their internal exam
                marks. Without functions, each would write the same 10 lines of
                code from scratch. With a function, they just call:
              </p>
              <div className="mb-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                <span className="text-indigo-400">average</span>
                <span className="text-gray-400">( </span>swadeep_marks
                <span className="text-gray-400"> );</span>
              </div>
              <p>
                Functions give us <strong>reusability</strong>,{" "}
                <strong>modularity</strong>, and{" "}
                <strong>abstraction</strong> – we don’t need to know how the
                average is calculated, only that it works correctly.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: ANATOMY OF A FUNCTION (prototype/signature, return, purpose) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🧩 Anatomy of a Function (The Big Picture)
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="topic0-card rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]">
                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  🔹 Prototype / Signature
                </h3>
                <p className="text-gray-300">
                  A function’s “fingerprint” – its name, return type, and
                  parameter list. It tells the compiler: “this function exists”.
                </p>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-sm">
                  <code>float average(int marks[], int n);</code>
                </pre>
              </div>
              <div className="topic0-card rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]">
                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  🔸 Return Type
                </h3>
                <p className="text-gray-300">
                  The kind of value the function sends back. Could be{" "}
                  <code>int</code>, <code>float</code>, <code>void</code> (no
                  value), etc.
                </p>
              </div>
              <div className="topic0-card rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]">
                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  🎯 Purpose
                </h3>
                <p className="text-gray-300">
                  One function, one job. Example: a function to validate marks,
                  another to compute total, another to display results.
                </p>
              </div>
              <div className="topic0-card rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]">
                <h3 className="mb-2 text-lg font-semibold text-indigo-300">
                  ⏱ When & Why Used
                </h3>
                <p className="text-gray-300">
                  Whenever a task is repeated or logically separate. Used from
                  day one in every professional C project.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 5: LIVE C CODE EXAMPLES (Editable blocks) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 First Glance at C Functions
            </h2>
            <p className="text-gray-300">
              Don’t worry about every keyword – just notice the pattern.
            </p>

            <EditableCCodeBlock
              title="Example 1: A function with no arguments, no return"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: A function with arguments and return"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: A function that greets a student (Barrackpore CNAT)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>💡 Think about…</strong> how the function name describes
              what it does. <code>greet()</code> vs <code>calculateAverage()</code>{" "}
              – readability matters!
            </div>
          </section>

          {/* ----- SECTION 6: COMMON PITFALLS (beginners) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Even Before You Write One
            </h2>
            <div className="topic0-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Misconception:
                  </span>{" "}
                  “Functions are only for math.” – No, they organise any kind of
                  logic (printing, validation, file I/O).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Compiler error (missing prototype):
                  </span>{" "}
                  Using a function before telling the compiler its signature.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Conceptual mistake:
                  </span>{" "}
                  Thinking a function <em>must</em> return something –{" "}
                  <code>void</code> is your friend.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    IDE / runtime:
                  </span>{" "}
                  Stack overflow if recursion never stops (we’ll see later).
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔍 <strong>Observe:</strong> Most function errors are not syntax
                – they are design errors (too many tasks, poor naming).
              </p>
            </div>
          </section>

          {/* ----- SECTION 7: BEST PRACTICES & TIPS (professional) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              ✅ Best Practices & Pro Tips
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic0-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧼 Single Responsibility
                </h3>
                <p className="text-sm">
                  One function, one job. If you have to use “and” in the
                  description, split it.
                </p>
              </div>
              <div className="topic0-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Readable Names
                </h3>
                <p className="text-sm">
                  <code>calc_avg_marks()</code> not <code>func1()</code>. Your
                  future self will thank you.
                </p>
              </div>
              <div className="topic0-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Testability
                </h3>
                <p className="text-sm">
                  Small functions are easy to test in isolation. Think of
                  <em> Ritaja</em> testing each piece separately.
                </p>
              </div>
              <div className="topic0-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📄 Prototypes Up Top
                </h3>
                <p className="text-sm">
                  Declare all functions at the beginning of the file (or in a
                  header). This is a non‑negotiable industry habit.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 8: MINI CHECKLIST (student takeaway) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 0
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain what a
                function is to a classmate.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know three reasons
                why we need functions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I’ve seen a function
                prototype and definition.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify input,
                process, output in a C function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that main() is
                also a function.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (mandatory) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic0-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  &nbsp;|&nbsp; 💻 27+ years (since 1998)
                </p>
                <p className="text-gray-300">
                  “I’ve taught this topic at <strong>Barrackpore CNAT</strong>{" "}
                  and <strong>Naihati CNAT</strong> for over two decades. The
                  single biggest shift in a beginner’s mind is when they stop
                  seeing functions as ‘extra typing’ and start seeing them as
                  ‘organisation tools’. <br />
                  <span className="mt-2 block italic">
                    🧠 Remind students: Every time you copy‑paste code, ask
                    yourself – ‘should this be a function?’
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: HINT (subtle guidance) ----- */}
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
                <strong className="text-indigo-300">Hint – try this:</strong>{" "}
                Look at the three C examples above. Change the function name from{" "}
                <code>greet</code> to <code>welcome</code> – does the program
                still work? Why does the compiler complain?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Think about how the compiler matches calls to definitions.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- footer / closing note ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 0 complete – you have built the mental model. Next: we write
            our first function.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic0;