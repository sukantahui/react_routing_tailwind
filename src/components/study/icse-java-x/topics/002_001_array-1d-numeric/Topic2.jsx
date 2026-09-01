import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import arrayCreationRaw from "./topic2_files/ArrayCreationNewKeyword.java?raw";

/**
 * Topic2: Array Creation Using new Keyword
 * Pure Dark Mode styling strictly conforming to ICSE Class 10 instructions
 */
const Topic2 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8">
      {/* Inline keyframes for reveal animation */}
      <style>{`
        @keyframes fadeInSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main container */}
      <div className="max-w-5xl mx-auto space-y-10 leading-relaxed">
        {/* HEADER with reveal animation */}
        <div
          className="animate-[fadeInSlideUp_0.6s_ease-out] pb-4 border-b border-slate-800"
          style={{ animationFillMode: "both" }}
        >
          <span className="inline-block px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Module array-1d-numeric · Topic 2
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white flex items-center gap-3">
            🆕 Array Creation Using <code className="text-sky-400 font-mono text-3xl">new</code> Keyword
          </h1>
          <p className="text-lg text-slate-400">
            Allocating memory for arrays dynamically on the Heap.
          </p>
        </div>

        {/* INTRODUCTION */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-sky-400">
            What Does <code className="font-mono text-sky-300">new</code> Do?
          </h2>
          <div className="space-y-3 text-slate-300 leading-relaxed">
            <p>
              In Java, the <code className="text-sm bg-slate-950 border border-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono">new</code> keyword is used to allocate memory for objects – including arrays.
              When you write <code className="text-sm bg-slate-950 border border-slate-800 text-sky-300 px-2 py-0.5 rounded font-mono">int[] marks = new int[5];</code>, you are:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Creating an array object on the Heap</li>
              <li>Allocating contiguous memory for 5 integers (4 bytes each → 20 bytes total)</li>
              <li>Setting each element to the default value for that type (0 for int)</li>
              <li>Returning the reference (memory address) to the variable <code className="text-amber-300 font-mono">marks</code></li>
            </ul>
            <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300 mt-4">
              <p className="font-semibold text-sky-300 mb-1">Classroom Analogy (Ichapur):</p>
              <p className="text-sm">
                Think of it like building a row of 5 lockers in the school hallway in Ichapur.
                <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new</code> actually constructs the lockers – before that, you only had a key (reference) with no lockers.
              </p>
            </div>
          </div>
        </section>

        {/* MEMORY ALLOCATION SVG */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">
            🧠 Heap Allocation with <code className="font-mono text-indigo-300">new</code>
          </h2>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 shadow-inner">
            <svg
              width="100%"
              height="180"
              viewBox="0 0 600 180"
              preserveAspectRatio="xMidYMid meet"
              className="max-w-full h-auto"
            >
              {/* Stack (reference) */}
              <rect x="50" y="20" width="120" height="60" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="8" />
              <text x="80" y="45" fill="#fbbf24" fontSize="14" fontWeight="bold">Stack</text>
              <text x="80" y="65" fill="#f8fafc" fontSize="12" fontFamily="monospace">marks (ref)</text>
              <line x1="110" y1="80" x2="110" y2="110" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Heap array object */}
              <rect x="40" y="110" width="360" height="60" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" rx="8" />
              <text x="60" y="135" fill="#34d399" fontSize="14" fontWeight="bold">Heap</text>
              <text x="60" y="155" fill="#94a3b8" fontSize="11">int[5] array (contiguous)</text>

              {/* Individual elements (cells) */}
              <rect x="200" y="120" width="35" height="40" fill="#0f172a" stroke="#059669" strokeWidth="1" rx="4" />
              <rect x="240" y="120" width="35" height="40" fill="#0f172a" stroke="#059669" strokeWidth="1" rx="4" />
              <rect x="280" y="120" width="35" height="40" fill="#0f172a" stroke="#059669" strokeWidth="1" rx="4" />
              <rect x="320" y="120" width="35" height="40" fill="#0f172a" stroke="#059669" strokeWidth="1" rx="4" />
              <rect x="360" y="120" width="35" height="40" fill="#0f172a" stroke="#059669" strokeWidth="1" rx="4" />

              <text x="217" y="145" fill="#34d399" fontSize="12" fontWeight="bold">0</text>
              <text x="257" y="145" fill="#34d399" fontSize="12" fontWeight="bold">0</text>
              <text x="297" y="145" fill="#34d399" fontSize="12" fontWeight="bold">0</text>
              <text x="337" y="145" fill="#34d399" fontSize="12" fontWeight="bold">0</text>
              <text x="377" y="145" fill="#34d399" fontSize="12" fontWeight="bold">0</text>

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
              <circle cx="450" cy="50" r="15" fill="transparent" stroke="#fbbf24" strokeWidth="2">
                <animate
                  attributeName="r"
                  values="15;20;15"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="475" y="55" fill="#fbbf24" fontSize="14" fontWeight="bold">new</text>
            </svg>
            <p className="text-sm text-slate-400 mt-4 text-center">
              <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new int[5]</code> creates the array object on the heap; the reference is stored in the stack variable.
            </p>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
            💻 Java Code: Creating Arrays with <code className="font-mono text-emerald-300">new</code>
          </h2>
          <div className="transition-all duration-300">
            <JavaFileLoader
              fileModule={arrayCreationRaw}
              title="ArrayCreationNewKeyword.java"
              highlightLines={[]}
            />
          </div>
          <p className="mt-3 text-slate-400 text-sm">
            The program demonstrates creating arrays of different types using <code>new</code>, and prints default values.
          </p>
        </section>

        {/* PROTOTYPE / SIGNATURE */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            📐 Syntax of <code className="font-mono text-amber-300">new</code> for Arrays
          </h2>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6">
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  Basic form
                </dt>
                <dd>
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    type[] arrayName = new type[size];
                  </code>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  Multi-dimensional
                </dt>
                <dd>
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    int[][] matrix = new int[3][4];
                  </code>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  Jagged arrays (without specifying second dimension)
                </dt>
                <dd>
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    int[][] triangle = new int[5][];
                  </code>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  Purpose
                </dt>
                <dd className="text-slate-300 text-sm">
                  <code className="text-xs bg-slate-900 text-amber-300 px-1 rounded font-mono">new</code> allocates heap memory and returns the reference. It is the only way to create an array object dynamically.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-rose-400">
            ⚠️ Common Pitfalls (Beginners)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Negative size
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">new int[-5];</code> compiles but throws <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">NegativeArraySizeException</code> at runtime.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Forgetting <code className="text-xs">new</code>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[] arr = int[5];</code> – missing <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800 font-mono">new</code> causes compile error.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Using size in static initializer
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[3] arr = {`{1,2,3}`};</code> – not allowed; size is inferred.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Large size causing memory issues
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Requesting a huge array (<code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">new int[Integer.MAX_VALUE]</code>) can lead to <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">OutOfMemoryError</code>.
              </p>
            </div>
          </div>
        </section>

        {/* BEST PRACTICES & TIPS */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
            ✅ Best Practices & Pro Tips
          </h2>
          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl space-y-3">
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Always check size before creation</strong> – especially if size comes from user input (Tuhina might enter a huge number).
              </li>
              <li>
                <strong>Use meaningful variable names</strong> – e.g., <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">studentAges</code>, <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">dailyTemperatures</code>.
              </li>
              <li>
                <strong>For large arrays, consider memory constraints</strong> – estimate required memory: size × element size.
              </li>
              <li>
                <strong>Remember default values</strong> – after <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new</code>, numeric arrays are filled with 0, booleans with false, objects with null.
              </li>
              <li className="text-sm bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-amber-200 mt-2">
                💡 <span className="font-semibold">Pro tip:</span> Use <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">manual for-loop display</code> to quickly view array contents after creation – helpful for debugging.
              </li>
            </ul>
          </div>
        </section>

        {/* HINT SECTION */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-sky-950/40 border border-sky-800/60 rounded-2xl p-6 md:p-8 shadow-lg"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
        >
          <h3 className="text-lg font-semibold text-sky-300 mb-3 flex items-center gap-2">
            <span>💭 Think About This…</span>
          </h3>
          <ul className="space-y-2 text-sky-200 text-sm">
            <li>• What happens if you write <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800 font-mono">int[] arr = new int[0];</code>? Is that useful? (Yes, for empty collections.)</li>
            <li>• After <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800 font-mono">int[] x = new int[3]; int[] y = x;</code>, how many array objects exist?</li>
            <li>• Try creating an array of a reference type (e.g., <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800 font-mono">String[] names = new String[3];</code>). What are the default values?</li>
          </ul>
        </section>

        {/* TEACHER'S NOTE */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-amber-950/30 border border-amber-800/60 rounded-2xl p-6 md:p-8 shadow-lg"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
            <span>👩‍🏫 Teacher’s Note</span>
          </h3>
          <div className="space-y-3 text-amber-200 text-sm leading-relaxed">
            <p>
              <strong className="text-amber-100">Sukanta Hui</strong> (Coder & AccoTax) advice:
            </p>
            <p>
              “The <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-mono">new</code> keyword is your construction crew. Without it, no array exists. 
              I often ask my students in Naihati: ‘If you declare a variable, do you have a house? No, you only have an address label. 
              <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-mono">new</code> builds the house.’ Also, remember that default values are your safety net – 
              they prevent garbage data. Always check array size before creation to avoid runtime surprises.”
            </p>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg"
          style={{ animationDelay: "0.9s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            ✅ Checklist – What to Remember
          </h2>
          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new</code> allocates heap memory.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Syntax: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new type[size]</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Size must be non‑negative integer.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Elements get default values (0, false, null).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> The array reference is stored in the variable.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Without <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new</code>, no array object exists.
              </li>
            </ul>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-xs text-center text-slate-500 pt-8 border-t border-slate-800">
          Topic 2 – Array creation using new keyword | Next: Default values of numeric arrays
        </footer>
      </div>
    </div>
  );
};

export default Topic2;