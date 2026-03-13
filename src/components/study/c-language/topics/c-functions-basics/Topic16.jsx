/**
 * Topic 16: Local Variables – Scope and Lifetime
 * File: Topic16.jsx
 *
 * Pedagogical Focus:
 * - Define local variables and explain where they live.
 * - Clarify scope (where they can be accessed) and lifetime (when they exist).
 * - Build on Topics 0‑15; no global variables yet (Topic 17).
 * - Use stack analogy without deep dive (full stack coverage later).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing stack frames and variable birth/death.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic16_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic16_files/basic_local.c?raw";
import example2 from "./topic16_files/block_scope.c?raw";
import example3 from "./topic16_files/separate_functions.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes stackPush {
    0% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(-5px); opacity: 1; }
    100% { transform: translateY(0); opacity: 0.5; }
  }
  @media (prefers-color-scheme: light) {
    .topic16-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic16-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic16-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic16-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 16
// ----------------------------------------------------------------------
const Topic16 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic16-root",
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
              📦 Local Variables – Scope and Lifetime
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Variables declared inside a function are called <strong>local</strong>.
              They are born when the function is called and die when it returns.
              Understanding their scope (where they are visible) and lifetime (how
              long they exist) is essential to writing correct C programs.
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
              📌 What Are Local Variables?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic16-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A <strong>local variable</strong> is declared inside a function or
                  a block <code>{ }</code>. It is:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-indigo-300">Scope:</span>{" "}
                    from its declaration to the end of the enclosing block. Not
                    accessible outside.
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Lifetime:</span>{" "}
                    created when the block is entered, destroyed when the block
                    exits (for function‑level, when the function returns).
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-300">Storage:</span>{" "}
                    Typically on the <strong>stack</strong> (a region of memory that
                    grows and shrinks with function calls).
                  </li>
                </ul>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">func</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-emerald-300">int x = 5;</span>{" "}
                  <span className="text-gray-400">// local: scope = inside func</span>
                  <br />
                  {"}"} <span className="text-gray-400">// x dies here</span>
                </div>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> Different functions can
                  have local variables with the same name – they are independent.
                </p>
              </div>

              {/* Right: animated SVG – stack frames with local variables */}
              <div
                className={clsx(
                  "topic16-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Stack representation */}
                  <rect
                    x="50"
                    y="30"
                    width="200"
                    height="140"
                    fill="none"
                    stroke="#4b5563"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="150" y="20" fill="#9ca3af" fontSize="12" textAnchor="middle">
                    Stack (grows downward)
                  </text>

                  {/* Frame for main() */}
                  <rect
                    x="70"
                    y="50"
                    width="160"
                    height="40"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                  />
                  <text x="150" y="70" fill="#d1d5db" fontSize="10" textAnchor="middle">
                    main() frame
                  </text>
                  <rect
                    x="90"
                    y="60"
                    width="30"
                    height="20"
                    rx="2"
                    fill="#4f46e5"
                    fillOpacity="0.3"
                    stroke="#818cf8"
                    strokeWidth="1"
                  />
                  <text x="105" y="75" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                    a
                  </text>

                  {/* Frame for func() – pushed on call */}
                  <rect
                    x="70"
                    y="100"
                    width="160"
                    height="40"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="y"
                      values="100;98;100"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="150" y="120" fill="#d1d5db" fontSize="10" textAnchor="middle">
                    func() frame (alive now)
                  </text>
                  <rect
                    x="110"
                    y="110"
                    width="30"
                    height="20"
                    rx="2"
                    fill="#4f46e5"
                    fillOpacity="0.3"
                    stroke="#818cf8"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="fill-opacity"
                      values="0.3;0.8;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="125" y="125" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                    x
                  </text>

                  {/* Arrow indicating function call */}
                  <line
                    x1="150"
                    y1="90"
                    x2="150"
                    y2="100"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    markerEnd="url(#arrowHead)"
                  />
                  <text x="170" y="90" fill="#f59e0b" fontSize="8">
                    call func()
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

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (not applicable, but we explain concept) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Why Local Variables Matter
            </h2>
            <div className="topic16-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Encapsulation:</strong> Local variables keep data private to
                a function. No accidental interference from other parts of the
                program.
              </p>
              <p className="mb-2">
                <strong>Memory efficiency:</strong> They exist only when needed and
                are automatically cleaned up.
              </p>
              <p className="mb-2">
                <strong>Reusability:</strong> You can use the same variable names in
                different functions without conflict.
              </p>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “Local variables
                are like private diaries – only the function that owns them can read
                or write.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – local variables (delay-0.3s) ----- */}
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
              title="Example 1: Basic local variable"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Block scope (inside if)"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Same name, different functions"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, <code>x</code> in
              <code>func1</code> and <code>func2</code> are completely independent.
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
              🏫 Local Variables in Action – Barrackpore & Naihati CNAT
            </h2>
            <div className="topic16-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Tuhina</strong> wrote a
                program with two functions: one to calculate total marks, another to
                calculate average. Both used a local variable <code>sum</code>. They
                never interfered – each had its own copy.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> created
                a loop inside a function and declared a variable inside the loop
                block. She learned that variable was destroyed each iteration and
                re‑created – a common point of confusion.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Debangshu, Ritaja</strong> now
                appreciate that local variables are temporary and private.
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
            <div className="topic16-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Using a local variable outside its scope:
                  </span>{" "}
                  Trying to access a variable declared inside an <code>if</code> after
                  the block ends – compiler error.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming local variables retain values between calls:
                  </span>{" "}
                  Each call creates a fresh copy. Use <code>static</code> if you need
                  persistence (Topic 19).
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Shadowing variables:
                  </span>{" "}
                  Declaring a local variable with the same name as a global (or outer
                  block) hides the outer one – can cause confusion.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to initialise:
                  </span>{" "}
                  Local variables (automatic) contain garbage if not initialised.
                  Always initialise before use.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you declare a
                variable inside a <code>for</code> loop and try to use it after the
                loop?
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
              <div className="topic16-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Declare variables close to first use
                </h3>
                <p className="text-sm">
                  Don’t declare all at the top of the function unless required (old C
                  style). Modern C allows mixed declarations.
                </p>
              </div>
              <div className="topic16-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Always initialise
                </h3>
                <p className="text-sm">
                  <code>int count = 0;</code> – prevents garbage values.
                </p>
              </div>
              <div className="topic16-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Keep scope as small as possible
                </h3>
                <p className="text-sm">
                  Declare variables inside the smallest block that needs them. Improves
                  readability and reduces bugs.
                </p>
              </div>
              <div className="topic16-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Avoid shadowing
                </h3>
                <p className="text-sm">
                  Don’t reuse a name already used in an outer scope – it’s confusing.
                  Enable compiler warnings (<code>-Wshadow</code>).
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
              📋 Mini Checklist – Topic 16
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain what a
                local variable is.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand scope (where
                it’s visible) and lifetime (when it exists).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that local
                variables are created on the stack.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always initialise local
                variables before use.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can predict when a
                variable goes out of scope.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic16-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “I’ve seen students at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong> struggle when a variable ‘disappears’
                  after a function returns. I use the analogy of a whiteboard in a
                  classroom – each function gets its own whiteboard (stack frame),
                  and when the function ends, the board is wiped clean. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Debuggers show you local variables in the
                    current stack frame. Watch how they appear and vanish as you step
                    through calls.
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
                In the block scope example, try printing <code>block_var</code> after
                the <code>if</code> block. What error do you get? Why?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Because the variable’s scope ended with the block.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 16 complete – you now understand local variables. Next: global
            variables – scope, lifetime, and risks.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic16;