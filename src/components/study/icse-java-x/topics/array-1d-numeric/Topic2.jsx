import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import arrayCreationRaw from "./topic2_files/ArrayCreationNewKeyword.java?raw";

/**
 * Topic2: Array Creation Using new Keyword
 *
 * This component covers:
 * - Using the 'new' keyword to allocate memory for an array
 * - Syntax: new type[size]
 * - Memory allocation on the heap
 * - Default values after creation
 * - Difference between declaration and instantiation
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic2 = () => {
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
              🆕 Array Creation Using <code className="text-3xl">new</code> Keyword
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Allocating memory for arrays dynamically.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              What Does <code className="text-2xl">new</code> Do?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                In Java, the <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">new</code> keyword is used to allocate memory for objects – including arrays.
                When you write <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">int[] marks = new int[5];</code>, you are:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Creating an array object on the heap</li>
                <li>Allocating contiguous memory for 5 integers (4 bytes each → 20 bytes total)</li>
                <li>Setting each element to the default value for that type (0 for int)</li>
                <li>Returning the reference (memory address) to the variable <code className="text-sm">marks</code></li>
              </ul>
              <p>
                Think of it like building a row of 5 lockers in the school hallway in Ichapur.
                <code className="text-sm">new</code> actually constructs the lockers – before that, you only had a key (reference) with no lockers.
              </p>
            </div>
          </section>

          {/* MEMORY ALLOCATION SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧠 Heap Allocation with <code className="text-2xl">new</code>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="180"
                viewBox="0 0 600 180"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Stack (reference) */}
                <rect x="50" y="20" width="120" height="60" fill="#2d3748" rx="8" />
                <text x="80" y="55" fill="#fbbf24" fontSize="14" fontWeight="bold">Stack</text>
                <text x="80" y="75" fill="#f7fafc" fontSize="12">marks (ref)</text>
                <line x1="110" y1="80" x2="110" y2="110" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Heap array object */}
                <rect x="40" y="110" width="300" height="60" fill="#2d3748" rx="8" />
                <text x="60" y="140" fill="#fbbf24" fontSize="14" fontWeight="bold">Heap</text>
                <text x="60" y="160" fill="#f7fafc" fontSize="12">int[5] array (contiguous)</text>

                {/* Individual elements (cells) */}
                <rect x="200" y="110" width="40" height="60" fill="#4a5568" rx="4" />
                <rect x="240" y="110" width="40" height="60" fill="#4a5568" rx="4" />
                <rect x="280" y="110" width="40" height="60" fill="#4a5568" rx="4" />
                <rect x="320" y="110" width="40" height="60" fill="#4a5568" rx="4" />
                <rect x="360" y="110" width="40" height="60" fill="#4a5568" rx="4" />

                <text x="215" y="150" fill="#f7fafc" fontSize="10">0</text>
                <text x="255" y="150" fill="#f7fafc" fontSize="10">0</text>
                <text x="295" y="150" fill="#f7fafc" fontSize="10">0</text>
                <text x="335" y="150" fill="#f7fafc" fontSize="10">0</text>
                <text x="375" y="150" fill="#f7fafc" fontSize="10">0</text>

                {/* Arrow marker definition */}
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

                {/* Animated pulse on new keyword area */}
                <circle cx="400" cy="40" r="15" fill="transparent" stroke="#fbbf24" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="15;20;15"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text x="420" y="45" fill="#fbbf24" fontSize="12">new</text>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                <code className="text-xs">new int[5]</code> creates the array object on the heap; the reference is stored in the stack variable.
              </p>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Creating Arrays with <code className="text-2xl">new</code>
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={arrayCreationRaw}
                title="ArrayCreationNewKeyword.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program demonstrates creating arrays of different types using <code>new</code>, and prints default values.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Syntax of <code className="text-2xl">new</code> for Arrays
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Basic form
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      type[] arrayName = new type[size];
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Multi-dimensional
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      int[][] matrix = new int[3][4];
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Without specifying all dimensions (jagged arrays)
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      int[][] triangle = new int[5][];
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose
                  </dt>
                  <dd>
                    <code className="text-sm">new</code> allocates heap memory and returns the reference. It is the only way to create an array object (aside from literal <code className="text-sm">{`{}`}</code> which implicitly uses <code className="text-sm">new</code>).
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
                  Negative size
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">new int[-5];</code> compiles but throws <code className="text-xs">NegativeArraySizeException</code> at runtime.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting <code className="text-xs">new</code>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[] arr = int[5];</code> – missing <code className="text-xs">new</code> causes compile error.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Using size with type in static initializer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[3] arr = {`{1,2,3}`};</code> – not allowed; size is inferred.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Large size causing memory issues
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Requesting a huge array (e.g., <code className="text-xs">new int[Integer.MAX_VALUE]</code>) can lead to <code className="text-xs">OutOfMemoryError</code>.
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
                  <strong>Always check size before creation</strong> – especially if size comes from user input (Tuhina might enter a huge number).
                </li>
                <li>
                  <strong>Use meaningful variable names</strong> – e.g., <code className="text-xs">studentAges</code>, <code className="text-xs">dailyTemperatures</code>.
                </li>
                <li>
                  <strong>For large arrays, consider memory constraints</strong> – estimate required memory: size × element size.
                </li>
                <li>
                  <strong>Remember default values</strong> – after <code className="text-xs">new</code>, numeric arrays are filled with 0, booleans with false, objects with null.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> Use <code className="text-xs">Arrays.toString()</code> to quickly view array contents after creation – helpful for debugging.
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
                  • What happens if you write <code className="text-xs">int[] arr = new int[0];</code>? Is that useful? (Yes, for empty collections.)
                </li>
                <li>
                  • After <code className="text-xs">int[] x = new int[3]; int[] y = x;</code>, how many array objects exist?
                </li>
                <li>
                  • Try creating an array of a reference type (e.g., <code className="text-xs">String[] names = new String[3];</code>). What are the default values?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) explains:
                </p>
                <p>
                  “The <code className="text-xs">new</code> keyword is your construction crew. Without it, no array exists. 
                  I often ask my students in Naihati: ‘If you declare a variable, do you have a house? No, you only have an address label. 
                  <code className="text-xs">new</code> builds the house.’ Also, remember that default values are your safety net – 
                  they prevent garbage data. Always check array size before creation to avoid runtime surprises.”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> <code className="text-xs">new</code> allocates heap memory.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Syntax: <code className="text-xs">new type[size]</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Size must be non‑negative integer.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Elements get default values (0, false, null).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> The array reference is stored in the variable.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Without <code className="text-xs">new</code>, no array object exists.
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 2 – Array creation using new keyword | Next: Default values of numeric arrays
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic2;