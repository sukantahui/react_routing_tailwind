/**
 * Topic 32: Common Function‑Related Compiler Errors
 * File: Topic32.jsx
 *
 * Pedagogical Focus:
 * - Identify and explain frequent compiler errors when using functions.
 * - Cover: missing prototype, implicit declaration, return type mismatch,
 *   missing return, wrong argument count/type, void function returning value.
 * - Show both erroneous code and the corrected version.
 * - Build on all previous topics, especially declarations and definitions.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing error messages and fix.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic32_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic32_files/missing_prototype.c?raw";
import example2 from "./topic32_files/return_mismatch.c?raw";
import example3 from "./topic32_files/argument_mismatch.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic32-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic32-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic32-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic32-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 32
// ----------------------------------------------------------------------
const Topic32 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic32-root",
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
              🐞 Common Function‑Related Compiler Errors
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Compiler errors are your friends – they tell you exactly what's wrong
              with your code. But interpreting them requires practice. This topic
              walks you through the most frequent errors beginners encounter when
              working with functions, and shows you how to fix them.
            </p>
          </section>

          {/* ----- SECTION 2: ERROR CATEGORIES OVERVIEW (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Four Common Error Families
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="topic32-card rounded-xl border p-4">
                <h3 className="mb-2 font-bold text-amber-300">1️⃣ Missing or wrong prototype</h3>
                <p>Compiler doesn't know the function's signature. Leads to implicit declaration (pre‑C99) or outright error (C99+).</p>
              </div>
              <div className="topic32-card rounded-xl border p-4">
                <h3 className="mb-2 font-bold text-amber-300">2️⃣ Return type mismatch</h3>
                <p>Function declared to return a type but returns nothing, or returns wrong type, or missing return.</p>
              </div>
              <div className="topic32-card rounded-xl border p-4">
                <h3 className="mb-2 font-bold text-amber-300">3️⃣ Argument count/type mismatch</h3>
                <p>Calling function with wrong number of arguments or types that don't match parameters.</p>
              </div>
              <div className="topic32-card rounded-xl border p-4">
                <h3 className="mb-2 font-bold text-amber-300">4️⃣ Void function returning value</h3>
                <p>Declared <code>void</code> but tries to <code>return</code> an expression.</p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: ERROR 1 – MISSING PROTOTYPE (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🔍 Error 1: Missing or Wrong Prototype
            </h2>
            <div className="topic32-card rounded-xl border p-6">
              <p className="mb-3">
                In modern C (C99 and later), calling a function without a visible
                prototype is an error. The compiler will complain:
              </p>
              <pre className="mb-3 rounded bg-gray-800 p-2 text-sm text-red-400">
                error: implicit declaration of function ‘add’
              </pre>
              <p className="mb-3">
                <strong>Solution:</strong> Provide a prototype before the call, or
                move the function definition above the call.
              </p>
              <div className="mt-4 flex items-start gap-4">
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-red-400">❌ Wrong</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int main() {"{"}
                    <br />
                    &nbsp;&nbsp;int x = add(2,3); <span className="text-gray-500">// no prototype seen</span>
                    <br />
                    {"}"}
                    <br />
                    int add(int a, int b) {"{"} return a+b; {"}"}
                  </pre>
                </div>
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-green-400">✅ Correct</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int add(int a, int b); <span className="text-gray-500">// prototype</span>
                    <br />
                    int main() {"{"}
                    <br />
                    &nbsp;&nbsp;int x = add(2,3);
                    <br />
                    {"}"}
                    <br />
                    int add(int a, int b) {"{"} return a+b; {"}"}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ----- SECTION 4: ERROR 2 – RETURN TYPE MISMATCH (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🔍 Error 2: Return Type Mismatch / Missing Return
            </h2>
            <div className="topic32-card rounded-xl border p-6">
              <p className="mb-3">
                If a function is declared to return a value, every path must return
                a value of the correct type. Common errors:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li><code>warning: ‘return’ with no value, in function returning non‑void</code></li>
                <li><code>error: incompatible types when returning</code></li>
                <li><code>warning: control reaches end of non‑void function</code></li>
              </ul>
              <div className="mt-4 flex items-start gap-4">
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-red-400">❌ Wrong</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int getNumber() {"{"}
                    <br />
                    &nbsp;&nbsp;<span className="text-gray-500">// missing return</span>
                    <br />
                    {"}"}
                  </pre>
                </div>
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-green-400">✅ Correct</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int getNumber() {"{"}
                    <br />
                    &nbsp;&nbsp;return 42;
                    <br />
                    {"}"}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ----- SECTION 5: ERROR 3 – ARGUMENT MISMATCH (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🔍 Error 3: Argument Count / Type Mismatch
            </h2>
            <div className="topic32-card rounded-xl border p-6">
              <p className="mb-3">
                When calling a function, the number and types of arguments must match
                the prototype. Common errors:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li><code>error: too few arguments to function ‘add’</code></li>
                <li><code>error: incompatible type for argument 1 of ‘add’</code></li>
              </ul>
              <div className="mt-4 flex items-start gap-4">
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-red-400">❌ Wrong</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int add(int a, int b);
                    <br />
                    int main() {"{"}
                    <br />
                    &nbsp;&nbsp;add(5); <span className="text-gray-500">// too few</span>
                    <br />
                    {"}"}
                  </pre>
                </div>
                <div className="w-1/2">
                  <p className="mb-1 text-sm font-semibold text-green-400">✅ Correct</p>
                  <pre className="rounded bg-gray-800 p-2 text-xs">
                    int add(int a, int b);
                    <br />
                    int main() {"{"}
                    <br />
                    &nbsp;&nbsp;add(5, 3);
                    <br />
                    {"}"}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ----- SECTION 6: C CODE EXAMPLES – live erroneous code (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Live Code: See the Errors Yourself
            </h2>
            <p className="text-gray-300">
              Each example contains a deliberate error. Try compiling to see the
              messages, then fix them.
            </p>

            <EditableCCodeBlock
              title="Example 1: Missing prototype"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Return type mismatch / missing return"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Argument count/type mismatch"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe:</strong> The compiler error messages point you to
              the exact line and describe the problem. Learn to read them!
            </div>
          </section>

          {/* ----- SECTION 7: REAL‑WORLD CONTEXT – students & places (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Compiler Errors at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic32-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> spent
                an hour wondering why his program printed garbage. The function
                returned a value but he forgot the <code>return</code> statement.
                The compiler warning (“control reaches end of non‑void function”) was
                ignored – he learned to never ignore warnings.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Tuhina</strong> called a
                function with the wrong argument type. The compiler error was clear,
                but she didn't understand “incompatible type”. After this topic, she
                now reads the entire message.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Abhronila, Debangshu, Ritaja</strong> now
                treat compiler warnings as errors.
              </p>
            </div>
          </section>

          {/* ----- SECTION 8: COMMON PITFALLS (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic32-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Ignoring warnings:
                  </span>{" "}
                  Many function errors start as warnings (e.g., implicit declaration,
                  missing return). Treat warnings as errors (<code>-Werror</code>) to
                  catch them early.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Misreading the error line:
                  </span>{" "}
                  The error may point to the line of the call, but the real issue is
                  the prototype (or lack thereof). Look at both.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Thinking “it compiled on my machine”:
                  </span>{" "}
                  Different compilers or standards (C89 vs C99) may accept different
                  things. Always use <code>-std=c99 -Wall -Wextra</code>.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting to include headers:
                  </span>{" "}
                  Standard functions like <code>printf</code> need <code>#include &lt;stdio.h&gt;</code>.
                  Missing it causes implicit declaration warnings/errors.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why does the compiler say “implicit
                declaration” for a missing prototype? (In older C, it assumed the
                function returned <code>int</code> – a dangerous default.)
              </p>
            </div>
          </section>

          {/* ----- SECTION 9: BEST PRACTICES & PRO TIPS (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic32-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Always use function prototypes
                </h3>
                <p className="text-sm">
                  Declare every function before use – either in a header or at the
                  top of the file.
                </p>
              </div>
              <div className="topic32-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ⚡ Compile with <code>-Wall -Wextra -Werror</code>
                </h3>
                <p className="text-sm">
                  Turn warnings into errors. This catches missing returns,
                  mismatched types, and other common mistakes.
                </p>
              </div>
              <div className="topic32-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Read the first error first
                </h3>
                <p className="text-sm">
                  Often one error causes a cascade. Fix the first one, recompile.
                </p>
              </div>
              <div className="topic32-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📚 Know your standard
                </h3>
                <p className="text-sm">
                  Use <code>-std=c99</code> or <code>-std=c11</code> to enforce
                  modern rules and avoid implicit declarations.
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: MINI CHECKLIST (delay-0.9s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.9s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 32
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can identify and fix
                “implicit declaration” errors.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know to always return
                a value from non‑void functions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I check argument counts
                and types against the prototype.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I compile with warnings
                enabled and treat them seriously.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand the most
                common compiler messages.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 11: TEACHER'S NOTE (delay-1.0s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:1.0s]",
              "topic32-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  <strong>Naihati CNAT</strong> panic when they see a compiler error.
                  I tell them: the compiler is your most honest critic. Read what it
                  says, look at the line number, and think. 90% of errors are simple
                  typos or missing declarations. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Use an editor with syntax highlighting and
                    real‑time linting – it catches many of these before you even
                    compile.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 12: HINT – subtle guidance (delay-1.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:1.1s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In the missing prototype example, add the prototype. Then change the
                function definition to <code>double add(int a, int b)</code> – the
                prototype says <code>int</code>. What error do you get? (This is a
                mismatch between declaration and definition.)
                <br />
                <span className="mt-2 block text-gray-400">
                  (The compiler will complain about conflicting types.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 32 complete – you're now equipped to debug function errors. Next:
            best practices for writing reusable functions.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic32;