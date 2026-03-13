/**
 * Topic 17: Global Variables – Scope, Lifetime and Risks
 * File: Topic17.jsx
 *
 * Pedagogical Focus:
 * - Define global variables: declared outside any function.
 * - Scope: entire file (from declaration point to end).
 * - Lifetime: entire program execution.
 * - Storage: data segment (not stack).
 * - Highlight risks: unintended modification, naming conflicts, reduced modularity.
 * - Build on Topic 16 (local variables).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing global in data segment accessible by multiple functions.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic17_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic17_files/global_counter.c?raw";
import example2 from "./topic17_files/global_risk.c?raw";
import example3 from "./topic17_files/global_vs_local.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlobal {
    0%, 100% { stroke-opacity: 0.3; fill-opacity: 0.1; }
    50% { stroke-opacity: 1; fill-opacity: 0.3; }
  }
  @media (prefers-color-scheme: light) {
    .topic17-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic17-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic17-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic17-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 17
// ----------------------------------------------------------------------
const Topic17 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic17-root",
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
              🌍 Global Variables – Scope, Lifetime and Risks
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Unlike local variables, <strong>global variables</strong> are declared
              outside any function. They live for the entire program and can be
              accessed from any function. This power comes with significant risks.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – SCOPE & LIFETIME (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 What Are Global Variables?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic17-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A <strong>global variable</strong> is defined outside all functions,
                  usually at the top of a file.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-indigo-300">Scope:</span>{" "}
                    From the point of declaration to the end of the file. Visible to
                    all functions below it.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Lifetime:</span>{" "}
                    Created before <code>main()</code> starts, destroyed after
                    <code>main()</code> ends – entire program run.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Storage:</span>{" "}
                    Data segment (not stack). Not tied to function calls.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Initialisation:</span>{" "}
                    If not explicitly initialised, globals are zero‑initialised
                    (unlike locals).
                  </li>
                </ul>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-gray-400">// global declaration</span>
                  <br />
                  <span className="text-purple-400">int</span>{" "}
                  <span className="text-amber-300">counter</span> = 0;
                  <br />
                  <br />
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">func</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;counter++;{" "}
                  <span className="text-gray-400">// global can be modified</span>
                  <br />
                  {"}"}
                </div>
              </div>

              {/* Right: animated SVG – global data segment + functions accessing */}
              <div
                className={clsx(
                  "topic17-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Data segment – global area */}
                  <rect
                    x="40"
                    y="20"
                    width="220"
                    height="50"
                    rx="8"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;20;0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="150" y="45" fill="#c7d2fe" fontSize="12" textAnchor="middle">
                    Data Segment (global)
                  </text>
                  <rect
                    x="120"
                    y="25"
                    width="60"
                    height="30"
                    rx="4"
                    fill="#4f46e5"
                    fillOpacity="0.5"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                  />
                  <text x="150" y="45" fill="#e0e7ff" fontSize="10" textAnchor="middle">
                    counter = 0
                  </text>

                  {/* Function 1 */}
                  <rect
                    x="20"
                    y="100"
                    width="100"
                    height="40"
                    rx="6"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                  />
                  <text x="70" y="125" fill="#d1d5db" fontSize="10" textAnchor="middle">
                    func1()
                  </text>
                  {/* Arrow to global */}
                  <line
                    x1="70"
                    y1="100"
                    x2="120"
                    y2="55"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;10;0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Function 2 */}
                  <rect
                    x="180"
                    y="140"
                    width="100"
                    height="40"
                    rx="6"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                  />
                  <text x="230" y="165" fill="#d1d5db" fontSize="10" textAnchor="middle">
                    func2()
                  </text>
                  {/* Arrow to global */}
                  <line
                    x1="200"
                    y1="140"
                    x2="150"
                    y2="55"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;10;0"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </line>

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

          {/* ----- SECTION 3: WHY USE (OR AVOID) GLOBALS? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 When Are Globals Used?
            </h2>
            <div className="topic17-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Legitimate uses:</strong> Configuration settings, program
                state that truly needs to be shared (e.g., a game's score), constants
                (with <code>const</code>), or when required by legacy code.
              </p>
              <p className="mb-2">
                <strong>Risks and why professionals avoid them:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Hidden dependencies – any function can modify, making debugging hard.</li>
                <li>Namespace pollution – risk of name clashes.</li>
                <li>Thread safety issues (in multi‑threaded programs).</li>
                <li>Reduced modularity and reusability.</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we teach: “Globals are
                like a shared whiteboard – everyone can write, but it’s easy to
                erase someone else’s work.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – globals in action (delay-0.3s) ----- */}
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
              title="Example 1: Global counter"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Risk – unintended modification"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Global vs local shadowing"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 2, a function
              meant to print accidentally modifies the global – a common bug.
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
              🏫 Global Variables at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic17-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> used a
                global to track the total number of students. It worked fine until
                <strong>Ritaja</strong> accidentally modified it in her attendance
                function – the total became wrong, and they spent hours debugging.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> learned
                to use globals for configuration (like school name) but made them{" "}
                <code>const</code> to prevent modification.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Tuhina, Abhronila</strong> now understand
                that with great power comes great responsibility.
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
            <div className="topic17-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Accidental modification:
                  </span>{" "}
                  A function meant only to read may inadvertently change a global.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Shadowing with locals:
                  </span>{" "}
                  Declaring a local variable with the same name hides the global,
                  causing confusion.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Overusing globals:
                  </span>{" "}
                  Making everything global leads to spaghetti code – functions
                  become dependent on hidden state.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Initialisation order:
                  </span>{" "}
                  In multi‑file programs, globals in different files may be
                  initialised in an unspecified order (static initialisation order
                  fiasco).
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How would you redesign a program
                that uses many globals to be more modular?
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
              <div className="topic17-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Minimise globals
                </h3>
                <p className="text-sm">
                  Prefer passing parameters or using static file‑scope variables
                  (Topic 28). Only truly global state should be global.
                </p>
              </div>
              <div className="topic17-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Use <code>const</code> for read‑only
                </h3>
                <p className="text-sm">
                  If a global should not change, declare it as <code>const</code>.
                  The compiler will enforce it.
                </p>
              </div>
              <div className="topic17-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🏷️ Naming convention
                </h3>
                <p className="text-sm">
                  Use a prefix like <code>g_</code> or <code>global_</code> to
                  clearly identify globals (e.g., <code>g_counter</code>).
                </p>
              </div>
              <div className="topic17-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📦 Group related globals in structs
                </h3>
                <p className="text-sm">
                  Instead of many separate globals, put them in a struct and pass
                  a pointer (simulates a “context”).
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
              📋 Mini Checklist – Topic 17
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can define a global
                variable and explain its scope/lifetime.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know globals are
                zero‑initialised by default.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the risks:
                accidental modification, namespace pollution.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I use <code>const</code>{" "}
                for read‑only globals.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I prefer to avoid globals
                unless absolutely necessary.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic17-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “I’ve seen countless projects at <strong>Barrackpore CNAT</strong>{" "}
                  and <strong>Naihati CNAT</strong> derailed by over‑enthusiastic use
                  of globals. A student once changed a global in a ‘read‑only’
                  function and spent a week finding the bug. <br />
                  <span className="mt-2 block italic">
                    💡 My advice: Treat globals like nuclear energy – powerful but
                    dangerous. Encapsulate them, mark them clearly, and always ask:
                    ‘Does this really need to be global?’
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
                In the global risk example, add <code>const</code> to the global
                declaration (<code>const int data = 100;</code>). What happens when
                you try to modify it in <code>evil</code>? Why?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The compiler will catch the unintended modification – a great
                  safety net!)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 17 complete – you now understand global variables. Next: difference
            between local and global variables.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic17;