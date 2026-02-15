/**
 * Topic 31: Using #include for Modular Programming
 * File: Topic31.jsx
 *
 * Pedagogical Focus:
 * - Explain the #include directive and its role in modular programming.
 * - Differentiate between #include <...> (system headers) and #include "..." (user headers).
 * - Show how #include literally inserts the contents of the header file.
 * - Emphasize how this enables sharing declarations across multiple source files.
 * - Build on Topics 27‑30.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing preprocessor inclusion.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic31_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic31_files/math_ops.h?raw";
import example2 from "./topic31_files/math_ops.c?raw";
import example3 from "./topic31_files/main.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic31-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic31-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic31-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic31-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 31
// ----------------------------------------------------------------------
const Topic31 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic31-root",
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
              🔗 Using #include for Modular Programming
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              The <code>#include</code> directive is the glue that binds modular
              C programs together. It tells the preprocessor to insert the contents
              of another file, usually a header (<code>.h</code>), into the current
              file. This simple mechanism enables code reuse, separation of interface
              and implementation, and multi‑file projects.
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
              📌 How #include Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic31-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  <code>#include</code> is a <strong>preprocessor directive</strong>.
                  Before compilation, the preprocessor reads your source file and
                  replaces every <code>#include</code> line with the literal contents
                  of the specified file.
                </p>
                <p className="mb-3">
                  There are two forms:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <code>#include &lt;stdio.h&gt;</code> – searches system include
                    directories (e.g., <code>/usr/include</code>).
                  </li>
                  <li>
                    <code>#include "myheader.h"</code> – searches the current
                    directory first, then system directories.
                  </li>
                </ul>
                <pre className="mt-3 rounded bg-gray-800 p-2 text-xs">
                  <span className="text-gray-400">// Before preprocessing</span>
                  <br />
                  #include "math_ops.h"
                  <br />
                  int main() {"{"} ... {"}"}
                  <br />
                  <span className="text-gray-400">// After preprocessing</span>
                  <br />
                  int add(int a, int b);
                  <br />
                  int multiply(int a, int b);
                  <br />
                  int main() {"{"} ... {"}"}
                </pre>
              </div>

              {/* Right: animated SVG – file inclusion */}
              <div
                className={clsx(
                  "topic31-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Source file (main.c) */}
                  <rect x="20" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="70" y="45" fill="#d1d5db" fontSize="9" textAnchor="middle">main.c</text>
                  <text x="70" y="60" fill="#9ca3af" fontSize="7" textAnchor="middle">#include "math_ops.h"</text>

                  {/* Header file */}
                  <rect x="180" y="20" width="100" height="40" rx="6" fill="#1f2937" stroke="#6b7280" />
                  <text x="230" y="45" fill="#d1d5db" fontSize="9" textAnchor="middle">math_ops.h</text>
                  <text x="230" y="60" fill="#9ca3af" fontSize="7" textAnchor="middle">int add(int, int);</text>

                  {/* Inclusion arrow */}
                  <line x1="120" y1="40" x2="180" y2="40" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead)">
                    <animate attributeName="x2" values="170;190;170" dur="2s" repeatCount="indefinite" />
                  </line>

                  {/* Resulting translation unit */}
                  <rect x="20" y="120" width="260" height="50" rx="6" fill="#1f2937" stroke="#6b7280" strokeDasharray="4 3" />
                  <text x="150" y="145" fill="#d1d5db" fontSize="8" textAnchor="middle">Preprocessed translation unit</text>
                  <text x="150" y="160" fill="#9ca3af" fontSize="7" textAnchor="middle">(header inserted verbatim)</text>

                  {/* Arrow from header to translation unit */}
                  <line x1="230" y1="60" x2="150" y2="120" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowHead2)" />

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

          {/* ----- SECTION 3: WHY #include FOR MODULARITY? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 #include as the Enabler of Modularity
            </h2>
            <div className="topic31-card rounded-xl border p-6">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Share declarations:</strong> A single header included in multiple <code>.c</code> files ensures consistent function prototypes and type definitions.</li>
                <li><strong>Separation of concerns:</strong> Headers define the interface; <code>.c</code> files provide the implementation.</li>
                <li><strong>Reusability:</strong> A well‑designed header can be included in any project.</li>
                <li><strong>Preprocessor efficiency:</strong> The inclusion happens before compilation, so the compiler sees one big file – no runtime overhead.</li>
                <li><strong>Standard library access:</strong> Every C program includes <code>&lt;stdio.h&gt;</code>, <code>&lt;stdlib.h&gt;</code>, etc., to use standard functions.</li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🧑‍🏫 At <strong>Barrackpore CNAT</strong>, we say: “<code>#include</code>
                is like a copy‑paste machine for declarations – it saves you from
                typing the same prototypes everywhere.”
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – #include in action (delay-0.3s) ----- */}
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
              title="Example 1: math_ops.h – the header"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: math_ops.c – implementation"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: main.c – using #include"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> Both <code>math_ops.c</code> and
              <code>main.c</code> <code>#include "math_ops.h"</code>. This ensures
              that the compiler sees the same prototypes everywhere.
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
              🏫 #include at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic31-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> created
                a shared header <code>school.h</code> that defined structures and
                constants for the student database. <strong>Tuhina</strong> and{" "}
                <strong>Abhronila</strong> both included it in their respective
                <code>.c</code> files – consistency guaranteed.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> forgot
                to include the header in his implementation file and wrote a function
                with a slightly different signature. The mismatch went unnoticed
                until linking, causing a hard‑to‑find bug.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Ritaja</strong> now always include the
                corresponding header in the <code>.c</code> file.
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
            <div className="topic31-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting include guards:
                  </span>{" "}
                  If a header is included twice (directly or indirectly), the
                  preprocessor inserts its contents twice, leading to “redefinition”
                  errors. Use <code>#ifndef HEADER_H</code>.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Using <code>#include &lt;file.h&gt;</code> for your own files:
                  </span>{" "}
                  The angle brackets search system paths, not your project. Always
                  use quotes for your headers: <code>#include "myfile.h"</code>.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Circular includes:
                  </span>{" "}
                  Header A includes B, B includes A. This can cause infinite
                  recursion or confusing errors. Break the cycle with forward
                  declarations.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Including <code>.c</code> files:
                  </span>{" "}
                  Never <code>#include</code> a <code>.c</code> file – it leads to
                  duplicate definitions. Only headers.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> What happens if you accidentally
                write <code>#include "math_ops.c"</code> in <code>main.c</code> and
                then compile both files? (You'll get multiple definition errors.)
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
              <div className="topic31-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Include what you use
                </h3>
                <p className="text-sm">
                  In each file, include only the headers needed for declarations
                  used in that file. Avoid relying on transitive includes.
                </p>
              </div>
              <div className="topic31-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔒 Use include guards in every header
                </h3>
                <p className="text-sm">
                  Even if a header is included only once now, future changes may
                  cause multiple inclusions. Guard by default.
                </p>
              </div>
              <div className="topic31-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📂 Organise includes
                </h3>
                <p className="text-sm">
                  Group includes: system headers first, then your own. Add a blank
                  line between groups for readability.
                </p>
              </div>
              <div className="topic31-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ⚡ Forward declare when possible
                </h3>
                <p className="text-sm">
                  To avoid including large headers in other headers, use forward
                  declarations (e.g., <code>struct Student;</code>) when you only
                  need pointers.
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
              📋 Mini Checklist – Topic 31
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the
                difference between <code>#include &lt;&gt;</code> and{" "}
                <code>#include ""</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know that #include does
                literal text insertion.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I always use include
                guards in my headers.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I never #include .c files.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can use #include to build
                modular multi‑file programs.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic31-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong> treat <code>#include</code> as magic.
                  I tell them: it's just automated copy‑paste. Understand the
                  preprocessor, and you'll never fear multi‑file projects. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Run <code>gcc -E myfile.c</code> to see the
                    preprocessor output – it shows exactly what the compiler sees.
                    Great for debugging include issues.
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
                In the example, remove the include guards from <code>math_ops.h</code>.
                Then in <code>math_ops.c</code>, add a second <code>#include "math_ops.h"</code>
                (maybe accidentally). Compile with warnings. What error do you see?
                Now add the guards back – problem solved.
                <br />
                <span className="mt-2 block text-gray-400">
                  (This demonstrates why guards are essential.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 31 complete – you've mastered #include. Next: common function‑related
            compiler errors.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic31;