/**
 * Topic 29: Separating Declaration and Definition Using Header Files
 * File: Topic29.jsx
 *
 * Pedagogical Focus:
 * - Emphasize the distinction between declaration (prototype) and definition (body).
 * - Show how header files are used to share declarations across multiple .c files.
 * - Demonstrate the classic pattern: .h for declarations, .c for definitions.
 * - Build on Topics 27 and 28.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing the separation and linking.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic29_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic29_files/calculator.h?raw";
import example2 from "./topic29_files/calculator.c?raw";
import example3 from "./topic29_files/main.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic29-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic29-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic29-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic29-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 29
// ----------------------------------------------------------------------
const Topic29 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic29-root",
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
              🔀 Separating Declaration and Definition Using Header Files
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              One of the key ideas in C is the separation of <strong>declaration</strong>
              (what a function looks like) from <strong>definition</strong> (what it
              does). Header files are the perfect tool to achieve this: they hold the
              declarations, while the corresponding <code>.c</code> files hold the
              definitions. This separation enables modular programming, code reuse,
              and faster compilation.
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
              📌 Declaration vs Definition
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic29-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <strong>Declaration (prototype):</strong> Tells the compiler the
                  function's name, return type, and parameters. No body.
                </p>
                <pre className="mb-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">int</span> add(<span className="text-emerald-300">int a, int b</span>);  <span className="text-gray-400">// declaration</span>
                </pre>
                <p className="mb-3">
                  <strong>Definition:</strong> Contains the actual body of the function.
                </p>
                <pre className="mb-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">int</span> add(<span className="text-emerald-300">int a, int b</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> a + b;
                  <br />
                  {"}"}  <span className="text-gray-400">// definition</span>
                </pre>
                <p className="mt-2">
                  In a multi‑file project, declarations go into <code>.h</code> files,
                  definitions into <code>.c</code> files. This way, many source files
                  can <code>#include</code> the header and know about the functions,
                  but the implementation is compiled only once.
                </p>
              </div>

              {/* Right: animated SVG – separation */}
              <div
                className={clsx(
                  "topic29-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Header file */}
                  <rect x="30" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="80" y="45" fill="#d1d5db" fontSize="10" textAnchor="middle">calculator.h</text>
                  <text x="80" y="60" fill="#9ca3af" fontSize="8" textAnchor="middle">(declarations)</text>

                  {/* Implementation file */}
                  <rect x="170" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="220" y="45" fill="#d1d5db" fontSize="10" textAnchor="middle">calculator.c</text>
                  <text x="220" y="60" fill="#9ca3af" fontSize="8" textAnchor="middle">(definitions)</text>

                  {/* Main file */}
                  <rect x="80" y="120" width="140" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="150" y="145" fill="#d1d5db" fontSize="10" textAnchor="middle">main.c</text>

                  {/* Include arrow from main to header */}
                  <line x1="150" y1="120" x2="80" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)" />
                  <text x="100" y="100" fill="#f59e0b" fontSize="8">#include "calc.h"</text>

                  {/* Link from header to implementation (dashed) – conceptual */}
                  <line x1="130" y1="40" x2="170" y2="40" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="4 2" />

                  <defs>
                    <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: WHY SEPARATE? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Benefits of Separation
            </h2>
            <div className="topic29-card rounded-xl border p-6">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Encapsulation:</strong> Users see only the interface, not the implementation.</li>
                <li><strong>Reusability:</strong> The same header can be included in many projects.</li>
                <li><strong>Compilation speed:</strong> Changes to the implementation don't force recompilation of files that include the header (only those that depend on the interface need recompiling).</li>
                <li><strong>Organisation:</strong> Large projects are easier to navigate when declarations and definitions are separated.</li>
                <li><strong>Library creation:</strong> This pattern is the basis for creating static and shared libraries.</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we compare this to a restaurant:
                the menu (header) lists the dishes, but the kitchen (implementation)
                is hidden. You don't need to see the kitchen to order.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – a complete separation (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code: A Simple Calculator
            </h2>

            <EditableCCodeBlock
              title="Example 1: calculator.h – declarations"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: calculator.c – definitions"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: main.c – using the calculator"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> The header only contains prototypes. The
              implementation is in <code>calculator.c</code>. <code>main.c</code> includes
              the header and uses the functions. To compile:{" "}
              <code>gcc -o calc main.c calculator.c</code>.
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
              🏫 Separation at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic29-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, a team of students built a
                library management system. <strong>Swadeep</strong> wrote the
                <code>database.h</code> and <code>database.c</code>;{" "}
                <strong>Tuhina</strong> wrote the UI in <code>ui.c</code>. They agreed
                on the header, so both could work independently. When Swadeep fixed a
                bug in <code>database.c</code>, Tuhina only needed to relink – no
                changes to her code.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> created a
                math library with its own header. Later, <strong>Debangshu</strong> used
                the same header in a different project – true reuse.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Ritaja</strong> now always separate
                declaration from definition.
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
            <div className="topic29-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Putting definitions in headers:
                  </span>{" "}
                  If you define a function (not just declare) in a header and include
                  that header in two different <code>.c</code> files, the linker will
                  see two definitions and complain. (Exception: <code>static inline</code>.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to include the header in the implementation file:
                  </span>{" "}
                  The compiler won't check that the definition matches the declaration.
                  Always <code>#include</code> the header in its own <code>.c</code> file.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Mismatched prototypes:
                  </span>{" "}
                  If the declaration and definition don't match (e.g., different
                  parameter types), you'll get undefined behaviour or compiler errors.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not compiling all <code>.c</code> files:
                  </span>{" "}
                  Forgetting to compile the implementation file leads to linker errors
                  (“undefined reference”).
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why should you include the header in
                its own <code>.c</code> file? (To ensure the implementation matches the
                declaration – the compiler checks consistency.)
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
              <div className="topic29-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Include the header in its own .c
                </h3>
                <p className="text-sm">
                  At the top of <code>calculator.c</code>, write{" "}
                  <code>#include "calculator.h"</code>. This lets the compiler verify
                  consistency.
                </p>
              </div>
              <div className="topic29-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Use include guards
                </h3>
                <p className="text-sm">
                  Every header must have <code>#ifndef</code>/<code>#define</code>/<code>#endif</code>.
                </p>
              </div>
              <div className="topic29-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Document the interface in the header
                </h3>
                <p className="text-sm">
                  Comments in the header explain what each function does – this is your
                  public documentation.
                </p>
              </div>
              <div className="topic29-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ⚡ Keep headers minimal
                </h3>
                <p className="text-sm">
                  Only include what's necessary. Avoid including other headers unless
                  your declarations need them.
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
              📋 Mini Checklist – Topic 29
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain the difference
                between declaration and definition.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always put declarations in
                <code>.h</code> files and definitions in <code>.c</code> files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I include the header in its
                own implementation file.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know the linker errors that
                occur when definitions are missing or duplicated.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can compile a multi‑file
                program that follows this separation.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic29-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  I've seen students cram everything into one file, then struggle when
                  projects grow. I tell them: separate interface from implementation
                  from day one. It's like building with LEGO – you have clear connectors
                  (headers) and blocks (implementations). <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Use <code>gcc -c file.c</code> to compile
                    individual files to object files (<code>.o</code>), then link them
                    together. This is how large projects are built efficiently.
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
                In <code>calculator.c</code>, remove the line <code>#include "calculator.h"</code>.
                Then change the return type in the definition from <code>int</code> to
                <code>double</code>. Compile with warnings enabled (<code>-Wall</code>).
                What happens? Now put the include back – does the compiler catch the
                mismatch?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Without the include, the compiler doesn't know the declaration, so
                  it may assume a different prototype. With the include, it sees the
                  mismatch and warns/errors.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 29 complete – you've mastered separating declarations and definitions.
            Next: multiple source files and modular compilation.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic29;