import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic3_files/
import forBasic from "./topic3_files/for_basic.c?raw";
import forSum from "./topic3_files/for_sum.c?raw";
import forArray from "./topic3_files/for_array.c?raw";

/**
 * Topic3: for loop – counter‑controlled iteration and compact loop design
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 3
 * @description
 *   Introduces the for loop – the most compact and widely used loop for
 *   counter‑controlled repetition. Brings together initialization,
 *   condition, and update in one line. Builds on while and do-while.
 *
 * @pedagogical
 *   - Topic3 – third loop structure, builds on while/do-while
 *   - Focus: compact syntax, counting, array traversal
 *   - Uses student names (Swadeep, Tuhina, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic3 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes blinkSemicolon {
          0%, 100% { fill: #dc2626; opacity: 0.7; }
          50% { fill: #ef4444; opacity: 1; }
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
            🔁 The <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">for</code> Loop
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Counter‑controlled iteration, compact design – all loop control in one line.
            The <code>for</code> loop is the workhorse of counting and array traversal.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🔢 Counter‑controlled
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📦 Compact syntax
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📚 Ideal for arrays
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
{`for (initialization; condition; update) {
    // statement(s);
}`}
                </pre>
              </div>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Prototype</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    <code>for ( init-expr ; cond-expr ; loop-expr ) statement</code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Return type</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    No return value; it is a control flow statement.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Purpose</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Execute a block a known number of times. All control elements
                    (initialization, condition, update) are gathered in one place.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 When & why</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Use when you know the exact number of iterations in advance, or when
                    iterating over arrays/sequences. The compact form reduces the chance
                    of forgetting the update step.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl">
              <p className="font-medium text-cyan-800 dark:text-cyan-300 mb-2">
                💡 Three parts, one line:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>initialization</strong> – runs once before the first iteration.</li>
                <li><strong>condition</strong> – checked before each iteration; loop continues if true.</li>
                <li><strong>update</strong> – executed after each iteration.</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                All three are optional, but the semicolons <strong>must</strong> be present.
                <br />Example: <code>for(;;)</code> is an infinite loop.
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
            <span className="text-3xl">🗺️</span> Flowchart of a <code>for</code> loop
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="380"
              viewBox="0 0 600 380"
              className="max-w-full"
              aria-label="Flowchart of for loop: initialization, condition, body, update, loop back"
            >
              {/* Initialization block */}
              <rect x="230" y="20" width="140" height="50" rx="8" fill="#d1d5db" className="dark:fill-gray-600" />
              <text x="300" y="50" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                i = 1 (initialization)
              </text>

              {/* Arrow to condition */}
              <line x1="300" y1="70" x2="300" y2="100" stroke="#6b7280" strokeWidth="2" />
              <polygon points="300,100 295,90 305,90" fill="#6b7280" />

              {/* Condition diamond */}
              <polygon
                points="300,120 350,160 300,200 250,160"
                fill="#fef3c7"
                className="dark:fill-yellow-900/40 transition-all duration-300 hover:fill-yellow-200 dark:hover:fill-yellow-800/50"
                stroke="#d97706"
                strokeWidth="2"
              />
              <text x="300" y="170" textAnchor="middle" fontSize="14" fill="#78350f" className="dark:fill-yellow-300">
                i ≤ 5?
              </text>

              {/* True branch */}
              <line x1="350" y1="160" x2="450" y2="160" stroke="#059669" strokeWidth="2" />
              <polygon points="450,160 440,155 440,165" fill="#059669" />
              <text x="400" y="140" fontSize="12" fill="#065f46" className="dark:fill-green-400">
                true
              </text>

              {/* Body rectangle */}
              <rect x="450" y="130" width="100" height="60" rx="8" fill="#dbeafe" className="dark:fill-blue-900/30" />
              <text x="500" y="165" textAnchor="middle" fontSize="14" fill="#1e3a8a" className="dark:fill-blue-300">
                loop body
              </text>

              {/* Update block */}
              <rect x="450" y="210" width="100" height="50" rx="8" fill="#d1d5db" className="dark:fill-gray-600" />
              <text x="500" y="240" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                i++ (update)
              </text>

              {/* Arrow from update back to condition */}
              <line x1="500" y1="260" x2="500" y2="300" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="500" y1="300" x2="300" y2="300" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="300" y1="300" x2="300" y2="200" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="300,200 295,210 305,210" fill="#6b7280" />
              <text x="400" y="310" fontSize="11" fill="#4b5563" className="dark:fill-gray-400">
                repeat
              </text>

              {/* False branch */}
              <line x1="250" y1="160" x2="200" y2="160" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,160 210,155 210,165" fill="#b45309" />
              <text x="190" y="140" fontSize="12" fill="#b45309" className="dark:fill-orange-400">
                false
              </text>
              <line x1="200" y1="160" x2="200" y2="340" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,340 195,330 205,330" fill="#b45309" />

              {/* End oval */}
              <ellipse cx="200" cy="370" rx="50" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="200" y="376" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                End
              </text>

              {/* Animated dot showing flow – initialization → condition → body → update → condition... */}
              <circle cx="300" cy="45" r="5" fill="#2563eb">
                <animateMotion
                  path="M 0,0 L 0,55 L 150,0 L 50,50 L 0,-140"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> initialization runs once, then condition,
              body, update, condition, body, update … until condition becomes false.
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
            The <code>for</code> loop excels at counting and array processing.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🔢 Example 1: Print numbers 1 to 5 (for version)"
              initialCode={forBasic}
            />
            <EditableCCodeBlock
              title="➕ Example 2: Sum of first N natural numbers"
              initialCode={forSum}
            />
            <EditableCCodeBlock
              title="📚 Example 3: Array traversal (student marks)"
              initialCode={forArray}
            />
          </div>

          <div className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <p className="text-sm text-cyan-800 dark:text-cyan-300 flex items-start gap-2">
              <span className="font-bold">✏️ Note:</span>
              The <code>for</code> loop is not a new kind of loop – it's a compact way to write
              a <code>while</code> loop. Compare: <code>{`for(i=1; i<=5; i++)`}</code> is equivalent
              to <code>{`i=1; while(i<=5){ i++;}`}</code>.
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
                <span className="text-2xl">🧮</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Multiplication table
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep's teacher asked him to print the multiplication table of 7.
                A <code>for</code> loop from 1 to 10 makes it trivial.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏫</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Attendance list
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina writes a program to print roll numbers 1 to 45.
                <code>{`for(roll=1; roll<=45; roll++)`}</code> – clear, concise.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Barrackpore weather data
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Daily temperature readings for 7 days stored in an array. A <code>for</code> loop
                computes the average temperature.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔄</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Naihati lottery number generator
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Generate 100 random lottery tickets – the loop runs a fixed number of times.
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
                  <span><strong>Off‑by‑one errors</strong> – using <code>&lt;=</code> when you meant <code>&lt;</code>, or vice versa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Using commas instead of semicolons</strong> – <code>for(i=1, i&lt;=5, i++)</code> is invalid.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Modifying the loop counter inside the body</strong> – leads to unexpected jumps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Infinite loops</strong> – forgetting to update the counter, or condition never becomes false.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Floating‑point counters</strong> – due to precision, may cause one extra or missing iteration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Re‑declaring the counter</strong> – in C99, you can declare <code>int i</code> inside the <code>for</code>, but if already declared, shadowing can confuse.</span>
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
                  <span><strong>Declare the loop counter inside for (C99+)</strong> – <code>for(int i=0; i&lt;n; i++)</code> limits scope and avoids accidental reuse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use meaningful names</strong> – <code>studentIndex</code>, <code>row</code>, <code>day</code> instead of <code>i</code>, <code>j</code> when helpful.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Keep the loop body short</strong> – if it grows, consider a function call.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Avoid complex expressions in condition</strong> – pre‑compute if possible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Prefer prefix ++i over i++ when the value isn't used</strong> – slight performance benefit, but mainly consistency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use for loops for fixed counts, while for flexible conditions</strong> – makes intent clear.</span>
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
              …what happens if you omit the update expression, like <code>for(i=1; i&lt;=5; )</code>.
              Is it still a valid loop? How do you avoid an infinite loop? <br />
              <strong>Try changing this:</strong> In the sum example, change the condition to
              <code>i &lt;= n+1</code>. What output do you get? Why?
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
              "I can write the syntax of a for loop (three parts, two semicolons).",
              "I understand the execution order: init, condition, body, update.",
              "I can convert a for loop to a while loop and vice versa.",
              "I know that all three parts are optional (e.g., for(;;)).",
              "I avoid off‑by‑one errors by carefully choosing < vs ≤.",
              "I can use a for loop to traverse an array.",
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
                  “The <code>for</code> loop is where students feel they've ‘arrived’. 
                  I remind them: it's just a <code>while</code> loop in a tuxedo. 
                  The real power is when we combine it with arrays – that's when 
                  Abhronila’s grade processing and Debangshu’s shopping cart come to life. 
                  Emphasise the <strong>off‑by‑one</strong> – I make them deliberately 
                  write both <code>i &lt; 5</code> and <code>i &lt;= 5</code> and observe.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Compact ≠ complicated</strong> – the three parts are familiar from while.</li>
                <li><strong>Demonstrate array traversal</strong> – a real milestone for beginners.</li>
                <li><strong>Show for(;;) as an idiom</strong> – infinite loop, but intentional.</li>
                <li><strong>Use student names</strong> – Swadeep’s marks, Tuhina’s attendance.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic3;