/**
 * Topic 23: Stack Memory Behavior in Recursion
 * File: Topic23.jsx
 *
 * Pedagogical Focus:
 * - Explain how recursive calls use the call stack.
 * - Show stack frames being pushed for each call, then popped on return.
 * - Illustrate the risk of stack overflow with deep recursion.
 * - Build on Topics 20 (nested calls) and 22 (base/recursive cases).
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing stack frames piling up and unwinding.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic23_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic23_files/factorial_stack.c?raw";
import example2 from "./topic23_files/deep_recursion.c?raw";
import example3 from "./topic23_files/tail_recursion.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic23-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic23-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic23-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic23-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 23
// ----------------------------------------------------------------------
const Topic23 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic23-root",
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
              📚 Stack Memory Behavior in Recursion
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Recursion relies on the call stack – the same mechanism that handles
              nested function calls. Each recursive call adds a new stack frame,
              and when the base case is reached, frames are popped one by one.
              Understanding this behavior is crucial to avoid stack overflow.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 The Call Stack and Recursion
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic23-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  When a function is called, a <strong>stack frame</strong> is
                  allocated to store its local variables, parameters, and return
                  address. For recursive calls, this happens repeatedly.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Push phase (winding):</strong> Each recursive call adds
                    a new frame on top of the stack.
                  </li>
                  <li>
                    <strong>Pop phase (unwinding):</strong> When a function returns,
                    its frame is removed, and control returns to the caller.
                  </li>
                  <li>
                    <strong>Stack overflow:</strong> If recursion goes too deep,
                    the stack runs out of memory, causing the program to crash.
                  </li>
                </ul>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-gray-400">// Example: factorial(3)</span>
                  <br />
                  factorial(3) <span className="text-gray-400">// pushed</span>
                  <br />
                  &nbsp;&nbsp;factorial(2) <span className="text-gray-400">// pushed</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;factorial(1) <span className="text-gray-400">// pushed</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;factorial(0) <span className="text-gray-400">// base, returns</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;factorial(1) <span className="text-gray-400">// returns</span>
                  <br />
                  &nbsp;&nbsp;factorial(2) <span className="text-gray-400">// returns</span>
                  <br />
                  factorial(3) <span className="text-gray-400">// returns</span>
                </div>
              </div>

              {/* Right: animated SVG – stack frames growing and shrinking */}
              <div
                className={clsx(
                  "topic23-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Stack area */}
                  <rect
                    x="100"
                    y="30"
                    width="120"
                    height="150"
                    fill="none"
                    stroke="#4b5563"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="160" y="20" fill="#9ca3af" fontSize="10" textAnchor="middle">
                    Stack
                  </text>

                  {/* Frames – animated to simulate growth */}
                  <rect
                    x="110"
                    y="160"
                    width="100"
                    height="20"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="160;150;140;130;120;110;100;90;80;70;60;50;40;30;20;10;0;-10;-20"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="160" y="175" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    fact(0)
                  </text>

                  <rect
                    x="110"
                    y="140"
                    width="100"
                    height="20"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="140;130;120;110;100;90;80;70;60;50;40;30;20;10;0;-10;-20;-30;-40"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="160" y="155" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    fact(1)
                  </text>

                  <rect
                    x="110"
                    y="120"
                    width="100"
                    height="20"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="120;110;100;90;80;70;60;50;40;30;20;10;0;-10;-20;-30;-40;-50;-60"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="160" y="135" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    fact(2)
                  </text>

                  <rect
                    x="110"
                    y="100"
                    width="100"
                    height="20"
                    rx="4"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="y"
                      values="100;90;80;70;60;50;40;30;20;10;0;-10;-20;-30;-40;-50;-60;-70;-80"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="160" y="115" fill="#d1d5db" fontSize="8" textAnchor="middle">
                    fact(3)
                  </text>

                  {/* Direction arrows */}
                  <line
                    x1="200"
                    y1="50"
                    x2="200"
                    y2="20"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    markerEnd="url(#arrowHeadUp)"
                  >
                    <animate
                      attributeName="y2"
                      values="20;15;20"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="220" y="35" fill="#f59e0b" fontSize="8">push</text>

                  <line
                    x1="180"
                    y1="160"
                    x2="180"
                    y2="190"
                    stroke="#6ee7b7"
                    strokeWidth="2"
                    markerEnd="url(#arrowHeadDown)"
                  >
                    <animate
                      attributeName="y2"
                      values="190;195;190"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="150" y="190" fill="#6ee7b7" fontSize="8">pop</text>

                  <defs>
                    <marker id="arrowHeadUp" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,10 L5,0 L10,10 Z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowHeadDown" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L5,10 L10,0 Z" fill="#6ee7b7" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: STACK OVERFLOW (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 The Danger: Stack Overflow
            </h2>
            <div className="topic23-card rounded-xl border p-6">
              <p className="mb-2">
                Each stack frame consumes memory. If recursion is too deep – e.g.,
                thousands of calls – the stack may exceed its limit, causing a
                <strong> stack overflow</strong>. The program crashes.
              </p>
              <p className="mb-2">
                The maximum stack size is system‑dependent (typically a few MB).
                Recursive functions that could go deep (e.g., processing a large
                tree) must be designed carefully, or replaced with iteration.
              </p>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we demonstrate this with a
                recursive function that counts down from a large number – it crashes.
              </p>
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
              title="Example 1: Factorial – stack frames"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Deep recursion – may overflow"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Tail recursion concept (no optimization in C)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 2, if you run with a
              very large number (e.g., 100000), the program will likely crash due to
              stack overflow.
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
              🏫 Stack Overflow at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic23-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Tuhina</strong> wrote a
                recursive function to traverse a nested file structure. For a shallow
                folder, it worked; for a deep one, it crashed with a segmentation
                fault – her first encounter with stack overflow.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Ritaja</strong> tried to
                compute Fibonacci recursively for n=50. The program became extremely
                slow (exponential time) and eventually crashed due to stack depth.
                She learned that not all problems suit deep recursion.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Abhronila, Debangshu</strong> now
                check recursion depth and consider iterative alternatives.
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
            <div className="topic23-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming recursion has no cost:
                  </span>{" "}
                  Each call uses memory and time. Deep recursion can exhaust stack.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not considering base case depth:
                  </span>{" "}
                  Even with correct logic, if input is too large, stack overflows.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Confusing stack overflow with infinite recursion:
                  </span>{" "}
                  Both cause crashes, but infinite recursion is a logic error;
                  stack overflow can happen with correct logic but large input.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Expecting tail call optimization in C:
                  </span>{" "}
                  C does not guarantee TCO; even tail‑recursive functions may use
                  stack frames. (Some compilers may optimize, but it's not portable.)
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> How many recursive calls can you
                safely make on your system? (Test with Example 2 and different N.)
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
              <div className="topic23-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Know your recursion depth
                </h3>
                <p className="text-sm">
                  Estimate maximum depth. If it can exceed a few thousand, consider
                  iteration.
                </p>
              </div>
              <div className="topic23-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔁 Convert deep recursion to iteration
                </h3>
                <p className="text-sm">
                  Many recursive algorithms (factorial, Fibonacci) can be written
                  iteratively with loops, avoiding stack growth.
                </p>
              </div>
              <div className="topic23-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Test with large inputs
                </h3>
                <p className="text-sm">
                  If your function might be used with large data, test its limits.
                </p>
              </div>
              <div className="topic23-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Use static analysis or stack size checks
                </h3>
                <p className="text-sm">
                  In some systems, you can query or set stack size (platform‑specific).
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
              📋 Mini Checklist – Topic 23
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain how stack
                frames are added/removed in recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the risk of
                stack overflow with deep recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can estimate approximate
                recursion depth limits on my system.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that tail recursion
                is not guaranteed to be optimized in C.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can decide when to avoid
                recursion due to stack constraints.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic23-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong>: the stack is like a spring. You can
                  push a few things, but if you keep pushing, it will eventually
                  burst. That's stack overflow. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When debugging a crash, if the call stack
                    in the debugger shows thousands of identical frames, you've hit
                    a recursion depth issue – either infinite or too deep.
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
                In the deep recursion example, change the argument from 10000 to
                1000000. Run it (if you dare). What happens? Why is the result
                different from your expectation?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The stack cannot hold a million frames – it will overflow almost
                  immediately.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 23 complete – you understand the stack's role in recursion. Next:
            advantages and disadvantages of recursion.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic23;