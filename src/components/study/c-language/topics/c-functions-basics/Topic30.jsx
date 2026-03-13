/**
 * Topic 30: Multiple Source Files and Modular Compilation
 * File: Topic30.jsx
 *
 * Pedagogical Focus:
 * - Explain how to split a C program across several .c files.
 * - Describe separate compilation: each .c → .o, then linking.
 * - Show the role of headers in sharing declarations.
 * - Introduce the compiler/linker workflow (gcc example).
 * - Build on Topics 27‑29.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing multiple source files, object files, and linking.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic30_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic30_files/math_utils.h?raw";
import example2 from "./topic30_files/math_utils.c?raw";
import example3 from "./topic30_files/main.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic30-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic30-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic30-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic30-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 30
// ----------------------------------------------------------------------
const Topic30 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic30-root",
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
              📂 Multiple Source Files and Modular Compilation
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Real‑world projects are never written in a single file. C supports
              splitting code across multiple <code>.c</code> files, each compiled
              separately into object files (<code>.o</code>), and then linked together
              into an executable. This is <strong>modular compilation</strong> – the
              foundation of large‑scale software development.
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
              📌 The Compilation Pipeline
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic30-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  When you have multiple <code>.c</code> files, you typically:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    <strong>Compile each separately</strong> into object files
                    (<code>.o</code> or <code>.obj</code>). Each object file contains
                    machine code but with unresolved references to functions in other
                    files.
                  </li>
                  <li>
                    <strong>Link</strong> all object files together, resolving those
                    references, to produce a single executable.
                  </li>
                </ol>
                <p className="mt-3">
                  This process saves time: if you change one <code>.c</code> file, you
                  only need to recompile that file and then relink.
                </p>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-xs">
                  <span className="text-gray-400"># Compile each .c to .o</span>
                  <br />
                  gcc -c math_utils.c
                  <br />
                  gcc -c main.c
                  <br />
                  <span className="text-gray-400"># Link into executable</span>
                  <br />
                  gcc -o program math_utils.o main.o
                </pre>
              </div>

              {/* Right: animated SVG – multiple files → objects → executable */}
              <div
                className={clsx(
                  "topic30-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Source files */}
                  <rect x="20" y="20" width="80" height="30" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="60" y="40" fill="#d1d5db" fontSize="8" textAnchor="middle">math_utils.c</text>
                  <rect x="20" y="60" width="80" height="30" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="60" y="80" fill="#d1d5db" fontSize="8" textAnchor="middle">main.c</text>

                  {/* Compiler arrows */}
                  <line x1="100" y1="35" x2="130" y2="35" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="x2" values="120;140;120" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="100" y1="75" x2="130" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="x2" values="120;140;120" dur="2s" repeatCount="indefinite" />
                  </line>

                  {/* Object files */}
                  <rect x="150" y="20" width="80" height="30" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="190" y="40" fill="#d1d5db" fontSize="8" textAnchor="middle">math_utils.o</text>
                  <rect x="150" y="60" width="80" height="30" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="190" y="80" fill="#d1d5db" fontSize="8" textAnchor="middle">main.o</text>

                  {/* Linker arrow */}
                  <line x1="190" y1="90" x2="190" y2="120" stroke="#6ee7b7" strokeWidth="2" markerEnd="url(#arrowHead2)" />
                  <rect x="140" y="130" width="100" height="30" rx="4" fill="#1f2937" stroke="#6b7280" />
                  <text x="190" y="150" fill="#d1d5db" fontSize="8" textAnchor="middle">program (executable)</text>

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

          {/* ----- SECTION 3: WHY MODULAR COMPILATION? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Benefits of Multiple Source Files
            </h2>
            <div className="topic30-card rounded-xl border p-6">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Parallel development:</strong> Different team members can work on different files.</li>
                <li><strong>Faster builds:</strong> Only changed files need recompilation.</li>
                <li><strong>Logical organisation:</strong> Group related functions (e.g., all math utilities) in one file.</li>
                <li><strong>Reusability:</strong> A <code>.c/.h</code> pair can be copied to another project.</li>
                <li><strong>Library creation:</strong> Eventually, you can archive object files into a library (<code>.a</code> or <code>.so</code>).</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we compare this to writing a
                book: each chapter is a separate file, and the table of contents
                (headers) tells you what's in each.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – a multi‑file project (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code: A Modular Math Library
            </h2>

            <EditableCCodeBlock
              title="Example 1: math_utils.h – the header"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: math_utils.c – implementation"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: main.c – using the library"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> To build, run: <br />
              <code>gcc -c math_utils.c</code><br />
              <code>gcc -c main.c</code><br />
              <code>gcc -o program math_utils.o main.o</code><br />
              Or in one step: <code>gcc -o program main.c math_utils.c</code> (which does the same behind the scenes).
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
              🏫 Modular Projects at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic30-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, students built a student
                management system with separate files: <code>database.c</code>,
                <code>ui.c</code>, <code>report.c</code>, each with its own header.
                <strong>Swadeep</strong> worked on database, <strong>Tuhina</strong> on UI,
                <strong>Abhronila</strong> on reports. They integrated using headers.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> maintained a
                personal utility library (<code>utils.c</code> and <code>utils.h</code>) that
                he reused across multiple assignments.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Ritaja</strong> now never put all code in one
                file.
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
            <div className="topic30-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to compile all <code>.c</code> files:
                  </span>{" "}
                  If you only compile <code>main.c</code>, you'll get “undefined
                  reference” linker errors.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Defining the same function in multiple <code>.c</code> files:
                  </span>{" "}
                  Unless it's <code>static</code>, you'll get multiple definition errors
                  at link time.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Not using headers to share declarations:
                  </span>{" "}
                  Manually typing prototypes in each file leads to inconsistencies.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Circular dependencies between files:
                  </span>{" "}
                  File A calls function in B, B calls function in A. This can be
                  managed with forward declarations, but may cause design issues.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring the <code>-c</code> flag:
                  </span>{" "}
                  If you forget <code>-c</code>, gcc tries to link immediately and may
                  complain about missing <code>main</code>.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you compile all
                <code>.c</code> files together with <code>gcc -o prog *.c</code>? (It
                works, but if you have hundreds of files, it's slow.)
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
              <div className="topic30-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Use a build tool (make)
                </h3>
                <p className="text-sm">
                  For projects with many files, a Makefile automates compilation,
                  recompiling only what changed.
                </p>
              </div>
              <div className="topic30-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Keep headers minimal
                </h3>
                <p className="text-sm">
                  Include only what's necessary. Use forward declarations instead of
                  extra includes when possible.
                </p>
              </div>
              <div className="topic30-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 One header per implementation file
                </h3>
                <p className="text-sm">
                  Typically, for each <code>.c</code> you have a corresponding
                  <code>.h</code> that declares its public functions.
                </p>
              </div>
              <div className="topic30-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ⚡ Compile with warnings
                </h3>
                <p className="text-sm">
                  Always use <code>-Wall -Wextra</code> to catch mismatches between
                  declaration and definition.
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
              📋 Mini Checklist – Topic 30
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can split a program into
                multiple <code>.c</code> files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the difference
                between separate compilation and linking.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can use the <code>-c</code>
                flag to produce object files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can link object files into
                an executable.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know how to avoid multiple
                definition errors.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic30-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “I've seen students at <strong>Barrackpore CNAT</strong> and{" "}
                  <strong>Naihati CNAT</strong> struggle when they have to rebuild
                  everything after a tiny change. I show them separate compilation,
                  and it's like a lightbulb moment. Use <code>make</code> – it's your
                  friend. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: In large projects, use a build system like
                    CMake, but for learning, manual <code>gcc</code> commands and a
                    simple Makefile are perfect.
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
                After compiling to object files, run <code>nm math_utils.o</code> and
                <code>nm main.o</code>. Look for the <code>U</code> (undefined)
                symbols in main.o – those are resolved by the linker using
                math_utils.o. Try <code>ldd</code> on the final executable (on Linux)
                to see dynamic libraries.
                <br />
                <span className="mt-2 block text-gray-400">
                  (This shows the linker in action.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 30 complete – you've mastered multiple source files and modular
            compilation. Next: using <code>#include</code> for modular programming.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic30;