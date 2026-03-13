import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic7_files/
import rectanglePattern from "./topic7_files/rectangle_pattern.c?raw";
import trianglePattern from "./topic7_files/triangle_pattern.c?raw";
import pyramidPattern from "./topic7_files/pyramid_pattern.c?raw";

/**
 * Topic7: Introduction to nested loops for pattern-based problems
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 7
 * @description
 *   Introduces nested loops – loops inside loops. Focuses on generating
 *   2D patterns (rectangles, triangles, pyramids) to build intuition
 *   about row–column iteration. Builds on Topics 0–6.
 *
 * @pedagogical
 *   - Topic7 – first encounter with two-dimensional iteration
 *   - Focus: outer loop = rows, inner loop = columns
 *   - Uses student names (Swadeep, Tuhina, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic7 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes rowPulse {
          0%, 100% { stroke: #3b82f6; stroke-width: 2; }
          50% { stroke: #60a5fa; stroke-width: 4; }
        }
        @keyframes colPulse {
          0%, 100% { stroke: #10b981; stroke-width: 2; }
          50% { stroke: #34d399; stroke-width: 4; }
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
            🔁 Nested Loops & Pattern Problems
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Loops inside loops – the foundation of 2D iteration, matrix operations,
            and beautiful console patterns.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧩 Outer → inner
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📊 Rows & columns
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⏱️ O(n²) complexity
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
            <span className="text-3xl">🧩</span> What are nested loops?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                A <strong>nested loop</strong> is a loop inside another loop. For each
                iteration of the <strong>outer loop</strong>, the <strong>inner loop</strong> runs completely.
              </p>
              <div className="bg-gray-900 rounded-lg p-5 font-mono text-sm text-green-400 shadow-inner mb-4">
                <pre className="whitespace-pre-wrap">
{`for (int row = 0; row < 5; row++) {   // outer loop
    for (int col = 0; col < 3; col++) { // inner loop
        printf("* ");
    }
    printf("\\n"); // newline after each row
}`}
                </pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                This prints 5 rows, each with 3 asterisks – a 5×3 rectangle.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                📐 Outer vs Inner – key roles:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Outer loop</strong> → controls rows (y‑axis, height).</li>
                <li><strong>Inner loop</strong> → controls columns (x‑axis, width).</li>
                <li>Inner loop can depend on the outer loop variable → triangles, pyramids.</li>
                <li>Each iteration of outer triggers a <strong>full cycle</strong> of inner.</li>
              </ul>
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
            <span className="text-3xl">🗺️</span> Flow of nested loops
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="280"
              viewBox="0 0 600 280"
              className="max-w-full"
              aria-label="Flowchart: outer loop contains inner loop"
            >
              {/* Outer loop start */}
              <ellipse cx="120" cy="40" rx="60" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="120" y="46" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                Outer i=0
              </text>
              
              {/* Outer condition */}
              <polygon
                points="120,80 160,120 120,160 80,120"
                fill="#fef3c7"
                className="dark:fill-yellow-900/40"
                stroke="#d97706"
                strokeWidth="2"
              />
              <text x="120" y="130" textAnchor="middle" fontSize="12" fill="#78350f" className="dark:fill-yellow-300">
                {`i < 5?`}
              </text>
              
              {/* True branch from outer condition */}
              <line x1="160" y1="120" x2="300" y2="120" stroke="#059669" strokeWidth="2" />
              <polygon points="300,120 290,115 290,125" fill="#059669" />
              
              {/* Inner loop group */}
              <rect x="300" y="80" width="250" height="150" rx="10" fill="#dbeafe" className="dark:fill-blue-900/30" />
              <text x="425" y="100" textAnchor="middle" fontSize="14" fill="#1e3a8a" className="dark:fill-blue-300">
                🔁 Inner loop
              </text>
              
              {/* Inner start/update */}
              <ellipse cx="425" cy="130" rx="40" ry="12" fill="#e5e7eb" className="dark:fill-gray-600" />
              <text x="425" y="135" textAnchor="middle" fontSize="10" fill="#1f2937" className="dark:fill-gray-200">
                {`j=0; j<3; j++`}
              </text>
              
              {/* Inner condition */}
              <polygon
                points="425,160 455,185 425,210 395,185"
                fill="#fef3c7"
                className="dark:fill-yellow-900/40"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              <text x="425" y="190" textAnchor="middle" fontSize="10" fill="#78350f" className="dark:fill-yellow-300">
                {`j < 3?`}
              </text>
              
              {/* Inner body (print) */}
              <rect x="470" y="175" width="50" height="20" rx="4" fill="#86efac" className="dark:fill-green-900/40" />
              <text x="495" y="190" textAnchor="middle" fontSize="10" fill="#166534" className="dark:fill-green-400">
                printf
              </text>
              
              {/* Loop back inside inner */}
              <line x1="495" y1="195" x2="495" y2="220" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="495" y1="220" x2="385" y2="220" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="385" y1="220" x2="385" y2="170" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />
              
              {/* After inner loop, newline and outer update */}
              <rect x="300" y="240" width="100" height="20" rx="4" fill="#d1d5db" className="dark:fill-gray-600" />
              <text x="350" y="255" textAnchor="middle" fontSize="10" fill="#1f2937" className="dark:fill-gray-200">
                printf("\\n")
              </text>
              <line x1="350" y1="260" x2="120" y2="180" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* False branch from outer condition */}
              <line x1="80" y1="120" x2="20" y2="120" stroke="#b45309" strokeWidth="2" />
              <polygon points="20,120 30,115 30,125" fill="#b45309" />
              <ellipse cx="20" cy="200" rx="50" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="20" y="206" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                End
              </text>
              
              {/* Animated dot showing path */}
              <circle cx="120" cy="60" r="6" fill="#3b82f6">
                <animateMotion
                  path="M0,0 L0,30 L180,0 L100,60 L-20,80 L0,-50"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> The inner loop runs to completion <em>for each</em> 
              iteration of the outer loop. This is the essence of nested loops.
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
            <span className="text-3xl">📟</span> Classic pattern problems
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Nested loops shine when generating 2D shapes. Start simple, then add complexity.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🧱 Example 1: Rectangle (5×3) of asterisks"
              initialCode={rectanglePattern}
            />
            <EditableCCodeBlock
              title="📐 Example 2: Right‑angled triangle"
              initialCode={trianglePattern}
            />
            <EditableCCodeBlock
              title="🔺 Example 3: Pyramid (centered triangle)"
              initialCode={pyramidPattern}
            />
          </div>

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-300 flex items-start gap-2">
              <span className="font-bold">🎓 Pro tip:</span>
              The inner loop condition often depends on the outer loop variable.
              For a triangle, inner loop runs up to <code>row + 1</code> or similar.
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
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Time table generation
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Shyamnagar School:</strong> Tuhina's program schedules periods – 
                outer loop = days, inner loop = hours.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧮</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Matrix multiplication
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Ichapur Engineering College:</strong> Debangshu's 3D graphics code
                uses triple‑nested loops for matrix transformations.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tile‑based games
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Naihati Game Dev Club:</strong> Abhronila renders a 10×10 grid 
                of grass tiles using nested loops.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧾</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Sales report
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Barrackpore Market:</strong> Swadeep's billing system loops through 
                customers (outer) and their purchases (inner).
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
                  <span><strong>Using the same loop variable</strong> – e.g., <code>i</code> for both outer and inner. Conflict!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Forgetting to reset inner variable</strong> – but it's declared inside, so it's fine. Mistake: declaring outer variable outside and reusing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Off‑by‑one in row/column count</strong> – too many or too few stars.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Missing newline after each row</strong> – all stars appear on one line.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Infinite nested loops</strong> – if both conditions never become false.</span>
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
                  <span><strong>Use descriptive variable names</strong> – <code>row</code>, <code>col</code> instead of <code>i</code>, <code>j</code> for clarity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Declare loop variables inside for</strong> – keeps scope narrow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Indent consistently</strong> – shows the nesting structure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Test with small dimensions first</strong> – e.g., 3×3 before 10×10.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Separate row logic from column logic</strong> – outer: rows and newline, inner: columns and print.</span>
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
              …how you would print a hollow rectangle (only border stars).<br />
              <strong>Try changing this:</strong> In the triangle example, change the inner loop condition
              from <code>j &lt;= row</code> to <code>j &lt;= 5 - row</code>. What shape do you get?
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
              "I can write nested loops to print a rectangle.",
              "I can make the inner loop depend on the outer loop (triangle).",
              "I understand that outer = rows, inner = columns.",
              "I always print a newline after each outer iteration.",
              "I use different variable names for outer and inner loops.",
              "I can visualise the pattern before coding.",
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
                  “Nested loops are where students truly understand the power of iteration.
                  I make Swadeep draw a 5×5 grid on the board and physically trace the
                  counters – ‘row 1, column 1; row 1, column 2; …’. Once they see that
                  the inner loop runs completely before the outer moves to the next row,
                  the light bulb turns on. The pyramid pattern is the ultimate test of
                  spatial reasoning – I encourage them to write the formula on paper first.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Rows outside, columns inside</strong> – mantra for 2D.</li>
                <li><strong>Dependency is key</strong> – triangle, pyramid rely on outer counter.</li>
                <li><strong>Whitespace matters</strong> – for pyramids, print spaces first.</li>
                <li><strong>Nesting depth</strong> – 2 levels is common; 3+ levels need care.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic7;