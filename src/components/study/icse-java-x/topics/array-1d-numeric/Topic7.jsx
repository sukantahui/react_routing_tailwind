import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import displayArrayRaw from "./topic7_files/DisplayArrayElements.java?raw";

/**
 * Topic7: Displaying Array Elements
 *
 * This component explains:
 * - Different ways to display array elements in Java
 * - Using for loop (index-based)
 * - Using enhanced for loop
 * - Using Arrays.toString() utility
 * - Formatted output
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic7 = () => {
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
              🖥️ Displaying Array Elements
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Showing the contents of an array – from simple loops to elegant utilities.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              Why Display Arrays?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Displaying array elements is essential for debugging, verifying input, and presenting results. 
                Whether you're showing marks of students in Barrackpore (Swadeep, Tuhina, Abhronila, Debangshu) 
                or just checking your program's logic, you need to print the array contents.
              </p>
              <p>
                Java offers several ways to display arrays, each with its own use case:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Basic for loop</strong> – full control over formatting and indices.</li>
                <li><strong>Enhanced for loop</strong> – simpler when you only need values.</li>
                <li><strong>Arrays.toString()</strong> – quick, one‑line representation.</li>
                <li><strong>Streams (Java 8+)</strong> – functional style for advanced cases.</li>
              </ul>
            </div>
          </section>

          {/* DISPLAY METHODS SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧩 Display Methods at a Glance
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="200"
                viewBox="0 0 600 200"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* For loop box */}
                <rect x="30" y="20" width="150" height="70" fill="#2d3748" rx="8" />
                <text x="50" y="50" fill="#fbbf24" fontSize="14" fontWeight="bold">for (int i=0; ...)</text>
                <text x="50" y="70" fill="#f7fafc" fontSize="12">System.out.print(arr[i])</text>

                {/* Enhanced for box */}
                <rect x="220" y="20" width="150" height="70" fill="#2d3748" rx="8" />
                <text x="240" y="50" fill="#fbbf24" fontSize="14" fontWeight="bold">for (int val : arr)</text>
                <text x="240" y="70" fill="#f7fafc" fontSize="12">System.out.print(val)</text>

                {/* Arrays.toString box */}
                <rect x="410" y="20" width="150" height="70" fill="#2d3748" rx="8" />
                <text x="430" y="50" fill="#fbbf24" fontSize="14" fontWeight="bold">Arrays.toString(arr)</text>
                <text x="430" y="70" fill="#f7fafc" fontSize="12">"[1, 2, 3]"</text>

                {/* Output example */}
                <rect x="200" y="120" width="200" height="40" fill="#2d3748" rx="8" />
                <text x="250" y="145" fill="#a0aec0" fontSize="14">Output: 85 90 78 92 88</text>

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

                {/* Animated arrows */}
                <line x1="100" y1="90" x2="250" y2="115" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="300" y1="90" x2="300" y2="115" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="490" y1="90" x2="350" y2="115" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Displaying Arrays
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={displayArrayRaw}
                title="DisplayArrayElements.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program demonstrates multiple ways to display array contents.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Common Display Patterns
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Basic for loop
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {`for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`}
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Enhanced for loop
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {`for (int value : arr) {
    System.out.print(value + " ");
}`}
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Arrays.toString()
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      System.out.println(Arrays.toString(arr));
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose
                  </dt>
                  <dd>
                    To inspect array contents – for debugging, logging, or user output.
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
                  Printing array reference
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">System.out.println(arr);</code> prints something like <code className="text-xs">[I@15db9742</code> (type + hashcode), not the elements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting import for Arrays
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Using <code className="text-xs">Arrays.toString()</code> requires <code className="text-xs">import java.util.Arrays;</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  No spaces or separators
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Printing without separators (e.g., <code className="text-xs">System.out.print(arr[i])</code>) concatenates digits, making output unreadable.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Using <code className="text-xs">Arrays.toString()</code> on multi‑dimensional arrays
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For 2D arrays, use <code className="text-xs">Arrays.deepToString()</code> to see nested contents.
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
                  <strong>Use <code className="text-xs">Arrays.toString()</code> for quick debugging</strong> – it’s concise and readable.
                </li>
                <li>
                  <strong>When formatting matters</strong> (e.g., for user output), use a loop to control spacing, commas, or alignment.
                </li>
                <li>
                  <strong>For multi‑dimensional arrays</strong>, nest loops or use <code className="text-xs">Arrays.deepToString()</code>.
                </li>
                <li>
                  <strong>Add labels</strong> – always print a message before the array so the output makes sense.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> In production logs, consider logging array length and a sample of elements rather than the whole array if it’s huge.
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
                  • What output do you get from <code className="text-xs">System.out.println(arr)</code>? Try it!
                </li>
                <li>
                  • How would you print an array in reverse order?
                </li>
                <li>
                  • If you have an array of objects, what does <code className="text-xs">Arrays.toString()</code> display?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) advises:
                </p>
                <p>
                  “Displaying arrays is your window into the program’s state. I’ve seen students in Ichapur spend hours hunting bugs when a simple <code className="text-xs">System.out.println(Arrays.toString(arr))</code> would have revealed the issue instantly. Learn all three methods: loops for control, enhanced for simplicity, and <code className="text-xs">Arrays.toString()</code> for speed. And remember – never print the reference directly unless you enjoy debugging hex codes!”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> Don’t print array variable directly (use loop or <code className="text-xs">Arrays.toString()</code>)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> For loops give full formatting control
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Enhanced for is cleaner when index not needed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> <code className="text-xs">Arrays.toString()</code> requires <code className="text-xs">import java.util.Arrays;</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> For 2D arrays, use <code className="text-xs">Arrays.deepToString()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Always add descriptive text before output
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 7 – Displaying array elements | Next: Linear Search
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic7;