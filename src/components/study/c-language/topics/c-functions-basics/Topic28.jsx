/**
 * Topic 28: User-defined Header Files (.h)
 * File: Topic28.jsx
 *
 * Pedagogical Focus:
 * - Teach how to create custom header files for modular programming.
 * - Build on Topic 27 (general header purpose) with practical creation steps.
 * - Emphasize include guards, naming conventions, and separation of declaration/definition.
 * - Show how to compile multi‑file programs.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing header creation and inclusion.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic28_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic28_files/myutils.h?raw";
import example2 from "./topic28_files/myutils.c?raw";
import example3 from "./topic28_files/main.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic28-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic28-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic28-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic28-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 28
// ----------------------------------------------------------------------
const Topic28 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic28-root",
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
              🛠️ User‑defined Header Files (.h)
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Now that you know <em>why</em> header files exist, it's time to create
              your own. User‑defined headers allow you to organise your code into
              modules, share declarations across multiple source files, and build
              scalable C projects.
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
              📌 Anatomy of a User‑defined Header
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic28-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A header file (usually with extension <code>.h</code>) contains:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong>Include guards</strong> to prevent multiple inclusion</li>
                  <li><strong>Function prototypes</strong> (declarations)</li>
                  <li><strong>Macros</strong> (<code>#define</code>)</li>
                  <li><strong>Type definitions</strong> (<code>typedef</code>, <code>struct</code>, <code>enum</code>)</li>
                  <li><strong>External variable declarations</strong> (<code>extern</code>)</li>
                </ul>
                <p className="mt-3">
                  The corresponding <code>.c</code> file provides the implementations.
                </p>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-xs">
                  <span className="text-gray-400">// myutils.h</span>
                  <br />
                  #ifndef MYUTILS_H
                  <br />
                  #define MYUTILS_H
                  <br />
                  <br />
                  int square(int x);
                  <br />
                  int cube(int x);
                  <br />
                  <br />
                  #endif
                </pre>
              </div>

              {/* Right: animated SVG – header file creation and usage */}
              <div
                className={clsx(
                  "topic28-card flex items-center justify-center rounded-xl border p-4",
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
                  <rect x="20" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="70" y="45" fill="#d1d5db" fontSize="10" textAnchor="middle">myutils.h</text>
                  <text x="70" y="60" fill="#9ca3af" fontSize="7" textAnchor="middle">(declarations)</text>

                  {/* Implementation file */}
                  <rect x="20" y="100" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="70" y="125" fill="#d1d5db" fontSize="10" textAnchor="middle">myutils.c</text>
                  <text x="70" y="140" fill="#9ca3af" fontSize="7" textAnchor="middle">(definitions)</text>

                  {/* Main file */}
                  <rect x="180" y="60" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="230" y="85" fill="#d1d5db" fontSize="10" textAnchor="middle">main.c</text>

                  {/* Include arrow */}
                  <line x1="120" y1="40" x2="180" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="x2" values="170;190;170" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="65;75;65" dur="2s" repeatCount="indefinite" />
                  </line>
                  <text x="150" y="20" fill="#f59e0b" fontSize="8">#include "myutils.h"</text>

                  {/* Link arrow from .c to .h */}
                  <line x1="70" y1="100" x2="70" y2="60" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />

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

          {/* ----- SECTION 3: COMPILING MULTI‑FILE PROGRAMS (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Compiling Multiple Files
            </h2>
            <div className="topic28-card rounded-xl border p-6">
              <p className="mb-3">
                To compile a program that uses your own header and its implementation,
                you need to compile all <code>.c</code> files together:
              </p>
              <pre className="rounded bg-gray-800 p-2 text-sm">
                gcc -o myprogram main.c myutils.c
              </pre>
              <p className="mt-3">
                The header itself is not compiled separately; it's included during
                preprocessing. The linker combines the object files into one executable.
              </p>
              <p className="mt-3 text-sm italic text-gray-400">
                🔍 <strong>Observe:</strong> The header acts as a contract between the
                implementation (<code>.c</code>) and the users (<code>main.c</code>).
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – a complete user‑defined header (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code: A Simple Utility Header
            </h2>

            <EditableCCodeBlock
              title="Example 1: myutils.h – the header file"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: myutils.c – the implementation"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: main.c – using the header"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> The header declares the functions, the
              <code>.c</code> file defines them, and <code>main.c</code> includes the
              header to use them. The include guard (<code>#ifndef ...</code>) ensures
              the header is safe to include multiple times.
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
              🏫 User‑defined Headers at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic28-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> and{" "}
                <strong>Tuhina</strong> created a header <code>school_utils.h</code>
                with functions to compute student grades and averages. Swadeep wrote
                the implementation; Tuhina used it in her report generator. Both
                included the same header – perfect modularity.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Abhronila</strong> forgot to
                compile <code>myutils.c</code> and got linker errors (“undefined
                reference”). She learned that the header only declares; the
                implementation must be linked.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Debangshu, Ritaja</strong> now always check
                their compilation commands.
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
            <div className="topic28-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Missing include guards:
                  </span>{" "}
                  Without them, including the same header twice (directly or indirectly)
                  leads to “redefinition” errors.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to compile the implementation file:
                  </span>{" "}
                  The header only provides declarations; the linker needs the object
                  code from the <code>.c</code> file.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Putting definitions in headers:
                  </span>{" "}
                  Defining a function (not just declaring) in a header can cause
                  multiple definition errors when included in multiple <code>.c</code>
                  files. (Exception: <code>static inline</code> functions.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Circular includes:
                  </span>{" "}
                  Header A includes B, B includes A – leads to infinite recursion
                  during preprocessing. Use forward declarations to break the cycle.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not using quotes for own headers:
                  </span>{" "}
                  <code>#include &lt;myutils.h&gt;</code> looks in system paths, not
                  your project. Use <code>#include "myutils.h"</code>.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you accidentally put
                the function body in the header and include it in two different
                <code>.c</code> files? (Linker error: multiple definition.)
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
              <div className="topic28-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Name headers meaningfully
                </h3>
                <p className="text-sm">
                  <code>student.h</code>, <code>database.h</code> – clear names
                  indicate the module's purpose.
                </p>
              </div>
              <div className="topic28-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Keep headers minimal
                </h3>
                <p className="text-sm">
                  Include only what users need. Hide implementation details in the
                  <code>.c</code> file.
                </p>
              </div>
              <div className="topic28-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📂 Use a consistent include guard format
                </h3>
                <p className="text-sm">
                  <code>PROJECTNAME_MODULENAME_H</code> (e.g., <code>CNAT_STUDENT_H</code>)
                  avoids name clashes.
                </p>
              </div>
              <div className="topic28-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📝 Document the public interface
                </h3>
                <p className="text-sm">
                  Comment each function, its parameters, and return value in the header.
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
              📋 Mini Checklist – Topic 28
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can create my own
                <code>.h</code> file with include guards.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know to put declarations
                in headers and definitions in <code>.c</code> files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can compile a program
                with multiple source files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the difference
                between <code>#include &lt;&gt;</code> and <code>#include ""</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can avoid common pitfalls
                like missing include guards and circular includes.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic28-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  I've seen students create dozens of functions in a single file,
                  then struggle to reuse them. I teach them: every time you write a
                  function that could be reused, put its prototype in a header and
                  its definition in a separate <code>.c</code>. That's how you build
                  libraries. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Use a build system like <code>make</code> to
                    automate compilation of multi‑file projects. We'll cover that later.
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
                Move the function definition from <code>myutils.c</code> into
                <code>myutils.h</code> (remove <code>myutils.c</code> entirely). Then
                compile with <code>gcc -o myprogram main.c</code>. What error do you
                get? Now add <code>static inline</code> before the definition. Compile
                again – what changed?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Without <code>static inline</code>, the linker sees multiple
                  definitions. With it, each <code>.c</code> gets its own copy – safe.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 28 complete – you can now create and use your own header files.
            Next: separating declaration and definition using header files.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic28;