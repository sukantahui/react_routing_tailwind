import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import traverseLengthRaw from "./topic6_files/TraverseLengthProperty.java?raw";

/**
 * Topic6: Traversing Using length Property
 *
 * This component explains:
 * - What the `length` property is
 * - Why it's a property, not a method
 * - Using `length` in for loops for safe traversal
 * - Common mistakes when using `length`
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic6 = () => {
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
              📏 Traversing Using <code className="text-3xl">length</code> Property
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The built‑in guardian that keeps your loops safe.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              What is the <code className="text-2xl">length</code> Property?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Every array in Java has a public final field called <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">length</code>. 
                It stores the number of elements the array can hold – its capacity. 
                This value is set when the array is created and cannot be changed.
              </p>
              <p>
                Unlike <code className="text-sm">String</code>‘s <code className="text-sm">length()</code> method, array <code className="text-sm">length</code> is a <strong>property</strong> (not a method), 
                so you use it without parentheses: <code className="text-sm">array.length</code>.
              </p>
              <p>
                In the analogy of a row of lockers in Barrackpore, <code className="text-sm">length</code> is the total number of lockers 
                built. Swadeep can only access lockers 0 through length‑1; going beyond would be like trying 
                to open a locker that doesn’t exist.
              </p>
            </div>
          </section>

          {/* LENGTH ILLUSTRATION SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧮 <code className="text-2xl">length</code> in Action
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

                {/* Length indicator */}
                <line x1="50" y1="110" x2="550" y2="110" stroke="#fbbf24" strokeWidth="2" />
                <text x="300" y="130" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">
                  length = 5
                </text>

                {/* Animated brackets showing length */}
                <path d="M50 30 L50 110" stroke="#fbbf24" strokeWidth="3" fill="none" strokeDasharray="4 4">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>
                <path d="M550 30 L550 110" stroke="#fbbf24" strokeWidth="3" fill="none" strokeDasharray="4 4">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>

                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 5, 0 10" fill="#fbbf24" />
                  </marker>
                </defs>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                <code className="text-xs">array.length</code> gives the total capacity – here 5. Valid indices are 0…4.
              </p>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Using <code className="text-2xl">length</code> for Traversal
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={traverseLengthRaw}
                title="TraverseLengthProperty.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program shows safe forward and backward traversal using <code>length</code>.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 The <code className="text-2xl">length</code> Property
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Signature
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      public final int length;
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose
                  </dt>
                  <dd>
                    To know the number of elements an array can hold. Essential for loop conditions to avoid index errors.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Usage
                  </dt>
                  <dd>
                    <code className="text-sm">for (int i = 0; i &lt; arr.length; i++)</code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Note
                  </dt>
                  <dd>
                    It is a <em>field</em>, not a method – no parentheses.
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
                  Using parentheses: <code className="text-xs">length()</code>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Because <code className="text-xs">String</code> uses <code className="text-xs">length()</code>, beginners often add parentheses to array <code className="text-xs">length</code>, causing a compilation error.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting that <code className="text-xs">length</code> is final
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Attempting to assign <code className="text-xs">array.length = 10;</code> results in a compiler error – it’s read‑only.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Misunderstanding <code className="text-xs">length</code> for 2D arrays
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For a 2D array <code className="text-xs">int[][] matrix = new int[3][4];</code>, <code className="text-xs">matrix.length</code> is 3 (rows). To get columns, use <code className="text-xs">matrix[0].length</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Using <code className="text-xs">length</code> as the last index
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">arr[arr.length]</code> is always out of bounds. The last index is <code className="text-xs">arr.length - 1</code>.
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
                  <strong>Always use <code className="text-xs">array.length</code> in loop conditions</strong> – never hard‑code the size.
                </li>
                <li>
                  <strong>Remember it’s a property</strong> – no parentheses. This is a common interview question.
                </li>
                <li>
                  <strong>For multi‑dimensional arrays</strong>, use nested loops with <code className="text-xs">.length</code> for each dimension.
                </li>
                <li>
                  <strong>If you need the number of elements actually filled</strong> (not capacity), maintain a separate counter.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> When passing an array to a method, you can always rely on its <code className="text-xs">length</code> inside the method – it travels with the array.
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
                  • What does <code className="text-xs">int[] arr = new int[0];</code> give for <code className="text-xs">arr.length</code>? Can you traverse it?
                </li>
                <li>
                  • How would you traverse a 2D array using <code className="text-xs">length</code> for both dimensions?
                </li>
                <li>
                  • If you have an array of size 5, what is the result of <code className="text-xs">arr[5]</code>? Why?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) reminds:
                </p>
                <p>
                  “The <code className="text-xs">length</code> property is your best friend when looping. I’ve seen students in Shyamnagar waste hours debugging because they wrote <code className="text-xs">&lt;= arr.length</code>. Remember: array indices are zero‑based, so the condition is <code className="text-xs">i &lt; arr.length</code>. And never try to change <code className="text-xs">length</code> – it’s final for a reason. The array size is fixed at birth, like the number of seats in a classroom.”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> <code className="text-xs">array.length</code> gives total capacity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> It’s a property, not a method (no parentheses)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Valid indices: 0 to <code className="text-xs">length - 1</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Use in loop: <code className="text-xs">i &lt; arr.length</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> For 2D: <code className="text-xs">arr.length</code> = rows, <code className="text-xs">arr[0].length</code> = columns
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Cannot change <code className="text-xs">length</code> (final)
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 6 – Traversing using length property | Next: Displaying array elements
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic6;