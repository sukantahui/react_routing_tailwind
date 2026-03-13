import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic4_files/
import breakSearch from "./topic4_files/break_search.c?raw";
import continueOdd from "./topic4_files/continue_odd.c?raw";
import breakMenu from "./topic4_files/break_menu.c?raw";

/**
 * Topic4: Using break and continue for advanced loop control
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 4
 * @description
 *   Introduces break and continue statements – tools for finer control inside loops.
 *   break: exit the loop immediately.
 *   continue: skip the rest of the current iteration and jump to the next.
 *   Builds on while, do-while, for loops (Topics 1–3).
 *
 * @pedagogical
 *   - Topic4 – first advanced control statements
 *   - Focus: when to exit early, when to skip an iteration
 *   - Uses student names (Tuhina, Swadeep, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic4 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes breakFlash {
          0%, 100% { stroke: #dc2626; stroke-width: 2; }
          50% { stroke: #ef4444; stroke-width: 4; }
        }
        @keyframes continueJump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🎮 Advanced Loop Control: <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">break</code> & <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">continue</code>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Sometimes you need to exit a loop early, or skip the current iteration
            without breaking out entirely. <code>break</code> and <code>continue</code>
            give you that precision.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🛑 break: exit now
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⏭️ continue: skip rest
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⚠️ Use with care
            </span>
          </div>
        </section>

        {/* ---------- CONCEPTUAL BREAKDOWN (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧩</span> What are <code>break</code> and <code>continue</code>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* break card */}
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🛑</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">break</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Immediately terminates the innermost loop (or switch). Execution resumes
                at the first statement after the loop.
              </p>
              <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                <pre>while (condition) {`{
    if (found) break;
    // ...
}`}</pre>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                🔹 Use when: searching and you've found what you need, error occurs,
                or sentinel value reached.
              </p>
            </div>
            {/* continue card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⏭️</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">continue</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Skips the rest of the current iteration and jumps directly to the
                next iteration (update + condition check in for; condition check in while).
              </p>
              <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                <pre>for (int i=0; i&lt;10; i++) {`{
    if (i % 2 == 0) continue;
    printf("%d", i);  // only odd numbers
}`}</pre>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                🔹 Use when: you want to skip invalid data, ignore certain cases,
                but continue looping.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>⚠️ Common misconception:</strong> <code>break</code> does <em>not</em> exit the program
              (that's <code>exit()</code>). It only exits the innermost loop or switch.
            </p>
          </div>
        </section>

        {/* ---------- FLOWCHART SVG (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🗺️</span> Visualising <code>break</code> vs <code>continue</code>
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="320"
              viewBox="0 0 600 320"
              className="max-w-full"
              aria-label="Comparison of break and continue in a loop flowchart"
            >
              {/* Background – simplified loop representation */}
              <rect x="20" y="20" width="250" height="260" rx="10" fill="#f3f4f6" className="dark:fill-gray-800" />
              <text x="145" y="45" textAnchor="middle" fontSize="16" fill="#1f2937" className="dark:fill-gray-200">
                🔁 Normal loop
              </text>
              
              {/* Loop body area */}
              <rect x="40" y="70" width="210" height="160" rx="6" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="145" y="100" textAnchor="middle" fontSize="14" fill="#4b5563" className="dark:fill-gray-400">
                loop body
              </text>
              
              {/* break path */}
              <rect x="80" y="130" width="60" height="30" rx="4" fill="#fee2e2" className="dark:fill-red-900/30" />
              <text x="110" y="150" textAnchor="middle" fontSize="12" fill="#b91c1c" className="dark:fill-red-400">
                break;
              </text>
              <line x1="110" y1="160" x2="110" y2="210" stroke="#b91c1c" strokeWidth="2" />
              <polygon points="110,210 105,200 115,200" fill="#b91c1c" />
              <text x="130" y="190" fontSize="11" fill="#b91c1c" className="dark:fill-red-400">
                exit loop
              </text>
              
              {/* continue path */}
              <rect x="160" y="130" width="70" height="30" rx="4" fill="#dbeafe" className="dark:fill-blue-900/30" />
              <text x="195" y="150" textAnchor="middle" fontSize="12" fill="#1e40af" className="dark:fill-blue-400">
                continue;
              </text>
              <line x1="195" y1="160" x2="195" y2="210" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="195,210 190,200 200,200" fill="#2563eb" />
              <text x="215" y="190" fontSize="11" fill="#2563eb" className="dark:fill-blue-400">
                jump to next iteration
              </text>
              
              {/* Right side – summary */}
              <rect x="320" y="20" width="250" height="260" rx="10" fill="#f3f4f6" className="dark:fill-gray-800" />
              <text x="445" y="55" textAnchor="middle" fontSize="16" fill="#1f2937" className="dark:fill-gray-200">
                Effect
              </text>
              <text x="445" y="100" textAnchor="middle" fontSize="14" fill="#b91c1c" className="dark:fill-red-400">
                🔴 break
              </text>
              <text x="445" y="130" textAnchor="middle" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                Loop terminates immediately.
              </text>
              <text x="445" y="180" textAnchor="middle" fontSize="14" fill="#2563eb" className="dark:fill-blue-400">
                🔵 continue
              </text>
              <text x="445" y="210" textAnchor="middle" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                Skip remaining body,
              </text>
              <text x="445" y="230" textAnchor="middle" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                go to next iteration.
              </text>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> <code>break</code> completely leaves the loop;
              <code>continue</code> jumps to the next iteration (in for, the update expression runs first).
            </p>
          </div>
        </section>

        {/* ---------- CODE EXAMPLES (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📟</span> Live C examples
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            See <code>break</code> and <code>continue</code> in action.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🔍 Example 1: break – search for a number in array"
              initialCode={breakSearch}
            />
            <EditableCCodeBlock
              title="📉 Example 2: continue – print only odd numbers"
              initialCode={continueOdd}
            />
            <EditableCCodeBlock
              title="🍽️ Example 3: break in menu – exit on '0'"
              initialCode={breakMenu}
            />
          </div>

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-300 flex items-start gap-2">
              <span className="font-bold">🎓 Pro tip:</span>
              In deeply nested loops, <code>break</code> only exits the innermost loop.
              To break out of multiple levels, consider using a flag variable or
              <code>goto</code> (rare, but sometimes cleaner).
            </p>
          </div>
        </section>

        {/* ---------- REAL-WORLD SCENARIOS (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> Real‑world usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔎</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tuhina's attendance search
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                She has a list of 500 students. Once she finds "Debangshu", no need to
                scan further – <code>break</code> stops the loop.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚫</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Swadeep's data cleaner
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Reading temperature sensors in Ichapur. If a reading is invalid (-999),
                <code>continue</code> skips it and moves to the next sample.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎰</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Abhronila's game loop
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                In a trivia game, if the player chooses to quit, <code>break</code> exits
                the game loop immediately.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Naihati email validator
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                When checking if an email contains '@', as soon as it's found,
                <code>break</code> stops searching – early exit saves time.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- TIPS, TRICKS & PITFALLS (delay 0.5s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.5s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Common mistakes & best practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Pitfalls */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Beginner mistakes
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Using break to exit an if</strong> – <code>break</code> only works inside loops or switch. Outside, it's a compilation error.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Misunderstanding continue in while</strong> – if the update is after continue, you may create an infinite loop. In while, <code>continue</code> jumps to condition; in for, it jumps to update+condition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Breaking only the inner loop</strong> – when nested loops are used, <code>break</code> only exits the innermost one; beginners expect it to break all.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Overusing break/continue</strong> – they can make code less readable if used excessively. Sometimes a well‑placed condition is clearer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Break in switch inside loop</strong> – break exits the switch, not the loop. Use a flag or goto to exit both.</span>
                </li>
              </ul>
            </div>
            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Best practices
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use break to avoid unnecessary iterations</strong> – especially in search loops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use continue to skip invalid data</strong> – keeps the loop body clean.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Comment why you're using break/continue</strong> – it's a “jump” and can be surprising.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Prefer while(!found) pattern</strong> – sometimes a flag is clearer than break in the middle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>In for loops, use continue with confidence</strong> – it's safe because the update runs.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hint Section */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
              💭 Think about…
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              …what happens if you write <code>continue;</code> in a <code>while</code> loop
              after the update statement? Try to construct an infinite loop on purpose.<br />
              <strong>Try changing this:</strong> In the odd‑number example, replace
              <code>continue</code> with an <code>if-else</code>. Which version is more readable?
            </p>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST (delay 0.6s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.6s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">✅</span> Mini checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "I know that break exits the loop immediately.",
              "I know that continue skips to the next iteration.",
              "I understand the difference in behavior between while and for with continue.",
              "I can use break to implement a 'found' flag in a search.",
              "I avoid using break/continue in a way that makes code spaghetti.",
              "I remember that break also works in switch statements.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-xl">✔️</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE (delay 0.7s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.7s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧑‍🏫</span> Teacher’s Note
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🧔</span>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sukanta Hui
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📧 sukantahui@codernaccotax.co.in
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">📱 7003756860</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Experience:</span> {experienceYears} years
                (since 1998)
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Skills:</span> Programming Language, RDBMS,
                Operating System, Web Development
              </p>
              <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-gray-800 dark:text-gray-200 italic">
                  “<code>break</code> and <code>continue</code> are like emergency exits and
                  skip buttons. I tell students: <strong>use them, but don't abuse them.</strong>
                  The most common bug I see is putting <code>break</code> inside an <code>if</code>
                  that's inside a <code>switch</code> that's inside a loop – and they wonder
                  why the loop didn't break. We trace it on the board with coloured chalk.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>break ≠ exit()</strong> – it only leaves the loop.</li>
                <li><strong>continue in while: watch your update</strong> – infinite loop risk.</li>
                <li><strong>Demonstrate with a search</strong> – “find Tuhina's roll number”.</li>
                <li><strong>Compare with flag‑based loops</strong> – sometimes cleaner.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic4;