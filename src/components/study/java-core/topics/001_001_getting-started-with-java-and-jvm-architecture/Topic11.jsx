import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mainDissectionDemoCode from "./topic11_files/MainMethodDissectionDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_001 · Topic 11
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Entry Point Deep-Dive
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Dissecting <code className="text-amber-300">public static void main(String[] args)</code> Word by Word
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Move from rote memorization to deep architectural mastery: analyze the precise technical reason why each keyword in the Java main method signature is non-negotiable.
        </p>
      </header>

      {/* Section 1: Conceptual Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🔍</span> Why Every Keyword Matters
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The signature <code className="text-amber-300 font-mono">public static void main(String[] args)</code> is not an arbitrary incantation. It is a carefully engineered protocol between the operating system shell and the Java Virtual Machine launcher.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300">
            <p className="font-medium text-indigo-300 mb-1">Classroom Scenario (Shyamnagar Center):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Tuhina</strong> at our Shyamnagar center asked why <code className="text-amber-300">main()</code> must be <code className="text-amber-300">static</code>, we demonstrated what happens if you remove it: the code compiles, but when you run it, the JVM halts with <code className="text-rose-400">Error: Main method is not static</code> because the JVM refused to instantiate an object without knowing which constructor arguments to pass!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🧩</span> Word-by-Word Architectural Blueprint
        </h2>
        <p className="text-sm text-slate-400">
          Inspect the mechanical purpose of each component of the entry point:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 320"
            className="w-full h-auto"
            aria-label="Main Method Signature Dissection Diagram"
          >
            {/* Box 1: public */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="20" y="40" width="155" height="240" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="35" y="55" width="125" height="35" rx="6" fill="#0369a1" />
              <text x="97" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                public
              </text>
              <text x="97" y="115" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                Access Modifier
              </text>
              <text x="97" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Accessible by JVM
              </text>
              <text x="97" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                from outside the
              </text>
              <text x="97" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
                class package
              </text>
              <rect x="35" y="220" width="125" height="45" rx="6" fill="#0f172a" stroke="#38bdf8" />
              <text x="97" y="247" textAnchor="middle" fill="#bae6fd" fontSize="9">
                No Access Barriers
              </text>
            </g>

            {/* Box 2: static */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="190" y="40" width="155" height="240" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <rect x="205" y="55" width="125" height="35" rx="6" fill="#7e22ce" />
              <text x="267" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                static
              </text>
              <text x="267" y="115" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="11">
                Class-Level Scope
              </text>
              <text x="267" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Invoked without
              </text>
              <text x="267" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                creating an object
              </text>
              <text x="267" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
                (No 'new' needed)
              </text>
              <rect x="205" y="220" width="125" height="45" rx="6" fill="#0f172a" stroke="#a855f7" />
              <text x="267" y="247" textAnchor="middle" fill="#e9d5ff" fontSize="9">
                App.main(args)
              </text>
            </g>

            {/* Box 3: void */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="360" y="40" width="155" height="240" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <rect x="375" y="55" width="125" height="35" rx="6" fill="#15803d" />
              <text x="437" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                void
              </text>
              <text x="437" y="115" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="11">
                Return Type
              </text>
              <text x="437" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Returns no data
              </text>
              <text x="437" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Exit status via
              </text>
              <text x="437" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
                System.exit(code)
              </text>
              <rect x="375" y="220" width="125" height="45" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="437" y="247" textAnchor="middle" fill="#bbf7d0" fontSize="9">
                No Return Value
              </text>
            </g>

            {/* Box 4: main */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="530" y="40" width="155" height="240" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <rect x="545" y="55" width="125" height="35" rx="6" fill="#b45309" />
              <text x="607" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                main
              </text>
              <text x="607" y="115" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                Method Name
              </text>
              <text x="607" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Standardized
              </text>
              <text x="607" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                identifier searched
              </text>
              <text x="607" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
                by the JVM launcher
              </text>
              <rect x="545" y="220" width="125" height="45" rx="6" fill="#0f172a" stroke="#f59e0b" />
              <text x="607" y="247" textAnchor="middle" fill="#fde68a" fontSize="9">
                Execution Entry Point
              </text>
            </g>

            {/* Box 5: String[] args */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="700" y="40" width="160" height="240" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <rect x="715" y="55" width="130" height="35" rx="6" fill="#be185d" />
              <text x="780" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12" fontFamily="monospace">
                String[] args
              </text>
              <text x="780" y="115" textAnchor="middle" fill="#f472b6" fontWeight="bold" fontSize="11">
                Command Arguments
              </text>
              <text x="780" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Array of Strings
              </text>
              <text x="780" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                passed from the
              </text>
              <text x="780" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
                command line
              </text>
              <rect x="715" y="220" width="130" height="45" rx="6" fill="#0f172a" stroke="#ec4899" />
              <text x="780" y="247" textAnchor="middle" fill="#fbcfe8" fontSize="9">
                args.length &gt;= 0
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Permitted Variations */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>✍️</span> Valid Syntax Variations in Java
        </h2>

        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>The compiler and JVM accept any of these equivalent signatures:</p>
          <div className="space-y-2 font-mono text-xs md:text-sm bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-emerald-400">1. public static void main(String[] args) <span className="text-slate-500">// Standard</span></p>
            <p className="text-sky-400">2. static public void main(String[] args) <span className="text-slate-500">// Swapped modifiers</span></p>
            <p className="text-amber-400">3. public static void main(String... args) <span className="text-slate-500">// Varargs syntax</span></p>
            <p className="text-purple-400">4. public static void main(String args[]) <span className="text-slate-500">// C-style brackets</span></p>
            <p className="text-pink-400">5. public static final synchronized void main(String[] args) <span className="text-slate-500">// Extra modifiers</span></p>
          </div>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Command-Line Argument Processing
          </h3>
          <JavaFileLoader
            fileModule={mainDissectionDemoCode}
            title="MainMethodDissectionDemo.java"
            highlightLines={[16, 18, 20, 21]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: ArrayIndexOutOfBoundsException on `args[0]`</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your program accesses <code className="text-amber-300">args[0]</code> without checking <code className="text-emerald-300">if (args.length &gt; 0)</code>, running the application with no arguments crashes immediately. Always validate <code className="text-amber-300">args.length</code> before reading indices!
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Keep the Main Method Lean</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Do not write hundreds of lines of procedural code inside <code className="text-amber-300">main()</code>. Use <code className="text-amber-300">main()</code> purely to parse CLI flags, instantiate your core service object, and call an instance method (e.g. <code className="text-emerald-300">new BankingApp().start(args);</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Hints & Thinking Guidance */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>“Why does `main(String... args)` work identically to `main(String[] args)` in bytecode?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Varargs (`...`) is syntactic sugar introduced in Java 5 that javac translates directly into standard 1D array signatures!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Dissecting the Main Method FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 11: Dissecting the Main Method"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Every master engineer understands the 'why' behind the 'what'. Now you know why main is public, why it is static, why it is void, and how command-line arguments work. This deep understanding is your launchpad into advanced object-oriented architectures. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
