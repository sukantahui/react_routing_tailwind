import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import traverseForLoopRaw from "./topic5_files/TraverseForLoop.java?raw";

/**
 * Topic5: Traversing an Array Using for Loop
 *
 * This component explains:
 * - What array traversal means
 * - Using a standard for loop to access each element by index
 * - The role of the index variable
 * - Common traversal patterns (printing, summing, searching)
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic5 = () => {
  return (
    <>
      {/* Inline keyframes for reveal animation */}
      <style>{`
        @keyframes fadeInSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Force dark mode by adding 'dark' class to the root container */}
      <div className="dark">
        {/* Main container: soft background, soothing typography */}
        <div
          className={clsx(
            "max-w-5xl mx-auto px-4 py-8 md:px-6 lg:px-8",
            "bg-gray-50 dark:bg-gray-900",
            "text-gray-800 dark:text-gray-200",
            "leading-relaxed"
          )}
        >
          {/* HEADER with reveal animation */}
          <div
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-8"
            style={{ animationFillMode: "both" }}
          >
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2 text-gray-900 dark:text-white">
              🔄 Traversing an Array Using <code className="text-3xl">for</code> Loop
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Walking through each element, one index at a time.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              What is Array Traversal?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Traversal</strong> means visiting each element of an array exactly once, usually to perform some operation like printing, summing, or searching.
              </p>
              <p>
                The most common way to traverse an array in Java is with a <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">for</code> loop, using an index variable that runs from <code className="text-sm">0</code> to <code className="text-sm">array.length - 1</code>.
              </p>
              <p>
                Think of it like a teacher taking attendance in a class at Barrackpore: you start with student in seat 0 (Swadeep), then move to seat 1 (Tuhina), then seat 2 (Abhronila), and so on until you’ve checked every seat.
              </p>
            </div>
          </section>

          {/* TRAVERSAL DIAGRAM SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧭 Walking Through the Array
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="180"
                viewBox="0 0 600 180"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Array cells */}
                <rect x="50" y="40" width="500" height="60" fill="#2d3748" rx="8" />
                <rect x="50" y="40" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="150" y="40" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="250" y="40" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="350" y="40" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="450" y="40" width="100" height="60" fill="#4a5568" rx="8" />

                {/* Index labels */}
                <text x="90" y="75" textAnchor="middle" fill="#f7fafc" fontSize="14">0</text>
                <text x="190" y="75" textAnchor="middle" fill="#f7fafc" fontSize="14">1</text>
                <text x="290" y="75" textAnchor="middle" fill="#f7fafc" fontSize="14">2</text>
                <text x="390" y="75" textAnchor="middle" fill="#f7fafc" fontSize="14">3</text>
                <text x="490" y="75" textAnchor="middle" fill="#f7fafc" fontSize="14">4</text>

                {/* Loop arrow (moving) */}
                <path
                  d="M 90 120 Q 190 140 290 120 Q 390 100 490 120"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;30"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Arrowheads */}
                <defs>
                  <marker
                    id="arrowheadLoop"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 5, 0 10" fill="#fbbf24" />
                  </marker>
                </defs>
                <line
                  x1="470"
                  y1="125"
                  x2="490"
                  y2="123"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  markerEnd="url(#arrowheadLoop)"
                />

                <text x="250" y="150" fill="#a0aec0" fontSize="12" textAnchor="middle">
                 <code> {`for (int i = 0; i < length; i++) { visit arr[i]; }`}</code>
                </text>
              </svg>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Traversing with for Loop
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={traverseForLoopRaw}
                title="TraverseForLoop.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program demonstrates printing elements, summing them, and finding a maximum – all using a standard for loop.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 The for Loop Structure for Arrays
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Basic pattern
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                      {`for (int i = 0; i < array.length; i++) {
    // access array[i]
}`}
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose
                  </dt>
                  <dd>
                    To perform an operation on each element sequentially. The loop variable <code className="text-sm">i</code> acts as the current index.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Return type
                  </dt>
                  <dd>
                    The loop itself does not return a value, but the operations inside may produce results (like sum).
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* COMMON PITFALLS (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ⚠️ Common Pitfalls (Beginners)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Off‑by‑one errors
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Using <code className="text-xs">&lt;= array.length</code> leads to <code className="text-xs">ArrayIndexOutOfBoundsException</code>. Valid indices are 0 to length‑1.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Hard‑coding array length
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Writing <code className="text-xs">for (int i = 0; i &lt; 5; i++)</code> breaks if array size changes. Always use <code className="text-xs">array.length</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Modifying the index inside loop
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Changing <code className="text-xs">i</code> inside the loop can cause skipped elements or infinite loops.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting to initialize the loop variable
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All parts of the for loop are optional, but omitting initialization may lead to unexpected behavior.
                </p>
              </div>
            </div>
          </section>

          {/* BEST PRACTICES & TIPS (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ✅ Best Practices & Pro Tips
            </h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg space-y-3 shadow-sm transition-all duration-300 hover:shadow-md">
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Always use <code className="text-xs">array.length</code></strong> – never hard‑code size.
                </li>
                <li>
                  <strong>Choose meaningful loop variable names</strong> – <code className="text-xs">i</code> is conventional for index, but for nested loops use <code className="text-xs">j</code>, <code className="text-xs">k</code>.
                </li>
                <li>
                  <strong>Keep loop bodies focused</strong> – if the operation is complex, extract it to a method.
                </li>
                <li>
                  <strong>For read‑only traversal, consider enhanced for loop</strong> (future topic), but understand the index‑based version first.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> Use the loop index when you need to know the position (e.g., printing “Element at index i is …”). For pure values, enhanced for is cleaner.
                </li>
              </ul>
            </div>
          </section>

          {/* HINT SECTION (subtle guidance) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span>💭 Think about…</span>
              </h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-200">
                <li>
                  • What would happen if you set the loop condition to <code className="text-xs">i &lt;= array.length</code>? Try it mentally with an array of size 3.
                </li>
                <li>
                  • If you want to traverse the array backwards, how would you change the for loop?
                </li>
                <li>
                  • How would you compute the product of all elements using a for loop?
                </li>
              </ul>
            </div>
          </section>

          {/* TEACHER'S NOTE */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
              <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                <span>👩‍🏫 Teacher’s Note</span>
              </h3>
              <div className="space-y-3 text-amber-700 dark:text-amber-200">
                <p>
                  <strong>Sukanta Hui</strong> (27 years of experience) shares:
                </p>
                <p>
                  “Traversal is the most fundamental operation on arrays. Master the off‑by‑one logic early – it will save you hours of debugging. I tell my students in Naihati: ‘The first locker is number 0, not 1. If you have 5 lockers, the last is number 4.’ Use <code className="text-xs">array.length</code> religiously. And remember, the loop variable gives you both the value and its position – use that power wisely.”
                </p>
                <p className="text-sm">
                  📧 sukantahui@codernaccotax.co.in | 📞 7003756860
                  <br />
                  Skills: Programming Languages, RDBMS, OS, Web Development
                </p>
              </div>
            </div>
          </section>

          {/* MINI CHECKLIST */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-6"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ✅ Checklist – What to Remember
            </h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Indices: 0 to length‑1
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Use <code className="text-xs">array.length</code> in condition
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Loop variable <code className="text-xs">i</code> is the current index
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Access element with <code className="text-xs">array[i]</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Be careful with <code className="text-xs">&lt;=</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Don’t modify <code className="text-xs">i</code> inside loop
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 5 – Traversing using for loop | Next: Traversing using length property
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic5;