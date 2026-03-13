import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import defaultValuesRaw from "./topic3_files/DefaultValuesNumericArrays.java?raw";

/**
 * Topic3: Default Values of Numeric Arrays
 *
 * This component explains:
 * - What default values are assigned to numeric array elements after creation
 * - Why default values exist (memory initialization)
 * - Default values for different numeric types: byte, short, int, long, float, double
 * - How char and boolean are related (though not strictly numeric)
 * - Practical implications of default values
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic3 = () => {
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
              🔢 Default Values of Numeric Arrays
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              What’s inside an array right after creation? (Hint: it’s not garbage)
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              Why Do Arrays Have Default Values?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                When you create an array using <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">new</code>, Java allocates a contiguous block of memory.
                For safety and predictability, Java automatically initializes every element to a default value.
                This avoids the problem of uninitialized variables (which in some languages contain random garbage).
              </p>
              <p>
                For <strong>numeric arrays</strong> (byte, short, int, long, float, double), the default value is <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">0</code> 
                (or <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">0.0</code> for floating‑point types).
                This means that after <code className="text-sm">int[] scores = new int[5];</code>, every score is zero until you assign a different value.
              </p>
              <p>
                Think of it like a row of lockers in Shyamnagar: when the school builds new lockers, they are completely empty (zero) – no books inside.
                Swadeep and Tuhina can later put their books in, but initially it’s empty.
              </p>
            </div>
          </section>

          {/* DEFAULT VALUES TABLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📊 Default Values by Type
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="py-2 px-3 font-semibold text-indigo-600 dark:text-indigo-400">Type</th>
                      <th className="py-2 px-3 font-semibold text-indigo-600 dark:text-indigo-400">Default Value</th>
                      <th className="py-2 px-3 font-semibold text-indigo-600 dark:text-indigo-400">Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">byte</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0</code></td>
                      <td className="py-2 px-3">Zero as a byte</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">short</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0</code></td>
                      <td className="py-2 px-3">Zero as a short</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">int</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0</code></td>
                      <td className="py-2 px-3">Zero (most common)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">long</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0L</code></td>
                      <td className="py-2 px-3">Zero as a long</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">float</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0.0f</code></td>
                      <td className="py-2 px-3">Zero as a float</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">double</code></td>
                      <td className="py-2 px-3"><code className="text-sm">0.0d</code></td>
                      <td className="py-2 px-3">Zero as a double</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3"><code className="text-sm">char</code></td>
                      <td className="py-2 px-3"><code className="text-sm">'\u0000'</code></td>
                      <td className="py-2 px-3">Null character (numeric 0)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3"><code className="text-sm">boolean</code></td>
                      <td className="py-2 px-3"><code className="text-sm">false</code></td>
                      <td className="py-2 px-3">(not numeric, but included for completeness)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                For reference types (like <code className="text-xs">String</code>), the default is <code className="text-xs">null</code>.
              </p>
            </div>
          </section>

          {/* MEMORY ILLUSTRATION SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧠 Memory After <code className="text-2xl">new int[5]</code>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <svg
                width="100%"
                height="150"
                viewBox="0 0 600 150"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Memory cells */}
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

                {/* Default value '0' inside each cell */}
                <text x="90" y="60" textAnchor="middle" fill="#fbbf24" fontSize="12">0</text>
                <text x="190" y="60" textAnchor="middle" fill="#fbbf24" fontSize="12">0</text>
                <text x="290" y="60" textAnchor="middle" fill="#fbbf24" fontSize="12">0</text>
                <text x="390" y="60" textAnchor="middle" fill="#fbbf24" fontSize="12">0</text>
                <text x="490" y="60" textAnchor="middle" fill="#fbbf24" fontSize="12">0</text>

                {/* Animated pulse on first cell */}
                <circle cx="90" cy="55" r="12" fill="transparent" stroke="#fbbf24" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>

                <text x="250" y="120" fill="#a0aec0" fontSize="12" textAnchor="middle">
                  All elements are 0 (default for int)
                </text>
              </svg>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Default Values in Action
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={defaultValuesRaw}
                title="DefaultValuesNumericArrays.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program creates arrays of different numeric types and prints their default values.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Default Values: Why & When
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Guarantee
                  </dt>
                  <dd>
                    Every array element is automatically initialized to the default value for its type.
                    This is part of Java’s memory safety.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    When does this happen?
                  </dt>
                  <dd>
                    At the moment of array creation (<code className="text-sm">new</code>), before any user code accesses the array.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Why is this useful?
                  </dt>
                  <dd>
                    You can safely use array elements without explicitly initializing them – they start with a known state.
                    This avoids undefined behavior seen in languages like C/C++.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Return type / Purpose
                  </dt>
                  <dd>
                    Not a method, but a language feature. It ensures predictable starting values.
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* COMMON PITFALLS (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ⚠️ Common Pitfalls (Beginners)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Assuming default values are meaningful
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Zero might be a valid value in your domain. For example, if Abhronila’s test score is zero, you can’t tell if it’s default or actually zero. Always initialize explicitly if zero is ambiguous.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Confusing char default
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">char</code> default is <code className="text-xs">'\u0000'</code>, which prints as nothing (or a blank). Beginners might think it’s space <code className="text-xs">' '</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Forgetting default for reference types
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <code className="text-xs">String[] names = new String[3];</code> gives <code className="text-xs">null</code>, not empty string. Trying to call <code className="text-xs">names[0].length()</code> causes NullPointerException.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Thinking local variables get defaults
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Only array elements and class fields get default values. Local variables (inside methods) must be initialized explicitly.
                </p>
              </div>
            </div>
          </section>

          {/* BEST PRACTICES & TIPS (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ✅ Best Practices & Pro Tips
            </h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg space-y-3 shadow-sm transition-all duration-300 hover:shadow-md">
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Explicit initialization</strong> – If zero is a valid meaningful value in your problem, initialize the array with a sentinel like <code className="text-xs">-1</code> to distinguish from default.
                </li>
                <li>
                  <strong>Use <code className="text-xs">Arrays.fill()</code></strong> to set all elements to a specific non‑default value after creation.
                </li>
                <li>
                  <strong>Remember that <code className="text-xs">char</code> arrays default to null character</strong> – useful when dealing with low‑level text buffers.
                </li>
                <li>
                  <strong>For multi‑dimensional arrays</strong>, each nested array is initialized with default values as well.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Pro tip:</span> When debugging, you can rely on defaults to quickly spot unassigned elements – they will be 0, false, or null.
                </li>
              </ul>
            </div>
          </section>

          {/* HINT SECTION (subtle guidance) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span>💭 Think about…</span>
              </h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-200">
                <li>
                  • If you create an <code className="text-xs">int[]</code> of size 10, and you never assign any values, what will <code className="text-xs">arr[5]</code> be?
                </li>
                <li>
                  • How can you test whether a specific element has been assigned a value or still holds the default? (Hint: you can’t directly – design your code to track that.)
                </li>
                <li>
                  • Try creating a <code className="text-xs">float[]</code> and print its elements. Are they <code className="text-xs">0.0</code> or <code className="text-xs">0.0f</code>?
                </li>
              </ul>
            </div>
          </section>

          {/* TEACHER'S NOTE */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
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
                  “Default values are Java’s gift to beginners. In languages like C, uninitialized arrays contain random garbage – leading to bugs that are hard to find. Here, you always start with zero. But be careful: zero might be a valid data point. For example, if Debangshu scored zero on a quiz, you can’t tell if it’s real or default. So in real applications, either initialize all elements explicitly or use a wrapper class like <code className="text-xs">Integer[]</code> where default is null, which you can then check.”
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
            style={{ animationDelay: "1.0s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              ✅ Checklist – What to Remember
            </h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Numeric arrays default to 0 (or 0.0).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> <code className="text-xs">char</code> defaults to <code className="text-xs">'\u0000'</code>.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> <code className="text-xs">boolean</code> defaults to <code className="text-xs">false</code>.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Reference types default to <code className="text-xs">null</code>.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Defaults are set at array creation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Local variables (not array elements) do <em>not</em> get defaults.
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 3 – Default values of numeric arrays | Next: Input using Scanner
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic3;