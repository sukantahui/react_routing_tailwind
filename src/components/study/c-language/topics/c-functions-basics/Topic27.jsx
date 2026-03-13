/**
 * Topic 27: Header Files – Purpose and Structure
 * File: Topic27.jsx
 *
 * Pedagogical Focus:
 * - Introduce the concept of header files (.h) as containers for declarations.
 * - Explain why header files are essential for multi‑file programs.
 * - Show the typical structure: include guards, function prototypes, macros, type definitions.
 * - Build on Topics 0‑26; no forward jumping.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing file inclusion and compilation.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic27_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic27_files/math_utils.h?raw";
import example2 from "./topic27_files/main.c?raw";
import example3 from "./topic27_files/standard_include.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic27-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic27-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic27-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic27-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 27
// ----------------------------------------------------------------------
const Topic27 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic27-root",
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
              📁 Header Files – Purpose and Structure
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              As programs grow, we split code across multiple files. Header files
              (<code>.h</code>) act as the “public face” of a module, declaring what
              functions, types, and macros are available without revealing the
              implementation. They are the glue that makes modular programming work.
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
              📌 What Is a Header File?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic27-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A header file typically contains:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong>Function prototypes</strong> (declarations)</li>
                  <li><strong>Macros</strong> (<code>#define</code>)</li>
                  <li><strong>Type definitions</strong> (<code>typedef</code>, <code>struct</code>, <code>enum</code>)</li>
                  <li><strong>External variable declarations</strong> (<code>extern</code>)</li>
                  <li><strong>Include guards</strong> to prevent multiple inclusion</li>
                </ul>
                <p className="mt-3">
                  The corresponding <code>.c</code> file contains the implementations.
                </p>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-xs">
                  <span className="text-gray-400">// math_utils.h</span>
                  <br />
                  #ifndef MATH_UTILS_H
                  <br />
                  #define MATH_UTILS_H
                  <br />
                  <br />
                  int add(int a, int b);
                  <br />
                  int multiply(int a, int b);
                  <br />
                  <br />
                  #endif
                </pre>
              </div>

              {/* Right: animated SVG – file inclusion */}
              <div
                className={clsx(
                  "topic27-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* math_utils.h file */}
                  <rect x="20" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="70" y="45" fill="#d1d5db" fontSize="10" textAnchor="middle">math_utils.h</text>

                  {/* main.c file */}
                  <rect x="180" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="230" y="45" fill="#d1d5db" fontSize="10" textAnchor="middle">main.c</text>

                  {/* #include arrow */}
                  <line x1="120" y1="40" x2="180" y2="40" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="x2" values="170;190;170" dur="2s" repeatCount="indefinite" />
                  </line>
                  <text x="150" y="20" fill="#f59e0b" fontSize="8">#include</text>

                  {/* Preprocessor output */}
                  <rect x="20" y="100" width="260" height="60" rx="6" fill="#1f2937" stroke="#6b7280" strokeDasharray="4 3" />
                  <text x="150" y="130" fill="#d1d5db" fontSize="10" textAnchor="middle">Preprocessed translation unit</text>

                  {/* Arrow from files to output */}
                  <line x1="70" y1="60" x2="100" y2="100" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />
                  <line x1="230" y1="60" x2="200" y2="100" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />

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
              📌 Why Header Files?
            </h2>
            <div className="topic27-card rounded-xl border p-6">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Separation of interface and implementation:</strong> Users see only declarations, not the implementation details.</li>
                <li><strong>Code reuse:</strong> One header can be included in many source files.</li>
                <li><strong>Compilation speed:</strong> Changes to implementation don't force recompilation of all files that include the header (only those that depend on the interface).</li>
                <li><strong>Organisation:</strong> Related declarations are grouped together.</li>
                <li><strong>Standard library access:</strong> <code>#include &lt;stdio.h&gt;</code> etc.</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “A header file is
                like a restaurant menu – you see the dishes (function names), but not
                the kitchen chaos (implementation).”
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
              💻 Live Code Examples
            </h2>

            <EditableCCodeBlock
              title="Example 1: math_utils.h – a simple header"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: main.c – using the header"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Standard header inclusion"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> The header uses include guards
              (<code>#ifndef MATH_UTILS_H ... #endif</code>) to prevent multiple
              inclusions. The source file includes it with <code>#include "math_utils.h"</code>.
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
              🏫 Header Files at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic27-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> and{" "}
                <strong>Tuhina</strong> were working on a group project to build a
                student database. They agreed on a header <code>database.h</code>
                that declared all functions. Swadeep implemented <code>database.c</code>,
                Tuhina wrote the UI in <code>ui.c</code>. Both included the same header –
                perfect teamwork.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> forgot
                include guards in her header. After including it twice (directly and
                indirectly), she got “multiple definition” errors. She learned the
                hard way why guards are essential.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Debangshu, Ritaja</strong> now always start
                headers with <code>#ifndef</code>.
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
            <div className="topic27-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Missing include guards:
                  </span>{" "}
                  Multiple inclusions cause “redefinition” errors. Always use
                  <code>#ifndef HEADER_NAME_H</code> / <code>#define</code> / <code>#endif</code>.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Including <code>.c</code> files:
                  </span>{" "}
                  Never <code>#include</code> a <code>.c</code> file – that leads to
                  duplicate definitions. Only headers.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting <code>extern</code> for global variables:
                  </span>{" "}
                  If a header declares a global variable, use <code>extern</code> and
                  define it in exactly one <code>.c</code> file.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Circular includes:
                  </span>{" "}
                  Header A includes B, B includes A – leads to compilation errors.
                  Use forward declarations when possible.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not using angle brackets vs quotes:
                  </span>{" "}
                  <code>#include &lt;stdio.h&gt;</code> for system headers,{" "}
                  <code>#include "myheader.h"</code> for your own.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why do we need include guards even
                if we include a header only once in a file? (Because it might be
                included indirectly via another header.)
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
              <div className="topic27-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Use consistent include guards
                </h3>
                <p className="text-sm">
                  Name them after the header file, e.g., <code>MYPROJECT_MATH_UTILS_H</code>.
                </p>
              </div>
              <div className="topic27-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Keep headers minimal
                </h3>
                <p className="text-sm">
                  Include only what users need. Hide implementation details in the
                  <code>.c</code> file.
                </p>
              </div>
              <div className="topic27-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📂 Group related declarations
                </h3>
                <p className="text-sm">
                  One header per module (e.g., <code>student.h</code>,{" "}
                  <code>course.h</code>).
                </p>
              </div>
              <div className="topic27-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Document public interfaces
                </h3>
                <p className="text-sm">
                  Use comments to explain what each function does, its parameters,
                  and return value.
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
              📋 Mini Checklist – Topic 27
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can explain the purpose
                of a header file.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always use include
                guards in my headers.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know the difference
                between <code>#include &lt;&gt;</code> and <code>#include ""</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that headers
                contain declarations, not definitions (except for macros and
                <code>static inline</code> functions).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can create a multi‑file
                program using headers.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic27-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  I've seen students struggle with multiple definition errors simply
                  because they forgot include guards. I tell them: treat headers like
                  a library catalogue – they tell you what's available, but the books
                  (implementations) are on the shelves elsewhere. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Always compile with <code>-Wall -Wextra</code>.
                    The compiler will warn you about missing guards and other header
                    issues.
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
                Remove the include guards from <code>math_utils.h</code> and add a
                second <code>#include "math_utils.h"</code> in <code>main.c</code>.
                What error do you get? Why?
                <br />
                <span className="mt-2 block text-gray-400">
                  (The compiler sees duplicate function declarations and may complain
                  or cause linker errors later.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 27 complete – you understand header files. Next: user‑defined
            header files (<code>.h</code>).
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic27;