import React from "react";
import clsx from "clsx";

// Editable C code block component (assumed to be available in common)
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic1_files/
import whileBasic from "./topic1_files/while_basic.c?raw";
import whileSum from "./topic1_files/while_sum.c?raw";
import whileInputValidation from "./topic1_files/while_input_validation.c?raw";

/**
 * Topic1: while loop – syntax, flowchart, condition‑based execution
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 1
 * @description
 *   Introduces the while loop as the first repetition structure.
 *   Covers syntax, flowchart, execution flow, and entry‑controlled nature.
 *   Only uses concepts from Topic0; does not mention do-while or for.
 *   Emphasises condition‑based repetition and common pitfalls.
 *
 * @pedagogical
 *   - Topic1 – first concrete loop syntax
 *   - Builds on the “need for repetition” from Topic0
 *   - Uses student names (Tuhina, Swadeep, Debangshu) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic1 = () => {
  // Sukanta Hui – teacher information with dynamic experience calculation
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998; // started in 1998

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Inline keyframes for fade + slide-up – zero config, only arbitrary values */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (fade + slide, delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🔁 The <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">while</code> Loop
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Syntax, flowchart, and condition‑based execution. The <code>while</code> loop is the
            simplest repetition structure – it repeats a block as long as a condition remains true.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧠 Entry‑controlled loop
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📘 Condition checked first
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⚠️ Watch for infinite loops
            </span>
          </div>
        </section>

        {/* ---------- SYNTAX & PROTOTYPE (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📐</span> Syntax & prototype
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-900 rounded-lg p-5 font-mono text-sm text-green-400 shadow-inner">
                <pre className="whitespace-pre-wrap">
{`while (condition) {
    // statement(s);
}`}
                </pre>
              </div>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Prototype</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    <code>while ( expression ) statement</code>
                  </dd>
                </div>
                <div>
                  <dt className="font-seminal text-gray-900 dark:text-white">🔹 Return type</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    No return value; it is a control flow statement.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Purpose</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Execute a block repeatedly while a condition evaluates to true (non‑zero).
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 When & why</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Use when the number of iterations is not known beforehand – e.g., reading
                    until end‑of‑file, waiting for a flag, input validation.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                💡 Entry‑controlled means:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The condition is evaluated <strong>before</strong> each iteration. If it is false
                initially, the loop body never executes. This makes <code>while</code> safe for
                zero‑iteration scenarios.
              </p>
            </div>
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
            <span className="text-3xl">🗺️</span> Flowchart of a <code>while</code> loop
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="320"
              viewBox="0 0 600 320"
              className="max-w-full"
              aria-label="Flowchart of while loop: condition diamond, true branch to body, loop back, false branch exit"
            >
              {/* Start oval */}
              <ellipse cx="300" cy="30" rx="60" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="300" y="36" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                Start
              </text>

              {/* Arrow down */}
              <line x1="300" y1="50" x2="300" y2="80" stroke="#6b7280" strokeWidth="2" className="dark:stroke-gray-500" />
              <polygon points="300,80 295,70 305,70" fill="#6b7280" className="dark:fill-gray-500" />

              {/* Condition diamond */}
              <polygon
                points="300,100 350,140 300,180 250,140"
                fill="#fef3c7"
                className="dark:fill-yellow-900/40 transition-all duration-300 hover:fill-yellow-200 dark:hover:fill-yellow-800/50"
                stroke="#d97706"
                strokeWidth="2"
              />
              <text x="300" y="150" textAnchor="middle" fontSize="14" fill="#78350f" className="dark:fill-yellow-300">
                condition?
              </text>

              {/* True branch (right) */}
              <line x1="350" y1="140" x2="450" y2="140" stroke="#059669" strokeWidth="2" />
              <polygon points="450,140 440,135 440,145" fill="#059669" />
              <text x="400" y="120" fontSize="12" fill="#065f46" className="dark:fill-green-400">
                true
              </text>

              {/* Body rectangle */}
              <rect x="450" y="110" width="100" height="60" rx="8" fill="#dbeafe" className="dark:fill-blue-900/30" />
              <text x="500" y="145" textAnchor="middle" fontSize="14" fill="#1e3a8a" className="dark:fill-blue-300">
                loop body
              </text>

              {/* Loop back from body to condition */}
              <line x1="500" y1="170" x2="500" y2="220" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="500" y1="220" x2="300" y2="220" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="300" y1="220" x2="300" y2="180" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="300,180 295,190 305,190" fill="#6b7280" />
              <text x="400" y="210" fontSize="11" fill="#4b5563" className="dark:fill-gray-400">
                repeat
              </text>

              {/* False branch (down) */}
              <line x1="250" y1="140" x2="200" y2="140" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,140 210,135 210,145" fill="#b45309" />
              <text x="190" y="120" fontSize="12" fill="#b45309" className="dark:fill-orange-400">
                false
              </text>
              <line x1="200" y1="140" x2="200" y2="260" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,260 195,250 205,250" fill="#b45309" />

              {/* End oval */}
              <ellipse cx="200" cy="290" rx="50" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="200" y="296" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                End
              </text>

              {/* Animated dot to show flow – native SVG animate */}
              <circle cx="300" cy="80" r="5" fill="#3b82f6">
                <animateMotion
                  path="M 0,0 L 0,20 L 50,0 L 100,0 L 0,-80"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> The condition is tested <em>before</em> the body.
              If the condition is false at the start, the body is skipped entirely.
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
            Let’s see the <code>while</code> loop in action. Each example demonstrates a
            different use case – from simple counting to robust input handling.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🔢 Example 1: Print numbers 1 to 5"
              initialCode={whileBasic}
            />
            <EditableCCodeBlock
              title="➕ Example 2: Sum of first N natural numbers"
              initialCode={whileSum}
            />
            <EditableCCodeBlock
              title="🔄 Example 3: Input validation (repeat until valid)"
              initialCode={whileInputValidation}
            />
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
                <span className="text-2xl">⌨️</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tuhina's menu system
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A canteen billing system in Barrackpore keeps showing the menu until the
                cashier presses 'q'. A <code>while</code> loop checks the input each time.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📡</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Swadeep's sensor reader
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A weather station in Ichapur reads temperature every second. The loop
                runs indefinitely – <code>while(1)</code> – until the device is powered off.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔐</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Debangshu's password check
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A login screen in Naihati repeatedly asks for password until it matches.
                The condition compares the stored hash with the input.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧾</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Abhronila's invoice generator
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                An accounting program processes each line item in a bill. The loop continues
                until there are no more items.
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
                  <span><strong>Infinite loop</strong> – forgetting to update the condition variable inside the body.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Using = instead of ==</strong> – assignment inside condition (e.g., <code>while(x = 5)</code>) creates an infinite loop because the result is always true (non‑zero).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Off‑by‑one</strong> – loop executes one too many or one too few times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Semicolon after while</strong> – e.g., <code>while(condition);</code> creates an empty body, leading to infinite loop or no execution.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Misunderstanding zero‑iteration</strong> – assuming the body always runs at least once.</span>
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
                  <span><strong>Always use braces</strong> – even for a single statement. Improves readability and prevents bugs when adding statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Update the condition variable</strong> – ensure progress toward loop termination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Initialize before the loop</strong> – counters, accumulators should have a starting value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use meaningful condition names</strong> – e.g., <code>while(!fileEnd)</code> instead of <code>while(x)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Avoid complex conditions</strong> – if the condition becomes too long, consider a separate function or a flag variable.</span>
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
              …what happens if you place a semicolon right after the <code>while(condition)</code>.
              Why does the program not behave as expected? <br />
              <strong>Try changing this:</strong> In the sum example, remove the <code>i++</code> inside the loop.
              What do you observe?
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
              "I can write the syntax of a while loop.",
              "I understand that the condition is checked before each iteration.",
              "I can trace the flow of a while loop using a flowchart.",
              "I know how to avoid infinite loops (update condition variable).",
              "I can distinguish between = and == in conditions.",
              "I can use while for input validation and counter‑controlled loops.",
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
                  “The <code>while</code> loop is where many students encounter their first
                  infinite loop. I ask them to deliberately write one – then we debug it
                  together. It’s a rite of passage. Emphasise the <strong>condition
                  update</strong>; without it, the loop becomes a runaway train.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Draw the flowchart first</strong> – helps visualise the entry‑controlled nature.</li>
                <li><strong>Use local examples</strong> – waiting for a bus in Shyamnagar, serving customers in Ichapur.</li>
                <li><strong>Always initialise counters</strong> – uninitialised variables lead to undefined behaviour.</li>
                <li><strong>Show the semicolon trap</strong> – one misplaced semicolon is a classic.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic1;