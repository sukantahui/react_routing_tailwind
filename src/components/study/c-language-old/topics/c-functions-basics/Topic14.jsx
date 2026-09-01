/**
 * Topic 14: Limitations of Call by Value
 * File: Topic14.jsx
 *
 * Pedagogical Focus:
 * - Identify the practical drawbacks of call‑by‑value.
 * - Show scenarios where pure value semantics fall short.
 * - Motivate the need for pointers (next topic) without actually using them yet.
 * - Build directly on Topics 12 and 13.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> illustrating the inefficiency of copying large data.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic14_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic14_files/swap_fail.c?raw";
import example2 from "./topic14_files/struct_copy.c?raw";
import example3 from "./topic14_files/return_multiple.c?raw";

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
    .topic14-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic14-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic14-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic14-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 14
// ----------------------------------------------------------------------
const Topic14 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic14-root",
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
            <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-indigo-400 dark:text-indigo-400">
              ⚖️ Limitations of Call by Value
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Call by value is simple, safe, and fast for small data – but it has
              real limitations. Understanding these will show you why C also needs
              pointers and why other languages offer different parameter‑passing
              modes.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – WHAT CAN'T IT DO? (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Four Major Limitations
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: list */}
              <div className="topic14-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <ul className="list-disc space-y-4 pl-5">
                  <li>
                    <strong className="text-indigo-300">Cannot modify original variables</strong> – 
                    any change stays inside the function.
                  </li>
                  <li>
                    <strong className="text-indigo-300">Cannot swap two variables</strong> – 
                    the classic swap fails because only copies are swapped.
                  </li>
                  <li>
                    <strong className="text-indigo-300">Cannot return multiple values</strong> – 
                    a function can only return one value (or a struct, but that’s still one object).
                  </li>
                  <li>
                    <strong className="text-indigo-300">Inefficient for large data</strong> – 
                    copying large structures or arrays wastes time and memory.
                  </li>
                </ul>
                <p className="mt-4 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> These are not bugs – they
                  are consequences of the design. To overcome them, we need
                  additional language features.
                </p>
              </div>

              {/* Right: animated SVG – large copy overhead */}
              <div
                className={clsx(
                  "topic14-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="280"
                  height="180"
                  viewBox="0 0 280 180"
                  className="w-full max-w-xs"
                >
                  {/* Large original data (caller) */}
                  <rect
                    x="20"
                    y="30"
                    width="80"
                    height="80"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.1"
                    stroke="#818cf8"
                    strokeWidth="2"
                  />
                  <text x="60" y="70" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    large
                  </text>
                  <text x="60" y="85" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    struct
                  </text>

                  {/* Copy operation – heavy */}
                  <circle cx="130" cy="70" r="16" fill="#f59e0b" fillOpacity="0.3">
                    <animate
                      attributeName="r"
                      values="14;20;14"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text x="130" cy="50" fill="#f59e0b" fontSize="10" textAnchor="middle">
                    copy
                  </text>

                  {/* Copy inside function */}
                  <rect
                    x="170"
                    y="30"
                    width="80"
                    height="80"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <text x="210" y="70" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    copy
                  </text>
                  <text x="210" y="85" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    (duplicate)
                  </text>

                  {/* Time/energy warning */}
                  <line x1="20" y1="130" x2="260" y2="130" stroke="#f87171" strokeWidth="2" strokeDasharray="5 2" />
                  <text x="140" y="150" fill="#f87171" fontSize="12" textAnchor="middle">
                    ⏱️ time & memory wasted
                  </text>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: DETAILED LIMITATIONS WITH EXAMPLES (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🔍 Each Limitation in Detail
            </h2>
            <div className="space-y-4">
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="text-lg font-semibold text-amber-300">1. Cannot modify original variables</h3>
                <p className="mt-1">When you pass a variable, the function gets a copy. Any assignment to the parameter disappears when the function returns.</p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="text-lg font-semibold text-amber-300">2. Swapping is impossible</h3>
                <p className="mt-1">The classic swap function (shown below) does nothing outside the function.</p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="text-lg font-semibold text-amber-300">3. Only one return value</h3>
                <p className="mt-1">If you need to return multiple results (e.g., quotient and remainder), you must package them in a struct or use pointers.</p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="text-lg font-semibold text-amber-300">4. Inefficient for large data</h3>
                <p className="mt-1">Copying a 1MB struct every function call is slow and memory‑hungry. In performance‑critical code, this is unacceptable.</p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – demonstrating the limits (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Examples That Show the Limits
            </h2>

            <EditableCCodeBlock
              title="Example 1: Swap still fails"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Passing a large struct – copy overhead"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Trying to return multiple values (fails)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, we cannot return
              both quotient and remainder. The workaround is to return a struct,
              but that still involves copying. Pointers will give a better solution.
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
              🏫 Student Frustrations at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic14-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Abhronila</strong> was
                building a student database. She passed a structure containing 100
                records to a function that just needed to read one field. The
                program slowed to a crawl – she was copying the entire database on
                every call!
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> tried
                to write a function that would update both a student’s marks and
                grade. He wanted to return two values but couldn’t. He ended up
                using two separate functions, which was messy.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Tuhina, Ritaja</strong> now see
                why a pure call‑by‑value language would be impractical for real
                systems.
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
            <div className="topic14-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Fighting the language:
                  </span>{" "}
                  Trying to write swap over and over, hoping it will magically work.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Passing huge structures by value:
                  </span>{" "}
                  Not realising the performance cost. In embedded systems, this can
                  cause stack overflows.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring compiler warnings:
                  </span>{" "}
                  Some compilers warn when large structs are passed by value. New
                  programmers often ignore them.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Thinking “it’s just a few bytes”:
                  </span>{" "}
                  Even a 100‑byte struct copied a thousand times becomes 100KB of
                  useless data movement.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How would you design a function
                that needs to modify two variables without using pointers?
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
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Pass small types by value
                </h3>
                <p className="text-sm">
                  <code>int</code>, <code>char</code>, <code>float</code> – copying
                  them is cheap. Use value for these.
                </p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔄 For large data, use pointers
                </h3>
                <p className="text-sm">
                  Even before learning pointers, know that they are the solution.
                  We'll cover them soon.
                </p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🎯 If you need to return multiple values
                </h3>
                <p className="text-sm">
                  Either pack them in a struct or (better) use pointers to output
                  parameters.
                </p>
              </div>
              <div className="topic14-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Profile your code
                </h3>
                <p className="text-sm">
                  If a program is slow, check if large structures are being copied
                  unnecessarily.
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
              📋 Mini Checklist – Topic 14
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can list the four main
                limitations of call by value.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand why swap
                can’t be written in plain C.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that passing large
                structs by value is inefficient.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I realise that returning
                multiple values requires workarounds.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I’m ready to learn how
                pointers overcome these limits.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic14-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “At <strong>Barrackpore CNAT</strong>, I tell my students: call by
                  value is like giving someone a photocopy of your notes. They can
                  write on it, but your original stays clean. That’s good for
                  reading, but bad if you need them to correct the original. <br />
                  <span className="mt-2 block italic">
                    💡 Professional insight: In performance‑sensitive code, even
                    small structs are often passed by pointer to avoid copying. The
                    next topic will show you how.
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
                In the <code>struct_copy.c</code> example, add a large array inside
                the struct, say <code>char buffer[10000];</code>. Then call the
                function many times. (Don’t actually run it on a small system!)
                Imagine the memory traffic.
                <br />
                <span className="mt-2 block text-gray-400">
                  (This is why real code rarely passes large structs by value.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 14 complete – you now see why call by value isn’t always enough.
            Next: an introduction to using pointers to simulate call by reference.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic14;