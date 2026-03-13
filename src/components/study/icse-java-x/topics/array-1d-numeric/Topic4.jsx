import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import scannerInputRaw from "./topic4_files/ArrayInputScanner.java?raw";

/**
 * Topic4: Input Using Scanner for Arrays
 *
 * This component explains:
 * - How to take user input for array elements using Scanner
 * - Setting up Scanner (import, creation)
 * - Reading different data types
 * - Common pitfalls with Scanner (nextInt vs nextLine)
 * - Best practices for reading arrays
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic4 = () => {
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
              ⌨️ Input Using Scanner for Arrays
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Reading array elements from the user – the interactive way.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              Why Scanner?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                The <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">Scanner</code> class, found in the <code className="text-sm">java.util</code> package, is the simplest way to read user input in Java. It can parse primitive types and strings using regular expressions.
              </p>
              <p>
                For arrays, we often need to ask the user for the size first, then read each element one by one. Think of taking attendance in a class at Barrackpore: first you ask how many students (size), then you record each name (elements). Swadeep, Tuhina, Abhronila, and Debangshu would each provide their marks.
              </p>
              <p>
                Scanner handles input from various sources: <code className="text-sm">System.in</code> (keyboard), files, strings. For now, we focus on keyboard input.
              </p>
            </div>
          </section>

          {/* SCANNER SETUP DIAGRAM (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🛠️ Setting Up Scanner
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="150"
                viewBox="0 0 600 150"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Import statement */}
                <rect x="50" y="20" width="200" height="40" fill="#2d3748" rx="8" />
                <text x="70" y="45" fill="#fbbf24" fontSize="14">import java.util.Scanner;</text>

                {/* Arrow down */}
                <line x1="150" y1="60" x2="150" y2="80" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Scanner creation */}
                <rect x="50" y="80" width="300" height="40" fill="#2d3748" rx="8" />
                <text x="70" y="105" fill="#f7fafc" fontSize="14">Scanner sc = new Scanner(System.in);</text>

                {/* Arrow down */}
                <line x1="200" y1="120" x2="200" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Usage hints */}
                <rect x="50" y="140" width="400" height="40" fill="#2d3748" rx="8" />
                <text x="70" y="165" fill="#a0aec0" fontSize="14">int n = sc.nextInt();   // read size</text>

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

                {/* Animated circle on Scanner object */}
                <circle cx="380" cy="100" r="12" fill="transparent" stroke="#fbbf24" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Always remember to import <code className="text-xs">java.util.Scanner</code> and close the scanner when done.
              </p>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Reading Array Elements
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={scannerInputRaw}
                title="ArrayInputScanner.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program reads array size, then each element, and finally displays them.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Scanner Methods for Arrays
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    <code className="text-sm">nextInt()</code>
                  </dt>
                  <dd>Reads an integer from the user. Used for array size and integer elements.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    <code className="text-sm">nextDouble()</code>, <code className="text-sm">nextFloat()</code>
                  </dt>
                  <dd>Read floating‑point numbers.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    <code className="text-sm">nextLine()</code>
                  </dt>
                  <dd>Reads an entire line (including spaces). Useful for string arrays.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    <code className="text-sm">next()</code>
                  </dt>
                  <dd>Reads a single word (token).</dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose
                  </dt>
                  <dd>To populate arrays with user‑provided values, making programs interactive.</dd>
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
                  Forgetting to import Scanner
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">Scanner sc = new Scanner(System.in);</code> without <code className="text-xs">import java.util.Scanner;</code> causes compiler error.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Not closing Scanner
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Leaving Scanner open can cause resource leaks. Always call <code className="text-xs">sc.close()</code> when done (but not before you're finished reading).
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Mixing nextInt() and nextLine()
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  After <code className="text-xs">nextInt()</code>, the newline character is left in the buffer. A subsequent <code className="text-xs">nextLine()</code> reads that newline, not the expected input. Add an extra <code className="text-xs">nextLine()</code> to consume it.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  InputMismatchException
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If the user enters a letter when a number is expected, Scanner throws this exception. Always validate input or handle exceptions.
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
                  <strong>Prompt the user clearly</strong> – tell them what to enter. For example: <code className="text-xs">System.out.print("Enter array size: ");</code>
                </li>
                <li>
                  <strong>Validate size</strong> – ensure it's positive before creating the array.
                </li>
                <li>
                  <strong>Use <code className="text-xs">hasNextInt()</code> to check</strong> before reading, to avoid exceptions.
                </li>
                <li>
                  <strong>Close Scanner only when completely done</strong> – closing <code className="text-xs">System.in</code> makes it unavailable for later reads.
                </li>
                <li>
                  <strong>For string arrays</strong>, decide whether to use <code className="text-xs">next()</code> (single word) or <code className="text-xs">nextLine()</code> (full line).
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> When reading numbers and then strings, consume the leftover newline with <code className="text-xs">sc.nextLine();</code> after the last numeric read.
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
                  • What happens if the user enters a negative size? How would you handle it?
                </li>
                <li>
                  • If you read an int array but the user types a decimal like 3.14, what exception occurs?
                </li>
                <li>
                  • Try modifying the code to read a mix of numbers and strings. Do you need an extra <code className="text-xs">nextLine()</code>?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) emphasizes:
                </p>
                <p>
                  “Scanner is the first tool students learn for interaction. But the <code className="text-xs">nextInt()</code>/<code className="text-xs">nextLine()</code> trap catches many. I tell my class in Ichapur: ‘After reading a number, imagine there's an invisible Enter key still in the input stream. Call <code className="text-xs">nextLine()</code> once to swallow it.’ Also, always validate – never trust user input blindly. A robust program anticipates mistakes.”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> Import <code className="text-xs">java.util.Scanner</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Create Scanner with <code className="text-xs">new Scanner(System.in)</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Prompt user before each input
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Use appropriate <code className="text-xs">nextXxx()</code> methods
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Handle the newline after numeric reads
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Close Scanner when done
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 4 – Input using Scanner | Next: Traversing an array using for loop
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic4;