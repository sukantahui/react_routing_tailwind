import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import outputDemoCode from "./topic13_files/ConsoleOutputDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
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
            Module 001_001 · Topic 13
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Console I/O Streams
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Understanding <code className="text-amber-300">System.out.print()</code>, <code className="text-amber-300">println()</code>, and <code className="text-amber-300">printf()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master standard output in Java: understand the <code className="text-amber-300">java.io.PrintStream</code> pipeline, formatting specifiers (<code className="text-emerald-300">%s</code>, <code className="text-emerald-300">%d</code>, <code className="text-emerald-300">%.2f</code>, <code className="text-emerald-300">%n</code>), column alignment, and string concatenation rules.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🖥️</span> The Output Methods Breakdown
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java routes console output through <code className="text-amber-300">System.out</code>, which is an instance of <code className="text-amber-300">java.io.PrintStream</code>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong><code className="text-sky-300">print()</code>:</strong> Prints text and leaves the cursor on the same line.</li>
            <li><strong><code className="text-emerald-300">println()</code>:</strong> Prints text and automatically appends a platform line break (<code className="text-amber-300">\n</code> or <code className="text-amber-300">\r\n</code>).</li>
            <li><strong><code className="text-purple-300">printf()</code>:</strong> Prints formatted text using C-style format specifiers with width, precision, and alignment controls.</li>
          </ul>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300">
            <p className="font-medium text-amber-300 mb-1">Classroom Scenario (Naihati Academy):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Abhronila</strong> built a student fee receipt generator at our Naihati center, using <code className="text-amber-300">println()</code> with string concatenation produced jagged, messy columns. Switching to <code className="text-emerald-300">System.out.printf("%-15s %8.2f%n", student, fee)</code> created a beautifully aligned tabular invoice instantly!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>📊</span> Visual Output Comparison
        </h2>
        <p className="text-sm text-slate-400">
          Observe how each method controls cursor movement and text formatting:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="print vs println vs printf Output Mechanism Diagram"
          >
            {/* Box 1: print() */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="30" y="40" width="250" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="45" y="55" width="220" height="35" rx="6" fill="#0369a1" />
              <text x="155" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                System.out.print()
              </text>
              <text x="155" y="115" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                No Newline Appended
              </text>
              <text x="155" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Cursor stays on same line
              </text>
              <rect x="45" y="150" width="220" height="70" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="55" y="172" fill="#86efac" fontSize="10" fontFamily="monospace">
                print("A"); print("B");
              </text>
              <text x="55" y="195" fill="#fde047" fontSize="11" fontFamily="monospace">
                Console: AB_
              </text>
            </g>

            {/* Box 2: println() */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="315" y="40" width="250" height="200" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <rect x="330" y="55" width="220" height="35" rx="6" fill="#15803d" />
              <text x="440" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                System.out.println()
              </text>
              <text x="440" y="115" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="12">
                Appends Newline (\n / \r\n)
              </text>
              <text x="440" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Cursor advances to next line
              </text>
              <rect x="330" y="150" width="220" height="70" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="340" y="172" fill="#86efac" fontSize="10" fontFamily="monospace">
                println("A"); println("B");
              </text>
              <text x="340" y="192" fill="#fde047" fontSize="10" fontFamily="monospace">
                Console: A
              </text>
              <text x="340" y="208" fill="#fde047" fontSize="10" fontFamily="monospace">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B_
              </text>
            </g>

            {/* Box 3: printf() */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="600" y="40" width="250" height="200" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <rect x="615" y="55" width="220" height="35" rx="6" fill="#7e22ce" />
              <text x="725" y="78" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="monospace">
                System.out.printf()
              </text>
              <text x="725" y="115" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="12">
                Formatted String Output
              </text>
              <text x="725" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Aligns columns & sets precision
              </text>
              <rect x="615" y="150" width="220" height="70" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="625" y="172" fill="#86efac" fontSize="10" fontFamily="monospace">
                printf("%-8s %.2f%n", "Fee", 99.5);
              </text>
              <text x="625" y="195" fill="#fde047" fontSize="11" fontFamily="monospace">
                Console: Fee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;99.50
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Essential Format Specifiers */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> Common `printf` Format Specifiers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/80 text-sky-400">
                <th className="p-3 font-bold">Specifier</th>
                <th className="p-3 font-bold">Data Type</th>
                <th className="p-3 font-bold">Example</th>
                <th className="p-3 font-bold">Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">%s</td>
                <td className="p-3">String</td>
                <td className="p-3 font-mono text-xs">printf("%s", "Swadeep")</td>
                <td className="p-3 font-mono text-amber-300">Swadeep</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">%d</td>
                <td className="p-3">Integer (byte, short, int, long)</td>
                <td className="p-3 font-mono text-xs">printf("%d", 42)</td>
                <td className="p-3 font-mono text-amber-300">42</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">%.2f</td>
                <td className="p-3">Floating-Point (2 decimals)</td>
                <td className="p-3 font-mono text-xs">printf("%.2f", 12.3456)</td>
                <td className="p-3 font-mono text-amber-300">12.35</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">%,d</td>
                <td className="p-3">Integer with Commas</td>
                <td className="p-3 font-mono text-xs">printf("%,d", 1000000)</td>
                <td className="p-3 font-mono text-amber-300">1,000,000</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-emerald-400">%n</td>
                <td className="p-3">Platform Line Separator</td>
                <td className="p-3 font-mono text-xs">printf("Line%n")</td>
                <td className="p-3 font-mono text-amber-300">Line\n (or \r\n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Console Output Demonstration
          </h3>
          <JavaFileLoader
            fileModule={outputDemoCode}
            title="ConsoleOutputDemo.java"
            highlightLines={[10, 11, 12, 15, 21]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: String Concatenation Precedence Confusion</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">System.out.println("Sum: " + 10 + 20)</code> outputs <code className="text-rose-400">Sum: 1020</code> because the plus operator evaluates left-to-right into string concatenation! Always use parentheses: <code className="text-emerald-300 font-mono">"Sum: " + (10 + 20)</code> to output <code className="text-emerald-300">Sum: 30</code>.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Always Use `%n` in `printf()`</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never use <code className="text-rose-300 font-mono">\n</code> in formatted strings; always use <code className="text-emerald-300 font-mono">%n</code> to guarantee that line endings match the host OS automatically.
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
            🤔 <em>“Why does `System.out.println(new int[]{1,2,3})` print a weird hashcode like `[I@15db9742`, while `System.out.println(new char[]{'a','b'})` prints `ab`?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> `PrintStream` has a specialized overloaded method specifically for `char[]` that iterates characters directly, while `int[]` falls back to the default `Object.toString()` method!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Console Output (print, println, printf) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 13: Console Output Streams"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Clear console communication is the first impression your program makes. Master printf to format currency, dates, and tables cleanly. When building user-facing terminal apps, neat formatting makes the difference between amateur code and professional software. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
