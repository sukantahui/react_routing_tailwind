import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import declInitRaw from "./topic1_files/ArrayDeclarationInit.java?raw";

/**
 * Topic1: Declaration and Initialization of Arrays
 *
 * This component covers:
 * - How to declare an array variable
 * - Different ways to initialize an array (static & dynamic)
 * - Syntax variations and best practices
 * - Memory implications of declaration vs initialization
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic1 = () => {
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
              📦 Declaration & Initialization of Arrays
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              How to bring an array to life – from variable name to memory allocation.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              What Does "Declaration" and "Initialization" Mean?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Declaration</strong> tells the compiler: “I want a variable that can refer to an array of a certain type.”
                It does <em>not</em> create the array itself – only a reference (stored on the stack).
              </p>
              <p>
                <strong>Initialization</strong> actually creates the array object in memory (on the heap) and optionally fills it with values.
                After initialization, the reference points to a usable array.
              </p>
              <p>
                Think of it like a locker key (declaration) vs. actually building the locker (initialization). In Barrackpore,
                Swadeep might have a key (reference) but until we build the locker (array), he can't store anything.
              </p>
            </div>
          </section>

          {/* SYNTAX SVG / DIAGRAM (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📝 Syntax at a Glance
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="200"
                viewBox="0 0 600 200"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Declaration block */}
                <rect x="30" y="20" width="250" height="70" fill="#2d3748" rx="8" />
                <text x="50" y="55" fill="#fbbf24" fontSize="16" fontWeight="bold">
                  Declaration
                </text>
                <text x="50" y="80" fill="#f7fafc" fontSize="14">
                  int[] marks;   // reference only
                </text>

                {/* Arrow to initialization */}
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
                <line
                  x1="150"
                  y1="95"
                  x2="150"
                  y2="130"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />

                {/* Initialization block */}
                <rect x="30" y="130" width="250" height="70" fill="#2d3748" rx="8" />
                <text x="50" y="165" fill="#fbbf24" fontSize="16" fontWeight="bold">
                  Initialization
                </text>
                <text x="50" y="190" fill="#f7fafc" fontSize="14">
                  marks = new int[5];   // heap object
                </text>

                {/* Combined (declaration + init together) */}
                <rect x="320" y="75" width="250" height="70" fill="#2d3748" rx="8" />
                <text x="340" y="110" fill="#fbbf24" fontSize="16" fontWeight="bold">
                  Combined
                </text>
                <text x="340" y="135" fill="#f7fafc" fontSize="14">
                  int[] marks = new int[5];
                </text>
                <text x="340" y="155" fill="#a0aec0" fontSize="12">
                  (most common)
                </text>

                {/* Animated highlight */}
                <circle cx="450" cy="110" r="10" fill="transparent" stroke="#fbbf24" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="10;15;10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Declaration creates a reference (stored in stack). Initialization allocates the array object on the heap.
              </p>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Declaration & Initialization in Action
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={declInitRaw}
                title="ArrayDeclarationInit.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program shows three ways: separate declaration & initialization, combined, and static initializer.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Syntax Variations & Purpose
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    1. Declaration only
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      int[] arr;
                    </code>{" "}
                    – arr is null, cannot be used yet.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    2. Declaration + instantiation (with default values)
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      int[] arr = new int[5];
                    </code>{" "}
                    – creates array of size 5, all elements 0.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    3. Static initialization (with values)
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      int[] arr = {`{10, 20, 30};`}
                    </code>{" "}
                    – size inferred from values.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    4. Anonymous array
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      new int[] {`{1,2,3}`}
                    </code>{" "}
                    – used when passing directly to methods.
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
                  Using array before initialization
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[] arr; System.out.println(arr);</code> – compiler error: variable not initialized.
                  Or if initialized to null, <code className="text-xs">NullPointerException</code> at runtime.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Mixing declaration with size
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[5] arr;</code> is invalid syntax. Size is only given with <code className="text-xs">new</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting <code className="text-xs">new</code> in dynamic init
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[] arr = int[5];</code> – missing <code className="text-xs">new</code> causes compile error.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Using size in static initializer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">int[3] arr = {`{1,2,3};`}</code> – cannot specify size; it's inferred.
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
                  <strong>Prefer combined declaration+initialization</strong> when you know the size/values upfront – it's clearer and avoids null references.
                </li>
                <li>
                  <strong>Use static initializer for small fixed sets</strong> (e.g., days of week, student names from Naihati). 
                </li>
                <li>
                  <strong>Declare arrays with <code className="text-xs">type[] name</code></strong> – it's consistent with return types and easier to read.
                </li>
                <li>
                  <strong>Always initialize arrays before use</strong> – even if it's just <code className="text-xs">new int[0]</code> for empty array.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> Use anonymous arrays for quick method calls:{" "}
                  <code className="text-xs">printArray(new int[] {`{1,2,3}`});</code>
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
                  • What is the value of <code className="text-xs">arr</code> after only declaration? Where does it point?
                </li>
                <li>
                  • Can you declare an array without specifying the type? Why not?
                </li>
                <li>
                  • Try writing code that declares an array and then initializes it later. What happens if you forget the second step?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) says:
                </p>
                <p>
                  “Many beginners think <code className="text-xs">int[] arr;</code> creates an array. It does not! It only creates a reference. 
                  I always tell my students in Shyamnagar: ‘A key without a locker is useless.’ Always pair declaration with initialization.
                  The static initializer <code className="text-xs">{`{...}`}</code> is your friend for fixed data – use it often.”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> Declaration: <code className="text-xs">type[] name;</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Initialization: <code className="text-xs">new type[size]</code> or <code className="text-xs">{`{values}`}</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Combined: <code className="text-xs">int[] a = new int[5];</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Static init: <code className="text-xs">int[] a = {`{1,2}`};</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Anonymous: <code className="text-xs">new int[] {`{1,2}`}</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Never use an uninitialized array.
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 1 – Declaration & Initialization | Next: Array creation using new keyword
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic1;