import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java files
import declInitRaw from "./topic1_files/ArrayDeclarationInit.java?raw";

/**
 * Topic1: Declaration and Initialization of Arrays
 * Pure Dark Mode styling strictly conforming to ICSE Class 10 instructions
 */
const Topic1 = () => {
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
            Module array-1d-numeric · Topic 1
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
            📦 Declaration & Initialization of Arrays
          </h1>
          <p className="text-lg text-slate-400">
            How to bring an array to life – from variable name to memory allocation.
          </p>
        </div>

        {/* INTRODUCTION */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-sky-400">
            What Does "Declaration" and "Initialization" Mean?
          </h2>
          <div className="space-y-3 text-slate-300 leading-relaxed">
            <p>
              <strong className="text-amber-400">Declaration</strong> tells the compiler: “I want a variable that can refer to an array of a certain type.”
              It does <em>not</em> create the array itself – only a reference (stored on the stack).
            </p>
            <p>
              <strong className="text-emerald-400">Initialization</strong> actually creates the array object in memory (on the heap) and optionally fills it with values.
              After initialization, the reference points to a usable array.
            </p>
            <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300 mt-4">
              <p className="font-semibold text-sky-300 mb-1">Classroom Analogy (Barrackpore to Shyamnagar):</p>
              <p className="text-sm">
                Think of it like a locker key (declaration) vs. actually building the locker (initialization). In Barrackpore,
                Swadeep might have a key (reference) but until we build the locker (array), he can't store anything.
              </p>
            </div>
          </div>
        </section>

        {/* SYNTAX SVG / DIAGRAM */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">
            📝 Syntax at a Glance
          </h2>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 shadow-inner">
            <svg
              width="100%"
              height="200"
              viewBox="0 0 600 200"
              preserveAspectRatio="xMidYMid meet"
              className="max-w-full h-auto"
            >
              {/* Declaration block */}
              <rect x="30" y="20" width="250" height="70" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="8" />
              <text x="50" y="52" fill="#fbbf24" fontSize="16" fontWeight="bold">
                Declaration
              </text>
              <text x="50" y="77" fill="#f8fafc" fontSize="14" fontFamily="monospace">
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
              <rect x="30" y="130" width="250" height="70" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" rx="8" />
              <text x="50" y="162" fill="#fbbf24" fontSize="16" fontWeight="bold">
                Initialization
              </text>
              <text x="50" y="187" fill="#f8fafc" fontSize="14" fontFamily="monospace">
                marks = new int[5];   // heap object
              </text>

              {/* Combined (declaration + init together) */}
              <rect x="320" y="75" width="250" height="70" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" rx="8" />
              <text x="340" y="107" fill="#fbbf24" fontSize="16" fontWeight="bold">
                Combined
              </text>
              <text x="340" y="130" fill="#f8fafc" fontSize="14" fontFamily="monospace">
                int[] marks = new int[5];
              </text>
              <text x="340" y="152" fill="#94a3b8" fontSize="12">
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
            <p className="text-sm text-slate-400 mt-4 text-center">
              Declaration creates a reference (stored in stack). Initialization allocates the array object on the heap.
            </p>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
            💻 Java Code: Declaration & Initialization in Action
          </h2>
          <div className="transition-all duration-300">
            <JavaFileLoader
              fileModule={declInitRaw}
              title="ArrayDeclarationInit.java"
              highlightLines={[]}
            />
          </div>
          <p className="mt-3 text-slate-400 text-sm">
            The program shows three ways: separate declaration & initialization, combined, and static initializer.
          </p>
        </section>

        {/* PROTOTYPE / SIGNATURE */}
        <section
          className="animate-[fadeInSlideUp_0.6s_ease-out] bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-300"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            📐 Syntax Variations & Purpose
          </h2>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6">
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  1. Declaration only
                </dt>
                <dd className="text-slate-300">
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    int[] arr;
                  </code>{" "}
                  – <span className="text-slate-400">arr is null, cannot be used yet.</span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  2. Declaration + instantiation (with default values)
                </dt>
                <dd className="text-slate-300">
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    int[] arr = new int[5];
                  </code>{" "}
                  – <span className="text-slate-400">creates array of size 5, all elements initialized to 0.</span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  3. Static initialization (with values)
                </dt>
                <dd className="text-slate-300">
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    int[] arr = {`{10, 20, 30};`}
                  </code>{" "}
                  – <span className="text-slate-400">size is inferred automatically from values.</span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-sky-400 mb-1">
                  4. Anonymous array
                </dt>
                <dd className="text-slate-300">
                  <code className="text-sm bg-slate-900 border border-slate-800 text-amber-300 px-2 py-1 rounded font-mono">
                    new int[] {`{1, 2, 3}`}
                  </code>{" "}
                  – <span className="text-slate-400">used when passing array directly to methods.</span>
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
                Using array before initialization
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[] arr; System.out.println(arr);</code> – compiler error: variable not initialized.
                Or if initialized to null, <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">NullPointerException</code> at runtime.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Mixing declaration with size
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[5] arr;</code> is invalid syntax. Size is only given with <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800 font-mono">new</code>.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Forgetting <code className="text-xs">new</code> in dynamic init
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[] arr = int[5];</code> – missing <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800 font-mono">new</code> keyword causes compile error.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold text-rose-300 mb-2">
                Using size in static initializer
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-rose-300 border border-slate-800 font-mono">int[3] arr = {`{1,2,3};`}</code> – cannot specify size; array length is inferred.
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
                <strong>Prefer combined declaration + initialization</strong> when size or values are known upfront – it's clearer and prevents null references.
              </li>
              <li>
                <strong>Use static initializer for small fixed sets</strong> (e.g., days of week, student names from Naihati).
              </li>
              <li>
                <strong>Declare arrays with <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">type[] name</code></strong> – consistent with Java standards and return types.
              </li>
              <li>
                <strong>Always initialize arrays before use</strong> – even if it's <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new int[0]</code> for an empty array.
              </li>
              <li className="text-sm bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-amber-200 mt-2">
                💡 <span className="font-semibold">Pro tip:</span> Use anonymous arrays for quick method arguments:{" "}
                <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">printArray(new int[] {`{1,2,3}`});</code>
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
            <li>• What is the value of <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800 font-mono">arr</code> after only declaration? Where does it point?</li>
            <li>• Can you declare an array without specifying the type? Why not?</li>
            <li>• Try writing code that declares an array and then initializes it later. What happens if you forget the second step?</li>
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
              “Many beginners think <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-mono">int[] arr;</code> creates an array. It does not! It only creates a reference. 
              I always tell my students in Shyamnagar: ‘A key without a locker is useless.’ Always pair declaration with initialization.
              The static initializer <code className="text-xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-mono">{`{...}`}</code> is your friend for fixed data – use it often.”
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
                <span className="text-emerald-400">✔</span> Declaration: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">type[] name;</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Initialization: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new type[size]</code> or <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">{`{values}`}</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Combined: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">int[] a = new int[5];</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Static init: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">int[] a = {`{1,2}`};</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Anonymous: <code className="text-xs bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800 font-mono">new int[] {`{1,2}`}</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span> Never use an uninitialized array reference.
              </li>
            </ul>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-xs text-center text-slate-500 pt-8 border-t border-slate-800">
          Topic 1 – Declaration & Initialization | Next: Array creation using new keyword
        </footer>
      </div>
    </div>
  );
};

export default Topic1;