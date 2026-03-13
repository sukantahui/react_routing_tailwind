import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import array1 from "./topic0_files/array1.png"
// Import raw Java files
import arrayConceptRaw from "./topic0_files/ArrayConcept.java?raw";

/**
 * Topic0: Concept of Array and Memory Representation
 *
 * This component explains:
 * - What an array is
 * - How arrays are stored in memory (contiguous)
 * - Declaration and basic initialization
 * - Real‑world analogies
 * - Common mistakes, best practices, and pro tips
 *
 * Animations:
 * - Section reveal (fade + slide‑up)
 * - Staggered appearance using arbitrary delays
 * - Hover emphasis on cards, SVG steps, teacher note
 *
 * Dark mode is forced by a wrapping `dark` class.
 */
const Topic0 = () => {
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
              📚 Concept of Array & Memory Representation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Understanding how arrays store data sequentially in memory.
            </p>
          </div>

          {/* INTRODUCTION (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              What is an Array?
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                An <strong>array</strong> is a container object that holds a fixed number of
                values of a <em>single type</em>. The elements are stored in contiguous memory
                locations, which makes accessing any element by its index extremely fast – O(1)
                time complexity.
              </p>
              <p>
                Think of it like a row of lockers at a school in{" "}
                <span className="text-indigo-600 dark:text-indigo-400">Barrackpore</span>: each
                locker has a number (index) and can hold one item. Swadeep’s books are in locker
                0, Tuhina’s in locker 1, Abhronila’s in locker 2, and so on.
              </p>
              <p>
                In Java, arrays are objects, so they are created on the heap, but the elements
                themselves are stored in a contiguous block of memory.
              </p>
            </div>
          </section>

          {/* MEMORY REPRESENTATION SVG (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              🧠 Memory Representation
            </h2>
            <div className="max-w-4xl w-full flex justify-center">
                                      <img
                                        src={array1}
                                        alt="Array Structure"
                                        className="w-full h-auto object-contain"
                                      />
                                    </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              {/* SVG diagram: contiguous memory cells */}
              <svg
                width="100%"
                height="140"
                viewBox="0 0 600 140"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full h-auto"
              >
                {/* Background row of memory cells */}
                <rect x="50" y="30" width="500" height="60" fill="#2d3748" rx="8" />
                <rect x="50" y="30" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="150" y="30" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="250" y="30" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="350" y="30" width="100" height="60" fill="#4a5568" rx="8" />
                <rect x="450" y="30" width="100" height="60" fill="#4a5568" rx="8" />

                {/* Index labels */}
                <text x="90" y="70" textAnchor="middle" fill="#f7fafc" fontSize="14">
                  0
                </text>
                <text x="190" y="70" textAnchor="middle" fill="#f7fafc" fontSize="14">
                  1
                </text>
                <text x="290" y="70" textAnchor="middle" fill="#f7fafc" fontSize="14">
                  2
                </text>
                <text x="390" y="70" textAnchor="middle" fill="#f7fafc" fontSize="14">
                  3
                </text>
                <text x="490" y="70" textAnchor="middle" fill="#f7fafc" fontSize="14">
                  4
                </text>

                {/* Address lines (simulated) */}
                <text x="50" y="110" fill="#a0aec0" fontSize="12">
                  0x7ffe
                </text>
                <text x="150" y="110" fill="#a0aec0" fontSize="12">
                  0x7ffe + 4
                </text>
                <text x="250" y="110" fill="#a0aec0" fontSize="12">
                  0x7ffe + 8
                </text>
                <text x="350" y="110" fill="#a0aec0" fontSize="12">
                  0x7ffe + 12
                </text>
                <text x="450" y="110" fill="#a0aec0" fontSize="12">
                  0x7ffe + 16
                </text>

                {/* Animated highlight on hover (using SVG <animate> for conceptual effect) */}
                <rect
                  x="50"
                  y="30"
                  width="100"
                  height="60"
                  fill="transparent"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  rx="8"
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="90" y="70" textAnchor="middle" fill="#fbbf24" fontSize="14" opacity="0">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  ⬅️ base
                </text>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                <strong>Contiguous memory:</strong> Each element occupies a fixed number of bytes.
                The address of <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">arr[i]</code> = base address + (i × element size).
              </p>
            </div>
          </section>

          {/* JAVA CODE EXAMPLE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              💻 Java Code: Array in Action
            </h2>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <JavaFileLoader
                fileModule={arrayConceptRaw}
                title="ArrayConcept.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              The program declares an integer array of size 5, assigns marks to each student
              (Swadeep, Tuhina, …), and then prints them using a loop.
            </p>
          </section>

          {/* PROTOTYPE / SIGNATURE (staggered) */}
          <section
            className="animate-[fadeInSlideUp_0.6s_ease-out] mb-10"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">
              📐 Prototype & Purpose
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <dl className="space-y-2">
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Declaration:
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      type[] arrayName;   // preferred
                    </code>{" "}
                    or{" "}
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      type arrayName[];
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Instantiation:
                  </dt>
                  <dd>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      arrayName = new type[size];
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Purpose:
                  </dt>
                  <dd>
                    Store multiple values of the same type under one name and access them by
                    index. Used everywhere – from student marks (Debangshu’s scores) to sensor
                    readings.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-600 dark:text-indigo-400">
                    When to use:
                  </dt>
                  <dd>
                    When you know the exact number of elements in advance and need fast,
                    index‑based access.
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
                  Index out of bounds
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Accessing index <code className="text-xs">size</code> or negative – Java throws{" "}
                  <code className="text-xs">ArrayIndexOutOfBoundsException</code>. Remember: valid
                  indices are 0 to length-1.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Uninitialized array
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Declaring a reference but forgetting <code className="text-xs">new</code> leads
                  to <code className="text-xs">NullPointerException</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Confusing size with last index
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If size is 5, the last index is 4. Beginners often write loops up to{" "}
                  <code className="text-xs">{`<= size`}</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-semibold text-red-600 dark:text-red-400">
                  Type mismatch
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Putting a <code className="text-xs">double</code> into an{" "}
                  <code className="text-xs">int[]</code> causes compilation error.
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
                  <strong>Use the <code className="text-xs">length</code> property</strong> – never
                  hard‑code array size in loops.
                </li>
                <li>
                  <strong>Initialize arrays at declaration</strong> when possible:{" "}
                  <code className="text-xs">int[] marks = {`{85, 90, 78};`}</code>
                </li>
                <li>
                  <strong>Prefer the <code className="text-xs">type[] name</code> syntax</strong>{" "}
                  (it clearly shows the type is an array).
                </li>
                <li>
                  <strong>For multi‑dimensional arrays</strong>, remember they are arrays of
                  arrays; memory may not be fully contiguous.
                </li>
                <li className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  💡 <span className="font-medium">Industry habit:</span> Always validate array
                  indices when accepting user input to avoid exceptions.
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
                  • What happens in memory when you write{" "}
                  <code className="text-xs">int[] arr = new int[3];</code>? Where is the reference
                  stored? Where are the elements?
                </li>
                <li>
                  • If an array holds 5 integers, how many bytes are allocated on a typical JVM
                  (assuming 4 bytes per int)?
                </li>
                <li>
                  • Try changing the values in the code above – can you access the element at
                  index 5?
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
                  <strong>Sukanta Hui</strong> (27 years of experience) reminds you:
                </p>
                <p>
                  “Arrays are the foundation of data structures. The contiguous memory layout is
                  what makes them fast, but also rigid. In my classes at Barrackpore, I ask
                  students to draw memory diagrams on paper – it cements the concept. Remember:
                  every array in Java knows its length; use it!”
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
                  <span className="text-green-600 dark:text-green-400">✔</span> Array elements
                  are stored contiguously.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Index starts at 0.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Length is fixed
                  after creation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Use{" "}
                  <code className="text-xs">array.length</code> (not a method).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Default values:
                  0, null, false etc.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✔</span> Arrays are objects
                  – stored in heap.
                </li>
              </ul>
            </div>
          </section>

          {/* FOOTER (optional) */}
          <footer className="text-xs text-center text-gray-500 dark:text-gray-500 mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            Topic 0 – Concept of Array & Memory Representation | Next: Declaration & Initialization
          </footer>
        </div>
      </div>
    </>
  );
};

export default Topic0;