/**
 * Topic 21: Recursive Functions – Concept and Definition
 * File: Topic21.jsx
 *
 * Pedagogical Focus:
 * - Introduce recursion: a function that calls itself.
 * - Explain the two essential parts: base case and recursive case (briefly, full in Topic 22).
 * - Show how recursion breaks a problem into smaller subproblems.
 * - Build on Topic 20 (nested calls) – recursion is just a special nested call.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing recursive self‑calls.
 * - Strict one‑topic, no forward jumping (deeper recursion details later).
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic21_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic21_files/countdown.c?raw";
import example2 from "./topic21_files/factorial_concept.c?raw";
import example3 from "./topic21_files/stack_demo.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic21-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic21-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic21-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic21-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 21
// ----------------------------------------------------------------------
const Topic21 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic21-root",
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
              🔁 Recursive Functions – Concept and Definition
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              A function that calls itself is called <strong>recursive</strong>.
              This powerful technique allows solving complex problems by breaking
              them into smaller, identical subproblems. Recursion is everywhere
              in computer science – from file system traversal to parsing.
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
              📌 What Is Recursion?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic21-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <strong>Definition:</strong> Recursion occurs when a function
                  contains a call to itself. For example:
                </p>
                <pre className="mb-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">countDown</span>(<span className="text-emerald-300">int n</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-gray-400">// base case</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">if</span> (n &lt;= 0) {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;printf(<span className="text-green-300">"Done!\n"</span>);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span>;
                  <br />
                  &nbsp;&nbsp;{"}"}
                  <br />
                  &nbsp;&nbsp;printf(<span className="text-green-300">"%d\n"</span>, n);
                  <br />
                  &nbsp;&nbsp;countDown(n - 1); <span className="text-gray-400">// recursive call</span>
                  <br />
                  {"}"}
                </pre>
                <p className="mb-2">
                  <strong>Two essential parts:</strong>
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong>Base case:</strong> condition that stops recursion (prevents infinite calls).</li>
                  <li><strong>Recursive case:</strong> the function calls itself with a smaller or simpler argument.</li>
                </ul>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> Each recursive call creates
                  a new stack frame, just like any nested call (Topic 20).
                </p>
              </div>

              {/* Right: animated SVG – recursive self‑calls */}
              <div
                className={clsx(
                  "topic21-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Stack frames for recursive calls */}
                  <rect x="120" y="20" width="100" height="30" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="40" fill="#d1d5db" fontSize="9" textAnchor="middle">countDown(3)</text>

                  <rect x="120" y="55" width="100" height="30" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="75" fill="#d1d5db" fontSize="9" textAnchor="middle">countDown(2)</text>

                  <rect x="120" y="90" width="100" height="30" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="110" fill="#d1d5db" fontSize="9" textAnchor="middle">countDown(1)</text>

                  <rect x="120" y="125" width="100" height="30" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="170" y="145" fill="#d1d5db" fontSize="9" textAnchor="middle">countDown(0)</text>

                  {/* Call arrows (down) */}
                  <line x1="170" y1="50" x2="170" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="y2" values="55;60;55" dur="1.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="170" y1="85" x2="170" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="y2" values="90;95;90" dur="1.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="170" y1="120" x2="170" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="y2" values="125;130;125" dur="1.5s" repeatCount="indefinite" />
                  </line>

                  {/* Return arrows (up) from base case */}
                  <line x1="190" y1="155" x2="190" y2="120" stroke="#6ee7b7" strokeWidth="2" markerEnd="url(#arrowHead2)">
                    <animate attributeName="y2" values="120;115;120" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                  </line>

                  <defs>
                    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowHead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#6ee7b7" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Anatomy of a Recursive Function
            </h2>
            <div className="topic21-card rounded-xl border p-6">
              <p className="mb-2">
                <strong>Prototype / signature:</strong> No different from any other
                function – it's just a function that happens to call itself.
              </p>
              <p className="mb-2">
                <strong>Return type:</strong> Can be any type (<code>void</code> or
                non‑void). For recursive functions that compute a value, the return
                type is that value's type (e.g., <code>int factorial(int n)</code>).
              </p>
              <p className="mb-2">
                <strong>Purpose:</strong> To solve problems that have a naturally
                recursive structure – directory trees, mathematical definitions
                (factorial, Fibonacci), divide‑and‑conquer algorithms.
              </p>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “Recursion is like
                a set of Russian dolls – each one contains a smaller copy of itself.”
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
              title="Example 1: Countdown (void recursion)"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Factorial (conceptual – returns value)"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Stack demonstration – printing before/after call"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 3, the prints before
              the recursive call happen in descending order, and prints after happen
              in ascending order – showing the winding and unwinding of recursion.
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
              🏫 Recursion at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic21-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Tuhina</strong> was
                amazed when she saw a function that could call itself. She used
                recursion to print all files in a folder (later topics). At first,
                it seemed magical, then she understood the stack.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Ritaja</strong> implemented
                a recursive solution to compute the sum of digits of a number. She
                appreciated how the problem naturally split into smaller pieces.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Swadeep, Abhronila, Debangshu</strong> now
                see recursion as a tool, not a trick.
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
            <div className="topic21-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Missing base case:
                  </span>{" "}
                  Leads to infinite recursion – the function calls itself forever,
                  eventually causing stack overflow.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Base case never reached:
                  </span>{" "}
                  If the argument doesn't progress toward the base case (e.g.,
                  <code>n+1</code> instead of <code>n-1</code>), recursion never ends.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Stack overflow:
                  </span>{" "}
                  Even with correct logic, very deep recursion may exceed the stack
                  size. (We'll discuss later.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Confusing recursion with iteration:
                  </span>{" "}
                  Some problems are better solved with loops. Recursion isn't always
                  the answer.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you accidentally
                write <code>countDown(n+1)</code> instead of <code>n-1</code>?
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
              <div className="topic21-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Always identify base case first
                </h3>
                <p className="text-sm">
                  Before writing any recursive code, decide what stops the recursion.
                  Write the base case explicitly.
                </p>
              </div>
              <div className="topic21-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🧪 Test with smallest input
                </h3>
                <p className="text-sm">
                  Verify the base case works. Then test with n=1, n=2, etc., to
                  ensure progression.
                </p>
              </div>
              <div className="topic21-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Ensure progress toward base case
                </h3>
                <p className="text-sm">
                  Each recursive call must bring you closer to the base case
                  (usually by reducing a parameter).
                </p>
              </div>
              <div className="topic21-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Use comments for clarity
                </h3>
                <p className="text-sm">
                  Recursive code can be terse. Comment the base case and the
                  recursive case's intention.
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
              📋 Mini Checklist – Topic 21
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can define recursion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify the base
                case and recursive case in a recursive function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that each
                recursive call creates a new stack frame.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that missing base
                case leads to stack overflow.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a simple
                recursive function (e.g., countdown).
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic21-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “At <strong>Barrackpore CNAT</strong> and <strong>Naihati CNAT</strong>,
                  I've seen the moment recursion ‘clicks’ for students – it's magical.
                  I always start with a physical demonstration: I hold a Russian doll
                  and open it to show a smaller one inside. That's recursion. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: When debugging recursion, use print statements
                    at entry and exit, indented by recursion depth. It reveals the
                    winding and unwinding beautifully.
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
                In the countdown example, remove the base case condition. Compile and
                run. What happens? (Warning: it may crash quickly.)
                <br />
                <span className="mt-2 block text-gray-400">
                  (Without a base case, the function calls itself forever – stack
                  overflow.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 21 complete – you've met recursion. Next: base condition and
            recursive case in detail.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic21;