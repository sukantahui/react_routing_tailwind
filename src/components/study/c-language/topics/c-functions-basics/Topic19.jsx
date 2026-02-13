/**
 * Topic 19: Static Variables Inside Functions (Intro)
 * File: Topic19.jsx
 *
 * Pedagogical Focus:
 * - Introduce the `static` keyword inside functions.
 * - Explain the hybrid nature: local scope (only visible inside function)
 *   but global lifetime (exists for entire program).
 * - Show how they retain value between calls.
 * - Build on Topics 16-18 (local and global variables).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing multiple calls accessing same static variable.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic19_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic19_files/counter_static.c?raw";
import example2 from "./topic19_files/unique_id.c?raw";
import example3 from "./topic19_files/static_vs_local.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic19-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic19-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic19-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic19-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 19
// ----------------------------------------------------------------------
const Topic19 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic19-root",
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
              🔒 Static Variables Inside Functions (Intro)
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Local variables die when a function returns. Global variables live
              forever but are visible everywhere. <strong>Static local variables</strong>
              offer a middle ground: they live forever, but are only visible inside
              their function.
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
              📌 What Is a Static Local Variable?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic19-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  Declare a variable inside a function with the keyword{" "}
                  <code>static</code>:
                </p>
                <pre className="mb-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">counter</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">static int</span>{" "}
                  <span className="text-emerald-300">count</span> = 0;
                  <br />
                  &nbsp;&nbsp;count++;
                  <br />
                  &nbsp;&nbsp;printf(<span className="text-green-300">"%d\n"</span>, count);
                  <br />
                  {"}"}
                </pre>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-indigo-300">Scope:</span>{" "}
                    Like a local – only accessible inside the function.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Lifetime:</span>{" "}
                    Like a global – exists for the entire program.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">
                      Initialisation:
                    </span>{" "}
                    Only once, before <code>main()</code> starts. If not initialised,
                    it is zero‑initialised (like globals).
                  </li>
                </ul>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> The static variable keeps
                  its value between function calls – it is <em>not</em> re‑created
                  each time.
                </p>
              </div>

              {/* Right: animated SVG – static variable persistence */}
              <div
                className={clsx(
                  "topic19-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Data segment – static variable lives here */}
                  <rect
                    x="40"
                    y="20"
                    width="220"
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
                  <text x="150" y="45" fill="#c7d2fe" fontSize="12" textAnchor="middle">
                    Data Segment (static)
                  </text>
                  <rect x="130" y="25" width="40" height="25" rx="4" fill="#4f46e5" fillOpacity="0.4" />
                  <text x="150" y="42" fill="#e0e7ff" fontSize="10" textAnchor="middle">
                    count = 3
                  </text>

                  {/* Stack frames for three function calls */}
                  <rect
                    x="50"
                    y="90"
                    width="200"
                    height="30"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="90;88;90"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="150" y="110" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    call 1 frame
                  </text>

                  <rect
                    x="50"
                    y="130"
                    width="200"
                    height="30"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="130;128;130"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="150" y="150" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    call 2 frame
                  </text>

                  <rect
                    x="50"
                    y="170"
                    width="200"
                    height="30"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="170;168;170"
                      dur="1.4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="150" y="190" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    call 3 frame
                  </text>

                  {/* Arrow from each frame to static variable */}
                  <line x1="150" y1="90" x2="150" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowHead)" />
                  <line x1="150" y1="130" x2="150" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowHead)" />
                  <line x1="150" y1="170" x2="150" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowHead)" />

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

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (conceptual) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Why Use Static Locals?
            </h2>
            <div className="topic19-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Purpose:</strong> To preserve state between function calls
                without exposing that state to the rest of the program.
              </p>
              <p className="mb-2">
                <strong>Common use cases:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Counters (how many times a function was called).</li>
                <li>Unique ID generators.</li>
                <li>Caching computed values (memoization).</li>
                <li>One‑time initialisation (e.g., opening a log file).</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “Static locals are
                the function's private, long‑term memory.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – static in action (delay-0.3s) ----- */}
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
              title="Example 1: Static counter"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Unique ID generator"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Static vs automatic local"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, the automatic
              local resets each call; the static local remembers.
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
              🏫 Static Locals at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic19-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Ritaja</strong> built a
                function to assign roll numbers to new students. She used a static
                local counter – each call got the next number, and the counter was
                safely hidden from other functions.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> used a
                static variable to cache the result of an expensive configuration
                load. The first call loaded it, subsequent calls just used the cached
                value.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Tuhina, Abhronila</strong> now
                appreciate this “private memory” feature.
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
            <div className="topic19-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Thinking static locals have global scope:
                  </span>{" "}
                  No – they are still only visible inside the function. Trying to
                  access them from another function results in a compiler error.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting <code>static</code>:
                  </span>{" "}
                  Without <code>static</code>, you get an automatic local that resets
                  each call – often not what you intended.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Misunderstanding initialisation:
                  </span>{" "}
                  The initialiser is executed only once. Changing the value later
                  does not re‑initialise it.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Using static locals in recursive functions:
                  </span>{" "}
                  Because they persist across all calls, recursion may behave
                  unexpectedly. (We'll cover recursion later.)
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> If you call a function with a static
                local from multiple threads, could there be a problem? (Yes – static
                locals are not thread‑safe without synchronisation.)
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
              <div className="topic19-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Use static locals sparingly
                </h3>
                <p className="text-sm">
                  They introduce hidden state, which can make functions harder to
                  understand and test. Prefer passing state as a parameter when
                  possible.
                </p>
              </div>
              <div className="topic19-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Name them clearly
                </h3>
                <p className="text-sm">
                  Use names that hint at persistence, e.g., <code>call_count</code>,
                  <code>next_id</code>.
                </p>
              </div>
              <div className="topic19-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Consider thread safety
                </h3>
                <p className="text-sm">
                  In multi‑threaded programs, static locals are shared data and need
                  protection (mutexes, etc.).
                </p>
              </div>
              <div className="topic19-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Document the persistent state
                </h3>
                <p className="text-sm">
                  A comment explaining that the function uses a static local and what
                  it tracks helps maintainers.
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
              📋 Mini Checklist – Topic 19
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can declare a static
                local variable.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand its scope
                (function‑only) and lifetime (program).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know it's initialised
                only once, at program start.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can use it to build a
                simple counter.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I'm aware of thread‑safety
                concerns.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic19-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong>: static locals are like a diary that
                  only the function can read and write, but the diary never gets
                  thrown away. They're perfect for counters, caches, and generators.
                  <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When debugging, if a function behaves
                    differently on the second call, suspect static locals first.
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
                In the static vs local example, remove the <code>static</code> from
                <code>static_count</code>. Run it several times. What changes?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Without static, it becomes an automatic local and resets each
                  call.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 19 complete – you've learned about static locals. Next: nested
            function calls and execution order.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic19;