import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic8_files/
import infiniteLoop from "./topic8_files/infinite_loop.c?raw";
import offByOne from "./topic8_files/off_by_one.c?raw";
import boundaryErrors from "./topic8_files/boundary_errors.c?raw";

/**
 * Topic8: Debugging loops – identifying infinite loops and boundary errors
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 8
 * @description
 *   The final topic in the loop series. Teaches systematic debugging of loops:
 *   - Recognising infinite loops (condition never false, missing update)
 *   - Fixing off‑by‑one errors (wrong relational operator, wrong boundary)
 *   - Handling edge cases (empty input, negative values, array bounds)
 *   - Using print statements and mental tracing
 *
 * @pedagogical
 *   - Topic8 – meta‑cognition: thinking about thinking
 *   - Focus: debugging mindset, systematic elimination
 *   - Uses student names (Swadeep, Tuhina, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic8 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bugAlert {
          0%, 100% { fill: #ef4444; opacity: 0.6; }
          50% { fill: #dc2626; opacity: 1; }
        }
        @keyframes debugScan {
          0% { transform: translateX(-10px); opacity: 0.3; }
          50% { transform: translateX(10px); opacity: 0.8; }
          100% { transform: translateX(-10px); opacity: 0.3; }
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
            🐞 Debugging Loops
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Infinite loops · Off‑by‑one · Boundary errors · Systematic thinking
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🔍 Find the bug
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⚠️ Prevent, detect, fix
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧠 Trace like a computer
            </span>
          </div>
        </section>

        {/* ---------- CONCEPTUAL EXPLANATION (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧩</span> Why loops need special debugging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">🔄</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Infinite loops</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Program never stops – CPU 100%, frozen UI. Often caused by missing update or wrong condition.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">1️⃣</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Off‑by‑one</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Loop runs one too many or one too few times. Classic with <code>≤</code> vs <code>&lt;</code>.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">📏</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Boundary errors</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Array index out of range, division by zero, empty input. Crash or silent corruption.
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Debugging is a <strong>skill, not luck</strong>. Professional developers spend 
            <strong> 50–75% of their time</strong> debugging. Loops concentrate risk because
            one mistake repeats many times. This topic gives you a systematic process.
          </p>
        </section>

        {/* ---------- SVG: DEBUGGING FLOWCHART (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🗺️</span> Systematic debugging process
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="300"
              viewBox="0 0 600 300"
              className="max-w-full"
              aria-label="Debugging flowchart: Reproduce → Observe → Hypothesise → Fix → Test"
            >
              {/* Step 1: Reproduce */}
              <rect x="30" y="30" width="100" height="60" rx="8" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="80" y="60" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                🔁 Reproduce
              </text>
              <text x="80" y="80" textAnchor="middle" fontSize="10" fill="#4b5563" className="dark:fill-gray-400">
                Make it repeatable
              </text>
              
              {/* Step 2: Observe */}
              <rect x="180" y="30" width="100" height="60" rx="8" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="230" y="60" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                🔍 Observe
              </text>
              <text x="230" y="80" textAnchor="middle" fontSize="10" fill="#4b5563" className="dark:fill-gray-400">
                Print statements / debugger
              </text>
              
              {/* Step 3: Hypothesise */}
              <rect x="330" y="30" width="100" height="60" rx="8" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="380" y="60" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                💡 Hypothesise
              </text>
              <text x="380" y="80" textAnchor="middle" fontSize="10" fill="#4b5563" className="dark:fill-gray-400">
                "Maybe i should be &lt; not ≤"
              </text>
              
              {/* Step 4: Fix */}
              <rect x="480" y="30" width="100" height="60" rx="8" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="530" y="60" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                🔧 Fix
              </text>
              <text x="530" y="80" textAnchor="middle" fontSize="10" fill="#4b5563" className="dark:fill-gray-400">
                Change one thing at a time
              </text>
              
              {/* Arrows between steps */}
              <line x1="130" y1="60" x2="180" y2="60" stroke="#6b7280" strokeWidth="2" />
              <polygon points="180,60 170,55 170,65" fill="#6b7280" />
              <line x1="280" y1="60" x2="330" y2="60" stroke="#6b7280" strokeWidth="2" />
              <polygon points="330,60 320,55 320,65" fill="#6b7280" />
              <line x1="430" y1="60" x2="480" y2="60" stroke="#6b7280" strokeWidth="2" />
              <polygon points="480,60 470,55 470,65" fill="#6b7280" />
              
              {/* Test loop back */}
              <ellipse cx="530" cy="150" rx="40" ry="20" fill="#fef3c7" className="dark:fill-yellow-900/40" />
              <text x="530" y="156" textAnchor="middle" fontSize="12" fill="#78350f" className="dark:fill-yellow-300">
                Test
              </text>
              <line x1="530" y1="130" x2="530" y2="90" stroke="#b45309" strokeWidth="2" />
              <polygon points="530,90 525,100 535,100" fill="#b45309" />
              <text x="550" y="70" fontSize="10" fill="#b45309" className="dark:fill-orange-400">
                if not fixed
              </text>
              
              {/* Animated bug */}
              <circle cx="80" cy="150" r="8" fill="#ef4444">
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="80" y="180" textAnchor="middle" fontSize="10" fill="#ef4444">
                bug
              </text>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Debugging is a loop itself:</strong> fix, test, if not fixed → repeat.
            </p>
          </div>
        </section>

        {/* ---------- CODE EXAMPLES – COMMON BUGS (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📟</span> Spot the bug – live examples
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Each example contains a classic loop error. Try to find the bug before running.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🔄 Example 1: Infinite loop"
              initialCode={infiniteLoop}
            />
            <EditableCCodeBlock
              title="1️⃣ Example 2: Off‑by‑one error"
              initialCode={offByOne}
            />
            <EditableCCodeBlock
              title="📏 Example 3: Boundary error"
              initialCode={boundaryErrors}
            />
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <span className="font-bold">🔎 Pro debugging tip:</span>
              Insert <code>printf("i = %d\n", i);</code> inside the loop. The output often reveals
              whether the loop runs too many, too few, or never ends.
            </p>
          </div>
        </section>

        {/* ---------- REAL-WORLD DEBUGGING STORIES (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> Real‑world debugging stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏦</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Naihati Bank – infinite interest
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                A junior developer wrote <code>while(amount &lt; 10000);</code> (note the semicolon).
                The loop body never executed, but the condition never changed → infinite loop.
                Server CPU spiked at 100% at 3 AM.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Shyamnagar School – missing student
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Tuhina's attendance program used <code>i &lt;= n</code> for an array of size n.
                It accessed index n, which is out of bounds. Swadeep spent 2 hours before
                spotting the ≤.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Ichapur Game Studio – stuck player
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Abhronila's game had a <code>while(!gameOver)</code> loop that never updated
                <code>gameOver</code>. Players couldn't exit – they had to close the window.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔬</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Barrackpore Research – silent data corruption
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Debangshu's loop wrote one element past the array. No crash, but the
                variable stored after the array was overwritten. Results were random.
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
            <span className="text-3xl">⚠️</span> Debugging toolkit & best practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Pitfalls */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Frequent loop bugs
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Infinite loop:</strong> missing update, wrong condition, semicolon after <code>while()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Off‑by‑one:</strong> using <code>&lt;=</code> instead of <code>&lt;</code> (or vice versa) with 0‑based indexing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Boundary error:</strong> array index <code>[n]</code> when size is n (last valid is n‑1).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Uninitialised accumulator:</strong> <code>sum += i</code> with <code>sum</code> not initialised.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Wrong operator:</strong> <code>=</code> instead of <code>==</code> in condition.</span>
                </li>
              </ul>
            </div>
            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Professional habits
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Print variable values</strong> – <code>printf("i=%d, sum=%d\n", i, sum);</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use a debugger</strong> – set breakpoints, watch variables, step through.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Test boundaries</strong> – n=0, n=1, n=max.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Change one thing at a time</strong> – then retest.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Explain the code to a rubber duck</strong> – verbalising often reveals the flaw.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Write small test cases</strong> – isolate the loop.</span>
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
              …what happens when you input 0 for n in the sum‑of‑n example? Does the loop run?
              Should it run?<br />
              <strong>Try changing this:</strong> In the infinite loop example, add a print statement
              inside the loop. Does it print forever? Why?
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
              "I can identify three common loop bugs: infinite, off‑by‑one, boundary.",
              "I always check loop termination condition and update.",
              "I test with edge cases (0, 1, negative, large values).",
              "I use printf or a debugger to inspect variables.",
              "I check array indices carefully (0 to size-1).",
              "I understand that debugging is a skill I will keep improving.",
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
                  “Debugging is not about being lucky – it's about being systematic.
                  I tell my students: <strong>the computer is never wrong</strong>. It executes
                  your instructions exactly. If the output is wrong, your instructions are wrong.
                  The best debugger I know is a cup of tea and a rubber duck. I still have
                  the rubber duck Debangshu gave me in 2005.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Infinite loop</strong> – check update and condition.</li>
                <li><strong>Off‑by‑one</strong> – draw the indices on paper.</li>
                <li><strong>Boundary</strong> – test with minimum and maximum.</li>
                <li><strong>Print is your friend</strong> – but remove prints after fixing.</li>
                <li><strong>Debugging is learning</strong> – each bug teaches you something.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic8;